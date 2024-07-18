import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainjefatura',
  templateUrl: 'mainjefatura.component.html',
  styleUrls: ['mainjefatura.component.css'],
})
export class Mainjefatura {

  userName: string = '';
  userId: string | null = null;
  rolEmpleado: string | null = null;
  combinacionesCursoGrupo: { cursoId: string, grupoId: string }[] = [];
  esjefe: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private horarioService: HorarioService,
  ) {}

  ngOnInit() {
     this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(user => {
        if (user) {
          this.userName = user.nombre; 
          this.rolEmpleado = user.rol;
          if(this.rolEmpleado = 'jefatura'){
            this.esjefe = true;
          }
        }
      });
    }

  }
  
}
