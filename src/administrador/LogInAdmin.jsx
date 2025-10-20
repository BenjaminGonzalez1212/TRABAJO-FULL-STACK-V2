import { useState } from "react";
import { useAuth } from "../tienda/auth/AuthProvider";
import { findAdmin } from "../tienda/data/Admins";
import { Navigate } from "react-router-dom";
import DefaultLayout_2 from "../tienda/layout/DefaultLayout_2";
import "./LoginAdmin.css";

export default function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();

  if (auth.isAuthenticated && auth.user?.role === "admin") {
    return <Navigate to="/TRABAJO-FULL-STACK-V2/administrador/inicio" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const admin = findAdmin(email, password);
    if (admin) {
      auth.login({ ...admin, role: "admin" });
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <DefaultLayout_2>
      <div className="login-admin-container">
        <form className="login-admin-card" onSubmit={handleLogin}>
          <h1>Iniciar sesion Administrador</h1>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit">Ingresar</button>

          <footer>2025 Pastelería Gamery</footer>
        </form>
      </div>
    </DefaultLayout_2>
  );
}
