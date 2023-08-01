import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/comunidad/"


export const apiComunidad = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);
        console.log(response.data.listaComunidades);
        return response.data.listaComunidades;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostComunidad = async (
    nombre,
    direccion,
    correo,
    password,
    latitud,
    longitud,
    contacto,
    img,

) => {
    try {
        const response = await axios.post(
            `${URL}agregarComunidad`,
            {
                nombre: nombre,
                direccion: direccion,
                correo: correo,
                password: password,
                latitud: latitud,
                longitud: longitud,
                contacto: contacto,
                img: img,


            }, { headers: { "x-token": token } }
        );
        console.log(response);
        return {
            success: true,
            message: "Comunidad agregada correctamente",
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

export const apiDeleteComunidad = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminarComunidad/${id}`, { headers: { "x-token": token } });

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Comunidad Eliminada") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutComunidad = async (
    id,
    nombre,
    direccion,
    correo,
    password,
    latitud,
    longitud,
    contacto,
    img,
) => {
    try {
        const { data } = await axios.put(
            `${URL}editarComunidad/${id}`,
            {
                nombre,
                direccion,
                correo,
                password,
                latitud,
                longitud,
                contacto,
                img,
            }, { headers: { "x-token": token } }
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