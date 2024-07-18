import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private user: UsuariosService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6),
        Validators.maxLength(10)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('contrasena').value;
      this.authService.login(email, password).subscribe(
        (user) => {
          console.log(user);
          if (user && user.rol) {
            this.redirectBasedOnRole(user.rol, user.id);
            this.authService.setUserId(user.id);
          } else {
            alert('Credenciales inválidas');
          }
        },
        (error) => {
          this.errorMessage = 'Invalid credentials';
          alert('Credenciales inválidas');

        }
      );
    }
  }

  redirectBasedOnRole(rol: string, userId: string) {
    const routes = {
      'administracion': `/mainadmin/${userId}`,
      'alumno': `/mainalumno/${userId}`,
      'consejeria': `/mainconserjeria/${userId}`,
      'jefatura': `/mainjefatura/${userId}`,
      'padre': `/mainpadres/${userId}`,
      'profesor': `/mainprofesores/${userId}`
    };
    const route = routes[rol] || '/login';
    this.router.navigate([route]);
  }
}
