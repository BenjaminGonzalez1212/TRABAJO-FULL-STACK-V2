import { useAuth } from "../tienda/auth/AuthProvider";
import "../administrador/Administrador.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Administrador() {
  const auth = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
    <Link rel="stylesheet" to="/TRABAJO-FULL-STACK-V2/" Link/>
  };

  const [numUsuarios, setNumUsuarios] = useState(0);
  const [numBlogs, setNumBlogs] = useState(0);

  const fetchNumUsuarios = () => {
    fetch("/api/personas")
      .then(res => res.json())
      .then(data => {
        setNumUsuarios(data.length);
      })
      .catch(err => {
        console.error("error usuarios:", err);
      });
  };

  useEffect(() => {
    fetchNumUsuarios();
  }, []);

  //-------------------------------

  const fetchNumBlogs = () => {
    fetch("/api/personas")
      .then(res => res.json())
      .then(data => {
        setNumBlogs(data.length);
      })
      .catch(err => {
        console.error("error blog:", err);
      });
  };

  useEffect(() => {
    fetchNumBlogs();
  }, []);


  return (
    <div className="admin-layout">
      <nav className="admin-sidebar bg-primary text-white">
        <div className="sidebar-header">
          <h2 className="fw">Gamery Admin</h2>
        </div>

        <ul className="nav flex-column">
          <li><a href="/TRABAJO-FULL-STACK-V2/">Inicio</a></li>
          <li><a href="/TRABAJO-FULL-STACK-V2/productos">Catalogo</a></li>
          <li><a href="/TRABAJO-FULL-STACK-V2/blogs">Blog</a></li>
          <li><a href="/TRABAJO-FULL-STACK-V2/carrito">Carrito</a></li>
        </ul>

        <div className="sidebar-footer">
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="admin-content">
        <header className="admin-header">
          <h1>Panel de Administración</h1>
        </header>

        <section className="admin-top-sections">
          <div className="admin-big-card blue-card">
            <span>Numero de Compras</span>
          </div>
          
          <div className="admin-big-card green-card">
            <span>Entradas de blog: {numBlogs}</span>
          </div>

          <div className="admin-big-card yellow-card">
            <span>Usuarios Registrados: {numUsuarios}</span>
          </div>
        </section>

        <section className="admin-small-cards">
          <Link to="/TRABAJO-FULL-STACK-V2/admin/usuarios" className="admin-card">
            <span>Usuarios</span>
          </Link>

          <div className="admin-card">
            <span>Pedidos</span>
          </div>
          
          <div className="admin-card">
            <span>Catalogo</span>
          </div>

          <Link to="/TRABAJO-FULL-STACK-V2/admin/Blogs" className="admin-card">
            <span>Blogs</span>
          </Link>
        </section>

        <div className="text-center mt-3 border-top border-light pt-3">
          2025 Pastelería Gamery
        </div>
      </main>
    </div>
  );
}
