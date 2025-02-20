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
  const requestQueueRef = useRef(Promise.resolve());

  function addToWishlist(id) {
    setWishlist([...wishlist, id]);
    const request = requestQueueRef.current.finally(() =>
      axios
        .post(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          { productId: id },
          { headers }
        )
        .catch((err) => {
          setWishlist(wishlist.filter((item) => item !== id));
          console.log(err);
          return Promise.reject(err);
        })
    );

    requestQueueRef.current = request;

    toast.promise(
      request,
      {
        loading: "Adding to wishlist...",
        success: "Added to wishlist",
        error: (err) =>
          "Failed to add: " + err.message || "Failed to add to wishlist",
      }
    );
  }
  function removeFromWishlist(id) {
    const index = wishlist.indexOf(id);
    const product = wishlistItems[index];
    setWishlist([...wishlist.slice(0, index), ...wishlist.slice(index + 1)]);
    setWishlistItems([
      ...wishlistItems.slice(0, index),
      ...wishlistItems.slice(index + 1),
    ]);

    const request = requestQueueRef.current.finally(() =>
      axios
        .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
          headers,
        })
        .catch((err) => {
          setWishlist([
            ...wishlist.slice(0, index),
            id,
            ...wishlist.slice(index + 1),
          ]);
          setWishlistItems([
            ...wishlistItems.slice(0, index),
            product,
            ...wishlistItems.slice(index + 1),
          ]);
          return Promise.reject(err);
        })
    );

    requestQueueRef.current = request;


    toast.promise(request,
      {
        loading: "Removing from wishlist...",
        success: "Removed from wishlist",
        error: (err) =>
          "Failed to remove: " + err.message ||
          "Failed to remove from wishlist",
      }
    );
  }
  function getWishlist() {
    requestQueueRef.current = requestQueueRef.current.finally(() => axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((res) => {
        const serverWishList = res.data.data.map((product) => product.id);
        setWishlist(serverWishList);
        setWishlistItems(res.data.data);
      })
      .catch((err) => err)
    )
  }
  async function clearWishlist() {
    let wishlistItemsClone = structuredClone(wishlistItems);
    setWishlist([]);
    setWishlistItems([]);

    const request = requestQueueRef.current.finally(() =>
      Promise.all(
        wishlist.map(async (id) => {
          return axios
            .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
              headers,
            })
            .then(() => {
              wishlistItemsClone = wishlistItemsClone.filter(
                (product) => product.id !== id
              );
            })
            .catch((err) => Promise.reject(err));
        })
      )
    )

    requestQueueRef.current = request;
    
    toast.promise(request,
      {
        loading: "Clearing wishlist...",
        success: "Wishlist Cleared",
        error: (err) =>
          "Failed to clear wishlist: " + (err?.message || "Unknown error"),
      }
    );
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
