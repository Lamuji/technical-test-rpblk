import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Tweets from '../Components/Tweets'
import Aside from '../Components/Aside'
import logo from '../logo_home.png'


export default function Home() {
  return (
    <div className='body'>
    <header className="header">
        <div><img className="logo" src={logo} alt="Logo" /></div>
        <h3 className='title'>Home</h3>
    </header>
  
  <div className="main-container">
      <Aside/>
      <Tweets/>
  </div>
  </div>
  )
}
