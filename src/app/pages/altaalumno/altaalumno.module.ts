import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { ComponentsModule } from '../../components/components.module'
import { Altaalumno } from './altaalumno.component'
import { Buscaralumno } from '../buscaralumno/buscaralumno.component'

const routes = [
  { path: ':id', component: Altaalumno },
  { path: ':id/:alumnoId', component: Altaalumno },
]

@NgModule({
  declarations: [Altaalumno],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Altaalumno],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AltaalumnoModule {}
