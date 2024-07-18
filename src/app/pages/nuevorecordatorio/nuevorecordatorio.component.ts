import { Component } from '@angular/core'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordatorioI } from 'src/app/interfaces/recordatorioI';
import { RecordatoriosService } from 'src/app/services/recordatorios.service';


@Component({
  selector: 'app-nuevorecordatorio',
  templateUrl: 'nuevorecordatorio.component.html',
  styleUrls: ['nuevorecordatorio.component.css'],
})
export class Nuevorecordatorio {
  
  formularioRecordatorios: FormGroup;
  userId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recordatoriosService: RecordatoriosService

  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.formularioRecordatorios = this.formBuilder.group({
      mensaje: ['', Validators.required],
      userId: this.userId
    });
  }

  onSubmit() {
    if (this.formularioRecordatorios.valid) {
      console.log("datosRecordatorio");
      const datosRecordatorio = this.formularioRecordatorios.value;
      const datos: RecordatorioI = { ...datosRecordatorio };

      this.recordatoriosService.agregarRecordatorio(datos).subscribe(
        () => {
          console.log('Recordatorio creado con éxito');
          alert('Recordatorio creado');
          this.router.navigate(['/recordatorios', this.userId]);
          this.formularioRecordatorios.reset();
        },
        error => {
          console.log('Error al crear el recordatorio', error);
          alert('Error al crear el recordatorio');
        }
      );
    } else {
      alert ('Por favor introduzca un mensaje para guardar en el recordatorio');
    }
  } 
}
