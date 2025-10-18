import { Navigate } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";

export default function Login() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to = "/TRABAJO-FULL-STACK-V2/app" />
    }

    return (
        <DefaultLayout>
            <form className="form">
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

                <button>Login</button>
            </form>
        </DefaultLayout>
    );
}