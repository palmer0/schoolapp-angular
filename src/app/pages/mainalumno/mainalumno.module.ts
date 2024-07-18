import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mainalumno } from './mainalumno.component'

const routes = [
  {
    path: '',
    component: Mainalumno,
  },
  {
    path: ':id',
    component: Mainalumno,
  }
]

@NgModule({
  declarations: [Mainalumno],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mainalumno],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainalumnoModule {}
