import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { Incidencia } from 'src/app/interfaces/incidencia';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: 'incidencias.component.html',
  styleUrls: ['incidencias.component.css'],
})
export class Incidencias {
  incidencias: Incidencia[] = [];
  hijoId: string | null = null;
  nombreProfesor: string | null = '';
  justificacion: string = '';
  nombreHijo: string = '';
  alumnoId: string | null = null;
  mostrarBtnJustificar: boolean = true;
  esProf: boolean = false


  constructor(
    private route: ActivatedRoute,
    private incidenciaService: IncidenciasService,
    private usuarioService: UsuariosService,
  ) {}

  ngOnInit() {
    this.hijoId = this.route.snapshot.paramMap.get('hijoId');
    this.alumnoId = this.route.snapshot.paramMap.get('id');

    if(this.alumnoId){
      console.log(this.alumnoId);
      this.usuarioService.obtenerUsuarioPorId(this.alumnoId).subscribe(
        (usuario) => {
          if (usuario.rol === 'profesor' || usuario.rol === 'jefatura'){
            this.esProf = true;
            console.log(this.esProf);
          }
        }
      )
    }

    if (this.hijoId) {
      this.incidenciaService.obtenerIncidenciasPorUsuarioId(this.hijoId).subscribe(incidencias => {
        this.incidencias = incidencias.map(incidencia => ({
          ...incidencia,
          mostrarJustificacion: false 
        }));
      });
    } else if (this.alumnoId) {
        this.incidenciaService.obtenerIncidenciasPorUsuarioId(this.alumnoId).subscribe(incidencias => {
          this.incidencias = incidencias.map(incidencia => ({
            ...incidencia,
            mostrarJustificacion: false 
          }));
        });
        this.mostrarBtnJustificar = false;
    }

    if(this.hijoId){
      this.usuarioService.obtenerUsuarioPorId(this.hijoId).subscribe(
        hijo => {
          this.nombreHijo = hijo.nombre;
        }
      );
    }
  }

  mostrarJustificacion(incidencia: Incidencia) {
    this.incidencias.forEach(inc => {
      if (inc === incidencia) {
        inc.mostrarJustificacion = true;
      } else {
        inc.mostrarJustificacion = false;
      }
    });
  }

  justificarIncidencia(incidencia: Incidencia) {
    this.incidenciaService.actualizarIncidencia(incidencia.id, incidencia).subscribe(() => {
      incidencia.mostrarJustificacion = false; // Ocultar el área de justificación después de actualizar
    }, error => {
      console.error('Error al actualizar la incidencia:', error);
      // Manejar errores si es necesario
    });
  }
}
