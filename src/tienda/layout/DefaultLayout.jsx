import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/app">Volver a Home</Link>
            </li>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/signup">Ir a Signup</Link>
            </li>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/login">Ir a Login</Link>
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
