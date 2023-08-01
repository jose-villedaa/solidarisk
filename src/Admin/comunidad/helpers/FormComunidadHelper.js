import Swal from "sweetalert2";

import * as Yup from "yup";
import { apiPostComunidad, apiPutComunidad } from "../api/apiComunidad";


const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio'),
    correo: Yup.string().required('El campo correo es obligatorio').email('Ingrese un correo válido'),
    password: Yup.string().required('El campo password es obligatorio').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    direccion: Yup.string().required('El campo direccion es obligatorio'),
    contacto: Yup.string().required('El campo contacto es obligatorio'),
    latitud: Yup.string().required('El campo latitud es obligatorio'),
    longitud: Yup.string().required('El campo longitud es obligatorio'),

});

export const sendDataComunidad = async (comunidad, option) => {
    try {
        await validationSchema.validate(comunidad, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                resultado = await apiPostComunidad(
                    comunidad.nombre,
                    comunidad.direccion,
                    comunidad.correo,
                    comunidad.password,
                    comunidad.latitud,
                    comunidad.longitud,
                    comunidad.contacto,
                    comunidad.img,


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
                            window.location.href = "/listaComunidad";
                        } else {
                            window.location.href = "/listaComunidad";
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
                console.log(comunidad._id);
                resultado = await apiPutComunidad(
                    comunidad._id,
                    comunidad.nombre,
                    comunidad.direccion,
                    comunidad.correo,
                    comunidad.password,
                    comunidad.latitud,
                    comunidad.longitud,
                    comunidad.contacto,
                    comunidad.img,

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
                            window.location.href = "/listaComunidad";

                        } else {
                            window.location.href = "/listaComunidad";

                        }
                    });
                }
                break;
        }
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            // Mostrar una alerta de Swal indicando los campos faltantes
            const missingFields = error.inner.map((err) => err.path);
            const passwordError = error.inner.find((err) => err.path === "password");
            const emailError = error.inner.find((err) => err.path === "correo");
    
            if (passwordError && passwordError.type === "min") {
                Swal.fire({
                    icon: "error",
                    title: "Contraseña inválida",
                    text: "La contraseña debe tener al menos 6 caracteres",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                });
            } else if (emailError && emailError.type === "email") {
                Swal.fire({
                    icon: "error",
                    title: "Correo inválido",
                    text: "Ingrese un correo válido",
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Campos incompletos",
                    text: `Por favor, complete los campos obligatorios: ${missingFields.join(", ")}`,
                    showConfirmButton: true,
                    confirmButtonText: "Ok",
                });
            }
        }
    }
};
