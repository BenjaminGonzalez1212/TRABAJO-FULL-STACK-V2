import { useAuth } from "../auth/AuthProvider";
import { blog_in } from "../data/Blogs_in";

export default function Blogs() {
  const auth = useAuth();
  let navContent;

  if (auth.isAuthenticated === false) {
    navContent = (
      <>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/login">Login</a></li>
        <li className="nav-item"><a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/signup">SignUp</a></li>
      </>
    )
  } else {
    navContent = (
      <li className="nav-item">
        <button
          className="nav-link active"
          onClick={(e) => {
            e.preventDefault();
            auth.logout();
          }}>
          Logout
        </button>
      </li>
    )
  }

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#"> Pastelería Gamery</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link active" href="#">Inicio</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Productos</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Contacto</a></li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Más</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/TRABAJO-FULL-STACK-V2/blogs">Blog</a>
                  <a className="dropdown-item" href="#">Ubicación</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Ayuda</a>
                </div>
              </li>

              <li className="nav-item ms-3">
                <a className="nav-link" href="/TRABAJO-FULL-STACK-V2/carrito" title="Ir al carrito">
                  <i className="bi bi-cart-fill" style={{ fontSize: "1.5rem" }}></i>
                </a>
              </li>

              <nav className="navbar-nav ms-auto">
                {navContent}
              </nav>

            </ul>
          </div>
        </div>
      </nav>

      <footer className="bg-primary text-white text-center py-3 mt-auto">
         2025 Pastelería Gamery
      </footer>
    </>
  );
}