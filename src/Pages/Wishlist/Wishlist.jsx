import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import Loader from "../../Components/Loader/Loader";
import { motion } from "framer-motion";

export default function Wishlist() {
  const {
    wishlistItems,
    wishlist,
    removeFromWishlist,
    clearWishlist,
    getWishlist,
  } = useContext(WishlistContext);

  useEffect(() => {
    document.title = "Wishlist | FreshCart";
    if (wishlistItems.length !== wishlist.length) getWishlist();
  }, [wishlist]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const heartVariants = {
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="container py-8">
      <motion.div
        className="text-center mb-16 px-4 select-none"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="inline-block" variants={itemVariants}>
          <motion.div variants={itemVariants} />

          <motion.div
            className="cursor-pointer"
            variants={heartVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <IoHeartOutline className="text-8xl md:text-9xl text-pink-400 mb-6" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-4"
          variants={itemVariants}
        >
          My Wishlist
        </motion.h1>

        <motion.p
          className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-md mx-auto"
          variants={itemVariants}
        >
          Your curated collection of loved items
        </motion.p>
      </motion.div>

      {wishlistItems.length !== wishlist.length ? (
        <Loader />
      ) : wishlistItems.length > 0 ? (
        <div className="flex flex-wrap border border-gray-200 p-2">
          <div className="w-full text-center mb-2 pb-2 border-b border-gray-200">
            <button
              onClick={clearWishlist}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
              disabled={wishlistItems.length === 0}
            >
              Clear Entire Wishlist
            </button>
          </div>
          {wishlistItems.map((product) => (
            <div
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-80"
              key={product.id}
            >
              <div className="bg-white p-4 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-lg font-bold mb-2 truncate">
                  {product.title}
                </h2>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">EGP {product.price}</p>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="text-red-500 hover:text-red-600"
                    aria-label={`Remove ${product.title} from wishlist`}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Clear All Button */}
        </div>
      ) : (
        <div className="w-full text-center min-h-96 border p-2 border-gray-200 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            {/* <Icon className="w-64 h-64 text-gray-400" /> */}
            <p className="text-2xl font-bold">Your wishlist is empty</p>
            <p className="text-gray-600">
              Start adding items you love to see them here!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
