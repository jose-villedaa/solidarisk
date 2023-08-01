import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL_COMUNIDADES = "https://solidarisk-back-end-original.vercel.app/api/comunidad/";

export const apiComunidades = async () => {
    try {
        const listaComunidades = await axios.get(`${URL_COMUNIDADES}mostrar`);
        return listaComunidades.data.listaComunidades
        console.log(listaComunidades.data);
    } catch (error) {
        console.error(error);
    }

};