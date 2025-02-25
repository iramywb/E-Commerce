import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import LazyLoad from "react-lazyload";
import Rating5Stars from "../Rating5Stars/Rating5Stars";
import { RiLoader4Fill } from "react-icons/ri";

export default function ProductItem({ product }) {
  const { addToCart, removeFromCart, cart, pendingRequests } =
    useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  const isPending = pendingRequests.includes(product.id);
  const isInCart = cart?.data.products.some(
    (item) => item.product.id === product.id
  );
  if (cart)
    return (
      <div className="product inner p-2 relative group">
        <Link to={`/product/${product.id}`}>
          <LazyLoad className="min-h-48" offset={100}>
            <img
              src={product.imageCover}
              className="w-full max-h-48 object-contain"
              alt={product.title}
            />
          </LazyLoad>
          {product.priceAfterDiscount && (
            <span className="-rotate-12 bg-red-600 px-2 py-1 group-hover:-translate-x-2 group-hover:-rotate-45 group-hover:-translate-y-5 transition-all duration-500 text-white rounded absolute top-3 left-1 font-semibold text-xs">
              {Math.floor(
                (1 - product.priceAfterDiscount / product.price) * 100
              )}
              % Off
            </span>
          )}
          <small className="text-green-600">{product.category?.name}</small>
          <h5 className="font-semibold line-clamp-1">{product.title}</h5>
          <div className="flex justify-between mb-5">
            {product.priceAfterDiscount ? (
              <div className="relative">
                <span className="font-bold">
                  {product.priceAfterDiscount} EGP
                </span>
                <div className="absolute top-full left-0 line-through text-xs text-gray-400">
                  {product.price} EGP
                </div>
              </div>
            ) : (
              <span className="font-bold">{product.price} EGP</span>
            )}
            <div className="flex items-center relative">
              {/* <FaStar className="text-yellow-300" /> {product.ratingsAverage} */}
              <Rating5Stars
                className="text-yellow-300"
                rate={product.ratingsAverage}
              />
              <div className="absolute top-full right-0 text-xs">
                {product.ratingsAverage}
              </div>
            </div>
          </div>
        </Link>
        <hr />
        <div className="flex justify-center gap-1 mt-2">
          <button
            className={`btn w-full border-gray-200 transition duration-300 ${
              isPending
                ? "cursor-default " +
                  (isInCart
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-black")
                : isInCart
                ? "bg-white hover:bg-gray-100 text-black"
                : "bg-gray-800 hover:bg-gray-900 text-white"
            }`}
            disabled={isPending}
            onClick={() =>
              isInCart ? removeFromCart(product.id) : addToCart(product.id)
            }
          >
            <span>
              {isPending ? (
                <RiLoader4Fill className="text-lg animate-spin" />
              ) : isInCart ? (
                <MdOutlineRemoveShoppingCart className="text-lg" />
              ) : (
                <MdAddShoppingCart className="text-lg" />
              )}
            </span>
          </button>
          {/* {pendingRequests.includes(product.id) ? (
            <button className="btn cursor-default bg-gray-400 text-white border-gray-200 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                fill="#fff"
                className="ml-2 inline animate-spin"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
                  data-original="#000000"
                />
              </svg>
            </button>
          ) : cart.data.products.some(
              (item) => item.product.id === product.id
            ) ? (
            <button
              className="btn bg-white-600 hover:bg-gray-100 text-black border-gray-200 w-full"
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
          )} */}
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
