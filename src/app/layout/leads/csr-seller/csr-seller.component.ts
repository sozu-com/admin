import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { Users } from '../../../models/users.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

declare let swal: any;

@Component({
  selector: 'app-csr-seller',
  templateUrl: './csr-seller.component.html',
  styleUrls: ['./csr-seller.component.css'],
  providers: [Constant]
})
export class CsrSellerComponent implements OnInit {

  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;

  public parameter: IProperty = {};
  public location: IProperty = {};
  public assign: IProperty = {};
  assignItem: any;

  items: Array<Users> = [];
  today = new Date();
  users: any = [];
  selectedUser: any;
  initSelection = false;

  dash: any = {
    lead_total: 0,
    lead_property_pending: 0,
    lead_with_property: 0,
    lead_without_property: 0
  };

  chartView: any = [];

  constructor(
    public admin: AdminService,
    private constant: Constant,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.parameter.is_selected = false;
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.route.params.subscribe(params => {
      this.parameter.assignee_id = params.id;
    });
    this.getCountries();
    this.getListing();
    this.getCSRDashBoardData();
    Object.assign(this, this.chartView);
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  onCountryChange(id) {
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;

  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id === '0') {
      return false;
    }
    this.parameter.locality_id = id;
    // this.getCsrListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.parameter.count_flag = 1;
    this.resetDates();
    this.getListing();
    this.getCSRDashBoardData();
  }

  changeFilter(key, value) {
    this.parameter[key] = value;
    this.getListing();
  }

  changeCountFlag(flag) {
    this.parameter.count_flag = flag;
    this.getListing();
  }

  getCsrListing() {
    this.initSelection = true;
    this.users = [];
    const input = new FormData();
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
    // if (this.parameter.country_id && this.parameter.country_id !== '-1') {
    //   input.append('countries', JSON.stringify([this.parameter.country_id]));
    // }

    // if (this.parameter.state_id && this.parameter.state_id !== '-1') {
    //   input.append('states', JSON.stringify([this.parameter.state_id]));
    // }

    // if (this.parameter.city_id && this.parameter.city_id !== '-1') {
    //   input.append('cities', JSON.stringify([this.parameter.city_id]));
    // }

    // if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
    //   input.append('localities', JSON.stringify([this.parameter.locality_id]));
    // }
    this.admin.postDataApi('getCsrSellers', input).subscribe(
      success => {
        console.log(success.data);
        this.users = success.data;
      });
  }

  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    // this.selectedUser = '';
    this.parameter.keyword = '';
    this.parameter.count_flag = 1;
    this.resetDates();
    this.getListing();
    this.getCSRDashBoardData();
  }

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  closeCsrListing() {
    setTimeout(() => {
      this.users = [];
    }, 200);
  }

  selectCsrUser(user) {
    this.selectedUser = user;
    this.users = [];
    this.parameter.keyword = '';
    this.initSelection = false;
    this.getListing();
    this.getCSRDashBoardData();
  }

  removeCsrUser() {
    this.selectedUser = '';
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    // this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.getListing();
    this.getCSRDashBoardData();
  }

  getCSRDashBoardData() {
    // const input = new FormData();
    // if (this.selectedUser) {
    //   input.append('assignee_id', this.selectedUser.id);
    // } else if (this.parameter.assignee_id) {
    //   input.append('assignee_id', this.parameter.assignee_id);
    // }
    // if (this.parameter.flag) {
    //   input.append('flag', this.parameter.flag.toString());
    // }
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    } else if (this.parameter.assignee_id) {
      input.assignee_id = this.parameter.assignee_id;
    }

    this.admin.postDataApi('leads/csr-seller-dash-count', input).subscribe(r => {
      console.log('dash', r);
      this.dash = r.data;
      this.chartView = [
        {
          'name': 'Lead Property pending',
          'value': parseInt(this.dash.lead_property_pending, 10)
        },
        {
          'name': 'Lead with Property',
          'value': parseInt(this.dash.lead_with_property, 10)
        },
        {
          'name': 'Lead without Property',
          'value': parseInt(this.dash.lead_without_property, 10)
        }
      ];
    });
  }

  getListing() {
    this.items = [];
    this.parameter.noResultFound = false;
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    } else if (this.parameter.assignee_id) {
      input.assignee_id = this.parameter.assignee_id;
    }
    this.spinner.show();
    this.admin.postDataApi('leads/csr-seller', input).subscribe(
      success => {
        this.spinner.hide();
        this.items = success.data;
        if (this.items.length <= 0) { this.parameter.noResultFound = true; }
        console.log(success);
        this.parameter.total = success.total_count;
      }, error => {
        this.spinner.hide();
      });
  }


  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  sort_by(sort_by_flag) {
    if (this.parameter.sort_by_flag !== sort_by_flag) {
      this.parameter.sort_by_flag = sort_by_flag;
      this.parameter.sort_by_order = 0;
    } else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
  }

  selectAll(is_selected) {
    this.parameter.is_selected = !is_selected;
    this.items.forEach(item => {
      item.selected = this.parameter.is_selected;
    });
  }

  bulkAssign() {
    // this.assign.keyword = '';
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      swal('Error', 'Please choose atleast one lead.', 'error');
      return false;
    }
    this.openAssignModel.nativeElement.click();
    // this.admin.postDataApi('getCsrSellers', {}).subscribe(
    //   success => {
    //     this.assign.items = success.data;
    //   });
  }

  getAssignListing() {
    // this.assign.items = [];
    const input = {
      keyword: this.assign.keyword
    };
    this.admin.postDataApi('getCsrSellers', input).subscribe(
      success => {
        this.assign.items = success.data;
      });
  }

  assignNow() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    const input = {
      csr_seller_id: this.assignItem.id,
      leads: leads_ids
    };
    this.spinner.show();
    this.admin.postDataApi('leads/bulkAssignSeller', input).subscribe(r => {
      this.spinner.hide();
      swal('Success', 'Assigned successfully', 'success');
      this.closeAssignModel.nativeElement.click();
      console.log(r);
      this.getListing();
    },
      error => {
        this.spinner.hide();
        this.closeAssignModel.nativeElement.click();
        swal('Error', error.error.message, 'error');
      });
  }

  getCSRSellerChat($event, csr_seller_id, user_id) {
    if (csr_seller_id) {
      this.router.navigate(['/dashboard/leads/chat-with-seller', csr_seller_id, user_id]);
    } else {
      swal('Error', 'No CSR Seller is assigned.', 'error');
    }
  }
}
