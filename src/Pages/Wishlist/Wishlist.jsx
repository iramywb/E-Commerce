import { useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { FaRegHeart, FaRegTrashAlt } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";

export default function Wishlist() {
  const { wishlistItems, getWishlist, removeFromWishlist, wishlist, clearWishlist } =
    useContext(WishlistContext);

  useEffect((effect) => {
    getWishlist();
  }, []);

  return (
    <section>
      <div className="flex items-center gap-4 justify-center flex-col font-bold font-sans text-4xl mb-16">
        <IoHeartOutline className="text-8xl" />
        <h1>My Wishlist</h1>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-gray-500 border border-green-600">
          <thead className="text-xs h-12 text-white uppercase bg-green-600">
            <tr>
              <th scope="col" className="w-60">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white h-40 border-b border-gray-200 hover:bg-gray-50"
                >
                  <td>
                    <img
                      src={product.imageCover}
                      className="max-h-40 max-w-40 m-auto block"
                      alt={product.title}
                    />
                  </td>
                  <td className="font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>
                  <td className="text-gray-900 dark:text-white">
                    <div className="relative">
                      {product.priceAfterDiscount ? (
                        <>
                          <span>{product.priceAfterDiscount} EGP</span>
                          <span className="text-gray-600 border border-red-300 rounded p-1 text-nowrap line-through decoration-0 decoration-red-600 absolute bottom-full hover:scale-110 transition duration-300 select-none left-1/2 rotate-12">
                            {product.price} EGP
                          </span>
                        </>
                      ) : (
                        <span>{product.price} EGP</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="text-xl hover:scale-110 transition font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white h-40 border-b border-gray-200 hover:bg-gray-50">
                <td colSpan="4">No wishlist items found.</td>
              </tr>
            )}
          </tbody>
          <tfoot className="h-12">
            <tr className="font-semibold text-center text-gray-900">
              <td colSpan={2}></td>
              <td>Delete All:</td>
              <td className="text-center">
                    <button
                      onClick={() => clearWishlist()}
                      className="text-xl hover:scale-110 disabled:hover:scale-100 transition font-medium text-red-600 disabled:text-gray-400"
                      disabled={wishlistItems.length<1}
                    >
                      <FaRegTrashAlt />
                    </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}
