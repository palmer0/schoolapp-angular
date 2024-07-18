import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-headernologin',
  templateUrl: 'headernologin.component.html',
  styleUrls: ['headernologin.component.css'],
})
export class Headernologin {
  @Input()
  imageSrc: string = '/assets/logoapp1-200w.jpeg'
  @Input()
  rootClassName: string = ''
  @Input()
  imageAlt: string = 'image'
  constructor() {}
}
