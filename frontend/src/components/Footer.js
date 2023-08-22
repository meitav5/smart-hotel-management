import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useHistory } from "react-router-dom";

function Footer(props) {

  const history = useHistory();

  const redirectPage = (page) => {
    history.push(page);
  }

  return (
    <div className="fixed-bottom">
      <Navbar bg="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link onClick={() => redirectPage('/')} style={{ fontSize: "0.8rem" }}>
              <span>©</span>
              <span style={{ margin: '0px 5px 8px 8px' }}>2023 Copyright</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Footer;
