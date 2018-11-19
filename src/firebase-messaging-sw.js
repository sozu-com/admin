// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.12.1/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAZMJdN4-tFi3vkKLz-c-BoFHMq7eAkoAc",
  authDomain: "nequore-user.firebaseapp.com",
  databaseURL: "https://nequore-user.firebaseio.com",
  projectId: "nequore-user",
  storageBucket: "nequore-user.appspot.com",
  messagingSenderId: "1056655786619"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();


// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.
// messaging.onMessage(function(payload) {
//     console.log("Message received. ", payload);
//     // ...
// });


// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: 'https://static.wixstatic.com/media/ba7054_408d3634fed6482a9a5ace2a82b110c3%7Emv2.jpg/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/ba7054_408d3634fed6482a9a5ace2a82b110c3%7Emv2.jpg'
  };
  console.log(self.registration.showNotification(notificationTitle, notificationOptions));
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
