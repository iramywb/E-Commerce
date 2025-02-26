import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import TokenContextProvider from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import Cart from "./Pages/Cart/Cart";
import Categories from "./Pages/Categories/Categories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "./Pages/NotFound/NotFound";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import { MdOutlineWifiOff } from "react-icons/md";
import { Offline } from "react-detect-offline";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";
import Wishlist from "./Pages/Wishlist/Wishlist";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import NavActionsProvider from "./Context/NavActionsContext";
import ProductsContextProvider from "./Context/ProductsContext";
import Brands from "./Pages/Brands/Brands";
import Checkout from "./Pages/Checkout/Checkout";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: (
        <TokenContextProvider>
          <NavActionsProvider>
            <ProductsContextProvider>
              <WishlistContextProvider>
                <CartContextProvider>
                  <MainLayout />
                </CartContextProvider>
              </WishlistContextProvider>
            </ProductsContextProvider>
          </NavActionsProvider>
        </TokenContextProvider>
      ),
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedRoutes>
              <Login />
            </ProtectedRoutes>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedRoutes>
              <Register />
            </ProtectedRoutes>
          ),
        },
        {
          path: "forgotPassword",
          element: (
            <ProtectedRoutes>
              <ForgotPassword />
            </ProtectedRoutes>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectedRoutes>
              <NotFound />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <Offline>
        <small className="fixed bottom-2 right-4 bg-red-500 text-white p-3 rounded z-50">
          <MdOutlineWifiOff className="inline text-xl mr-3" />
          You are offline, check your internet connection
        </small>
      </Offline>
      <Toaster position="bottom-left" reverseOrder={true} />
      <RouterProvider router={routes} />
    </>
  );
}
