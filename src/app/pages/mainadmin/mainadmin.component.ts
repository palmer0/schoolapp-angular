import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainadmin',
  templateUrl: 'mainadmin.component.html',
  styleUrls: ['mainadmin.component.css'],
})
export class Mainadmin {
  userName: string = '';
  userId: string | null = null;
  mainAdminroute: string = '/mainadmin';
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
