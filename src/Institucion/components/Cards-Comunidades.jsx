import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComunidades } from "../api/apiInstitucion";
import { Button, Row, Col } from "react-bootstrap";
import { NavBarInstitucion } from "../NavBarInstitucion";

export const CardsComunidades = () => {
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const viewComunidades = async () => {
    const getComunidadesApi = await getComunidades();
    setComunidad(getComunidadesApi);
  };

  useEffect(() => {
    viewComunidades();
  }, [showModal]);

  const renderComunidades = () => {
    return comunidad.map((h) => (
      <Col md={6} key={h._id}>
        <div className="card col-12 mb-3 mt-4">
          <div className="row">
            <div className="col-md-5">
              <img
                src={h.img}
                className="imgComunidad ms-3"
                alt="..."
                style={{ height: "75%", width: "110%" }}
              />
            </div>
            <div className="col-12 col-md-7 col-sm-12 col-xs-12 ms-auto">
              <div className="card-body">
                <h5 className="card-title">Comunidad: {h.nombre}</h5>
                <p className="card-text">Direccion: {h.direccion}</p>
                <p className="card-text">Contacto: {h.contacto}</p>
                <div className="d-flex">
                  <button href={`/comunidadPorId/${h._id}`}
                    className="btn nav-link text-light bg-green ov-btn-grow-ellipse ms-2"
                    onClick={() => {
                        navigate(`/comunidadPorId/${h._id}`);
                    }}

                  >
                    <i className="fa fa-circle-info mx-1"></i> Informacion
                  </button>
                  <Button
                    href={`/donarPorId/${h._id}`}
                    className="nav-link text-light bg-green ov-btn-grow-ellipse ms-2"
                    onClick={() => {
                        navigate(`/donarPorId/${h._id}`);
                    }}
                  >
                    <i className="fa fa-money mx-1"></i> Donar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    ));
  };

  return (
    <>
      <NavBarInstitucion />
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
            Comunidades Disponibles
          </h1>
        </div>
      <div className="container">
        <div className="row">
        {comunidad ? (
          renderComunidades()
        ) : (
          <h2 className="mt-2">Cargando...</h2>
        )}
        </div>
      </div>
      <br />
    </>
  );
};
