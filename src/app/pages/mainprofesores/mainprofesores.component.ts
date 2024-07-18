import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainprofesores',
  templateUrl: 'mainprofesores.component.html',
  styleUrls: ['mainprofesores.component.css'],
})
export class Mainprofesores {
  userName: string = '';
  userId: string | null = null;
  cursosAsignados: { cursoId: string, grupoId: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId ) {
      this.usuarioService.obtenerUsuarioPorId(this.userId ).subscribe(user => {
        if (user) {
          this.userName = user.nombre;
          this.cursosAsignados = user.cursosAsingnados || [];
          console.log(this.cursosAsignados);
        }
      });
    }
  }
}
