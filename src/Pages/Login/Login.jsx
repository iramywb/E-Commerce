import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from "../../Context/TokenContext";
import logo from "./../../assets/images/freshcart-logo.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Login() {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  async function handleLogin(data) {
    setShowPassword(false);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((res) => {
        setError(null);
        navigate("/");
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
  return (
    <div className="font-[sans-serif] bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <img
              src={logo}
              alt="FreshCart"
              className="sm:hidden w-40 mb-8 mx-auto block"
            />
            <form className="mt-8 space-y-4" onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md focus:ring-green-600 focus:border-green-600"
                    onChange={formik.handleChange}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <circle cx={10} cy={7} r={6} data-original="#000000" />
                    <path
                      d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-xs text-red-500 flex items-center mt-2">
                    <AiOutlineCloseCircle className="mr-1 text-base" />
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-gray-800 text-sm mb-2 block"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md focus:ring-green-600 focus:border-green-600"
                    onChange={formik.handleChange}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-4 h-4 absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-xs text-red-500 flex items-center mt-2">
                    <AiOutlineCloseCircle className="mr-1 text-base" />
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    to="/forgotPassword"
                    className="text-green-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="!mt-8">
                <button
                  disabled={
                    !formik.isValid || !formik.dirty || formik.isSubmitting
                  }
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {formik.isSubmitting ? "Signing in..." : "Sign In"}
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                {"Don't have an account? "}
                <Link
                  to="/register"
                  className="text-green-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>

    // <section className="dark:bg-gray-900">
    //   <form
    //     className="w-1/2 mx-auto bg-gray-50 shadow p-3"
    //     onSubmit={formik.handleSubmit}
    //   >
    //     <h1 className="text-3xl text-center font-bold my-5">Login Now</h1>
    //     {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
    //     <div className="mb-5">
    //       <label
    //         htmlFor="email"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your email
    //       </label>
    //       <input
    //         onChange={formik.handleChange}
    //         type="email"
    //         id="email"
    //         name="email"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
    //         placeholder="Enter your email"
    //         value={formik.values.email}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.email && formik.errors.email && (
    //         <small className="text-red-500 text-sm mt-1">
    //           {formik.errors.email}
    //         </small>
    //       )}
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="password"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your password
    //       </label>
    //       <input
    //         onChange={formik.handleChange}
    //         type="password"
    //         id="password"
    //         name="password"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
    //         placeholder="Enter your password"
    //         value={formik.values.password}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.password && formik.errors.password && (
    //         <small className="text-red-500 text-sm mt-1">
    //           {formik.errors.password}
    //         </small>
    //       )}
    //     </div>
    //     <button
    //       disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
    //       type="submit"
    //       className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
    //     >
    //       {formik.isSubmitting ? "Logging in..." : "Login"}
    //     </button>
    //     <small>
    //       {"Don't have an account? "}
    //       <Link to={"/register"} className="text-green-600 hover:underline">
    //         Register
    //       </Link>
    //     </small>
    //   </form>
    // </section>
  );
}
