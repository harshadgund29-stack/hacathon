import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../assets/bg.jpg'
import './Home.css'
import logo from '../assets/image-removebg-preview.png'

import Search from './Search'
import SafeJourney from './Jurny'

import Defaultloc from './DefaultLocation'
const Home = () => {
  const nav = useNavigate()
  const [login, setLogin] = useState(() => localStorage.getItem('islogin') || false)
  useEffect(() => {

 

    if (!login) {
      nav('/')
    }
  }, [login])
  return (

    <div style={{ overflowX: "hidden" }}>

      <div className='container-fluid p-0' >


        <img className='img' src={bg} alt="background" style={{ width: "100vw", height: "80vh", objectFit: "cover" }} />

       

        <div className="hero" style={{ position: "absolute", top: "35%", left: "50%", transform: "translate(-50%,-50%)", color: "white", textAlign: "center" }}>
          <h6 className='text-light mb-3' style={{ borderRadius: "50px", backdropFilter: "blur(3px)", padding: "1px 10px", marginTop: "40px" }}>
            <img src={logo} alt="logo" style={{ height: "50px", filter: "drop-shadow(1px 1px 7px white)" }} />

            Monsoon Travel Assistant</h6>

          <h1 style={{ textShadow: "1px 1px 12px rgba(77, 75, 75, 0.85)" }}>Navigate Safely</h1>
          <h1 id='fade' style={{ color: "darkblue" }}>Through Monsoons</h1>

          <h5 className='mt-3'>Real-time route planning with crowd-sourced flood reports and safe transport alternatives</h5>

          <Search />
        </div>

      </div>






      <SafeJourney />
      <Defaultloc />



    </div >
  )
}

export default Home
