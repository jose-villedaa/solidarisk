import React from "react";
import { Modal } from "react-bootstrap";
import { FormInstitucion } from "./FormInstitucion";

export const UpdateInstitucion = ({ isOpen, onClose, listaInsticion }) => {
    console.log(listaInsticion)
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen} >
                    <Modal.Header >
                        <Modal.Title className="text-dark">ID: {listaInsticion._id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ marginLeft: "-40px" }}>
                        <FormInstitucion
                            institucionProp={{
                                ...listaInsticion,
                                recurso: listaInsticion.recurso._id, 
                                tipo: listaInsticion.tipo._id 
                            }}
                            titleButton="Actualizar"
                            option={2}
                            editando={true}

                        ></FormInstitucion>
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
