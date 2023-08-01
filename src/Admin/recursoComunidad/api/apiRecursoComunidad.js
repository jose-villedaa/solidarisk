import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/recursos/"


export const apiRecursoComunidadView = async () => {
    try {
        const response = await axios.get(`${URL}mostrarGeneral`);
        console.log(response);
        console.log(response.data.listaRecursos);

        return response.data.listaRecursos;
    } catch (error) {
        console.error(error);
    }

};