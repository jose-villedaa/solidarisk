import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { Button, NavLink } from 'react-bootstrap';
import soliLogo from '../../assets/img/solidarisk-largo.png';
import mp3Audio from '../../assets/audio/POLICE.mp3';

import '../../assets/css/principal.css';
import { CreateSeguridad } from '../componentsSeguridad/CreateSeguridad';
import { apiUrgenteSeguridad } from '../api/apiSeguridadCliente';
import Swal from 'sweetalert2';

export const NavBarUser = () => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [seguridad, setSeguridad] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitud: '',
    longitud: '',
});
  const localizacionActual = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude,
                });
            },
            (error) => {
                console.error(error);
            }
        );
    } else {
        console.error('No se puede localizar tu ubicacion. Prueba en otro navegador');
    }
};

useEffect(() => {
    localizacionActual();
}, []);



  const handleShowModal = (u) => {
    setShowModal(true);
    setSeguridad(u);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.clear();
    window.location.href = '/';
  };

  const urgenteSeguridad = async () => {
    try {
      const peticion = await apiUrgenteSeguridad(currentLocation);
      if (peticion) {
        const audio = new Audio(mp3Audio);
        audio.play();
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo hacer la petición de urgencia de seguridad",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      console.error("Error en la petición de urgencia de seguridad:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al realizar la petición",
        confirmButtonText: "Ok",
      });
    }
  };


  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-cliente">
        <Container>
          <Navbar.Brand href="/usuario">
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
            <Button variant="dark" className="denunciaBoton mr-2" style={{height: "60px"}} onClick={()=> urgenteSeguridad()}>
                URGENTE 🚨
              </Button>
              <Button variant="dark" className="denunciaBoton mr-2" style={{height: "60px",}} onClick={handleShowModal}>
                DENUNCIAR AQUÍ 🚨
              </Button>
              <Button
                href="/miPerfil"
                style = {{height: "50px"}}
                className="btnNavbar ov-btn-grow-ellipse mx-3"
              >
                <i className="fa fa-user"></i>
              </Button>

              <Nav.Link
          href="/"
          className="nav-link text-light bg-green btn ms-2 mb-1 " onClick={()=> cerrarSesion()}
        >
          <i className="bi bi-box-arrow-in-right mx-1"></i> Cerrar Sesión
        </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <hr className="linea-separadora" />
      <Button
        variant="warning"
        className="  denunciaBoton1 "
        href='/donacionesEleccion'
        style={{ backgroundColor: "#D68910", position: 'fixed', bottom: '50px', right: '50px', padding: "20px 50px 20px  50px", borderRadius: "50px", color: 'white', zIndex: "9999"}}
      >💖Donar Aqui
      </Button>
      <CreateSeguridad isOpen={showModal} onClose={() => setShowModal(false)} listaSeguridad={seguridad } />

    </>
  );
};
