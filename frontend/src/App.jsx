import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes , Route} from 'react-router-dom'
import UserRouter from './router/UserRouter'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
      <UserRouter/>
      </BrowserRouter>
    </div>
  )
}

export default App
