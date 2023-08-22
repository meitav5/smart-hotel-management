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
import { all_devices, all_issues } from '../redux/session/sessionActions';

function Home() {

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUserData = useSelector(
        (state) => state.session.userData
    );
    
    const isRoomLocked = sessionUserData.locked;
    const roomNumber = sessionUserData.room_number;

    const redirectPage = (page) => {
        history.push(page);
    }

    const changeRoomStatus = () => {
        let postData = {"status": !isRoomLocked};
        axiosInstance.patch(USERS_API_URL+"change_room_status/?locked=true", postData).then((response) => {
            if(response.data.ok){
                let devices = response.data.user.devices;
                let issues = response.data.user.issues;
                let userData = response.data.user;
                delete userData["devices"];
                delete userData["issues"];
                if(userData["role"] === "staff"){
                    dispatch(all_issues(issues))
                }
                dispatch(all_devices(devices));
                dispatch(user_data(userData));
            }
        })
    }

    return (
        <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
            <Col style={{ padding: '50px', border: '1px solid #DEE2E6', borderRadius: '20px' }} className="shadow-lg" lg={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
                <Row style={{ margin: '0px 0px 40px 0px', padding: '0px' }}>
                    <Col lg={12} md={12} sm={12}>
                        <p style={{ 'fontSize': '18px' ,'textAlign': 'center', marginBottom: '15px' }}>Welcome, we are delighted to host you to our hotel, your room number is {sessionUserData.room_number}. Your room is located on {sessionUserData.floor_number}<sup>th</sup> floor.</p>
                    </Col>
                </Row>
                <Row style={{ margin: '0px 0px 40px 0px', padding: '0px' }}>
                    <Col>
                        <Button onClick={() => changeRoomStatus()} variant={isRoomLocked?'success':'danger'} className="w-100" size="lg">{isRoomLocked?'Open My Room':'Lock My Room'}</Button>
                    </Col>
                </Row>
                <Row style={{ margin: '0px 0px 40px 0px', padding: '0px' }}>
                    <Col lg={6} md={6} sm={6}>
                        <Button style={{ height: '70px', width: '170px' }} size="md" onClick={() => redirectPage('/ac_management')}>AC Management</Button>
                    </Col>
                    <Col lg={6} md={6} sm={6}>
                        <Button style={{ height: '70px', width: '170px' }} size="md" onClick={() => redirectPage('/lighting_management')}>Lighting Management</Button>
                    </Col>
                </Row>
                <Row style={{ margin: '0px 0px 40px 0px', padding: '0px' }}>
                    <Col lg={6} md={6} sm={6}>
                        <Button style={{ height: '70px', width: '170px' }} size="md" onClick={() => redirectPage('/add_issues')}>Add Issues</Button>
                    </Col>
                    {/* <Col lg={6} md={6} sm={6}>
                        <Button style={{ height: '70px', width: '170px' }} size="md" onClick={() => redirectPage('/shabbat_clock')}>Shabbat Clock</Button>
                    </Col> */}
                </Row>
            </Col>
        </Row>
            
    );
    }

export default Home;