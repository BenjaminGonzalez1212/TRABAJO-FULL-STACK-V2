import { useAuth } from "../tienda/auth/AuthProvider";
import "../administrador/Administrador.css";
import { Link } from "react-router-dom";

export default function Administrador() {
  const auth = useAuth();

  const handleLogout = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <div className="admin-layout">
      <nav className="admin-sidebar bg-primary text-white">
        <div className="sidebar-header">
          <h2 className="fw-bold">Gamery Admin</h2>
        </div>

        <ul className="nav flex-column">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Órdenes</a></li>
          <li><a href="#">Productos</a></li>
          <li><a href="#">Categorías</a></li>
          <li><a href="#">Usuarios</a></li>
          <li><a href="#">Reportes</a></li>
          <li><a href="#">Tienda</a></li>
        </ul>

        <div className="sidebar-footer">
          <a href="#" className="perfil-link">Perfil</a>
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
            <span>Entradas de blog</span>
          </div>
          <div className="admin-big-card yellow-card">
            <span>Usuarios Registrados</span>
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
          <div className="admin-card">
            <span>Blogs</span>
          </div>
        </section>

        <div className="text-center mt-3 border-top border-light pt-3">
          2025 Pastelería Gamery
        </div>
      </main>
    </div>
  );
}
