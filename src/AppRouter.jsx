import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./login/components/Login";
import { DonacionesUser } from "./donaciones-usuario/components/DonacionesUser";
import { DonacionesEconomicasUser } from "./donaciones-usuario/components/DonacionesEconomicas";
import { isComunidad, isDev, isInstitucion, isMedico, isUserAuthenticated } from "./login/helpers/loginHelper";
import { AppPrincipal } from "./principal/AppPrincipal";
import { Usuario } from "./Usuario/components/Usuario";
import { MenuInstitucion } from "./Institucion/components/MenuInstitucion";
import { CardsComunidades } from "./Institucion/components/Cards-Comunidades";
import { Comunidad } from "./Institucion/components/ComunidadPorId";
import { DonacionesEconomicasInstitucion } from "./donaciones-institucion/components/DonacionesEconomicas";
import { DonacionesRecursoInstitucion } from "./donaciones-institucion/components/DonacionesUser";
import { DonativoEleccion } from "./donaciones-institucion/components/DonativoEleccion";
import { ListaTrabajadores } from "./Institucion/components/TrabajadoresPorInstitucion";
import { MiInstitucion } from "./Institucion/components/MiInstitucion";
import { MenuComunidad } from "./Comunidad/components/MenuComunidad";
import { MiComunidad } from "./Comunidad/components/MiComunidad";
import { RecursoFaltante } from "./Comunidad/components/RecursoFaltante";
import { VistaMedico } from "./medico/components/VistaMedico";
import { CreateCita } from "./medico/components/CreateCita";
import { Calendario } from "./medico/components/Calendario";
import { CitasDisponibles } from "./Comunidad/components/CitasDisponibles";
import { PerfilMedico } from "./medico/components/PerfilMedico";
import { ListaUsuario } from "./admin/usuario/components/ListaUsuario";
import { CreateUsuario } from "./admin/usuario/components/CreateUsuario";
import { ListaCitas } from "./admin/citas/components/ListaCitas";
import { ListaDonacionInstitucion } from "./admin/donacionesInstitucion/components/ListaDonacionInstitucion";
import { ListaDonacionUsuario } from "./admin/donacionesUsuario/components/ListaDonacionUsuario";
import { ListaFactura } from "./admin/factura/components/ListaFactura";
import { ListaFacturaCliente } from "./admin/facturaCliente/components/ListaFacturaCliente";
import { ListaRecursoComunidad } from "./admin/recursoComunidad/components/ListaRecursoComunidad";
import { ListaTipoCita } from "./admin/tipoCita/components/ListaTipoCita";
import { CreateTipoCita } from "./admin/tipoCita/components/CreateTipoCita";
import { ListaTipoDonativo } from "./admin/tipoDonativo/components/ListaTipoDonativo";
import { CreateTipoDonativo } from "./admin/tipoDonativo/components/CreateTipoDonativo";
import { ListaTipoInstitucion } from "./admin/tipoInstitucion/components/ListaTipoInstitucion";
import { CreateTipoInstitucion } from "./admin/tipoInstitucion/components/CreateTipoInstitucion";
import { ListaTipoPago } from "./admin/tipoPago/components/ListaTipoPago";
import { CreateTipoPago } from "./admin/tipoPago/components/CreateTipoPago";
import { ListaTipoRecurso } from "./admin/tipoRecurso/components/ListaTipoRecurso";
import { CreateTipoRecurso } from "./admin/tipoRecurso/components/CreateTipoRecurso";
import { ListatipoTrabajador } from "./admin/tipoTrabajador/components/ListaTipoTrabajador";
import { CreateTipoTrabajador } from "./admin/tipoTrabajador/components/CreateTipoTrabajador";
import { ListaInstitucion } from "./Admin/institucion/components/ListaInstitucion";
import { CreateInstitucion } from "./Admin/institucion/components/CreateInstitucion";
import { ListaComunidad } from "./Admin/comunidad/components/ListComunidad";
import { CreateComunidad } from "./Admin/comunidad/components/CreateComunidad";
import { NavBarAdmin } from "./Admin/NavbarAdmin";
import { ListaSeguridad } from "./Admin/Seguridad/components/ListaSeguridad";
import { Notificaciones } from "./Institucion/components/Notificaciones";
import { DonativoEleccionUser } from "./donaciones-usuario/components/DonativoEleccionUser";
import { RegistroCliente } from "./registro/components/RegistroCliente";
import { MiPerfil } from "./Usuario/components/MiPerfil";

export function AppRouter() {

  return (
    <>
      {isDev() && < NavBarAdmin/>}  
      <Routes>
      <Route path='/listaUsuarios' element={isDev() ? <ListaUsuario/> : <Navigate to="/" />}></Route>
        <Route path='/agregarUsuario' element={isDev() ? <CreateUsuario></CreateUsuario> : <Navigate to="/" />}></Route>
        <Route path='/listaCitas' element={isDev() ? <ListaCitas></ListaCitas> : <Navigate to="/" />}></Route>
        <Route path='/listaDonacionesInstitucion' element={isDev() ?<ListaDonacionInstitucion></ListaDonacionInstitucion> : <Navigate to="/" />}></Route>
        <Route path='/listaDonacionesUsuario' element={isDev() ?<ListaDonacionUsuario></ListaDonacionUsuario> : <Navigate to="/" />}></Route>
        <Route path='/listaFactura' element={isDev() ?<ListaFactura></ListaFactura>: <Navigate to="/" />}></Route>
        <Route path='/listaFacturaCliente' element={isDev() ?<ListaFacturaCliente></ListaFacturaCliente>: <Navigate to="/" />}></Route>
        <Route path='/listaRecursoComunidad' element={isDev() ?<ListaRecursoComunidad></ListaRecursoComunidad>: <Navigate to="/" />}></Route>
        <Route path='/listaTipoCita' element={isDev() ?<ListaTipoCita></ListaTipoCita>: <Navigate to="/" />}></Route>
        <Route path='/agregarTipoCita' element={isDev() ?<CreateTipoCita></CreateTipoCita>: <Navigate to="/" />}></Route>
        <Route path='/listaTipoDonativo' element={isDev() ?<ListaTipoDonativo></ListaTipoDonativo>: <Navigate to="/" />}></Route>
        <Route path='/agregarTipoDonativo' element={isDev() ?<CreateTipoDonativo></CreateTipoDonativo>: <Navigate to="/" />}></Route>
        <Route path='/listaTipoInstitucion' element={isDev() ?<ListaTipoInstitucion></ListaTipoInstitucion>: <Navigate to="/" />}></Route>
        <Route path='/agregarTipoInstitucion' element={isDev() ?<CreateTipoInstitucion></CreateTipoInstitucion>: <Navigate to="/" />}></Route>
        <Route path='/listaTipoPago' element={isDev() ?<ListaTipoPago></ListaTipoPago>: <Navigate to="/" />}></Route>
        <Route path='/agregarTipoPago' element={isDev() ?<CreateTipoPago></CreateTipoPago>: <Navigate to="/" />}></Route>
        <Route path='/listaTipoRecurso' element={isDev() ?<ListaTipoRecurso></ListaTipoRecurso>: <Navigate to="/" />}></Route>
        <Route path='/agregarTipoRecurso' element={isDev() ?<CreateTipoRecurso></CreateTipoRecurso>: <Navigate to="/" />}></Route>
        <Route path='/listaTipoTrabajador' element={isDev() ?<ListatipoTrabajador></ListatipoTrabajador>: <Navigate to="/" />}></Route>
        <Route path='/agregarTipoTrabajador' element={isDev() ?<CreateTipoTrabajador></CreateTipoTrabajador>: <Navigate to="/" />}></Route>
        <Route path="/listaSeguridad" element={isDev() ?<ListaSeguridad />: <Navigate to="/" />} />
        <Route path="/institucion" element={isDev() ?<ListaInstitucion />: <Navigate to="/" />} />
        <Route path="/listaComunidad" element={isDev() ?<ListaComunidad />: <Navigate to="/" />} />
        <Route path="/agregarInstitucion" element={isDev() ?<CreateInstitucion />: <Navigate to="/" />} />
        <Route path="/agregarComunidad" element={isDev() ?<CreateComunidad />: <Navigate to="/" />} />
        <Route path="/" element={<AppPrincipal />} />
        

        {/* Ruta para Loguearse */}
        <Route path="/login" element={<Login />} />

        {/* RUTAS PARA USUARIO */}
        <Route path="/miPerfil" element={isUserAuthenticated() ? (
          <MiPerfil></MiPerfil>
        ) : (
          <Navigate to="/login"></Navigate>
        )
        }></Route>
        <Route path='/usuario' element={<Usuario />} />
        <Route path="/donaciones" element={isUserAuthenticated() ? (
          <DonacionesUser></DonacionesUser>
        ) : (
          <Navigate to="/login"></Navigate>
        )
        }>
        </Route>
        <Route path="/donaciones-economicas" element={isUserAuthenticated() ? (
          <DonacionesEconomicasUser></DonacionesEconomicasUser>
        ) : (
          <Navigate to="/login"></Navigate>
        )}>
        </Route>

        <Route path="/donacionesEleccion" element={isUserAuthenticated() ? (
          <DonativoEleccionUser></DonativoEleccionUser>
        ) : (
          <Navigate to="/login"></Navigate>
        )}>
        </Route>

          {/* RUTAS PARA INSTITUCION */}
          <Route path="/menuInstitucion" element={isInstitucion() ? <MenuInstitucion /> : <Navigate to="/" />} />
          <Route path="/comunidadesNecesitadas" element={isInstitucion() ?<CardsComunidades />: <Navigate to="/" />} />
          <Route path="/donarPorId/:id" element={isInstitucion() ?<DonativoEleccion />: <Navigate to="/" />} />
          <Route path="/comunidadPorId/:id" element={isInstitucion() ?<Comunidad />: <Navigate to="/" />} />
          <Route path="/donacionEconomica/:id" element={isInstitucion() ?<DonacionesEconomicasInstitucion />: <Navigate to="/" />} />
          <Route path="/donacionRecurso/:id" element={isInstitucion() ?<DonacionesRecursoInstitucion />: <Navigate to="/" />} />
          <Route path="/trabajadores" element={isInstitucion() ?<ListaTrabajadores />: <Navigate to="/" />} />
          <Route path="/miInstitucion" element={isInstitucion() ?<MiInstitucion />: <Navigate to="/" />} />
          <Route path="/notificaciones" element={isInstitucion() ?<Notificaciones />: <Navigate to="/" />} />


          {/* RUTAS COMUNIDAD */}
          <Route path="/menuComunidad" element={isComunidad() ? <MenuComunidad /> : <Navigate to="/" />} />
          <Route path="/miComunidad" element={isComunidad() ?  <MiComunidad /> : <Navigate to="/" />} />
          <Route path="/recursoFaltante" element={isComunidad() ?  <RecursoFaltante /> : <Navigate to="/" />} />
          <Route path="/citasDisponibles" element={isComunidad() ?  <CitasDisponibles /> : <Navigate to="/" />} />



          {/* RUTAS PARA MEDICO */}
          <Route path="/vistaMedico" element={ isMedico() ? <VistaMedico/> : <Navigate to="/" /> } />
          <Route path="/agendarCita" element={ isMedico() ? <CreateCita/> : <Navigate to="/" /> }/>
          <Route path="/calendarioCitas" element={ isMedico() ? <Calendario/> : <Navigate to="/" /> }/>
          <Route path="/miPerfilMedico" element={ isMedico() ? <PerfilMedico/> : <Navigate to="/" /> }/>



          <Route
          path="/registro"
          element={<RegistroCliente></RegistroCliente>}
        ></Route>
      </Routes>


    </>
  )
}

