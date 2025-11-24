import { useState } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { createUser } from "../services/personaService";
import "./RegistroUsuarios.css"; 

export default function Signup() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
    const [error, setError] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isAuthenticated) {
    return <Navigate to="/TRABAJO-FULL-STACK-V2/app" />;
  }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !repeatPassword) {
        setError("Por favor completar todos los campos.");
        return;
        }

        if (password !== repeatPassword) {
        setError("Las contraseñas no coinciden.");
        return;
        }

        try {
            const persona = {
            name: name,
            email: email,
            password: password,
            };

            await createUser(persona);

            setError("Usuario creado con éxito.");
            navigate("/TRABAJO-FULL-STACK-V2/login");

        } catch (error) {
            console.error(error);
            setError("Hubo un problema registrando el usuario.");
        }
    };

    return (
        <DefaultLayout>
            <div className="signup-card">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Registrarse</h1>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <label>Nombre de usuario</label>
                    <input
                        type = 'text'
                        value = {name}
                        onChange = { (e) => setName(e.target.value)}
                    />

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

                    <label>Repetir Contraseña</label>
                    <input
                        type = 'password'
                        value = {repeatPassword}
                        onChange = { (e) => setRepeatPassword(e.target.value)}
                    />

                    <button type="submit">Crear Cuenta</button>

                    <footer>
                        2025 Pastelería Gamery
                    </footer>
                </form>
            </div>
        </DefaultLayout> 
    );
}