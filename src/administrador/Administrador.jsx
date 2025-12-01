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
  const [numPedidos, setNumPedidos] = useState(0);

  useEffect(() => {
    fetch("/api/personas")
      .then(res => res.json())
      .then(data => setNumUsuarios(data.length))
      .catch(err => console.error("Error usuarios:", err));
  }, []);

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setNumBlogs(data.length))
      .catch(err => console.error("Error blogs:", err));
  }, []);

  useEffect(() => {
    fetch("/api/pedidos")
      .then(res => res.json())
      .then(data => setNumPedidos(data.length))
      .catch(err => console.error("Error pedidos:", err));
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
            <span>Numero de Compras: {numPedidos}</span>
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

          <Link to="/TRABAJO-FULL-STACK-V2/admin/pedidos" className="admin-card">
            <span>Pedidos</span>
          </Link>
          
          <Link to="/TRABAJO-FULL-STACK-V2/admin/catalogo" className="admin-card">
            <span>Catalogo</span>
          </Link>

          <Link to="/TRABAJO-FULL-STACK-V2/admin/blogs" className="admin-card">
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