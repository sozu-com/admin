import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
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
