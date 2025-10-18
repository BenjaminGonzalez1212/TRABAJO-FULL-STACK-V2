import { useState } from "react";
import DefaultLayout from "./layout/DefaultLayout";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

export default function Signup() {
    const { name, setName } = useState("");
    const { email, setEmail } = useState("");
    const { password, setPassword } = useState("");
    const { repeatpassword, setRepeatPassword } = useState("");

    const auth = useAuth();

    if(auth.isAuthenticated) {
        return <Navigate to = "/TRABAJO-FULL-STACK-V2/app" />
    }

    return (
        <DefaultLayout>
            <form className="form">
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
                    value = {repeatpassword}
                    onChange = { (e) => setRepeatPassword(e.target.value)}
                />

                <button>SignUp</button>
            </form>
        </DefaultLayout>
    );
}