import React from 'react'
import { Link } from 'react-router-dom'
import '../Landing.css';
import landImage from '../landImage.png'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const GetStarted = () => {
    useGSAP(()=>{
        gsap.from('.name',{opacity:0, duration:1, delay:0.4,y:30})
        gsap.from('.title',{opacity:0, duration:1, delay:0.6,y:30})
        gsap.from('.description',{opacity:0, duration:1, delay:0.8,y:30})
        gsap.from('.btn',{opacity:0, duration:1, delay:1,y:30})
        gsap.from('.image',{opacity:0, duration:1, delay:0.5,y:30})
    })
  return (
    <>
    <section className='home' style={{marginTop:"-48px"}}>
        <div className='content' id='con'>
            <h2 className='name'>NoteSwift</h2>
            <h4 className='title'> <span>Your</span> Notes Companion <span> where ever you want</span></h4>
            <p className='description'>In a world that never stops moving, ideas flow like a constant stream, and thoughts are fleeting. capturing and organizing those moments of inspiration is where noteswift steps in a powerful notes app designed to seamlessly integrate into your life.</p>
            {!localStorage.getItem('token') ? 
            <div>
                <Link className='btn' to='/login'>Login</Link> 
                <Link className='btn' to='/signup'>Signup</Link>
            </div>
            : <Link className='btn' to='/home'>Get Started</Link> }
            
        </div>
        <div className='image'>
            <img src={landImage} alt='landim'/>
        </div>
    </section>
    </>
  )
}

export default GetStarted
