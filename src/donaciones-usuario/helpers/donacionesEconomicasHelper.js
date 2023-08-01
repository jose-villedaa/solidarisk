import Swal from "sweetalert2";
import * as Yup from "yup";
import { postDonacionesEconomicas } from "../api/apiDonaciones";

const validationSchema = Yup.object().shape({
  tipoDonativo: Yup.string().required("El tipo de donativo es requerido"),
  tipoPago: Yup.string().required("El tipo de pago es requerido"),
  montoDonativo: Yup.number().required("El monto del donativo es requerido"),
  comunidad: Yup.string().required("La comunidad es requerida"),
});

export const sendData = async (donacionEconomica, option) => {
  try {
    await validationSchema.validate(donacionEconomica, { abortEarly: false });

    let resultado;
    switch (option) {
      case 1:
        resultado = await postDonacionesEconomicas(
          donacionEconomica.tipoDonativo,
          donacionEconomica.tipoPago,
          donacionEconomica.montoDonativo,
          donacionEconomica.comunidad
        );

        console.log(resultado);
        console.log(donacionEconomica);

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
