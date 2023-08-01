import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiCitaView } from "../api/apiCita";

export const ListaCitas = () => {
  const [ListaCita, setListaCita] = useState([]);
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

  const viewCita = async () => {
    const citaList = await apiCitaView();
    setListaCita(citaList);
  };

  useEffect(() => {
    viewCita();
  }, [showModal]);

  

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
            Citas
          </h1>
        </div>
        
        <div className="container">
          <Table striped  hover size="Extra small" responsive>
            <thead
              style={{ backgroundColor: "#AEAEAE" }}
              className="text-center"
            >
              <tr>
                <th>Medico:</th>
                <th>fechaCita:</th>
                <th>Horario Inicio:</th>
                <th>Horario FInal:</th>
                <th>Tipo Cita:</th>
                <th>Comunidad:</th>
                <th>Estado:</th>
              </tr>
            </thead>
            {ListaCita.map((t) => {
              return (
                <tbody key={t._id} className="text-center">
                  <tr>
                    <td>{t.medico?.nombre}</td>
                    <td>{t.fechaCita}</td>
                    <td>{t.horarioInicio}</td>
                    <td>{t.horarioFinal}</td>
                    <td>{t.tipoCita?.nombre}</td>
                    <td>{t.comunidad?.nombre}</td>
                    <td>{t.estado}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};
