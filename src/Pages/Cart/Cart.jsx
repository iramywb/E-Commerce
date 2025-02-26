import { Suspense, useContext } from "react";
import Loader from "../../Components/Loader/Loader";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { FaHeart, FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { WishlistContext } from "../../Context/WishlistContext";

export default function Cart() {
  const { removeFromCart, updateQuantity, clearCart, cart } =
    useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const navigate = useNavigate();

  if (cart)
    return (
      <div className="font-sans max-w-4xl max-md:max-w-xl mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
          <h2 className="flex items-center gap-2">
            Total Items: {cart.data.totalItems}
            <FaRegTrashAlt
              className="text-gray-400 hover:text-red-600 text-lg cursor-pointer"
              onClick={() => clearCart()}
            />
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="md:col-span-2 space-y-4">
            {cart ? (
              cart.data.products.length > 0 ? (
                cart.data.products.map((product) => (
                  <div
                    className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]"
                    key={product.product.id}
                  >
                    <div className="flex gap-4">
                      <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                        <Suspense fallback={<span>LOADING...</span>}>
                          <img
                            src={product.product.imageCover}
                            className="w-full h-full object-contain"
                          />
                        </Suspense>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-gray-800">
                            {product.product.title}
                          </h3>
                          {/* <p className="text-sm font-semibold text-gray-500 mt-2 flex items-center gap-2">
                          Color:{" "}
                          <span className="inline-block w-5 h-5 rounded-md bg-[#ac7f48]" />
                        </p> */}
                        </div>
                        <div className="mt-auto flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.product.id,
                                product.count - 1
                              )
                            }
                            disabled={product.count < 2}
                            type="button"
                            className="flex items-center justify-center w-5 h-5 bg-gray-800 disabled:bg-gray-400 outline-none rounded-full text-white"
                          >
                            <IoMdRemove />
                          </button>
                          <span className="font-bold text-sm select-none leading-[18px]">
                            {product.count}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                product.product.id,
                                product.count + 1
                              )
                            }
                            disabled={product.count >= product.product.quantity}
                            type="button"
                            className="flex items-center justify-center w-5 h-5 bg-gray-800 disabled:bg-gray-400 outline-none rounded-full text-white"
                          >
                            <IoMdAdd />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col">
                      <div className="flex items-start gap-4 justify-end text-lg">
                        {wishlist.some((id) => id === product.product.id) ? (
                          <FaHeart
                            onClick={() =>
                              removeFromWishlist(product.product.id)
                            }
                            className="text-red-600 cursor-pointer text-lg"
                          />
                        ) : (
                          <FaRegHeart
                            onClick={() => addToWishlist(product.product.id)}
                            className="text-gray-400 hover:text-red-600 cursor-pointer"
                          />
                        )}
                        <FaRegTrashAlt
                          className="text-gray-400 hover:text-red-600 cursor-pointer"
                          onClick={() => removeFromCart(product.product.id)}
                        />
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-gray-800 mt-auto text-nowrap">
                        {product.price} EGP
                      </h3>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">Cart is empty</div>
              )
            ) : (
              <Loader />
            )}
          </div>
          <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
            <ul className="text-gray-800 space-y-4">
              <li className="flex flex-wrap gap-4 text-sm">
                Subtotal{" "}
                <span className="ml-auto font-bold">
                  {cart ? cart.data.totalCartPrice : 0}
                </span>
              </li>
              <li className="flex flex-wrap gap-4 text-sm">
                Shipping <span className="ml-auto font-bold">Free</span>
              </li>
              <hr className="border-gray-300" />
              <li className="flex flex-wrap gap-4 text-sm font-bold">
                Total{" "}
                <span className="ml-auto">
                  {cart ? cart.data.totalCartPrice : 0}
                </span>
              </li>
            </ul>
            <div className="mt-8 text-center space-y-2">
              <button
                disabled={!cart.cartId || !cart.data.totalItems}
                onClick={() => navigate("/checkout")}
                className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
              <Link
                to="/"
                className="block text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-gray-100 text-gray-800 border border-gray-300 rounded-md"
              >
                Continue Shopping
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-2">
                    Secure payment
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Experience peace of mind with our secure payment options,
                    ensuring your transactions are protected and reliable.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-2">
                    Free delivery
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Enjoy the convenience of free delivery on all your orders,
                    providing a cost-effective and seamless shopping experience.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-2">
                    Easy to return
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Simplify your shopping experience with hassle-free returns.
                    Our easy return process ensures convenience and customer
                    satisfaction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  else return <Loader />;
}
