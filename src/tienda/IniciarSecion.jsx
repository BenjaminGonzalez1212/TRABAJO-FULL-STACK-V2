import { Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { createUser, getUsers } from "./data/Users";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to = "/TRABAJO-FULL-STACK-V2/app" />
    }

    const handleSubmit = (e) => {
    e.preventDefault();

    const users = getUsers();
    const user = users.find(user => user.email === email && user.password === password)

    //if (user) {
    //    auth.Login(user);
    //} else {
    //    alert("email o contraseña incorrectos")
    //}

    //lo vamos a usar despues, que ahora no puedo elimiar usuarios (no hay admin)
    
    //createUser({ name, email, password });
    //alert("Usuario creado con éxito");

    // aca redirigir al login.. o directo a la pagina no se la verdad, se ve despues (acordarce)
  };

    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>Email</label>
                <input
                    type = 'email'
                    value = {email}
                    onChange = { (e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type = 'password'
                    value = {password}
                    onChange = { (e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </DefaultLayout>
    );
}