// components/NavBar.js
import React from 'react';
import { Navbar, Nav, Container, Button, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ setShowModal }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/'); // Redirect to login page
    };

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm py-2">
            <Container>
                <Navbar.Brand href="#" className="fw-bold text-primary">Book Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto d-flex flex-column flex-lg-row align-items-center justify-content-end">
                        <Button
                            variant="primary"
                            className="me-2 mb-2 mb-lg-0"
                            onClick={() => setShowModal(true)}
                        >
                            Add Book
                        </Button>
                        <Button
                            variant="secondary"
                            className="mb-2 mb-lg-0"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default NavBar;
