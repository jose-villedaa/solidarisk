import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiDonacionInstitucionView } from "../api/apiDonacionInstitucion";

export const ListaDonacionInstitucion = () => {
    const [ListaDonacionesInstitucion, setListaDonacionesInstitucion] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [donacion, setDonacion] = useState([]);

    const navigate = useNavigate();

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (u) => {
        setShowModal(true);
        setDonacion(u)
    };

    const viewDonacion = async () => {
        const donacionList = await apiDonacionInstitucionView();
        setListaDonacionesInstitucion(donacionList);
    };

    useEffect(() => {
        viewDonacion();
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
                        Donaciones Institucion
                    </h1>
                </div>

                <div className="container">
                    <Table striped hover  size="Extra small" responsive>
                        <thead
                            style={{ backgroundColor: "#AEAEAE" }}
                            className="text-center"
                        >
                            <tr>
                                <th>Institucion Apoyada:</th>
                                <th>Nombre Donacion:</th>
                                <th>Tipo de Donativo:</th>
                                <th>Cantidad:</th>
                                <th>Tipo Pago:</th>
                                <th>Monto/Recurso Donado:</th>
                                <th>Comunidad:</th>
                            </tr>
                        </thead>
                        {ListaDonacionesInstitucion.map((t) => {
                            return (
                                <tbody key={t._id} className="text-center">
                                    <tr>
                                        <td>{t.institucion?.nombre}</td>
                                        <td>{t.nombreDonacion}</td>
                                        <td>{t.tipoDonativo}</td>
                                        <td>{t.cantidadDonativo}</td>
                                        <td>{t.tipoPago}</td>
                                        <td>{t.montoDonativo} {t.recursosDonados}</td>
                                        <td>{t.comunidadApoyada}</td>
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
