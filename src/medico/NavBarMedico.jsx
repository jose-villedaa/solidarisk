import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";
import soliLogo from "../assets/img/solidarisk-largo.png";

export const NavbarMedico = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-cliente">
        <Container>
          <Navbar.Brand href="/vistaMedico" className="mx-4">
            <img
              src={soliLogo}
              width="210"
              height="80"
              className="d-inline-block align-top imges"
              alt="Logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button
                href="/miPerfilMedico"
                style = {{height: "50px"}}
                className="btnNavbar ov-btn-grow-ellipse mx-3"
              >
                <i className="fa fa-user"></i>
              </Button>
              <Nav.Link
                href="/"
                style = {{height: "50px"}}
                className="btn text-light bg-green ms-2 "
              >
                <i className="bi bi-box-arrow-in-right mx-1"></i> Cerrar Sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr className="linea-separadora" />
    </>
  );
};
