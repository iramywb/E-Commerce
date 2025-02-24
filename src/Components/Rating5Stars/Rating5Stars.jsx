import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";

export default function Rating5Stars({ rate, className }) {
  return Array.from({ length: 5 }).map((_, i) => {
    if (i + 1 <= rate) {
      return <FaStar key={i} className={className} />;
    } else if (i + 0.5 < rate) {
      return <FaStarHalfStroke key={i} className={className} />;
    } else return <FaRegStar key={i} className={className} />;
  });
}
