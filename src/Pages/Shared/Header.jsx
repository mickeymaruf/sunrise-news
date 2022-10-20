import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import LeftSideNav from './LeftSideNav';
import { FaUserAlt } from 'react-icons/fa';
import Image from 'react-bootstrap/Image';
import { Button } from 'react-bootstrap';

const Header = () => {
    const { user } = useAuth();
    return (
        <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
            <Container>
                <Link to="/" className='text-decoration-none'>
                    <Navbar.Brand className="d-flex align-items-center gap-2">
                        <span className='btn btn-primary'>Sunrise</span>
                        <span>News</span>
                    </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/*  */}
                    </Nav>
                    <Nav className="d-flex align-items-center text-muted">
                        <Nav.Link>
                            {user?.displayName}
                        </Nav.Link>
                        <div>
                            {
                                user && user.uid ?
                                    user.photoURL ?
                                        <Image src={user.photoURL} style={{ height: '33px' }} roundedCircle></Image>
                                        :
                                        <FaUserAlt />
                                    :
                                    <>
                                        <Link to="/login">
                                            <Button className="me-2" variant="outline-primary">Login</Button>
                                        </Link>
                                        <Link to="/signup">
                                            <Button variant="outline-dark">Sign Up</Button>
                                        </Link>
                                    </>
                            }
                        </div>
                    </Nav>
                    <div className='d-lg-none text-center text-md-start mt-3 lg-mt-0'>
                        <LeftSideNav />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;