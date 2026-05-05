import { TypeAnimation } from "react-type-animation";
import { HiOutlineShieldCheck, HiOutlineShoppingBag, HiOutlineTruck } from "react-icons/hi2";
import { TiArrowRightOutline } from "react-icons/ti";
import NewArrivals from "../../assets/images/New Arrivals.jpg";
import MenFashion from "../../assets/images/Man-Fashion.jpg";
import WomenFashion from "../../assets/images/Woman-Fashion.jpg";

export default function Hero() {
  return (
    <section className="bg-white pb-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Elevate Your Style with
              <br />
              <TypeAnimation
                sequence={[
                  "Premium Denim",
                  2000,
                  "Timeless Classics",
                  2000,
                  "Modern Essentials",
                  2000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className="text-green-600"
              />
            </h1>

            <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover curated collections that blend contemporary design with
              timeless elegance. Shop our sustainable fashion essentials.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-green-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                Shop Collection
                <TiArrowRightOutline className="w-5 h-5" />
              </button>
              <button className="border-2 border-green-600 text-black px-8 py-4 rounded-md font-semibold hover:bg-green-600 hover:text-white transition-colors">
                New Arrivals
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <HiOutlineTruck className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-black">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineShieldCheck className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-black">
                  Secure Payments
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineShoppingBag className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-black">
                  Easy Returns
                </span>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="order-1 lg:order-2 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative rounded-lg overflow-hidden">
                <img
                  src={NewArrivals}
                  alt="New Arrivals"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/30 p-6">
                  <p className="text-white text-lg">
                    <span className="text-green-600 font-bold">
                      New Arrivals
                    </span>
                    <br />
                    Up to 30% Off
                  </p>
                </div>
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={MenFashion}
                  alt="Men's Fashion"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={WomenFashion}
                  alt="Women's Fashion"
                  className="w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
