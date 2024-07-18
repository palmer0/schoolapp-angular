import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Boletines } from './boletines.component'

const routes = [
  {
    path: ':id',
    component: Boletines,
  },
  {
    path: ':id/:hijoId/:boletin',
    component: Boletines,
  },
  {
    path: ':id/:boletin',
    component: Boletines,
  },
]

@NgModule({
  declarations: [Boletines],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Boletines],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BoletinesModule {}
