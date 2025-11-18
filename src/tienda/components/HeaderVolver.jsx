import { useAuth } from "../auth/AuthProvider";

export default function HeaderVolver() {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/TRABAJO-FULL-STACK-V2/">Pastelería Gamery</a>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">{
            <li className="nav-item">
              <a className="nav-link active" href="/TRABAJO-FULL-STACK-V2/carrito">Volver</a>
            </li>
          }
          </ul>
        </div>
      </div>
    </nav>
  );
}
