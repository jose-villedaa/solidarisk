import React from 'react'
import { TipoPago } from '../models/TipoPagoModel'
import {  FormTipoPago } from './FormTipoPago'

export const CreateTipoPago = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Tipo</h1>
                <FormTipoPago tipoProp={TipoPago} titleButton={"Crear TipoPago"}
                    option={1} />
            </div>
        </>
    )
}
