import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { CursosService } from 'src/app/services/cursos.service';
import { HorarioService } from 'src/app/services/horario.service';
import { MunicipiosService } from 'src/app/services/municipio.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-altaempleado',
  templateUrl: 'altaempleado.component.html',
  styleUrls: ['altaempleado.component.css'],
})
export class Altaempleado {
  combinacionesCursoGrupo: { cursoId: string, grupoId: string }[] = [];
  formularioEmpleados: FormGroup;
  formularioCurso: FormGroup;
  municipios: string[] = [];
  isProfesor: boolean = false;
  empleadoId: string | null = null;
  userId: string | null = null;
  esAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private municipiosService: MunicipiosService,
    private formBuilder: FormBuilder,
    private usuariosService: UsuariosService,
    private horarioService: HorarioService,
    private cursosService: CursosService
  ) {
  }

  ngOnInit() {
    this.empleadoId = this.route.snapshot.paramMap.get('empleadoId');
    this.userId = this.route.snapshot.paramMap.get('id');

    this.cursosService.obtenerCombinacionesCursoGrupo().subscribe(combinaciones => {
      this.combinacionesCursoGrupo = combinaciones;
      this.setupCursoForm();
    });

    
    if (this.userId !== null && this.empleadoId !== null){
      this.usuariosService.obtenerUsuarioPorId(this.empleadoId).subscribe(
        (empleado) => {
          this.formularioEmpleados.patchValue(empleado);
          this.formularioCurso.patchValue(empleado);
          this.esAdmin = true;
        }
      )
    } else if (this.empleadoId === null) {
      this.usuariosService.obtenerUsuarioPorId(this.userId).subscribe(
        (usuario) => {
          if (usuario.rol === 'administracion'){
            this.esAdmin = true;
          } else {
          this.formularioEmpleados.patchValue(usuario);
          this.formularioCurso.patchValue(usuario);}

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

    this.formularioEmpleados = this.formBuilder.group({
      rol: ['', Validators.required],
      nombre: ['', Validators.required],
      dni: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      municipio: ['', Validators.required],
      cpostal: ['', Validators.required],
      tlf: ['', Validators.required],
      contrasena: ['', Validators.required],
      ult_curso_trabajado: ['', Validators.required],
      ult_centro_trabajado: ['', Validators.required],
      municipio_centro: ['', Validators.required],
      departamento: [''],

    });

    this.formularioEmpleados.get('rol').valueChanges.subscribe(value => {
      this.isProfesor = value === 'profesor';
      this.toggleCheckboxes();
    });

    this.formularioCurso = this.formBuilder.group({

    });

    this.toggleCheckboxes();
  }

  setupCursoForm() {
    this.combinacionesCursoGrupo.forEach((comb, index) => {
      const controlName = `cursoGrupo${index}`;
      this.formularioCurso.addControl(controlName, new FormControl(false));
    });
  }

  toggleCheckboxes() {
    const controls = this.formularioCurso.controls;
    const rol = this.formularioEmpleados.get('rol').value;

    for (const name in controls) {
      if (controls.hasOwnProperty(name)) {
        const control = controls[name];
        if (rol === 'profesor') {
          control.enable();
        } else {
          control.disable();
        }
      }
    }
  }

  onSubmit() {
    if (this.formularioEmpleados.valid) {
      const datosEmpleados = this.formularioEmpleados.value;
      const datosCurso = this.formularioCurso.value;

      const cursosAsignados = this.combinacionesCursoGrupo
        .map((comb, index) => datosCurso[`cursoGrupo${index}`] ? comb : null)
        .filter(comb => comb !== null);

      const datosCombinados: Usuario = { ...datosEmpleados, cursosAsingnados: cursosAsignados };

      if (this.empleadoId) {
        this.usuariosService.actualizarUsuario(this.empleadoId, datosCombinados).subscribe(
          () => {
            console.log('Los datos del empleado se han actualizado correctamente');
            alert('Los datos del empleado se han actualizado correctamente');
          },
          (error) => {
            console.error('Error al actualizar los datos del empleado', error);
            alert('Error al actualizar los datos del empleado');
          }
        );
      } else {
        this.usuariosService.agregarEmpleado(datosCombinados).subscribe(
          () => {
            console.log('Empleado registrado con éxito');
            alert('Empleado registrado con éxito');
            this.formularioEmpleados.reset();
            this.resetCheckboxes();
            this.formularioCurso.reset();
          },
          error => {
            console.error('Error al registrar al empleado', error);
            alert('Error al registrar al empleado');
          }
        );
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }

  resetCheckboxes() {
    this.formularioCurso.reset();
    this.combinacionesCursoGrupo.forEach((comb, index) => {
      const controlName = `cursoGrupo${index}`;
      this.formularioCurso.get(controlName).setValue(false);
    });
  }

  darDeBajaEmpleado() {
    if (this.empleadoId) {
      const confirmacion = confirm('¿Desea eliminar los datos del empleado?');
      if (confirmacion) {
        this.usuariosService.eliminarUsuario(this.empleadoId).subscribe(
          () => {
            console.log('Empleado eliminado correctamente');
            alert('Empleado eliminado correctamente');
            this.router.navigate(['/buscarpersonal', this.userId]);
          },
          (error) => {
            console.error('Error al eliminar al empleado', error);
            alert('No se han podido eliminar los datos del empleado');
          }
        );
      }
    }
  }
}