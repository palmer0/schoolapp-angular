import { AuthService } from 'src/app/services/auth.service';
import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-usuariochat',
  templateUrl: 'usuariochat.component.html',
  styleUrls: ['usuariochat.component.css'],
})
export class Usuariochat {
  @Input()
  foto: string = '/assets/icono_profesora-200h.png'
  @Input()
  rol: string = '';
  @Input()
  rootClassName: string = ''
  @Input()
  nombre: string = '';
  @Input()
  imageAlt: string = 'image'
  @Input()
  userId: string = '';


  constructor(private route: ActivatedRoute, private authSerivce: AuthService) {
  }

  ngOnInit() {
    console.log(this.foto);
    if (this.foto === undefined || this.foto === null){
      this.foto = '/assets/icono_profesora-200h.png';
    }
  }
}
