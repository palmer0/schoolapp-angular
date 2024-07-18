import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-headerbandejaentrada',
  templateUrl: 'headerbandejaentrada.component.html',
  styleUrls: ['headerbandejaentrada.component.css'],
})
export class Headerbandejaentrada {
  @Input()
  button1: string = 'Nuevo'
  @Input()
  rootClassName: string = ''
  @Input()
  text: string = 'Text'
  @Input()
  button: string = 'Enviados'
  @Input()
  heading: string = 'Bandeja de entrada'
  constructor() {}
}
