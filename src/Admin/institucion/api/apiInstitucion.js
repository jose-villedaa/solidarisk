import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/instituciones/"


export const apiInstitucion = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);
        console.log(response.data.listaInstituciones);
        return response.data.listaInstituciones;
    } catch (error) {
        console.error(error);
    }

};

export const apiPostInstitucion = async (
    nombre,
    correo,
    password,
    tipo,
    telefono,
    direccion,
    recurso,
    imagen,

) => {
    console.log(imagen);
    console.log(recurso);
    console.log(direccion);
    console.log(telefono);
    console.log(tipo);
    try {
        const response = await axios.post(
            `${URL}agregarInstitucion`,
            {
                nombre: nombre,
                correo: correo,
                password: password,
                tipo: tipo,
                telefono: telefono,
                direccion: direccion,
                recurso: recurso,
                imagen: imagen

            }, { headers: { "x-token": token } }
        );
        console.log(response);
        return {
            success: true,
            message: "Institucion agregado correctamente",
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

export const apiTrabajador = async (id, trabajador) => {
    try {
        const response = await axios.post(`${URL}agregarTrabajador/${id}`,
            { trabajador: trabajador },
            { headers: { "x-token": token } });

        console.log(response);
        return {
            success: true,
            message: "Trabajador agregado correctamente",
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

export const apiDeleteinstitucion = async (id) => {
    try {
        const { data } = await axios.delete(`${URL}eliminarInstitucion/${id}`, { headers: { "x-token": token } });

        return true;
    } catch ({
        response: {
            data: { message },
        },
    }) {
        if (message === "Institucion Eliminada") {
            window.location.href = "/login";
        }
        if (message) {
            return message;
        }
    }
};

export const apiPutInstitucion = async (id,
    nombre,
    correo,
    password,
    tipo,
    telefono,
    direccion,
    recurso,
) => {
    try {
        const { data } = await axios.put(
            `${URL}editarInstitucion/${id}`,
            {
                nombre,
                correo,
                password,
                tipo,
                telefono,
                direccion,
                recurso,
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