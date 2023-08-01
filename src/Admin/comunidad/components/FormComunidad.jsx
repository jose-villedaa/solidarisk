import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendDataComunidad } from "../helpers/FormComunidadHelper";
import { Form, InputGroup, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export const FormComunidad = ({ comunidadProp, titleButton, option }) => {
  const [comunidad, setComunidad] = useState(
    comunidadProp || {
      nombre: "",
      direccion: "",
      correo: "",
      password: "",
      latitud: "",
      longitud: "",
      contacto: "",
      img: "",
    }
  );
  const [file, setFile] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setComunidad({ ...comunidad });
  }, []);

  const crud = async () => {
    await sendDataComunidad(comunidad, option);
  };

  const uploadImage = async () => {
    if (file != null) {
      const result = await uploadFiles(file);
      if (result) {
        setComunidad((prev) => ({ ...prev, img: result }));
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Se debe ingresar primero una imagen",
      });
    }
  };


  return (
    <div style={{ marginLeft: " 10%", marginBottom: "50px" }}>
      <form className="container mt-3 mb-3" onSubmit={handleSubmit(crud)}>
        <Row className="mb-3">
          <div className="form-group">
            <label className="text-black">Imagen de la Comunidad:</label>
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
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Nombre de la Comunidad:</Form.Label>
            <input
              {...register("nombre")}
              type="text"
              placeholder="Agregue el nombre de la comunidad"
              className="form-control"
              value={comunidad.nombre}
              onChange={({ target: { value } }) =>
                setComunidad(() => ({ ...comunidad, nombre: value }))
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Direccion de la comunidad:</Form.Label>
            <input
              {...register("direccion")}
              type="text"
              className="form-control"
              placeholder="Agregue la direccion fisica de la comunidad"
              value={comunidad.direccion}
              onChange={({ target: { value } }) =>
                setComunidad(() => ({ ...comunidad, direccion: value }))
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label>Correo electronico de la comunidad:</Form.Label>
            <InputGroup>
              <input
                {...register("correo")}
                type="email"
                placeholder="Agregue el correo de la comunidad"
                className="form-control"
                value={comunidad.correo}
                onChange={({ target: { value } }) =>
                  setComunidad(() => ({ ...comunidad, correo: value }))
                }
              />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Contraseña:</Form.Label>
            <InputGroup>
              <input
                {...register("password")}
                type="password"
                placeholder="Agregue la contraseña de la comunidad"
                className="form-control"
                onChange={({ target: { value } }) =>
                  setComunidad(() => ({ ...comunidad, password: value }))
                }
                required
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Latitud Geografica:</Form.Label>
            <input
              {...register("latitud")}
              type="number"
              className="form-control"
              placeholder="Agregue la latitud fisica de la comunidad"
              value={comunidad.latitud}
              onChange={({ target: { value } }) =>
                setComunidad(() => ({ ...comunidad, latitud: value }))
              }
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>longitud Geografica:</Form.Label>
            <input
              {...register("longitud")}
              type="number"
              className="form-control"
              placeholder="Agregue la latitud fisica de la comunidad"
              value={comunidad.longitud}
              onChange={({ target: { value } }) =>
                setComunidad(() => ({ ...comunidad, longitud: value }))
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formGridCity" className="col col-sm-6">
            <Form.Label>Contacto:</Form.Label>
            <input
              {...register("contacto")}
              type="text"
              className="form-control"
              placeholder="Agregue el contacto de la comunidad"
              value={comunidad.contacto}
              onChange={({ target: { value } }) =>
                setComunidad(() => ({ ...comunidad, contacto: value }))
              }
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 justify-content-center m-3 mt-4">
          <Form.Group controlId="formGridCheckbox" className="col col-sm-6 ">
            <button
              type="submit"
              className="me-4 btn btn-success btn-lg btn-block"
            >
              <i className="fa fa-save mx-2"></i>
              {titleButton}
            </button>
          </Form.Group>
        </Row>
      </form>
    </div>
  );
};
