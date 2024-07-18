import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-nuevomensaje',
  templateUrl: 'nuevomensaje.component.html',
  styleUrls: ['nuevomensaje.component.css'],
})
export class Nuevomensaje {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Nuevomensaje - SchoolApp')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Nuevomensaje - SchoolApp',
      },
    ])
  }
}
