import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormTipoCitaHelper";

export const FormTipoCita = ({ tipoProp, titleButton, option }) => {
    const [cita, setCita] = useState(tipoProp || {
        nombre: ""
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setCita({ ...cita });
    }, []);

    const crud = async () => {
        await sendData(cita, option);
    };
    return (
        <div style={{ marginLeft: " 10%", marginBottom: "50px" }}>
            <form onSubmit={handleSubmit(crud)}>
                <div className="form-group">
                    <label className="text-black">Nombre:</label>
                    <input
                        {...register("nombre")}
                        type="text"
                        className="form-control"
                        value={cita.nombre}
                        onChange={({ target: { value } }) =>
                            setCita(() => ({ ...cita,nombre: value }))
                        }
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    <i className="fa fa-save mx-2"></i>{titleButton}
                </button>
            </form>
        </div>
    );
};
