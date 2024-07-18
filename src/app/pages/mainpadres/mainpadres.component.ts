import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainpadres',
  templateUrl: 'mainpadres.component.html',
  styleUrls: ['mainpadres.component.css'],
})
export class Mainpadres {
  userName: string = '';
  userId: string | null = null;
  hijos: {id: string, nombre: string}[] = [];
  selectedHijoId: string | null = null;
  boletines: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuariosService,
    private cursosService: CursosService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(user => {
        if (user) {
          this.userName = user.nombre;
          if (user.hijos && user.hijos.length > 0) {
            user.hijos.forEach((hijoId: string, index: number) => {
              this.usuarioService.obtenerUsuarioPorId(hijoId).subscribe(hijo => {
                if (hijo) {
                  this.hijos.push({ id: hijoId, nombre: hijo.nombre });
                  if (!this.selectedHijoId) {
                    this.selectedHijoId = hijoId;
                    this.cargarBoletines(hijoId);
                  }
                }
              });
            });
          }
        }
      });
    }
  }

  onHijoChange(hijoId: string) {
    this.selectedHijoId = hijoId;
  }

  cargarBoletines(hijoId: string) {
    this.usuarioService.obtenerBoletinesPorHijoId(hijoId).subscribe(boletines => {
      this.boletines = boletines;
    });
  }

  navigateTo(path: string) {
    if (this.userId && this.selectedHijoId) {
      this.router.navigate([path, this.userId, this.selectedHijoId]);
    }
  }
}
