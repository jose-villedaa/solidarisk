import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { Navbar, Nav, NavDropdown, Container, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import soliLogo from "../assets/img/solidarisk-largo.png";
const sidebarNavItems = [
  {
    display: 'Usuarios',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaUsuarios',
    section: 'listaUsuarios'
  },
  {
    display: 'Citas',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaCitas',
    section: 'listaCitas'
  },
  {
    display: 'Donaciones Institucion',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaDonacionesInstitucion',
    section: 'listaDonacionesInstitucion'
  },
  {
    display: 'Donaciones Usuario',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaDonacionesUsuario',
    section: 'listaDonacionesUsuario'
  },
  {
    display: 'Recurso Comunidad',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaRecursoComunidad',
    section: 'listaRecursoComunidad'
  },
  {
    display: 'Tipo Cita',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaTipoCita',
    section: 'listaTipoCita'
  },
  {
    display: 'Tipo Donativo',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaTipoDonativo',
    section: 'listaTipoDonativo'
  },
  {
    display: 'Tipo Institucion',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaTipoInstitucion',
    section: 'listaTipoInstitucion'
  },
  {
    display: 'Tipo Pago',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaTipoPago',
    section: 'listaTipoPago'
  },
  {
    display: 'Tipo Recurso',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaTipoRecurso',
    section: 'listaTipoRecurso'
  },
  {
    display: 'Tipo Trabajador',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaTipoTrabajador',
    section: 'listaTipoTrabajador'
  },
  {
    display: 'Institucion',
    icon: <i className='bx bxs-user'></i>,
    to: '/institucion',
    section: 'institucion'
  },

  {
    display: 'Seguridad',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaSeguridad',
    section: 'Comunidad'
  },
  {
    display: 'Comunidad',
    icon: <i className='bx bxs-user'></i>,
    to: '/listaComunidad',
    section: 'listaComunidad'
  },
];

export const NavBarAdmin = () => {

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-cliente">
        <Container>
          <Navbar.Brand href="/listaUsuarios" className="mx-4">
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
              <div style={{ position: 'relative' }}>

                <DropdownButton title="Menu" style={{ paddingBottom: "6px", height: "60px", zIndex: "2"}} className='menuDeveloper'>
                  {sidebarNavItems.map((item, index) => (
                    <Dropdown.Item as={Link} key={index} to={item.to} id="navbar-administrador-drop">
                      {item.display}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <Nav.Link
                href="/"
                className="btn text-light bg-green ms-2 mb-2 " onClick={() => cerrarSesion()}
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
}  