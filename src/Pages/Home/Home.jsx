import { Helmet } from 'react-helmet'
import CategorySlider from '../../Components/CategorySlider/CategorySlider'
import LatestProducts from '../../Components/LatestProducts/LatestProducts'
import MainSlider from '../../Components/MainSlider/MainSlider'
import style from './Home.module.css'

export default function Home() {
  return (
    <div>
      <Helmet>
          <title>Homepage</title>
        </Helmet>
      <MainSlider />
      <CategorySlider />
      <LatestProducts />
    </div>
  )
}
