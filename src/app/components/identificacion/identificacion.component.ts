import { FormGroup } from '@angular/forms';
/* import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-identificacion',
  templateUrl: 'identificacion.component.html',
  styleUrls: ['identificacion.component.css'],
})
export class Identificacion {
  @Input()
  heading: string = 'Servicio de identificación'
  @Input()
  text1: string = 'Introduce tu contraseña'
  @Input()
  textinputPlaceholder1: string = '********'
  @Input()
  button: string = 'Iniciar Sesión'
  @Input()
  text: string = 'Introduce tu correo electrónico'
  @Input()
  textinputPlaceholder: string = 'micorreo@gmail.com'
  @Input()
  rootClassName: string = ''
  constructor() {}
}
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-identificacion',
  templateUrl: 'identificacion.component.html',
  styleUrls: ['identificacion.component.css']
})
export class Identificacion {
  @Input() rootClassName: string = '';
  @Input() heading: string = 'Servicio de identificación';
  @Input() text: string = 'Introducir Email';
  @Input() text1: string = 'Introducir contraseña';
  @Input() textinputPlaceholder: string = 'micorreo@gmail.com';
  @Input() textinputPlaceholder1: string = '**********';
  @Input() button: string = 'Iniciar Sesión';
  @Input() onSubmit: () => void;
  @Input() identificacionForm: FormGroup; 

  constructor() {}
}
