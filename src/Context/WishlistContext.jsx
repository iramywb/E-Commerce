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

  function addToQueue(task) {
    const toastId = toast.loading(task.loadingMessage);
    const taskWithToast = {
      ...task,
      toastId: toastId,
    };
    queue.current.push(taskWithToast);

    if (!isProcessing.current) {
      processQueue();
    }
  }

  async function processQueue() {
    if (isProcessing.current) return;
    isProcessing.current = true;

    while (queue.current.length > 0) {
      const task = queue.current[0];
      try {
        // Update toast to loading state
        toast.loading(task.loadingMessage, { id: task.toastId });

        const result = await task.operation();

        // Update toast to success state
        toast.success(task.successMessage, {
          id: task.toastId,
          duration: 4000,
        });

        task.onSuccess?.(result);
      } catch (error) {
        // Update toast to error state
        toast.error(task.errorMessage(error), {
          id: task.toastId,
          duration: 5000,
        });

        task.onError?.(error);
      } finally {
        // Remove processed task from queue
        queue.current.shift();
      }
    }

    isProcessing.current = false;
  }

  function addToWishlist(id) {
    const originalWishlist = [...wishlist];
    setWishlist((prev) => [...prev, id]);

    addToQueue({
      loadingMessage: "Adding to wishlist...",
      successMessage: "Added to wishlist!",
      errorMessage: (err) =>
        err.response?.data?.message || "Failed to add item",
      operation: () =>
        axios.post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId: id },
          { headers }
        ),
      onError: () => setWishlist(originalWishlist),
    });
  }

  function removeFromWishlist(id) {
    const originalWishlist = [...wishlist];
    const originalItems = [...wishlistItems];

    setWishlist((prev) => prev.filter((item) => item !== id));
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));

    addToQueue({
      loadingMessage: "Removing item...",
      successMessage: "Item removed!",
      errorMessage: (err) =>
        err.response?.data?.message || "Failed to remove item",
      operation: () =>
        axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
          headers,
        }),
      onError: () => {
        setWishlist(originalWishlist);
        setWishlistItems(originalItems);
      },
    });
  }

  function clearWishlist() {
    const originalWishlist = [...wishlist];
    const originalItems = [...wishlistItems];
    setWishlist([]);
    setWishlistItems([]);

    addToQueue({
      loadingMessage: "Clearing wishlist...",
      successMessage: "Wishlist cleared!",
      errorMessage: (err) =>
        err.response?.data?.message || "Failed to clear wishlist",
      operation: async () => {
        // Process deletions sequentially
        for (const id of originalWishlist) {
          await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            { headers }
          );
        }
      },
      onError: () => {
        setWishlist(originalWishlist);
        setWishlistItems(originalItems);
      },
    });
  }

  function getWishlist() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => {
        const serverWishList = res.data.data.map((product) => product.id);
        setWishlist(serverWishList);
        setWishlistItems(res.data.data);
      })
      .catch((err) => err);
  }

  useEffect(() => {
    if (isAuth) getWishlist();
    else {
      setWishlist([]);
      setWishlistItems([]);
    }
  }, [isAuth]);
  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        wishlist,
        wishlistItems,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
