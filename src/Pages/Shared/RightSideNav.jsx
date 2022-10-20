import React from 'react';
import Button from 'react-bootstrap/Button';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaWhatsapp, FaSignOutAlt, FaLinkedin } from 'react-icons/fa';
import ListGroup from 'react-bootstrap/ListGroup';
import BrandCarousel from './BrandCarousel';
import { useAuth } from '../../contexts/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const googleProvider = new GoogleAuthProvider();

const RightSideNav = () => {
    const navigate = useNavigate();
    const { user, providerLogin, logOut } = useAuth();
    const handleGoogleSignin = () => {
        providerLogin(googleProvider)
            .then(result => {
                console.log(result);
                navigate("/");
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div>
            <div className="d-grid gap-2">
                {
                    user?.uid ?
                        <Button onClick={logOut} className="d-flex justify-content-center align-items-center gap-2" variant="outline-dark">
                            <FaSignOutAlt style={{ fontSize: '20px' }} /> Logout
                        </Button>
                        :
                        <>
                            <Button onClick={handleGoogleSignin} className="d-flex justify-content-center align-items-center gap-2" variant="outline-primary">
                                <FaGoogle style={{ fontSize: '20px' }} /> Login via Google
                            </Button>
                            <Button className="d-flex justify-content-center align-items-center gap-2" variant="outline-dark">
                                <FaGithub style={{ fontSize: '20px' }} /> Login via Github
                            </Button>
                        </>
                }
            </div>
            <div className='mt-4'>
                <h5>Find us on</h5>
                <ListGroup className='grid gap-2'>
                    <ListGroup.Item><FaFacebook /> Facebook</ListGroup.Item>
                    <ListGroup.Item><FaWhatsapp /> Whatsapp</ListGroup.Item>
                    <ListGroup.Item><FaTwitter /> Twitter</ListGroup.Item>
                    <ListGroup.Item><FaLinkedin /> LinkedIn</ListGroup.Item>
                    <ListGroup.Item><FaGithub /> Github</ListGroup.Item>
                </ListGroup>
            </div>
            <div className='mt-4'>
                <BrandCarousel />
            </div>
        </div>
    );
};

export default RightSideNav;