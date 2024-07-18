import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Buscarpersonal } from './buscarpersonal.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

const routes = [
  {
    path: ':id',
    component: Buscarpersonal,
  },
]

@NgModule({
  declarations: [Buscarpersonal],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Buscarpersonal],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BuscarpersonalModule {}
