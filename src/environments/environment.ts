// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseIP: 'https://api.sozu.com/',
  // baseUrl: 'https://api.sozu.com/api/admin/',
  baseUrl: 'https://apitest.sozu.com/api/admin/',
  socketUrl: 'https://sockettest.sozu.com',
  termConditionUrl: 'https://apitest.sozu.com/termCondition/es',
  privacyPolicyUrl: 'https://apitest.sozu.com/privacyPolicy/es',
  deviceId: 'ADMIN',
  versionCheckURL: 'https://admintest.sozu.com/version.json',

  firebase: {
    apiKey: 'AIzaSyAZMJdN4-tFi3vkKLz-c-BoFHMq7eAkoAc',
    authDomain: 'nequore-user.firebaseapp.com',
    databaseURL: 'https://nequore-user.firebaseio.com',
    projectId: 'nequore-user',
    storageBucket: 'nequore-user.appspot.com',
    messagingSenderId: '1056655786619'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
