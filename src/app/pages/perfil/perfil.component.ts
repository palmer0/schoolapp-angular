import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.component.html',
  styleUrls: ['perfil.component.css'],
})
export class Perfil {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Perfil - SchoolApp')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Perfil - SchoolApp',
      },
    ])
  }
}
