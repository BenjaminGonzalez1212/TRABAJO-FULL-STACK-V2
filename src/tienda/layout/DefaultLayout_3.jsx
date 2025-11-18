import { Link } from "react-router-dom";

export default function DefaultLayout_3({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/">Volver a Home</Link>
            </li>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/administrador/loginadmin">Ir a LogIn</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {children}
      </main>
    </>
  );
}
