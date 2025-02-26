import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { ProductsContext } from "../../Context/ProductsContext";
import Pagination from "../../Components/Pagination/Pagination";

export default function LatestProducts() {
  const { getProducts } = useContext(ProductsContext);

  const [products, setProducts] = useState(null);

  function updateProducts(page = 1) {
    if (products && (products.metadata.numberOfPages < page || page < 1)) return;
    setProducts(null);
    getProducts(page).then((res) => setProducts(res.data));
  }

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      {products ? (
        <>
          <div className="flex flex-wrap">
            {products.data.map((product) => (
              <div
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-80"
                key={product.id}
              >
                <ProductItem product={product} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={products.metadata.currentPage}
            totalPages={products.metadata.numberOfPages}
            onPageChange={(page) => updateProducts(page)}
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
