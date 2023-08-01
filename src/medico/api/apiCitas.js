import axios from "axios";
import Swal from "sweetalert2";

const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/citas/";

export const apiCitas = async () => {
  try {
    const listaCitas = await axios.get(`${URL}mostrarMisCitas` , {headers: {'x-token': token}});
    console.log(listaCitas.data);
    return listaCitas.data;
  } catch (error) {}
};

export const apiCita = async () => {
  try {
    const listaCitas = await axios.get(`${URL}mostrar` , {headers: {'x-token': token}});
    console.log(listaCitas.data);
    return listaCitas.data;
  } catch (error) {}
};

export const createCita = async (
  fechaCita,
  horarioInicio,
  horarioFinal,
  comunidad,
  tipoCita,
  link
) => {
  try {
    const { citaGuardada } = await axios.post(
      `${URL}agregarCita`,
      {
        fechaCita: fechaCita.fechaCita,
        horarioInicio: fechaCita.horarioInicio,
        horarioFinal: fechaCita.horarioFinal,
        comunidad: fechaCita.comunidad,
        tipoCita: fechaCita.tipoCita,
        link: fechaCita.link
      },
      { headers: { "x-token": token } }
    );
    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se pudo agendar la cita!",
    });
  }
};
export const apiDeleteCita = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}eliminarCita/${id}`,{headers: {'x-token': token}});

    return true;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    if (message === "Cita eliminada") {
      window.location.href = "/medico";
    }
    if (message) {
      return message;
    }
  }
};
