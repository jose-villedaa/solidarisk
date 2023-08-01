import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { sendData } from "../helpers/FormTipoDonativoHelper";

export const FormTipoDonativo = ({ tipoProp, titleButton, option }) => {
    const [donativo, setDonativo] = useState(tipoProp || {
        tipoDonativo: ""
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setDonativo({ ...donativo });
    }, []);

    const crud = async () => {
        await sendData(donativo, option);
    };
    return (
        <div style={{ marginLeft: " 10%", marginBottom: "50px" }}>
            <form onSubmit={handleSubmit(crud)}>
                <div className="form-group">
                    <label className="text-black">Tipo Donativo:</label>
                    <input
                        {...register("tipoDonativo")}
                        type="text"
                        className="form-control"
                        value={donativo.tipoDonativo}
                        onChange={({ target: { value } }) =>
                            setDonativo(() => ({...donativo, tipoDonativo: value }))
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
