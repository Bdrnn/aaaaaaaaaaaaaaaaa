import { useState, useEffect } from "react"
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import defaultImage from "../img/profile.jpg"

export default function Register() {
    const { users, setUsers, setCurrentUser } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password || !displayName) {
            alert('Cannot empty');
            return;
        }

        if (password !== confirmPassword) {
            alert('Password do not match!')
            return;
        }

        const newUser = {
            displayName,
            username,
            password,
            profileImage: defaultImage,
        };
        setUsers([...users, newUser]);
        setCurrentUser(newUser);

        setDisplayName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');

        navigate('/')

        alert('Register successfully!');
    }

    return (
        <form
            className="registerForm"
            onSubmit={handleSubmit}
        >
            <h1>Register</h1>
            <label>Display Name</label>
            <input
                type="text"
                placeholder="Display name"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
            ></input>
            <label>Username</label>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
            ></input>
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            ></input>
            <input
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            ></input>
            <button>Register</button>
        </form>
    )
}