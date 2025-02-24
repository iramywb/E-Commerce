import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import logo from "../../assets/images/freshcart-logo.svg";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Register() {
  // function validate(values) {
  //   let errors = {};

  //   let nameReg = /^[a-zA-Z\s]+$/;
  //   let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  //   let passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   let phoneReg = /^01[0125][0-9]{8}$/;

  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Name must be at least 3 characters";
  //   } else if (values.name.length > 20) {
  //     errors.name = "Name must be less than 20 characters";
  //   } else if (!nameReg.test(values.name)) {
  //     errors.name = "Name must contain only letters and spaces";
  //   }

  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!emailReg.test(values.email)) {
  //     errors.email = "Invalid email format";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (!passwordReg.test(values.password)) {
  //     errors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "Re-password is required";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "Passwords do not match";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "Phone number is required";
  //   } else if (!phoneReg.test(values.phone)) {
  //     errors.phone = "Invalid phone number format";
  //   }

  //   return errors;
  // }

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  async function handleRegister(data) {
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", data)
      .then(() => {
        setError(null);
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be less than 20 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),

    email: Yup.string()
      .email("Invalid email format")
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
    rePassword: Yup.string()
      .required("Re-password is required")
      .oneOf([Yup.ref("password"), null], "Passwords do not match"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number format"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate,
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="flex flex-col justify-center font-[sans-serif] min-h-screen p-4 bg-gray-50">
      <div className="max-w-md w-full mx-auto border rounded-2xl p-8 bg-white">
        <img
          src={logo}
          alt="FreshCart"
          className="sm:hidden w-40 mb-8 mx-auto block"
        />
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            {error && (
              <div className="bg-red-500 text-white p-2 rounded">{error}</div>
            )}
            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm mb-2 block"
              >
                Full name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <AiOutlineCloseCircle className="mr-1 text-base" />
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-gray-800 text-sm mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
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
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <AiOutlineCloseCircle className="mr-1 text-base" />
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="rePassword"
                className="text-gray-800 text-sm mb-2 block"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                placeholder="Repeat your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <AiOutlineCloseCircle className="mr-1 text-base" />
                  {formik.errors.rePassword}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="text-gray-800 text-sm mb-2 block"
              >
                Egyptian phone number (ex. 01200000000)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <AiOutlineCloseCircle className="mr-1 text-base" />
                  {formik.errors.phone}
                </p>
              )}
            </div>
            {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="text-gray-800 ml-3 block text-sm"
                >
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-green-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div> */}
          </div>
          <div className="!mt-8">
            <button
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting
                ? "Creating account..."
                : "Create an account"}
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>

    // <section className="dark:bg-gray-900">
    //   <form
    //     className="w-1/2 mx-auto bg-gray-50 shadow p-3"
    //     onSubmit={formik.handleSubmit}
    //   >
    //     <h1 className="text-3xl text-center font-bold my-5">Register Now</h1>
    //     {error && (
    //       <div className="bg-red-500 text-white p-2 rounded">{error}</div>
    //     )}
    //     <div className="mb-5">
    //       <label
    //         htmlFor="name"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your name
    //       </label>
    //       <input
    //         onChange={formik.handleChange}
    //         type="text"
    //         id="name"
    //         name="name"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
    //         placeholder="Enter your name"
    //         value={formik.values.name}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.name && formik.errors.name && (
    //         <small className="text-red-500 text-sm mt-1">
    //           {formik.errors.name}
    //         </small>
    //       )}
    //     </div>
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
    //     <div className="mb-5">
    //       <label
    //         htmlFor="rePassword"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Confirm your password
    //       </label>
    //       <input
    //         onChange={formik.handleChange}
    //         type="password"
    //         id="rePassword"
    //         name="rePassword"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
    //         placeholder="Repeat your password"
    //         value={formik.values.rePassword}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.rePassword && formik.errors.rePassword && (
    //         <small className="text-red-500 text-sm mt-1">
    //           {formik.errors.rePassword}
    //         </small>
    //       )}
    //     </div>
    //     <div className="mb-5">
    //       <label
    //         htmlFor="phone"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your phone number
    //       </label>
    //       <input
    //         onChange={formik.handleChange}
    //         type="tel"
    //         id="phone"
    //         name="phone"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
    //         placeholder="Enter your phone number"
    //         value={formik.values.phone}
    //         onBlur={formik.handleBlur}
    //       />
    //       {formik.touched.phone && formik.errors.phone && (
    //         <small className="text-red-500 text-sm mt-1">
    //           {formik.errors.phone}
    //         </small>
    //       )}
    //     </div>
    //     <button
    //       disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
    //       type="submit"
    //       className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
    //     >
    //       {formik.isSubmitting ? "Registering..." : "Register"}
    //     </button>
    //     <small>
    //       {"Already have an account? "}
    //       <Link to={"/login"} className="text-green-600 hover:underline">
    //         Login
    //       </Link>
    //     </small>
    //   </form>
    // </section>
  );
}
