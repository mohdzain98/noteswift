import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

function Navbar() {
  const context = useContext(noteContext)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const {user,getUser} = context
  let ref = useRef(null)
  let location = useLocation()
  const navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate("/")
    rollNavBack()
  }
  useEffect(()=>{
    localStorage.getItem('token') && getUser()
    // eslint-disable-next-line
  },[])
 
  const rollNavBack =()=>{
    isTabletOrMobile && ref.current.click()
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to='/'>NoteSwift</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" ref={ref}>
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-link"><Link className={`nav-link ${location.pathname === "/home"?"active":""}`} aria-current="page" to="/home" onClick={rollNavBack}>Home</Link></li>
                    <li className="nav-link"><Link className={`nav-link ${location.pathname === "/about"?"active":""}`} to="/about" onClick={rollNavBack}>About</Link></li>
                </ul>
                {( !localStorage.getItem('token')) ?<form className='d-flex'>
                <Link style={{display: `${location.pathname === '/'?"none":"initial"}`}} className='btn btn-primary mx-1' role='button' to="/login" onClick={rollNavBack}>Login</Link>
                <Link style={{display: `${location.pathname === '/'?"none":"initial"}`}} className='btn btn-primary mx-1' role='button' to='/signup' onClick={rollNavBack}>Signup</Link>
                </form>:
                <div className="btn-group">
                <button type="button" className="btn btn-secondary dropdown-toggle mx-2 me-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                <i className="fa-solid fa-user me-2" style={{color: "#FFD43B"}}></i>{user}
                </button>
                <ul className="dropdown-menu dropdown-menu-lg-end">
                  <li><button className="dropdown-item" onClick={handleLogout} type="button">Logout</button></li>
                </ul>
              </div>
              }
              </div>
            </div>
            </nav>
    </div>
  )
}

export default Navbar
