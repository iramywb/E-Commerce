import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import LazyLoad from "react-lazyload";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  async function getBrands() {
    // https://ecommerce.routemisr.com/api/v1/brands?limit=10
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => setBrands(res.data.data))
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <section className="container py-8">
      <h1 className="text-2xl font-bold mb-4">All Brands</h1>
      <div className="flex flex-wrap justify-around">
        
          {console.log(brands)}
        {brands.length > 0 ? (
          brands.map((brand) => (
            <div
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-80"
              key={brand._id}
            >
              {/* make brand item */}
              <div className="bg-white p-4 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                <LazyLoad offset={100} className="min-h-40">
                  <img src={brand.image} alt={brand.name} />
                </LazyLoad>
                <h2 className="text-lg font-bold">{brand.name}</h2>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
