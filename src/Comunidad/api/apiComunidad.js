import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/comunidad/";
const URLRECURSO = "https://solidarisk-back-end-original.vercel.app/api/recursos/";


export const getMiComunidad = async () => {
    try {
        const response = await axios.get(`${URL}mostrarMiComunidad`, { headers: { 'x-token': token } });
        console.log(response.data);
        return response.data.listaComunidades;
    } catch (error) {
        console.error(error);
    }
};

export const aplicarCitaComunidad = async (id) => {
    console.log(id);
    try {
        const response = await axios.post(`${URL}aplicarCita/${id}`,null, { headers: { 'x-token': token } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const faltaRecursoComunidad = async (recurso) => {
    console.log(recurso);
    try {
        const response = await axios.post(`${URLRECURSO}agregarRecurso/${recurso}`,null, { headers: { 'x-token': token } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};