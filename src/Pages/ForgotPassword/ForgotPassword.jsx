import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import VerifyCodeForm from "../../Components/ForgotPasswordForms/VerifyCodeForm";
import PasswordResetForm from "../../Components/ForgotPasswordForms/PasswordResetForm";
import ForgotPasswordForm from "../../Components/ForgotPasswordForms/ForgotPasswordForm";
import axios from "axios";

export default function ForgotPassword() {
  // const { fMail, cleanStart } = useContext(TokenContext);
  const [formMail, setFormMail] = useState({ email: null, verified: false });

  // async function setEmailHandler(promise, email) {
  //   const res = await promise;
  //   if (res?.data.statusMsg === "success") {
  //     setFormMail((prev) => ({ ...prev, email }));
  //     clearFError();
  //     setSeconds(10 * 60);
  //     if (seconds === null)
  //       setTimeout(() => {
  //         const id = setInterval(() => {
  //           setSeconds((prev) => {
  //             if (prev > 0) return prev - 1;
  //             else {
  //               setSeconds(null);
  //               setFormMail((prev) => (!prev.verified ? null : prev));
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
  //   setFormMail({ email: null, verified: false });
  //   setFError(null);
  //   // setSeconds(null);
  // }
  

  // useEffect(() => {
  //   return cleanStart();
  //   // return () => setFormMail({ email: null, verified: false });
  // }, []);
  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full mx-auto border bg-white rounded-2xl py-8 px-6">
        <img
          src={logo}
          alt="FreshCart"
          className="sm:hidden w-40 mb-8 mx-auto block"
        />
        {formMail?.email && formMail?.verified ? (
          <PasswordResetForm tools={{formMail, setFormMail}}/>
        ) : formMail?.email ? (
          <VerifyCodeForm tools={{formMail, setFormMail}} />
        ) : (
          <ForgotPasswordForm tools={{setFormMail}} />
        )}
      </div>
    </div>
  );
}
