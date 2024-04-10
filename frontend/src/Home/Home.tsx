import {useState, useEffect} from 'react'
import './style.css'

import Tweets from '../Components/Tweets'
import Aside from '../Components/Aside'
import logo from '../logo_home.png'


export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0); // Utilisation d'une clé de rafraîchissement pour forcer le composant Tweets à se mettre à jour

  useEffect(() => {
    // Rafraîchissement périodique toutes les 5 secondes (par exemple)
    const intervalId = setInterval(() => {
      // Incrément de la clé de rafraîchissement pour forcer le rechargement du composant Tweets
      setRefreshKey((prevKey: number) => prevKey + 1);
    }, 5000);

    // Nettoyage de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className='body'>
    <header className="header">
        <div><img className="logo" src={logo} alt="Logo" /></div>
        <h3 className='title'>Home</h3>
    </header>
  
  <div className="main-container">
      <Aside/>
      <Tweets key={refreshKey}/>
  </div>
  </div>
  )
}
