import style from './Login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
    
      const [error, setError] = useState(null);
      const navigate = useNavigate();
      const { setToken } = useContext(TokenContext);
      async function handleLogin(data) {
        await axios
          .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
          .then((res) => {
            setError(null);
            navigate("/");
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
          }).catch((err) => {
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
    <section className="dark:bg-gray-900">
      <form
        className="w-1/2 mx-auto bg-gray-50 shadow p-3"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-3xl text-center font-bold my-5">Login Now</h1>
        {error && <div className="bg-red-500 text-white p-2 rounded">{error}</div>}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={formik.handleChange}
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <small className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={formik.handleChange}
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <small className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </small>
          )}
        </div>
        <button
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
        <small>
          {"Don't have an account? "}
          <Link to={"/register"} className="text-blue-600 hover:underline">
            Register
          </Link>
        </small>
      </form>
    </section>
  );
}
