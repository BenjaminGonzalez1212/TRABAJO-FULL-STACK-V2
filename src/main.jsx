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
import DetalleBlogs from './tienda/blogs/DetalleBlogs.jsx'
import Administrador from './administrador/administrador.jsx'
import LoginAdmin from './administrador/LogInAdmin.jsx'
import ProtectedRouteAdmin from './tienda/auth/ProtectedRouteAdmin.jsx'
import SignupAdmin from './administrador/SignUpAdmin.jsx'

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

  {
    path: "/TRABAJO-FULL-STACK-V2/detalleblogs",
    element: <DetalleBlogs />,
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/blogs/:id",
    element: <DetalleBlogs />,
  },
  
  {
    path: "/TRABAJO-FULL-STACK-V2/administrador",
    element: <ProtectedRouteAdmin />,
    children: [
      {
        path: "/TRABAJO-FULL-STACK-V2/administrador/inicio",
        element: <Administrador />,
      },
    ],
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/administrador/loginadmin",
    element: <LoginAdmin />,
  },

    {
    path: "/TRABAJO-FULL-STACK-V2/administrador/signupadmin",
    element: <SignupAdmin />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)