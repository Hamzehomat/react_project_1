import axios from "axios"
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Forget() {
    const navigate = useNavigate();
    const [user,setUser] = useState({
        email:'',
        password:'',
      });
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const {data} = await axios.patch(`https://ecommerce-node4-five.vercel.app/auth/sendcode`,{
        email:user.email
        })
        console.log(data)

        if(data.message=="success"){
            navigate('/Newpass')
          }
    }
    const email = localStorage.setItem('email',user.email)

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
                <input type="email" placeholder='email'   className='form-control' id='floatingInput' onChange={handlechange} value={user.email} name='email'/>
                  <label htmlFor="floatingInput"> Email  </label>
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

