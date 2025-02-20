import { useContext, useState } from "react";
import style from "./Navbar.module.css";
import { FaRegHeart } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "./../../assets/images/freshcart-logo.svg";
import { TokenContext } from "../../Context/TokenContext";
import { MdOutlineShoppingCart } from "react-icons/md";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { token, setToken } = useContext(TokenContext);
  const { cart } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex justify-between flex-wrap items-center mx-auto p-4">
        <div className="flex gap-4 justify-between w-full md:w-auto">
          <Link
            to={"/"}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="FreshMarket Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FreshMarket</span> */}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              {isOpen ? (
                // Cross icon (X)
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l15 12M1 13l15-12"
                />
              ) : (
                // Hamburger menu icon (three lines)
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              )}
            </svg>
          </button>
        </div>
        {/* class to make it in flex be at the center */}
        <div
          className={`${
            isOpen ? "max-h-96" : "max-h-0 delay-100"
          } w-full duration-300 ease-linear overflow-hidden md:max-h-96 md:w-auto`}
          id="navbar-default"
        >
          {token && (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to={"/"}
                  className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/cart"}
                  className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/products"}
                  href="#"
                  className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/categories"}
                  className="block text-center py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Categories
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div
          className={`${
            isOpen ? "max-h-96 delay-100" : "max-h-0"
          } duration-300 ease-linear overflow-hidden md:overflow-visible md:max-h-96 w-full md:flex sm:gap-4 md:w-auto`}
        >
          <ul className="font-medium text-2xl flex justify-center items-center p-4 md:p-0 border border-gray-100 rounded-lg md:space-x-4 rtl:space-x-reverse md:mt-0">
            <li>
              <Link
                to={"/cart"}
                className="block relative space-x-2 text-gray-900 rounded md:border-0"
                aria-current="cart"
              >
                <MdOutlineShoppingCart />
                {cart && cart.numOfCartItems > 0 && (
                  <span className="absolute bottom-full translate-y-1/2 right-0 translate-x-1/4 inline-flex items-center justify-center w-5 h-4 text-[0.65rem] font-semibold text-white bg-green-500 rounded-full">
                    {cart.data.totalItems > 99 ? "+99" : cart.data.totalItems}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link
                to={"/wishlist"}
                className="block py-2 px-3 text-gray-900 rounded md:border-0 md:p-0"
              >
                <FaRegHeart />
              </Link>
            </li>
          </ul>
          <ul className="flex justify-center gap-3">
            {token && (
              <li>
                <div
                  onClick={handleLogout}
                  className="block cursor-pointer py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign Out
                </div>
              </li>
            )}
            {!token && (
              <>
                <li>
                  <NavLink
                    to={"/login"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/register"}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
