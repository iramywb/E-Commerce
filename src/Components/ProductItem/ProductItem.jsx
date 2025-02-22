import { FaStar } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";

export default function ProductItem({ product }) {
  const { addToCart, removeFromCart, cart, pendingRequests } =
    useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  if (cart) return (
    <div className="product inner p-2 relative group">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imageCover}
          className="w-full max-h-48 object-contain"
          alt=""
        />
        {product.priceAfterDiscount && (
          <span className="-rotate-12 bg-red-600 px-2 py-1 group-hover:-translate-x-2 group-hover:-rotate-45 group-hover:-translate-y-5 transition-all duration-500 text-white rounded absolute top-3 left-1 font-semibold text-xs">
            {Math.floor((1 - product.priceAfterDiscount / product.price) * 100)}
            % Off
          </span>
        )}
        <small className="text-green-600">{product.category?.name}</small>
        <h5 className="font-semibold line-clamp-1">{product.title}</h5>
        <div className="flex justify-between">
          {product.priceAfterDiscount ? (
            <div>
              <span className="font-bold">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="ms-2 line-through text-gray-400">
                {product.price} EGP
              </span>
            </div>
          ) : (
            <span className="font-bold">{product.price} EGP</span>
          )}
          <span className="flex items-center">
            <FaStar className="text-yellow-300" /> {product.ratingsAverage}
          </span>
        </div>
      </Link>
      <hr />
      <div className="flex justify-center gap-1 mt-2">
        
        {pendingRequests.includes(product.id) ? (
          <button className="btn cursor-default bg-green-800 text-white border-gray-200 w-full">
            <svg
              aria-hidden="true"
              className="inline w-[18px] h-[18px] text-white animate-spin fill-gray-700"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </button>
        ) : cart.data.products.some(
            (item) => item.product.id === product.id
          ) ? (
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white border-gray-200 w-full"
            onClick={() => removeFromCart(product.id)}
          >
            <MdOutlineRemoveShoppingCart className="text-lg" />
          </button>
        ) : (
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white border-gray-200 w-full"
            onClick={() => addToCart(product.id)}
          >
            <MdAddShoppingCart className="text-lg" />
          </button>
        )}
        {wishlist.some((id) => id === product.id) ? (
          <button
            onClick={() => removeFromWishlist(product.id)}
            className="btn text-red-600 bg-white border-gray-200 hover:bg-gray-50"
          >
            <FaHeart />
          </button>
        ) : (
          <button
            onClick={() => addToWishlist(product.id)}
            className="btn text-gray-900 bg-white border-gray-200 hover:bg-gray-50 hover:text-red-600"
          >
            <FaRegHeart />
          </button>
        )}
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    imageCover: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    priceAfterDiscount: PropTypes.number,
  }).isRequired,
};
