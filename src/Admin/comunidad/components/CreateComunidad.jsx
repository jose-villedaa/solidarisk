import React from 'react'
import { FormComunidad } from './FormComunidad'
import { Comunidad } from '../models/ComunidadModel'

export const CreateComunidad = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear una Comunidad</h1>
                <FormComunidad comunidadProp={Comunidad} titleButton={"Crear Comunidad"}
                    option={1} />
            </div>
        </>
    )
}
