import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AdminService {

  private isUserLogin: boolean = false;
  public baseUrl: string = environment.baseUrl;

  loginData$ = new BehaviorSubject({});
  // loginData$: Observable<{}>;

  constructor(private http: Http) { }

// starting of general functions
  setUserLoggedIn(){ this.isUserLogin=true; }

  unsetUserLoggedIn(){ this.isUserLogin=false; }

  getUserLoggedIn(){ return this.isUserLogin; }


  getHeadersForLogin(){
    var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  getHeaders(){
    var token = localStorage.getItem('token'); 
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer '+token);
    return headers;
  }

  getHeadersForMultipart(){
    var token = localStorage.getItem('token'); 
    var headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Bearer '+token);
    return headers;
  }

  errorHandler(error: Response){
    return Observable.throw(error.json() || "Server error");
  }

  getCountries(){
    return this.http.get('assets/countries.json')
              .map(response => response.json())
              .catch(this.errorHandler);  
  }
// ending of general functions


// login
  adminLogin(email, password){
    console.log('aa')
    var headers = this.getHeadersForLogin();
    let input = new FormData();
    input.append("email", email);
    input.append("password", password);

    // this.loginData$ = this.http.post(this.baseUrl+'login', input, {headers: headers})
    //             .map(response => {
                  
    //               console.log('resp', response)
    //               var r = response.json();
    //               localStorage.setItem('token', r.data.token); 
    //               return r;
    //             })
    //             .catch(this.errorHandler);
    //             console.log('data_obc', this.loginData$)
    //             return this.loginData$

    return this.http.post(this.baseUrl+'login', input, {headers: headers})
                .map(response => {
                  
                  console.log('resp', response)
                  var r = response.json();
                  localStorage.setItem('token', r.data.token); 
                  this.loginData$ = r;
                  return r;
                })
                .catch(this.errorHandler);
  }

  logoutApi(){
    var headers = this.getHeaders();
    return this.http.put(this.baseUrl+'logout', {headers:headers})
              .map(response => {response.json();})
              .catch(this.errorHandler);
  }

  getDataApi(url){
    var headers = this.getHeaders();
    return this.http.get(this.baseUrl+url, {headers:headers})
              .map(response => response.json())
              .catch(this.errorHandler);
  }

  putDataApi(url, input){
    var headers = this.getHeadersForMultipart();
    return this.http.put(this.baseUrl+url, input, {headers:headers})
          .map(response => response.json())
          .catch(this.errorHandler);
  }

  postDataApi(url, input){
    console.log('admin', url, input)
    var headers = this.getHeadersForMultipart();
    return this.http.post(this.baseUrl+url, input, {headers:headers})
          .map(response => response.json())
          .catch(this.errorHandler);
  }

  deleteDataApi(url){
    var headers = this.getHeaders();
    return this.http.delete(this.baseUrl+url, {headers:headers})
          .map(response => response.json())
          .catch(this.errorHandler);
  }
}