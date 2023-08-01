import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import soliLogo from '../../assets/img/solidarisk-largo.png';
import '../../assets/css/principal.css';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar expand="lg" className="navbar-cliente ">
            <Container>
                <Navbar.Brand href="/">
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
                    {/* <Nav.Link href="#home" style={{marginTop: "6px"}}>Home</Nav.Link> */}

                        <button  className="registroBoton" onClick={()=> {
                            navigate("/registro")
                        }}>Registrate</button>
                        <button  className="iniciarSesionBoton" href='/login'
                        onClick={()=> {
                            navigate("/login")
                        }}>Iniciar Sesion</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
};
