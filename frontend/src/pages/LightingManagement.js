import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../index.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import axiosInstance from '../components/AxiosInstance';
import { user_data, all_devices, all_issues } from '../redux';
import {USERS_API_URL} from '../constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBath, faLightbulb } from "@fortawesome/free-solid-svg-icons";

function LightingManagement() {

    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUserData = useSelector(
        (state) => state.session.userData
    );
    
    const sessionDevices = useSelector(
        (state) => state.session.allDevices
    );

    const [allDevices, setAllDevices] = useState([]);

    useEffect(() => {
        getDevices();
    }, [sessionDevices]);

    const redirectPage = (page) => {
        history.push(page);
    }

    const getDevices = () => {
        axiosInstance.get(USERS_API_URL+"all_devices/").then((response) => {
            if(response.data.ok){
                setAllDevices(response.data.devices);
            }
        })
    }

    const changeDeviceStatus = (device) => {
        if(device){
            let newDevicesList = [];
            for(var i=0;i < allDevices.length; i++){
                let item = allDevices[i];
                let temp = item;
                if(item.id === device.id){
                    temp["status"] = !item.status;
                }
                newDevicesList.push(temp);
            }
            let postData = {"deviceList": newDevicesList};
            axiosInstance.patch(USERS_API_URL+"change_device_status/", postData).then((response) => {
                if(response.data.ok){
                    setAllDevices(response.data.user.devices);
                }
            })
        }
    }

    return (
        <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
            <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
                <Col style={{ padding: '80px', border: '1px solid #DEE2E6', borderRadius: '20px' }} className="shadow-lg" lg={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
                    <Row style={{ margin: '0px 0px 40px 0px', padding: '0px' }}>
                        <Col lg={12} md={12} sm={12}>
                            <p style={{ 'fontSize': '18px' ,'textAlign': 'center', marginBottom: '15px' }}>Lighting Management</p>
                        </Col>
                    </Row>
                    <Row style={{ margin: '0px', padding: '0px' }}>
                    {allDevices && allDevices.length > 0?allDevices.map((item, idx) => {
                        return (
                                <Col key={idx} style={{ margin: '0px', padding: '10px' }} xl={6} lg={6} md={6} sm={6}>
                                    <Row style={{ margin: '0px', padding: '0px' }}>
                                        <Col>
                                            <FontAwesomeIcon style={{ textAlign: 'center', paddingBottom: '10px' }} size="2x" color={item.status?'orange':'grey'} icon={faLightbulb} className="all_users_icon"/>
                                        </Col>
                                        <Col>
                                            <Button onClick={() => changeDeviceStatus(item)} style={{ marginTop: '3px' }} variant={item.status?'success':'danger'} size="sm">{item.status?'ON': 'OFF'}</Button>
                                        </Col>
                                    </Row>
                                    <Row style={{ margin: '10px 0px 0px 0px', padding: '0px' }}>
                                        <Col style={{ textAlign: 'center' }} lg={12} md={12} sm={12}>
                                            <p style={{ fontWeight: 'bold', fontSize: '12px' }}>{item.device_name}</p>
                                        </Col>
                                    </Row>
                                </Col>)
                            }):<Col style={{ textAlign: 'center'}}>
                                <p>There are no devices in this room</p>
                            </Col>}
                    </Row>
                    <Row style={{ margin: '50px 0px 0px 0px', padding: '0px' }}>
                        <Col lg={{span: 4, offset: 4}} md={{span: 4, offset: 4}} sm={{span: 4, offset: 4}}>
                            <Button size="md" onClick={() => redirectPage('/guest_home')}>Back</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </Row>
    );
    }

export default LightingManagement;