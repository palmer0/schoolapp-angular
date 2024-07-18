import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GruposService {

  constructor(private firestore: AngularFirestore) { }

  obtenerGrupos(): Observable<string[]> {
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
}
