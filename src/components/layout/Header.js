import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import logo from "../../images/logo.png";
import InfoModal from "./InfoModal";

export default function Header(props) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <header className="w-100 my-0">
      <InfoModal show={showInfo} onHide={() => setShowInfo(false)} />

      {props.small ? (
        <Navbar variant="light" bg="white" className="pt-1 pb-0 px-0">
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt="HISPAMUS"
                src={logo}
                height="25"
                className="d-inline-block"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav className="ml-auto">
            <Button variant="link" onClick={() => setShowInfo(true)}>
              <i className="fas fa-info-circle fa-2x" />
            </Button>
          </Nav>
        </Navbar>
      ) : (
        <div className="row my-3">
          <div className="col-9">
            <Link to="/">
              <img className="img-fluid" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="col-3 d-flex justify-content-end align-items-center">
            <Button variant="link" onClick={() => setShowInfo(true)}>
              <i className="fas fa-info-circle fa-2x info-blink" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
