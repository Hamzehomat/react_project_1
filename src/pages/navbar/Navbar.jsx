import {NavLink} from 'react-router-dom'
import './navbar.css'
import 'bootstrap-icons/font/bootstrap-icons.css'



export default function Navbar() {
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <NavLink className="nav-link " to='/categories'>Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/products" >Products</NavLink>
        </li>
          <NavLink className="nav-link" to="/cart" >
           <i className="bi bi-cart" />
          </NavLink>
          <div className='sign'> 
           <NavLink className="nav-link" to="/signin" > Sign in</NavLink>
          <NavLink className="nav-link"  to="/signup" > Sign up</NavLink>
          </div>
      </ul>
    </div>
  </div>
</nav>
</>
  )
}
