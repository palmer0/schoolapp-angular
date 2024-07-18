import { Component } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Anuncio } from 'src/app/interfaces/anuncio';
import { Usuario } from 'src/app/interfaces/usuario';
import { CursosService } from 'src/app/services/cursos.service';
import { HorarioService } from 'src/app/services/horario.service';
import { TablonanunciosService } from 'src/app/services/tablonanuncios.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cursos',
  templateUrl: 'cursos.component.html',
  styleUrls: ['cursos.component.css'],
})
export class Cursos {

  userId: string | null = null;
  cursoId: string | null = null;
  grupoId: string | null = null;
  alumnos: Usuario[] = [];
  incidenciaForm: FormGroup;
  mostrarIncidenciaDialog: boolean = false;
  nombrehijo: string | null = null;
  hijoId: string | null = null;
  nuevoAnuncio: Anuncio = {
    id: '',
    nombre: '',
    contenido: '',
    transmisor: '',
    destinatarios: []
  };;
  destinatarios: string[] = [];
  mostrarNuevoAnuncioForm: boolean = false;
  formularioAnuncio: FormGroup;
  esjefe: boolean = false;
  rolEmpleado: string | null = null;
  seleccionCursoId: string = '1º';
  seleccionGrupoId: string = 'A';
  combinacionesCursoGrupo: { cursoId: string, grupoId: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private tabloanunciosService: TablonanunciosService,
    private horarioService: HorarioService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private cursosService: CursosService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.cursoId = this.route.snapshot.paramMap.get('cursoId');
    this.grupoId = this.route.snapshot.paramMap.get('grupoId');
  }

  ngOnInit() {
    this.createForm();
    if (this.cursoId && this.grupoId) {
      this.usuariosService.obtenerAlumnosPorCursoYGrupo(this.cursoId, this.grupoId).subscribe(alumnos => {
        this.alumnos = alumnos;
      });
    }

    if (this.userId) {
      this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(user => {
        if (user) {
          this.rolEmpleado = user.rol;
          console.log(this.rolEmpleado);
          if(this.rolEmpleado === 'jefatura'){
            this.esjefe = true;
          }
        }
      });
    }
  

    this.cursosService.obtenerCombinacionesCursoGrupo().subscribe(combinaciones => {
      this.combinacionesCursoGrupo = combinaciones;
      if (this.combinacionesCursoGrupo.length > 0) {
        const primeraCombinacion = this.combinacionesCursoGrupo[0];
        this.seleccionCursoId = primeraCombinacion.cursoId;
        this.seleccionGrupoId = primeraCombinacion.grupoId.toUpperCase();
      }
    });
  }

  onSelectChange(event: any) {
    const seleccion = event.target.value.split(',');
    this.seleccionCursoId = seleccion[0];
    this.seleccionGrupoId = seleccion[1];
    this.usuarioService.obtenerAlumnosPorCursoYGrupo(this.seleccionCursoId, 
      this.seleccionGrupoId).subscribe(
        (alumnos) => {
          this.alumnos = alumnos;
        }
      )
  }

  createForm() {
    this.formularioAnuncio = this.formBuilder.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      enviador: ['', Validators.required],
    });
  }
  agregarAnuncio() {
    if (this.formularioAnuncio.valid) {
      const datosAnuncio = this.formularioAnuncio.value;
      const datoEnviado: any = {
        nombre: datosAnuncio.titulo,
        contenido: datosAnuncio.contenido,
        enviador: datosAnuncio.enviador,
        destinatarios: [{ cursoId: this.cursoId, grupoId: this.grupoId }]  
      };

      this.tabloanunciosService.agregarAnuncio(datoEnviado).subscribe(
        () => {
          alert('Anuncio enviado');
          this.formularioAnuncio.reset();
          this.mostrarNuevoAnuncioForm = false;
        },
        (error) => {
          console.error('Error al agregar anuncio', error);
        }
      );
    }
  }

  /* get destinatariosFormArray() {
    return this.formularioAnuncio.get('destinatarios') as FormArray;
  }
 */
  toggleNuevoAnuncioForm() {
    this.mostrarNuevoAnuncioForm = !this.mostrarNuevoAnuncioForm;
  }
}
