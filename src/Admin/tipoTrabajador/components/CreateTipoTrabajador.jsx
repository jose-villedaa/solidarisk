import React from 'react'
import { tipoTrabajador } from '../models/TipoTrabajadorModel'
import { FormTipoTrabajador } from './FormTipoTrabajador'




export const CreateTipoTrabajador = () => {
    return (
        <>
            <div className="container">

                <h1 style={{textAlign: "center"}}>Crear un Tipo</h1>
                <FormTipoTrabajador tipoProp={tipoTrabajador} titleButton={"Crear Tipo Trabajador"}
                    option={1} />
            </div>
        </>
    )
}
