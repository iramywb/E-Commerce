import style from "./MainSlider.module.css";
import img1 from "./../../assets/images/slider-image-1.jpeg";
import img2 from "./../../assets/images/slider-image-2.jpeg";
import img3 from "./../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="flex mb-16">
      <div className="w-2/3">
        <Slider {...settings} className="h-full w-full">
          <img src={img1} className="h-[500px] w-full" alt="" />
          <img src={img2} className="h-[500px] w-full" alt="" />
          <img src={img3} className="h-[500px] w-full" alt="" />
        </Slider>
      </div>
      <div className="w-1/3">
        <img src={img2} className="h-[250px] w-full" alt="" />
        <img src={img3} className="h-[250px] w-full" alt="" />
      </div>
    </div>
  );
}
