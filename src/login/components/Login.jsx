import React, { useState } from "react";
import { apiLogin } from "../api/apiLogin";
import Swal from "sweetalert2";
import img from '../../assets/img/hola.jpg';
import imgSoli from '../../assets/img/soli.png';


import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";

export const Login = () => {
  //Manejo del state del email y password
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const result = await apiLogin(correo, password);
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Usuario Verificado!",
        text: "Ha iniciado sesion correctamente",
        confirmButtonText: "Ok",
      }).then((r) => {
        if (result) {
          const [header, payload, signature] = result.split(".");
          const decodedPayload = JSON.parse(atob(payload));
          console.log(decodedPayload);
          const rolUsuario = decodedPayload.rol;
          console.log(decodedPayload)
          console.log(rolUsuario);
          if (rolUsuario === "ROL_DEVELOPER") {
            window.location.href = "/listaUsuarios";
          } else if (rolUsuario === "ROL_INSTITUCION") {
            window.location.href = "/menuInstitucion";
          } else if (rolUsuario === "ROL_CLIENTE") {
            window.location.href = "/usuario";
          } else if (rolUsuario === "ROL_COMUNIDAD") {
            window.location.href = "/menuComunidad";
          } else if (rolUsuario === "ROL_MEDICO") {
            window.location.href = "/vistaMedico";
          } else {
            window.location.href = "/login";
          }
        }
      });
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div
            className="d-flex flex-row ps-5 pt-5"
            style={{ height: "250px", alignContent: "center", }}
          >
            <img src={imgSoli} alt="Not Found" className="loginimg" />
          </div>

          <div
            className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4"
            id="container-login"
          >
            <h3
              className="fw-normal mt-5 mb-3 ps-5 pb-3"
              style={{ letterSpacing: "0px" }}
              id="iniciar-sesion"
            >
              Iniciar Sesion
            </h3>
            <form onSubmit={handleLoginSubmit}>
              <MDBInput
                type="email"
                wrapperClass="mb-4 mx-5 w-100"
                label="Correo Electronico"
                placeholder="Tu direccion de correo"
                id="inemail"
                size="lg"
                aria-describedby="emailHelp"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />

              <div className="row">
                <div className="col-11">
              <MDBInput
                type={showPassword ? "text" : "password"}
                wrapperClass="mb-4 mx-5 w-100"
                className="form__field"
                label="Password"
                size="lg"
                id="inpassword"
                placeholder="Tu Password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
                required
              /> 
              </div>
              <div className="col-1">
              <button
              type="button"
              className="btnInfor"
              size="lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
            </button>
            </div>
            </div>
              <Button
                type="submit"
                className="mb-4 px-5 mx-5 w-100"
                color="info"
                size="lg"
              >
                Iniciar Sesion
              </Button>

              <p className="ms-5">
                Aun no tienes una cuenta?{" "}
                <a href="/registro" className="link-info">
                  Registrate Aqui
                </a>
              </p>
            </form>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src={img}
            id="imagen-login"
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
