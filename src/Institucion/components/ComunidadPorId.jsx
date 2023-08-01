import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import { NavBarInstitucion } from "../NavBarInstitucion";
import { useNavigate, useParams } from "react-router-dom";
import { apiComunidadPorId } from "../api/apiInstitucion";
import { MapaComunidad } from "./MapaComunidad";
import { Button } from "react-bootstrap";

export const Comunidad = () => {
    const navigate = useNavigate();
  const [comunidad, setComunidad] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const viewComunidad = async () => {
      const getMiComunidad = await apiComunidadPorId(id);
      setComunidad(getMiComunidad);
    };
    viewComunidad();
  }, [id]);

  return (
    <>
      <NavBarInstitucion />
      <section>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol lg="6">
              <MDBCard className="mb-4 h-100">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    id="img"
                    src={comunidad.img}
                    alt="avatar"
                    className="avatar"
                    fluid
                  />

                  <p className="text-muted mb-1" id="name" style={{ fontSize: "20px" }}>
                    <strong>Nombre:</strong> {comunidad.nombre}
                  </p>
                  <p className="text-muted mb-1" id="name" style={{ fontSize: "20px" }}>
                    <strong>Contacto:</strong> {comunidad.contacto}
                  </p>
                  <p className="text-muted mb-1" id="name" style={{ fontSize: "20px" }}>
                    <strong>Direccion:</strong> {comunidad.direccion}
                  </p>
                  <br />
                </MDBCardBody>
                <MDBCardFooter>
                <Button
                    href={`/donarPorId/${comunidad._id}`}
                    className="nav-link text-light bg-green ov-btn-grow-ellipse ms-2"
                    onClick={() => {
                        navigate(`/donarPorId/${comunidad._id}`);
                    }}
                  >
                    <i className="fa fa-money mx-1"></i> Donar
                  </Button>
                </MDBCardFooter>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="6">
              <div className="h-100">
                {comunidad.nombre && <MapaComunidad comunidad={comunidad} />}
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
};
