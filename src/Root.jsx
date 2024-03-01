import Navbar from './pages/navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}
