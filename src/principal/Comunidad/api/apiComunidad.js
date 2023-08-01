import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/comunidad/";

export const getComunidad = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);
        console.log(response.data.listaComunidades);
        return response.data.listaComunidades;
    } catch (error) {
        console.error(error);
    }
};