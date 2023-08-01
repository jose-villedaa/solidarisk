import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import soliLogo from '../../assets/img/soli.png'

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput,
    MDBIcon,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import { NavBar } from "../../principal/NavBar/NavBar";

export const RegistroCliente = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [edad, setEdad] = useState("");
    const [identificacion, setIdentificacion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                "https://solidarisk-back-end-original.vercel.app/api/usuarios/agregar/cliente",
                {
                    nombre,
                    apellido,
                    edad,
                    identificacion,
                    telefono,
                    correo,
                    password,
                }
            );

            Swal.fire({
                icon: "success",
                title: "Registro exitoso",
                text: "Te has registrado correctamente",
                confirmButtonText: "Ok",
            }).then((r) => {
                if (r.isConfirmed) {
                    window.location.href = "/login";
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error en el registro",
                text: error.response.data.message,
            });
        }
    };


    return (
        <>
        <NavBar></NavBar>
        <MDBContainer fluid>
            
            <MDBRow>
                <MDBCol sm="6">
                    <div
                        className="d-flex flex-row ps-5 pt-5"
                        style={{
                            height: "250px",
                            alignContent: "center",
                            marginLeft: "200px",
                        }}
                    >
                        <img src={soliLogo} alt="Not Found" />
                    </div>



                    <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                        <h3
                            className="fw-normal mt-5 mb-3 ps-5 pb-3"
                            style={{ letterSpacing: "0px" }}
                        >
                            Registra tu cuenta con nosotros!
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                type="text"
                                wrapperClass="mb-4 mx-5 w-100"
                                placeholder="Ingresa tu nombre"
                                id="nombre"
                                size="lg"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                />
                            <MDBInput
                                type="text"
                                wrapperClass="mb-4 mx-5 w-100"
                                placeholder="Ingresa tu apellido"
                                id="apellido"
                                size="lg"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                                />
                            <MDBInput
                                type="number"
                                wrapperClass="mb-4 mx-5 w-100"
                                placeholder="Ingresa tu edad"
                                id="edad"
                                size="lg"
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                                required
                                />
                            <MDBInput
                                type="number"
                                wrapperClass="mb-4 mx-5 w-100"
                                placeholder="Ingresa tu DPI"
                                id="identificacion"
                                size="lg"
                                value={identificacion}
                                onChange={(e) => setIdentificacion(e.target.value)}
                                required
                                />

                            <MDBInput
                                type="text"
                                wrapperClass="mb-4 mx-5 w-100"
                                placeholder="Ingresa tu telefono"
                                id="telefono"
                                size="lg"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                required
                            />

                            <MDBInput
                                type="email"
                                wrapperClass="mb-4 mx-5 w-100"
                                placeholder="Tu dirección de correo"
                                id="correo"
                                size="lg"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                />

                            <MDBInput
                                type="password"
                                wrapperClass="mb-4 mx-5 w-100"
                                size="lg"
                                id="password"
                                placeholder="Tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />

                            <Button
                                type="submit"
                                className="mb-4 px-5 mx-5 w-100"
                                color="info"
                                size="lg"
                            >
                                Registrarse
                            </Button>


                        </form>
                    </div>
                </MDBCol>

                <MDBCol
                    sm="6"
                    className="d-flex align-items-center justify-content-center"
                    >
                    <img
                        src="https://images.unsplash.com/photo-1508617617809-abceab67a3bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                        style={{}}
                        id="imagen-registro"
                        alt="inn-sight-image"
                        className="w-100"
                    />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
                        </>
    );
};