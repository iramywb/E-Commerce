import axios from "axios";
import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

export const TokenContext = createContext();

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuth, setIsAuth] = useState(null);
  const [userId, setUserId] = useState(null);

  function isAuthorized() {
    setIsAuth(null);
    if (token) {
      axios
        .get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
          headers: { token },
        })
        .then((res) => {
          setIsAuth(true);
          setUserId(res.data.decoded.id);
        })
        .catch((err) => {
          if (err.code != "ERR_NETWORK") {
            setIsAuth(false);
            localStorage.removeItem("token");
            setToken(null);
          } else isAuthorized();
        });
    } else setIsAuth(false);
  }

  useEffect(() => {
    isAuthorized();
  }, [token]);

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        isAuth,
        userId,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}


TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};