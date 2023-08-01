import React, { useEffect, useState } from "react";
import { sendData } from "../helpers/donacionesEconomicasHelper";
import { useForm } from "react-hook-form";
import { donacionesEconomicas } from "../model/donaciones-economicas";

import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtnGroup,
  MDBBtn,
  MDBRadio,
  MDBInput,
} from "mdb-react-ui-kit";
import { apiComunidades } from "../api/apiComunidades";
import { NavBarInstitucion } from "../../Institucion/NavBarInstitucion";

export const DonacionesEconomicasInstitucion = ({
  donacionEconomicaProp = donacionesEconomicas,
  titleButton = "Agregar Donacion",
  option = 1,
}) => {
  const [donacionEconomica, setDonacionEconomica] = useState(
    donacionEconomicaProp || {
      tipoDonativo: "",
      tipoPago: "",
      montoDonativo: "",
      comunidad: "",
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [listaComunidades, setListaComunidades] = useState([]);

  const viewComunidades = async () => {
    const comunidaesList = await apiComunidades();
    setListaComunidades(comunidaesList);
  };

  useEffect(() => {
    viewComunidades();
  }, [showModal]);

  console.log(listaComunidades);

  console.log("Boton", titleButton);
  console.log("Option", option);
  console.log("Donacion", donacionEconomicaProp);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setDonacionEconomica({ ...donacionEconomica });
  }, []);

  const crud = async () => {
    await sendData(donacionEconomica, option);
  };

  const handleTipoChange = (event) => {
    setDonacionEconomica({
      ...donacionEconomica,
      tipoDonativo: event.target.value,
    });
  };

  const handlePagoChange = (event) => {
    setDonacionEconomica({
      ...donacionEconomica,
      tipoPago: event.target.value,
    });
  };

  const handleComunidadChange = (event) => {
    setDonacionEconomica({
      ...donacionEconomica,
      comunidad: event.target.value,
    });
  };

  const getComunidadNombre = () => {
    const comunidad = listaComunidades.find(
      (c) => c._id === donacionEconomica.comunidad
    );
    return comunidad ? comunidad.nombre : "";
  };

  return (
    <> 
    <NavBarInstitucion/>
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
                Puedes escoger entre hacer una donacion economica o realizar una
                donacion de bienes
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
                  value={donacionEconomica.tipoDonativo}
                  onChange={handleTipoChange}
                  disabled={option === 2} //
                >
                  <option value="">Escoge el tipo de donacion</option>
                  <option value="Economica">Economica</option>
                </select>
              </div>
              <hr />

              <div>
                <select
                  {...register("tipoPago")}
                  className="form-control"
                  value={donacionEconomica.tipoPago}
                  onChange={handlePagoChange}
                  disabled={option === 2} //
                >
                  <option value="">Escoge el tipo de pago</option>
                  <option value="Credito/Debito">Credito/Debito</option>
                </select>

                <div className="input-group mb-3">
                  <span class="input-group-text mb-3 mt-3">$</span>
                  <input
                    {...register("montoDonativo")}
                    className="form-control mt-3"
                    type="number"
                    value={donacionEconomica.montoDonativo}
                    placeholder="Monto del donativo"
                    id="bienes"
                    onChange={({ target: { value } }) =>
                      setDonacionEconomica(() => ({
                        ...donacionEconomica,
                        montoDonativo: value,
                      }))
                    }
                  />
                </div>

                <select
                  {...register("comunidad")}
                  className="form-control"
                  value={donacionEconomica.comunidad}
                  onChange={handleComunidadChange}
                >
                  <option value="">Escoja la comunidad a donar</option>
                  {listaComunidades.map((c) => (
                    <option key={c.id} value={c._id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>

                {donacionEconomica.comunidad && (
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

              <hr className="my-4" />

              <h5 className="text-success mb-4">Payment</h5>

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Credit card"
                checked
              />

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Debit card"
              />

              <MDBRow style={{ marginTop: "20px" }}>
                <MDBCol>
                  <MDBInput
                    label="Name on card"
                    id="form6"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="Introduzca el nombre del titular de la tarjeta"
                    {...register("nameOnCard", { required: true })}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label="Numero de tarjeta"
                    id="form7"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="Introduzca el numero de la tarjeta"
                    {...register("numeroTarjeta", { required: true })}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="3">
                  <MDBInput
                    label="Expiration"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="MM/YY"
                    {...register("expiration", { required: true })}
                  />
                </MDBCol>
                <MDBCol md="3">
                  <MDBInput
                    label="CVV"
                    id="form8"
                    type="text"
                    wrapperClass="mb-4"
                    placeholder="CVV"
                    {...register("cvv", { required: true })}
                  />
                </MDBCol>
              </MDBRow>

              <button type="submit" className="btn btn-success">
                <i className="fa fa-box mx-2"></i>
                {titleButton}
              </button>
            </div>
          </MDBCol>
          <MDBCol md="5" lg="4" xl="4" offsetLg="1" offsetXl="2">
            <div className="p-3" style={{ backgroundColor: "#eee" }}>
              <img
                src="https://images.hola.com/imagenes/estar-bien/20220119203089/beneficios-donar-psicologia/1-41-476/donar-t.jpg?tx=w_680"
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
