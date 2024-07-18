import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-mensajesrecibidos',
  templateUrl: 'mensajesrecibidos.component.html',
  styleUrls: ['mensajesrecibidos.component.css'],
})
export class Mensajesrecibidos {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Mensajesrecibidos - SchoolApp')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Mensajesrecibidos - SchoolApp',
      },
    ])
  }
}
