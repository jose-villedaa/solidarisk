import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendDataSeguridad } from "../helpers/FormSeguridadHelper";
import { MapaSeguridad } from "./MapaSeguridad";
import Swal from "sweetalert2";

export const FormSeguridad = ({ seguridadProp, titleButton, option }) => {
  const [seguridad, setSeguridad] = useState({
    opciones: "",
    latitud: "",
    longitud: "",
    descripcion: "",
    imagen: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const crud = async () => {
    if (!seguridad.latitud || !seguridad.longitud) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, coloca un marcador en el mapa antes de enviar la petición.",
      });
      return;
    }
    await sendDataSeguridad(
      {
        ...seguridad,
      },
      option
    );
  };

  return (
    <div style={{ marginLeft: " 10%", marginBottom: "50px", zIndex: "3" }}>
      <form onSubmit={handleSubmit(crud)}>
        <div className="form-group">
          <label className="text-black">Mensaje Principal:</label>
          <input
            {...register("opciones")}
            type="text"
            className="form-control"
            value={seguridad.opciones ?? ""}
            onChange={({ target: { value } }) =>
              setSeguridad((prevState) => ({ ...prevState, opciones: value }))
            }
          />
        </div>

        <div className="form-group">
          <label className="text-black">Descripcion:</label>
          <input
            {...register("descripcion")}
            type="text"
            className="form-control"
            value={seguridad.descripcion ?? ""}
            onChange={({ target: { value } }) =>
              setSeguridad((prevState) => ({
                ...prevState,
                descripcion: value,
              }))
            }
          />
        </div>

        <div className="form-group">
          <label className="text-black">Imagen:</label>
          <input
            type="url"
            className="form-control"
            onChange={({ target: { value } }) =>
              setSeguridad((prevState) => ({ ...prevState, imagen: value }))
            }
          />
        </div>

        <h3>Ubicacion del delito 📍</h3>
        <p>Ingresa las coordenadas geograficas: </p>
        <div className="form-group mb-3">
          <label className="text-black">Latitud Geografica: </label>
          <input
            style={{ marginBottom: "4%" }}
            {...register("latitud")}
            type="number"
            className="form-control"
            value={seguridad.latitud ?? ""}
            onChange={({ target: { value } }) =>
              setSeguridad((prevState) => ({
                ...prevState,
                latitud: value,
              }))
            }
          />

          <label className="text-black">Longitud Geografica: </label>
          <input
            {...register("longitud")}
            type="number"
            className="form-control"
            value={seguridad.longitud ?? ""}
            onChange={({ target: { value } }) =>
              setSeguridad((prevState) => ({
                ...prevState,
                longitud: value,
              }))
            }
          />
        </div>
        <div className="container text-center">
          <button type="submit" className="btn btn-success">
            <i className="fa fa-save mx-2" style={{ position: "center", paddingTop:"2%" }}></i>
            {titleButton}
          </button>
        </div>
      </form>
    </div>
  );  
};
