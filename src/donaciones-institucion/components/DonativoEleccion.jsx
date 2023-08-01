import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavBarInstitucion } from "../../Institucion/NavBarInstitucion";
import { useNavigate, useParams } from "react-router-dom";
export const DonativoEleccion = () => {
    const {id} = useParams();
    const navigate = useNavigate();
  return (
    <>
    <NavBarInstitucion/>
      <div className="banca-virtual">
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
            Donativos que puede hacer
          </h1>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="cards">
              <div className="card col-12 col-md-12">
                <img
                  src="https://previews.123rf.com/images/valterz/valterz1712/valterz171200042/91753583-logotipo-de-donaci%C3%B3n.jpg"
                  alt="Icono Donativo"
                  className="card-icon"
                />
                <h2>Economico</h2>
                <p>
                  Realice sus donativos economicos
                </p>
                <a href={`/donacionEconomica/${id}`} className="btn card-link ov-btn-grow-ellipse"  onClick={() => {
                        navigate(`/donacionEconomica/${id}`);
                    }}>
                  <i className="fa fa-money-bill-transfer mx-2"></i>Realizar Donativo
                </a>
              </div>
              <div className="card col-12 col-md-12">
                <img
                  src="https://img.freepik.com/vector-gratis/ilustracion-iconos-ayuda-donacion_53876-6144.jpg"
                  alt="Icono Donativo"
                  className="card-icon"
                />
                <h2>Recursos</h2>
                <p>
                  Realice sus donativos de recursos
                </p>
                <a href={`/donacionRecurso/${id}`} className="btn card-link ov-btn-grow-ellipse" onClick={() => {
                        navigate(`/donacionRecurso/${id}`)}} >
                <i className="fa fa-shirt mx-2"></i>Realizar Donativo
                </a>
              </div>
              <div className="col-md-1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
