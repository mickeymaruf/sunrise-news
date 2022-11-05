import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer';
import Header from '../Pages/Shared/Header';
import LeftSideNav from '../Pages/Shared/LeftSideNav';
import RightSideNav from '../Pages/Shared/RightSideNav';

const Root = () => {
    return (
        <div>
            <Header />
            <Container className='pt-3'>
                <Row>
                    <Col lg="2" className='d-none d-lg-block'>
                        <LeftSideNav />
                    </Col>
                    <Col lg="7">
                        <Outlet />
                    </Col>
                    <Col lg="3">
                        <RightSideNav />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
};

export default Root;