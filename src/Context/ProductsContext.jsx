import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProductsContext = createContext();

export default function ProductsContextProvider({ children }) {

  function getProducts(page) {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/products?limit=20&page=" + page)
  }

  return (
    <ProductsContext.Provider value={{getProducts}}>
      {children}
    </ProductsContext.Provider>
  );
}
