import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../tienda/auth/AuthProvider";
import { createAdmin } from "../tienda/data/Admins";
import DefaultLayout_3 from "../tienda/layout/DefaultLayout_3";

export default function SignupAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isAuthenticated) {
    return <Navigate to="/TRABAJO-FULL-STACK-V2/administrador/inicio" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !repeatPassword) {
      setErrorResponse("Por favor completar todos los campos.");
      return;
    }

    if (password !== repeatPassword) {
      setErrorResponse("Las contraseñas no coinciden.");
      return;
    }

    createAdmin({ name, email, password });
    alert("Administrador creado con exito.");
    navigate("/TRABAJO-FULL-STACK-V2/administrador/loginadmin");
  };

  return (
    <DefaultLayout_3>
      <div className="signup-card">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Registro de Administrador</h1>

          <label>Nombre de usuario</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <label>Repetir Contraseña</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          {errorResponse && <p style={{ color: "red" }}>{errorResponse}</p>}

          <button type="submit">Crear Cuenta</button>

          <footer>2025 Pastelería Gamery</footer>
        </form>
      </div>
    </DefaultLayout_3>
  );
}
