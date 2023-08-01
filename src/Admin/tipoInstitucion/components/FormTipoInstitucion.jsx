import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormTipoInstitucionHelper";

export const FormTipoInstitucion = ({ tipoProp, titleButton, option }) => {
    const [institucion, setInstitucion] = useState(tipoProp || {
        nombre: ""
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setInstitucion({ ...institucion });
    }, []);

    const crud = async () => {
        await sendData(institucion, option);
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
                        value={institucion.nombre}
                        onChange={({ target: { value } }) =>
                            setInstitucion(() => ({ ...institucion, nombre: value }))
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
