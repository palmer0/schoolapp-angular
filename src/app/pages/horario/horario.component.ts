import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { HorarioI } from 'src/app/interfaces/horario';
import { Usuario } from 'src/app/interfaces/usuario';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-horario',
  templateUrl: 'horario.component.html',
  styleUrls: ['horario.component.css'],
})
export class Horario {
  hijoId: string | null = '';
  nombreHijo: string = '';
  userId: string | null = '';
  personal: Usuario = null;
  horario: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuariosService,
    private horarioService: HorarioService
  ) {
   
  }

  ngOnInit() {
    this.hijoId = this.route.snapshot.paramMap.get('hijoId');
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.hijoId){
      this.usuarioService.obtenerUsuarioPorId(this.hijoId).subscribe(
        hijo => {
          this.nombreHijo = hijo.nombre;
          this.cargarHorario(hijo);
        }
      );
    }
    this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(
      personal => {
        this.personal = personal;
        this.cargarHorario(this.personal);
      }
    )
  }

  cargarHorario(persona: Usuario) {
    if (persona.curso && persona.grupo.toLowerCase()) { 
      this.horarioService.obtenerHorarioPorCursoYGrupo(persona.curso, persona.grupo.toLowerCase()).subscribe(
        horarios => {
          if (horarios.length > 0) {
            const horario = horarios[0];
            this.horario = [
              horario.primera,
              horario.segunda,
              horario.tercera,
              horario.cuarta,
              horario.quinta,
              horario.sexta
            ];
          }
          console.log('Horario:', this.horario);
        },
        error => {
          console.error('Error al obtener el horario:', error);
        }
      );
    } else {
      console.error('cursoId o grupoId no están definidos en el usuario.');
    }
  }
}
