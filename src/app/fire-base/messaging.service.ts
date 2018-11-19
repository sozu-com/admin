import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
// import { environment } from '../../environments/environment';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class MessagingService {
  messaging: any;
  fcmTokens: any;
  messageSource = new BehaviorSubject(null);
  public currentMessage$ = this.messageSource.asObservable();

  constructor() {
    this.messaging = firebase.messaging();
    this.getFcmToken();
    this.receiveMessage();
  }

  getFcmToken() {
    // console.log(this.getFcmToken);
    this.getPermission();
    return this.fcmTokens;
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        return this.fcmTokens = token;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log(payload);
      this.messageSource.next(payload);
    });
  }

// data: {gcm.n.e: "1", google.c.a.ts: "1541227899", google.c.a.udt: "0", google.c.a.c_id: "8085243466036589618", google.c.a.e: "1", …}
// from: "1056655786619"
// notification: {title: "ola amigo  sdaffww eewf wef", body: "Wish you best luck dude"}
// priority: "high"

}


// import { Injectable } from '@angular/core';
// import { AngularFireDatabase } from 'angularfire2/database';
// import { AngularFireAuth } from 'angularfire2/auth';
// import * as firebase from 'firebase';

// import 'rxjs/add/operator/take';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// @Injectable()
// export class MessagingService {
//   messaging: any;
//   fcmTokens: any;
//   messageSource = new BehaviorSubject(null);
//   public currentMessage$ = this.messageSource.asObservable();


//   // messaging = firebase.messaging();
//   // public currentMessage = new BehaviorSubject(null);

//   constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { }


//   updateToken(token) {
//     this.afAuth.authState.take(1).subscribe(user => {
//       if (!user) { return; }

//       const data = { [user.uid]: token };
//       this.db.object('fcmTokens/').update(data);
//     });
//   }

//   getPermission() {
//       this.messaging.requestPermission()
//       .then(() => {
//         console.log('Notification permission granted.');
//         return this.messaging.getToken();
//       })
//       .then(token => {
//         console.log(token);
//         this.updateToken(token);
//       })
//       .catch((err) => {
//         console.log('Unable to get permission to notify.', err);
//       });
//     }

//     receiveMessage() {
//        this.messaging.onMessage((payload) => {
//         console.log('Message received. ', payload);
//         // this.currentMessage.next(payload);
//         this.messageSource.next(payload);
//       });

//     }
// }
