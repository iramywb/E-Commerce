import axios from "axios";
import { TokenContext } from "./TokenContext";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(TokenContext);
  const headers = { token };
  const [cart, setCart] = useState(null);

  function addToCart(id) {
    return toast.promise(
      axios
        .post(
          `https://ecommerce.routemisr.com/api/v1/cart/`,
          { productId: id },
          { headers }
        )
        .then(() => getCart()) // Backend mistakenly returns cart without full info like imageCover so i updated it with getCart() as a temporary fix
        .catch((err) => err),
      {
        loading: "Adding to cart...",
        success: "Added to cart successfully",
        error: "Failed to add to cart",
      },
      {
        position: "bottom-left",
      }
    );
  }
  function removeFromCart(id) {
    return toast.promise(
      axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          headers,
        })
        .then((res) => setCart(res.data))
        .catch((err) => err),
      {
        loading: "Removing from cart...",
        success: "Removed from cart successfully",
        error: "Failed to remove from cart",
      },
      {
        position: "bottom-left",
      }
    );
  }
  function updateQuantity(id, quantity) {
    return toast.promise(
      axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count: quantity },
          { headers }
        )
        .then((res) => setCart(res.data))
        .catch((err) => err),
      {
        loading: "Updating quantity...",
        success: "Quantity updated successfully",
        error: "Failed to update quantity",
      },
      {
        position: "bottom-left",
      }
    );
  }
  function clearCart() {
    return toast.promise(
      axios
        .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
        .then((res) => getCart())
        .catch((err) => err),
      {
        loading: "Clearing cart...",
        success: "Cart cleared successfully",
        error: "Failed to clear cart",
      },
      {
        position: "bottom-left",
      }
    );
  }
  function getCart() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => getCart(), [token]);
  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, updateQuantity, clearCart, cart }}
    >
      {children}
    </CartContext.Provider>
  );
}
