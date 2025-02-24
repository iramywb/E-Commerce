import axios from "axios";
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";

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
          <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
