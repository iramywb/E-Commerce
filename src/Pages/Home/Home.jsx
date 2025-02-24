import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import MainSlider from "../../Components/MainSlider/MainSlider";
import LatestProducts from "../../Components/LatestProducts/LatestProducts";

export default function Home() {
  return (
    <section className="container py-8">
      <MainSlider className="min-h-svh" />
      <CategorySlider />
      <LatestProducts />
    </section>
  );
}
