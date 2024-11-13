import React, { useState } from 'react';
import { login } from '../services/authService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token); // Save JWT token
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </div>
    );
};

export default Login;
