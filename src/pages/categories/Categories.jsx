import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import './categories.css'
function Categories() {
  const [loader,setLoader] = useState(true);
  const [Products , setProducts] = useState([]);
  const getproducts = async ()=>{
    try{
    const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/categories/active?limit=8&delay=5000`)
    setProducts(data.categories)
    setLoader(false);
   }catch(error){
    console.log(error);
   }
  };
   useEffect (()=>{
     getproducts();
  } , [])
if (loader){
   return <span className="loader" /> 
}
  return (
    <>
     <div className='p-container'>
    {Products.map(product=>
      <div className="product" key={product.id}>
      <div className="card" style={{width: '18rem'}}>
   <img className="card-img-top" src={product.image.secure_url} alt="Card image cap" />
   <div className="card-body">
   <Link to={`/categories/${product.id}`} > {product.name}</Link>

    </div>
    </div>
</div>  
  )}
</div> 
     </>
  )
}
export default Categories;
