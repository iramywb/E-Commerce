import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import style from './MainLayout.module.css'

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className="container flex-grow py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
