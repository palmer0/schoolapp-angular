import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Nuevomensaje } from './nuevomensaje.component'

const routes = [
  {
    path: '',
    component: Nuevomensaje,
  },
]

@NgModule({
  declarations: [Nuevomensaje],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Nuevomensaje],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NuevomensajeModule {}
