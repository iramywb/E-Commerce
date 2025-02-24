import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { useContext } from "react";
import Loader from "../Loader/Loader";

export default function ProtectedRoutes({ children }) {
  const { isAuth } = useContext(TokenContext);
  const location = useLocation()

  const authLinks = [
    "/login",
    "/register",
    "/forgotPassword",
  ]

  if (isAuth == null) {
    return <Loader />;
  } else if (isAuth) {
    return authLinks.includes(location.pathname) ? <Navigate to="/" /> : children;
  } else {
    return authLinks.includes(location.pathname) ? children : <Navigate to="/login" />;
  }
}
