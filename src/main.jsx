import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import Login from './tienda/IniciarSecion.jsx'
import Signup from './tienda/RegistroUsuario.jsx'
import Dashboard from './tienda/DashBoard.jsx'
import Carrito from './tienda/components/carrito/Carrito.jsx';
import Comprar from './tienda/components/comprar/Comprar.jsx'
import Blogs from './tienda/blogs/Blogs.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './tienda/ProtectedRoute.jsx'
import AuthContext, { AuthProvider } from './tienda/auth/AuthProvider.jsx'

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
    path: "/TRABAJO-FULL-STACK-V2/carrito",
    element: <Carrito />,
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/comprar",
    element: <Comprar />,
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/TRABAJO-FULL-STACK-V2/Dashboard",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/blogs",
    element: <Blogs />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)