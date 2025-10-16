import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Login from './tienda/IniciarSecion.jsx'
import Signup from './tienda/RegistroUsuario.jsx'
import Dashboard from './tienda/DashBoard.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
    path: "/TRABAJO-FULL-STACK-V2/app",
    element: <App />,
  },
  
  {
    path: "/TRABAJO-FULL-STACK-V2/login",
    element: <Login />,
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/signup",
    element: <Signup />,
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/dashboard",
    element: <Dashboard />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
