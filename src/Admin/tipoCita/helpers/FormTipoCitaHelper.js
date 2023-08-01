import Swal from "sweetalert2";

import * as Yup from "yup";
import { apiPostTipoCita, apiPutTipoCita } from "../api/apiTipoCita";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio')
});

export const sendData = async (cita, option) => {
    try {
        await validationSchema.validate(cita, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostTipoCita(
                    cita.nombre,
                );

                if (resultado.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: resultado.message,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/listaTipoCita";
                        } else {
                            window.location.href = "/listaTipoCita";
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
            case 2:
                console.log(cita._id);
                resultado = await apiPutTipoCita(
                    cita._id,
                    cita.nombre,
                );
                if (resultado) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: `usuario actualizado correctamente!`,
                        confirmButtonText: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/listaTipoCita";

                        } else {
                            window.location.href = "/listaTipoCita";

                        }
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
                text: `Por favor, complete los campos obligatorios: ${missingFields.join(", ")}`,
                showConfirmButton: true,
                confirmButtonText: "Ok",
            });
        }
    }
};
