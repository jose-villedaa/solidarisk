import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { apiDeleteinstitucion, apiInstitucion } from "../api/apiInstitucion";
import { UpdateInstitucion } from "./UpdateInstitucion";
import { CreaateTrabajador } from "./CreateTrabajador";

export const ListaInstitucion = () => {
    const [listInstitucion, setListaInstitucion] = useState([]);
    const [showModalTrabajadores, setShowModalTrabajadores] = useState(false);
    const [showModalPeticiones, setShowModalPeticiones] = useState(false);
    const [selectedTrabajadores, setSelectedTrabajadores] = useState(null);
    const [selectedPeticion, setSelectedPeticion] = useState(null);
    const [showModalDonaciones, setShowModalDonaciones] = useState(false);
    const [selectedDonaciones, setSelectedDonaciones] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [institucion, setInstitucion] = useState([]);
    const [trabajador, setTrabajador] = useState([]);
    const [showModalTrabajador, setShowModalTrabajador] = useState(false);


    const navigate = useNavigate();

    const handleCloseModalDonaciones = () => {
        setShowModalDonaciones(false);
    };

    const handleOpenModalDonaciones = (donaciones) => {
        setSelectedDonaciones(donaciones);
        setShowModalDonaciones(true);
    };

    const handleCloseModalTrabajadores = () => {
        setShowModalTrabajadores(false);
    };

    const handleOpenModalTrabajadores = (trabajadores) => {
        setSelectedTrabajadores(trabajadores);
        setShowModalTrabajadores(true);
    };

    const handleCloseModalPeticiones = () => {
        setShowModalPeticiones(false);
    };

    const handleOpenModalPeticiones = (peticiones) => {
        setSelectedPeticion(peticiones);
        setShowModalPeticiones(true);
    };


    const viewInstitucion = async () => {
        const institucionList = await apiInstitucion();
        setListaInstitucion(institucionList);
    };


    const   handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenModal = (u) => {
        setShowModal(true);
        setInstitucion(u);
    };

    
    const handleOpenModalTrabajador = (u) => {
        setShowModalTrabajador(true);
        setTrabajador(u);
    };

    const   handleCloseModalTrabajador = () => {
        setShowModalTrabajador(false);
    };

    useEffect(() => {
        viewInstitucion();
    }, [showModal]);

    const eliminar = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará la institucion permanentemente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "No",
        });

        if (confirmacion.isConfirmed) {
            let result = await apiDeleteinstitucion(id);
            if (result) {
                setListaInstitucion(listInstitucion.filter((c) => c._id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Genial!",
                    text: "Se eliminó la institucion correctamente!",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No se pudo eliminar la institucion.",
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
                        Institucion
                    </h1>
                </div>
                <div
                    className="d-grid gap-2 col-6 mx-auto"
                    style={{ marginBottom: "10px" }}
                >
                    <Link to="/agregarInstitucion" className="nav-link text-center" aria-current="page">
                        <button
                            className="btnAdd btn-success"
                            type="button"
                            onClick={(event) => {
                                event.preventDefault();
                                navigate("/agregarInstitucion");
                            }}
                        >
                            <i className="fa fa-save mx-2"></i> Agregar Institucion
                        </button>

                    </Link>
                </div>
                <div className="container">
                    <Table striped  hover size="Extra small" responsive>
                        <thead
                            style={{ backgroundColor: "#AEAEAE" }}
                            className="text-center"
                        >
                            <tr>
                                <th>Imagen:</th>
                                <th>Nombre de la Institucion:</th>
                                <th>Administrador de la Institucion:</th>
                                <th>Direccion:</th>
                                <th>Telefono:</th>
                                <th>Correo de la Institucion:</th>
                                <th>Recurso de la Institucion:</th>
                                <th>Trabajadores en la Institucion:</th>
                                <th>Peticiones realizadas a la institucion:</th>
                                <th>Donaciones realizadas a la institucion:</th>
                                <th>Opciones:</th>
                            </tr>
                        </thead>
                        {listInstitucion.map((t) => {
                            return (
                                <tbody key={t._id} className="text-center">
                                    <tr>
                                        <td><img src={t.img} alt="" style={{width:"80px", height:"50px"}} /></td>
                                        <td>{t.nombre}</td>
                                        <td>{t.administrador.nombre}</td>
                                        <td>{t.direccion}</td>
                                        <td>{t.telefono}</td>
                                        <td>{t.correo}</td>
                                        <td>{t.recurso.tipo}</td>
                                        <td>
                                            <Button variant="primary" size="sm" onClick={() => handleOpenModalTrabajadores(t.trabajadores)}>
                                                Ver Trabajadores
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="primary" size="sm" onClick={() => handleOpenModalPeticiones(t.peticiones)}>
                                                Ver Detalles
                                            </Button>
                                        </td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                size="sm"
                                                onClick={() => handleOpenModalDonaciones(t.donaciones)}
                                            >
                                                Ver Donaciones
                                            </Button>
                                        </td>


                                        <Modal show={showModalDonaciones} onHide={handleCloseModalDonaciones}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Detalles de las Donaciones</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {selectedDonaciones && (
                                                    <div>
                                                        {selectedDonaciones.map((donacion) => (
                                                            <div key={donacion._id}>
                                                                <h5>{donacion.nombreDonacion}</h5>
                                                                <p>Tipo de Donación: {donacion.tipoDonativo}</p>
                                                                <p>Tipo de pago: {donacion.tipoPago}</p>
                                                                <p>Cantidad: {donacion.montoDonativo}</p>
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


                                        <Modal show={showModalTrabajadores} onHide={handleCloseModalTrabajadores}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Detalles de los Trabajadores</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {selectedTrabajadores && (
                                                    <div className="text-center">
                                                        {selectedTrabajadores.map((trabajador) => (
                                                            <div key={trabajador._id}>
                                                                <img src={trabajador.img} className="rounded-circle" style={{width: "80px"}}></img>
                                                                <p>Nombre: {trabajador.nombre}  {trabajador.apellido}</p>
                                                                <p>Correo: {trabajador.correo}</p>
                                                                <p>telefono: {trabajador.telefono}</p>
                                                                <hr />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModalTrabajadores}>
                                                    Cerrar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        <Modal show={showModalPeticiones} onHide={handleCloseModalPeticiones}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Detalles de las Peticiones</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                {selectedPeticion && (
                                                    <div>
                                                        {selectedPeticion.map((peticion) => (
                                                            <div key={peticion._id}>
                                                                <p>Comunidad: {peticion.comunidad?.nombre}</p>
                                                                <p>Motivo: {peticion.motivoPeticion}</p>
                                                                <p>Fecha de realización: {peticion.fecha.substring(0, 10)} a las: {peticion.hora}</p>
                                                                <hr />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseModalPeticiones}>
                                                    Cerrar
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>

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
                                                    variant="warning"
                                                    size="sm"
                                                    onClick={() => handleOpenModalTrabajador(t)}
                                                    style={{ backgroundColor: "#F7DC6F", border: "none" }}
                                                >
                                                    <i className="fa fa-add mx-2"></i>Agregar Trabajador
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
                    <UpdateInstitucion
                        listaInsticion={institucion}
                        isOpen={showModal}
                        onClose={() => handleCloseModal()}
                    ></UpdateInstitucion>

                    <CreaateTrabajador
                        listaInsticion={trabajador}
                        isOpen={showModalTrabajador}
                        onClose={() => handleCloseModalTrabajador()}
                    ></CreaateTrabajador>
                </div>
                <br />
                <br />
            </div>
        </>
    );
};
