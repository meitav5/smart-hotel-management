import React, {useState}  from 'react';
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

function ACManagement() {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const sessionUserData = useSelector(
        (state) => state.session.userData
    );

    const roomNumber = sessionUserData.room_number;
    const [formData, setFormData] = useState({
        'temperature': '',
        'fanLevel': ''
    })

    const redirectPage = (page) => {
        history.push(page);
    }

    const [acFormStatusMsg, setACFormStatusMsg] = useState("");
    const [isFormSubmitError, setIsFormSubmitError] = useState(false);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState(false);

    const [formErrors, setFormErrors] = useState({
        'temperature': '',
        'fanLevel': '',
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
            'temperature': '',
            'fanLevel': '',
        });
        setFormErrors({
            'temperature': '',
            'fanLevel': '',
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
            setACFormStatusMsg("Some of your fields are empty or incorrect");
            setTimeout(function () {
                setACFormStatusMsg("");
            }, 10000);
        }
        if(valid){
            setTimeout(function () {
                setACFormStatusMsg("");
            }, 1000);
            
            let postData = {
                "temperature": formData.temperature,
                "fanLevel": formData.fanLevel,
            }

            axiosInstance
            .patch(USERS_API_URL+"change_ac_settings/", postData)
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
                    setACFormStatusMsg(response.data.error);
                    setTimeout(function () {
                        setACFormStatusMsg("");
                    }, 10000);
                    console.log("Error");
                }
            })
            .catch((error) => {
                setFormSubmitDisabled(false);
                setIsFormSubmitError(true);
                setACFormStatusMsg("Some error Occurred");
                setTimeout(function () {
                    setACFormStatusMsg("");
                }, 10000);
                console.log(error);
            });
        }
    }

    const validate = (name, value) => {
        switch (name) {
            case "temperature":
                setFormData({ ...formData, temperature: value });
                setFormErrors({
                    ...formErrors,
                    temperature: ''
                })
                if (value > 30) {
                    setFormErrors({
                        ...formErrors,
                        temperature: "Temperature cannot be more than 30",
                    });
                }else if(value === 0){
                    setFormErrors({
                        ...formErrors,
                        temperature: "Temperature cannot be empty",
                    });
                }
                else if(value < 0){
                    setFormErrors({
                        ...formErrors,
                        temperature: "Temperature cannot be negative",
                    });
                }
                break;
            case "fanLevel":
                setFormData({ ...formData, fanLevel: value });
                setFormErrors({
                    ...formErrors,
                    fanLevel: ''
                })
                if (value > 4) {
                    setFormErrors({
                        ...formErrors,
                        fanLevel: "Fan Level be more than 4",
                    });
                }else if(value.length === 0){
                    setFormErrors({
                        ...formErrors,
                        fanLevel: "Fan Level cannot be empty",
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
            <h5 style={{ 'textAlign': 'center', marginBottom: '15px' }}>AC Management</h5>
            <Form id="ACManagementFormData" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="acManagementForm.temperature">
                <Form.Label>Temperature</Form.Label>
                <Form.Control name="temperature" value={formData.temperature} type="number" placeholder="Temperature" onChange={handleChange} />
                <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                    {formErrors.temperature && formErrors.temperature.length > 0 && (
                    <span className="float-left error_message">
                        {formErrors.temperature}
                    </span>
                    )}
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="acManagementForm.fanLevel">
                <Form.Label>Fan Level</Form.Label>
                <Form.Control name="fanLevel" value={formData.fanLevel} type="fanLevel" placeholder="Fan Level" onChange={handleChange}/>
                <Row style={{ padding: "0px", margin: "0px" }}>
                <Col style={{ padding: "0px" }}>
                    {formErrors.fanLevel && formErrors.fanLevel.length > 0 && (
                    <span className="float-left error_message">
                    {formErrors.fanLevel}
                    </span>
                )}
                </Col>
                </Row>
            </Form.Group>
            <Row style={{ padding: "10px 0px 10px 0px", margin: "10px" }}>
                <Col style={{ padding: "0px", textAlign: "center" }}>
                    <Button disabled={formSubmitDisabled} className="btn-block" size="md" form="ACManagementFormData" type="submit" variant="success">SET AC 
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
            <Row style={{ padding: "0px 0px 10px 0px", margin: "10px" }}>
                <Col style={{ padding: "0px", textAlign: "center" }}>
                    <Button onClick={() => redirectPage('/guest_home')} className="btn-block" size="md" form="ACManagementFormData" type="submit" variant="primary">Back
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
                    {acFormStatusMsg}
                </div>
            </Col>
        </Row>
        </Col>
        </Row>
    );
    }

export default ACManagement;