import React from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { FaEye, FaRegBookmark, FaShareAlt, FaStar } from 'react-icons/fa';

const NewsCard = ({ news, children }) => {
    const { _id, title, details, image_url, author, total_view, rating } = news;
    return (
        <Card className="mb-3">
            <Card.Header className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <Image src={author?.img} style={{ height: '50px' }} roundedCircle></Image>
                    <div className='ms-2'>
                        <small className='m-0 fw-bold'>{author?.name}</small> <br />
                        <small className='m-0'>{author?.published_date}</small>
                    </div>
                </div>
                <div>
                    <FaRegBookmark className='me-2' />
                    <FaShareAlt />
                </div>
            </Card.Header>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Img className="mt-1" variant="top" src={image_url} />
                <Card.Text className="mt-2 text-muted">
                    {children}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted d-flex justify-content-between">
                <span className="d-flex align-items-center">
                    <FaStar className='text-warning me-2' />
                    {rating?.number}
                </span>
                <span>
                    <FaEye /> {total_view}
                </span>
            </Card.Footer>
        </Card>
    );
};

export default NewsCard;