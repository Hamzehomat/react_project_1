import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import { useContext } from "react";
import { UserContext } from "../context/User1";
import { FaHome } from "react-icons/fa";
import { Link  } from "react-router-dom";
import Protected from "../Protected";
import { FaBars } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";


export default function Navbar() {
  const { setAuth, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
      localStorage.removeItem("usertoken");
      setUserToken(null);
      navigate("/");
    };
  return (
    <>
             

      <nav className="navbar bg-body-tertiary relative-top">
        <div className="container-fluid">
          <NavLink to="/home">
            <FaHome />
          </NavLink>
          <span className="nav-item">
            <NavLink className="nav-link " to="/categories">
              Categories
            </NavLink>
          </span>
          <span className="nav-item">
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </span>
          <span className="nav-item">
            <NavLink className="nav-link" to="/cart">
              <FaCartShopping />
            </NavLink>
          </span>
         <a className="nav-item dropdown">
  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Account
  </a>
  <ul className="dropdown-menu">
  <NavLink className="dropdown-item" to="/signin"> Sign in</NavLink>  
  <NavLink className="dropdown-item" to="/signup"> Sign up</NavLink>
  <Protected><NavLink className="dropdown-item" onClick={logout}>  logout </NavLink> </Protected>

  </ul>
</a>


          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Shopy
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    to="/home"
                    className="nav-link active"
                    aria-current="page"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    {" "}
                    Cart{" "}
                  </NavLink>
                </li>
  <li className="nav-item dropdown">
    <a
      className="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Account
    </a>
    <ul className="dropdown-menu">
      <li>
        <NavLink className="dropdown-item" to="/signin">
          Sign in
        </NavLink>
      </li>
      <li>
        <NavLink className="dropdown-item" to="/signup">
          Sign up
        </NavLink>
      </li>
    </ul>
  </li>
                  <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Account
                  </a>
                  <ul className="dropdown-menu">
                    <NavLink className="dropdown-item" to="/signin">
                      {" "}
                      Sign in
                    </NavLink>
                    <NavLink className="dropdown-item" to="/signup">
                      {" "}
                      Sign up{" "}
                    </NavLink>
                    <Protected>
                      <NavLink className="dropdown-item" onClick={logout}>
                        {" "}
                        logout{" "}
                      </NavLink>
                    </Protected>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
