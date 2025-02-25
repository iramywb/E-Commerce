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
        .catch((err) => {
          if (err.code != "ERR_NETWORK") {
            setIsAuth(false);
            localStorage.removeItem("token");
            setToken(null);
          } else isAuthorized()
        });
    } else setIsAuth(false);
  }

  useEffect(() => {
    isAuthorized();
  }, [token]);

  // forgot password section
  // const [fMail, setFMail] = useState({ email: null, verified: false });
  // const [fError, setFError] = useState(null);
  // const [seconds, setSeconds] = useState(null);

  // async function handleForgotPassword(values) {
  //   // if (values.email && fMail.email) values = { email };
  //   const res = await axios
  //     .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
  //       email: values.email,
  //     })
  //     .catch((err) => setFError(err.response.data.message));
  //   setEmailHandler(res, values.email);
  //   return res;
  // }

  // async function handleVerifyCode(values) {
  //   const res = await axios
  //     .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
  //       resetCode: values.resetCode.trim(),
  //     })
  //     .catch((err) => setFError(err.response.data.message));
  //   if (res.data.status === "Success") {
  //     setFMail((prev) => ({ ...prev, verified: true }));
  //     setSeconds(null);
  //   }
  //   return res;
  // }

  // async function handleResetPassword(values) {
  //   const res = await axios
  //     .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
  //     .catch((err) => {
  //       setFError(err.response.data.message)
  //       return Promise.reject(err)
  //     });
  //   return res;
  // }

  // async function setEmailHandler(promise, email) {
  //   const res = await promise;
  //   if (res?.data.statusMsg === "success") {
  //     setFMail((prev) => ({ ...prev, email }));
  //     clearFError();
  //     setSeconds(10 * 60);
  //     if (seconds === null)
  //       setTimeout(() => {
  //         const id = setInterval(() => {
  //           setSeconds((prev) => {
  //             if (prev > 0) return prev - 1;
  //             else {
  //               setSeconds(null);
  //               setFMail((prev) => (!prev.verified ? null : prev));
  //               clearInterval(id);
  //             }
  //           });
  //         }, 1000); // interval
  //       }, 1000); // delay
  //   }
  // }
  // function clearFError() {
  //   setFError(null);
  // }
  // function cleanStart() {
  //   setFMail({ email: null, verified: false });
  //   setFError(null);
  //   setSeconds(null);
  // }
  // function formatSeconds() {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;

  //   const parts = [];
  //   parts.push(`${minutes < 10 ? "0" : ""}${minutes}:`);
  //   parts.push(`${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`);

  //   return parts.join("");
  // }

  return (
    <TokenContext.Provider
      value={{
        token,
        setToken,
        isAuth,
        // fMail,
        // fError,
        // clearFError,
        // handleForgotPassword,
        // handleVerifyCode,
        // handleResetPassword,
        // formatSeconds,
        // cleanStart,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

