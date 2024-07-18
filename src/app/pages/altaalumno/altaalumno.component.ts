import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { MunicipiosService } from 'src/app/services/municipio.service';
import { UsuariosService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';


@Component({
  selector: 'app-altaalumno',
  templateUrl: 'altaalumno.component.html',
  styleUrls: ['altaalumno.component.css'],
})

export class Altaalumno {

  formularioAlumnos: FormGroup;
  formularioCurso: FormGroup;
  municipios: string[] = [];
  grupos: string[] = [];
  alumnoId: string | null = null;
  userId: string | null = null;
  esAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private municipiosService: MunicipiosService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private gruposService: GruposService
  ) {
  }


  ngOnInit() {
    this.alumnoId = this.route.snapshot.paramMap.get('alumnoId');
    this.userId = this.route.snapshot.paramMap.get('id');
    
    if (this.alumnoId === null) {
      this.usuariosService.obtenerUsuarioPorId(this.userId).subscribe(
        (usuario) => {
          if (usuario.rol === 'administracion') {
            this.esAdmin = true;
          } else {
            this.formularioCurso.patchValue(usuario);
            this.formularioAlumnos.patchValue(usuario);
          }
        }
      )
    } else if (this.alumnoId !== null && this.userId !== null) {
      this.usuariosService.obtenerUsuarioPorId(this.userId).subscribe(
        (usuario) => {
          if (usuario.rol === 'administracion') {
            this.esAdmin = true;
          }
          this.usuariosService.obtenerUsuarioPorId(this.alumnoId).subscribe(
            (alumno) => {

              this.formularioCurso.patchValue(alumno);
              this.formularioAlumnos.patchValue(alumno);
            }
          )
        },
        (error) => {
          console.error('Error al cargar los datos del alumno', error);
        }
      )
    }

    this.municipiosService.obtenerMunicipios().subscribe(
      (data: string[]) => {
        this.municipios = data;
      },
      (error) => {
        console.error('Error al obtener municipios', error);
      }
    );

    this.gruposService.obtenerGrupos().subscribe(
      (data: string[]) => {
        this.grupos = data;
      },
      (error) => {
        console.error('Error al obtener grupos', error);
      }
    );

    this.formularioAlumnos = this.formBuilder.group({
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      municipio: ['', Validators.required],
      cpostal: ['', Validators.required],
      tlf: ['', Validators.required],
      contrasena: ['', Validators.required],
      grupo: ['', Validators.required],
      nombre_padre: ['', Validators.required],
      email_padre: ['', [Validators.required, Validators.email]],
      contrasena_padre: ['', Validators.required],
      dni_padre: ['', Validators.required],
      repetidor: [false, Validators.required],
      recogida: [false, Validators.required],
      rol: ['alumno']

    });

    this.formularioCurso = this.formBuilder.group({
      curso: ['', Validators.nullValidator],
      religion1: ['', Validators.nullValidator],
      religion2: ['', Validators.nullValidator],
      religion3: ['', Validators.nullValidator],
      religion4: ['', Validators.nullValidator],
      frances4: ['', Validators.nullValidator],
    });

    this.formularioCurso.get('curso')?.valueChanges.subscribe(curso => {
      this.onCursoChange(curso);
    });

  }

  onCursoChange(curso: string): void {
    const religion1 = this.formularioCurso.get('religion1');
    const religion2 = this.formularioCurso.get('religion2');
    const religion3 = this.formularioCurso.get('religion3');
    const religion4 = this.formularioCurso.get('religion4');
    const frances4 = this.formularioCurso.get('frances4');

    if (curso === '1º') {
      religion1?.enable();
      religion2?.disable();
      religion2?.reset();
      religion3?.disable();
      religion3?.reset();
      religion4?.disable();
      religion4?.reset();
      frances4?.disable();
      frances4?.reset();
    } else if (curso === '2º') {
      religion2?.enable();
      religion1?.disable();
      religion1?.reset();
      religion3?.disable();
      religion3?.reset();
      religion4?.disable();
      religion4?.reset();
      frances4?.disable();
      frances4?.reset();
    } else if (curso === '3º') {
      religion3?.enable();
      religion2?.disable();
      religion2?.reset();
      religion1?.disable();
      religion1?.reset();
      religion4?.disable();
      religion4?.reset();
      frances4?.disable();
      frances4?.reset();
    } else if (curso === '4º') {
      religion4?.enable();
      frances4?.enable();
      religion2?.disable();
      religion2?.reset();
      religion1?.disable();
      religion1?.reset();
      religion3?.disable();
      religion3?.reset();
    }
  }
  onSubmit() {
    if (this.formularioAlumnos.valid && this.formularioCurso.valid) {
      const datosAlumno = this.formularioAlumnos.value;
      const datosCurso = this.formularioCurso.value;
      const datosCombinados: Usuario = { ...datosAlumno, ...datosCurso };

      if (this.alumnoId) {
        this.usuariosService.actualizarUsuario(this.alumnoId, datosCombinados).subscribe(
          () => {
            console.log('Los datos del alumno se han actualizado correctamente');
            alert('Los datos del alumno se han actualizado correctamente');
          },
          (error) => {
            console.error('Error al actualizar los datos del alumno', error);
            alert('Error al actualizar los datos del alumno');
          }
        );
      } else {
        this.usuariosService.agregarAlumno(datosCombinados).subscribe(
          () => {
            console.log('Alumno registrado con éxito');
            alert('Alumno registrado con éxito');
            this.formularioAlumnos.reset();
            this.formularioCurso.reset();
          },
          error => {
            console.error('Error al registrar al alumno', error);
            alert('Error al registrar al alumno');
          }
        );
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }


  darDeBajaAlumno() {
    if (this.alumnoId) {
      const confirmacion = confirm('¿Desea eliminar los datos del alumno?');
      if (confirmacion) {
        this.usuariosService.obtenerUsuarioPorId(this.alumnoId).subscribe(
          (alumno) => {
            const dniPadre = alumno.dni_padre;

            this.usuariosService.eliminarUsuario(this.alumnoId).subscribe(
              () => {
                console.log('Alumno eliminado correctamente');
                alert('Alumno eliminado correctamente');

                this.usuariosService.obtenerIdPorDniPadre(dniPadre).subscribe(
                  (padre) => {
                    this.usuariosService.obtenerUsuarioPorId(padre).subscribe(
                      (padreObj) => {
                        if (padreObj.hijos.length === 1 && padreObj.hijos[0] === this.alumnoId) {
                          this.usuariosService.eliminarUsuario(padreObj.id).subscribe(
                            () => {
                              alert('Padre eliminado correctamente');
                            },
                            (error) => {
                              alert('Error al eliminar al padre');
                            }
                          );
                        }
                      }
                    )

                  },
                  (error) => {
                    console.error('Error al obtener al padre', error);
                  }
                );

                this.router.navigate(['/buscarpersonal', this.userId]);
              },
              (error) => {
                console.error('Error al eliminar al alumno', error);
                alert('No se han podido eliminar los datos del alumno');
              }
            );
          },
          (error) => {
            console.error('Error al obtener los datos del alumno', error);
            alert('No se han podido obtener los datos del alumno');
          }
        );
      }
    }
  }
}

