import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-menualupadres',
  templateUrl: 'menualupadres.component.html',
  styleUrls: ['menualupadres.component.css'],
})
export class Menualupadres {
  @Input()
  text13: string = '-Ver recordatorios'
  @Input()
  text12: string = 'Personal:'
  @Input()
  text4: string = 'Horario:'
  @Input()
  text9: string = '-2021/2022'
  @Input()
  text2: string = '-Nuevo chat'
  @Input()
  text10: string = 'Recordatorios:'
  @Input()
  text14: string = '-Solicitar tutoría'
  @Input()
  text132: string = '-Mi perfil'
  @Input()
  text1: string = '-Ver chats actuales'
  @Input()
  rootClassName: string = ''
  @Input()
  text11: string = '-Ver lista de recordatorios'
  @Input()
  text: string = 'Chat:'
  @Input()
  text6: string = 'Boletines de notas:'
  @Input()
  text5: string = '-Ver horario semanal'
  @Input()
  text15: string = 'Incidencias:'
  @Input()
  text3: string = '-Nuevo mensaje'
  @Input()
  text16: string = '-Ver incidencias del curso'
  @Input()
  text131: string = '-Ver tablón de anuncios'
  @Input()
  text8: string = '-2020/2021'
  @Input()
  text121: string = 'Tablón de anuncios:'
  @Input()
  text7: string = '-2019/2020'
  constructor() {}
}
