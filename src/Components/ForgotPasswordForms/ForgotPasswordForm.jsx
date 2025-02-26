import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiMail, FiShield } from "react-icons/fi";
import { FaLock } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";

export default function ForgotPasswordForm({ tools }) {
  const { setFormMail } = tools;
  // const { handleForgotPassword, fError } = useContext(TokenContext);
  const [error, setError] = useState(null);
  async function handleForgotPassword(values) {
    // if (values.email && formMail.email) values = { email };
    const res = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: values.email,
      })
      .catch((err) => setError(err.response.data.message));
    // setEmailHandler(res, values.email);
    if (res?.data.statusMsg === "success")
      setFormMail((prev) => ({ ...prev, email: values.email }));
    return res;
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => await handleForgotPassword(values),
  });
  useEffect(() => setError(null), [formik.values.email]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-6">
        <h2 className="text-gray-800 text-center text-2xl font-bold">
          Forgot Password
        </h2>
        <div className="space-y-4 text-gray-600 mb-6">
          <div className="flex items-start">
            <FaLock className="w-5 h-5 mr-2 mt-1 text-green-600 flex-shrink-0" />
            <div className="flex-1">
              Enter your registered email below to receive a secure verification
              code. This code will:
              <ol className="list-disc mt-2 space-y-2">
                <li className="flex items-center">
                  <FiMail className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  Provide access to reset your password
                </li>
                <li className="flex items-center">
                  <FiShield className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                  Verify your account ownership securely
                </li>
              </ol>
              {/* Rest of the content */}
            </div>
          </div>
          <hr />
        </div>
        {/* <p>
          Enter your registered email address below. We will send a verification
          code to your inbox.
          <br />
          This code will allow you to reset your password securely.
        </p> */}
        <div>
          <label htmlFor="email" className="text-gray-800 text-sm mb-2 block">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {((formik.touched.email && formik.errors.email) || error) &&
            formik.isValid && (
              <p className="text-xs text-red-500 flex mt-2">
                <AiOutlineCloseCircle className="mr-1 text-base" />
                {formik.errors.email || error}
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
ForgotPasswordForm.propTypes = {
  tools: PropTypes.shape({
    setFormMail: PropTypes.func.isRequired,
  }).isRequired,
};
