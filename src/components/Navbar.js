import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/components/Navbar.css';

const AppNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Inventory Management System</Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
