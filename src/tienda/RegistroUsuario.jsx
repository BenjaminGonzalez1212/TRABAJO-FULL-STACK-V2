import DefaultLayout from "./layout/DefaultLayout";

export default function Signup() {
    return (
        <DefaultLayout>
            <form className="form">
                <h1>SignUp</h1>
                <label>Username</label>
                <input type = 'text'/>

                <label>Gmail</label>
                <input type = 'email'/>

                <label>Password</label>
                <input type = 'password'/>

                <label>Repeat Password</label>
                <input type = 'password'/>

                <button>Login</button>
            </form>
        </DefaultLayout>
    );
}