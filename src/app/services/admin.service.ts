import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpInterceptor } from './http-interceptor';
import { Login, AdminACL } from './../models/login.model';
import { MessagingService } from '../fire-base/messaging.service';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from '../common/constants';
@Injectable()
export class AdminService {

  // private isUserLogin = false;
  public baseUrl: string = environment.baseUrl;
  public baseIP: string = environment.baseIP;
  public deviceId: string = environment.deviceId;
  public socketUrl: string = environment.socketUrl;
  public termConditionUrl: string = environment.termConditionUrl;
  public privacyPolicyUrl: string = environment.privacyPolicyUrl;

  public language_code: string;
  public permissions: any = {};
  public admin_acl: any = {};
  public admin_acl_array: any = [];
  public login = new BehaviorSubject({});
  loginData$ = this.login.asObservable();

  public globalSettings = new BehaviorSubject({});
  globalSettings$ = this.globalSettings.asObservable();

  public country = new BehaviorSubject({});
  countryData$ = this.country.asObservable();

  private backSource$ = new BehaviorSubject<string>('');
  userback = this.backSource$.asObservable();

  constructor(public http: HttpInterceptor,
    public msg: MessagingService,
    public loginModel: Login,
    public aclModel: AdminACL,
    private translate: TranslateService,
    private constant: Constant) { }


  getHeadersForLogin() {
    const headers = new Headers();
    return headers;
  }
  setUser(userback): void {
    this.backSource$.next(userback);
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
    console.log(error);
    // return Observable.throw(error || 'Server error');
    return throwError(error || 'There is some problem with internet');
  }

  getCountries() {
    return this.http.get('assets/countries.json')
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getCollectionsData() {
    return this.http.get('assets/data/concept-report.json')
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  getModelData() {
    return this.http.get('assets/data/model.json')
      .map(response => response.json())
      .catch(this.errorHandler);
  }

  setLanguage(language_code: string) {
    this.language_code = language_code === this.constant.language[0].code ?
      this.constant.language[0].label : this.constant.language[1].label;
    this.translate.setDefaultLang(language_code);
    localStorage.setItem('language_code', language_code);
  }
  // ending of general functions


  // login
  adminLogin(email, password) {
    const headers = this.getHeadersForLogin();
    const input = new FormData();
    input.append('email', email);
    input.append('password', password);
    input.append('device_token', this.msg.fcmTokens ? this.msg.fcmTokens : '');
    input.append('device_id', this.deviceId);
    const tt = this.getCountryLocality('getCountryLocality');

    return this.http.post(this.baseUrl + 'login', input, { headers: headers })
      .map(response => {
        const r = response.json();
        localStorage.setItem('user-id', JSON.stringify(((r || {}).data || {}).id));
        localStorage.setItem('token', r.data.token);
        this.login.next(r.data);
        this.globalSettings.next(r.data.global_settings);
        this.permissions = r.data.permissions;
        this.admin_acl_array = r.data.m;
        const dd = r.data.m.map((obj, index) => {
          const key = Object.keys(obj)[0];
          this.admin_acl[key] = obj[key];
        });
        // localStorage.setItem('permissions', r.data.permissions);
        // localStorage.setItem('admin_acl', this.admin_acl);
        return r;
      })
      .catch(this.errorHandler);

    // return new Promise((resolve: any, reject: any) => {
    //   this.http.post(this.baseUrl + 'login', input)
    //   .subscribe((response: any) => {
    //     const r = response.json();
    //     this.login.next(r.data);
    // this.globalSettings.next(r.data.global_settings);
    //     localStorage.setItem('token', r.data.token);
    //     resolve(response);
    //   }, (error: any) => {
    //     reject(error);
    //   });
    // });
  }

  adminLogin1(email, password): Observable<any[]> {
    const headers = this.getHeadersForLogin();
    const input = new FormData();
    input.append('email', email);
    input.append('password', password);
    const response1 = this.http.post(this.baseUrl + 'login', input, { headers: headers });
    const response2 = this.http.post(this.baseUrl + 'getCountryLocality', {}, { headers: headers });
    return Observable.forkJoin([response1, response2]);
  }

  getCountryLocality(url) {
    const headers = this.getHeaders();
    const input = new FormData();
    return this.http.post(this.baseUrl + url, input, { headers: headers })
      .map(response => {
        const r = response.json();
        this.country.next(r.data);
        return r;
      })
      .catch(this.errorHandler);
  }

  logoutApi() {
    const headers = this.getHeaders();
    return this.http.put(this.baseUrl + 'logout', { headers: headers })
      .map((res: Response) => {
        this.http.loader.next({ value: false });
        return res.json();
      })
      .catch(this.errorHandler);
  }

  getDataApi(url) {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + url, { headers: headers })
      .map((response: Response) => {
        const r = response.json();
        this.login.next(r.data);
        this.globalSettings.next(r.data.global_settings);
        this.permissions = r.data.permissions;
        this.admin_acl_array = r.data.m;
        const dd = r.data.m.map((obj, index) => {
          const key = Object.keys(obj)[0];
          this.admin_acl[key] = obj[key];
        });
        return response.json();
      })
      .catch(this.errorHandler);
  }

  getApi(url) {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + url, { headers: headers })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.errorHandler);
  }

  googleApi(url) {
    const headers = this.getHeaders();
    return this.http.get(url, { headers: headers })
      .map((res: Response) => {
        return res.json();
      })
      .catch(this.errorHandler);
  }

  putDataApi(url, input) {
    const headers = this.getHeadersForMultipart();
    return this.http.put(this.baseUrl + url, input, { headers: headers })
      .map((res: Response) => {
        this.http.loader.next({ value: false });
        return res.json();
      })
      .catch(this.errorHandler);
  }

  postDataApi(url, input) {
    const headers = this.getHeadersForMultipart();
    return this.http.post(this.baseUrl + url, input, { headers: headers })
      .map((res: Response) => {
        this.http.loader.next({ value: false });
        return res.json();
      })
      .catch(this.errorHandler);
  }

  generalApi(url, input) {
    const headers = this.getHeadersForMultipart();
    return this.http.post(this.baseIP + url, input, { headers: headers })
      .map((res: Response) => {
        this.http.loader.next({ value: false });
        return res.json();
      })
      .catch(this.errorHandler);
  }

  deleteDataApi(url) {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + url, { headers: headers })
      .map((res: Response) => {
        this.http.loader.next({ value: false });
        return res.json();
      })
      .catch(this.errorHandler);
  }

  getDetails(): Observable<any> {
    const headers = this.getHeadersForMultipart();
    return this.http.post(this.baseUrl + 'get-details', {}, { headers: headers })
      .map((response: Response) => {
        this.http.loader.next({ value: false });
        const r = response.json();
        localStorage.setItem('all', JSON.stringify(r));
        localStorage.setItem('user-id', JSON.stringify(((r || {}).data || {}).id));
        this.login.next(r.data);
        this.globalSettings.next(r.data.global_settings);
        this.permissions = r.data.permissions ? r.data.permissions : {};
        const aclData: any = {};
        const dd = r.data.m.map((obj, index) => {
          const key = Object.keys(obj)[0];
          this.admin_acl[key] = obj[key];
        });
        return true;
        // return Observable.of(true);
      })
      .catch(this.errorHandler);
  }

  getInvoicePdf(url): Observable<Blob> {
    const options = new RequestOptions({ responseType: ResponseContentType.Blob });
    return this.http.get(this.baseUrl + url, options)
      .map((response: Response) => {
        this.http.loader.next({ value: false });
        return response.blob();
      })
      .catch(this.errorHandler);
  }
}
