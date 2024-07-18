import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mainadmin } from './mainadmin.component'

const routes = [
  {
    path: '',
    component: Mainadmin,
  },
  {
    path: ':id',
    component: Mainadmin,
  },
]

@NgModule({
  declarations: [Mainadmin],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mainadmin],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainadminModule {}
