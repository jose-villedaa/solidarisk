import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cita } from '../models/cita';
import { apiCitas, apiDeleteCita } from '../api/apiCitas';
import Swal from 'sweetalert2';
import { NavbarMedico } from '../NavBarMedico';

export const VistaMedico = () => {
  const [listaCitas, setListaCitas] = useState([]);
  console.log(listaCitas);
  const [showModal, setShowModal] = useState(false);
  const [citas, setCitas] = useState(cita);
  const navigate = useNavigate();

  const viewCitasList = async () => {
    const getListCitasFromApi = await apiCitas();
    setListaCitas(getListCitasFromApi);
  };

  useEffect(() => {
    viewCitasList();
  }, [showModal]);

  const eliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la cita permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    });

    if (confirmacion.isConfirmed) {
      let result = await apiDeleteCita(id);
      if (result) {
        setListaCitas(listaCitas.filter((c) => c._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'Se eliminó la cita correctamente!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo eliminar la cita.',
        });
      }
    }
  };

  return (
    <>
      <NavbarMedico />
      <div
        style={{
          textAlign: 'center',
          opacity: '100%',
          marginBottom: '20px',
          paddingTop: '20px',
          backgroundColor: '#d14639',
          color: '#FFFFFF',
          paddingBottom: '1px',
        }}
      >
        <h1 className="display-4 font-weight-bold mb-4" id="">
          Vista Medico
        </h1>
      </div>

      <div className="container" style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <button
          id="btn-agregar"
          className="btn btn-primary"
          onClick={(event) => {
            event.preventDefault();
            navigate('/agendarCita');
          }}
        >
          <i className="fa fa-plus mx-2"></i>Agendar cita
        </button>
        <br />
        <br />
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Medico</th>
                <th scope="col">Fecha</th>
                <th scope="col">Hora de inicio</th>
                <th scope="col">Hora de finalización</th>
                <th scope="col">Tipo de cita</th>
                <th scope="col">Comunidad</th>
                <th scope="col">Estado</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(listaCitas) && listaCitas.length > 0 ? (
                listaCitas
                  .filter((c) => c.estado === 'Cita pendiente')
                  .map((c) => {
                    return (
                      <tr key={c._id}>
                        <th scope="row">{c._id}</th>
                        <td>{c.medico?.nombre} {c.medico?.apellido}</td>
                        <td>{c.fechaCita.substring(0, 10)}</td>
                        <td>{c.horarioInicio}</td>
                        <td>{c.horarioFinal}</td>
                        <td>{c.tipoCita?.nombre}</td>
                        <td>{c.comunidad?.nombre}</td>
                        <td>{c.estado}</td>
                        <td>
                          <button
                            id="btn-eliminar"
                            className="btn btn-danger"
                            onClick={() => {
                              eliminar(c._id);
                            }}
                          >
                            <i className="fa fa-trash mx-2"></i>Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td colSpan="9">No hay citas pendientes.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <button
          id="btn-calendario"
          className="btn btn-primary mb-4"
          onClick={(event) => {
            event.preventDefault();
            navigate('/calendarioCitas');
          }}
        >
          <i className="fa fa-calendar mx-2"></i>Calendario
        </button>
      </div>
    </>
  );
};
