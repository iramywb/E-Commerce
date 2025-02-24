import { useFormik } from "formik";
import { FaLock } from "react-icons/fa";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import * as Yup from "yup";
import { TokenContext } from "../../Context/TokenContext";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
export default function VerifyCodeForm() {
  const {
    fError,
    fMail,
    formatSeconds,
    handleForgotPassword,
    handleVerifyCode,
    clearFError,
  } = useContext(TokenContext);
  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .trim()
      .required("Reset code is required")
      .matches(/^\d+$/, "Reset code must be a number"),
  });
  function resendCode() {
    toast.promise(handleForgotPassword({ email: fMail.email }), {
      loading: "Sending code ...",
      success: "Code sent successfully",
      error: "Failed to send the code",
    });
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleVerifyCode,
  });
  useEffect(() => {
    if (fError) clearFError();
  }, [formik.values.resetCode]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-6">
        <h2 className="text-gray-800 text-center text-2xl font-bold">
          Code Verification
        </h2>
        <div className="space-y-4 text-gray-600 mb-6">
          <div className="flex items-start">
            <FaLock className="h-5 w-5 mr-2 mt-1 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-gray-800">
                {`We've sent a verification code to your email. Please:`}
              </p>
              <ol className="mt-2 space-y-2">
                <li className="flex items-center">
                  <FiClock className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  Check your inbox (including spam/junk folder)
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
                  Enter the code below within 10 minutes
                </li>
              </ol>
              <div className="mt-4 text-sm">
                {`Can't find it? `}
                <Link
                  type="button"
                  onClick={resendCode}
                  className="text-green-600 hover:text-green-400 font-medium"
                >
                  Resend Code
                </Link>{" or contact "}
                <Link
                  to="mailto:support@yourdomain.com"
                  className="text-green-600 hover:text-green-400 font-medium"
                >
                  support@yourdomain.com
                </Link>
              </div>
            </div>
          </div>
        <hr />
        <div className="mt-4 text-sm text-center">
          Code expires in: <span className="font-bold">{formatSeconds()}</span>
        </div>
        </div>
        <div>
          <label
            htmlFor="resetCode"
            className="text-gray-800 text-sm mb-2 block"
          >
            Verification Code
          </label>
          <input
            autoComplete="off"
            type="tel"
            id="resetCode"
            name="resetCode"
            placeholder="Enter your verification code"
            onChange={formik.handleChange}
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
          />
          {((formik.touched.resetCode && formik.errors.resetCode) ||
            fError) && (
            <p className="text-xs text-red-500 flex items-center mt-2">
              <AiOutlineCloseCircle className="mr-1 text-base" />
              {formik.errors.resetCode || fError}
            </p>
          )}
        </div>
      </div>
      <div className="!mt-8">
        <button
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          type="submit"
          className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "Sending..." : "Send Verification Code"}
        </button>
      </div>
    </form>
  );
}
