import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL = "https://solidarisk-back-end-original.vercel.app/api/donaciones-institucion/"


export const apiDonacionInstitucionView = async () => {
    try {
        const response = await axios.get(`${URL}mostrar`);
        
        return response.data;
    } catch (error) {
        console.error(error);
    }

};