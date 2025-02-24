import { useFormik } from "formik";
import * as Yup from "yup";
import { FaLock } from "react-icons/fa";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PasswordResetForm() {
  const { handleResetPassword, fMail, setToken, cleanStart } =
    useContext(TokenContext);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Password confirmation is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: fMail.email,
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      return toast
        .promise(
          handleResetPassword({
            email: fMail.email,
            newPassword: values.password,
          }),
          {
            loading: "Resetting password ...",
            success: "Password reset successfully",
            error: (err) => err.response.data.message || "Unknown Error",
          }
        )
        .then((res) => {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          cleanStart();
          navigate("/");
        })
        .catch((err) => err.status === 400 && cleanStart());
    },
  });
  return (
    <div className="space-y-4 text-gray-600 mb-6">
      <div className="flex items-start">
        <FaLock className="h-5 w-5 mr-2 mt-1 text-green-600 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-gray-800 mb-4">
            {`Create a new password for your account. Make sure it's:`}
          </p>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  } focus:outline-none focus:ring-2`}
                  placeholder="New Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {formik.errors.password}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-green-500"
                  } focus:outline-none focus:ring-2`}
                  placeholder="Confirm New Password"
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className={`w-full py-2.5 px-4 text-sm font-medium text-white rounded-lg transition-colors ${
                  formik.isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                }`}
              >
                {formik.isSubmitting ? "Updating..." : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
