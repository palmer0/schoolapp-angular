import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { HorarioService } from 'src/app/services/horario.service'
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { UsuariosService } from 'src/app/services/usuario.service';
import { HorarioI } from 'src/app/interfaces/horario';
import { CursosService } from 'src/app/services/cursos.service';



@Component({
  selector: 'app-plantillahorario',
  templateUrl: 'plantillahorario.component.html',
  styleUrls: ['plantillahorario.component.css'],
})
export class Plantillahorario {
  combinacionesCursoGrupo: { cursoId: string, grupoId: string }[] = [];
  seleccionCursoId: string = '1º';
  seleccionGrupoId: string = 'A';
  horarioId: string | null = null;
  filas: number[] = [1, 2, 3, 4, 5, 6];
  horarios: string[][] = [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ];

  esAdmin: boolean = false;
  userId: string | null = null; 
  constructor(
    private route: ActivatedRoute,
    private horarioService: HorarioService,
    private usuariosService: UsuariosService,
    private cursosService: CursosService,
    private firestore: AngularFirestore) {}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');

    this.usuariosService.obtenerUsuarioPorId(this.userId).subscribe(
      (empleado) => {
        if(empleado.rol === 'administracion'){
          this.esAdmin = true;
        }
      }
    )
    this.cursosService.obtenerCombinacionesCursoGrupo().subscribe(combinaciones => {
      this.combinacionesCursoGrupo = combinaciones;
      if (this.combinacionesCursoGrupo.length > 0) {
        const primeraCombinacion = this.combinacionesCursoGrupo[0];
        this.seleccionCursoId = primeraCombinacion.cursoId;
        this.seleccionGrupoId = primeraCombinacion.grupoId.toUpperCase();
        this.cargarHorario();
      }
    });
  }
  onSelectChange(event: any) {
    const seleccion = event.target.value.split(',');
    this.seleccionCursoId = seleccion[0];
    this.seleccionGrupoId = seleccion[1];
    this.cargarHorario();
  }

  cargarHorario() {
    const docId = `${this.seleccionCursoId}-${this.seleccionGrupoId}`;
    this.firestore.collection('horarios').doc(docId).get()
      .subscribe((docSnapshot) => {
        if (docSnapshot.exists) {
          const data = docSnapshot.data() as HorarioI;
          this.horarioId = data.id;
          this.horarios[0] = data.primera || ['', '', '', '', '', ''];
          this.horarios[1] = data.segunda || ['', '', '', '', '', ''];
          this.horarios[2] = data.tercera || ['', '', '', '', '', ''];
          this.horarios[3] = data.cuarta || ['', '', '', '', '', ''];
          this.horarios[4] = data.quinta || ['', '', '', '', '', ''];
          this.horarios[5] = data.sexta || ['', '', '', '', '', ''];
        } else {
          this.horarios = [
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', '']
          ];
        }
      });
  }

  guardarHorario() {
    const horarioData: HorarioI = {
      cursoId: this.seleccionCursoId,
      grupoId: this.seleccionGrupoId.toLowerCase(),
      primera: this.horarios[0],
      segunda: this.horarios[1],
      tercera: this.horarios[2],
      cuarta: this.horarios[3],
      quinta: this.horarios[4],
      sexta: this.horarios[5],
      
    };

    const docId = `${this.seleccionCursoId}-${this.seleccionGrupoId}`;
    this.horarioService.crearHorario(docId, horarioData)
      .subscribe(() => {
        console.log('Horario guardado exitosamente');
        alert('Horario guardado correctamente');
      }, (error) => {
        console.error('Error al crear el horario', error);
        alert('Error al crear el horario');
      })
      
  }
    
    /* this.firestore.collection('horarios').doc(docId).set(horarioData, { merge: true })
      .then(() => {
        console.log('Horario guardado exitosamente');
        alert('Horario guardado correctamente');
      })
      .catch(error => {
        console.error('Error al guardar el horario:', error);
      });
  } */
}
