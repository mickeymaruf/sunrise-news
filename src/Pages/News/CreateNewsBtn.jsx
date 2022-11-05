import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { Button, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/AuthProvider';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CreateNewsBtn = ({ setLatestNews }) => {
    const { user, categories } = useAuth();
    const [enableCreate, setEnableCreate] = useState(false);
    const [requiredCategory, setRequiredCategory] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const category_id = form.category.value;
        const title = form.title.value;
        const image_url = form.image_url.value;
        const details = form.details.value;

        if (category_id === 'default') {
            setRequiredCategory(true);
            return;
        }
        setRequiredCategory(false);

        const author = {
            email: user.email,
            name: user.displayName,
            img: user.photoURL
        }
        const newsObj = { category_id, title, image_url, details, author }
        fetch('http://localhost:5000/news', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('sunrise-news-token')}`
            },
            body: JSON.stringify(newsObj)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    toast.success('News posted!');
                    form.reset();
                    fetch(`http://localhost:5000/news/${data.insertedId}`)
                        .then(res => res.json())
                        .then(currentNews => {
                            setLatestNews(prevState => [currentNews, ...prevState]);
                        })
                }
            })
    }
    return (
        <div>
            {
                user && user.email &&
                <Button onClick={() => setEnableCreate(!enableCreate)} className="mb-3" variant="primary">Create News <BsPencilSquare /></Button>
            }
            {
                enableCreate &&
                <Card className="p-3 mb-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Select name="category" className={requiredCategory ? 'border-danger' : ''}>
                                <option value='default'>Select one category</option>
                                {
                                    categories.map(category => <option
                                        key={'options' + category._id}
                                        value={category._id}
                                    >{category.name}</option>)
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="title" placeholder="News heading" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name="image_url" placeholder="News cover image url" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="textarea"
                                name="details"
                                placeholder="News description"
                                style={{ height: '100px' }}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card>
            }
        </div>
    );
};

export default CreateNewsBtn;