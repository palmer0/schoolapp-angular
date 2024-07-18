import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Curso } from '../interfaces/curso';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursosCollection: AngularFirestoreCollection<Curso>;
  constructor(private firestore: AngularFirestore) {
    this.cursosCollection = firestore.collection<Curso>('cursos');

   }


   obtenerCursoPorNombre(nombreCurso: string): Observable<Curso | null> {
    return this.firestore.collection<Curso>('cursos', ref => ref.where('nombre', '==', nombreCurso))
      .valueChanges()
      .pipe(
        map(cursos => cursos.length > 0 ? cursos[0] : null)
      );
  }

  obtenerCombinacionesCursoGrupo(): Observable<{cursoId: string, grupoId: string}[]> {
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
  }

  /* obtenerCursoPorNombre(nombreCurso: string): Observable<any> {
    return this.firestore.collection('cursos', ref => ref.where('nombre', '==', nombreCurso))
      .valueChanges().pipe(
        map(cursos => cursos.length > 0 ? cursos[0] : null)
      );
  } */

  
}
