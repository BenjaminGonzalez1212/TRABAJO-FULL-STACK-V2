import { useState } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";
import { createUser, saveUsers, getUsers } from "./data/Users";

export default function Signup() {
  const {name, setName} = useState("");
  const {email, setEmail} = useState("");
  const {password, setPassword} = useState("");
  const {repeatPassword, setRepeatPassword} = useState("");

  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to="/TRABAJO-FULL-STACK-V2/app" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ name, email, password });
    alert("Usuario creado con éxito");

    // aca redirigir al login.. o directo a la pagina no se la verdad, se ve despues (acordarce)
  };

    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit}>
                <h1>SignUp</h1>
                <label>Username</label>
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

                <label>Password</label>
                <input
                    type = 'password'
                    value = {password}
                    onChange = { (e) => setPassword(e.target.value)}
                />

                <label>Repeat Password</label>
                <input
                    type = 'password'
                    value = {repeatPassword}
                    onChange = { (e) => setRepeatPassword(e.target.value)}
                />

                <button type="submit">SignUp</button>
            </form>
        </DefaultLayout>
    );
}