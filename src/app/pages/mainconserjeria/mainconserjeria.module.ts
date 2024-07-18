import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mainconserjeria } from './mainconserjeria.component'

const routes = [
  {
    path: '',
    component: Mainconserjeria,
  },
  {
    path: ':id',
    component: Mainconserjeria,
  }
]

@NgModule({
  declarations: [Mainconserjeria],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mainconserjeria],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainconserjeriaModule {}
