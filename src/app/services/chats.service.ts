import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ChatI, Mensaje } from '../interfaces/chatI';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private firestore: AngularFirestore) { }

  getChat(userIds: string[]): Observable<ChatI | undefined> {
    return this.firestore.collection<ChatI>('chat', ref => 
      ref.where('userIds', 'array-contains', userIds[0])
    ).snapshotChanges().pipe(
      map(actions => {
        const chat = actions.map(a => {
          const data = a.payload.doc.data() as ChatI;
          const id = a.payload.doc.id;
          return { id, ...data };
        }).find(c => userIds.every(id => c.userIds.includes(id)) && c.userIds.length === userIds.length);
        return chat;
      })
    );
  }

  createChat(userIds: string[]): Promise<ChatI> {
    const newChat: Partial<ChatI> = {
      userIds,
      mensajes: []
    };
    return this.firestore.collection('chat').add(newChat).then(docRef => {
      return {
        id: docRef.id,
        ...newChat
      } as ChatI;
    });
  }

  addMessage(chatId: string, message: Mensaje): Promise<void> {
    return this.firestore.collection('chat').doc(chatId).get().toPromise().then(doc => {
      if (doc.exists) {
        const chat = doc.data() as ChatI;
        chat.mensajes.push(message);
        return this.firestore.collection('chat').doc(chatId).set(chat);
      } else {
        throw new Error('Chat no encontrado');
      }
    });
  }

  /* getMessages(chatId: string): Observable<Mensaje[]> {
    return this.firestore.collection('chat').doc(chatId).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as ChatI;
        return data ? data.mensajes : [];
      })
    );
  } */
}
