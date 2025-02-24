import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaHome, FaRegHeart, FaRegStar, FaStar } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";
import Loader from "../../Components/Loader/Loader";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./ProductDetails.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { WishlistContext } from "../../Context/WishlistContext";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaStarHalfStroke } from "react-icons/fa6";
import Rating5Stars from "../../Components/Rating5Stars/Rating5Stars";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, removeFromCart, cart, pendingRequests } =
    useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  async function getProduct() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch(() => setProduct(1));
  }
  useEffect(() => {
    getProduct();
  }, [id]);
  if (product && cart)
    if (typeof product === "number")
      return (
        <section className="container py-8">
          <div className="flex flex-col gap-3 justify-center items-center">
            <p className="m-auto">Item Not Found</p>
            <Link className="btn" to={"/"}>
              Go to home page <FaHome className="inline" />
            </Link>
          </div>
        </section>
      );
    else
      return (
        <section className="container py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
          <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8 xl:gap-16">
              <div>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper"
                >
                  {product.images?.map((image, i) => (
                    <SwiperSlide key={i}>
                      <img
                        src={image}
                        className="w-full h-80 object-contain object-center"
                        alt=""
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="mt-6 sm:mt-8 lg:mt-0">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {product.title}
                </h1>
                <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                  <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                    {product.priceAfterDiscount
                      ? product.priceAfterDiscount
                      : product.price}{" "}
                    EGP
                  </p>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1 text-yellow-300">
                      <Rating5Stars rate={product.ratingsAverage} />
                    </div>
                    <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                      ({product.ratingsAverage})
                    </p>
                    <Link className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white">
                      {product.reviews.length} Reviews
                    </Link>
                  </div>
                </div>
                {product.priceAfterDiscount && (
                  <p className="text-gray-400 text-sm">
                    List price:{" "}
                    <span className="line-through">{product.price} EGP</span>{" "}
                    <span className="text-red-600 mx-3">
                      Saving{" "}
                      {Math.floor(
                        (1 - product.priceAfterDiscount / product.price) * 100
                      )}
                      %
                    </span>
                  </p>
                )}
                <div className="mt-6 gap-4 items-center flex md:max-w-80 sm:mt-8">
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
                      className="flex items-center justify-center gap-2 p-2.5 text-sm font-medium text-red-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
                    >
                      <FaHeart />
                    </button>
                  ) : (
                    <button
                      onClick={() => addToWishlist(product.id)}
                      className="flex items-center justify-center gap-2 p-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-red-600"
                    >
                      <FaRegHeart />
                    </button>
                  )}
                </div>
                <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        // <div className="flex items-center">
        //   <div className="w-1/4">
        //     <Slider {...settings}>
        //       {product.images?.map((image, i) => (
        //         <img src={image} alt="" key={i} />
        //       ))}
        //     </Slider>
        //   </div>
        //   <div className="w-3/4">
        //     <div className="inner p-8">
        //       <h2 className="text-2xl font-bold">{product.title}</h2>
        //       <p className="text-gray-700 font-medium my-4">
        //         {product.description}
        //       </p>
        //       <small>{product.category?.name}</small>
        //       <div className="flex justify-between">
        //         <span>{product.price} EGP</span>
        //         <span className="flex items-center">
        //           <FaStar className="text-yellow-300" />{" "}
        //           {product.ratingsAverage}
        //         </span>
        //       </div>
        //       <div
        //         className="btn text-center "
        //         onClick={() => addProduct(product.id)}
        //       >
        //         Add to cart <FaCartShopping className="inline text-lg" />
        //       </div>
        //     </div>
        //   </div>
        // </div>
      );
  else return <Loader />;
}
