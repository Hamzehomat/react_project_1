import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams} from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export default function Products() {
  const [Display, setDisplay] = useState([])
  const [activePage, setActivePage] = useState(1);

     const displayproducts = async (page)=>{
       const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=${page}&limit=4`)
       setDisplay(data.products)
       console.log(data)
       console.log(Display)
       
     }

 
  useEffect (()=>{
    displayproducts(activePage);
  },[activePage])


  

  return (
    <>
      <div className='p-container'>
    {Display.map(product=>
      <div className="product" key={product.id}>
      <div className="card" style={{width: '18rem'}}>
   <img className="card-img-top" src={product.mainImage.secure_url} alt="Card image cap" />
   <div className="card-body">
    <p className="card-text">{product.name}</p>
    </div>
    </div>
</div>  
  )}
</div> 
<div className='p-pagination'>
        <button onClick={() => setActivePage(activePage - 1)} disabled={activePage === 1}>Previous</button>
        <button onClick={() => setActivePage(activePage + 1)} disabled={activePage === 2}>Next</button>
      </div>




    
    
     
    </>

  )
  }
