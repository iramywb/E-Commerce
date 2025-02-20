import { Navigate } from "react-router-dom";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { useContext } from "react";
import Loader from "../Loader/Loader";

export default function ProtectedRoutes({ children }) {
  const { isAuth } = useContext(TokenContext);

  if (isAuth == null) {
    return <Loader />;
  } else if (isAuth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
