import React from 'react'
import { tipoInstitucion } from '../models/TipoInstitucionModel'
import {  FormTipoInstitucion } from './FormTipoInstitucion'

export const CreateTipoInstitucion = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Tipo</h1>
                <FormTipoInstitucion tipoProp={tipoInstitucion} titleButton={"Crear Tipo Institucion"}
                    option={1} />
            </div>
        </>
    )
}
