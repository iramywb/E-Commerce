import axios from "axios";
import style from "./LatestProducts.module.css";
import { useEffect, useState } from "react";
import { FaS, FaStar } from "react-icons/fa6";
import ProductItem from "../ProductItem/ProductItem";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => setProducts(res.data.data));
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="row">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="w-1/5 p-2" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))
      ) : (
        <h1>Loading..</h1>
      )}
    </div>
  );
}
