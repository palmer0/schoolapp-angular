import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-mainalumno',
  templateUrl: 'mainalumno.component.html',
  styleUrls: ['mainalumno.component.css'],
})
export class Mainalumno {
  userName: string = '';
  userId: string | null = null; 
  boletines: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private cursosService: CursosService,
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.cargarBoletines(this.userId);
    if (this.userId) {
      this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(user => {
        if (user) {
          this.userName = user.nombre; 
        }
      });
    }
  }

  cargarBoletines(hijoId: string) {
    this.usuarioService.obtenerBoletinesPorHijoId(hijoId).subscribe(boletines => {
      this.boletines = boletines;
    });
  }
}
