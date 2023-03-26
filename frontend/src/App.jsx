import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter,Routes , Route} from 'react-router-dom'
import MainNavBar from './components/MainNavbar/MainNavBar'
import LandingPage from './pages/LandingPage/LandingPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LandingPage/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
