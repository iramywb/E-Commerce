import { useContext, useState } from "react";
import "./Navbar.css";
import { FaRegHeart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logo1 from "./../../assets/images/freshcart-logo.svg";
import logo2 from "./../../assets/images/cart-logo.svg";
import { TokenContext } from "../../Context/TokenContext";
import { CartContext } from "../../Context/CartContext";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { WishlistContext } from "../../Context/WishlistContext";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Products",
      path: "/products",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "Brands",
      path: "/brands",
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (

    <nav className="flex shadow-lg py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide fixed w-full z-50">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <Link
          to={"/"}
          className="lg:absolute max-lg:left-10 lg:top-2/4 lg:left-2/4 lg:-translate-x-1/2 lg:-translate-y-1/2 max-sm:hidden"
        >
          <img
            src={logo1}
            alt="logo"
            // className="w-40"
          />
        </Link>
        <Link to={"/"} className="hidden max-sm:block">
          <img src={logo2} alt="logo" className="w-9" />
        </Link>
        <div
          id="collapseMenu"
          onClick={() => setIsOpen(false)}
          className={`${
            !isOpen &&
            "pointer-events-none opacity-0 lg:opacity-100 lg:pointer-events-auto"
          } relative duration-200 block lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 z-20`}
        >
          {/* <button
            id="toggleClose"
            className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              />
            </svg>
          </button> */}
          <ul
            onClick={(e) => e.stopPropagation()}
            className={`${
              !isOpen && "-translate-x-full"
            } lg:translate-x-0 duration-500 lg:flex lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50`}
          >
            <li className="mb-6 hidden max-lg:block">
              <Link>
                <img
                  src={logo1}
                  onClick={() => setIsOpen(false)}
                  alt="logo"
                  className="w-36"
                />
              </Link>
            </li>
            {links.map((link, index) => (
              <li key={index} className="max-lg:border-b px-3">
                <NavLink
                  to={link.path}
                  className="hover:text-green-600 text-[#333] block font-semibold text-[15px]"
                >
                  <span onClick={() => setIsOpen(false)}>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-6"> 
          <div className="group max-lg:py-3 relative">
            <div className="hover:text-green-600 text-gray-600 text-[15px] font-bold lg:hover:fill-green-600 block cursor-pointer">
              <CgProfile className="text-2xl" />
            </div>
            <ul className="absolute shadow-lg bg-white lg:top-7 max-lg:top-10 left-1/2 -translate-x-1/2 min-w-[150px] max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
              {token ? (
                <>
                  <li className="border-b py-2 ">
                    <Link
                      to={"/myAccount"}
                      // onClick={handleLogout}
                      className="hover:text-green-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li className="border-b py-2 ">
                    <Link
                      to={"/login"}
                      onClick={handleLogout}
                      className="hover:text-green-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Sign out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="border-b py-2 ">
                    <Link
                      to={"/login"}
                      className="hover:text-green-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="border-b py-2 ">
                    <Link
                      to={"/register"}
                      className="hover:text-green-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <Link
            to="/wishlist"
            className="relative hover:text-green-600 cursor-pointer"
          >
            <FaRegHeart className="text-2xl" />
            {wishlist?.length > 0 && (
              <span className="absolute left-full -translate-x-1/4 -ml-1 top-0 rounded-full bg-green-700 px-1 py-0 text-xs text-white">
                {wishlist.length > 99 ? "+99" : wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative hover:text-green-600 cursor-pointer"
          >
            <HiOutlineShoppingBag className="text-2xl" />
            {cart?.data.totalItems > 0 && (
              <span className="absolute left-full -translate-x-1/4 -ml-1 top-0 rounded-full bg-green-700 px-1 py-0 text-xs text-white">
                {cart.data.totalItems > 99 ? "+99" : cart.data.totalItems}
              </span>
            )}
          </Link>
          <button
            id="toggleOpen"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-7 h-7"
              fill="#333"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    // <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
    //   <div className="max-w-screen-xl flex justify-between flex-wrap items-center mx-auto p-4">
    //     <div
    //       className={`${
    //         isOpen ? "max-h-96" : "max-h-0 delay-100"
    //       } w-full duration-300 ease-linear overflow-hidden md:max-h-96 md:w-auto`}
    //       id="navbar-default"
    //     >
    //       {token && (
    //         <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //           <li>
    //             <NavLink
    //               to={"/"}
    //               className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //               aria-current="page"
    //             >
    //               Home
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to={"/products"}
    //               href="#"
    //               className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //             >
    //               Products
    //             </NavLink>
    //           </li>
    //           <li>
    //             <NavLink
    //               to={"/categories"}
    //               className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //             >
    //               Categories
    //             </NavLink>
    //           </li>
    //         </ul>
    //       )}
    //     </div>
    //     <div className="flex gap-4 justify-between w-full md:w-auto">
    //       <Link
    //         to={"/"}
    //         className="flex items-center space-x-3 rtl:space-x-reverse"
    //       >
    //         <img src={logo} className="h-10" alt="FreshMarket Logo" />
    //       </Link>
    //       <button
    //         onClick={() => setIsOpen(!isOpen)}
    //         data-collapse-toggle="navbar-default"
    //         type="button"
    //         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //         aria-controls="navbar-default"
    //         aria-expanded="false"
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <svg
    //           className="w-5 h-5"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 17 14"
    //         >
    //           {isOpen ? (
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M1 1l15 12M1 13l15-12"
    //             />
    //           ) : (
    //             <path
    //               stroke="currentColor"
    //               strokeLinecap="round"
    //               strokeLinejoin="round"
    //               strokeWidth="2"
    //               d="M1 1h15M1 7h15M1 13h15"
    //             />
    //           )}
    //         </svg>
    //       </button>
    //     </div>
    //     <div
    //       className={`${
    //         isOpen ? "max-h-96 delay-100" : "max-h-0"
    //       } duration-300 ease-linear overflow-hidden md:overflow-visible md:max-h-96 w-full md:flex sm:gap-4 md:w-auto`}
    //     >
    //       <ul className="flex justify-center gap-3">
    //         {token ? (
    //           <li>
    //             <div
    //               onClick={handleLogout}
    //               className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //             >
    //               Sign Out
    //             </div>
    //           </li>
    //         ) : (
    //           <>
    //             <li>
    //               <NavLink
    //                 to={"/login"}
    //                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //               >
    //                 Login
    //               </NavLink>
    //             </li>
    //             <li>
    //               <NavLink
    //                 to={"/register"}
    //                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //               >
    //                 Register
    //               </NavLink>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //       <ul className="font-medium text-2xl flex justify-center items-center p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-4 space-x-reverse md:mt-0">
    //         <li>
    //           <Link
    //             to={"/wishlist"}
    //             className="block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0"
    //           >
    //             <FaRegHeart />
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             to={"/cart"}
    //             className="block relative text-gray-900 rounded md:border-0"
    //             aria-current="cart"
    //           >
    //             <HiOutlineShoppingBag />
    //             {cart && cart.numOfCartItems > 0 && (
    //               <div className="absolute left-full top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-5 h-4 text-[0.65rem] font-semibold rounded-full">
    //                 {cart.data.totalItems > 99 ? "+99" : cart.data.totalItems}
    //               </div>
    //             )}
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
}
