// pages/Categories.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import LazyLoad from "react-lazyload";
import Accordion from "../../Components/Accordion/Accordion";
import Loader from "../../Components/Loader/Loader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Categories() {
  const [categories, setCategories] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState({});
  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => setCategories(res.data.data))
      .catch(console.error);
  }, []);

  const handleAccordionToggle = (categoryId, isOpen) => {
    setExpandedCategory(isOpen ? categoryId : null);
    if (isOpen && !subCategories[categoryId]) {
      fetchSubCategories(categoryId);
    }
  };

  const fetchSubCategories = (categoryId) => {
    setLoadingStates((prev) => ({ ...prev, [categoryId]: true }));
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      )
      .then((res) => {
        setSubCategories((prev) => ({
          ...prev,
          [categoryId]: res.data.data,
        }));
      })
      .finally(() => {
        setLoadingStates((prev) => ({ ...prev, [categoryId]: false }));
      });
  };

  return (
    <section className="container py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Product Categories
      </h1>

      {categories ? (
        <Swiper
          spaceBetween={12}
          slidesPerView={1.3}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3.3,
              spaceBetween: 32,
            },
          }}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id} className="h-auto">
              <div className="h-full px-2 pb-10">
                <div className="h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <LazyLoad height={300} offset={100}>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </LazyLoad>
                  </div>

                  <Accordion
                    isOpen={expandedCategory === category._id}
                    onToggle={(isOpen) =>
                      handleAccordionToggle(category._id, isOpen)
                    }
                    header={
                      <h3 className="text-xl font-semibold text-gray-900 pr-2">
                        {category.name}
                      </h3>
                    }
                    className="border-none"
                    headerClassName="hover:bg-gray-50 px-6 py-4"
                    contentClassName="bg-gray-50"
                  >
                    <div className="p-6 pt-4">
                      {loadingStates[category._id] ? (
                        <div className="flex justify-center py-4">
                          <Loader size="small" />
                        </div>
                      ) : subCategories[category._id]?.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {subCategories[category._id].map((sub) => (
                            <span
                              key={sub._id}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg 
                                      hover:bg-gray-100 transition cursor-pointer truncate 
                                        shadow-sm"
                              title={sub.name}
                            >
                              {sub.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm text-center py-4">
                          No subcategories available
                        </p>
                      )}
                    </div>
                  </Accordion>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      )}
    </section>
  );
}
