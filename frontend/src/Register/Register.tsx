import React, { useState } from 'react'
import { Link, Router, useNavigate } from 'react-router-dom'
import './style.css'
import logo from '../logo.png'
import { Button } from '../@/components/ui/button'

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate(); // Initialisation de useNavigate pour la redirection

  const handleSubmit = async (event: { preventDefault: () => void } ) => {
    event.preventDefault(); // Pour éviter le rechargement de la page lors de la soumission du formulaire

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          username,
          email,
          password,
        }),
      });

      if (response.status === 200) { // Vérification si le code de statut est 200
        console.log('Registration successful');
        navigate('/home');
      } else {
        // Gérer les réponses non réussies ici (par exemple, afficher un message d'erreur)
        console.error('Registration failed with status:', response.status);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      // Gérer les erreurs de réseau ou autres erreurs inattendues ici
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
            <input type="email" id="email" placeholder="Email"   value={email} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="password" className='field'>Password</label>
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
          </div>
          <div className="form-field">
            <label htmlFor="first-name" className='field'>First name</label>
            <input type="text" id="first-name" placeholder="First name" value={firstname} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}/>
          </div>
          <div className="form-field">
            <label htmlFor="last-name" className='field'>Last name</label>
            <input type="text" id="last-name" placeholder="Last name" value={lastname} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}/>
          </div>
          <div className="form-field">
            <label htmlFor="username" className='field'>Username</label>
            <input type="text" id="username" placeholder="Username" value={username} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}/>
          </div>
          <Button className='button' type="submit" >Create profile <Link to='/home'/></Button>
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
