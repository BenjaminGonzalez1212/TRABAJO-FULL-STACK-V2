import { useAuth } from "../tienda/auth/AuthProvider";
import "../administrador/Administrador.css";

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
          <div className="admin-big-card">Compras</div>
          <div className="admin-big-card">Productos</div>
          <div className="admin-big-card">Usuarios Registrados</div>
        </section>

        <section className="admin-small-cards">
          <div className="admin-card">Dashboard</div>
          <div className="admin-card">Órdenes</div>
          <div className="admin-card">Productos</div>
          <div className="admin-card">Categorías</div>

          <div className="admin-card">Usuarios</div>
          <div className="admin-card">Reportes</div>
          <div className="admin-card">Perfil</div>
          <div className="admin-card">Tienda</div>
        </section>

        <footer className="admin-footer">
          © 2025 Pastelería Gamery — Panel de Administración
        </footer>
      </main>
    </div>
  );
}
