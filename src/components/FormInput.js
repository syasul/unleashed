import React from 'react';
import { Form } from 'react-bootstrap';
import '../assets/css/components/FormInput.css';

const FormInput = ({ label, value, onChange, type = "text" }) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} value={value} onChange={onChange} />
        </Form.Group>
    );
};

export default FormInput;
