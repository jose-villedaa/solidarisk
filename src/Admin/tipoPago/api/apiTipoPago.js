import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/tipoPago/"


export const apiTipoPagoView = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostTipoPago = async (
    tipo
) => {
    try {
        const response = await axios.post(
            `${URL}agregar`,
            {
                tipo: tipo,
            }
        );
        console.log("ENTRE", response)
        console.log("RL TIPO ES", tipo)
        return {
            success: true,
            message: "Tipo Pago agregado correctamente",
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

export const apiDeleteTipoPago = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminar/${id}`);

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Tipo Pago Eliminado") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutTipoPago = async (id,
    tipo
    ) => {
    try {
        const { data } = await axios.put(
            `${URL}editar/${id}`,
            {
                tipo
            }
        );
        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "el token ha expirado") {
            localStorage.removeItem("token");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: message,
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/login";
                } else if (result.isDenied) {
                    window.location.href = "/login";
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                showConfirmButton: true,
                confirmButtonText: "OK",
            }).then((result) => {
                if (result.isConfirmed) {
                } else {
                }
            });
        }
    }
};