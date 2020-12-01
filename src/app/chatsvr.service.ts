import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { firestore } from 'firebase';

import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatsvrService {
  constructor(
    private afs: AngularFirestore,
   
  ) {}

  get(chatId) {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map((doc:any)  => {
           let p=doc;
           console.log(p)
           console.log(doc.payload.data())
           console.log("Logging doc from chats service")
           console.log(doc)
           return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }
// Moved to cloud auto created
  // async create(uidp) {
  //  // const { uid } = await this.auth.getUser();
  //   const { uid } =uidp;// await this.auth.getUser();
  //   const data = {
  //     uid,
  //     createdAt: Date.now(),
  //     count: 0,
  //     messages: []
  //   };

  //   const docRef = await this.afs.collection('chats').add(data);

  //   return this.router.navigate(['chats', docRef.id]);
  // }


  getUserChats(uid) {
    
      switchMap(user => {
        return this.afs
          .collection('chats', ref => ref.where('uid', '==', uid))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    
  }


  async sendMessage(chatId, content,uid) {
   // const { uid } =uid// await this.auth.getUser();

    const data = {
      count: 0,
      uid,
      content,
      createdAt:   new Date(Date.now())
    };
    console .log(data)
    if (uid) {
      const ref = this.afs.collection('chats').doc(chatId);
      return ref.update({
        messages: firestore.FieldValue.arrayUnion(data)
      });
    }
  }
  async sendMessageAll( content,uid) {
   // const { uid } =uid// await this.auth.getUser();

    const data = {
      uid,
      content,
      createdAt:   new Date(Date.now())
    };
    console .log(data)





    if (uid) {

     return this.afs.collection("chats").get().subscribe( (querySnapshot)=> {
      querySnapshot.forEach((doc)=> {
        doc.ref.update({
             messages: firestore.FieldValue.arrayUnion(data)
        });
    });
});
      // const ref = this.afs.collection('chats').doc(chatId);
      // return ref.update({
      //   messages: firestore.FieldValue.arrayUnion(data)
      // });
    }
  }
  async deleteMessage(chat, msg,uidp) {
    const { uid } =uidp// await this.auth.getUser();

    const ref = this.afs.collection('chats').doc(chat.id);
    console.log(msg);
    if (chat.uid === uid || msg.uid === uid) {
      // Allowed to delete
      delete msg.user;
      return ref.update({
        messages: firestore.FieldValue.arrayRemove(msg)
      });
    }
  }

  // joinUsers(chat$: Observable<any>) {
  //   let chat;
  //   const joinKeys = {};

  //   return chat$.pipe(
  //     switchMap(c => {
  //       // Unique User IDs
  //       chat = c;
  //       const uids = Array.from(new Set(c.messages.map(v => v.uid)));

  //       // Firestore User Doc Reads
  //       const userDocs = uids.map(u =>
  //         this.afs.doc(`users/${u}`).valueChanges()
  //       );

  //       return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map(arr => {
  //       arr.forEach(v => (joinKeys[(<any>v).uid] = v));
  //       chat.messages = chat.messages.map(v => {
  //         return { ...v, user: joinKeys[v.uid] };
  //       });

  //       return chat;
  //     })
  //   );
  // }
}
