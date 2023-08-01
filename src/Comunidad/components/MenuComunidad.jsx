import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavbarComunidad } from "../NavBarComunidad";
export const MenuComunidad = () => {
 
  return (
    <>
    <NavbarComunidad/>
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
            Comunidad
          </h1>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="cards">
              <div className="card col-12 col-md-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3782/3782026.png"
                  alt="Icono Falta"
                  className="card-icon"
                />
                <h2>Reportar falta de recurso</h2>
                <p>
                  Reporta falta de recursos como agua, luz, comida, vivienda.
                </p>
                <a href="/recursoFaltante" className="btn card-link ov-btn-grow-ellipse">
                  <i className="fa fa-circle-info mx-2"></i>Reportar
                </a>
              </div>
              <div className="card col-12 col-md-12">
                <img
                  src="https://c8.alamy.com/compes/2k4bh25/caridad-y-donacion-donaciones-de-sangre-ilustracion-vector-sobre-fondo-blanco-2k4bh25.jpg"
                  alt="Icono Trabajadores"
                  className="card-icon"
                />
                <h2>Citas Medicas</h2>
                <p>
                  Listado de citas medicas a las que puedes aplicar
                </p>
                <a href="/citasDisponibles" className="btn card-link ov-btn-grow-ellipse">
                <i className="fa fa-send mx-2"></i>Aplicar
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
