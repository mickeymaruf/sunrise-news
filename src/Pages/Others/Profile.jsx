import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/AuthProvider';

const Profile = () => {
    const { user } = useAuth();
    return (
        <Form className="bg-white p-5 px- mt-3 rounded-3">
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" defaultValue={user?.email} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control type="text" defaultValue={user.displayName} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Your Photo URL</Form.Label>
                <Form.Control type="url" defaultValue={user.photoURL} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    );
}

export default Profile;