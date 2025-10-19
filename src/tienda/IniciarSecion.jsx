import { Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { createUser, findUser, getUsers } from "./data/Users";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [error, setError] = useState("");

    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to = "/TRABAJO-FULL-STACK-V2/app" />
    }

    const handleSubmit = (e) => {
    e.preventDefault();

    const user = findUser(email, password)

    if (user) {
        auth.login(user);
        setError("");
        alter("sicion iniciada")
    } else {
        setError("email o contraseña incorrectos");
    }

    // aca redirigir al login.. o directo a la pagina no se la verdad, se ve despues (acordarce)
  };

    return (
        <DefaultLayout>
            <div className="signup-card">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Iniciar sesion</h1>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <label>Email</label>
                    <input
                        type = 'email'
                        value = {email}
                        onChange = { (e) => setEmail(e.target.value)}
                    />

                    <label>Contraseña</label>
                    <input
                        type = 'password'
                        value = {password}
                        onChange = { (e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Iniciar sesion</button>

                    <footer>
                        2025 Pastelería Gamery
                    </footer>
                </form>
            </div>
        </DefaultLayout>
    );
}