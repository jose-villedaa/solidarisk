import React from "react";
import { Modal } from "react-bootstrap";
import { FormComunidad } from "./FormComunidad";

export const UpdateComunidad = ({ isOpen, onClose, listaComunidad }) => {
    console.log(listaComunidad)
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen} >
                    <Modal.Header >
                        <Modal.Title className="text-dark">ID: {listaComunidad._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{marginLeft: "-40px"}}>
                        <FormComunidad
                            comunidadProp={listaComunidad}
                            titleButton="Actualizar"
                            option={2}
                        // editando={true}

                        ></FormComunidad>
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