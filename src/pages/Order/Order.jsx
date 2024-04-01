import axios from 'axios'
import { object, string , number} from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './order.css'


export default function Order() {
    const [user,setUser] = useState({
        couponName :'',
       phone:'',
       address:''
      });
      const handlechange = (e)=> {
        const {name,value} = e.target;
        setUser({
       ...user,
          [name] : value
        });
      };
      const validate = async ()=>{
        const loginschema = object({
          address:string().required(),
          phone:number().required()
        }) 
        try{
            await loginschema.validate(user,{aboutEarly:false});
           return true;
          } catch(error){
            console.log(error)
           return false;
          } }
    const handleSubmit = async (e)=>{
        const token = localStorage.getItem("usertoken");
        e.preventDefault();
        if (await validate()){
        try{
            const {data} = await axios.post(`https://ecommerce-node4.vercel.app/order`, {
                couponName:user.couponName , 
                address:user.address , 
                phone:user.phone ,
            },
            {
                headers:{
                    Authorization:`Tariq__${token}`,
                }
            })
            localStorage.setItem('order',data.order._id);
        }catch(error){
            console.log(error)
        }
    }
}
const cancelorder = async ()=>{
    const token = localStorage.getItem("usertoken");
    const order = localStorage.getItem("order");
    try{
        const {data} = await axios.patch(`https://ecommerce-node4-five.vercel.app/order/cancel/${order}`,
        {
            headers:{
                Authorization:`Tariq__${token}`,
            }
        })
        localStorage.setItem('usertoken',data.token);
    }catch(error){
        console.log(error)
    }
}

  return (
    <>
<div className="container-fluid ps-md-0">
    <div className='order'>
  <div className="row g-0">
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">Welcome back!</h3>
              <form onSubmit ={handleSubmit}>
                <div className="form-floating mb-3">
                <input type="text" placeholder='Coupon' className='form-control' id='floatingInput' value={user.couponName} onChange={handlechange} name='couponName'/>
                  <label htmlFor="floatingInput">Coupon </label>
                </div>
                <div className="form-floating mb-3">
                <input type="text" placeholder='Phone' className='form-control' id="floatingInput" value={user.phone} onChange={handlechange} name='phone'/>
                  <label htmlFor="floatingInput">Phone  Number</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" placeholder='Address' className='form-control' id="floatingInput" value={user.address} onChange={handlechange} name='address'/>
                  <label htmlFor="floatingInput">Address</label>
                </div>
                <div className="d-grid">
                  <div className="text-center">
                  <button type="submit">Submit</button>
                  <button onClick={cancelorder} >Cancel Order</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    </>
  )
  }


