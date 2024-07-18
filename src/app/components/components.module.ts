import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { Usuarioalumno } from './usuarioalumno/usuarioalumno.component'
import { Headernologin } from './headernologin/headernologin.component'
import { Bloquechat } from './bloquechat/bloquechat.component'
import { Userwelcome } from './userwelcome/userwelcome.component'
import { Headerlogin } from './headerlogin/headerlogin.component'
import { Menualupadres } from './menualupadres/menualupadres.component'
import { Headerbandejaentrada } from './headerbandejaentrada/headerbandejaentrada.component'
import { Headerenviados } from './headerenviados/headerenviados.component'
import { Alumnocurso } from './alumnocurso/alumnocurso.component'
import { Recordatorio } from './recordatorio/recordatorio.component'
import { Anuncio } from './anuncio/anuncio.component'
import { Datosboletin } from './datosboletin/datosboletin.component'
import { Usuariochat } from './usuariochat/usuariochat.component'
import { Bandejanotificaciones } from './bandejanotificaciones/bandejanotificaciones.component'
import { Headerrecibidos } from './headerrecibidos/headerrecibidos.component'
import { Identificacion } from './identificacion/identificacion.component'

@NgModule({
  declarations: [
    Usuarioalumno,
    Headernologin,
    Bloquechat,
    Userwelcome,
    Headerlogin,
    Menualupadres,
    Headerbandejaentrada,
    Headerenviados,
    Alumnocurso,
    Recordatorio,
    Anuncio,
    Datosboletin,
    Usuariochat,
    Bandejanotificaciones,
    Headerrecibidos,
    // Identificacion,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    Usuarioalumno,
    Headernologin,
    Bloquechat,
    Userwelcome,
    Headerlogin,
    Menualupadres,
    Headerbandejaentrada,
    Headerenviados,
    Alumnocurso,
    Recordatorio,
    Anuncio,
    Datosboletin,
    Usuariochat,
    Bandejanotificaciones,
    Headerrecibidos,
    // Identificacion,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
