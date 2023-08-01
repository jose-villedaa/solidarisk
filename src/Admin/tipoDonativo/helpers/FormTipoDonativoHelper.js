import Swal from "sweetalert2";

import * as Yup from "yup";
import { apiPostTipoDonativo, apiPutTipoDonativo } from "../api/apiTipoDonativo";

const validationSchema = Yup.object().shape({
    tipoDonativo: Yup.string().required('El campo nombre es obligatorio')
});

export const sendData = async (donativo, option) => {
    try {
        await validationSchema.validate(donativo, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostTipoDonativo(
                    donativo.tipoDonativo,
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
                            window.location.href = "/listaTipoDonativo";
                        } else {
                            window.location.href = "/listaTipoDonativo";
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
                console.log(donativo._id);
                resultado = await apiPutTipoDonativo(
                    donativo._id,
                    donativo.tipoDonativo,
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
                            window.location.href = "/listaTipoDonativo";

                        } else {
                            window.location.href = "/listaTipoDonativo";

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
