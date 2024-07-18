import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Rol } from '../interfaces/rol';
import { UsuariosService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  private userId: string | null = null;

  constructor(private firestore: AngularFirestore, private user: UsuariosService,
    private router: Router
  ) { }

  setUserId(userId: string) {
    this.userId = userId;
  }

  /* getUserId(): string | null {
    return this.userId;
  }
 */
  login(email: string, password: string): Observable<any> {
    return this.firestore.collection('usuarios', ref =>
      ref.where('email', '==', email).where('contrasena', '==', password)).get()
      .pipe(
        map(snapshot => {
          if (snapshot.empty) {
            return null;
          }
          const userDoc = snapshot.docs[0];
          const userData = userDoc.data();
          if (userData && typeof userData === 'object') {
            return { ...userData, id: userDoc.id };
          }
          return null;
        }),
        catchError(() => of(null))
      );
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  addSolicitud(formulario: any) {
    this.firestore.collection('presentacion').add(formulario)
      .then(() => {
        alert('Mensaje enviado, recibirá una respuesta lo antes posible');
        
      })
      .catch(error => {
        console.error('Error al agregar datos a Firestore: ', error);
      });
  }
}


