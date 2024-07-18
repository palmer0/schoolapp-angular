import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-presentacion',
  templateUrl: 'presentacion.component.html',
  styleUrls: ['presentacion.component.css'],
})
export class Presentacion {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  mensaje: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    const datos: any = {
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      mensaje: this.mensaje
    };

    this.authService.addSolicitud(datos);

    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.mensaje = '';

  }
}
