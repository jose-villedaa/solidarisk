import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { apiCitas } from "../api/apiCitas";
import { Modal, Button } from "react-bootstrap";
import { NavbarMedico } from "../NavBarMedico";

export const Calendario = () => {
  const [citas, setCitas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);

  const viewCitasList = async () => {
    const getListCitasFromApi = await apiCitas();
    setCitas(getListCitasFromApi);
  };

  useEffect(() => {
    viewCitasList();
  }, []);

  useEffect(() => {
    const transformarCitasEnEventos = () => {
      const eventosTransformados = citas.map((cita) => ({
        title: cita.estado,
        start: cita.fechaCita.substring(0, 10),
        end: cita.fechaCita.substring(0, 10),
        // Agrega más propiedades de la cita si es necesario
        extendedProps: {
          citaId: cita._id,
          tipoCita: cita.tipoCita?.nombre,
          fechaCita: cita.fechaCita.substring(0, 10),
          horaCita: cita.horarioInicio,
          horaFinal: cita.horarioFinal,
          estado: cita.estado,
          comunidad: cita.comunidad?.nombre || "Sin comunidad",
          link: cita.link,
        },
      }));
      setEventos(eventosTransformados);
    };

    transformarCitasEnEventos();
  }, [citas]);

  const handleEventClick = (eventInfo) => {
    const clickedCita = eventInfo.event.extendedProps;
    setSelectedCita(clickedCita);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavbarMedico />
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
          marginRight: "-150px",
        }}
      >
        <h1 className="display-4 font-weight-bold mb-4" id="">
          Calendario
        </h1>
      </div>
      <div className="container mb-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="90vh"
          events={eventos}
          eventClick={handleEventClick}
          eventColor="#991d12"
        />
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Detalles de la Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCita && (
            <div>
              <p>
                <strong>Tipo de Cita:</strong> {selectedCita.tipoCita}
              </p>
              <p>
                <strong>Fecha de Cita:</strong> {selectedCita.fechaCita}
              </p>
              <p>
                <strong>Hora de Inicio:</strong> {selectedCita.horaCita}
              </p>
              <p>
                <strong>Hora Final:</strong> {selectedCita.horaFinal}
              </p>
              <p>
                <strong>Estado:</strong> {selectedCita.estado}
              </p>
              <p>
                <strong>Comunidad:</strong> {selectedCita.comunidad}
              </p>

              <a className="btn" target="_blank" href={selectedCita.link}>
            <i className="fa fa-google mx-2"></i>Link Cita
          </a>
            </div>
            
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            <i className="fa fa-close mx-2"></i>Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
