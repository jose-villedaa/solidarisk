import Swal from "sweetalert2";
import * as Yup from "yup";
import { apiPostInstitucion, apiPutInstitucion } from "../api/apiInstitucion";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio'),
    correo: Yup.string().required('El campo correo es obligatorio').email('Ingrese un correo válido'),
    password: Yup.string().required('El campo password es obligatorio').min(6, 'La contraseña debe tener al menos 6 caracteres'),
    tipo: Yup.string().required('El campo tipo es obligatorio'),
    telefono: Yup.string().required('El campo telefono es obligatorio'),
    recurso: Yup.string().required('El campo recurso es obligatorio'),
});

export const sendDataInstitucion = async (institucion, option) => {
    try {
        await validationSchema.validate(institucion, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                console.log("Este es la institucion",institucion);
                resultado = await apiPostInstitucion(
                    institucion.nombre,
                    institucion.correo,
                    institucion.password,
                    institucion.tipo,
                    institucion.telefono,
                    institucion.direccion,
                    institucion.recurso,
                    institucion.imagen
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
                            window.location.href = "/institucion";
                        } else {
                            window.location.href = "/institucion";
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
                console.log(institucion.password);
                resultado = await apiPutInstitucion(
                    institucion._id,
                    institucion.nombre,
                    institucion.correo,
                    institucion.password,
                    institucion.tipo,
                    institucion.telefono,
                    institucion.direccion,
                    institucion.recurso,
                );
                if (resultado) {
                    Swal.fire({
                        icon: "success",
                        title: "Genial!",
                        text: `La Institucion ha actualizada correctamente!`,
                        confirmButtonText: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/institucion";

                        } else {
                            window.location.href = "/institucion";

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
