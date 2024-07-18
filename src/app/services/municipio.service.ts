import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  constructor(private firestore: AngularFirestore) { }

  obtenerMunicipios(): Observable<string[]> {
    return this.firestore.collection('municipios').valueChanges().pipe(
      map((municipios: any[]) => municipios.map(municipio => municipio.nombre))
    );
  }
}