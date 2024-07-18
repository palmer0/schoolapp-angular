import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { HorarioI } from '../interfaces/horario';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private firestore: AngularFirestore) { }

  obtenerHorarioPorCursoYGrupo(cursoId: string, grupoId: string): Observable<HorarioI[]> {
    return this.firestore.collection<HorarioI>('horarios', ref => 
      ref.where('cursoId', '==', cursoId).where('grupoId', '==', grupoId)
    ).valueChanges();
  }

  /* obtenerCombinacionesCursoGrupo(): Observable<{cursoId: string, grupoId: string}[]> {
    return this.firestore.collection('cursos').get().pipe(
      map(snapshot => {
        let combinaciones: {cursoId: string, grupoId: string}[] = [];
        snapshot.forEach(doc => {
          const data = doc.data() as any;
          const cursoId = doc.id;
          if (data.grupos && Array.isArray(data.grupos)) {
            data.grupos.forEach((grupoId: string) => {
              combinaciones.push({ cursoId, grupoId });
            });
          }
        });
        return combinaciones;
      })
    );
  } */

  crearHorario(docId: string, horarioData: HorarioI): Observable<void> {
  return from(this.firestore.collection('horarios').doc(docId).set(horarioData, { merge: true }))
  }
}
