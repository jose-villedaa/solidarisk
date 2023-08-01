import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table';
import { Link, useNavigate } from "react-router-dom";
import { UpdateUsuarios } from "./UpdateUsuario";
import { apiDeleteUsuario, apiUsuarioView } from "../api/apiUsuario";

export const ListaUsuario = () => {
  const [ListaUsuario, setListaUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState([]);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (u) => {
    setShowModal(true);
    setUsuario(u);
  };

  const viewUser = async () => {
    const usuarioList = await apiUsuarioView();
    setListaUsuario(usuarioList);
  };

  useEffect(() => {
    viewUser();
  }, [showModal]);

  const eliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el usuario permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirmacion.isConfirmed) {
      let result = await apiDeleteUsuario(id);
      if (result) {
        setListaUsuario(ListaUsuario.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Se eliminó el Usuario correctamente!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo eliminar el usuario.",
        });
      }
    }
  };

  return (
    <>
        <div
          style={{
            textAlign: "center",
            opacity: "100%",
            marginBottom: "20px",
            paddingTop: "20px",
            backgroundColor: "#d14639",
            color: "#FFFFFF",
            paddingBottom: "1px",
            width: "100%",
          }}
        >
          <h1 className="display-4 font-weight-bold mb-4" id="">
            Usuario
          </h1>
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto"
          style={{ marginBottom: "10px" }}
        >
          <Link to="/agregarUsuario" className="nav-link text-center" aria-current="page">
            <button
              className="btnAdd btn-success"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                navigate("/agregarUsuario");
              }}
            >
              <i className="fa fa-save mx-2"></i> Agregar Usuario
            </button>
          </Link>
        </div>
        <div className="container">
      
          <Table  striped hover size="Extra small" responsive>
            <thead
              style={{ backgroundColor: "#AEAEAE" }}
              className="text-center"
            >
              <tr>
              <th>Imagen:</th>
                <th>Nombre:</th>
                <th>Apellido:</th>
                <th>Edad</th>
                <th>Correo:</th>
                <th>Identificacion:</th>
                <th>Telefono:</th>
                <th>Contacto:</th>
                <th>IdentificacionMedico:</th>
                <th>TipoTrabajo:</th>
                <th>- ROL -</th>
                <th>Opciones:</th>
              </tr>
            </thead>
            {ListaUsuario.map((t) => {
              return (
                <tbody key={t._id} className="text-center">
                  <tr>
                  <td><img className="rounded-circle" src={t.img} style={{width:"40px", height:"35px",
                marginTop:"10px"}} alt="..."></img></td>
                    <td>{t.nombre}</td>
                    <td>{t.apellido}</td>
                    <td>{t.edad}</td>
                    <td>{t.correo}</td>
                    <td>{t.identificacion}</td>
                    <td>{t.telefono}</td>
                    <td>{t.contacto}</td>
                    <td>{t.identificacionMedico}</td>
                    <td>{t.tipoTrabajo }</td>
                    <td>{t.rol}</td>

                    <td>
                      <div className="d-grid gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleOpenModal(t)}
                          style={{ backgroundColor: "#F7DC6F", border: "none" }}
                        >
                          <i className="fa fa-user mx-2"></i>Editar
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            eliminar(t._id);
                          }}
                          style={{ backgroundColor: "#CD5C5C", border: "none" }}
                        >
                          <i className="fa fa-trash mx-2"></i>Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          <UpdateUsuarios
            listaUsuarios={usuario}
            isOpen={showModal}
            onClose={() => handleCloseModal()}
          ></UpdateUsuarios>
        </div>
        <br />
        <br />
    </>
  );
};
