import React from "react";
import { Modal } from "react-bootstrap";
import { FormSeguridad } from "./FormSeguridad";

export const CreateSeguridad = ({ isOpen, onClose, listaSeguridad }) => {
    console.log("la lista es",listaSeguridad)
    if (!isOpen) {
        return null;
    }
    return (
        <>
            <>
                <Modal show={isOpen} >
                    <Modal.Header >
                        <Modal.Title className="text-dark">DENUNCIA UN DELITO O PIDE SEGURIDAD</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{marginLeft: "-40px"}}>
                        <FormSeguridad
                            seguridadProp={listaSeguridad}
                            titleButton="Mandar Peticion"
                            option={1}
                        // editando={true}

                        ></FormSeguridad>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-danger" onClick={onClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
};
