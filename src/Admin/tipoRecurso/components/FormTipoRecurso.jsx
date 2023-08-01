import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormTipoRecursoHelper";

export const FormTipoRecurso = ({ tipoProp, titleButton, option }) => {
    const [recurso, setRecurso] = useState(tipoProp || {
        tipo: ""
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setRecurso({ ...recurso });
    }, []);

    const crud = async () => {
        await sendData(recurso, option);
    };
    return (
        <div style={{ marginLeft: " 10%", marginBottom: "50px" }}>
            <form onSubmit={handleSubmit(crud)}>
                <div className="form-group">
                    <label className="text-black">Nombre:</label>
                    <input
                        {...register("tipo")}
                        type="text"
                        className="form-control"
                        value={recurso.tipo}
                        onChange={({ target: { value } }) =>
                        setRecurso(() => ({ ...recurso ,tipo: value }))
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
