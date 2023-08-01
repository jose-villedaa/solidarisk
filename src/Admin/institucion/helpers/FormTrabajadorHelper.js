import Swal from "sweetalert2";
import { apiTrabajador } from "../api/apiInstitucion";

export const sendDataTrabajador = async (trabajador, option) => {
    try {
        let resultado;
        switch (option) {
            case 1:
                console.log("Este es el trabajador",trabajador);

                resultado = await apiTrabajador(
                    trabajador._id,
                    trabajador.trabajador,
                );

                if (resultado.success) {
                    Swal.fire({
                        icon: "success",    
                        title: "Genial!",
                        text: resultado.message,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "/institucion";
                        } else {
                            window.location.href = "/institucion";
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: resultado.message,
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                    });
                }
                break;
        }
    } catch (error) {
        
    }
    
};
