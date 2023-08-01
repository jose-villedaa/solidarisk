import React from 'react'
import { ListaUsuario } from './usuario/components/ListaUsuario'
import { CreateUsuario } from './usuario/components/CreateUsuario'
import { ListaCitas } from './citas/components/ListaCitas'
import { ListaDonacionInstitucion } from './donacionesInstitucion/components/ListaDonacionInstitucion'
import { ListaDonacionUsuario } from './donacionesUsuario/components/ListaDonacionUsuario'
import { ListaFactura } from './factura/components/ListaFactura'
import { ListaFacturaCliente } from './facturaCliente/components/ListaFacturaCliente'
import { ListaRecursoComunidad } from './recursoComunidad/components/ListaRecursoComunidad'
import { ListaTipoCita } from './tipoCita/components/ListaTipoCita'
import { CreateTipoCita } from './tipoCita/components/CreateTipoCita'
import { ListaTipoDonativo } from './tipoDonativo/components/ListaTipoDonativo'
import { CreateTipoDonativo } from './tipoDonativo/components/CreateTipoDonativo'
import { ListaTipoInstitucion } from './tipoInstitucion/components/ListaTipoInstitucion'
import { CreateTipoInstitucion } from './tipoInstitucion/components/CreateTipoInstitucion'
import { ListaTipoPago } from './tipoPago/components/ListaTipoPago'
import { CreateTipoPago } from './tipoPago/components/CreateTipoPago'
import { ListaTipoRecurso } from './tipoRecurso/components/ListaTipoRecurso'
import { CreateTipoRecurso } from './tipoRecurso/components/CreateTipoRecurso'
import { ListatipoTrabajador } from './tipoTrabajador/components/ListaTipoTrabajador'
import { CreateTipoTrabajador } from './tipoTrabajador/components/CreateTipoTrabajador'
import { NavBarAdmin } from './NavbarAdmin'

export const AppAdmin = () => {
    return (
        <div>

            <NavBarAdmin />
            <Routes>
                <Route path='/listaUsuarios' element={<ListaUsuario></ListaUsuario>}></Route>
                <Route path='/agregarUsuario' element={<CreateUsuario></CreateUsuario>}></Route>
                <Route path='/listaCitas' element={<ListaCitas></ListaCitas>}></Route>
                <Route path='/listaDonacionesInstitucion' element={<ListaDonacionInstitucion></ListaDonacionInstitucion>}></Route>
                <Route path='/listaDonacionesUsuario' element={<ListaDonacionUsuario></ListaDonacionUsuario>}></Route>
                <Route path='/listaFactura' element={<ListaFactura></ListaFactura>}></Route>
                <Route path='/listaFacturaCliente' element={<ListaFacturaCliente></ListaFacturaCliente>}></Route>
                <Route path='/listaRecursoComunidad' element={<ListaRecursoComunidad></ListaRecursoComunidad>}></Route>
                <Route path='/listaTipoCita' element={<ListaTipoCita></ListaTipoCita>}></Route>
                <Route path='/agregarTipoCita' element={<CreateTipoCita></CreateTipoCita>}></Route>
                <Route path='/listaTipoDonativo' element={<ListaTipoDonativo></ListaTipoDonativo>}></Route>
                <Route path='/agregarTipoDonativo' element={<CreateTipoDonativo></CreateTipoDonativo>}></Route>
                <Route path='/listaTipoInstitucion' element={<ListaTipoInstitucion></ListaTipoInstitucion>}></Route>
                <Route path='/agregarTipoInstitucion' element={<CreateTipoInstitucion></CreateTipoInstitucion>}></Route>
                <Route path='/listaTipoPago' element={<ListaTipoPago></ListaTipoPago>}></Route>
                <Route path='/agregarTipoPago' element={<CreateTipoPago></CreateTipoPago>}></Route>
                <Route path='/listaTipoRecurso' element={<ListaTipoRecurso></ListaTipoRecurso>}></Route>
                <Route path='/agregarTipoRecurso' element={<CreateTipoRecurso></CreateTipoRecurso>}></Route>
                <Route path='/listaTipoTrabajador' element={<ListatipoTrabajador></ListatipoTrabajador>}></Route>
                <Route path='/agregarTipoTrabajador' element={<CreateTipoTrabajador></CreateTipoTrabajador>}></Route>


                <Route path="/institucion" element={<ListaInstitucion />} />
                <Route path="/listaComunidad" element={<ListaComunidad />} />

                <Route path="/agregarInstitucion" element={<CreateInstitucion />} />
                <Route path="/agregarComunidad" element={<CreateComunidad />} />
            </Routes>

        </div>
    )
}
