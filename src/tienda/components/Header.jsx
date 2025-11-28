import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";

export default function Header() {
  const auth = useAuth();

  let navContent;

  if (auth.isAuthenticated === false) {
    navContent = (
      <>
        <li className="nav-item">
          <Link to="/TRABAJO-FULL-STACK-V2/login" className="nav-link active">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/TRABAJO-FULL-STACK-V2/signup" className="nav-link active">
            SignUp
          </Link>
        </li>
      </>
    );
  } else {
    navContent = (
      <li className="nav-item">
        <button
          className="nav-link active btn btn-link"
          onClick={(e) => {
            e.preventDefault();
            auth.logout();
          }}
        >
          Logout
        </button>
      </li>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/TRABAJO-FULL-STACK-V2/" className="navbar-brand">
          Pastelería Gamery
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <Link to="/TRABAJO-FULL-STACK-V2/" className="nav-link active">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/TRABAJO-FULL-STACK-V2/productos" className="nav-link active">
                Productos
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#">
                Más
              </a>

              <div className="dropdown-menu">
                <Link to="/TRABAJO-FULL-STACK-V2/blogs" className="dropdown-item">
                  Blog
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/TRABAJO-FULL-STACK-V2/carrito" className="nav-link active">
                <i className="bi bi-cart3" style={{ fontSize: "1.4rem" }}></i>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">{navContent}</ul>
        </div>
      </div>
    </nav>
  );
}
