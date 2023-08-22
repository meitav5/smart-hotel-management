import React, {useState, useEffect}  from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import '../index.css'
import axiosInstance from '../components/AxiosInstance';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import {
    user_data,
    all_devices,
    all_issues
} from "../redux";
import { USERS_API_URL } from '../constants';

function DeviceForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const sessionUserData = useSelector(
        (state) => state.session.userData
    );

    const [allUsers, setAllUsers] = useState([]);

    const [roomOptions, setRoomOptions] = useState([]);

    const sessionAllUsersData = useSelector(
        (state) => state.session.allUsers
    );

    const redirectPage = (page) => {
        history.push(page);
    }

    useEffect(() => {
        if(sessionAllUsersData && sessionAllUsersData.length > 0){
            setAllUsers(sessionAllUsersData);
            let rOptions = [];
            sessionAllUsersData.map(item => {
                let temp = {"label": "Room " + item.room_number, "value": item.room_number}
                rOptions.push(temp);
            })  
            setRoomOptions(rOptions);
        }
    }, [sessionAllUsersData]);


    const [formData, setFormData] = useState({
        'wattage': '',
        'deviceName': '',
        'roomNumber': ''
    })

    const [deviceFormStatusMsg, setDeviceFormStatusMsg] = useState("");
    const [isFormSubmitError, setIsFormSubmitError] = useState(false);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState(false);
    
    const rooms = sessionUserData.allData?sessionUserData.allData:null;
    
    const [roomNumberOptions, setRoomNumberOptions] = useState([]);

    const [formErrors, setFormErrors] = useState({
        'wattage': '',
        'deviceName': '',
        'roomNumber': ''
    });

    const formValid = (formErrors, formData) => {
        let valid = true;
        Object.keys(formErrors).forEach((key) => {
            formErrors[key].length > 0 && (valid = false);
        });
        Object.keys(formData).forEach((key) => {
            formData[key] === null && (valid = false);
        });
        return valid;
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        validate(name, value);
    };

    const clearForm = (posted) => {
        setFormData({
            'wattage': '',
            'deviceName': '',
            'roomNumber': ''
        });
        setFormErrors({
            'wattage': '',
            'deviceName': '',
            'roomNumber': ''
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = false;
        setFormSubmitDisabled(true);
        if (formValid(formErrors, formData)) {
            valid = true;
        } else {
            setFormSubmitDisabled(false);
            setIsFormSubmitError(true);
            setDeviceFormStatusMsg("Some of your fields are empty or incorrect");
            setTimeout(function () {
                setDeviceFormStatusMsg("");
            }, 10000);
        }
        if(valid){
            setTimeout(function () {
                setDeviceFormStatusMsg("");
            }, 1000);
            
            let postData = {
                "wattage": formData.wattage,
                "deviceName": formData.deviceName,
                'roomNumber': formData.roomNumber
            }

            axiosInstance
            .post(USERS_API_URL+"add_devices/", postData)
            .then((response) => {
                if (response.data.ok) {
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
                    setFormSubmitDisabled(false);
                    setIsFormSubmitError(false);
                    clearForm(true);
                } else {
                    setFormSubmitDisabled(false);
                    setIsFormSubmitError(true);
                    setDeviceFormStatusMsg(response.data.error);
                    setTimeout(function () {
                        setDeviceFormStatusMsg("");
                    }, 10000);
                    console.log("Error");
                }
            })
            .catch((error) => {
                setFormSubmitDisabled(false);
                setIsFormSubmitError(true);
                setDeviceFormStatusMsg("Some error Occurred");
                setTimeout(function () {
                    setDeviceFormStatusMsg("");
                }, 10000);
                console.log(error);
            });
        }
    }

    const handleSelect = () => {
        console.log('here')
    }

    const validate = (name, value) => {
        switch (name) {
            case "wattage":
                setFormData({ ...formData, wattage: value });
                setFormErrors({
                    ...formErrors,
                    wattage: ''
                })
                if (value > 230) {
                    setFormErrors({
                        ...formErrors,
                        wattage: "Wattage cannot be more than 230 V",
                    });
                }else if(value.length === 0){
                    setFormErrors({
                        ...formErrors,
                        wattage: "Wattage cannot be empty",
                    });
                }
                break;
            case "deviceName":
                setFormData({ ...formData, deviceName: value });
                setFormErrors({
                    ...formErrors,
                    deviceName: ''
                })
                if (value.length > 30) {
                    setFormErrors({
                        ...formErrors,
                        deviceName: "Device name be more than 30 characters",
                    });
                }else if(value.length === 0){
                    setFormErrors({
                        ...formErrors,
                        deviceName: "Device name cannot be empty",
                    });
                }
                break;
                case "roomNumber":
                    setFormData({ ...formData, roomNumber: value });
                    setFormErrors({
                        ...formErrors,
                        roomNumber: ''
                    })
                    if(value.length === 0){
                        setFormErrors({
                            ...formErrors,
                            roomNumber: "Room Number cannot be empty",
                        });
                    }
                break;
            default:
                break;
        }
    };


    return (
        <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
        <Col className="shadow-lg" style={{ border: '1px solid #DEE2E6', borderRadius: '20px', padding: '20px' }} lg={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
            <h5 style={{ 'textAlign': 'center', marginBottom: '15px' }}>Add Electric Item</h5>
            <Form id="deviceFormData" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="deviceForm.roomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Select onChange={handleSelect} aria-label="Select Room">
                <option disabled>Select Room</option>
                {roomOptions.map((item, idx) => {
                    return (<option name={item.label} key={idx} value={item.value}>{item.label}</option>)
                })
                }
            </Form.Select>
            <Row style={{ padding: "0px", margin: "0px" }}>
            <Col style={{ padding: "0px" }}>
                {formErrors.roomNumber && formErrors.roomNumber.length > 0 && (
                <span className="float-left error_message">
                {formErrors.roomNumber}
                </span>
            )}
            </Col>
            </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="deviceForm.wattage">
                <Form.Label>Wattage</Form.Label>
                <Form.Control name="wattage" value={formData.wattage} type="number" placeholder="Wattage" onChange={handleChange} />
                <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                    {formErrors.wattage && formErrors.wattage.length > 0 && (
                    <span className="float-left error_message">
                        {formErrors.wattage}
                    </span>
                    )}
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="deviceForm.deviceName">
                <Form.Label>Device Name</Form.Label>
                <Form.Control name="deviceName" value={formData.deviceName} type="deviceName" placeholder="Device Name" onChange={handleChange}/>
                <Row style={{ padding: "0px", margin: "0px" }}>
                <Col style={{ padding: "0px" }}>
                    {formErrors.deviceName && formErrors.deviceName.length > 0 && (
                    <span className="float-left error_message">
                    {formErrors.deviceName}
                    </span>
                )}
                </Col>
                </Row>
            </Form.Group>
            <Row style={{ padding: "10px 0px 10px 0px", margin: "10px" }}>
                <Col style={{ padding: "0px", textAlign: "center" }}>
                    <Button disabled={formSubmitDisabled} className="btn-block" size="md" form="deviceFormData" type="submit" variant="success">Add Device 
                        {formSubmitDisabled && 
                            (<Spinner
                                style={{ marginLeft: '10px' }}
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                            )
                        }
                    </Button>
                </Col>
                </Row>
        </Form>
        <Row style={{ margin: "10px 0px 10px 0px", padding: "0px", height: '5px' }}>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div
                    style={{ textAlign: 'center' }}
                    className={isFormSubmitError?"form_error_message":"form_success_message"}
                >
                    {deviceFormStatusMsg}
                </div>
            </Col>
        </Row>
        <Row style={{ margin: '50px 0px 0px 0px', padding: '0px' }}>
            <Col lg={{span: 4, offset: 4}} md={{span: 4, offset: 4}} sm={{span: 4, offset: 4}}>
                <Button size="md" onClick={() => redirectPage('/staff_home')}>Back</Button>
            </Col>
        </Row>
        </Col>
        </Row>
    );
    }

export default DeviceForm;