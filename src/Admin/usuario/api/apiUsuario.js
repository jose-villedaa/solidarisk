import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/usuarios/"


export const apiUsuarioView = async () => {
    try {
        const response = await axios.get(`${URL}dev`, { headers: { "x-token": token } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

};

export const apiUsuarioTrabajadorView = async () => {
    try {
        const response = await axios.get(`${URL}mostrarTrabajador`);
        console.log("trabajadores:",response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }

};


export const apiPostUsuario = async (
    nombre,
    apellido,
    edad,
    correo,
    password,
    identificacion,
    rol,
    telefono,
    identificacionMedico,
    contacto,
    tipoTrabajo,
    img

) => {
    try {
        const response = await axios.post(
            `${URL}agregar/developer`,
            {
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                correo: correo,
                password: password,
                identificacion: identificacion,
                rol: rol,
                telefono: telefono,
                identificacionMedico: identificacionMedico,
                contacto: contacto,
                tipoTrabajo: tipoTrabajo,
                img: img

            }, { headers: { "x-token": token } }
        );

        return {
            success: true,
            message: "Usuario agregado correctamente",
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

export const apiDeleteUsuario = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminar/cliente/${id}`, { headers: { "x-token": token } });

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Usuario Eliminado") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutUsuario = async (id,
    nombre,
    apellido,
    edad,
    correo,
    password,
    identificacion,
    rol,
    telefono,
    identificacionMedico,
    contacto,
    tipoTrabajo,
    img
) => {
    try {
        const listaComunidad  = await axios.put(
            `${URL}editar/cliente/${id}`,
            {
                nombre,
                apellido,
                edad,
                correo,
                password,
                identificacion,
                rol,
                telefono,
                identificacionMedico,
                contacto,
                tipoTrabajo,
                img
            }, { headers: { "x-token": token } }
        );
        return listaComunidad.data;
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