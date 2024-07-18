import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario';
import { ChatsService } from 'src/app/services/chats.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevochat',
  templateUrl: 'nuevochat.component.html',
  styleUrls: ['nuevochat.component.css'],
})
export class Nuevochat {
  userId: string | null = null;
  alumnosBuscados: Usuario[] = [];
  terminoBusqueda = '';
  chatId: string | null = null;

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute,
    private chatsService: ChatsService
  ) {
  }

  ngOnInit(): void {
    /* this.userId = this.route.snapshot.paramMap.get('id');
    this.usuariosService.obtenerAlumnosOrdenados().subscribe(alumnos => {
      this.alumnosBuscados = alumnos;
    }); */
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    this.loadAlumnos();
    /* this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      this.loadAlumnos();
    }); */
  }

  loadAlumnos() {
    this.usuariosService.obtenerAlumnosOrdenados().subscribe(alumnos => {
      this.alumnosBuscados = alumnos;
    });
  }

  buscarAlumnos() {
    if (this.terminoBusqueda.trim().length === 0) {
      this.loadAlumnos();
      return;
    }
    this.usuariosService.buscarAlumnosPorNombre(this.terminoBusqueda)
    .subscribe(alumnos => {
      this.alumnosBuscados = alumnos;
      }, error => {
        console.error('Error al buscar usuario:', error);
      });
  }

  /* seleccionarAlumno(usuario: Usuario) {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    } */
  
    // Intenta obtener el chat existente basado en el userId actual y el id del usuario seleccionado
   /*  this.chatsService.getOrCreateChat(this.userId, usuario.id).subscribe(
      chatId => {
        // Redirige al chat existente si ya existe uno
        this.router.navigate([`/chat/${chatId}`], { replaceUrl: true });
        this.chatId = chatId;
      },
      error => {
        console.error('Error al obtener o crear el chat:', error);
      }
    );*/
  // } 

}
