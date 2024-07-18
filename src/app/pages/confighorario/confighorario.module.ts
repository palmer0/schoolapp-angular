import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Confighorario } from './confighorario.component'

const routes = [
  {
    path: '',
    component: Confighorario,
  },
]

@NgModule({
  declarations: [Confighorario],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Confighorario],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfighorarioModule {}
