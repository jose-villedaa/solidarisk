import axios from "axios";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");
const URL_DONACIONES = "https://solidarisk-back-end-original.vercel.app/api/donaciones-institucion/";
const URL_COMUNIDADES = "https://solidarisk-back-end-original.vercel.app/api/comunidades/";

export const getComunidades = async () => {
  try {
    const response = await axios.get(URL_COMUNIDADES, {
      headers: { "x-token": token },
    });
    const comunidades = response.data.comunidades;
    return comunidades;
  } catch (error) {
    console.log(error);
  }
};

export const postDonacionesEconomicas = async ( tipoDonativo, tipoPago, montoDonativo, comunidad) => {
  try {
    const response = await axios.post(
      `${URL_DONACIONES}agregar/DonacionEconomica`,
      {
        tipoDonativo,
        tipoPago,
        montoDonativo,
        comunidad,
      },
      { headers: { "x-token": token } }
    );
    return {
      success: true,
      message: "Donación registrada correctamente",
    };
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: data.error,
      };
    } else {
      return {
        success: false,
        message: "Error al procesar la solicitud",
      };
    }
  }
};



export const postDonacionesBienes = (
  tipoDonativo,
  recursosDonados,
  cantidadDonativo,
  lugarDonativo,
  latitud,
  longitud,
  comunidad
) => {
  try {
    const response = axios.post(
      `${URL_DONACIONES}agregar/DonacionRecursos`,
      {
        tipoDonativo,
        recursosDonados,
        cantidadDonativo,
        lugarDonativo,
        latitud,
        longitud,
        comunidad,
      },
      { headers: { "x-token": token } }
    );

    return {
      success: true,
      message: "Donación registrada correctamente",
    };
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      return {
        success: false,
        message: data.error,
      };
    } else {
      return {
        success: false,
        message: "Error al procesar la solicitud",
      };
    }
  }
};
