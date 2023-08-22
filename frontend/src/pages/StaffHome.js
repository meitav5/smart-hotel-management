import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../index.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import axiosInstance from '../components/AxiosInstance';
import { user_data } from '../redux';
import {USERS_API_URL} from '../constants';

function StaffHome() {

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUserData = useSelector(
        (state) => state.session.userData
    );
    
    const redirectPage = (page) => {
        history.push(page);
    }

    return (
        <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
            <Col style={{ padding: '50px', border: '1px solid #DEE2E6', borderRadius: '20px' }} className="shadow-lg" lg={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
                <Row style={{ margin: '0px 0px 40px 0px', padding: '0px' }}>
                    <Col lg={12} md={12} sm={12}>
                        <p style={{ 'fontSize': '18px' ,'textAlign': 'center', marginBottom: '15px' }}>Smart Hotel Employee</p>
                    </Col>
                </Row>
                <Row style={{ margin: '0px 0px 20px 0px', padding: '0px' }}>
                    <Col lg={6} md={6} sm={6}>
                        <Button size="md" onClick={() => redirectPage('/room_status')}>Room Status</Button>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Button size="md" onClick={() => redirectPage('/add_devices')}>Add Electric Item</Button>
                    </Col>
                </Row>
                <Row style={{ margin: '20px 0px 0px 0px', padding: '0px' }}>
                    <Col lg={6} md={6} sm={6}>
                        <Button size="md" onClick={() => redirectPage('/electric_dashboard')}>Electric Dashboard</Button>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Button size="md" onClick={() => redirectPage('/room_issues')}>Room Issues</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
            
    );
    }

export default StaffHome;