import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mensajesenviados } from './mensajesenviados.component'
import { FormsModule } from '@angular/forms'

const routes = [
  {
    path: ':alumnoId/:userId',
    component: Mensajesenviados,
  },
]

@NgModule({
  declarations: [Mensajesenviados],
  imports: [CommonModule, FormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mensajesenviados],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MensajesenviadosModule {}
