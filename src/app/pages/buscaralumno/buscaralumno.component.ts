import { Usuario } from 'src/app/interfaces/usuario';
import { Component } from '@angular/core'
import { UsuariosService } from 'src/app/services/usuario.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscaralumno',
  templateUrl: 'buscaralumno.component.html',
  styleUrls: ['buscaralumno.component.css'],
})
export class Buscaralumno {
  terminoBusqueda = '';
  alumnosBuscados: Usuario[] = [];
  constructor( 
    private usuariosService: UsuariosService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.usuariosService.obtenerAlumnosOrdenados().subscribe(alumnos => {
      this.alumnosBuscados = alumnos;
    });
  }
  buscarAlumnos() {
    if (this.terminoBusqueda.trim().length === 0) {
      this.usuariosService.obtenerAlumnosOrdenados().subscribe(alumnos => {
        this.alumnosBuscados = alumnos;
      });
      return;
    }
    this.usuariosService.buscarAlumnosPorNombre(this.terminoBusqueda)
      .subscribe(alumnos => {
        this.alumnosBuscados = alumnos;
        console.log(alumnos);
      }, error => {
        console.error('Error al buscar alumnos:', error);
      });
  }
  seleccionarAlumno(id: string) {
    this.router.navigate([`/altaalumno/${id}`]);
  }
}
