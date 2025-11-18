import { useAuth } from "../auth/AuthProvider";

export default function Header() {
  const auth = useAuth();

  let navContent;

  if (auth.isAuthenticated === false) {
    navContent = (
      <>
        <li className="nav-item">
          <a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/login">Login</a>
        </li>

        <li className="nav-item">
          <a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/signup">SignUp</a>
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
        <a className="navbar-brand" href="/TRABAJO-FULL-STACK-V2/">Pastelería Gamery</a>

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
              <a className="nav-link active" href="/">Inicio</a>
            </li>

            <li className="nav-item">
              <a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/carrito">Productos</a>
            </li>

            <li className="nav-item dropdown">
              <a className="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#">
                Más
              </a>

              <div className="dropdown-menu">
                <a className="dropdown-item" href="/TRABAJO-FULL-STACK-V2/blogs">Blog</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/TRABAJO-FULL-STACK-V2/administrador/inicio">Administrador</a>
                <a className="dropdown-item" href="/TRABAJO-FULL-STACK-V2/componente1">chicomano</a>
              </div>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">{navContent}</ul>
        </div>
      </div>
    </nav>
  );
}
