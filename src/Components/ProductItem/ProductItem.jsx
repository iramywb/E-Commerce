import { FaCartShopping, FaStar } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function ProductItem({ product }) {
  const { addToCart } = useContext(CartContext);
  return (
    <div className="product inner p-2">
      <Link to={`/product/${product.id}`}>
        <img src={product.imageCover} className="w-full" alt="" />
        <small className="text-green-600">{product.category?.name}</small>
        <h5 className="font-semibold line-clamp-1">{product.title}</h5>
        <div className="flex justify-between">
          <span>{product.price} EGP</span>
          <span className="flex items-center">
            <FaStar className="text-yellow-300" /> {product.ratingsAverage}
          </span>
        </div>
      </Link>
      <button
        className="btn block text-center font-semibold"
        onClick={() => addToCart(product.id)}
      >
        Add to cart <FaCartShopping className="inline text-lg" />
      </button>
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
    id: PropTypes.string.isRequired,
  }).isRequired,
};
