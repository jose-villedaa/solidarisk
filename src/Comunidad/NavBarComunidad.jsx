import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form 
} from "react-bootstrap";
import soliLogo from "../assets/img/solidarisk-largo.png";
import { getMiComunidad } from "./api/apiComunidad";
import Swal from "sweetalert2";

export const NavbarComunidad = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [comunidad, setComunidad] = useState([]);
  const [correctPassword, setCorrectPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const viewMiComunidad = async () => {
    const getComunidad = await getMiComunidad();
    setComunidad(getComunidad);
  };

  useEffect(() => {
    viewMiComunidad();
  }, []);

  useEffect(() => {
    setCorrectPassword(comunidad.nombre + "123");
      console.log(correctPassword);
  }, [comunidad])
  

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordModalSubmit = () => {
    console.log(password);
    if (password === correctPassword) {
      handlePasswordModalClose();
      if (window.location.pathname === "/miComunidad") {
        window.location.reload();
      } else {
        window.location.href = "/miComunidad";
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "NO TIENES PERMISO PARA ACCEDER A ESTA FUNCION"
      })
    }
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-cliente">
        <Container>
          <Navbar.Brand href="/menuComunidad" className="mx-4">
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
                onClick={()=>{ setShowPasswordModal(true)} }
                style = {{height: "50px"}}
                className="btnNavbar ov-btn-grow-ellipse mx-3"
              >
                <i className="fa fa-user"></i>
              </Button>
              <Nav.Link
                href="/"
                className="btn text-light bg-green ms-2 "
              >
                <i className="bi bi-box-arrow-in-right mx-1"></i> Cerrar Sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr className="linea-separadora" />
      <Modal show={showPasswordModal} onHide={handlePasswordModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingresa tu contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
                <div className="col-11">
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            wrapperClass="mb-4 mx-5 w-100"
                className="form__field"
                id="inpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className="col-1">
          <button
              type="button"
              className="btnInfor2"
              size="lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
            </button>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePasswordModalClose}>
            <i className="fa fa-close mx-2"></i>Cerrar
          </Button>
          <Button variant="primary" onClick={handlePasswordModalSubmit}>
            <i className="fa fa-save mx-2"></i>Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
