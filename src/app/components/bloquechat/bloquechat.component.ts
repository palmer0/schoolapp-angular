import { Component, Input, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ChatI, Mensaje } from 'src/app/interfaces/chatI'
import { ChatsService } from 'src/app/services/chats.service'

@Component({
  selector: 'app-bloquechat',
  templateUrl: 'bloquechat.component.html',
  styleUrls: ['bloquechat.component.css'],
})
export class Bloquechat {
 
  @Input()
  nombre: string = ''
  @Input()
  rol: string = ''
  @Input()
  rootClassName: string = ''
  @Input()
  imageAlt: string = 'image'
  @Input()
  foto: string = '/assets/icono_profesora-200h.png'
  @Input()
  img: string = '/assets/icono_profesora-200h.png'
  @Input()
  mensajes: Mensaje[] = [];
  @Input()
  userId: string = ''
 
  chatId: string | null = null;

  constructor(
    
  ) {}
  /* ngOnInit() {
    if (this.foto === undefined || this.foto === null){
      console.log("object");
      this.foto = '/assets/icono_profesora-200h.png';
    }
    console.log(this.foto);
  } */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.messages) {
      this.mensajes = changes.messages.currentValue;
    }
  }

  

  
}
