import React from "react";
import { Modal } from "react-bootstrap";
import { FormTipoInstitucion } from "./FormTipoInstitucion";

export const UpdateTipoInstitucion = ({ isOpen, onClose, listaTipo }) => {
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
                        <FormTipoInstitucion
                            tipoProp={listaTipo}
                            titleButton="Actualizar"
                            option={2}
                        // editando={true}

                        ></FormTipoInstitucion>
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