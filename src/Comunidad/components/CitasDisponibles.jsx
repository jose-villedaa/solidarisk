import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Modal, Button } from "react-bootstrap";
import { apiCita } from "../../medico/api/apiCitas";
import { NavbarComunidad } from "../NavBarComunidad";
import Swal from "sweetalert2";
import { aplicarCitaComunidad } from "../api/apiComunidad";

export const CitasDisponibles = () => {
  const [citas, setCitas] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCita, setSelectedCita] = useState(null);

  const viewCitasList = async () => {
    const getListCitasFromApi = await apiCita();
    setCitas(getListCitasFromApi);
  };

  useEffect(() => {
    viewCitasList();
  }, []);

  useEffect(() => {
    const transformarCitasEnEventos = () => {
      const citasSinComunidad = citas.filter((cita) => !cita.comunidad);
      const eventosTransformados = citasSinComunidad.map((cita) => ({
        title: cita.estado,
        start: cita.fechaCita.substring(0, 10),
        end: cita.fechaCita.substring(0, 10),
        // Agrega más propiedades de la cita si es necesario
        extendedProps: {
          citaId: cita._id,
          medico: cita.medico.nombre,
          tipoCita: cita.tipoCita.nombre,
          fechaCita: cita.fechaCita.substring(0, 10),
          horaCita: cita.horarioInicio,
          horaFinal: cita.horarioFinal,
          estado: cita.estado,
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

  const aplicarCita = async(id) => {
    const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción hara que apliques a esta cita",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });
  
      if (confirmacion.isConfirmed) {
        let result = await aplicarCitaComunidad(id);
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Genial!",
            text: "Se agrego su cita",
          }).then((result) => {
            if (result) {
          window.location.href = "/citasDisponibles";
          }
        });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se pudo agregar la cita",
          });
        }
      }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <NavbarComunidad/>
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
            marginRight:"-150px"
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
                <strong>Médico:</strong> {selectedCita.medico}
              </p>
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
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            <i className="fa fa-close mx-2"></i>Cerrar
          </Button>

          <button className="btnOpciones" onClick={() => aplicarCita(selectedCita.citaId)}>

            <i className="fa fa-send mx-2"></i>Aplicar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
