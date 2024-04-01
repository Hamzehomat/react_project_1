import './signup.css'
import axios from 'axios'
import { useState  } from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';



export default function Signup() {
  const navigate = useNavigate();

  const[errors , setErrors] = useState([])
  const [user,setUser] = useState({
    userName:'',
    email:'',
    password:'',
    image:null,
  });
  const handlechange = (e)=> {
    const {name,value} = e.target;
    setUser({
   ...user,
      [name] : value
    });
  };
  const validate = async ()=>{
    const signupschema = object({
      email:string().email().required(),
      password:string().min(6).max(15).required(),
      userName:string().required()
    });
    try{
      await signupschema.validate(user,{abortEarly:false});
     return true;
    } catch(error){
      setErrors(error.errors);
       return false;
    }
   }
    const handleimagechange = (e)=>{
      const {name,files} = e.target;
      setUser({
     ...user,
        [name]: files[0]
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(user);
      const formData = new FormData();
      formData.append('email',user.email)
      formData.append('password',user.password)
      formData.append('userName',user.userName)
      formData.append('image',user.image);
      if (await validate()) {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_API}/auth/signup`, formData);
          if (data) {
            setUser({
              userName: '',
              image: '',
              email: '',
              password: '',
            });
            setTimeout(() => {
            toast.success('Please Check Your Email!', {
              position: "top-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          } , 100);
            navigate('/signin');
          }
        } catch (error) {
          if (error.response.status === 409) {
            toast.error('email already exists', {
              position: "top-center",
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
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
              <h3 className="login-heading mb-4">Join Us !</h3>
              <form onSubmit ={handleSubmit}>
                <div className="form-floating mb-3">
                <input type="text" className='form-control' value={user.userName} id="floatingUsername" placeholder='username'  onChange={handlechange} pattern=".{5,10}"  name='userName' title="Username must be at least 5 characters and at most 10 characters long." required/>

                  <label htmlFor="floatingInput"> Username </label>
                </div>
                <div className="form-floating mb-3">
                <input type="email" placeholder='email' value={user.email} className='form-control' id='floatingInput'   onChange={handlechange} name='email'  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required/>

                  <label htmlFor="floatingInput">Email address</label>
                   </div>
                   <div className="form-floating mb-3">
                <input type="password" className='form-control' value={user.password} id="floatingPassword" placeholder='password'  onChange={handlechange} name='password'   pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
                  <label htmlFor="floatingPassword"> Password </label>
                </div>
                   <div className="form-floating mb-3">
                    <input type="file" className='form-control'  id="floatingInput" placeholder='image'  onChange={handleimagechange} name='image' />
                    <label htmlFor="floatingPassword">Image</label>
                     </div>

                <div className="d-grid">
                  <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit">Create Account </button>
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

