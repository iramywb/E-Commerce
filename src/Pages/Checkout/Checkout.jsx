import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { BiCreditCard } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";

export default function Checkout() {
  const { cart, getCart } = useContext(CartContext);
  const { token } = useContext(TokenContext);
  const [isOnline, setIsOnline] = useState(true);
  const headers = { token };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    details: Yup.string()
      .required("Details is required")
      .min(5, "Details must be at least 5 characters"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number format"),
  });

  function cashRequest(data) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/" + cart.cartId,
        {
          shippingAddress: data,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function onlineRequest(data) {
    const params = { url: "http://localhost:5173" };
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" +
          cart.cartId,
        {
          shippingAddress: data,
        },
        {
          headers,
          params,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function handleCheckout(data) {
    let res = await (isOnline ? onlineRequest(data) : cashRequest(data));
    if (isOnline) {
      window.location.href = res.data.session.url;
      return res;
    } else {
      if (res.status === 201) {
        getCart();
        navigate("/allorders");
      }
    }
    return res;
  }
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: handleCheckout,
  });

  useEffect(() => {
    if (cart && !cart.cartId) navigate("/cart");
  }, [cart]);

  return (
    <div className="flex flex-col justify-center font-[sans-serif] min-h-screen p-4 bg-gray-50">
      <div className="max-w-xl w-full mx-auto border rounded-2xl p-8 bg-white">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="details"
                className="text-gray-800 text-sm mb-2 block"
              >
                Details:
              </label>
              <input
                type="text"
                id="details"
                name="details"
                placeholder="Enter your details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
              {formik.touched.details && formik.errors.details && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <AiOutlineCloseCircle className="mr-1 text-base" />
                  {formik.errors.details}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="text-gray-800 text-sm mb-2 block"
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter your city"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-green-500 focus:ring-green-600 focus:border-green-600"
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-xs text-red-500 flex items-center mt-2">
                  <AiOutlineCloseCircle className="mr-1 text-base" />
                  {formik.errors.city}
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
            {/* Payment Method */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <input
                  type="radio"
                  id="creditPayment"
                  name="paymentMethod"
                  className="hidden peer"
                  defaultChecked
                />
                <label
                  htmlFor="creditPayment"
                  onClick={() => setIsOnline(true)}
                  className="rounded-lg border-2 border-gray-200 bg-gray-100 hover:bg-white 
                peer-checked:border-gray-600 peer-checked:bg-white 
               p-4 ps-4 cursor-pointer transition-colors duration-200 block"
                >
                  <div className="flex items-center">
                    <BiCreditCard className="text-2xl" />
                    <div className="ms-4 text-sm">
                      <span className="font-medium text-gray-900">
                        Credit Card
                      </span>
                      <p className="mt-1 text-xs text-gray-500">
                        Pay with your credit card
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="cashPayment"
                  name="paymentMethod"
                  className="hidden peer"
                />
                <label
                  htmlFor="cashPayment"
                  onClick={() => setIsOnline(false)}
                  className="rounded-lg border-2 border-gray-200 bg-gray-100 hover:bg-white 
                peer-checked:border-gray-600 peer-checked:bg-white 
               p-4 ps-4 cursor-pointer transition-colors duration-200 block"
                >
                  <div className="flex items-center">
                    <GiTakeMyMoney className="text-2xl" />
                    <div className="ms-4 text-sm">
                      <span className="font-medium text-gray-900">
                        Payment on delivery
                      </span>
                      <p className="mt-1 text-xs text-gray-500">
                        + Additional fees may apply
                      </p>
                    </div>
                  </div>
                </label>
              </div>
              {/* <label className="rounded-lg border border-gray-200 bg-gray-100 hover:bg-gray-50 p-4 ps-4 cursor-pointer">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      className="h-4 w-4 border-gray-300 text-green-400 bg-white focus:ring-0"
                    />
                  </div>
                  <div className="ms-4 text-sm">
                    <span className="font-medium leading-none text-gray-900">
                      {" "}
                      Payment on delivery{" "}
                    </span>
                    <p
                      id="pay-on-delivery-text"
                      className="mt-1 text-xs font-normal text-gray-500"
                    >
                      +$15 payment processing fee
                    </p>
                  </div>
                </div>
              </label> */}
            </div>
          </div>
          <div className="!mt-8">
            <button
              disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting
                ? isOnline
                  ? "Securing Payment Gateway"
                  : "Processing Cash Order"
                : isOnline
                ? "Proceed to Card Payment"
                : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
