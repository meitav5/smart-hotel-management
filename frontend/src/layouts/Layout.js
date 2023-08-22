import React from "react";
import {withRouter} from 'react-router-dom';
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import { Row, Col } from "react-bootstrap";

function Layout(props) {

    return (
        <Row style={{ padding: '0px', margin: '0px', opacity: props.loading?'0.6': '1' }}>
            <Col style={{ padding: '0px', margin: '0px' }} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Header/>
                {props.children}
                {props.footer?<Footer/>:''}
            </Col>
        </Row>
    )
}

export default withRouter(Layout)