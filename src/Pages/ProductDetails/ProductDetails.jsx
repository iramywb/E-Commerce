import { Link, useParams } from "react-router-dom";
import style from "./ProductDetails.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaHome, FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Slider from "react-slick";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  async function getProduct() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => setProduct(null));
  }
  useEffect(() => {
    getProduct();
  }, []);
  if (product)
    return (
      <div className="flex items-center">
        <Helmet>
          <title>{product.title}</title>
        </Helmet>
        <div className="w-1/4">
          <Slider {...settings}>
            {product.images?.map((image, i) => (
              <img src={image} alt="" key={i} />
            ))}
          </Slider>
        </div>
        <div className="w-3/4">
          <div className="inner p-8">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <p className="text-gray-700 font-medium my-4">
              {product.description}
            </p>
            <small>{product.category?.name}</small>
            <div className="flex justify-between">
              <span>{product.price} EGP</span>
              <span className="flex items-center">
                <FaStar className="text-yellow-300" /> {product.ratingsAverage}
              </span>
            </div>
            <div className="btn text-center ">
              Add to cart <FaCartShopping className="inline text-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col gap-3 justify-center items-center">
        <Helmet>
          <title>Item | Not Found</title>
        </Helmet>
        <p className="m-auto">Item Not Found</p>
        <Link className="btn" to={"/"}>
          Go to home page <FaHome className="inline" />
        </Link>
      </div>
    );
}
