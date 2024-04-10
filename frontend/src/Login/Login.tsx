import  { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import logo from '../logo.png'
import {Button} from '../@/components/ui/button'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  let token;
  let userLogged;
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); 
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 200) {
        console.log('Connexion réussie');
        const data = await response.json();
        token = data.result.token;
        localStorage.setItem('token', token);
        navigate('/home');
        userLogged = data.result.users;
      } else {
        console.error('Échec de la connexion, vérifiez votre e-mail/mot de passe'); 
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
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
        <h3 className='titre'>Sign in</h3>
        <form onSubmit={handleSubmit}>
        <div className="form-field">
            <label htmlFor="email" className='link'>Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-field">
            <label htmlFor="password" className='link'>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button type="submit" className='button'>Connexion</Button>
        </form>
        <div className="sign-in">
            <div className='text'>Don't have an account? <Link className='link 'to='/'> Sign up</Link></div>
        </div>
      </div>
    </div>
  </div>
  )
}
