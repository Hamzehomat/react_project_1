import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import './cart.css'

export default function Cart() {
  const [cartitems, setCartitems] = useState([]);
  const [quantity  , setQuantity] = useState([]);
  const [quantity2  , setQuantity2] = useState([]);
  const [quantity3  , setQuantity3] = useState([]);


  const [ price , setPrice] = useState([]);
  const [ price2 , setPrice2] = useState([]);
  const [ price3 , setPrice3] = useState([]);


  const displaycart = async () => {
    const token = localStorage.getItem("usertoken");
    console.log(token);
    const { data } = await axios.get(
      `https://ecommerce-node4-five.vercel.app/cart`,
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    setCartitems(data.products);
    setQuantity(data.products[0].quantity)
    setPrice(data.products[0].details.price)

    setQuantity2(data.products[1].quantity)
    setPrice2(data.products[1].details.price)

    setQuantity3(data.products[2].quantity)
    setPrice3(data.products[2].details.price)


    
  };
  console.log(quantity * price )

  const increaseq = async (productId) => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.patch(
      `https://ecommerce-node4-five.vercel.app/cart/incraseQuantity`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message == 'success')  {
      displaycart()
    }
    console.log(productId)
    console.log(data);
  };
  const removeitem = async (productId) => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.patch(
      `https://ecommerce-node4-five.vercel.app/cart/removeItem`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message == 'success')  {
      displaycart()
    }
  };

  const decraseq = async (productId) => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.patch(
      `https://ecommerce-node4-five.vercel.app/cart/decraseQuantity`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    if (data.message == 'success')  {
      displaycart()
    }
  };
  const clearcart = async (productId) => {
    const token = localStorage.getItem("usertoken");
    const { data } = await axios.patch(
      `https://ecommerce-node4-five.vercel.app/cart/clear`,
      {
        productId,
      },
      {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      }
    );
    console.log(data);
    if (data.message =='success')  {
      displaycart()
    }
  };


  useEffect(() => {
    displaycart();
  }, []);

  return (
    <>   
        {cartitems.length === 0 && <h2 className="empty">The cart is empty. </h2>}
        <div className="row">
      {cartitems.map((product) => (
        <div className="card2" key={product._id}>
          <h2>{product.details.name}</h2>
          <img src={product.details.mainImage.secure_url} />
          <span> ${product.details.price}</span>
          <button onClick={() => {
            increaseq(product.details._id)
          }}>
            <FaPlus />
          </button>
          <div className="details">
          <span> {product.quantity}</span>
          </div>
          <button onClick={() => {
            decraseq(product.details._id)
          }}>
            <FaMinus />
          </button>
         <button onClick={()=>{
           removeitem(product.details._id)
         }
          }>Remove item</button>
          </div>  

))}

  {cartitems.length !== 0 && 
<div className="action">
          <span> Total price = $ {quantity *  price + quantity2 * price2 + quantity3 * price3} </span>
          <Link to='/Order'> Complete your order</Link>
          <button onClick={() => clearcart()}> clear cart</button>
          </div>}
</div>
    </>
  );
}
