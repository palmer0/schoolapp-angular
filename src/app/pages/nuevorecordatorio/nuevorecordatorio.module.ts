import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Nuevorecordatorio } from './nuevorecordatorio.component'
import { ReactiveFormsModule } from '@angular/forms'

const routes = [
  {
    path: '',
    component: Nuevorecordatorio,
  },
  {
    path: ':id',
    component: Nuevorecordatorio,
  },
]

@NgModule({
  declarations: [Nuevorecordatorio],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Nuevorecordatorio],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NuevorecordatorioModule {}
