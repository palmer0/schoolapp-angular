import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Prueba } from './prueba.component'

const routes = [
  {
    path: '',
    component: Prueba,
  },
]

@NgModule({
  declarations: [Prueba],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Prueba],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PruebaModule {}
