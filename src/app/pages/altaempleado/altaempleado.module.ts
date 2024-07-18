import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Altaempleado } from './altaempleado.component'

const routes = [
  { path: ':id', component: Altaempleado },
  { path: ':id/:empleadoId', component: Altaempleado },

]

@NgModule({
  declarations: [Altaempleado],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Altaempleado],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AltaempleadoModule {}
