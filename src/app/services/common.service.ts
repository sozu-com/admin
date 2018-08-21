import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { IProperty } from './../common/property';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare let swal: any;

@Injectable()
export class CommonService {


  public country = new BehaviorSubject({});
  countryData$ = this.country.asObservable();

  public state = new BehaviorSubject({});
  stateData$ = this.country.asObservable();

  public city = new BehaviorSubject({});
  cityData$ = this.country.asObservable();

  public parameter: IProperty = {};
  constructor(public admin: AdminService, private router: Router) { }


  getCountries(keyword) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.country.next(success.data);
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }

  getStates(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states', success);
          this.parameter.loading = false;
          this.state.next(success.data);
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }

  getCities(state_id, keyword) {
    this.parameter.loading = true;
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
          console.log('cities', success);
          this.parameter.loading = false;
          this.city.next(success.data);
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }


  saveImage(file) {
    const input = new FormData();
    input.append('image', file);
    return this.admin.postDataApi('saveImage', input);
  }
}
