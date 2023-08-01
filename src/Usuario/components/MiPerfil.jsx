import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { NavBarUser } from "./NavBarUser";
import { apiEditarUser, apiUserById, deleteUserById } from "../api/apiUsuariosCliente";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";

export const MiPerfil = () => {
  const [usuario, setUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedUsuario, setEditedUsuario] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);


  const handleOpenEditModal = () => {
    setEditedUsuario({ ...usuario });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };
  const navigate = useNavigate();
  var tokenId = localStorage.getItem("token");

  console.log(usuario);

  const viewUser = async () => {
    const getUser = await apiUserById(tokenId);
    setUsuario(getUser);
  };

  useEffect(() => {
    viewUser();
  }, [showModal]);

  const handleDelete = async () => {
    try {
        const confirmacion = await Swal.fire({
            icon: "info",
            title: "Seguro de eliminar tu usuario?",
            showConfirmButton: true,
            showDenyButton: true
        })
        if(confirmacion.isConfirmed){
        await deleteUserById(usuario._id);
      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "El usuario se eliminó exitosamente.",
      }).then(() => {
        navigate("/");
      });
    }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = async() => {
    const editProfile = await apiEditarUser(editedUsuario);
    if(editProfile){
        const confirmacion = await Swal.fire({
            icon: "success",
            title: 'SE HA MODIFICADO TU USUARIO'
        })
        if(confirmacion.isConfirmed){
            window.location.reload();
        } else{
            window.location.reload();
        }
    }else{
        Swal.fire({
            icon: "error",
            title: 'ERROR AL MODIFICAR'
        })
    }
    setShowEditModal(false);
  };

  return (
    <>
      <NavBarUser></NavBarUser>
      <div id="perfil">
        <div className="headerUsuario"></div>
        <div className="tituloperfil">
          <h1>
            {usuario.nombre} {usuario.apellido}
          </h1>
          <div className="bigbriefing">
            <p style={{ fontSize: "15px", color: "black" }}>
              <b>Edad:</b> {usuario.edad} <b>|</b>
              <b> Identificacion:</b> {usuario.identificacion}
            </p>
          </div>
        </div>
        <br />

        <div className="infocandidato">
          <MDBCard className="mb-4">
          <MDBCardBody>
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Nombre</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{usuario.nombre}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Apellido</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{usuario.apellido}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Correo Electronico</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{usuario.correo}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Telefono</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">(+502) {usuario.telefono}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="4">
                                    <MDBCardText>Rol</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="8">
                                    <MDBCardText className="text-muted">{usuario.rol}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
          </MDBCard>
         
        </div>
        <br />
        <br />
        {/*  */}
        
      </div>
    </>
  );
};
