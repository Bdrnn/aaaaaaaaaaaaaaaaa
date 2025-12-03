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
            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUserName(e.target.value)}
            ></input>
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            ></input>
            <button>Login</button>
        </form>
    )

}