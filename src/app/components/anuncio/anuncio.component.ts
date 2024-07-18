import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-anuncio',
  templateUrl: 'anuncio.component.html',
  styleUrls: ['anuncio.component.css'],
})
export class Anuncio {
  @Input()
  button: string = '';
  @Input()
  titulo: string = '';
  @Input()
  enviador: string = '';
  @Input()
  contenido: string = '';
  constructor() {}
}
