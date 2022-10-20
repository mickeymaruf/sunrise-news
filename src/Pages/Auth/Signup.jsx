import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/AuthProvider';
import { updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const { createUser } = useAuth();
    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const picture = form.picture.value;
        const password = form.password.value;
        createUser(email, password)
            .then(result => {
                updateProfile(result.user, { displayName: name, photoURL: picture })
                form.reset();
                navigate("/");
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="p-5 pt-0">
            <Form onSubmit={handleSignUp} className="bg-white p-5 px- mt-3 rounded-3">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPicture">
                    <Form.Label>Picture URL</Form.Label>
                    <Form.Control type="url" name="picture" placeholder="Enter picture url" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="********" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
                <Form.Text className="text-danger d-block mt-3">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form>
        </div>
    );
};

export default Signup;