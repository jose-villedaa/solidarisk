import axios from "axios";
import Swal from "sweetalert2";
export const apiLogin = async (correo, password) => {
  try {
    const URL = "https://solidarisk-back-end-original.vercel.app/api/auth/login";

    const response = await axios.post(URL, {
      correo,
      password,
    });

    const token = response.data.token;
    const rol = response.data.rol;


    token ? localStorage.setItem("token", token) : null;
    rol ? localStorage.setItem("rol", rol) : null;
    console.log(token);

    return token;
  } catch ({
    response: {
      data: { message },
    },
  }) {
    Swal.fire({
      icon: "error",
      title: "Informacion Incorrecta",
      text: "Correo o Password Incorrectos",
      confirmButtonText: "Ok",
    });
  }


};
