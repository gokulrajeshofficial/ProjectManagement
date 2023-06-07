import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRouter from './router/AuthRouter'
import WorkspaceRouter from './router/WorkspaceRouter'
import ProjectRouter from './router/ProjectRouter'
import MessageRouter from './router/MessageRouter'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
          <Route path="/workspace/*" element={<WorkspaceRouter />} />
          <Route path="/projects/*" element={<ProjectRouter />} />
          <Route path="/messages/*" element={<MessageRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
