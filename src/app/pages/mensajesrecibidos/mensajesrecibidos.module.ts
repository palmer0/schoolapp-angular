import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mensajesrecibidos } from './mensajesrecibidos.component'

const routes = [
  {
    path: '',
    component: Mensajesrecibidos,
  },
]

@NgModule({
  declarations: [Mensajesrecibidos],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mensajesrecibidos],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MensajesrecibidosModule {}
