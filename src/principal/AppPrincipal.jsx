import React from 'react'
import { NavBar } from './NavBar/NavBar'
import { QueSomos } from './Que Somos/QueSomos'
import { ComunidadView } from './Comunidad/ComunidadView'
import { Contacto } from './Contactanos/Contacto'
import { Footer } from './Footer/Footer'
import { Testimonios } from './Testimonios/Testimonios'

export const AppPrincipal = () => {
  return (
    <div>
      <NavBar />
      <QueSomos />
      <ComunidadView />
      <Testimonios/>
      <Contacto />
      <Footer/>
    </div>
  )
}
