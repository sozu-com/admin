// import { Injectable } from '@angular/core';
// import * as firebase from 'firebase';
// import 'rxjs/add/operator/take';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// @Injectable()

// export class MessagingService {
//   messaging: any;
//   fcmTokens: any;
//   messageSource = new BehaviorSubject(null);
//   public currentMessage$ = this.messageSource.asObservable();

//   constructor() {
//     this.messaging = firebase.messaging();
//     this.getFcmToken();
//     this.receiveMessage();
//   }

//   getFcmToken() {
//     console.log(this.getFcmToken);
//     this.getPermission();
//     return this.fcmTokens;
//   }

//   getPermission() {
//     this.messaging.requestPermission()
//       .then(() => {
//         return this.messaging.getToken();
//       })
//       .then(token => {
//         console.log(token);
//         return this.fcmTokens = token;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   receiveMessage() {
//     this.messaging.onMessage((payload) => {
//       console.log(payload);
//       this.messageSource.next(payload);
//     });
//   }

// // data: {gcm.n.e: "1", google.c.a.ts: "1541227899", google.c.a.udt: "0", google.c.a.c_id: "8085243466036589618", google.c.a.e: "1", …}
// // from: "1056655786619"
// // notification: {title: "ola amigo  sdaffww eewf wef", body: "Wish you best luck dude"}
// // priority: "high"

// }

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessagingService {

  fcmTokens: any;
  currentMessage = new BehaviorSubject(null);

  constructor(
    private toastrService: ToastrService,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token;
        // this.angularFireDB.object('fcmTokens/').update(data);
      });
  }

  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    console.log('inside request permission');
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        const data = payload['data'];
        console.log('new message received. ', payload);
        const notificationTitle = data.title;
        this.toastrService.success('', notificationTitle);
        this.currentMessage.next(payload);
      });
  }
}
