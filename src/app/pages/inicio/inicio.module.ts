import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Inicio } from './inicio.component'

const routes = [
  {
    path: '',
    component: Inicio,
  },
]

@NgModule({
  declarations: [Inicio],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Inicio],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InicioModule {}
