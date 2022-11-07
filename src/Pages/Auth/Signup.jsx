import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate();
    const { createUser, updateUserProfile, verifyEmail } = useAuth();
    const [error, setError] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const handleSignUp = (e) => {
        setError(null);
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const picture = form.picture.value;
        const password = form.password.value;
        if (!name || !email || !password) {
            setError("Field can't be empty!");
            return;
        }
        createUser(email, password)
            .then(result => {
                form.reset();
                navigate("/");
                updateUserProfile(name, picture)
                    .then(() => { })
                    .catch(error => console.log(error));
                verifyEmail()
                    .then(() => {
                        toast.success("Successful! Please verify your email.");
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <div className="pb-5 px-md-5 p-lg-0 px-xl-5">
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
                    <Form.Control type="text" name="picture" placeholder="Enter picture url" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="********" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={(e) => setAccepted(e.target.checked)} type="checkbox" label={<>Accept <Link to="/terms">Terms and Conditions</Link></>} />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={!accepted}>
                    Sign Up
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

export default Signup;