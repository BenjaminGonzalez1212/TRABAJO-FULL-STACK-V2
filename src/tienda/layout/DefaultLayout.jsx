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
          </ul>
        </nav>
      </header>

      <main>
        {children}
      </main>
    </>
  );
}
