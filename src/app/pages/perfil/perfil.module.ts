import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Perfil } from './perfil.component'

const routes = [
  {
    path: '',
    component: Perfil,
  },
]

@NgModule({
  declarations: [Perfil],
  imports: [CommonModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Perfil],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PerfilModule {}
