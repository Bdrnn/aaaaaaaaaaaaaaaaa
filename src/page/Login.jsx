import { useState } from "react";
import { useAuth } from "../context/UserContext"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { users, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(u =>
            u.username === username && u.password === password)
        if (!user) {
            alert('Username or password wrong!');
            return;
        }

        setCurrentUser(user);

        setUserName('');
        setPassword('');

        alert('Login successfully!')

        navigate('/')
    }
    return (
        <form className="loginForm" onSubmit={handleLogin}>
            <h1>Login</h1>
            <div className="labelinput">
                <label>Username</label>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                ></input>
            </div>
            <div className="labelinput">

                <label>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                ></input>
            </div>

            <button>Login</button>
        </form>
    )

}