import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import '../App.css';

const Login = (props) => {
    const [cred, setCred] = useState({email:"", password:""})
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({email: cred.email, password:cred.password})
          });
          const json = await response.json()
          if(json.success){
            //save the token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Login Sucessfully","success")
          }else{
            props.showAlert("Invalid Credential, If you are new Kindly Login","danger")
          }
    }
    const onChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }
  return (
    <div className='container mx-2 my-3' id='login'>
      <div className='box'>
        <h3>Login to continue</h3>
        <hr className='hr hr-blurry'></hr>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={cred.email}onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={cred.password}/>
        </div>
        <button type="submit" className="btn btn-primary" >Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
