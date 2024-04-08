import React from 'react'
import { Link, Router } from 'react-router-dom'
import './style.css'

export default function Login() {
  return (
    <div className="container">
    <div className="left-side">
      {/* <div>
        <img src="logo.png" alt="Logo" style="max-width: 100px;"> <!-- Remplacez 'logo.png' par le chemin de votre image de logo réelle. -->
      </div> */}
    </div>
    <div className="right-side">
      <div className="form-container">
        <h2>Create your account</h2>
        <form>
        <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email"/>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password"/>
          </div>
          <div className="form-field">
            <label htmlFor="first-name">First name</label>
            <input type="text" id="first-name" placeholder="First name"/>
          </div>
          <div className="form-field">
            <label htmlFor="last-name">Last name</label>
            <input type="text" id="last-name" placeholder="Last name"/>
          </div>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" placeholder="Username"/>
          </div>
        </form>
        <div className="sign-in">
            <Link to='/Register'>Don't have an account? Sign up</Link>
        </div>
      </div>
    </div>
  </div>
  )
}
