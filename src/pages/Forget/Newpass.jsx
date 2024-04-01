import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Newpass() {
    const [user,setUser] = useState({
      email:localStorage.getItem("email"),
        password:'',
        code:'',
      });
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const {data} = await axios.patch(`https://ecommerce-node4-five.vercel.app/auth/forgotPassword`,{
        email: user.email,
        password:user.password,
        code:user.code
        })
        console.log(data)
    }
    const handlechange = (e)=> {
        const {name,value} = e.target;
        setUser({
       ...user,
          [name] : value
        });
      };
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
            <form onSubmit ={handlesubmit}>
              <h3 className="login-heading mb-4">Get a new password</h3>
                <div className="form-floating mb-3">
                <input type="text" placeholder='code'  className='form-control' id='floatingInput' value={user.code} onChange={handlechange} name='code' />
                  <label htmlFor="floatingInput"> Code  </label>
               
                </div>
                <div className="form-floating mb-3">
                <input type="password" className='form-control' value={user.password} id="floatingPassword" placeholder='password'  onChange={handlechange} name='password'   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
                  <label htmlFor="floatingPassword"> New Password  </label>
                </div>
                <div className="d-grid">
                  <div className="text-center">
                  <button type="submit">Submit</button>
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
