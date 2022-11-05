import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai'

const Profile = () => {
    const { user, updateUserProfile, logOut } = useAuth();
    const [myPosts, setMyPosts] = useState([]);
    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        updateUserProfile(name, photo)
            .then(() => {
                toast.success("Profile Updated!");
            })
            .catch(error => {
                toast.error(error.message);
            })
    }
    useEffect(() => {
        fetch(`http://localhost:5000/newsByEmail?email=${user.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('sunrise-news-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('sunrise-news-token');
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                Array.isArray(data) && setMyPosts(data);
            })
    }, [user?.email, logOut])
    // delete news
    const handleDeleteNews = (_id) => {
        fetch(`http://localhost:5000/news/${_id}`, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("News deleted!");
                    setMyPosts(myPosts.filter(p => p._id !== _id));
                }
            })
    }
    return (
        <div>
            <h2>Your Posts</h2>
            <Card>
                <Card.Header>Posts title</Card.Header>
                <ListGroup variant="flush">
                    {
                        myPosts.map(post => <ListGroup.Item className="d-flex justify-content-between" key={post._id}>
                            <Link to={`/news/${post._id}`}>{post.title.length > 60 ? post.title.slice(0, 70) + '...' : post.title} </Link>
                            <div>
                                <small>{post.author?.published_date}</small>
                                <AiOutlineDelete onClick={() => handleDeleteNews(post._id)} className='fs-5 cursor-pointer ms-2' style={{ cursor: 'pointer' }} />
                            </div>
                        </ListGroup.Item>
                        )
                    }

                </ListGroup>
            </Card>
            <Form onSubmit={handleUpdateProfile} className="bg-white p-5 px- mt-3 rounded-3">
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" defaultValue={user?.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name="name" defaultValue={user.displayName} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Your Photo URL</Form.Label>
                    <Form.Control type="text" name="photo" defaultValue={user.photoURL} readOnly />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
            </Form>
        </div>
    );
}

export default Profile;