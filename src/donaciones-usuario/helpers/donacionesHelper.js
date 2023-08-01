import Swal from "sweetalert2";
import { postDonacionesBienes } from "../api/apiDonaciones";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  tipoDonativo: Yup.string().required("El tipo de donativo es requerido"),
  recursosDonados: Yup.string().required("Los recursos donados son requeridos"),
  cantidadDonativo: Yup.number().required(
    "La cantidad de donativos es requerida"
  ),
  lugarDonativo: Yup.string().required("El lugar del donativo es requerido"),
  latitud: Yup.number().required("La latitud es requerida"),
  longitud: Yup.number().required("La longitud es requerida"),
  comunidad: Yup.string().required("La comunidad es requerida"),
});

export const sendData = async (donacionBienes, option) => {
  try {
    await validationSchema.validate(donacionBienes, { abortEarly: false });

    let resultado;
    switch (option) {
      case 1:
        resultado = await postDonacionesBienes(
          donacionBienes.tipoDonativo,
          donacionBienes.recursosDonados,
          donacionBienes.cantidadDonativo,
          donacionBienes.lugarDonativo,
          donacionBienes.latitud,
          donacionBienes.longitud,
          donacionBienes.comunidad
        );

        console.log(resultado);
        console.log(donacionBienes);

        if (resultado.success) {
          Swal.fire({
            icon: "success",
            title: "Genial!",
            text: resultado.message,
            showConfirmButton: true,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/usuario";
            } else {
              window.location.href = "/usuario";
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: resultado.message,
            showConfirmButton: true,
            confirmButtonText: "Ok",
          });
        }
        break;
    }
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Mostrar una alerta de Swal indicando los campos faltantes
      const missingFields = error.inner.map((err) => err.path);
      Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: `Por favor, complete los campos obligatorios: ${missingFields.join(
          ", "
        )}`,
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    }
  }
};
