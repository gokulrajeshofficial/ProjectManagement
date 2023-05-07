
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import UserRouter from './router/AuthRouter'
import WorkspaceRouter from './router/WorkspaceRouter'
import ProjectRouter from './router/ProjectRouter'
import OtherRouter from './router/OtherRouter'
import { useSelector } from 'react-redux'
import { userDetails } from './store/Slice/userDetails.slice'
import { Navigate } from 'react-router-dom'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <UserRouter />

        <WorkspaceRouter />
        <ProjectRouter />
        <OtherRouter />

      </BrowserRouter>
    </div>
  )
}

export default App
