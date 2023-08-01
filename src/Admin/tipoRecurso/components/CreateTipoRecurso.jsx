import React from 'react'
import { tipoRecurso } from '../models/TipoRecursoModel'
import { FormTipoRecurso } from './FormTipoRecurso'



export const CreateTipoRecurso = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Tipo</h1>
                <FormTipoRecurso tipoProp={tipoRecurso} titleButton={"Crear Tipo Recurso"}
                    option={1} />
            </div>
        </>
    )
}
