import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarComunidad } from "../NavBarComunidad";
import { getMiComunidad } from "../api/apiComunidad";

export const MiComunidad = () => {
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState([]);
  const [donaciones, setDonaciones] = useState([]);
  const [citas, setCitas] = useState([]);

  const viewMiComunidad = async () => {
    const getComunidad = await getMiComunidad();
    setComunidad(getComunidad);
    setDonaciones(getComunidad.donaciones);
    setCitas(getComunidad.citas);
  };

  useEffect(() => {
    viewMiComunidad();
  }, []);

  return (
    <>
      <NavbarComunidad />
      <div
          style={{
            textAlign: "center",
            opacity: "100%",
            marginBottom: "20px",
            paddingTop: "20px",
            backgroundColor: "#d14639",
            color: "#FFFFFF",
            paddingBottom: "1px",
            width: "100%",
            marginLeft:"-15px"
          }}
        >
          <h1 className="display-4 font-weight-bold mb-4" id="">
            Mi Comunidad
          </h1>
        </div>
        <div className="containerMiHotel">
          <div className="hotel-details">
            <div className="hotel-image">
              <img src={comunidad.img} alt="Hotel" />
            </div>
            <div className="hotel-info">
              <h2 className="hotel-name">{comunidad.nombre}</h2>
              <p className="hotel-location">{comunidad.direccion}</p>
              <p className="hotel-description">
                Contacto: {comunidad.contacto}
              </p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="services-section">
              <h3>Donaciones Usuarios</h3>
              <div className="services-list">
                {donaciones.usuarios && donaciones.usuarios.length === 0 ? (
                  <p>No hay registros.</p>
                ) : (
                    donaciones.usuarios && donaciones.usuarios.map((s) => (
                    <div key={s._id} className="service" >
                      <img src={comunidad.img} alt={comunidad.nombre} />
                      <h4>{s.tipoDonacion}</h4>
                      {s.tipoDonacion === "Bienes y recursos" ? (
                        <div>
                          <p><strong>Recurso Donado:</strong> {s.donacion.recursosDonados}</p>
                          <p><strong>Cantidad:</strong> {s.donacion.cantidadDonativo}</p>
                        </div>
                      ) : (
                        <div>
                          <p><strong>Cantidad:</strong> Q.{s.donacion.montoDonativo}</p>
                          <p><strong>Tipo de Pago:</strong> {s.donacion.tipoPago}</p>
                        </div>
                      )}
                      <div className="d-flex">
                        <img
                          src={s.usuarioDonador?.img}
                          alt="avatar"
                          className="avatarComunidad rounded-circle mx-2"
                          style={{ width: "40px", height: "40px" }}
                        />
                        <p><strong>Donante:</strong> {s.usuarioDonador?.nombre || "Anónimo"}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <hr />
            <div className="services-section">
              <h3>Donaciones Instituciones</h3>
              <div className="services-list">
                {donaciones.instituciones && donaciones.instituciones.length === 0 ? (
                  <p>No hay registros.</p>
                ) : (
                    donaciones.instituciones && donaciones.instituciones.map((s) => (
                    <div key={s._id} className="service">
                      <img src={comunidad.img} alt={comunidad.nombre} />
                      <h4>{s.tipoDonacion}</h4>
                      {s.tipoDonacion === "Bienes y recursos" ? (
                        <div>
                          <p><strong>Recurso Donado:</strong> {s.donacion?.recursosDonados}</p>
                          <p><strong>Cantidad:</strong> {s.donacion?.cantidadDonativo}</p>
                        </div>
                      ) : (
                        <div>
                          <p><strong>Cantidad:</strong> Q.{s.donacion.montoDonativo}</p>
                          <p><strong>Tipo de Pago:</strong> {s.donacion.tipoPago}</p>
                        </div>
                      )}
                      <p><strong>Donante:</strong> {s.institucionDonadora?.nombre || "Anónimo"}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <hr />
            <div className="events-section">
              <h3>Citas</h3>
              <div className="events-list">
                {citas.length === 0 ? (
                  <p>No hay registros.</p>
                ) : (
                  citas.map((e) => (
                    <div key={e._id} className="event">
                      <img src={comunidad.img} alt={comunidad.nombre} />
                      <h4>Estado: {e.estado}</h4>
                      <p><strong>Fecha:</strong> {e.fechaCita.substring(0,10)}</p>
                      <p><strong>Horario:</strong> {e.horarioInicio} - {e.horarioFinal}</p>
                      <a className="btn" target="_blank" href={e.link}>
            <i className="fa fa-google mx-2"></i>Link Cita
          </a>
                    </div>
                  ))
                )}
              </div>
            </div>
            <hr />
          </div>
        </div>
    </>
  );
};
