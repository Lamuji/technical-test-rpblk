import {useState, useEffect} from 'react'
import './style.css'

import Tweets from '../Components/Tweets'
import Aside from '../Components/Aside'
import logo from '../logo_home.png'
import { socket } from '../socket'


export default function Home() {
  socket.connect()

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
