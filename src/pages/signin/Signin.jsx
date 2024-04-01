import { Link, useNavigate} from 'react-router-dom'
import { useContext, useState } from 'react';
import axios from 'axios'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string } from 'yup';
import { UserContext } from '../context/User1';
import './signin.css'

export default function Signin() {
  const navigate = useNavigate();
  const {setUserToken} = useContext(UserContext)
    const[Errors , setErrors] = useState([])
      const [user,setUser] = useState({
        email:'',
        password:'',
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
          email:string().email().required(),
          password:string().min(6).max(15).required()
        })
       try{
         await loginschema.validate(user,{aboutEarly:false});
        return true;
       } catch(error){
        setErrors(Errors.error)
        return false;
       }
      }
      const handleSubmit = async (e)=>{
        e.preventDefault();
        if (await validate()){
        
        try{
        const {data} = await axios.post(`https://ecommerce-node4-five.vercel.app/auth/signin`,{
          email:user.email,
          password:user.password,
        }
        );
        setUser({
          email:'',
          password:'',
        });
        localStorage.setItem('usertoken',data.token);

        console.log(data)
        if(data.message=="success"){
          toast.success("Login successfully", {
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
          console.log("hello")
          setUserToken
          localStorage.setItem('usertoken' , data.token)
          navigate('/home')
        }
      }catch(error){
        if(error.response.status=== 409){
           toast.error(error.response.data.message, {
             position: "top-center",
             autoClose: 6000,
             hideProgressBar: false,
             closeOnClick: false,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "colored",
             transition:Bounce,
             });
           }
        }
      }
    };
    
     
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

<div className="container-fluid ps-md-0">
  <div className="row g-0">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image" />
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">Welcome back!</h3>
              <form onSubmit ={handleSubmit}>
                <div className="form-floating mb-3">
                <input type="email" placeholder='email' className='form-control' id='floatingInput'  value={user.email} onChange={handlechange} name='email'/>
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                <input type="password" className='form-control' id="floatingPassword" placeholder='password'   value={user.password} onChange={handlechange} name='password' />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Sign in</button>
                  <div className="text-center">
                    <Link to='/signup'> Create  Account</Link>
                  <Link to='/Forget'> Forget password?</Link>
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


        </>
        
      )
  }