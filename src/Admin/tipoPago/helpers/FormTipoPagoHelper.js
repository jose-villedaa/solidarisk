import Swal from "sweetalert2";

import * as Yup from "yup";
import { apiPostTipoPago, apiPutTipoPago } from "../api/apiTipoPago";

const validationSchema = Yup.object().shape({
    tipo: Yup.string().required('El campo tipo es obligatorio')
});

export const sendData = async (tipoPago, option) => {
    try {
        await validationSchema.validate(tipoPago, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostTipoPago(
                    tipoPago.tipo,
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
                            window.location.href = "/listaTipoPago";
                        } else {
                            window.location.href = "/listaTipoPago";
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
                console.log(tipoPago._id);
                resultado = await apiPutTipoPago(
                    tipoPago._id,
                    tipoPago.tipo,
                );
                if (resultado) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: `Pago actualizado correctamente!`,
                        confirmButtonText: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/listaTipoPago";

                        } else {
                            window.location.href = "/listaTipoPago";

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
