import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useAuth();
    const [error, setError] = useState(null);
    const handleSignIn = (e) => {
        setError(null);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        loginUser(email, password)
            .then(result => {
                form.reset();
                navigate("/");
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <div className="p-5 pt-0">
            <Form onSubmit={handleSignIn} className="bg-white p-5 px- mt-3 rounded-3">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="********" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                {
                    error && <Form.Text className="text-danger d-block mt-3">
                        {error}
                    </Form.Text>
                }
            </Form>
        </div>
    );
};

export default Login;