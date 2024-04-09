import React, { useState } from 'react'
import { Link, Router } from 'react-router-dom'
import './style.css'
import logo from '../logo.png'
import { Button } from '../@/components/ui/button'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void }) => {

    event.preventDefault(); // Pour éviter le rechargement de la page
    // Envoie les données à l'API d'inscription
    try {
      const response = await fetch('localhost:3001/auth/register', { // Remplacez par votre URL d'API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          username,
        }),
      });
      const data = await response.json();

      console.log(data);
      // Redirection ou affichage d'un message en cas de succès
    } catch (error) {
      console.error('Registration failed:', error);
      // Gérer les erreurs d'inscription
    }
  };

  return (
    <div className="container">
    <div className="left-side">
      <div>
        <img src={logo} alt="Logo" />
      </div>
    </div>
    <div className="right-side">
      <div className="form-container">
        <h2 className='titre'>Create your account</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-field">
            <label htmlFor="email" className='field'>Email</label>
            <input type="email" id="email" placeholder="Email"/>
          </div>
          <div className="form-field">
            <label htmlFor="password" className='field'>Password</label>
            <input type="password" id="password" placeholder="Password"/>
          </div>
          <div className="form-field">
            <label htmlFor="first-name" className='field'>First name</label>
            <input type="text" id="first-name" placeholder="First name"/>
          </div>
          <div className="form-field">
            <label htmlFor="last-name" className='field'>Last name</label>
            <input type="text" id="last-name" placeholder="Last name"/>
          </div>
          <div className="form-field">
            <label htmlFor="username" className='field'>Username</label>
            <input type="text" id="username" placeholder="Username"/>
          </div>
          <Button className='button' type="submit">Create profile</Button>
        </form>
        <div className="sign-in">
            Already have an account? 
        <Link to='/Login' className='link'>  Sign in</Link>
        </div>
      </div>
    </div>
  </div>
  )
}
