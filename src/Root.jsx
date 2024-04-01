import { Outlet } from 'react-router-dom'
import Navbar from './pages/navbar/Navbar.jsx'
import Footer from './pages/Footer/Footer.jsx'

export default function Root() {
  return (
    <>
    <div className='base'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
    </>
  
  )
}
