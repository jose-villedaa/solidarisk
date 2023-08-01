import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { apiSeguridad } from "../api/apiSeguridad";

export const ListaSeguridad = () => {
    const [listaSeguridad, setListaSeguridad] = useState([]);

    const viewSeguridad = async () => {
        const seguridadList = await apiSeguridad();
        setListaSeguridad(seguridadList);
    };

    useEffect(() => {
        viewSeguridad();
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
                        marginLeft:"-15px"
                    }}
                >
                    <h1 className="display-4 font-weight-bold mb-4" id="">
                        Lista de Peticiones de Seguridad
                    </h1>
                </div>

                <div className="container">
                    <Table striped hover  size="Extra small" responsive>
                        <thead
                            style={{ backgroundColor: "#AEAEAE" }}
                            className="text-center"
                        >
                            <tr>
                                <th>Usuario Solicitante:</th>
                                <th>Mensaje principal:</th>
                                <th>Fecha de solicitud:</th>
                                <th>Descripcion de la solicitud:</th>
                              
                            </tr>
                        </thead>
                        {listaSeguridad.map((t) => {
                            return (
                                <tbody key={t._id} className="text-center">
                                    <tr>
                                        <td>{t.usuario?.nombre} {t.usuario?.apellido}</td>
                                        <td>{t.opciones}</td>
                                        <td>{t.fecha.substring(0,10)}</td>
                                        <td>{t.descripcion}</td>



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
