import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../index.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import axiosInstance from '../components/AxiosInstance';
import { all_users, user_data, all_devices, all_issues } from '../redux';
import {USERS_API_URL} from '../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faLightbulb } from "@fortawesome/free-solid-svg-icons";

function RoomStatus() {

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUserData = useSelector(
        (state) => state.session.userData
    );
    
    const sessionAllUsersData = useSelector(
        (state) => state.session.allUsers
    );

    const [allUsers, setAllUsers] = useState([]);

    const roomNumber = sessionUserData.room_number;

    const redirectPage = (page) => {
        history.push(page);
    }

    useEffect(() => {
        if(sessionAllUsersData && sessionAllUsersData.length > 0){
            setAllUsers(sessionAllUsersData);
        }
    }, [sessionAllUsersData]);

    const change_room_occupancy_status = (room) => {

        let status;
        if(room){
            for(var i=0;i <= allUsers.length; i++){
                let item = allUsers[i];
                if(item.room_number === room.room_number){
                    status = item.occupied;
                    break;
                }
            }
            let postData = {"id": roomNumber, "status": !status};
            axiosInstance.patch(USERS_API_URL+"change_room_status/?occupancy=true", postData).then((response) => {
                if(response.data.ok){
                    let devices = response.data.user.devices;
                    let issues = response.data.user.issues;
                    let userData = response.data.user;
                    delete userData["devices"];
                    delete userData["issues"];
                    dispatch(all_devices(devices));
                    dispatch(user_data(userData));
                    if(userData["role"] === "staff"){
                        dispatch(all_users(response.data.all_data));
                        dispatch(all_issues(issues));
                    }
                }
            })
        }
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
                    {allUsers && allUsers.length > 0?allUsers.map((item, idx) => {
                        return (
                                <Col key={idx} style={{ margin: '0px', padding: '10px' }} xl={4} lg={4} md={4} sm={4}>
                                    <Row style={{ margin: '0px', padding: '0px' }}>
                                        <Col style={{ margin: '0px', padding: '5px 0px' }} lg={12} md={12} sm={12}>
                                            <div onClick={() => change_room_occupancy_status(item)} style={{ cursor: 'pointer', textAlign: 'center', fontSize: '12px', backgroundColor: item.occupied? 'orange': 'lightgreen' }}>{item.occupied?'Occupied': 'Available'}</div>
                                        </Col>
                                        <Col style={{ margin: '0px', padding: '5px 0px' }} lg={12} md={12} sm={12}>
                                            <FontAwesomeIcon color='#017EFA' style={{ textAlign: 'center' }} size="2x" icon={faBed} className="all_users_icon"/>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '0px 0px 0px 0px', padding: '0px' }}>
                                        <Col style={{ margin: '0px', padding: '0px' }} lg={12} md={12} sm={12}>
                                            <p style={{ marginLeft: '18px', fontWeight: 'bold', fontSize: '9px' }}>{item.room_number}</p>
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
                </Col>
            </Row>
            
        </Row>
    );
    }

export default RoomStatus;