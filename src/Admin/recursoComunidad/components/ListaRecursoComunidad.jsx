import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { apiRecursoComunidadView } from "../api/apiRecursoComunidad";

export const ListaRecursoComunidad = () => {
  const [ListaRecursoComunidades, setListaRecursoComunidades] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recurso, setRecurso] = useState([]);

  const viewRecurso = async () => {
    const recursoList = await apiRecursoComunidadView();
    console.log("RECURSOLIST", recursoList);
    setListaRecursoComunidades(recursoList);
    console.log("NUEVO", recursoList);
  };

  useEffect(() => {
    viewRecurso();
  }, []);

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
            marginLeft: "-15px",
          }}
        >
          <h1 className="display-4 font-weight-bold mb-4" id="">
            Recurso de Comunidad
          </h1>
        </div>

        <div className="container">
          <Table striped hover size="Extra small" responsive>
            <thead
              style={{ backgroundColor: "#AEAEAE" }}
              className="text-center"
            >
              <tr>
                <th>Comunidad Solicitante:</th>
                <th>Recurso:</th>
              </tr>
            </thead>

            {ListaRecursoComunidades.map((t) => {
              return (
                <tbody key={t.id} className="text-center">
                  <tr>
                    <td>{t.comunidad.nombre}</td>

                    <td>{t.recurso}</td>
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
