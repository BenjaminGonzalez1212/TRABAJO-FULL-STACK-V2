import { Link } from "react-router-dom";

export default function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/app">Home</Link>
            </li>
            <li>
              <Link to="/TRABAJO-FULL-STACK-V2/signup">Signup</Link>
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
