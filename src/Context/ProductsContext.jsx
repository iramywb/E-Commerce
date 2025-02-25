import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {
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
    <ProductsContext.Provider value={{products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  );
}
