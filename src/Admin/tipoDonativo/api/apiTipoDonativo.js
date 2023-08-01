import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/tipo-donativo/"


export const apiTipoDonativoView = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);

        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostTipoDonativo = async (
    tipoDonativo
) => {
    try {
        const response = await axios.post(
            `${URL}agregar`,
            {
                tipoDonativo: tipoDonativo,
            }
        );

        return {
            success: true,
            message: "Tipo Donativo agregado correctamente",
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

export const apiDeleteTipoDonativo = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminar/${id}`);

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Tipo Donativo Eliminado") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutTipoDonativo = async (id, tipoDonativo) => {
    try {
        const { data } = await axios.put(`${URL}editar/${id}`, {
            tipoDonativo,
        });
        return true;
    } catch (error) {
        console.log(error); // Manejar el error de alguna manera (mostrar mensaje de error, enviar a un servicio de seguimiento de errores, etc.)

        const message = error.response?.data?.message;
        if (message === 'el token ha expirado') {
            localStorage.removeItem('token');
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message,
                showConfirmButton: true,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed || result.isDenied) {
                    window.location.href = '/login';
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                showConfirmButton: true,
                confirmButtonText: 'OK',
            });
        }
    }
};