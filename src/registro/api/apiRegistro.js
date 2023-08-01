import axios from "axios";
import Swal from "sweetalert2";

export const apiRegistro = async (
    nombre,
    apellido,
    edad,
    identificacion,
    telefono,
    correo,
    password
) => {
    try {
        const URL = "https://solidarisk-back-end-original.vercel.app/api/usuarios/agregar/cliente";

        const response = await axios.post(URL, {
            nombre,
            apellido,
            edad,
            identificacion,
            telefono,
            correo,
            password,
        });

        const message = response.data.message;

        Swal.fire({
            icon: "success",
            title: "Registro exitoso",
            text: message,
            confirmButtonText: "Ok",
        });

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        Swal.fire({
            icon: "error",
            title: "Error en el registro",
            text: message,
        });

        return false;
    }
};