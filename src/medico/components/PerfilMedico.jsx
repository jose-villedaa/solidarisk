import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiMedicoById } from "../api/apiMedico";
var tokenId = localStorage.getItem("token");

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { NavbarMedico } from "../NavBarMedico";

export const PerfilMedico = () => {
  const [usuario, setUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  console.log(usuario);

  const viewMedico = async () => {
    const getMedico = await apiMedicoById(tokenId);
    setUsuario(getMedico);
  };

  useEffect(() => {
    viewMedico();
  }, [showModal]);

  return (
    <>
      <NavbarMedico></NavbarMedico>
      <div id="perfil">
        <div className="headerMedico"></div>

        <div className="avatar">
          <img
            className="avatar"
            src={usuario.img}
            alt="avatar"
            style={{ marginTop: "-8px", marginLeft: "-3px" }}
          />
        </div>

       
        <div className="tituloperfil">
          <h1>{usuario.nombre} {usuario.apellido}</h1>
          <div className="bigbriefing">
            <p style={{ fontSize: "15px", color: "black" }}>
              <b>Edad:</b> {usuario.edad} <b>|</b>
              <b> Identificacion:</b> {usuario.identificacion}
            </p>
          </div>
        </div>
        <br />

        <h1 className="title-2" style={{ marginBottom: "55px" }}>
          Identificacion Medica: {usuario.identificacionMedico}
        </h1>

        <div className="infocandidato">
          <form className="mui-form">
            <h1 className="title-2">Correo Electronico: {usuario.correo}</h1>
            <div className="mui-textfield mui-textfield--float-label"></div>
            <br />
            <br />
            <br />
            <h1 className="title-2">Numero Telefonico: {usuario.telefono}</h1>
            <div className="mui-textfield mui-textfield--float-label"></div>
            <div className="mui-textfield mui-textfield--float-label"></div>

            <br />

            <h1 className="title-2">Contacto: {usuario.contacto}</h1>
          </form>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
