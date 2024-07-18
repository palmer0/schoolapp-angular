import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Mainpadres } from './mainpadres.component'

const routes = [
  {
    path: '',
    component: Mainpadres,
  },
  {
    path: ':id',
    component: Mainpadres,
  }
]

@NgModule({
  declarations: [Mainpadres],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Mainpadres],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainpadresModule {}
