import React, { useState, useContext, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import '../LoginSignup.css';
import noteContext from '../context/notes/noteContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'
import person from '../Assets/person.png'
import { useMediaQuery } from 'react-responsive'

const Signup = (props) => {
    const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate()
    const context = useContext(noteContext)
    const {getUser} = context
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
        const {name, email,password, cpassword} = cred
        if(password === cpassword){
        setLoader("spinner-border spinner-border-sm")
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({name: name,email:email, password:password})
          });
          const json = await response.json()
          if(json.success){
            //save the token and redirect
            setLoader("")
            localStorage.setItem('token', json.authToken)
            navigate("/home")
            showAlert("Account Created Successfully","success")
            getUser()
          }else{
            showAlert("Something is Wrong: Either account already exist or There is an error","danger")
          }
        }
        else{
          showAlert("Password and Confirm Password does not match",'danger')
        }
    }

    const onChange = (e)=>{
        setCred({...cred, [e.target.name]:e.target.value})
    }
    const showPassword =()=>{
      let x = document.getElementById('password');
      let y = document.getElementById('cpassword')
      if (x.type && y.type === "password") {
        x.type = "text";
        y.type = "text"
      } else {
        x.type = "password";
        y.type = "password"
      }
    }
  return (
    
    <>
    <div className='d-none d-lg-block'>
    <div className='container my-3' id='ssp'>
      <div style={{width: '45%', marginLeft:'10px'}}>
      <h3 id='lsph3'>NoteSwift</h3>
      <p style={{color:'white',fontFamily: 'cursive',fontSize:'20px'}}>"Take notes, constantly. Save interesting thoughts, quotations, films, technologies... the medium doesn't matter, so long as it inspires you."</p>
      </div>
      </div>
    </div>
    <div className={`container ${isTabletOrMobile?"my-5":"my-3"}`} id='ls' style={isTabletOrMobile ?{ width:"340px"} :{}}>
      <div className="sheader">
        <div className="text">Signup</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
      <div className='inputs'>
      <div className="input" style={isTabletOrMobile ?{ width:"330px"} :{}}>
            <img src={person} alt='email'/>
            <input type="text" placeholder='Name' id="name" name='name' value={cred.name} onChange={onChange}  required/>
        </div>
        <div className="input" style={isTabletOrMobile ?{ width:"330px"} :{}}>
            <img src={emailpic} alt='email'/>
            <input type="email" placeholder='Email' id="email" name='email' value={cred.email}onChange={onChange}  required/>
        </div>
        <div className="input" style={isTabletOrMobile ?{ width:"330px"} :{}}>
        <img src={passpic} alt='password'/>
        <input type="password" placeholder='Password' id="password" name='password' onChange={onChange} value={cred.password} minLength={5} required/>
        </div>
        <div className="input" style={isTabletOrMobile ?{ width:"330px"} :{}}>
        <img src={passpic} alt='password'/>
        <input type="password" placeholder='Confirm Password' id="cpassword" name='cpassword' onChange={onChange} value={cred.cpassword} minLength={5} required/>
        </div>
        </div> 
        <input className={`me-1 my-3 ${isTabletOrMobile?"ms-2":"ms-4"}`} type="checkbox" onClick={showPassword} />Show Password
        <div className="ssubmit-container">
        {/* <button type="submit" className="submit">Signup</button> */}
        <button className="submit mx-2" type="submit">
          <span className={loader} role="status" aria-hidden="true"></span>
          Signup
        </button>
        </div>
        </form>
    </div>
    </>
  )
}

export default Signup
