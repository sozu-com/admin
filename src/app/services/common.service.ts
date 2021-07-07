import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { IProperty } from './../common/property';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Injectable()
export class CommonService {

  public data: Object = {};
  public country = new BehaviorSubject({});
  countryData$ = this.country.asObservable();

  public state = new BehaviorSubject({});
  stateData$ = this.country.asObservable();

  public city = new BehaviorSubject({});
  cityData$ = this.country.asObservable();

  public propertyDetails = new BehaviorSubject({});
  propertyDetailsData$ = this.propertyDetails.asObservable();

  public notificationUnreadCount = new BehaviorSubject(0);
  notificationUnreadCount$ = this.notificationUnreadCount.asObservable();

  public parameter: IProperty = {};
  constructor(public admin: AdminService, private router: Router, private spinner: NgxSpinnerService,
    private translate: TranslateService) { }


  getCountries(keyword) {

    this.spinner.show();
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.country.next(success.data);
        },
        error => {
          this.spinner.hide();
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal(this.translate.instant('swal.error'), error.message, 'error');
          }
        });
  }

  getStates(country_id, keyword) {
    this.spinner.show();
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.state.next(success.data);
        },
        error => {
          this.spinner.hide();
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal(this.translate.instant('swal.error'), error.message, 'error');
          }
        });
  }

  getCities(state_id, keyword) {
    this.spinner.show();
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    const input = new FormData();
    input.append('state_id', state_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.city.next(success.data);
        },
        error => {
          this.spinner.hide();
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal(this.translate.instant('swal.error'), error.message, 'error');
          }
        });
  }


  saveImage(file) {
    const input = new FormData();
    input.append('image', file);
    return this.admin.postDataApi('saveImage', input);
  }

  saveVideo(file, thumb) {
    const input = new FormData();
    input.append('video', file);
    input.append('thumb', thumb);
    return this.admin.postDataApi('saveVideo', input);
  }

  saveAttachment(file) {
    const input = new FormData();
    input.append('attachment', file);
    return this.admin.postDataApi('saveAttachment', input);
  }
  saveAttachment1(file,id) {
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addLinkedDocument',input);
  }
  saveAttachment2(file,id) {
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addLegalEntityDocument',input);
  }
  saveAttachment3(file,id) {
    console.log(id,"saveAttachment3")
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addPropertyDocument',input);
  }
  setPropertyDetails(data) {
    this.propertyDetails.next(data);
  }

  setData(object) {
    this.data = object;
  }

  checkAccess(key, subkey) {
    const obj = this.admin.admin_acl[key];
    return obj ? obj[subkey] : 0;
  }
}
