import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormTipoTrabajadorHelper";


export const FormTipoTrabajador = ({ tipoProp, titleButton, option }) => {
    const [trabajador, setTrabajador] = useState(tipoProp || {
        tipo: '',
    });
    console.log(trabajador);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setTrabajador({ ...trabajador });
    }, []);

    const crud = async () => {
        await sendData(trabajador, option);
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
                        value={trabajador.tipo}
                        onChange={({ target: { value } }) =>
                        setTrabajador(() => ({ ...trabajador , tipo: value }))
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
