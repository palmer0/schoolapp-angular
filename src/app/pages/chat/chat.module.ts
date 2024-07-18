import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { ComponentsModule } from '../../components/components.module'
import { Chat } from './chat.component'

const routes = [
  {
    path: ':id/:actual',
    component: Chat,
  },
]

@NgModule({
  declarations: [Chat],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule, RouterModule.forChild(routes)],
  exports: [Chat],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChatModule {}
