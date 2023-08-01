import React from "react";
import { Modal } from "react-bootstrap";
import { FormInstitucion } from "./FormInstitucion";
import { FormTrabajador } from "./FormTrabajador";
import { apiTrabajador } from "../api/apiInstitucion";
import Swal from "sweetalert2";

export const CreaateTrabajador = ({ isOpen, onClose, listaInsticion }) => {
    console.log(listaInsticion)
    if (!isOpen) {
        return null;
    }


    const agregarTrabajador = async (trabajador) => {
        const resultado = await apiTrabajador(listaInsticion._id, trabajador);
        if (resultado.success) {
            Swal.fire({
                icon: "success",
                title: "Genial!",
                text: resultado.message,
                showConfirmButton: true,
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/institucion";
                } else {
                    window.location.href = "/institucion";
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: resultado.message,
                showConfirmButton: true,
                confirmButtonText: "Ok",
            });
        }

    };

    return (
        <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ID: {listaInsticion._id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormTrabajador onAgregarTrabajador={agregarTrabajador} />
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={onClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
