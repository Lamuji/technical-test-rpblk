import React from 'react'
import { Link, Router } from 'react-router-dom'
import './style.css'
import logo from '../logo.png'
import {Button} from '../@/components/ui/button'

export default function Login() {
  // const getLogged = () => {
  //   fetch
  // }

  return (
    <div className="container">
    <div className="left-side">
      <div>
        <img src={logo} alt="Logo" />
      </div>
    </div>
    <div className="right-side">
      <div className="form-container">
        <h3 className='titre'>Sign in</h3>
        <form>
        <div className="form-field">
            <label htmlFor="email" className='link'>Email</label>
            <input type="email" id="email" placeholder="Email"/>
          </div>
          <div className="form-field">
            <label htmlFor="password" className='link'>Password</label>
            <input type="password" id="password" placeholder="Password"/>
          </div>
          <Button className='button'>Connexion</Button>
        </form>
        <div className="sign-in">
            <div className='text'>Don't have an account? <Link className='link 'to='/'> Sign up</Link></div>
            
        </div>
      </div>
    </div>
  </div>
  )
}
