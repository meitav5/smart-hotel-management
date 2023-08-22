import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../index.css'
import {useSelector, useDispatch} from 'react-redux';
import { clear_session } from "../redux";

function Header(props) {
    
    const history = useHistory();
    const isLoggedIn = useSelector((state) => state.session.isLoggedIn);
    const dispatch = useDispatch();

    const redirectPage = (page) => {
        history.push(page);
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(clear_session());
        redirectPage('/')
    }

    return (
        <Navbar bg="light" variant="light" style={{ margin: '0px', margin: '0px' }}>
            <Navbar.Brand style={{ float: 'left', cursor: 'pointer' }}>
                <Row style={{ margin: '0px', padding: '0px'}}>
                    <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                        {/* <img alt="Hotel_Management" style={{ height: '50px', width: '80px' }} src={logo}/> */}
                    </Col>
                </Row>
            </Navbar.Brand>
            <Nav className="ms-auto">
                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default Header;
