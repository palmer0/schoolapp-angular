import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Anuncio } from '../interfaces/anuncio';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablonanunciosService {

  constructor(private firestore: AngularFirestore) { }

  obtenerAnunciosPorUsuarioRol(userRol: string): Observable<Anuncio[]> {
    return this.firestore.collection<Anuncio>('anuncios', ref => 
      ref.where('destinatarios', 'array-contains', userRol)).valueChanges();
  }
  obtenerAnunciosPorUsuarioCursoYGrupo(cursoId: string, grupoId: string): Observable<Anuncio[]> {
    const destinatario = { cursoId, grupoId }; 

    return this.firestore.collection<Anuncio>('anuncios', ref =>
      ref.where('destinatarios', 'array-contains-any', [destinatario])
    ).valueChanges();
  }

  agregarAnuncio(anuncio: Anuncio): Observable<Anuncio> {
    return new Observable(observer => {
      this.firestore.collection('anuncios').add(anuncio).then(docRef => {
        observer.next({ ...anuncio, id: docRef.id });
        observer.complete();
      }).catch(error => observer.error(error));
    });
  }

  obtenerRoles(): Observable<string[]> {
    return this.firestore.collection('roles').valueChanges().pipe(
      map((roles: any[]) => 
        roles
          .filter(rol => rol.nombre !== 'administracion') 
          .map(rol => rol.nombre) 
      )
    );
  }
}
