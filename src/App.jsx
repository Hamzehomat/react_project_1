import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css'
import Home from './pages/home/Home.jsx'
import Order from './pages/Order/Order.jsx'
import Root from './Root.jsx'
import Categories from './pages/categories/Categories.jsx'
import Products from './pages/Products/Products.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Signin from './pages/signin/Signin.jsx'
import Signup from './pages/signup/signup.jsx'
import Forget from './pages/Forget/Forget.jsx'
import Newpass from './pages/Forget/Newpass.jsx'
import axios from 'axios'
import UserContextProvider from './pages/context/User1.jsx'
import Productsid from './pages/productsid/Productsid.jsx'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import { useEffect, useState } from 'react'
import CartContext from './pages/context/Cartcontext.jsx'
import Protected from './pages/Protected.jsx'
const router = createBrowserRouter ([
  {
  path : "/",
  element :<Root />,
    children:[{
    path : '/home',
    element : <Home />,
    },
{
  path :"/categories",
  element : <Categories />,
},
{
  path:"/categories/:id",
  element:<Productsid />,
},
{
  path : "/products",
  element :
      <Products />
},
{
  path : "/cart",
  element :<Cart />
},
{
  path :"/signin",
  element : <Signin />,
},
{
  path :"/signup",
  element : <Signup />,
},
{
  path : '/Forget',
  element : <Forget />,
},
{
  path: '/Newpass',
  element:<Newpass />,
},
{
  path:'/Order',
  element:<Order />,
},

],
 },
]);
function App() { 
 
return (
    <>
    <UserContextProvider> 
    <RouterProvider router={router} />
    </UserContextProvider>

   
   
     </>
  )
}

export default App
