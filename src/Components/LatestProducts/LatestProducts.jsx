import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import { ProductsContext } from "../../Context/ProductsContext";

export default function LatestProducts() {

  const { products } = useContext(ProductsContext);

  return (
    <div className="flex flex-wrap justify-around">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-80" key={product.id}>
            <ProductItem product={product} />
          </div>
        ))
      ) : (
        <Loader />
      )}
    </div>
  );
}
