import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../assets/css/pages/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement login logic here
        console.log('Login Submitted', { email, password });
    };

    return (
        <Container className="login-page">
            <Row className="justify-content-md-center">
                <Col md={12}>
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <h2>Login</h2>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage;
