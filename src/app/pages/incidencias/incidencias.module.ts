import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Incidencias } from './incidencias.component'

const routes = [
  {
    path: ':id',
    component: Incidencias,
  },
  {
    path: ':id/:hijoId',
    component: Incidencias,
  },
]

@NgModule({
  declarations: [Incidencias],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Incidencias],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IncidenciasModule {}
