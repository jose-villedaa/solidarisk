import Swal from "sweetalert2";

import * as Yup from "yup";
import { apiPostTipoInstitucion, apiPutTipoInstitucion } from "../api/apiTipoInstitucion";


const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio')
});

export const sendData = async (institucion, option) => {
    try {
        await validationSchema.validate(institucion, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostTipoInstitucion(
                    institucion.nombre,
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
                            window.location.href = "/listaTipoInstitucion";
                        } else {
                            window.location.href = "/listaTipoInstitucion";
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
                console.log(institucion._id);
                resultado = await apiPutTipoInstitucion(
                    institucion._id,
                    institucion.nombre,
                );
                if (resultado) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: `Institucion actualizado correctamente!`,
                        confirmButtonText: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/listaTipoInstitucion";

                        } else {
                            window.location.href = "/listaTipoInstitucion";

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
