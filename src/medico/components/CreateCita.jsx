import React, { useEffect, useState } from "react";
import { cita } from "../models/cita";
import { sendData } from "../helpers/FormCitaHelper";
import { NavbarMedico } from "../NavBarMedico";
import { apiTipoCitaView } from "../../Admin/tipoCita/api/apiTipoCita";

export const CreateCita = () => {
  const [agregar, setAgregar] = useState(
    cita || {
      fechaCita: "",
      horarioInicio: "",
      horarioFinal: "",
      tipoCita: "",
      link: ""
    }
  );
  const [listaTiposCita, setTiposCita] = useState([]);

  const viewTipos = async () => {
    const tiposLista = await apiTipoCitaView();
    setTiposCita(tiposLista);
  };

  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    viewTipos();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData(agregar, 1, 0);
  };

  return (
    <>
      <NavbarMedico />
      <div
        style={{
          textAlign: "center",
          opacity: "100%",
          marginBottom: "20px",
          backgroundColor: "#E74C3C",
          color: "#FFFFFF",
          paddingBottom: "1px",
          paddingTop: "15px",
        }}
      >
        <h1 className="mb-4">Agendar cita</h1>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-black">Fecha</label>
            <br />
            <input
              type="date"
              className="form-control"
              min={today}
              onChange={(event) =>
                setAgregar({
                  cita: {
                    ...agregar.cita,
                    fechaCita: event.target.value,
                  },
                })
              }
            />
          </div>
          <div className="form-group">
            <label className="text-black">Hora de inicio</label>
            <input
              type="time"
              className="form-control"
              onChange={(event) =>
                setAgregar({
                  cita: {
                    ...agregar.cita,
                    horarioInicio: event.target.value,
                  },
                })
              }
            ></input>
          </div>
          <div className="form-group">
            <label className="text-black">Hora de finalización</label>
            <input
              type="time"
              className="form-control"
              onChange={(event) =>
                setAgregar({
                  cita: {
                    ...agregar.cita,
                    horarioFinal: event.target.value,
                  },
                })
              }
            ></input>
          </div>
          <div className="form-group">
            <label className="text-black">Tipo Cita</label>
            <br />
            <select
              className="form-control"
              onChange={({ target: { value } }) =>
                setAgregar({
                  cita: {
                    ...agregar.cita,
                    tipoCita: value,
                  },
                })
              }
            >
                <option value="">Seleccione un tipo cita</option>
              {listaTiposCita.map((tipo) => (
                <option
                  key={tipo._id}
                  value={tipo._id}
                  selected={cita.tipoCita === tipo._id}
                >
                  {tipo._id} - {tipo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
          <label className="text-black">
  Link <a href="https://www.google.com/calendar/" target="_blank" rel="noopener noreferrer">
    <i className="fa fa-link mx-2"></i>
  </a>
</label>
            <input
              type="url"
              className="form-control"
              onChange={(event) =>
                setAgregar({
                  cita: {
                    ...agregar.cita,
                    link: event.target.value,
                  },
                })
              }
            ></input>
          </div>
          <div className="container text-center">
            <button id="btn-enviar" type="submit" className="btn">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
