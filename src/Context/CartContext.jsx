import axios from "axios";
import { TokenContext } from "./TokenContext";
import toast from "react-hot-toast";
import { useContext, useEffect, useRef, useState, createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  // Auth
  const { token, isAuth } = useContext(TokenContext);
  // Cart API
  const [cart, setCart] = useState(null);
  // Queue setup
  const [pendingRequests, setPendingRequests] = useState(new Set());
  const queueRef = useRef([]);
  const isProcessingRef = useRef(false);
  // Debounce
  const updateTimeoutsRef = useRef(new Map());
  const quantitiesBackup = useRef(new Map());
  // Headers
  const headers = { headers: { token } };

  async function processQueue() {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    while (queueRef.current.length > 0) {
      const task = queueRef.current[0];

      try {
        const res = await toast.promise(
          task.operation(),
          {
            loading: task.loadingMessage,
            success: task.successMessage,
            error: (err) => task.errorMessage(err),
          },
          {
            id: task.toastId,
          }
        );

        task.onSuccess?.(res);
      } catch (error) {
        task.onError?.(error);
      } finally {
        queueRef.current.shift();
        setPendingRequests((prev) => {
          const newSet = new Set(prev);
          newSet.delete(task.id);
          return newSet;
        });
      }
    }

    isProcessingRef.current = false;
  }

  function addToQueue(task) {
    const toastId = toast.loading(task.loadingMessage);

    const taskWithToast = {
      ...task,
      toastId: toastId,
    };

    setPendingRequests((prev) => new Set([...prev, task.id]));
    queueRef.current.push(taskWithToast);

    if (!isProcessingRef.current) {
      processQueue();
    }
  }

  function addToCart(id) {
    const originalCart = { ...cart };
    setCart((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        totalItems: prev.data.totalItems + 1,
        products: [
          ...prev.data.products,
          { product: { id: id }, count: 1, price: 0 },
        ],
      },
    }));

    addToQueue({
      id,
      type: "add",
      loadingMessage: "Adding to cart...",
      successMessage: "Added to cart",
      errorMessage: function (err) {
        return err.response?.data?.message || "Failed to add to cart";
      },
      operation: function () {
        return axios
          .post(
            "https://ecommerce.routemisr.com/api/v1/cart/",
            { productId: id },
            headers
          )
          .then(() => getCart());
      },
      onError: () => setCart(originalCart),
    });
  }

  function removeFromCart(id) {
    const originalCart = { ...cart };
    setCart((prev) => {
      const productIndex = prev.data.products.findIndex(
        (p) => p.product.id === id
      );

      const product = prev.data.products[productIndex];
      return {
        ...prev,
        numOfCartItems: prev.numOfCartItems - 1,
        data: {
          ...prev.data,
          totalItems: prev.data.totalItems - product.count,
          totalCartPrice:
            prev.data.totalCartPrice - product.count * product.price,
          products: prev.data.products.filter((p) => p.product.id !== id),
        },
      };
    });

    addToQueue({
      id,
      type: "remove",
      loadingMessage: "Removing from cart...",
      successMessage: "Removed from cart",
      errorMessage: function (err) {
        return err.response?.data?.message || "Failed to remove from cart";
      },
      operation: function () {
        return axios
          .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, headers)
          .then(() => getCart());
      },
      onError: () => setCart(originalCart),
    });
  }

  function updateQuantity(id, quantity) {
    if (updateTimeoutsRef.current.has(id)) {
      clearTimeout(updateTimeoutsRef.current.get(id));
    }


    if (!quantitiesBackup.current.has(id)) {
      console.log("Adding the id to backup...");
      quantitiesBackup.current.set(
        id,
        cart.data.products.find((p) => p.product.id === id).count
      );
      console.log("Added");
    } else {
      console.log(
        "the quantity is not updated yet original quantity is: " +
          quantitiesBackup.current.get(id)
      );
    }
    setCart((prev) => {
      if (!prev) return prev;

      const productIndex = prev.data.products.findIndex(
        (p) => p.product.id === id
      );

      if (productIndex === -1) return prev;

      const oldProduct = prev.data.products[productIndex];
      const pricePerItem = oldProduct.price;
      const quantityDifference = quantity - oldProduct.count;

      const totalItems = prev.data.totalItems

      return {
        ...prev,
        data: {
          ...prev.data,
          totalItems: totalItems + quantityDifference,
          totalCartPrice:
            prev.data.totalCartPrice + quantityDifference * pricePerItem,
          products: prev.data.products.map((p) =>
            p.product.id === id ? { ...p, count: quantity } : p
          ),
        },
      };
    });

    updateTimeoutsRef.current.set(
      id,
      setTimeout(() => {
        updateTimeoutsRef.current.delete(id);
        addToQueue({
          id,
          type: "update",
          loadingMessage: "Updating quantity...",
          successMessage: "Quantity updated",
          errorMessage: function (err) {
            return err.response?.data?.message || "Failed to update quantity";
          },
          operation: function () {
            return axios.put(
              `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
              { count: quantity },
              headers
            );
          },
          onSuccess: function () {
            if (updateTimeoutsRef.current.has(id))
              quantitiesBackup.current.set(id, quantity);
            else quantitiesBackup.current.delete(id);
          },
          onError: function () {
            if (!cart.data.products.find((p) => p.product.id === id)) return;
            setCart((prev) => {
              const productIndex = prev.data.products.findIndex(
                (p) => p.product.id === id
              );
              if (productIndex === -1) return prev;
              const currentProduct = prev.data.products[productIndex];
              const totalItems = prev.data.totalItems
              const quantityDifference = quantity - quantitiesBackup.current.get(id);
              const pricePerItem = currentProduct.price;
              const revertedCart = {
                ...prev,
                data: {
                  ...prev.data,
                  totalItems: totalItems - quantityDifference,
                  totalCartPrice:
                    prev.data.totalCartPrice - quantityDifference * pricePerItem,
                  products: prev.data.products.map((p) =>
                    p.product.id === id ? { ...p, count: currentProduct.count - quantityDifference } : p
                  ),
                },
              };

              return revertedCart
            });
            quantitiesBackup.current.delete(id);
          },
        });
      }, 500)
    );
  }

  function clearCart() {
    cartHandler({ data: { products: [], totalCartPrice: 0 } });
    addToQueue({
      type: "clear",
      loadingMessage: "Clearing cart...",
      successMessage: "Cart cleared",
      errorMessage: function (err) {
        return err.response?.data?.message || "Failed to clear cart";
      },
      operation: function () {
        return axios.delete(
          "https://ecommerce.routemisr.com/api/v1/cart",
          headers
        );
      },
      onSuccess: function () {
        getCart();
      },
    });
  }

  function getCart() {
    if (
      queueRef.current.filter((q) => q.type === "add" || q.type === "remove")
        .length > 1
    )
      return;
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", headers)
      .then(function (res) {
        cartHandler(res.data);
      })
      .catch(function () {
        getCart()
      });
  }

  function cartHandler(data) {
    setCart((prevCart) => {
      const totalItems = data.data.products.reduce(
        (acc, item) => acc + item.count,
        0
      );

      let products = data.data.products;

      if (prevCart) {
        products = products.map((item) => {
          const matchingProduct = prevCart.data.products.find(
            (product) => product.product.id === item.product.id
          );
          return matchingProduct
            ? { ...item, count: matchingProduct.count }
            : item;
        });
      }
      return {
        ...data,
        data: {
          ...data.data,
          totalItems,
          products,
        },
      };
    });
  }

  useEffect(() => {
    if (isAuth) getCart();
    else setCart(null);
  }, [isAuth]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cart,
        pendingRequests: Array.from(pendingRequests),
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
