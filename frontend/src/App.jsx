import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserRouter from './router/AuthRouter'
import WorkspaceRouter from './router/WorkspaceRouter'
import ProjectRouter from './router/ProjectRouter'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <UserRouter />
        <WorkspaceRouter />
        <ProjectRouter/>
      </BrowserRouter>
    </div>
  )
}

export default App
