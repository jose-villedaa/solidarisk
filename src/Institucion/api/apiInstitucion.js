import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/instituciones/";
const URL_COMUNIDAD = "https://solidarisk-back-end-original.vercel.app/api/comunidad/";

export const getRecursosInstituciones = async () => {
    try {
        const response = await axios.get(`${URL}mostrarRecurso`, { headers: { 'x-token': token } });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getMiInstitucion = async () => {
    try {
        const response = await axios.get(`${URL}mostrarMiInstitucion`, { headers: { 'x-token': token } });
        console.log(response.data);
        return response.data.listaInstituciones;
    } catch (error) {
        console.error(error);
    }
};

export const getComunidades = async () => {
    try {
        const response = await axios.get(`${URL_COMUNIDAD}mostrar`);
        console.log(response.data);
        return response.data.listaComunidades;
    } catch (error) {
        console.error(error);
    }
};

export const apiComunidadPorId = async (id) => {
    try {
        const response = await axios.get(`${URL_COMUNIDAD}mostrar/${id}`);
        console.log(response.data);
        return response.data.listaComunidades;
    } catch (error) {
        console.error(error);
    }
};