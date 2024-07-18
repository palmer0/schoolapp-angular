import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-headerenviados',
  templateUrl: 'headerenviados.component.html',
  styleUrls: ['headerenviados.component.css'],
})
export class Headerenviados {
  @Input()
  rootClassName: string = ''
  constructor() {}
}
