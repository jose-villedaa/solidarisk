import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { NavBarInstitucion } from "../NavBarInstitucion";
import { getMiInstitucion } from "../api/apiInstitucion";

export const MiInstitucion = () => {
  const [institucion, setInstitucion] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const viewMiInstitucion = async () => {
    const getMiInstitucion2 = await getMiInstitucion();
    setInstitucion(getMiInstitucion2);
  };

  useEffect(() => {
    viewMiInstitucion();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavBarInstitucion />
      <div id="perfil">
        <div className="headerInstitucion">

        </div>



        <div className="avatar">
        
        <img className="avatar" src={institucion.img} alt="avatar" style={{marginTop:"-8px", marginLeft:"-3px",}} />
      </div>
        <div className="tituloperfil">
          <h1>{institucion.nombre} </h1>
          <div className="bigbriefing">
            <p style={{ fontSize: "15px", color: "black" }}>
              <b>Direccion:</b> {institucion.direccion}
              </p>
          </div>

        </div>
        <br />


        <div className="infocandidato">
          <form className="mui-form">
            <h1 className="title-2">Numero Telefonico: {institucion.telefono}</h1>

            {/* <h1 className="title-2">Correo Electronico: {usuario.correo}</h1> */}
            <div className="mui-textfield mui-textfield--float-label">
            </div>
            <br />
            <br /><br />
            <div className="mui-textfield mui-textfield--float-label">

            </div>
            <div className="mui-textfield mui-textfield--float-label">

            </div>
            <MDBCardBody>
        <h5 className="mb-4">Donaciones</h5>
        {institucion.donaciones &&
          institucion.donaciones.length === 0 ? (
          <p className="text-muted">No hay donaciones</p>
        ) : (
          <MDBListGroup flush>
            {institucion.donaciones &&
              institucion.donaciones.map((donacion, index) => (
                <MDBListGroupItem key={donacion.id}>
                  {index} - {" "}
                  {donacion.tipoDonativo === "Economica" ? (
                    <>
                      <i className="fa fa-money mx-2" style={{ color: "green" }}></i><strong>Cantidad:</strong> Q.{donacion.montoDonativo} - <strong>Tipo de
                        Pago:</strong> {donacion.tipoPago} - <strong>Tipo de
                          Donativo:</strong> {donacion.tipoDonativo}
                    </>
                  ) : (
                    <>
                      <i className="fa fa-shirt mx-2" style={{ color: "skyblue" }}></i><strong>Recurso Donado:</strong> {donacion.recursosDonados} -
                      <strong>Cantidad:</strong> {donacion.cantidadDonativo}- <strong>Tipo de
                        Donativo:</strong> {donacion.tipoDonativo}
                    </>
                  )}
                </MDBListGroupItem>
              ))}
          </MDBListGroup>
        )}
      </MDBCardBody>
      <MDBRow>
        <MDBCol lg="4">
              <h5 className="mb-4">Trabajadores</h5>
              {institucion.donaciones &&
                institucion.donaciones.length === 0 ? (
                <p className="text-muted">No hay trabajadores</p>
              ) : (
                <MDBListGroup flush>
                  {institucion.trabajadores &&
                    institucion.trabajadores.map((trabajador) => (
                      <MDBListGroupItem key={trabajador.id} style={{width:"477px"}}>
                        <div className="d-flex r " >
                          <MDBCardImage
                            src={trabajador.img}
                            alt="avatar"
                            className="avatarComunidad rounded-circle me-3"
                            style={{ width: "61px", height:"51px" }}
                            fluid
                          />
                          <div>
                            {trabajador.nombre} {trabajador.apellido}
                          </div>
                        </div>
                      </MDBListGroupItem>
                    ))}
                </MDBListGroup>
              )}
        </MDBCol>
      </MDBRow>
            <br />


          </form>
        </div>
        <br /><br />
      </div>

     


    </>
  );
};
