import React, { useState, useContext, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import '../LoginSignup.css';
import noteContext from '../context/notes/noteContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'

const Login = (props) => {
    const [cred, setCred] = useState({email:"", password:""})
    const context = useContext(noteContext)
    const {getUser} = context
    const navigate = useNavigate()
    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/home')
      }
       // eslint-disable-next-line
    },[])
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
            navigate("/home")
            props.showAlert("Login Sucessfully","success")
            getUser()
          }else{
            props.showAlert("Invalid Credential, If you are new Kindly Login","danger")
          }
    }
    const onChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }
    const showPassword =()=>{
      let x = document.getElementById('password');
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
      }
    }
  return (
    <>
    <div className='d-none d-lg-block'>
    <div className='container my-3' id='lsp'>
      <div style={{width: '45%', marginLeft:'10px'}}>
      <h3 id='lsph3'>NoteSwift</h3>
      <p style={{color:'white',fontFamily: 'cursive',fontSize:'20px'}}>"When your heart speaks, take good notes"</p>
      </div>
      </div>
    </div>
    <div className='container my-3' id='ls'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <div className="input">
            <img src={emailpic} alt='email'/>
            <input type="email" id="email" name='email' value={cred.email} onChange={onChange}/>
        </div>
        <div className="input">
        <img src={passpic} alt='password'/>
             <input type="password" id="password" name='password' onChange={onChange} value={cred.password}/>
        </div>
        </div> 
        <input className='ms-4 me-1 my-3' type="checkbox" onClick={showPassword} />Show Password
        <div className="submit-container">
        <button type="submit" className="submit">Login</button>
        </div>
        </form>
    </div>
    
    </>
  )
}

export default Login
