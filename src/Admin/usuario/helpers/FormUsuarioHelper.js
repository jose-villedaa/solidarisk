import Swal from "sweetalert2";
import { apiPostUsuario, apiPutUsuario } from "../api/apiUsuario";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El campo nombre es obligatorio'),
    apellido: Yup.string().required('El campo apellido es obligatorio'),
    edad: Yup.number().required('El campo edad es obligatorio'),
    correo: Yup.string().required('El campo correo es obligatorio'),
    password: Yup.string().required('El campo password es obligatorio'),
    identificacion: Yup.string()
      .required('El campo identificacion es obligatorio')
      .min(7, 'El campo identificacion debe tener más de 6 dígitos'), // Validación para más de 6 dígitos
    rol: Yup.string().required('El campo rol es obligatorio'),
    telefono: Yup.string().required('El campo telefono es obligatorio'),
  });

export const sendData = async (usuario, option) => {
    try {
        await validationSchema.validate(usuario, { abortEarly: false });
        // Los datos son válidos, procede con el envío de la información

        let resultado;
        switch (option) {
            case 1:
                console.log("Este es el usuario",usuario);
                resultado = await apiPostUsuario(
                    usuario.nombre,
                    usuario.apellido,
                    usuario.edad,
                    usuario.correo,
                    usuario.password,
                    usuario.identificacion,
                    usuario.rol,
                    usuario.telefono,
                    usuario.identificacionMedico,
                    usuario.contacto,
                    usuario.tipoTrabajo,
                    usuario.img
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
                            window.location.href = "/listaUsuarios";
                        } else {
                            window.location.href = "/listaUsuarios";
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
                console.log(usuario._id);
                resultado = await apiPutUsuario(
                    usuario._id,
                    usuario.nombre,
                    usuario.apellido,
                    usuario.edad,
                    usuario.correo,
                    usuario.password,
                    usuario.identificacion,
                    usuario.rol,
                    usuario.telefono,
                    usuario.identificacionMedico,
                    usuario.contacto,
                    usuario.tipoTrabajo,
                    usuario.img
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
                            window.location.href = "/listaUsuarios";

                        } else {
                            window.location.href = "/listaUsuarios";

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
