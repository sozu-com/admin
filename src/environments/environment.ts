// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://45.232.252.136/api/admin/',
  // baseIP: 'http://45.232.252.136/api/',
  baseUrl: 'http://kanguroo.mx/api/admin/',
  baseIP: 'http://kanguroo.mx/api/',
  socketUrl: 'http://kanguroo.mx:8080',
  // socketUrl: 'http://45.232.252.136:8080',
  deviceId: 'ADMIN',
  // baseUrl: 'http://192.168.100.88:8500/api/admin/',
  // baseIP: 'http://192.168.100.88/api/',
  // socketUrl: 'http://192.168.100.88:8080',
  // socketUrl: 'https://kanguroo.mx:8080'
};
