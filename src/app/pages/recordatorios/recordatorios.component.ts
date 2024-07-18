import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { RecordatorioI } from 'src/app/interfaces/recordatorioI';
import { RecordatoriosService } from 'src/app/services/recordatorios.service';

@Component({
  selector: 'app-recordatorios',
  templateUrl: 'recordatorios.component.html',
  styleUrls: ['recordatorios.component.css'],
})
export class Recordatorios {
  recordatorios: RecordatorioI[] = [];
  userId: string | null = null;
  recordatorioId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recordatoriosService: RecordatoriosService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    if (this.userId) {
      this.recordatoriosService.getRecordatoriosByUserId(this.userId).subscribe(data => {
        this.recordatorios = data;
        console.log(data);
      });
    }

  }

  
  /* eliminarRecordatorio(recordatorioId: string) {
    this.recordatoriosService.eliminarRecordatorio(recordatorioId).then(() => {
      this.recordatorios = this.recordatorios.filter(recordatorio => recordatorio.id !== recordatorioId);
    });
  } */
}
