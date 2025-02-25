import { useContext, useEffect, useState } from "react";
import { NavActionsContext } from "../../Context/NavActionsContext";
import { GoSearch } from "react-icons/go";
import { ProductsContext } from "../../Context/ProductsContext";
import ProductItem from "../../Components/ProductItem/ProductItem";
import Loader from "../../Components/Loader/Loader";

export default function Products() {
  const { displaySearch, search, handleSearch } = useContext(NavActionsContext);
  const { getProducts } = useContext(ProductsContext);

  const [products, setProducts] = useState([]);
    
    useEffect(() => {
      getProducts().then((res) => setProducts(res.data.data));
    }, []);

  useEffect(() => {
    const cleanup = displaySearch();
    return cleanup;
  }, [displaySearch]);
  return (
    <section className="container py-8">
      <div className="flex md:hidden gap-4 justify-center mb-4 font-[sans-serif]">
        <div className="flex w-full sm:max-w-xs bg-gray-100 rounded outline outline-transparent border focus-within:border-green-600 focus-within:bg-transparent transition-all">
          <input
            type="text"
            onChange={handleSearch}
            value={search}
            placeholder="Search something..."
            className="w-full text-sm bg-transparent rounded outline-none px-2 border-none focus:!ring-0"
          />
          <div className="flex-shrink-0 w-auto flex items-center justify-center">
            <GoSearch className="text-gray-400 h-full w-auto p-2" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {products.length > 0 ?
        products.map(
          (product) =>
            product.title.toLowerCase().includes(search.toLowerCase()) && (
              <div
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-80"
                key={product.id}
              >
                <ProductItem product={product} key={product.id} />
              </div>
            )
        ) : (
          <Loader />
        )
        }
      </div>
    </section>
  );
}