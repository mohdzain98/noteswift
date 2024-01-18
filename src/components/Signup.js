import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import '../App.css';


const Signup = (props) => {
    const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email,password} = cred
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({name: name,email:email, password:password})
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            //save the token and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/")
            props.showAlert("Account Created Successfully","Success")
          }else{
            props.showAlert("Account already exist, kindly Login","danger")
          }
    }

    const onChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }
  return (
    <div className='container mx-3 my-3' id='signup'>
      <div className='box'>
        <h3>Register Yourself on NoteSwift</h3>
        <hr className='hr hr-blurry'></hr>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={cred.name} onChange={onChange}  required/>
        
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={cred.email}onChange={onChange} aria-describedby="emailHelp"  required/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={cred.password} minLength={5} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={cred.cpassword} minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary" >Register</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
