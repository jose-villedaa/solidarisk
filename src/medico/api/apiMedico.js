import axios from "axios";
const URL = "https://solidarisk-back-end-original.vercel.app/api/usuarios/";
const token = localStorage.getItem("token");

export const apiMedicoById = async(token) => {
    try {
        const listaUsuarios = await axios.get(`${URL}mostrar/${token}`);
        console.log(listaUsuarios.data);
        return listaUsuarios.data;
    } catch (error) { }
}
