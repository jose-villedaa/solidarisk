import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/tiposInstitucion/"

export const apiTipoInstitucionView = async () => {
    try {
        const response = await axios.get(`${URL}`);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostTipoInstitucion = async (
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
            message: "Tipo Institucion agregado correctamente",
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

export const apiDeleteTipoInstitucion = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminar/${id}`);

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Tipo Institucion Eliminado") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutTipoInstitucion = async (id,
    nombre
    ) => {
    try {
        const { data } = await axios.put(
            `${URL}editar/${id}`,
            {
                nombre
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