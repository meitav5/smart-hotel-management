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
    sign_in,
    user_data,
    user_created_success,
    is_loading,
    all_users,
    all_devices,
    all_issues
} from "../redux";

function LoginForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    
    const store_user_created_success = useSelector(
        (state) => state.session.userCreatedSuccess
    );

    const [formData, setFormData] = useState({
        'userName': '',
        'password': '',
        'role': 'guest'
    })

    const [loginFormStatusMsg, setLoginFormStatusMsg] = useState("");
    const [isFormSubmitError, setIsFormSubmitError] = useState(false);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState(false);

    const [formErrors, setFormErrors] = useState({
        'userName': '',
        'password': '',
        'role': ''
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
            'userName': '',
            'password': '',
            'role': ''
        });
        setFormErrors({
            'userName': '',
            'password': '',
            'role': ''
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
            setLoginFormStatusMsg("Some of your fields are empty or incorrect");
            setTimeout(function () {
                setLoginFormStatusMsg("");
            }, 10000);
        }
        if(valid){
            setTimeout(function () {
                setLoginFormStatusMsg("");
            }, 1000);
            let postData = {
                "userName": formData.userName,
                "password": formData.password,
                "role": formData.role
            }
            console.log(postData);
            axiosInstance
            .post("login/", postData)
            .then((response) => {
                if (response.data.ok) {
                    localStorage.setItem("refreshToken", response.data.refresh);
                    localStorage.setItem("accessToken", response.data.access);
                    let userRole = response.data.user.role;
                    let devices = response.data.user.devices;
                    let issues = response.data.user.issues;
                    let userData = response.data.user;
                    delete userData["devices"];
                    delete userData["issues"];
                    dispatch(sign_in());
                    dispatch(all_devices(devices));
                    dispatch(user_data(userData));
                    if(userRole === "staff"){
                        dispatch(all_users(response.data.all_data));
                        dispatch(all_issues(issues))
                    }
                    setFormSubmitDisabled(false);
                    setIsFormSubmitError(false);
                    clearForm(true);
                    if(userRole === "staff"){
                        history.push("/staff_home");
                    }else{
                        history.push("/guest_home");
                    }
                } else {
                    setFormSubmitDisabled(false);
                    setIsFormSubmitError(true);
                    setLoginFormStatusMsg(response.data.error);
                    setTimeout(function () {
                        setLoginFormStatusMsg("");
                    }, 10000);
                    console.log("Error");
                }
            })
            .catch((error) => {
                setFormSubmitDisabled(false);
                setIsFormSubmitError(true);
                setLoginFormStatusMsg("Some error Occurred");
                setTimeout(function () {
                    setLoginFormStatusMsg("");
                }, 10000);
                console.log(error);
            });
        }
    }

    const validate = (name, value) => {
        switch (name) {
            case "userName":
                setFormData({ ...formData, userName: value });
                if (value.length > 20) {
                    setFormErrors({
                        ...formErrors,
                        userName: "Username cannot be more than 20 characters",
                    });
                }else if(value.length === 0){
                    setFormErrors({
                        ...formErrors,
                        userName: "Username cannot be empty",
                    });
                }
                break;
            case "password":
                setFormData({ ...formData, password: value });
                if (value.length > 30) {
                    setFormErrors({
                        ...formErrors,
                        password: "Password cannot be more than 20 characters",
                    });
                }else if(value.length === 0){
                    setFormErrors({
                        ...formErrors,
                        password: "Password cannot be empty",
                    });
                }
                break;
            case "role":
                setFormData({ ...formData, role: value });
                if(value.length === 0){
                    setFormErrors({
                        ...formErrors,
                        role: "Role cannot be empty",
                    });
                }
                break;
            default:
                break;
        }
    };

    const handleSelect = (e) => {
        let val = e.target.value;
        let name = e.target.name;
        validate(name, val);
    }


    return (
        <Row style={{ margin: '40px 0px 40px 0px', padding: '0px' }}>
        <Col className="shadow-lg" style={{ border: '1px solid #DEE2E6', borderRadius: '20px', padding: '20px' }} lg={{ span: 4, offset: 4 }} md={{ span: 4, offset: 4 }} sm={{ span: 4, offset: 4 }}>
            <h5 style={{ 'textAlign': 'center', marginBottom: '15px' }}>LOGIN</h5>
            <Form id="loginFormData" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="loginForm.userName">
                <Form.Label>Username</Form.Label>
                <Form.Control name="userName" value={formData.userName} type="text" placeholder="User Name" onChange={handleChange} />
                <Row style={{ padding: "0px", margin: "0px" }}>
                    <Col style={{ padding: "0px" }}>
                    {formErrors.userName && formErrors.userName.length > 0 && (
                    <span className="float-left error_message">
                        {formErrors.userName}
                    </span>
                    )}
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginForm.password">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" value={formData.password} type="password" placeholder="Password" onChange={handleChange}/>
                <Row style={{ padding: "0px", margin: "0px" }}>
                <Col style={{ padding: "0px" }}>
                    {formErrors.password && formErrors.password.length > 0 && (
                    <span className="float-left error_message">
                    {formErrors.password}
                    </span>
                )}
                </Col>
                </Row>
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginForm.roomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Select name="role" onChange={handleSelect} aria-label="Select Role">
                <option disabled>Select Role</option>
                <option name="role" value="guest">Guest</option>
                <option name="role" value="staff">Staff</option>
            </Form.Select>
            <Row style={{ padding: "0px", margin: "0px" }}>
            <Col style={{ padding: "0px" }}>
                {formErrors.role && formErrors.role.length > 0 && (
                <span className="float-left error_message">
                {formErrors.role}
                </span>
            )}
            </Col>
            </Row>
            </Form.Group>
            <Row style={{ padding: "10px 0px 10px 0px", margin: "10px" }}>
                <Col style={{ padding: "0px", textAlign: "center" }}>
                    <Button disabled={formSubmitDisabled} className="btn-block" size="md" form="loginFormData" type="submit" variant="success">Login 
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
                    {loginFormStatusMsg}
                </div>
            </Col>
        </Row>
        </Col>
        </Row>
    );
    }

export default LoginForm;