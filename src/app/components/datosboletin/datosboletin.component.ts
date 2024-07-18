import { Component, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Usuario } from 'src/app/interfaces/usuario'
import { UsuariosService } from 'src/app/services/usuario.service'

@Component({
  selector: 'app-datosboletin',
  templateUrl: 'datosboletin.component.html',
  styleUrls: ['datosboletin.component.css'],
})
export class Datosboletin {
  @Input()
  text2: string = 'Grupo: B'
  @Input()
  text9: string = 'Año escolar: 2019/2020    '
  @Input()
  text3: string = 'DNI: 45365704K'
  @Input()
  text: string = ''
  @Input()
  text6: string = 'Email alumno: robainaleti@gmail.com'
  @Input()
  text10: string = 'Tutora: Estefanía Morales De La Hoz             '
  @Input()
  text5: string = 'Dirección: Urbanización El Lasso Bloque 14 Puerta 4      '
  @Input()
  text7: string = 'Email padre/madre: duniaroma@gmail.com'
  @Input()
  text11: string = 'Número de lista:  22                 '
  @Input()
  rootClassName: string = ''
  @Input()
  text4: string = 'Código Postal: 35016'
  @Input()
  text8: string = 'Teléfono: 619613728/658792030          '
  @Input()
  text1: string = 'Curso: 4º'
  @Input()
  alumno: Usuario;
  @Input()
  cursoEscolar: string | null = '';
  userId: string | null = null;

  constructor( private route: ActivatedRoute,
    private usuarioService: UsuariosService) {}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');
    this.usuarioService.obtenerUsuarioPorId(this.userId).subscribe(
      alumno => {
        this.alumno = alumno;
        this.loadData();
      });
      

  }

  loadData() {
    console.log(this.alumno);
      this.text = 'Nombre y apellidos: ' + this.alumno.nombre;
      this.text1 = 'Curso: ' + this.alumno.curso;
      this.text2 = 'Grupo: ' + this.alumno.grupo;
      this.text3 = 'DNI: ' + this.alumno.dni;
      this.text4 = 'Código Postal: ' + this.alumno.cpostal;
      this.text5 = 'Dirección: ' + this.alumno.direccion;
      this.text6 = 'Email: ' + this.alumno.email;
      this.text7 = 'Email padre/madre: ' + this.alumno.email_padre;
      this.text8 = 'Teléfono: ' + this.alumno.tlf;
      this.text9 = 'Año Escolar: ' +  this.cursoEscolar;
  }
}
