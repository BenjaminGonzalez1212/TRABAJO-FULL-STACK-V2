import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Login from './tienda/IniciarSecion.jsx'
import Signup from './tienda/RegistroUsuario.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
    path: "/TRANAJO-FULL-STACK-V2",
    element: <App />,
  },
  
  {
    path: "/TRANAJO-FULL-STACK-V2/login",
    element: <Login />,
  },

  {
    path: "/TRANAJO-FULL-STACK-V2/signup",
    element: <Signup />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
