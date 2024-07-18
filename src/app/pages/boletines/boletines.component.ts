import { BoletinService } from './../../services/boletin.service';
import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/interfaces/curso';
import { Notas } from 'src/app/interfaces/notas';
import { Usuario } from 'src/app/interfaces/usuario';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuario.service'

@Component({
  selector: 'app-boletines',
  templateUrl: 'boletines.component.html',
  styleUrls: ['boletines.component.css'],
})
export class Boletines {
  alumno: Usuario = null;
  userId: string | null = null;
  cursoEscolar: string | null = null;
  asignaturas: string[] = [];
  curso: Curso = null;
  notas: Notas[];
  notaP: number = 0;
  notaS: number = 0;
  notaT: number = 0;
  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private cursosService: CursosService,
    private boletinService: BoletinService)
     {
   
  }

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');
    this.cursoEscolar = this.route.snapshot.paramMap.get('boletin');

    this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(
      alumno => {
        this.alumno = alumno;
        this.obtenerCurso(this.alumno.curso);
      });

      this.boletinService.obtenerNotasAlumno(this.userId).subscribe(
        notas => {
          this.notas = notas;
        },
        error => {
          console.error('Error al obtener las notas:', error);
        }
      );

  }


  obtenerCurso(curso: string) {
    console.log(curso);
    this.cursosService.obtenerCursoPorNombre(curso).subscribe(item => {
      this.curso = item;
    });
  }

}
