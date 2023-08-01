import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendDataInstitucion } from "../helpers/FormInstitucionHelper";
import { apiTipoInstitucionView } from "../../tipoInstitucion/api/apiTipoInstitucion";
import { apiTipoRecursoView } from "../../tipoRecurso/api/apiTipoRecurso";
import { Form, InputGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export const FormInstitucion = ({ institucionProp, titleButton, option, editando }) => {
    const [institucion, setInstitucion] = useState(institucionProp || {
        nombre: "",
        correo: "",
        password: "",
        tipo: editando ? { _id: "" } : "",
        telefono: "",
        direccion: "",
        recurso: editando ? { _id: "" } : "",
        imagen: ""
    });
    console.log(institucion);

    const [recurso, setRecurso] = useState([])
    const [tipoInstitucion, setTipoInstitucion] = useState([])
    const [file, setFile] = useState(null)

    const getTipoInstitucion = async () => {
        const viewTipoInstitucion = await apiTipoInstitucionView();
        const viewTipoRecurso = await apiTipoRecursoView();
        setTipoInstitucion(viewTipoInstitucion);
        setRecurso(viewTipoRecurso);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setInstitucion({
            ...institucion,
            tipo: editando ? institucionProp.tipo : { _id: "" },
            recurso: editando ? institucionProp.recurso : { _id: "" },
        });
        getTipoInstitucion()
    }, []);

    const uploadImage = async () => {
        if(file != null){
        const result = await uploadFiles(file);
        console.log(result);
        if(result){
            setInstitucion(prev => ({...prev, imagen: result}));
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
        await sendDataInstitucion(institucion, option);
    };
    return (
        <div style={{ marginLeft: " 10%", marginBottom: "50px" }}>
            
            <form className="container mt-3 mb-3" onSubmit={handleSubmit(crud)}>
                <Row className="mb-3">
                <Form.Group controlId="formBasicEmail" className="col col-sm-12 mb-4">
                        <Form.Label>Imagen:</Form.Label>
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
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Nombre de la institucion:</Form.Label>
                        <input
                        {...register("nombre")}
                        type="text"
                        className="form-control"
                        placeholder="Agrega el nombre de la institucion"
                        value={institucion.nombre}
                        onChange={({ target: { value } }) =>
                            setInstitucion(() => ({ ...institucion, nombre: value }))
                        }
                    />


                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Correo Electronico de la institucion:</Form.Label>
                        <input
                        {...register("correo")}
                        type="email"
                        className="form-control"
                        placeholder="Agrega el correo de la institucion"
                        value={institucion.correo}
                        onChange={({ target: { value } }) =>
                            setInstitucion(() => ({ ...institucion, correo: value }))
                        }
                    />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                        <Form.Label>Contraseña:</Form.Label>
                        <InputGroup>

                        <input
                        {...register("password")}
                        type="password"
                        placeholder="Agregue la contraseña de la institucion"
                        className="form-control"
                        onChange={({ target: { value } }) =>
                            setInstitucion(() => ({ ...institucion, password: value }))
                        }
                        required
                    />

                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Tipo de Institucion</Form.Label>
                        <InputGroup>
                        <Form.Select
                        {...register("tipo")}
                        className="form-select"
                        onChange={({ target: { value } }) =>
                            setInstitucion((prevInstitucion) => ({
                                ...prevInstitucion,
                                tipo: value,
                            }))
                        }
                    >
                        <option value="">Seleccione un tipo de Institucion</option>
                        {tipoInstitucion.map((tipo) => (
                            <option
                                key={tipo._id}
                                value={tipo._id}
                                selected={institucion.tipo === tipo._id}
                            >
                                {tipo._id} -  {tipo.nombre}
                            </option>
                        ))}
                    </Form.Select>

                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group className=" col col-sm-6">
                        <Form.Label>Numero telefonico</Form.Label>
                        <input
                        {...register("telefono")}
                        type="number"
                        className="form-control"
                        placeholder="Agregue el numero de telefono de la institucion"
                        value={institucion.telefono}
                        onChange={({ target: { value } }) =>
                            setInstitucion(() => ({ ...institucion, telefono: value }))
                        }
                    />
                    </Form.Group>
                    <Form.Group className="col col-sm-6" controlId="formGridAddress2">
                        <Form.Label>Direccion:</Form.Label>
                        <input
                        {...register("direccion")}
                        type="text"
                        placeholder="Agregue la direccion fisica de la institucion"
                        className="form-control"
                        value={institucion.direccion}
                        onChange={({ target: { value } }) =>
                            setInstitucion(() => ({ ...institucion, direccion: value }))
                        }
                    />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group controlId="formGridCity" className="col col-sm-6">
                        <Form.Label>Recurso:</Form.Label>
                        <Form.Select
                        {...register("recurso")}
                        className="form-select"
                        placeholder="Agregue el recurso que ofrece la institucion"
                        onChange={({ target: { value } }) =>
                            setInstitucion((prevInstitucion) => ({
                                ...prevInstitucion,
                                recurso: value,
                            }))
                        }
                    >
                        <option value="">Seleccione el tipo de recurso que ofrece la institucion</option>
                        {recurso.map((r) => (
                            <option
                                key={r._id}
                                value={r._id}
                                selected={institucion.recurso === r._id}
                            >
                                {r._id} - {r.tipo}
                            </option>
                        ))}
                    </Form.Select>
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
