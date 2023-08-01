import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


import { apiDeleteTipoCita, apiTipoCitaView } from "../api/apiTipoCita";
import { UpdateTipoCita } from "./UpdateTipoCita";

export const ListaTipoCita = () => {
  const [ListaTipo, setListaTipo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cita, setCita] = useState([]);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = (u) => {
    setShowModal(true);
    setCita(u);
  };

  const viewTipo = async () => {
    const tipoList = await apiTipoCitaView();
    setListaTipo(tipoList);
  };

  useEffect(() => {
    viewTipo();
  }, [showModal]);

  const eliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el tipo permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    });

    if (confirmacion.isConfirmed) {
      let result = await apiDeleteTipoCita(id);
      if (result) {
        setListaTipo(ListaTipo.filter((c) => c._id !== id));
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "Se eliminó el Tipo correctamente!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se pudo eliminar el tipo.",
        });
      }
    }
  };

  return (
    <>
      <div style={{ marginLeft: "1%" }}>
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
            marginLeft:"-15px"
          }}
        >
          <h1 className="display-4 font-weight-bold mb-4" id="">
            Tipo Cita
          </h1>
        </div>
        <div
          className="d-grid gap-2 col-6 mx-auto"
          style={{ marginBottom: "10px" }}
        >
          <Link to="/agregarTipoCita" className="nav-link text-center" aria-current="page">
            <button
              className="btnAdd btn-success"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                navigate("/agregarTipoCita");
              }}
            >
              <i className="fa fa-save mx-2"></i> Agregar Tipo
            </button>
          </Link>
        </div>
        <div className="container">
          <Table striped hover  size="Extra small" responsive>
            <thead
              style={{ backgroundColor: "#AEAEAE" }}
              className="text-center"
            >
              <tr>
                <th>ID:</th>
                <th>Nombre:</th>
                <th>Opciones:</th>
              </tr>
            </thead>
            {ListaTipo.map((t) => {
              return (
                <tbody key={t._id} className="text-center">
                  <tr>
                    <td>{t._id}</td>
                    <td>{t.nombre}</td>
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
          <UpdateTipoCita

            isOpen={showModal}
            onClose={() => handleCloseModal()}
            listaTipo={cita}
          ></UpdateTipoCita>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
