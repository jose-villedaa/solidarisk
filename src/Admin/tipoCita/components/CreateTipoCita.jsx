import React from 'react'
import { tipoCita } from '../models/TipoCitaModel'
import { FormTipoCita } from './FormTipoCita'

export const CreateTipoCita = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Tipo</h1>
                <FormTipoCita tipoProp={tipoCita} titleButton={"Crear TipoCita"}
                    option={1} />
            </div>
        </>
    )
}
