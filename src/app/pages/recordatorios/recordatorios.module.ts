import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Recordatorios } from './recordatorios.component'

const routes = [
  {
    path: '',
    component: Recordatorios,
  },
  {
    path: ':id',
    component: Recordatorios,
  },
]

@NgModule({
  declarations: [Recordatorios],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Recordatorios],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecordatoriosModule {}
