import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../index.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axiosInstance from '../components/AxiosInstance';
import { user_data } from '../redux';
import {USERS_API_URL} from '../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faLightbulb } from "@fortawesome/free-solid-svg-icons";

function RoomIssues() {

    const history = useHistory();
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    
    const sessionUserData = useSelector(
        (state) => state.session.userData
    );
    
    const sessionAllUsersData = useSelector(
        (state) => state.session.allUsers
    ); 
        
    const [allUsers, setAllUsers] = useState([]);

    const handleModalClose = () => {
        setModalOpen(false)    
    };

    const redirectPage = (page) => {
        history.push(page);
    }

    const showRoomIssues = (room) => {

        setModalOpen(true);
        // let changedDevices = devices.map(item => {
        //     if(item.id === device.id){
        //         item.status = !item.status;
        //     }
        //     return item;
        // })
        // let postData = {"id": roomNumber, "devices": changedDevices};
        
        // axiosInstance.patch(USERS_API_URL+"change_room_devices_status/", postData).then((response) => {
        //     if(response.data.ok){
        //         dispatch(user_data(response.data.user));
        //     }
        // })
    }

    return (
        <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
            <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
                <Col style={{ padding: '80px', border: '1px solid #DEE2E6', borderRadius: '20px' }} className="shadow-lg" lg={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
                    <Row style={{ margin: '0px 0px 20px 0px', padding: '0px' }}>
                        <Col lg={12} md={12} sm={12}>
                            <p style={{ 'fontSize': '18px' ,'textAlign': 'center', marginBottom: '15px' }}>Room Issues</p>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0px', padding: '0px' }}>
                    {sessionAllUsersData && sessionAllUsersData.length > 0?sessionAllUsersData.map((item, idx) => {
                        return (
                                <Col key={idx} style={{ margin: '0px', padding: '10px' }} xl={4} lg={4} md={4} sm={4}>
                                    <Row style={{ margin: '0px', padding: '0px' }}>
                                        <Col style={{ margin: '0px', padding: '5px 0px' }} lg={12} md={12} sm={12}>
                                            <div onClick={() => showRoomIssues(item)} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '12px', backgroundColor: item.issues.length > 0? 'lightpink': 'lightgreen' }}>{item.issues.length > 0?'With Issues': 'None'}</div>
                                        </Col>
                                        <Col style={{ margin: '0px', padding: '5px 0px' }} lg={12} md={12} sm={12}>
                                            <FontAwesomeIcon color='#017EFA' style={{ textAlign: 'center' }} size="2x" icon={faBed} className="all_users_icon"/>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '0px 0px 0px 0px', padding: '0px' }}>
                                        <Col style={{ margin: '0px', padding: '0px' }} lg={12} md={12} sm={12}>
                                            <p style={{ fontWeight: 'bold', fontSize: '9px' }}>Room number {item.room_number}</p>
                                        </Col>
                                    </Row>
                                </Col>)
                            }):<Col style={{ textAlign: 'center'}}>
                                <p>There are no rooms</p>
                            </Col>}
                    </Row>
                    <Row style={{ margin: '50px 0px 0px 0px', padding: '0px' }}>
                        <Col lg={{span: 4, offset: 4}} md={{span: 4, offset: 4}} sm={{span: 4, offset: 4}}>
                            <Button size="md" onClick={() => redirectPage('/staff_home')}>Back</Button>
                        </Col>
                    </Row>
                    <Modal show={modalOpen} onHide={handleModalClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Room Issues</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row style={{ margin: "0px", padding: "0px"}}>
                                <Col lg={12} md={12} sm={12}>
                                    <ul>
                                    {sessionUserData && sessionUserData.issues && sessionUserData.issues.length > 0?sessionUserData.issues.map((item, idx) => {
                                        return (
                                            <li key={idx}>{item.issue}</li>
                                        )
                                    }): 
                                    <p style={{ textAlign: 'center'}}>There are no issues for this room</p>
                                    }
                                    </ul>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleModalClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            
        </Row>
    );
    }

export default RoomIssues;