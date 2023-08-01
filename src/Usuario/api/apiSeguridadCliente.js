import axios from "axios";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/seguridad/"


export const apiSeguridadPost = async (
    opciones,
    latitud,
    longitud,
    descripcion,
    imagen,
) => {
    console.log(imagen);
    try {
        const response = await axios.post(`${URL}agregar`, {
            opciones: opciones,
            latitud: latitud,
            longitud: longitud,
            descripcion: descripcion,
            imagen: imagen,
        }, { headers: { "x-token": token } });
        console.log(response);
        return {
            success: true,
            message: "Peticion enviada correctamente",
        };
    }  catch (error) {
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

export const apiUrgenteSeguridad = async (currentLocation)=> {
    console.log(currentLocation);
    try {
        const response = await axios.post(`${URL}urgente`, {
            latitud: currentLocation.latitud,
            longitud: currentLocation.longitud,
        }, { headers: { "x-token": token } });
        console.log(response);
        return {
            success: true,
            message: "Peticion enviada correctamente",
        };
    }  catch (error) {
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
}