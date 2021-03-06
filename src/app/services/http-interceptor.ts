
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend, Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IProperty } from './../common/property';
declare let swal: any;
import { environment } from '../../environments/environment';
// operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpInterceptor extends Http {
    public parameter: IProperty = {};
    public baseUrl: string = environment.baseUrl;
    public baseIP: string = environment.baseIP;
    public loader = new BehaviorSubject({});
    loaderValue$ = this.loader.asObservable();

    constructor(backend: XHRBackend,
        options: RequestOptions,
        public http: Http,
        public router: Router) {
        super(backend, options);
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        if (url['url'] === this.baseUrl + 'conversation/sendMessage' ||
            url['url'] === this.baseUrl + 'getDocumentOptions' ||
            url['url'] === this.baseUrl + 'leads/getPrefOptions') {
            this.loader.next({value: false});
        } else if (url['url'] === this.baseUrl + 'saveImage') {
            this.loader.next({value: false});
        } else if (url['url'] === this.baseUrl + 'saveVideo') {
            this.loader.next({value: false});
        } else if (url['url'] === this.baseUrl + 'saveAttachment') {
            this.loader.next({value: false});
        } else {
            this.loader.next({value: true});
        }
        return super.request(url, options)
            .catch(this.handleError);
    }

    public handleError = (error: Response) => {
        console.log('=============', error);
        this.loader.next({value: false});
        let body = error['_body'];
        body = JSON.parse(body);
        swal('Error', body.message, 'error');
        if (body.message === 'Unauthenticated.') {
            this.router.navigate(['']);
        }
        return Observable.throw(body);
    }
}







// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/operator/catch';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).catch(
//       (err: HttpErrorResponse) => {
//         if (this.router.url !== '/login' && err.status === 401) {
//           this.router.navigate(['/logout']);
//         }
//         return Observable.throw(err);
//       }
//     );
//   }
// }
