import React from "react";
import { Modal } from "react-bootstrap";
import { FormTipoCita } from "./FormTipoCita";

export const UpdateTipoCita = ({ isOpen, onClose, listaTipo }) => {
    console.log(listaTipo)
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen} >
                    <Modal.Header >
                        <Modal.Title className="text-dark">ID: {listaTipo._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{marginLeft: "-40px"}}>
                        <FormTipoCita
                            tipoProp={listaTipo}
                            titleButton="Actualizar"
                            option={2}
                        // editando={true}

                        ></FormTipoCita>
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