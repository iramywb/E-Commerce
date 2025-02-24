import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../Context/TokenContext";
import VerifyCodeForm from "../../Components/ForgotPasswordForms/VerifyCodeForm";
import PasswordResetForm from "../../Components/ForgotPasswordForms/PasswordResetForm";
import ForgotPasswordForm from "../../Components/ForgotPasswordForms/ForgotPasswordForm";

export default function ForgotPassword() {
  const { fMail, cleanStart } = useContext(TokenContext);
  useEffect(() => {
    return cleanStart();
  }, []);
  return (
    <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full mx-auto border bg-white rounded-2xl py-8 px-6">
        <img
          src={logo}
          alt="FreshCart"
          className="sm:hidden w-40 mb-8 mx-auto block"
        />
        {fMail?.email && fMail?.verified ? (
          <PasswordResetForm />
        ) : fMail?.email ? (
          <VerifyCodeForm />
        ) : (
          <ForgotPasswordForm />
        )}
      </div>
    </div>
  );
}
