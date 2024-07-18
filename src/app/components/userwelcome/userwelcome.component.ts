import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-userwelcome',
  templateUrl: 'userwelcome.component.html',
  styleUrls: ['userwelcome.component.css'],
})
export class Userwelcome {
  @Input()
  text: string = '';
  @Input()
  rootClassName: string = ''
  constructor() {}
}
