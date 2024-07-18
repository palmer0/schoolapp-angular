import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-headerrecibidos',
  templateUrl: 'headerrecibidos.component.html',
  styleUrls: ['headerrecibidos.component.css'],
})
export class Headerrecibidos {
  @Input()
  rootClassName: string = ''
  constructor() {}
}
