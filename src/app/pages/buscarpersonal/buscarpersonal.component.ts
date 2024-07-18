import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-buscarpersonal',
  templateUrl: 'buscarpersonal.component.html',
  styleUrls: ['buscarpersonal.component.css'],
})
export class Buscarpersonal {
  terminoBusqueda = '';
  alumnosBuscados: Usuario[] = [];
  userId: string | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.usuariosService.obtenerAlumnosOrdenados().subscribe(alumnos => {
      this.alumnosBuscados = alumnos;
    });
  }
  buscarUsuarios() {
    if (this.terminoBusqueda.trim().length === 0) {
      this.usuariosService.obtenerAlumnosOrdenados().subscribe(alumnos => {
        this.alumnosBuscados = alumnos;
      });
      return;
    }
    this.usuariosService.buscarAlumnosPorNombre(this.terminoBusqueda)
    .subscribe(alumnos => {
      this.alumnosBuscados = alumnos;
      }, error => {
        console.error('Error al buscar alumnos:', error);
      });
  }

  seleccionarUsuario(usuario: Usuario) {
    if (usuario.rol === 'alumno') {
    this.router.navigate([`/altaalumno/${this.userId}/${usuario.id}`]);
  } else {
    this.router.navigate([`/altaempleado/${this.userId}/${usuario.id}`])
  }
}
}