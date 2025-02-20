import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState(null);

  function isAuthorized() {
    setIsAuth(null);
    if (token) {
      axios
        .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
          headers: { token },
        })
        .then(() => setIsAuth(true))
        .catch(() => {
            setIsAuth(false)
            localStorage.removeItem("token");
            setToken(null);
        });
    } else setIsAuth(false);
  }

  useEffect(() => {
    isAuthorized();
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken, isAuth }}>
      {children}
    </TokenContext.Provider>
  );
}
