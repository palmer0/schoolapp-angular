import { Component } from '@angular/core'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import { Anuncio } from 'src/app/interfaces/anuncio';
import { TablonanunciosService } from 'src/app/services/tablonanuncios.service';
import { UsuariosService } from 'src/app/services/usuario.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tablonanuncios',
  templateUrl: 'tablonanuncios.component.html',
  styleUrls: ['tablonanuncios.component.css'],
})
export class Tablonanuncios {
  userId: string | null = null;
  anuncios: Anuncio[] = [];
  anunciosCurso: Anuncio[] = [];
  anunciosTotales: Anuncio[] = [];
  rolAlumno: string | null = null;
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

  constructor(
    private route: ActivatedRoute,
    private tabloanunciosService: TablonanunciosService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');

    this.tabloanunciosService.obtenerRoles().subscribe(
      (data: string[]) => {
        this.destinatarios = data;
        this.createForm();
      },
      (error) => {
        console.error('Error al obtener roles', error);
      }
    );

    if (this.userId) {
      this.usuariosService.obtenerUsuarioPorId(this.userId).subscribe(alumno => {
        this.rolAlumno = alumno.rol;
        this.tabloanunciosService.obtenerAnunciosPorUsuarioRol(this.rolAlumno).subscribe(anuncios => {
          this.anuncios = anuncios;
        });

        if (this.rolAlumno === 'alumno') {
          console.log(alumno.curso, alumno.grupo);
          this.tabloanunciosService.obtenerAnunciosPorUsuarioCursoYGrupo(alumno.curso, alumno.grupo).subscribe(
            (anunciosCurso) => {
              console.log(anunciosCurso);
              this.anuncios = [...this.anuncios, ...anunciosCurso];
            },
            (error) => {
              console.error('Error al obtener anuncios por curso y grupo', error);
            }
          );
        }
      });
    }

  }

  createForm() {
    this.formularioAnuncio = this.formBuilder.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      enviador: ['', Validators.required],
      destinatarios: this.formBuilder.array(this.destinatarios.map(() =>
        this.formBuilder.control(false)))
    });
  }
  agregarAnuncio() {
    if (this.formularioAnuncio.valid) {
      const datosAnuncio = this.formularioAnuncio.value;
      const destinatariosSeleccionados = this.formularioAnuncio.value.destinatarios
        .map((v, i) => (v ? this.destinatarios[i] : null))
        .filter(v => v !== null);

      const datoEnviado: Anuncio = {
        id: '',  
        nombre: datosAnuncio.titulo,
        contenido: datosAnuncio.contenido,
        transmisor: datosAnuncio.enviador,
        destinatarios: destinatariosSeleccionados  
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

  get destinatariosFormArray() {
    return this.formularioAnuncio.get('destinatarios') as FormArray;
  }

  toggleNuevoAnuncioForm() {
    this.mostrarNuevoAnuncioForm = !this.mostrarNuevoAnuncioForm;
  }
}
