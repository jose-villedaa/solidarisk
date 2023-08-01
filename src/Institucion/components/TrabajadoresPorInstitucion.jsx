import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { getMiInstitucion } from "../api/apiInstitucion";
import { NavBarInstitucion } from "../NavBarInstitucion";

export const ListaTrabajadores = () => {
  const [ListaUsuario, setListaUsuario] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const viewTrabajadores = async () => {
    const usuarioList = await getMiInstitucion();
    setListaUsuario(usuarioList.trabajadores);
  };

  useEffect(() => {
    viewTrabajadores();
  }, [showModal]);

  return (
    <>
      <NavBarInstitucion/>
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
            Lista Trabajadores
          </h1>
        </div>
        <div className="container">
          {ListaUsuario.length === 0 ? (
            <h1 className="text-center">Sin trabajadores</h1>
          ) : (
            <Table striped bordered hover>
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
                  <th>Telefono:</th>
                  <th>Identificacion:</th>
                </tr>
              </thead>
              {ListaUsuario.map((t) => {
                return (
                  <tbody key={t._id} className="text-center">
                    <tr>
                      <td>
                        <img
                          src={t.img}
                          className="rounded-circle"
                          alt="Avatar"
                          style={{ height: "50px", width: "50px" }}
                        />
                      </td>
                      <td>{t.nombre}</td>
                      <td>{t.apellido}</td>
                      <td>{t.edad}</td>
                      <td>{t.correo}</td>
                      <td>{t.telefono}</td>
                      <td>{t.identificacion}</td>
                    </tr>
                  </tbody>
                );
              })}
            </Table>
          )}
        </div>
        <br />
        <br />
    </>
  );
};
