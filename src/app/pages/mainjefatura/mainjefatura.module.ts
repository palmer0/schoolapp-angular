import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mainjefatura } from './mainjefatura.component'

const routes = [
  {
    path: '',
    component: Mainjefatura,
  },
  {
    path: ':id',
    component: Mainjefatura,
  }
]

@NgModule({
  declarations: [Mainjefatura],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mainjefatura],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainjefaturaModule {}
