import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormTipoPagoHelper";

export const FormTipoPago = ({ tipoProp, titleButton, option }) => {
    const [pago, setPago] = useState(tipoProp || {
        tipo: ""
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setPago({ ...pago });
    }, []);

    const crud = async () => {
        await sendData(pago, option);
    };
    return (
        <div style={{ marginLeft: " 10%", marginBottom: "50px" }}>
            <form onSubmit={handleSubmit(crud)}>
                <div className="form-group">
                    <label className="text-black">Tipo:</label>
                    <input
                        {...register("tipo")}
                        type="text"
                        className="form-control"
                        value={pago.tipo}
                        onChange={({ target: { value } }) =>
                            setPago(() => ({ ...pago,tipo: value }))
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
