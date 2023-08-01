import Swal from "sweetalert2";
import { createCita } from "../api/apiCitas";

export const sendData = async (state, option, id) => {
  console.log(state);
  let resultado;
  switch (option) {
    case 1:
      resultado = await createCita({ 
        fechaCita: state.cita.fechaCita,
        horarioInicio: state.cita.horarioInicio,
        horarioFinal: state.cita.horarioFinal,
        tipoCita: state.cita.tipoCita,
        link: state.cita.link
      }
      );
      if (resultado) {
        Swal.fire({
          icon: "success",
          title: "Genial!",
          text: "cita agendada correctamente!",
          showConfirmButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/vistaMedico";
          } else {
            window.location.href = "/vistaMedico";
          }
        });
      }
      break;
  }
};