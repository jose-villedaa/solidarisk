import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { NavbarComunidad } from "../NavBarComunidad";
import Swal from "sweetalert2";
import { faltaRecursoComunidad } from "../api/apiComunidad";
export const RecursoFaltante = () => {
  
  const faltaRecurso = async(recurso) => {
    let result = await faltaRecursoComunidad(recurso);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Genial!",
            text: "Se envio la peticion a la institucion encargada",
          }).then((result) => {
            if (result) {
          window.location.href = "/menuComunidad";
          }
        });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo enviar la peticion",
          });
        }
    }
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
            Recursos
          </h1>
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="cards">
              <div className="card col-12 col-md-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2534/2534347.png"
                  alt="Icono Falta"
                  className="card-icon"
                />
                <h2>Agua</h2>
                <p>
                  Reporta presionando el boton <strong>Reportar</strong>
                </p>
                <a className="btn card-link ov-btn-grow-ellipse" onClick={()=> faltaRecurso("Agua")} >
                  <i className="fa fa-send mx-2"></i>Reportar
                </a>
              </div>
              <div className="card col-12 col-md-12">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5102/5102174.png"
                  alt="Icono Trabajadores"
                  className="card-icon"
                />
                <h2>Comida</h2>
                <p>
                  Reporta presionando el boton <strong>Reportar</strong>
                </p>
                <a className="btn card-link ov-btn-grow-ellipse" onClick={()=> faltaRecurso("Comida")}>
                <i className="fa fa-send mx-2"></i>Reportar
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
