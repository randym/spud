import './App.css'
import { NavBar } from './components/navbar'
import { Home } from './pages/home'
import { Login } from './pages/login'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthentication } from './hooks/useAuthentication'

const App = () => {
  const { user } = useAuthentication()
  return (
    <Router>
      <div>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
