import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { Incidencia } from 'src/app/interfaces/incidencia';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-mensajesenviados',
  templateUrl: 'mensajesenviados.component.html',
  styleUrls: ['mensajesenviados.component.css'],
})
export class Mensajesenviados {
  asignatura: string = '';
  mensaje: string = '';
  profesorNombre: string = '';
  alumnoId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private incidenciasservice: IncidenciasService

  ) {}

  ngOnInit() { 
    this.alumnoId = this.route.snapshot.paramMap.get('alumnoId');
  }

  enviarIncidencia() {
    if (this.asignatura && this.mensaje && this.profesorNombre && this.alumnoId) {
      const incidencia: Incidencia = {
        asignatura: this.asignatura,
        contenido: this.mensaje,
        profesorNombre: this.profesorNombre,
        userId: this.alumnoId
      };

      this.incidenciasservice.agregarIncidencia(incidencia).subscribe(
        () => {
          console.log('Incidencia enviada correctamente');
          alert('Incidencia enviada correctamente');
          this.asignatura = '';
          this.mensaje = '';
          this.profesorNombre = '';
        },
        error => {
          console.error('Error al enviar la incidencia', error);
          alert('Error al enviar la incidencia');
        }
      );
    } else {
      alert('Por favor, complete todos los campos');
    }
  }
}
