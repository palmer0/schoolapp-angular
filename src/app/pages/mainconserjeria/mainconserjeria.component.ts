import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainconserjeria',
  templateUrl: 'mainconserjeria.component.html',
  styleUrls: ['mainconserjeria.component.css'],
})
export class Mainconserjeria {
  userName: string = '';
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(user => {
        if (user) {
          this.userName = user.nombre; 
        }
      });
    }
  }
}
