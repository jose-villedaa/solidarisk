import axios from "axios";
const URL = "https://solidarisk-back-end-original.vercel.app/api/usuarios/";
const token = localStorage.getItem("token");

export const apiUserById = async(token) => {
    try {
        const listaUsuarios = await axios.get(`${URL}mostrar/${token}`);
        console.log(listaUsuarios.data);
        return listaUsuarios.data;
    } catch (error) { }
}

export const deleteUserById = async() => {
    console.log("eliminando");
    try {
        const listaUsuarios = await axios.delete(`${URL}eliminarMiPerfil/`, {headers: {'x-token': token}});
        console.log(listaUsuarios);
        return listaUsuarios;
    } catch (error) { }
}

export const apiEditarUser = async(usuario) => {
    console.log(usuario);
    try {
        const listaUsuarios = await axios.delete(`${URL}editarMiPerfil/`,usuario, {headers: {'x-token': token}});
        console.log(listaUsuarios);
        return listaUsuarios;
    } catch (error) { }
}