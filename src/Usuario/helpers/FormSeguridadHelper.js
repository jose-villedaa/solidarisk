import Swal from "sweetalert2";
import { apiSeguridadPost } from "../api/apiSeguridadCliente";

export const sendDataSeguridad = async (seguridad, option) => {
    try {
        let resultado;
        switch (option) {
            case 1:
                console.log(seguridad.imagen);

                resultado = await apiSeguridadPost(
                    seguridad.opciones,
                    seguridad.latitud,
                    seguridad.longitud,
                    seguridad.descripcion,
                    seguridad.imagen
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
                            window.location.href = "/usuario";
                        } else {
                            window.location.href = "/usuario";
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
