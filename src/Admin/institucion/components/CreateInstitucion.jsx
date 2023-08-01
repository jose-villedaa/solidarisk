import React from 'react'
import { Institucion } from '../models/InstitucionModel'
import { FormInstitucion } from './FormInstitucion'

export const CreateInstitucion = () => {
    return (
        <>
            <div className="container">

                <h1 style={{ textAlign: "center" }}>Crear una Institucion</h1>
                <FormInstitucion
                    institucionProp={Institucion}
                    titleButton={"Crear Institucion"}
                    editando={false}
                    option={1} />
            </div>
        </>
    )
}
