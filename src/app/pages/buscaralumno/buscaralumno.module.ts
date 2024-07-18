import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ComponentsModule } from '../../components/components.module'
import { Buscaralumno } from './buscaralumno.component'
import { FormsModule } from '@angular/forms'

const routes = [
  {
    path: '',
    component: Buscaralumno,
  },
]

@NgModule({
  declarations: [Buscaralumno],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Buscaralumno],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BuscaralumnoModule {}
