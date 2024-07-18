import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-confighorario',
  templateUrl: 'confighorario.component.html',
  styleUrls: ['confighorario.component.css'],
})
export class Confighorario {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Confighorario - SchoolApp')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Confighorario - SchoolApp',
      },
    ])
  }
}
