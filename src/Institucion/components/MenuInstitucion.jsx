import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavBarInstitucion } from "../NavBarInstitucion";
export const MenuInstitucion = () => {
 
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
            Institucion
          </h1>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="cards">
              <div className="card col-12 col-md-12">
                <img
                  src="https://img.freepik.com/vector-gratis/ilustracion-iconos-ayuda-donacion_53876-6144.jpg"
                  alt="Icono Donativo"
                  className="card-icon"
                />
                <h2>Donativos</h2>
                <p>
                  Realiza donativos para comunidades necesitadas.
                </p>
                <a href="/comunidadesNecesitadas" className="btn card-link ov-btn-grow-ellipse">
                  <i className="fa fa-money-bill-transfer mx-2"></i>Realizar Donativo
                </a>
              </div>
              <div className="card col-12 col-md-12">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/020/361/340/non_2x/team-of-some-employees-icon-workers-illustration-sign-developers-symbol-management-logo-vector.jpg"
                  alt="Icono Trabajadores"
                  className="card-icon"
                />
                <h2>Trabajadores</h2>
                <p>
                  Administra tus trabajadores
                </p>
                <a href="/trabajadores" className="btn card-link ov-btn-grow-ellipse">
                <i className="fa fa-users mx-2"></i>Administrar
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
