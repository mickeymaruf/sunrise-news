import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser, setLoading } = useAuth();
    const [error, setError] = useState(null);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleSignIn = (e) => {
        setError(null);
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        if (!email || !password) {
            setError("Field can't be empty!");
            return;
        }
        loginUser(email, password)
            .then(result => {
                if (result.user.emailVerified) {
                    form.reset();
                    // requesting for jwt web token
                    fetch('https://sunrise-news-server.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: result.user.email
                        })
                    }).then(res => res.json())
                        .then(data => {
                            localStorage.setItem("sunrise-news-token", data.token);
                            navigate(from, { replace: true });
                        })
                    //
                } else {
                    toast.error("Your email is not verified!")
                }
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }
    return (
        <div className="pb-5 px-md-5 p-lg-0 px-xl-5">
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