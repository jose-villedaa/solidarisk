import React, { useEffect, useState } from "react";
import { apiUsuarioTrabajadorView } from "../../usuario/api/apiUsuario";

export const FormTrabajador = ({ onAgregarTrabajador }) => {
    const [trabajador, setTrabajador] = useState("");
    const [usuarioTrabajador, setUsuarioTrabajador] = useState([])

    const getUsuarioTrabajador = async () => {
        const viewUsuerWorker = await apiUsuarioTrabajadorView();
        setUsuarioTrabajador(viewUsuerWorker);
    }

    const handleAgregarTrabajador = (event) => {
        event.preventDefault();
        onAgregarTrabajador(trabajador);
    };

    useEffect(() => {

        getUsuarioTrabajador()
    }, []);
    return (
        <form onSubmit={handleAgregarTrabajador}>
            <div className="form-group">
                <label className="text-black">Trabajador</label>
                <select
                    type="text"
                    className="form-select"
                    value={trabajador}
                    onChange={(event) => setTrabajador(event.target.value)}
                >
                    <option value="">Seleccione el trabajador</option>
                    {usuarioTrabajador.map((r) => (
                        <option
                            key={r._id}
                            value={r._id}

                        >
                            {r._id} - {r.nombre} {r.apellido} - {r.rol}
                        </option>
                    ))}
                </select>


            </div>
            <button type="submit" className="btn btn-success">
                Agregar Trabajador
            </button>
        </form>
    );
};
