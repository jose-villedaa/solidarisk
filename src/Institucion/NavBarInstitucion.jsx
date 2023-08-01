  import axios from "axios";
  import React, { useState, useEffect } from "react";
  import {
    Navbar,
    Nav,
    Container,
    Button,
    Overlay,
    Popover,
  } from "react-bootstrap";
  import soliLogo from "../assets/img/solidarisk-largo.png";
  import { getMiInstitucion } from "./api/apiInstitucion";
  import { Link } from "react-router-dom";

  export const NavBarInstitucion = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [target, setTarget] = useState(null);
    const [institucion, setInstitucion] = useState([]);
    const [recurso, setRecurso] = useState();
    const handleRemoveNotificacion = (index) => {
      const updatedInstitucion = [...institucion];
      updatedInstitucion.splice(index, 1);
      setInstitucion(updatedInstitucion);
    };

    const viewMiInstitucion = async () => {
      const getMiInstitucion2 = await getMiInstitucion();
      setInstitucion(getMiInstitucion2.peticiones.slice(0, 3));
      setRecurso(getMiInstitucion2);
    };

    useEffect(() => {
      viewMiInstitucion();
    }, []);

    const handlePopoverClick = (event) => {
      setShowPopover(!showPopover);
      setTarget(event.target);
    };

    return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary navbar-cliente">
          <Container>
            <Navbar.Brand href="/menuInstitucion" className="mx-4">
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
                  className="btnNavbar ov-btn-grow-ellipse mx-2"
                  onClick={handlePopoverClick}
                >
                  <i className="fa fa-bell"></i>
                </Button>
                <Button
                  href="/miInstitucion"
                  style={{ height: "50px" }}
                  className="btnNavbar ov-btn-grow-ellipse mx-3"
                >
                  <i className="fa fa-user"></i>
                </Button>
                <Nav.Link href="/" className="btn text-light bg-green ms-2 ">
                  <i className="bi bi-box-arrow-in-right mx-1"></i> Cerrar Sesión
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <hr className="linea-separadora" />
        <Overlay
          show={showPopover}
          placement="bottom"
          target={target}
          onHide={() => setShowPopover(false)}
        >
          <Popover className="popover-message">
            <Popover.Body
              style={{
                textAlign: "center",
                opacity: "100%",
                backgroundColor: "#d14639",
                color: "#FFFFFF",
                width: "106.5%",
                marginLeft: "-11px",
                marginTop: "-10px",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <Link to="/notificaciones" className="nav-link" aria-current="page">
                <h1 style={{ fontSize: "20px", marginTop: "2%" }}>Notificaciones</h1>
              </Link>
            </Popover.Body>
            <Popover.Body>
              {institucion.map((notificacion, index) => (
                <div key={notificacion._id} className="notificacion">
                  <img
                    src={notificacion.comunidad?.img || notificacion.persona?.img}
                    className="rounded-circle"
                    style={{ height: "65px", width: "65px" }}
                    alt="Imagen de la comunidad"
                  />
                  <div className="notificacion-texto" style={{ color: "red" }}>
                    <p>
                      <strong>Comunidad o Persona:</strong>{" "}
                      {notificacion.comunidad?.nombre || notificacion.persona?.nombre}
                    </p>
                    <p>
                      <strong>Motivo:</strong> {notificacion.motivoPeticion}{" "}
                    </p>
                    <p>
                      <strong>Recurso faltante: </strong>
                      {recurso.recurso.tipo}
                    </p>
                    <p>
                      <strong>Fecha:</strong> {notificacion.fecha.substring(0, 10)} :{notificacion.hora}
                    </p>
                    <button
                      className="btn-danger botonEliminar"
                      onClick={() => handleRemoveNotificacion(index)}
                    >
                      <i
                        className="fa fa-trash"
                        style={{ verticalAlign: "middle" }}
                      ></i>
                    </button>
                  </div>
                </div>
              ))}
            </Popover.Body>
          </Popover>
        </Overlay>
      </>
    );
  };
