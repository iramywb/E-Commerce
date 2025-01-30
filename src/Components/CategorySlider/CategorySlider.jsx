import axios from "axios";
import style from "./CategorySlider.module.css";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };
  async function getCategories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Slider {...settings} className="mb-8 mx-10">
      {categories.map((category) => (
        <div className="h-full" key={category._id}>
          <img src={category.image} className="w-full h-[400px]" alt={category.name} />
          <h4 className="text-center m-3 font-semibold">{category.name}</h4>
        </div>
      ))}
    </Slider>
  );
}
