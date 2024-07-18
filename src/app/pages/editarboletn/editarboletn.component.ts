import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-editarboletn',
  templateUrl: 'editarboletn.component.html',
  styleUrls: ['editarboletn.component.css'],
})
export class Editarboletn {
  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Editarboletn - SchoolApp')
    this.meta.addTags([
      {
        property: 'og:title',
        content: 'Editarboletn - SchoolApp',
      },
    ])
  }
}
