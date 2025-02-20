import axios from "axios";
import { TokenContext } from "./TokenContext";
import toast from "react-hot-toast";
import { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token, isAuth } = useContext(TokenContext);
  const [cart, setCart] = useState(null);
  const [pendingRequests, setPendingRequests] = useState(new Set())
  const requestQueueRef = useRef(Promise.resolve());
  const updateTimeoutRef = useRef(null);
  const headers = { token };

  function addRequest(id) {
    setPendingRequests((prev) => new Set(prev).add(id)); // Add ID to the Set
  };

  // Function to remove a request
  function removeRequest(id) {
    setPendingRequests((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id); // Remove ID from the Set
      return newSet;
    });
  };

  function addToCart(id) {
    if (!pendingRequests.has(id)) {
      addRequest(id)
      const request = requestQueueRef.current.finally(() =>
        axios
          .post(
            `https://ecommerce.routemisr.com/api/v1/cart/`,
            { productId: id },
            { headers }
          )
          .then(() => getCart()) // Backend mistakenly returns cart without full info like imageCover so i updated it with getCart() as a temporary fix
          .catch((err) => Promise.reject(err))
          .finally(() => {
            removeRequest(id)
          })
      );

      requestQueueRef.current = request;

      toast.promise(request, {
        loading: "Adding to cart...",
        success: "Added to cart",
        error: (err) =>
          "Failed to add to cart: " + err.message || "Failed to add to cart",
      });
    }
  }
  function removeFromCart(id) {
    if (!pendingRequests.has(id)) {
      addRequest(id)
      const request = requestQueueRef.current.finally(() =>
        axios
          .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers,
          })
          .then((res) => cartHandler(res.data))
          .catch((err) => Promise.reject(err))
          .finally(() => removeRequest(id))
      );

      requestQueueRef.current = request;

      toast.promise(request, {
        loading: "Removing from cart...",
        success: "Removed from cart",
        error: (err) =>
          "Failed to remove from cart: " + err.message ||
          "Failed to remove from cart",
      });
    }
  }

  function updateQuantity(id, quantity) {
    console.log(requestQueueRef.length);
    setCart((prevCart) => {
      const index = prevCart?.data.products.findIndex(
        (product) => product.product.id === id
      );
      if (index === -1) return prevCart;

      const product = prevCart.data.products[index];
      const oldQuantity = product.count;
      const difference = quantity - oldQuantity;

      const totalCartPrice =
        product.price * difference + prevCart.data.totalCartPrice;

      return {
        ...prevCart,
        data: {
          ...prevCart.data,
          totalCartPrice,
          totalItems: prevCart.data.totalItems + difference,
          products: prevCart.data.products.map((product, i) =>
            index === i ? { ...product, count: quantity } : product
          ),
        },
      };
    });

    if (updateTimeoutRef.current) clearTimeout(updateTimeoutRef.current);

    updateTimeoutRef.current = setTimeout(() => {
      const request = requestQueueRef.current.finally(() =>
        axios
          .put(
            `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { count: quantity },
            { headers }
          )
          .catch((err) => {
            setCart((prevCart) => {
              const index = prevCart?.data.products.findIndex(
                (product) => product.product.id === id
              );
              if (index === -1) return prevCart;

              return {
                ...prevCart,
                data: {
                  ...prevCart.data,
                  totalItems:
                    prevCart.data.totalItems - (quantity - oldQuantity),
                  products: prevCart.data.products.map((product, i) =>
                    index === i ? { ...product, count: oldQuantity } : product
                  ),
                },
              };
            });
            return Promise.reject(err);
          })
      );

      requestQueueRef.current = request;

      toast.promise(request, {
        loading: "Updating quantity...",
        success: "Quantity updated",
        error: (err) =>
          `Failed to update quantity: ${err.message || "Unknown error"}`,
      });
    }, 500);
  }

  function clearCart() {
    const request = requestQueueRef.current.finally(() =>
      axios
        .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
        .then(() => getCart())
    );

    requestQueueRef.current = request;

    toast.promise(request, {
      loading: "Clearing cart...",
      success: "Cart cleared",
      error: (err) =>
        `Failed to clear the cart: ${err.message || "Unknown error"}`,
    });
  }

  function getCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => cartHandler(res.data))
      .catch((err) => console.log(err));
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
        pendingRequests,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
