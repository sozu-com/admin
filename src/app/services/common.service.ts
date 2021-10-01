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
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CommonService {
  itemsPerPage: any;
  flag: any;
  page: any;
  public data: Object = {};
  homeData: any = [];
  propertyData: any = [];
  items: any[] = [];
  agencies: any = [];
  collections: any = [];
  totalCollections: any = 0;
  total: any = 0; logoImageBase64: any;
  totalProperty: any = 0;
  totalAgencies: any = 0;
  totalSale: any = 0;
  paid_purchase_commision_amount: number;
  paid_agent_commision_amount: number;
  paid_collection_commision_amount: number;
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

  constructor(public admin: AdminService, private router: Router, private spinner: NgxSpinnerService, public constant: Constant, private http: HttpClient,
    private translate: TranslateService) {
    this.http.get('../../../assets/img/sozu_black.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          this.logoImageBase64 = base64data;
        }

        reader.readAsDataURL(res);
      });

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
    this.parameter.flag = 3;
    this.parameter.broker_id = 1;
    this.parameter.dash_flag = 4;
    //property
    const input = {
      itemsPerPage: 10,
      page: 1,
      flag: 3
    }
    //collection
    const test = {
      itemsPerPage: 10,
      page: 1,
      dash_flag: 4,
      flag: 1,
      is_approved: 1
    }
    // this.spinner.show()
    forkJoin([
      this.admin.postDataApi('propertyForSale', this.parameter),
      this.admin.postDataApi('projectHome', input),
      this.admin.postDataApi('propertyHome', input),
      this.admin.postDataApi('getAgencies', input),
      this.admin.postDataApi('getCollection', test),
    ]).subscribe(success => {
      this.parameter.keyword = '';
      this.spinner.hide();
      this.items = success[0].data || [];
      this.totalSale = success[0].total_count;
      localStorage.setItem('property_sale_data', JSON.stringify(this.items));
      localStorage.setItem('property_sale_total', JSON.stringify(this.totalSale));
      this.items.forEach(function (element) {
        element['price_per_square_meter'] =
          (((parseFloat(element.min_price) || 0) / (parseFloat(element.max_area) || 0)));
      });
      //project
      this.homeData = success[1].data || [];
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
      this.total = success[1].total_count;
      localStorage.setItem('project_data', JSON.stringify(this.homeData));
      localStorage.setItem('project_total', JSON.stringify(this.total));
      // //property home
      this.propertyData = success[2].data || [];
      this.propertyData.forEach(function (element) {
        if (element.id == (element.collection || {}).property_id) {
          element['avgg_price'] = (((parseFloat(element.final_price) || 0) / (parseFloat(element.max_area) || 0)));
        } else {
          element['avgg_price'] = (((parseFloat(element.min_price) || 0) / (parseFloat(element.max_area) || 0)));
        }
      });
      this.totalProperty = success[2].total_count;
      localStorage.setItem('property_data', JSON.stringify(this.propertyData));
      localStorage.setItem('property_total', JSON.stringify(this.totalProperty));
      //agencies
      this.agencies = success[3].data || [];
      this.totalAgencies = success[3].total_count;

      //incomes
      this.collections = success[4].data || [];
      this.collections.forEach(function (element) {
        element['avgg_price_per'] = (((parseFloat(element.final_price) || 0) / (parseFloat(element.final_price_per_m2) || 0)));
      });

      // fetching payment status
      for (let index = 0; index < this.collections.length; index++) {
        const element = this.collections[index];
        this.paid_purchase_commision_amount = element.paid_purchase_commision_amount;
        this.paid_agent_commision_amount = element.paid_agent_commision_amount;
        this.paid_collection_commision_amount = element.paid_collection_commision_amount;
        const dif = (element.property.final_price || 0).toFixed(2) - (element.total_deals_sum || 0).toFixed(2);
        const currency_id = element.currency_id;
        element['remaining'] = (((parseFloat(element.final_price) || 0) + (parseFloat(element.penalty) || 0)) - (parseFloat(element.total_payment_recieved) || 0));
        if (!element.total_deals_sum) {
          element.payment_status = 6;
        } else if ((dif >= 5 && currency_id == 78) || (dif >= 0.5 && currency_id == 124)) {
          element.payment_status = 6;
        } else if (element.next_payment && element.next_payment.date) {
          element.payment_status = element.collection_status;
        } else {
          element.payment_status = 5;
        }

        // fetching commissions %
        let cc_percent = 0, cc_received = 0, cc_receipt = 0, cc_invoice = 0, cc_active = 0;
        let pc_received = 0, pc_receipt = 0, pc_invoice = 0, pc_active = 0;
        let ac_receipt = 0, ac_invoice = 0, ac_active = 0;
        for (let i = 0; i < element.collection_commissions.length; i++) {
          const ele = element.collection_commissions[i];
          cc_percent = cc_percent + (ele.add_collection_commission ? ele.percent : 0);
          cc_received = cc_received + (ele.add_collection_commission ? ele.amount : 0);
          pc_received = pc_received + (ele.add_purchase_commission ? ele.purchase_comm_amount : 0);
          if (ele.add_collection_commission) {
            cc_active++;
          }
          if (ele.payment) {
            cc_receipt++;
            if (ele.payment.invoice_id) {
              cc_invoice++;
            }
          }

          if (ele.add_purchase_commission) {
            pc_active++;
          }
          if (ele.purchase_payment) {
            pc_receipt++;
            if (ele.purchase_payment.invoice_id && ele.purchase_payment.pdf_url && ele.purchase_payment.xml_url) {
              pc_invoice++;
            }
          }

          if (ele.add_agent_commission) {
            ac_active++;
          }
          if (ele.agent_payment) {
            ac_receipt++;
            if (ele.agent_payment.invoice_id) {
              ac_invoice++;
            }
          }
        }
        element['sum_pc'] = pc_received;
        element['cc_percent'] = this.numberUptoNDecimal((cc_percent / cc_active), 3);
        element['cc_received'] = element.iva_percent && element.add_iva_to_cc ?
          (cc_received + (cc_received * element.iva_percent) / 100) : cc_received;
        element['cc_receipt'] = cc_receipt == cc_active && cc_receipt != 0 ? 1 : 0;
        element['cc_invoice'] = cc_invoice == cc_active && cc_invoice != 0 ? 1 : 0;
        element['pc_received'] = element.iva_percent && element.add_iva_to_pc ?
          (pc_received + (pc_received * element.iva_percent) / 100) : pc_received;
        element['pc_receipt'] = pc_receipt == pc_active && pc_receipt != 0 ? 1 : 0;
        element['pc_invoice'] = pc_invoice == pc_active && pc_invoice != 0 ? 1 : 0;

        element['ac_receipt'] = ac_receipt == ac_active && ac_receipt != 0 ? 1 : 0;
        element['ac_invoice'] = ac_invoice == ac_active && ac_invoice != 0 ? 1 : 0;
      }
      this.totalCollections = success[4].total_count;
      localStorage.setItem('collections', JSON.stringify(this.collections));
      localStorage.setItem('collection_total', JSON.stringify(this.totalCollections));
    });
  }

  // getHomes = (): void => {
  //   this.parameter.itemsPerPage = 10;
  //   this.parameter.page = 1;
  //   this.parameter.flag = 3;
  //   forkJoin([
  //     this.admin.postDataApi('projectHome', this.parameter),
  //     this.admin.postDataApi('getAgencies', this.parameter),
  //   ]).subscribe(success => {
  //     this.homeData = success[1].data || [];
  //     (this.possessionStatuses || []).forEach(r => {
  //       (this.homeData || []).forEach(ele => {
  //         if (ele.possession_status_id == r.id) {
  //           ele['status_possion'] = r.name_en;
  //         }
  //       })
  //     });
  //     (this.all_building_types || []).forEach(r => {
  //       (this.homeData || []).forEach(ele => {
  //         if (ele.building_type_id == r.id) {
  //           ele['status_building'] = r.name_en;
  //         }
  //       })
  //     });
  //     this.homeData.forEach(function (element) {
  //       element['avgg_price'] = (((parseFloat(element.avg_price) || 0) / (parseFloat(element.avg_carpet_area) || 0)));
  //       element['avgg_price_hold'] = (((parseFloat(element.avg_price_hold) || 0) / (parseFloat(element.avg_carpet_area_hold) || 0)));
  //     });
  //     this.total = success[1].total_count;
  //     // //agencies
  //     this.agencies = success[3].data || [];
  //     this.totalAgencies = success[3].total_count;

  //   });
  // }
  numberUptoNDecimal(num: any, n: number) {
    return num ? num.toFixed(n) : 0;
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
