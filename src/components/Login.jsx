import React, { useState } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token); // Save JWT token

            setError(null); // Clear any previous error
            navigate('/'); // Redirect to homepage (or any protected route)
        } catch (err) {
            console.error("Login failed", err);
            setError("Invalid username or password"); // Set error message
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="form-control mb-2"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="form-control mb-2"
            />
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </div>
    );
};

export default Login;
