import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormUsuarioHelper";
import { Form, InputGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export const FormUsuario = ({ usuarioProp, titleButton, option }) => {
    const [isIdentificacionMedicaEnabled, setIdentificacionMedicaEnabled] = useState(false);
    const [file, setFile] = useState(null)
    const [isContactoEnabled, setContactoEnabled] = useState(false);
    const [isTipoTrabajoEnabled, setTipoTrabajoEnabled] = useState(false);
    const [usuario, setUsuario] = useState(usuarioProp || {
        nombre: "",
        apellido: "",
        edad: "",
        correo: "",
        password: "",
        identificacion: "",
        rol: "",
        telefono: "",
        direccion: "",
        ingresosMensuales: "",
        identificacionMedico: "",
        contacto: "",
        tipoTrabajo: "",
        img: ""
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setUsuario({ ...usuario });
    }, []);

    const uploadImage = async () => {
        if(file != null){
        const result = await uploadFiles(file);
        if(result){
          setUsuario(prev => ({...prev, img: result}));
        }
    }else{
        Swal.fire({
            icon: "error",
            title:"Error",
            text: "Se debe ingresar primero una imagen"
        })
    }
      }

    const crud = async () => {
        try {
            if(usuario.img){
                await sendData(usuario, option);
            }else{
                Swal.fire({
                    icon: "error",
                    title:"Error",
                    text: "Se debe ingresar primero una imagen"
                })
            }
        } catch (error) {
            console.log(error);
        }
        
    };
    const handleRolChange = (event) => {
        const selectedRol = event.target.value;
        setUsuario({ ...usuario, rol: selectedRol });
    
        setIdentificacionMedicaEnabled(selectedRol === "ROL_MEDICO");
        setContactoEnabled(selectedRol === "ROL_MEDICO" || selectedRol === "ROL_TRABAJADOR");
        setTipoTrabajoEnabled(selectedRol === "ROL_TRABAJADOR");
      };
    return (
        <div 
        style={{ marginLeft: " 10%", marginBottom: "50px" }}
        >
            <form className="container mt-3 mb-3" onSubmit={handleSubmit(crud)}>
            <div className="form-group">
                    <label className="text-black">Imagen del usuario:</label>
                    <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        {...register("img")}
                        type="file"
                        className="form-control"
                        onChange={(e) => setFile(() => e.target.files[0])}
                        accept=".png, .jpg, .jpeg"
                    />
                    <button className="botonUpload" onClick={uploadImage}>
                        Upload
                    </button>
                </div>
                </div>
                <Row className="mb-3">
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Nombre</Form.Label>
                        <input
                            {...register("nombre")}
                            type="text"
                            className="form-control"
                            value={usuario.nombre}
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, nombre: value }))
                            }
                        />

                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Apellido</Form.Label>
                        <input
                            {...register("apellido")}
                            type="text"
                            className="form-control"
                            value={usuario.apellido}
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, apellido: value }))
                            }
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                        <Form.Label>Edad</Form.Label>
                        <InputGroup>

                            <input
                                {...register("edad")}
                                type="number"
                                className="form-control"
                                value={usuario.edad}
                                onChange={({ target: { value } }) =>
                                    setUsuario(() => ({ ...usuario, edad: value }))
                                }
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Correo Electronico</Form.Label>
                        <InputGroup>
                            <input
                                {...register("correo")}
                                type="email"
                                className="form-control"
                                value={usuario.correo}
                                onChange={({ target: { value } }) =>
                                    setUsuario(() => ({ ...usuario, correo: value }))
                                }
                            />

                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className=" col col-sm-6">
                        <Form.Label>Contraseña</Form.Label>
                        <input
                            {...register("password")}
                            type="password"
                            className="form-control"
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, password: value }))
                            }
                            required
                        />
                    </Form.Group>
                    <Form.Group className="col col-sm-6" controlId="formGridAddress2">
                        <Form.Label>Identificacion</Form.Label>
                        <input
                            {...register("identificacion")}
                            type="text"
                            className="form-control"
                            value={usuario.identificacion}
                            placeholder="Ingrese DPI, pasaporte o Cui"
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, identificacion: value }))
                            }
                            
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formGridCity" className="col col-sm-6">
                        <Form.Label>Rol del usuario</Form.Label>
                        <Form.Select
                            {...register("rol")}
                            className="form-control"
                            value={usuario.rol}
                            onChange={handleRolChange}
                            disabled={option === 2}
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="ROL_CLIENTE">ROL_CLIENTE</option>
                            <option value="ROL_DEVELOPER">ROL_DEVELOPER</option>
                            <option value="ROL_MEDICO">ROL_MEDICO</option>
                            <option value="ROL_SEGURIDAD">ROL_SEGURIDAD</option>
                            <option value="ROL_COLABORADOR">ROL_COLABORADOR</option>
                            <option value="ROL_TRABAJADOR">ROL_TRABAJADOR</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formGridState" className="col col-sm-6">
                        <Form.Label>Numero de Telefono</Form.Label>
                        <input
                            {...register("telefono")}
                            type="text"
                            className="form-control"
                            value={usuario.telefono}
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, telefono: value }))
                            }
                        />
                    </Form.Group>

                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formGridCheckbox" className="col col-sm-4">
                        <Form.Label>Identificacion Medica</Form.Label>
                        <input
                            {...register("identificacionMedico")}
                            type="text"
                            className="form-control"
                            placeholder="Campo solamente si el usuario es medico"
                            value={usuario.identificacionMedico}
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, identificacionMedico: value }))
                            }
                            disabled={!isIdentificacionMedicaEnabled}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGridlabel" className="col col-sm-5">
                        <Form.Label>Contacto</Form.Label>
                        <input
                            {...register("contacto")}
                            type="text"
                            placeholder="Campo solo para Medicos y Trabajadores"
                            className="form-control"
                            value={usuario.contacto}
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, contacto: value }))
                            }
                            disabled={!isContactoEnabled}
                        />
                    </Form.Group>
                    <Form.Group controlId="formGridlabel" className="col col-sm-3">
                        <Form.Label>Tipo de Trabajo</Form.Label>
                        <input
                            {...register("tipoTrabajo")}
                            type="text"
                            className="form-control"
                            placeholder="Campo solo para trabajadores"
                            value={usuario.tipoTrabajo}
                            onChange={({ target: { value } }) =>
                                setUsuario(() => ({ ...usuario, tipoTrabajo: value }))
                            }
                            disabled={!isTipoTrabajoEnabled}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3 justify-content-center m-3 mt-4" >
                    <Form.Group controlId="formGridCheckbox" className="col col-sm-6 ">
                        <button type="submit" className="me-4 btn btn-success btn-lg btn-block">
                            <i className="fa fa-save mx-2"></i>{titleButton}
                        </button>
                    </Form.Group>
                    
                </Row>
            </form>

        </div>
    );
};
