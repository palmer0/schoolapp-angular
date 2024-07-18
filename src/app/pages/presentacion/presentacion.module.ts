import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Presentacion } from './presentacion.component'

const routes = [
  {
    path: '',
    component: Presentacion,
  },
]

@NgModule({
  declarations: [Presentacion],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Presentacion],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PresentacionModule {}
