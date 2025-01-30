import { Link, useNavigate } from "react-router-dom";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Helmet } from "react-helmet";

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
      .then((res) => {
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
    <section className="dark:bg-gray-900">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <form
        className="w-1/2 mx-auto bg-gray-50 shadow p-3"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-3xl text-center font-bold my-5">Register Now</h1>
        {error && (
          <div className="bg-red-500 text-white p-2 rounded">{error}</div>
        )}
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            onChange={formik.handleChange}
            type="text"
            id="name"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <small className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </small>
          )}
        </div>
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm your password
          </label>
          <input
            onChange={formik.handleChange}
            type="password"
            id="rePassword"
            name="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Repeat your password"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword && (
            <small className="text-red-500 text-sm mt-1">
              {formik.errors.rePassword}
            </small>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone number
          </label>
          <input
            onChange={formik.handleChange}
            type="tel"
            id="phone"
            name="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Enter your phone number"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone && (
            <small className="text-red-500 text-sm mt-1">
              {formik.errors.phone}
            </small>
          )}
        </div>
        <button
          disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? "Registering..." : "Register"}
        </button>
        <small>
          {"Already have an account? "}
          <Link to={"/login"} className="text-green-600 hover:underline">
            Login
          </Link>
        </small>
      </form>
    </section>
  );
}
