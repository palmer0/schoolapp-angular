import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Notas } from '../interfaces/notas';

@Injectable({
  providedIn: 'root'
})
export class BoletinService {

  constructor(private firestore: AngularFirestore) { }

  obtenerNotasAlumno(userId: string): Observable<Notas[]> {
    return this.firestore.collection<Notas>('notas', ref => ref.where('userId', '==', userId)).valueChanges();
  }
}
