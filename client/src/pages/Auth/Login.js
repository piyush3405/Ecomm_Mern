import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import {toast} from "react-hot-toast";
import "../../styles/AuthStyles.css";
import {useAuth} from "../../context/auth";
import  {URL} from "../../utils/constants";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth,setAuth]=useAuth();
    const navigate=useNavigate();
    const location=useLocation();
  
    //form function
    const handleSubmit=async (e)=>{
      e.preventDefault();
      try {
        const res = await axios.post(URL+"/api/v1/auth/login", {
          email,
          password
          
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user:res.data.user,
            token:res.data.token
          });
          localStorage.setItem("auth",JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }

   const handleGuestAdmin=()=>{
    setEmail("GuestAdmin@gmail.com");
    setPassword("Guest@123");
   }

   const handleGuestUser=()=>{
    setEmail("GuestUser123@gmail.com");
    setPassword("Guest@123");
   }

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
      <h4 className="title">LOGIN FORM</h4>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder='Enter Your Email'
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="form-control"
      id="exampleInputPassword"
      placeholder='Enter Your password'
      required
    />
  </div>

  <div classname="mb-3 ">
  <button type="button" className="btn btn-primary mb-4" onClick={handleGuestAdmin}>
    Guest Admin Login
   </button>
  </div>

   <div classname="mb-3 ">
  <button type="button" className="btn btn-primary mb-4" onClick={handleGuestUser}>
    Guest User Login
   </button>
  </div>

  
 
  <div classname="mb-1 ">
  <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
    Forgot Password
   </button>
  </div>
  <br/>
   <button type="submit" className="btn btn-primary">
    LOGIN
   </button>
   </form>
    </div>
    </Layout>
  )
}

export default Login
