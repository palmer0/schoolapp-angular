import { Component, Input } from '@angular/core'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/usuario';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-alumnocurso',
  templateUrl: 'alumnocurso.component.html',
  styleUrls: ['alumnocurso.component.css'],
})
export class Alumnocurso {
  @Input()
  text: string = 'Leticia Esther Santana Robaina'
  @Input()
  userId: string = '';
  @Input()
  padreId: string = '';
  @Input()
  alumno: Usuario;
  @Input()
  cursoId: string;
  @Input()
  grupoId: string;
  mostrarIncidencia: boolean = false;
  asignatura: string = '';
  contenido: string = '';
  profesorNombre: string = '';
  
  incidenciaForm: FormGroup;
  mostrarIncidenciaDialog: boolean = false;

  constructor(private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
    private incidenciasService: IncidenciasService
  ) {}

  ngOnInit() {
    if (this.cursoId && this.grupoId) {
      this.usuariosService.obtenerIdPorDniPadre(this.alumno.dni_padre).subscribe(
        (alumnos) => {
          this.padreId = alumnos;
        },
        (error) => {
          console.error('Error al obtener los alumnos', error);
        }
      );
    }
  }

  abrirIncidencia() {
    this.mostrarIncidencia = true;
  }

  cerrarIncidencia() {
    this.mostrarIncidencia = false;
    // Limpiar los campos del formulario de incidencia si es necesario
    this.asignatura = '';
    this.contenido = '';
    this.profesorNombre = '';
  }

  enviarIncidencia() {
    // Aquí puedes realizar la lógica para enviar la incidencia al servicio o al componente cursos
    // Puedes emitir un evento hacia arriba o llamar a un método del servicio para guardar la incidencia
    console.log('Enviar incidencia:', {
      asignatura: this.asignatura,
      contenido: this.contenido,
      profesorNombre: this.profesorNombre,
      alumnoId: this.alumno.id,
      userId: this.userId
    });
    // Cerrar el cuadro de incidencia después de enviar
    this.cerrarIncidencia();
  }
 
}
