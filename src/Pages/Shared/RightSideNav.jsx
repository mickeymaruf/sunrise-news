import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter,FaWhatsapp } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from './BrandCarousel';

const RightSideNav = () => {
    return (
        <div>
            <div className="d-grid gap-2">
                <Button className="d-flex justify-content-center align-items-center gap-2" variant="outline-primary">
                    <FaGoogle style={{ fontSize: '20px' }} /> Login via Google
                </Button>
                <Button className="d-flex justify-content-center align-items-center gap-2" variant="outline-dark">
                    <FaGithub style={{ fontSize: '20px' }} /> Login via Github
                </Button>
            </div>
            <div className='mt-4'>
                <h5>Find us on</h5>
                <ListGroup className='grid gap-2'>
                    <ListGroup.Item><FaFacebook /> Cras justo odio</ListGroup.Item>
                    <ListGroup.Item><FaWhatsapp /> Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item><FaTwitter /> Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </div>
            <div className='mt-4'>
                <BrandCarousel />
            </div>
        </div>
    );
};

export default RightSideNav;