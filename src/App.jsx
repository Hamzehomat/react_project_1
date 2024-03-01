import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Home from './pages/home/Home.jsx'
import Root from './Root.jsx'
import Categories from './pages/categories/Categories.jsx'
import Products from './pages/Products/Products.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Signin from './pages/signin/Signin.jsx'
import Signup from './pages/signup/signup.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { useEffect, useState } from 'react'
const router = createBrowserRouter ([
  {
  path : "/",
  element : <Root />,
    children:[{
    path : '/home',
    element : <Home />,
    },
{
  path :"/categories",
  element : <Categories />,
},
{
  path : "/products",
  element : <Products />,
},
{
  path : "/cart",
  element : <Cart />,
},
{
  path :"/signin",
  element : <Signin />,
},
{
  path :"/signup",
  element : <Signup />,
},
],
 },
]);
function App() {
  const [products , setproducts] = useState([])
  const getproducts = async ()=>{
    const response = await fetch(`https://ecommerce-node4.vercel.app/categories/active?page=1&limit=8`)
    const data = await response.json();
    setproducts(data.categories)
  }
  useEffect (()=>{
    getproducts();
  },[])

  return (
    <>
    <RouterProvider router={router} />
    <div className='p-container'>
    {products.map(product=>
      <div className="product" key={product.id}>
      <div className="card" style={{width: '18rem'}}>
   <img className="card-img-top" src={product.image.secure_url} alt="Card image cap" />
   <div className="card-body">
    <p className="card-text">{product.name}</p>
    </div>
    </div>
</div>    )}
</div>
     </>
     
  )
}
export default App
