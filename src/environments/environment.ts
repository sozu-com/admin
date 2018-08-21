// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // baseUrl: 'http://192.168.100.88:8500/api/admin/'
  baseUrl: 'http://kanguroo.com.mx/api/admin/',
  socketUrl: 'http://kanguroo.com.mx:8080' // 'http://45.232.252.136/api/admin/'
};
