// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // baseIP: 'http://kanguroo.mx/api/',
  // baseUrl: 'http://kanguroo.mx/api/admin/',
  baseIP: 'http://45.232.252.136:8002/',
  baseUrl: 'http://45.232.252.136:8002/api/admin/',
  socketUrl: 'http://45.232.252.136:8090',
  deviceId: 'ADMIN',

  firebase: {
    apiKey: 'AIzaSyAZMJdN4-tFi3vkKLz-c-BoFHMq7eAkoAc',
    authDomain: 'nequore-user.firebaseapp.com',
    databaseURL: 'https://nequore-user.firebaseio.com',
    projectId: 'nequore-user',
    storageBucket: 'nequore-user.appspot.com',
    messagingSenderId: '1056655786619'
  }
};
