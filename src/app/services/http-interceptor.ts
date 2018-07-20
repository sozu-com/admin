
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend } from "@angular/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs/Rx"
import { SweetAlertService } from "ngx-sweetalert2";
import { Router } from '@angular/router';
import { HttpErrorResponse } from "@angular/common/http"

// operators
import "rxjs/add/operator/catch"
import "rxjs/add/observable/throw"
import "rxjs/add/operator/map"

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: XHRBackend, options: RequestOptions, public http: Http, public swal: SweetAlertService, public router: Router) {
        super(backend, options)
    }

    public request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
            .catch(this.handleError)
    }

    public handleError = (error: Response) => {
            // console.log('interceptor', error);
            
            // if (error instanceof HttpErrorResponse) {
            //     console.log('erorrrrr==================', error)
            //     // this.router.navigate([ '/login' ]);
            // }
            
            // this.swal.warning({
            //         title: 'ee',
            //         text: 'sss'
            //     })
                // alert('ooooooooooooooooooooo')
        // Do messaging and error handling here
        return Observable.throw(error);
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