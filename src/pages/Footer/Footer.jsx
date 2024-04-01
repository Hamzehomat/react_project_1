import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaHome } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import './Footer.css'





export default function Footer() {
  return (
    <div className='container'>
        <div className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
                <Link to='/'  className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                 <FaHome />
                </Link>
                <span className="mb-3 mb-md-0 text-body-secondary"> © 2024 Shop, Inc </span>
            </div>
            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
              <Link to="https://www.facebook.com/hamzeh.omat" className="ms-3"> <IoLogoFacebook /> </Link>
              <Link to="https://www.linkedin.com/in/hamzeh-omat-b9856b266/" className="ms-3"> <IoLogoLinkedin /> </Link>
              <Link to='https://github.com/Hamzehomat' className="ms-3"> <IoLogoGithub /> </Link>

            </ul>


        </div>
    </div>
  )
}
