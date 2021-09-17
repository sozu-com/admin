import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';
import { IProperty } from './../common/property';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;
import { forkJoin } from 'rxjs'
import { Constant } from '../common/constants';
@Injectable()
export class CommonService {

  public data: Object = {};
  homeData: any = [];
  total: any = 0;
  public selectedColumnsToShow: any = {};
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
  possessionStatuses: Array<any>;
  all_building_types: any = [];

  constructor(public admin: AdminService, private router: Router, private spinner: NgxSpinnerService, public constant: Constant,
    private translate: TranslateService) {
    this.admin.postDataApi('getBuildingTypes', { hide_blocked: 1 }).subscribe(r => {
      this.all_building_types = r.data;
    });
    this.admin.postDataApi('getPossessionStatuses', { hide_blocked: 1 }).subscribe(r => {
      this.possessionStatuses = r['data'];
    });
    this.getHomeDetails();
  }

  getHomeDetails = (): void => {
    this.parameter.itemsPerPage = 10;
    this.parameter.page = 1;
    forkJoin([
      this.admin.postDataApi('projectHome', this.parameter)
    ]).subscribe(success => {
      this.homeData = success[0].data || [];
      (this.possessionStatuses || []).forEach(r => {
        (this.homeData || []).forEach(ele => {
          if (ele.possession_status_id == r.id) {
            ele['status_possion'] = r.name_en;
          }
        })
      });
      (this.all_building_types || []).forEach(r => {
        (this.homeData || []).forEach(ele => {
          if (ele.building_type_id == r.id) {
            ele['status_building'] = r.name_en;
          }
        })
      });
      this.homeData.forEach(function (element) {
        element['avgg_price'] = (((parseFloat(element.avg_price) || 0) / (parseFloat(element.avg_carpet_area) || 0)));
        element['avgg_price_hold'] = (((parseFloat(element.avg_price_hold) || 0) / (parseFloat(element.avg_carpet_area_hold) || 0)));
      });
      this.total = success[0].total_count;
    });
  }
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
  saveAttachment1(file, id) {
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addLinkedDocument', input);
  }
  saveAttachment2(file, id) {
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addLegalEntityDocument', input);
  }
  saveAttachment7(file, id) {
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addSuppliersDocument', input);
  }
  saveAttachment3(file, id) {
    console.log(id, "saveAttachment3")
    const input = new FormData();
    input.append('attachment', file);
    input.append('id', id);
    return this.admin.postDataApi('addPropertyDocument', input);
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
