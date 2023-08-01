import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/tipoCitas/"


export const apiTipoCitaView = async () => {
    try {
        const response = await axios.get(`${URL}`);

        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostTipoCita = async (
    nombre
) => {
    try {
        const response = await axios.post(
            `${URL}agregar`,
            {
                nombre: nombre,
            }
        );

        return {
            success: true,
            message: "Tipo Cita agregado correctamente",
        };
    } catch (error) {
        if (error.response) {
            const { data } = error.response;
            return {
                success: false,
                message: data.error,
            };
        } else {
            return {
                success: false,
                message: "Error al procesar la solicitud",
            };
        }
    }
};

export const apiDeleteTipoCita = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminar/${id}`);

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Tipo CIta Eliminado") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutTipoCita = async (id, nombre) => {
    try {
        const { data } = await axios.put(
            `${URL}editar/${id}`,
            {
                nombre
            }
        );
        console.log("El id es ", id);
        return true;
    } catch (error) {
        const message = error.response.data.message;
        if (message === "el token ha expirado") {
            localStorage.removeItem("token");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed || result.isDenied) {
                    window.location.href = "/login";
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: true,
                confirmButtonText: "OK",
            });
        }
    }
};