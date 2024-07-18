import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ChatI, Mensaje } from 'src/app/interfaces/chatI';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ChatsService } from 'src/app/services/chats.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
})
export class Chat {
  chat: ChatI | undefined;
  userId: string;
  targetUserId: string;
  newMessageContent: string = '';
  nombreOtro: string = '';
  rolOtro: string = '';
  foto: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private chatsService: ChatsService) {
      
      this.userId = this.route.snapshot.paramMap.get('actual');
      this.targetUserId = this.route.snapshot.paramMap.get('id');

    }

    ngOnInit(){
      this.route.params.pipe(
        switchMap(params => {
          const userIds = [this.userId, this.targetUserId];
          return this.chatsService.getChat(userIds);
        })
      ).subscribe(chat => {
        if (chat) {
          this.chat = chat;
        } else {
          this.chatsService.createChat([this.userId, this.targetUserId]).then(newChat => {
            this.chat = newChat;
          });
        }
      });

      this.usuarioService.obtenerUsuarioPorId(this.targetUserId).subscribe(
        (alumno: Usuario) => {
          this.nombreOtro = alumno.nombre;
          this.rolOtro = alumno.rol;
          this.foto = alumno.foto;
        },
        error => {
          console.error('Error al obtener el alumno:', error);
        }
      );
    }
  

    sendMessage() {
      if (this.chat && this.newMessageContent.trim()) {
        const message: Mensaje = {
          userId: this.userId,
          content: this.newMessageContent,
          timestamp: new Date()
        };
        this.chatsService.addMessage(this.chat.id, message).then(() => {
          this.newMessageContent = '';
        });
      }
    }
 
}

