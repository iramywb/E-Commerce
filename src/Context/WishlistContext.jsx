import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { TokenContext } from "./TokenContext";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const { token, isAuth } = useContext(TokenContext);
  const headers = { token };
  const [wishlist, setWishlist] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const queue = useRef([]);
  const isProcessing = useRef(false);

  const processQueue = () => {
    if (isProcessing.current || queue.current.length === 0) return;

    isProcessing.current = true;
    const task = queue.current[0];
    const withToast = "toastId" in task
    withToast && toast.loading(task.loadingMessage, { id: task.toastId });

    task
      .operation()
      .then((result) => {
        withToast && toast.success(task.successMessage, { id: task.toastId });
        task.onSuccess?.(result);
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.message || task.errorMessage;
        withToast && toast.error(errorMsg, { id: task.toastId });
        task.onError?.();
      })
      .finally(() => {
        queue.current.shift();
        isProcessing.current = false;
        processQueue();
      });
  };

  const addToQueue = (task) => {
    const toastId = toast ? toast.loading(task.loadingMessage) : null;
    queue.current.push({ ...task, toastId });
    if (!isProcessing.current) processQueue();
  };

  const getWishlist = () => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => {
        const serverWishList = res.data.data.map((product) => product.id);
        setWishlist(serverWishList);
        setWishlistItems(res.data.data);
        return res;
      })
      .catch((err) => {
        return err;
      })
  };

  const addToWishlist = (id) => {
    const originalWishlist = [...wishlist];
    const originalItems = [...wishlistItems];

    setWishlist((prev) => [...prev, id]);

    addToQueue({
      loadingMessage: "Adding to wishlist...",
      successMessage: "Added to wishlist!",
      errorMessage: "Failed to add item",
      operation: () =>
        axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId: id },
          { headers }
        ),
      onError: () => {
        setWishlist(originalWishlist);
        setWishlistItems(originalItems);
      },
    });
  };

  const removeFromWishlist = (id) => {
    const originalWishlist = [...wishlist];
    const originalItems = [...wishlistItems];

    setWishlist((prev) => prev.filter((item) => item !== id));
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));

    addToQueue({
      loadingMessage: "Removing item...",
      successMessage: "Item removed!",
      errorMessage: "Failed to remove item",
      operation: () =>
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
          headers,
        }),
      onError: () => {
        setWishlist(originalWishlist);
        setWishlistItems(originalItems);
      },
    });
  };

  const clearWishlist = () => {
    const originalWishlist = [...wishlist];
    const originalItems = [...wishlistItems];

    setWishlist([]);
    setWishlistItems([]);

    addToQueue({
      loadingMessage: "Clearing wishlist...",
      successMessage: "Wishlist cleared!",
      errorMessage: "Failed to clear wishlist",
      operation: () =>
        Promise.all(
          originalWishlist.map((id) =>
            axios.delete(
              `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
              { headers }
            )
          )
        ),
      onError: () => {
        setWishlist(originalWishlist);
        setWishlistItems(originalItems);
      },
    });
  };

  useEffect(() => {
    if (isAuth) {
      getWishlist();
    } else {
      setWishlist([]);
      setWishlistItems([]);
    }
  }, [isAuth]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        getWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
