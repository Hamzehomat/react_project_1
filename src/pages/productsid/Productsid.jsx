import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import './productsbyid.css'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Productsid() {
  const { id } = useParams("id");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const addToCart = async (productId) => {
    const token = localStorage.getItem("usertoken");
    try {
      const { data } = await axios.post(
        `https://ecommerce-node4-five.vercel.app/cart`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      setCartItems(data.cart.products.cartItems);
      if (data.message === "success") {
        toast.info("Item added to cart", {
          position: "top-right",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition:Bounce,
          });
     
        console.log(productId);
      } else {
        console.log("hello");
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the product to the cart");
    }
  };

  

  const getproducts = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/products/category/${id}`
    );
    setProducts(data.products);
    console.log(data.products);
  }

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
         />
    <div className="row">
      {products.map((product) => (
        <div className="card" key={product._id}>
          <h2> {product.name}</h2>
          <div className="images">
          <img src={product.mainImage.secure_url} />
          <div className="sub">
          <img src={product.subImages[0].secure_url} />
          <img src={product.subImages[1].secure_url} />
          <img src={product.subImages[2].secure_url} />
          </div>
          </div>
          <div className="description">
          <p> {product.description}</p>
          </div>
          <div className="price">
          <span> ${product.finalPrice}</span>
          </div>
          <div className="action">
          <button onClick={() => addToCart(product._id)}> Add to cart </button>
          </div>
        </div>
        
      ))}
      </div >
      <div className="not">
      {products.length == 0 && <h1>Product not Found</h1> }
      </div>

    </>
  );
      }
