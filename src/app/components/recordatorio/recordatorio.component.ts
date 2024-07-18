import { Component, EventEmitter, Input, Output } from '@angular/core'
import { RecordatoriosService } from 'src/app/services/recordatorios.service';
import { RecordatorioI } from 'src/app/interfaces/recordatorioI'

@Component({
  selector: 'app-recordatorio',
  templateUrl: 'recordatorio.component.html',
  styleUrls: ['recordatorio.component.css'],
})
export class Recordatorio {
  @Input()
  button: string = 'Eliminar'
  @Input()
  id: string = ''
  @Input()
  text: string = ''
  @Input()
  recordatorio: RecordatorioI
  
  constructor(private recordatorioService: RecordatoriosService) {}

  onEliminar() {
    console.log(this.recordatorio.id);
    if (this.recordatorio) {
      const confirmacion = confirm('¿Desea eliminar el recordatorio?');
      if (confirmacion) {
        this.recordatorioService.eliminarRecordatorio(this.recordatorio.id).subscribe(
          () => {
            console.log('Recordatorio eliminado correctamente');
            alert('Recordatorio eliminado correctamente');
          },
          (error) => {
            console.log('Error al eliminar el recordatorio' , error);
            alert('No se ha podido eliminar el recordatorio');
          }
        );
      }
    }
  }
}
