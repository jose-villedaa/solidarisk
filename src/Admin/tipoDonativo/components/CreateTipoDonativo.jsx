import React from 'react'
import { tipoDonativo } from '../models/TipoDonativoModel'
import { FormTipoDonativo } from './FormTipoDonativo'

export const CreateTipoDonativo = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Tipo</h1>
                <FormTipoDonativo tipoProp={tipoDonativo} titleButton={"Crear TipoDonativo"}
                    option={1} />
            </div>
        </>
    )
}
