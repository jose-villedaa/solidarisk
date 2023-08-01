import React, { useEffect, useState } from "react";
import { getMiInstitucion } from "../api/apiInstitucion";
import { NavBarInstitucion } from "../NavBarInstitucion";

export const Notificaciones = () => {
  const [institucion, setInstitucion] = useState([]);
  const [recurso, setRecurso] = useState();
  const [selectedNotificacion, setSelectedNotificacion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imagenUrl, setImagenUrl] = useState("");
  const [notificacionesOriginales, setNotificacionesOriginales] = useState([]);
  const [motivoFaltante, setMotivoFaltante] = useState("");
  const [notificacionesFiltradas, setNotificacionesFiltradas] = useState([]);

  const viewMiInstitucion = async () => {
    const getMiInstitucion2 = await getMiInstitucion();
    setInstitucion(getMiInstitucion2.peticiones);
    setRecurso(getMiInstitucion2);
  };

  const handleCardClick = (notificacion) => {
    if (selectedNotificacion?._id === notificacion._id) {
      setSelectedNotificacion(null);
    } else {
      console.log(notificacion);
      setSelectedNotificacion(notificacion);
    }
  };

  const abrirModalImagen = (url) => {
    setImagenUrl(url);
    setShowModal(true);
  };

  const filtrarNotificaciones = (motivo) => {
    if (motivo === "ALL") {
      setNotificacionesFiltradas([...notificacionesOriginales]);
    } else {
      const notificacionesFiltradas = notificacionesOriginales.filter(
        (notificacion) => notificacion.motivoPeticion === motivo
      );
      setNotificacionesFiltradas(notificacionesFiltradas);
    }
  };

  useEffect(() => {
    viewMiInstitucion();
  }, []);

  useEffect(() => {
    if (institucion.length > 0) {
      setNotificacionesOriginales([...institucion]);
      setNotificacionesFiltradas([...institucion]);
    }
  }, [institucion]);

  return (
    <>
      <NavBarInstitucion />
      <div className="header">
        <h1 className="title">Notificaciones</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 notifications-container">
            {recurso && recurso.recurso.tipo === "Seguridad" && (
              <div className="mb-3">
                <select
                  className="form-select"
                  value={motivoFaltante}
                  onChange={(e) => {
                    setMotivoFaltante(e.target.value);
                    filtrarNotificaciones(e.target.value);
                  }}
                >
                  <option value="ALL">ALL</option>
                  <option value="URGENTE">URGENTE</option>
                </select>
              </div>
            )}

            {notificacionesFiltradas.map((notificacion) => (
              <div
                key={notificacion._id}
                className={`card mb-2 custom-card-width ${
                  selectedNotificacion?._id === notificacion._id
                    ? "bg-danger text-white selected"
                    : ""
                }`}
                onClick={() => handleCardClick(notificacion)}
              >
                <div className="card-body">
                  <img
                    src={
                      notificacion.comunidad?.img || notificacion.persona?.img
                    }
                    className="rounded-circle card-image"
                    style={{ height: "65px", width: "65px" }}
                    alt="Imagen de la comunidad"
                  />
                  <div className="content">
                    <h5 className="card-title">
                      {notificacion.comunidad?.nombre ||
                        notificacion.persona?.nombre}
                    </h5>
                    <p className="card-text">
                      <strong>Recurso faltante: </strong>
                      {recurso.recurso.tipo}
                    </p>
                    <small>
                      {notificacion.fecha.substring(0, 10)} {notificacion.hora}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-sm-12 col-md-8 info-container">
            {selectedNotificacion && (
              <div className="cardInfoMas mb-2">
                <div className="card-body">
                  <h2 className="card-title mb-4 mt-4">Información</h2>
                  <div className="image-container">
                    <img
                      src={
                        selectedNotificacion.persona?.img ||
                        selectedNotificacion.comunidad?.img
                      }
                      alt="Imagen Usuario"
                      className="user-image"
                    />
                  </div>
                  <div className="card-info-content">
                    <p className="card-text">
                      <strong>Nombre: </strong>
                      {selectedNotificacion.comunidad?.nombre ||
                        selectedNotificacion.persona?.nombre}
                    </p>
                    <p className="card-text">
                      <strong>Contacto: </strong>
                      {selectedNotificacion.persona?.correo ||
                        selectedNotificacion.comunidad?.correo}
                    </p>
                    <p className="card-text">
                      <strong>Fecha: </strong>
                      {selectedNotificacion.fecha.substring(0, 10)}
                    </p>
                    <p className="card-text">
                      <strong>Hora: </strong>
                      {selectedNotificacion.hora}
                    </p>
                    <div className="card-footer d-flex align-items-center">
                      {recurso && recurso.recurso.tipo === "Seguridad" && (
                        <div>
                          <a
                            className="m-4"
                            href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selectedNotificacion.latitud},${selectedNotificacion.longitud}`}
                            target="_blank"
                          >
                            <i className="fa fa-google ms-2"></i> UBICACION
                          </a>
                          <a
                            className="m-4"
                            onClick={() => {
                              abrirModalImagen(
                                selectedNotificacion.imagen
                              );
                            }}
                          >
                            <i className="fa fa-image ms-2"></i> IMAGEN
                          </a>
                        </div>
                      )}
                      {recurso && (
                        <a
                          className="m-4"
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                            selectedNotificacion.persona?.correo ||
                            selectedNotificacion.comunidad?.correo
                          }`}
                          target="_blank"
                        >
                          <i className="fa fa-google ms-2"></i> CONTACTO
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {showModal && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-dialog-image" role="document">
              <div className="modal-content">
                <div className="modal-body p-0 d-flex justify-content-center align-items-center">
                  <img src={imagenUrl} alt="Imagen" className="img-fluid imgModal" />
                </div>
                <div className="modal-footer">
                  <a
                    type="button"
                    id="btnModalImagen"
                    className="btn btn-sm btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cerrar
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
