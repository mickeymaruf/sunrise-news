import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import LeftSideNav from './LeftSideNav';
import { FaUserAlt } from 'react-icons/fa';

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
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">
                            {user?.displayName}
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <FaUserAlt />
                        </Nav.Link>
                    </Nav>
                    <div className='d-lg-none'>
                        <LeftSideNav />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;