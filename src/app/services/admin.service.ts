import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpInterceptor } from './http-interceptor';
import { CommonService } from './common.service';

@Injectable()
export class AdminService {

  private isUserLogin = false;
  public baseUrl: string = environment.baseUrl;
  public socketUrl: string = environment.socketUrl;

  public login = new BehaviorSubject({});
  loginData$ = this.login.asObservable();

  public country = new BehaviorSubject({});
  countryData$ = this.country.asObservable();

  constructor(public http: HttpInterceptor) { }

// starting of general functions
  setUserLoggedIn() { this.isUserLogin = true; }

  unsetUserLoggedIn() { this.isUserLogin = false; }

  getUserLoggedIn() { return this.isUserLogin; }


  getHeadersForLogin() {
    const headers = new Headers();
    return headers;
  }

  getHeaders() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

  getHeadersForMultipart() {
    const token = localStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

  errorHandler(error: Response) {
    console.log('error handler');
    return Observable.throw(error || 'Server error');
    // return Observable.throw(error.json() || 'Server error');
  }

  getCountries() {
    return this.http.get('assets/countries.json')
              .map(response => response.json())
              .catch(this.errorHandler);
  }
// ending of general functions


// login
  adminLogin(email, password) {
    const headers = this.getHeadersForLogin();
    const input = new FormData();
    input.append('email', email);
    input.append('password', password);

    const tt = this.getCountryLocality('getCountryLocality');

    return this.http.post(this.baseUrl + 'login', input, {headers: headers})
                .map(response => {
                  const r = response.json();
                  localStorage.setItem('token', r.data.token);
                  this.login.next(r.data);
                  return r;
                })
                .catch(this.errorHandler);
  }

  getCountryLocality(url) {
    const headers = this.getHeaders();
    const input = new FormData();
    return this.http.post(this.baseUrl + url, input, {headers: headers})
          .map(response => {
            const r = response.json();
            this.country.next(r.data);
            return r;
          })
          .catch(this.errorHandler);
  }

  logoutApi() {
    const headers = this.getHeaders();
    return this.http.put(this.baseUrl + 'logout', {headers: headers})
              // .map(response => {response.json(); })
              .map((res: Response) => {
                this.http.loader.next({value: false});
                return res.json();
              })
              .catch(this.errorHandler);
  }

  getDataApi(url) {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + url, {headers: headers})
              // .map(response => response.json())
              .map((res: Response) => {
                this.http.loader.next({value: false});
                return res.json();
              })
              .catch(this.errorHandler);
  }

  putDataApi(url, input) {
    const headers = this.getHeadersForMultipart();
    return this.http.put(this.baseUrl + url, input, {headers: headers})
          // .map(response => response.json())
          .map((res: Response) => {
            this.http.loader.next({value: false});
            return res.json();
          })
          .catch(this.errorHandler);
  }

  postDataApi(url, input) {
    const headers = this.getHeadersForMultipart();
    return this.http.post(this.baseUrl + url, input, {headers: headers})
          .map((res: Response) => {
            this.http.loader.next({value: false});
            return res.json();
          })
          .catch(this.errorHandler);
  }

  deleteDataApi(url) {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + url, {headers: headers})
          // .map(response => response.json())
          .map((res: Response) => {
            this.http.loader.next({value: false});
            return res.json();
          })
          .catch(this.errorHandler);
  }
}
