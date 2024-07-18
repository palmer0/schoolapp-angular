import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Incidencia } from '../interfaces/incidencia';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  constructor(private firestore: AngularFirestore) { }

  obtenerIncidenciasPorUsuarioId(userId: string): Observable<Incidencia[]> {
    return this.firestore.collection<Incidencia>('incidencias', ref => ref.where('userId', '==', userId)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Incidencia;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  }
  actualizarIncidencia(id: string, incidencia: Incidencia): Observable<void> {
    return from(this.firestore.doc(`incidencias/${id}`).update(incidencia));
  }

  agregarIncidencia(incidencia: Incidencia): Observable<void> {
    return new Observable((observer) => {
      this.firestore.collection('incidencias').add(incidencia).then(
        () => {
          observer.next();
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }
}
