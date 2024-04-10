
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import PrivateRoutes from './utils/ProtectedRoute';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />

    </Routes>
  </Router>
  );
}

export default App;
