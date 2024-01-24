import React, { useState, useContext, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import '../LoginSignup.css';
import noteContext from '../context/notes/noteContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'
import { useMediaQuery } from 'react-responsive'

const Login = (props) => {
    const [cred, setCred] = useState({email:"", password:""})
    const context = useContext(noteContext)
    const {getUser} = context
    const navigate = useNavigate()
    const {host,showAlert} = props.prop
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [loader,setLoader] = useState("")

    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/home')
      }
       // eslint-disable-next-line
    },[])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoader("spinner-border spinner-border-sm me-2")
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({email: cred.email, password:cred.password})
          });
          const json = await response.json()
          if(json.success){
            //save the token and redirect
            setLoader("")
            localStorage.setItem('token', json.authToken)
            navigate("/home")
            showAlert("Login Sucessfully","success")
            getUser()
          }else{
            showAlert("Invalid Credential, If you are new Kindly Signup","danger")
            setLoader("")
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
    <div className={`container ${isTabletOrMobile?"my-5":"my-3"}`} id='ls' style={isTabletOrMobile ?{ width:"340px"} :{}}>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className='inputs'>
        <div className="input" style={isTabletOrMobile ?{ width:"330px"} :{}}>
            <img src={emailpic} alt='email'/>
            <input type="email" id="email" name='email' value={cred.email} onChange={onChange} placeholder='Email' required/>
        </div>
        <div className="input" style={isTabletOrMobile ?{ width:"330px"} :{}}>
        <img src={passpic} alt='password'/>
             <input type="password" id="password" name='password' onChange={onChange} value={cred.password} placeholder='Password' required/>
        </div>
        </div> 
        <input className={`me-1 my-3 ${isTabletOrMobile?"ms-2":"ms-4"}`} type="checkbox" onClick={showPassword} />Show Password
        <div className="submit-container">
        <button className="submit" type="submit">
          <span className={loader} role="status" aria-hidden="true"></span>
          Login
        </button>
        </div>
        </form>
    </div>
    
    </>
  )
}

export default Login
