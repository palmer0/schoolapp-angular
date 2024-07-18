import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RecordatorioI } from '../interfaces/recordatorioI';


@Injectable({
  providedIn: 'root'
})
export class RecordatoriosService {

  constructor(private firestore: AngularFirestore) { }

  getRecordatoriosByUserId(userId: string): Observable<RecordatorioI[]> {
    return this.firestore.collection('recordatorios', ref => ref.where('userId', '==', userId))
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const data = action.payload.doc.data() as RecordatorioI;
            const id = action.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  eliminarRecordatorio(recordatorioId: string): Observable<void> {
    return from(this.firestore.doc(`recordatorios/${recordatorioId}`).delete()).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  agregarRecordatorio(recordatorio: RecordatorioI): Observable<void> {
    return new Observable<void>((observer) => {
      this.firestore.collection('recordatorios').add({
        ...recordatorio
      }).then(() => {
        observer.next();
        observer.complete();
      }).catch((error) => {
        observer.error(error);
      });
    });
    
  }
}
