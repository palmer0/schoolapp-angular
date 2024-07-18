import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Tablonanuncios } from './tablonanuncios.component'

const routes = [
  {
    path: ':id',
    component: Tablonanuncios,
  },
 /*  {
    path: ':id/:hijoId',
    component: Tablonanuncios,
  }, */
]

@NgModule({
  declarations: [Tablonanuncios],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Tablonanuncios],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TablonanunciosModule {}
