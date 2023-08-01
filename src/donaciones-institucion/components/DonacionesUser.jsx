import React, { useEffect, useRef, useState } from "react";
import { sendData } from "../helpers/donacionesHelper";
import { useForm } from "react-hook-form";
import { donaciones } from "../model/donaciones";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { apiComunidades } from "../api/apiComunidades";
import { NavBarInstitucion } from "../../Institucion/NavBarInstitucion";
import { MapaLocation } from "./MapaUser";

export const DonacionesRecursoInstitucion = ({
  donacionBienesProp = donaciones,
  titleButton = "Agregar Donacion",
  option = 1,
}) => {
  const [donacionBienes, setDonacionBienes] = useState(
    donacionBienesProp || {
      tipoDonativo: "",
      recursosDonados: "",
      cantidadDonativo: "",
      lugarDonativo: "",
      latitud: "",
      longitud: "",
      comunidad: "",
    }
  );
  console.log(donacionBienes);
  const [currentLocation, setCurrentLocation] = useState({
    latitud: "",
    longitud: "",
  });
  console.log(currentLocation);
  const [showModal, setShowModal] = useState(false);
  const [comunidades, setComunidades] = useState([]);
  const [listaComunidades, setListaComunidades] = useState([]);
  const viewComunidades = async () => {
    const comunidaesList = await apiComunidades();
    setListaComunidades(comunidaesList);
  };
  useEffect(() => {
    viewComunidades();
  }, [showModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setDonacionBienes({ ...donacionBienes });
  }, []);
  const crud = async () => {
    await sendData(donacionBienes, option);
  };
  const handleTipoChange = (event) => {
    setDonacionBienes({
      ...donacionBienes,
      tipoDonativo: event.target.value,
    });
  };
  const handleComunidadChange = (event) => {
    setDonacionBienes({
      ...donacionBienes,
      comunidad: event.target.value,
    });
  };
  const getComunidadNombre = () => {
    const comunidad = listaComunidades.find(
      (c) => c._id === donacionBienes.comunidad
    );
    return comunidad ? comunidad.nombre : "";
  };

  return (
    <>
      <NavBarInstitucion />
      <MDBContainer className="py-5">
        <form onSubmit={handleSubmit(crud)}>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <div className="d-flex flex-row align-items-center">
              <h4 className="text-uppercase mt-1">Solidarisk</h4>
              <span className="ms-2 me-3">Donation System</span>
            </div>
          </div>
          <MDBRow>
            <MDBCol md="7" lg="7" xl="6" className="mb-4 mb-md-0">
              <h5 className="mb-0 text-success">Realiza tu donacion</h5>
              <div>
                <div className="d-flex justify-content-between">
                  <br />
                </div>
                <p>
                  Puedes escoger entre hacer una donacion economica o realizar
                  una donacion de bienes
                </p>
                <div
                  className="p-2 d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#eee" }}
                >
                  <span style={{ alignContent: "center" }}>
                    Escoge el tipo de donacion:
                  </span>

                  <select
                    {...register("tipoDonativo")}
                    className="form-control"
                    value={donacionBienes.tipoDonativo}
                    onChange={handleTipoChange}
                    disabled={option === 2} //
                  >
                    <option value="">Tipo de donacion</option>
                    <option value="Bienes y recursos">Bienes y recursos</option>
                  </select>
                </div>
                <hr />

                <div>
                  <input
                    {...register("recursosDonados")}
                    className="form-control"
                    type="text"
                    value={donacionBienes.recursosDonados}
                    placeholder="Recursos donados"
                    id="bienes"
                    onChange={({ target: { value } }) =>
                      setDonacionBienes(() => ({
                        ...donacionBienes,
                        recursosDonados: value,
                      }))
                    }
                  />
                  <input
                    {...register("cantidadDonativo")}
                    className="form-control"
                    type="number"
                    value={donacionBienes.cantidadDonativo}
                    placeholder="Cantidad del donativo"
                    id="bienes"
                    onChange={({ target: { value } }) =>
                      setDonacionBienes(() => ({
                        ...donacionBienes,
                        cantidadDonativo: value,
                      }))
                    }
                  />

                  <input
                    {...register("lugarDonativo")}
                    className="form-control"
                    type="text"
                    value={donacionBienes.lugarDonativo}
                    placeholder="Lugar del donativo"
                    id="bienes"
                    onChange={({ target: { value } }) =>
                      setDonacionBienes(() => ({
                        ...donacionBienes,
                        lugarDonativo: value,
                      }))
                    }
                  />

                  <p> Ingresa la ubicacion Destinataria:</p>

                  <input
                    {...register("latitud")}
                    className="form-control"
                    type="number"
                    value={donacionBienes.latitud}
                    placeholder="Latitud Geografica"
                    id="bienes"
                    onChange={({ target: { value } }) =>
                      setDonacionBienes(() => ({
                        ...donacionBienes,
                        latitud: value,
                      }))
                    }
                  />
                  <input
                    {...register("longitud")}
                    className="form-control"
                    type="number"
                    value={donacionBienes.longitud}
                    placeholder="Longitud Geografica"
                    id="bienes"
                    onChange={({ target: { value } }) =>
                      setDonacionBienes(() => ({
                        ...donacionBienes,
                        longitud: value,
                      }))
                    }
                  />

                  <select
                    {...register("comunidad")}
                    className="form-control mt-4"
                    value={donacionBienes.comunidad}
                    onChange={handleComunidadChange}
                  >
                    <option value="">Escoja la comunidad a donar</option>
                    {listaComunidades.map((c) => (
                      <option key={c.id} value={c._id}>
                        {c.nombre}
                      </option>
                    ))}
                  </select>

                  {donacionBienes.comunidad && (
                    <label className="text-success" id="label">
                      {getComunidadNombre()}
                    </label>
                  )}
                </div>

                <p style={{ marginTop: "6%" }}>
                  Nos complace informarles que todas las donaciones realizadas
                  desde Solidarisk se mantendrán en estricta confidencialidad y
                  serán tratadas de forma anónima.
                </p>
                <div className="d-flex flex-column mb-3"></div>

                <button type="submit" className="btn btn-success">
                  <i className="fa fa-box mx-2"></i>
                  {titleButton}
                </button>
              </div>
            </MDBCol>
            <MDBCol md="5" lg="4" xl="4" offsetLg="1" offsetXl="2">
              <div className="p-3" style={{ backgroundColor: "#eee" }}>
                <img
                  src="https://www.navarroynavarro.es/wp-content/uploads/2022/07/donaciones-en-vida-herencias.webp"
                  alt=""
                  id="imagen-d"
                />
                <hr />
              </div>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    </>
  );
};
