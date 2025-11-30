import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import AppVolver from './AppVolver.jsx'
import AdminAppVolver from './AdminAppVolver.jsx'
import Login from './tienda/IniciarSecion.jsx'
import Signup from './tienda/RegistroUsuario.jsx'
import Dashboard from './tienda/DashBoard.jsx'
import Carrito from './tienda/components/carrito/Carrito.jsx';
import Comprar from './tienda/components/comprar/Comprar.jsx'
import DetalleProducto from './tienda/components/carrito/DetalleProducto.jsx';
import Blogs from './tienda/blogs/Blogs.jsx'
import DetalleBlogs from './tienda/blogs/DetalleBlogs.jsx'
import Administrador from './administrador/Administrador.jsx'
import ProtectedRouteAdmin from './tienda/auth/ProtectedRouteAdmin.jsx'
import Home from './Home.jsx'
import Productos from './tienda/components/productos/Productos.jsx';
import { CartProvider } from "./tienda/context/CartContext.jsx";
import AdminBlogs from './administrador/BlogsAdmin/AdminBlogs.jsx'
import Pedido from './tienda/components/Pedido/Pedido.jsx'
import PedidoAdmin from './administrador/PedidoAdmin/PedidoAdmin.jsx'

import Usuarios from './administrador/usuarios/usuarios.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './tienda/ProtectedRoute.jsx'
import AuthContext, { AuthProvider } from './tienda/auth/AuthProvider.jsx'
import CatalogoAdmin from './administrador/CatalogoAdmin/CatalogoAdmin.jsx'

const router = createBrowserRouter([
  {
    path: "/TRABAJO-FULL-STACK-V2/*",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      
      {
      path: "productos",
      element: <Productos />
      },

      { path: "producto/:id",
        element: <DetalleProducto /> 
      },

      {
        path: "carrito",
        element: <Carrito />
      },

      {
        path: "pedido",
        element: <Pedido />
      },

      {
        path: "blogs",
        element: <Blogs />
      },

      {
        path: "blogs/:id",
        element: <DetalleBlogs />
      },

      {
        path: "Dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            path: "",
            element: <Dashboard />
          }
        ]
      },
    ],
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/*",
    element: <AppVolver />,
    children: [
      {
        path: "comprar",
        element: <Comprar />
      },
    ]
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/admin",
    element: <ProtectedRouteAdmin />,
    children: [
      {
        path: "inicio",
        element: <Administrador />
      },

      {
        element: <AdminAppVolver />,
        children: [
          {
            path: "usuarios",
            element: <Usuarios />
          },

          {
            path: "pedidos",
            element: <PedidoAdmin />
          },

          {
            path: "catalogo",
            element: <CatalogoAdmin />
          },

          {
            path: "blogs",
            element: <AdminBlogs />
          },
        ]
      },
    ]
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/*",
    element: <AppVolver />,
    children: [
      {
        path: "comprar",
        element: <Comprar />
      },
    ]
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/login",
    element: <Login />,
  },

  {
    path: "/TRABAJO-FULL-STACK-V2/signup",
    element: <Signup />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);