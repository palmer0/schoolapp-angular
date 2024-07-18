import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-usuarioalumno',
  templateUrl: 'usuarioalumno.component.html',
  styleUrls: ['usuarioalumno.component.css'],
})
export class Usuarioalumno {
  @Input()
  rootClassName: string = ''
  @Input() nombre: string = '';
  @Input() curso: string = '';
  @Input() grupo: string = '';
  @Input() foto: string = '/assets/icono_profesora-200h.png'
  @Input() rol: string = '';
  constructor() {}

  ngOnInit() {
    if (this.foto === undefined ||this.foto === null){
      this.foto = '/assets/icono_profesora-200h.png';
    }
  }

}
