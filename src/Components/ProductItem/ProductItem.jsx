import { FaStar } from "react-icons/fa6";
import style from "./ProductItem.module.css";
import PropTypes from 'prop-types';

export default function ProductItem( {product} ) {
  return (
    <div className="product inner p-2">
      <img src={product.imageCover} className="w-full" alt="" />
      <small className="text-green-600">{product.category?.name}</small>
      <h5 className="font-semibold line-clamp-1">{product.title}</h5>
      <div className="flex justify-between">
        <span>{product.price} EGP</span>
        <span className="flex items-center">
          <FaStar className="text-yellow-300" /> {product.ratingsAverage}
        </span>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    imageCover: PropTypes.string.isRequired,
    category: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
  }).isRequired,
};