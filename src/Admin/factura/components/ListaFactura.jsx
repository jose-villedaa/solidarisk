import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiFacturaInstitucionView } from "../api/apiFacturaInstitucion";

export const ListaFactura = () => {
    const [ListaFacturaInstituciones, setListaFacturaInstituciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [Factura, setFactura] = useState([]);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (u) => {
        setShowModal(true);
        setFactura(u)
    };

    const viewFactura = async () => {
        const facturaList = await apiFacturaInstitucionView();
        setListaFacturaInstituciones(facturaList);
    };

    useEffect(() => {
        viewFactura();
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
                        Facturas Institucion
                    </h1>
                </div>

                <div className="container">
                    <Table striped hover  size="Extra small" responsive>
                        <thead
                            style={{ backgroundColor: "#AEAEAE" }}
                            className="text-center"
                        >
                            <tr>
                                <th>Institucion:</th>
                                <th>Fecha:</th>
                                <th>Donaciones:</th>
                            </tr>
                        </thead>
                        {ListaFacturaInstituciones.map((t) => {
                            return (
                                <tbody key={t._id} className="text-center">
                                    <tr>
                                        <td>{t.institucion}</td>
                                        <td>{t.fecha}</td>
                                        <td>{t.donaciones}</td>
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
