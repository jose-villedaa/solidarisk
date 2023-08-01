import axios from "axios";
const URL = "https://solidarisk-back-end-original.vercel.app/api/seguridad/"


export const apiSeguridad = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);
        console.log(response.data.listaSeguridad);
        return response.data.listaSeguridad;
    } catch (error) {
        console.error(error);
    }

};