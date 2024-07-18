import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mainprofesores } from './mainprofesores.component'

const routes = [
  {
    path: '',
    component: Mainprofesores,
  },
  {
    path: ':id',
    component: Mainprofesores,
  }
]

@NgModule({
  declarations: [Mainprofesores],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mainprofesores],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainprofesoresModule {}
