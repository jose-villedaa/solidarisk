import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiComunidad, apiDeleteComunidad } from "../api/apiComunidad";
import { UpdateComunidad } from "./UpdateComunidad";

export const ListaComunidad = () => {
    const [listaComunidad, setListaComunidad] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [comunidad, setComunidad] = useState([]);
    const [showModalDonaciones, setShowModalDonaciones] = useState(false);
    const [selectedDonaciones, setSelectedDonaciones] = useState(null);

    const [showModalDonacionesInstitucion, setShowModalDonacionesInstitucion] = useState(false);
    const [selectedDonacionesInstitucion, setSelectedDonacionesinstitucion] = useState(null);

    const [showModalCitas, setShowModalCitas] = useState(false);
    const [selectedCitas, setSelectedCitas] = useState(null);

    const navigate = useNavigate();

    const handleCloseModalDonaciones = () => {
        setShowModalDonaciones(false);
    };

    const handleOpenModalDonaciones = (donaciones) => {
        setSelectedDonaciones(donaciones);
        setShowModalDonaciones(true);
    };


    const handleCloseModalDonacionesInstitucion = () => {
        setShowModalDonacionesInstitucion(false);
    };

    const handleOpenModalDonacionesInstitucion = (donacionesInstitucion) => {
        setSelectedDonacionesinstitucion(donacionesInstitucion);
        setShowModalDonacionesInstitucion(true);
    };


    const handleCloseModalCitas = () => {
        setShowModalCitas(false);
    };

    const handleOpenModalCitas = (citas) => {
        setSelectedCitas(citas);
        setShowModalCitas(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (u) => {
        setShowModal(true);
        setComunidad(u);
    };

    const comunidadView = async () => {
        const comunidadList = await apiComunidad();
        setListaComunidad(comunidadList);
    };

    useEffect(() => {
        comunidadView();
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
            let result = await apiDeleteComunidad(id);
            if (result) {
                setListaComunidad(listaComunidad.filter((c) => c._id !== id));
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
            <div >
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
                        Comunidad
                    </h1>
                </div>
                <div
                    className="d-grid gap-2 col-6 mx-auto"
                    style={{ marginBottom: "10px" }}
                >
                    <Link to="/agregarComunidad" className="nav-link text-center" aria-current="page">
                        <button
                            className="btnAdd btn-success"
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                navigate("/agregarComunidad");
                            }}
                        >
                            <i className="fa fa-save mx-2"></i> Agregar Institucion
                        </button>

                    </Link>
                </div>
                <div className="container">
                    <Table striped hover size="Extra small" responsive>
                        <thead
                            style={{ backgroundColor: "#AEAEAE" }}
                            className="text-center"
                        >
                            <tr>
                                <th>Imagen:</th>
                                <th>Nombre de la Comunidad:</th>
                                <th>Direccion de la Comunidad:</th>
                                <th>Correo de la Comunidad:</th>
                                <th>Contacto de la Comunidad:</th>
                                <th>Donaciones de los usuarios:</th>
                                <th>Donaciones de las instituciones:</th>
                                <th>Citas:</th>
                                <th>Opciones:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaComunidad.map((c) => (
                                <tr key={c._id} className="text-center">
                                    <td><img src={c.img} style={{width: "90px", height:"50px"}} /></td>
                                    <td>{c.nombre}</td>
                                    <td>{c.direccion}</td>
                                    <td>{c.correo}</td>
                                    <td>{c.contacto}</td>

                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleOpenModalDonaciones(c.donaciones.usuarios)}
                                        >
                                            Donaciones de los usuarios
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleOpenModalDonacionesInstitucion(c.donaciones.instituciones)}
                                        >
                                            Donaciones de las instituciones
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleOpenModalCitas(c.citas)}
                                        >
                                            Ver Citas para la comunidad
                                        </Button>
                                    </td>

                                    <td>
                                        <div className="d-grid gap-2">
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                onClick={() => handleOpenModal(c)}
                                                style={{
                                                    backgroundColor: "#F7DC6F",
                                                    border: "none",
                                                }}
                                            >
                                                <i className="fa fa-user mx-2"></i>Editar
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => {
                                                    eliminar(c._id);
                                                }}
                                                style={{
                                                    backgroundColor: "#CD5C5C",
                                                    border: "none",
                                                }}
                                            >
                                                <i className="fa fa-trash mx-2"></i>Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Modal
                        show={showModalDonaciones}
                        onHide={handleCloseModalDonaciones}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Detalles de las Donaciones de los usuarios
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedDonaciones && (
                                <div>
                                    {selectedDonaciones.map((donacion) => (
                                        <div key={donacion.donacion._id}>
                                            <p>Nombre de la donacion: {donacion.donacion.nombreDonacion}</p>
                                            <p>Tipo de Donación: {donacion.tipoDonacion}</p>
                                            <p>Usuario: {donacion.usuarioDonador?.nombre} {donacion.usuarioDonador?.apellido}</p>
                                            <p>Cantidad/Recurso donado: {donacion.donacion.montoDonativo}
                                                {donacion.donacion.cantidadDonativo} - {donacion.donacion.recursosDonados}</p>
                                            <hr />
                                        </div>
                                    ))}

                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModalDonaciones}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>



                    <Modal
                        show={showModalDonacionesInstitucion}
                        onHide={handleCloseModalDonacionesInstitucion}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Detalles de las Donaciones de la Institucion
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedDonacionesInstitucion && (
                                <div>
                                    {selectedDonacionesInstitucion.map((donacion) => (
                                        <div key={donacion.donacion?._id}>
                                            <p>Nombre de la donacion: {donacion.donacion?.nombreDonacion}</p>
                                            <p>Institucion donadora: {donacion.institucionDonadora?.nombre}</p>
                                            <p>Tipo de Donación: {donacion.tipoDonacion}</p>
                                            <p>
                                                Cantidad/Recurso donado: {donacion.donacion?.montoDonativo}
                                                {donacion.donacion?.cantidadDonativo} - {donacion.donacion?.recursosDonados}
                                            </p>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModalDonacionesInstitucion}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={showModalCitas} onHide={handleCloseModalCitas}>
                        <Modal.Header closeButton>
                            <Modal.Title>Detalles de las Citas</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedCitas && (
                                <div>
                                    {selectedCitas.map((citas) => (
                                        <div key={citas._id}>
                                            <h5>{citas._id}</h5>
                                            <p>Medico: {citas.medico}</p>
                                            <p>Tipo de cita: {citas.tipoCita}</p>
                                            <p>
                                                Horario: De {citas.horarioInicio} a {citas.horarioFinal}
                                            </p>
                                            <p>
                                                Fecha de la cita: {citas.fechaCita.substring(0, 10)}
                                            </p>
                                            <hr />
                                        </div>
                                    ))}

                                </div>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModalCitas}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <UpdateComunidad

                        isOpen={showModal}
                        onClose={() => handleCloseModal()}
                        listaComunidad={comunidad}
                    ></UpdateComunidad>
                </div>
                <br />
                <br />
            </div>
        </>
    );
};
