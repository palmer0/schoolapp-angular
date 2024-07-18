import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Login } from './login.component'
import { Identificacion } from 'src/app/components/identificacion/identificacion.component';

const routes = [
  {
    path: '',
    component: Login,
  },
]

@NgModule({
  declarations: [Login],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Login],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginModule {}
