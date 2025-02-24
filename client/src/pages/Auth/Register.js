import React,{useState} from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import "../../styles/AuthStyles.css";
import  {URL} from "../../utils/constants";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate=useNavigate();

  //form function
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(URL+"/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if (res && res.data.success) {
        alert("Registration successful");
        // toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container">
      <h4 className="title">REGISTER FORM</h4>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="form-control"
      id="exampleInputEmail1"
      placeholder='Enter Your Name'
      required
      autoFoucus
    />
  </div>
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
  <div className="mb-3">
    <input
      type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="form-control"
      id="exampleInputPhone"
      placeholder='Enter Your Phone'
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      className="form-control"
      id="exampleInputAddress"
      placeholder='Enter Your Address'
      required
    />
  </div>
  <div className="mb-3">
    <input
      type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      className="form-control"
      id="exampleInputAnswer"
      placeholder="What is Your Favourite sports"
      required
    />
  </div>
  <button type="submit" className="btn btn-primary">
    REGISTER
  </button>
</form>


      </div>
    </Layout>
  )
}

export default Register
