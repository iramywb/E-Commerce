import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaHome, FaRegHeart } from "react-icons/fa";
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
import Rating5Stars from "../../Components/Rating5Stars/Rating5Stars";
import { RiLoader4Fill } from "react-icons/ri";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, removeFromCart, cart, pendingRequests } =
    useContext(CartContext);
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  const isPending = pendingRequests.includes(product?.id);
  const isInCart = cart?.data.products.some(
    (item) => item.product.id === product.id
  );

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
                  <p className="text-gray-400 mt-2 text-sm">
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
                      isInCart
                        ? removeFromCart(product.id)
                        : addToCart(product.id)
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
