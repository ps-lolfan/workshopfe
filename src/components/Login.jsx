import React, { useState, useEffect } from 'react';
import { login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Alert } from 'react-bootstrap';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');  // Redirect to homepage if already logged in
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await login({ username, password });
            localStorage.setItem('token', response.data.token);  // Save JWT token
            setError(null);
            navigate('/home');  // Redirect to homepage after login
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Row className="w-100">
                <Col md={6} lg={4} className="mx-auto">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <Form>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" className="w-100" onClick={handleLogin}>
                                    Login
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                <p>Don't have an account? <a href="/register">Register here</a></p>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
