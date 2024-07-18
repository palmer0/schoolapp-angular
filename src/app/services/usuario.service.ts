import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Usuario } from '../interfaces/usuario';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { Incidencia } from '../interfaces/incidencia';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private firestore: AngularFirestore) { }



  agregarAlumno(usuario: Usuario): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore.collection('usuarios').add(
        usuario   // Directamente del formulario
      ).then(
        (docRef) => {
          const alumnoId = docRef.id;
          this.crearPerfilPadre(usuario, alumnoId).subscribe(
            () => {
              observer.next();
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  
  agregarEmpleado(usuario: Usuario): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore.collection('usuarios').add({
        ...usuario
      }).then(
        () => {
          observer.next();
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      catchError(error => throwError(error))
    );
  }

  crearPerfilPadre(usuario: Usuario, alumnoId: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore.collection('usuarios', ref => ref.where('dni', '==', usuario.dni_padre))
        .get()
        .subscribe(querySnapshot => {
          if (querySnapshot.empty) {
            const padre = {
              nombre: usuario.nombre_padre,
              email: usuario.email_padre,
              contrasena: usuario.contrasena_padre,
              dni: usuario.dni_padre,
              rol: 'padre',
              hijos: [alumnoId]
            };

            this.firestore.collection('usuarios').add(padre).then(
              () => {
                observer.next();
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
          } else {
            const padreDoc = querySnapshot.docs[0];
            const padreData = padreDoc.data() as { hijos?: string[] };

            if (!padreData.hijos) {
              padreData.hijos = [];
            }

            if (!padreData.hijos.includes(alumnoId)) {
              padreData.hijos.push(alumnoId);
            }

            this.firestore.collection('usuarios').doc(padreDoc.id).update(padreData).then(
              () => {
                observer.next();
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
          }
        }, error => {
          observer.error(error);
        });
    });
  }


 /*  getGrupo(grupo: any): Observable<DocumentReference | null> {
    return this.firestore.collection('grupos', ref => ref.where('nombre', '==', grupo)).get()
      .pipe(
        map((querySnapshot) => {
          if (querySnapshot.size > 0) {
            return querySnapshot.docs[0].ref;
          } else {
            return null;
          }
        }),
        catchError((error) => {
          throw error;
        })
      );
  } */

/*   getRol(rol: any): Observable<DocumentReference | null> {
    return this.firestore.collection('roles', ref => ref.where('nombre', '==', rol)).get()
      .pipe(
        map((querySnapshot) => {
          if (querySnapshot.size > 0) {
            return querySnapshot.docs[0].ref;
          } else {
            return null;
          }
        }),
        catchError((error) => {
          throw error;
        })
      );
  } */
  obtenerAlumnosOrdenados(): Observable<Usuario[]> {
    return this.firestore.collection('usuarios', ref =>
      ref.where('rol', '!=', '')
        .orderBy('nombre')).snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Usuario;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
  }


  buscarAlumnosPorNombre(nombre: string): Observable<Usuario[]> {
    return this.firestore.collection('usuarios', ref =>
      ref.where('rol', '!=', 'padre')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      })),
      map(alumnos => alumnos.filter(alumno =>
        alumno.nombre.toLowerCase().includes(nombre.toLowerCase())
      ))
    );
  }

  obtenerUsuarioPorId(id: string): Observable<Usuario> {
    return this.firestore.doc<Usuario>(`usuarios/${id}`).valueChanges().pipe(
      map(alumno => {
        if (alumno) {
          return { id, ...alumno };
        } else {
          throw new Error('Usuario no encontrado');
        }
      })
    );
  }

 /*  obtenerUsuarioPorId(id: string): Observable<Usuario> {
    return this.firestore.doc<Usuario>(`usuarios/${id}`).valueChanges().pipe(
      map(usuario => {
        if (usuario) {
          return { id, ...usuario };
        } else {
          throw new Error('Empleado no encontrado');
        }
      })
    );
  } */

  actualizarUsuario(id: string, usuario: Usuario): Observable<void> {
    return from(this.firestore.doc(`usuarios/${id}`).update(usuario));
  }
  /* actualizarUsuario(id: string, usuario: Usuario): Observable<void> {
    return from(this.firestore.doc(`usuarios/${id}`).update(usuario));
  } */

  eliminarUsuario(id: string): Observable<void> {
    return from(this.firestore.doc(`usuarios/${id}`).delete()).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
  obtenerBoletinesPorHijoId(hijoId: string): Observable<string[]> {
    return this.firestore.collection('usuarios').doc(hijoId).valueChanges().pipe(
      map((hijo: any) => hijo.boletines || [])
    );
  }
  
  /* obtenerGrupos(): Observable<string[]> {
    return this.firestore.collection('grupos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        return data.nombre;
      })),
      catchError((error) => {
        throw error;
      })
    );
  }

  obtenerBoletinesPorHijoId(hijoId: string): Observable<string[]> {
    return this.firestore.collection('usuarios').doc(hijoId).valueChanges().pipe(
      map((hijo: any) => hijo.boletines || [])
    );
  } */

  /* obtenerCursoPorNombre(nombreCurso: string): Observable<any> {
    return this.firestore.collection('cursos', ref => ref.where('nombre', '==', nombreCurso))
      .valueChanges().pipe(
        map(cursos => cursos.length > 0 ? cursos[0] : null)
      );
  } */

  obtenerAlumnosPorCursoYGrupo(cursoId: string, grupoId: string): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>('usuarios', ref => 
      ref.where('rol', '==', 'alumno')
         .where('curso', '==', cursoId)
         .where('grupo', '==', grupoId)
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  obtenerIdPorDniPadre(dniPadre: string): Observable<string> {
    return this.firestore
      .collection('usuarios', (ref) => ref.where('dni', '==', dniPadre))
      .snapshotChanges()
      .pipe(
        map((changes) => {
          const doc = changes[0]?.payload.doc;
          return doc ? doc.id : null;
        })
      );
  }


}

