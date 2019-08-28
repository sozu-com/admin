
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { LeadsService } from 'src/app/services/leads.service';
declare let swal: any;

@Component({
  selector: 'app-csr-closer',
  templateUrl: './csr-closer.component.html',
  styleUrls: ['./csr-closer.component.css'],
  providers: [Constant]
})
export class CsrCloserComponent implements OnInit {

  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark'};
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
    noatary_pending: 0,
    bank_pending: 0,
    lead_open: 0,
    lead_closed: 0
  };
  chartView = [];

  constructor(
    public admin: AdminService,
    private constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public leadsService: LeadsService,
    private router: Router
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
      this.parameter.state_id = '0';
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
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id === '0') {
      this.parameter.locality_id = '0';
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
    this.admin.postDataApi('getCsrClosers', input).subscribe(
      success => {
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

    this.admin.postDataApi('leads/csr-closer-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
        {
          'name': 'Noatary (Not assigned)',
          'value': parseInt(this.dash.noatary_pending, 10)
        },
        {
          'name': 'Bank (Not assigned)',
          'value': parseInt(this.dash.bank_pending, 10)
        },
        {
          'name': 'Lead (Open)',
          'value': parseInt(this.dash.lead_open, 10)
        },
        {
          'name': 'Lead (Closed)',
          'value': parseInt(this.dash.lead_closed, 10)
        }
      ];

    });
  }

  getListing() {
    this.users = [];
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
    this.admin.postDataApi('leads/csr-closer', input).subscribe(
      success => {
        this.spinner.hide();
        this.items = success.data;
        if (this.items.length <= 0) { this.parameter.noResultFound = true; }
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
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      swal('Error', 'Please choose atleast one lead.', 'error');
      return false;
    }
    this.openAssignModel.nativeElement.click();
  }

  getAssignListing() {
    const input = {
      keyword: this.assign.keyword
    };
    this.admin.postDataApi('getCsrClosers', input).subscribe(
      success => {
        this.assign.items = success.data;
      });
  }

  assignNow() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    const input = {
      closer_id: this.assignItem.id,
      leads: leads_ids
    };
    this.admin.postDataApi('leads/bulkAssignCloser', input).subscribe(r => {
      swal('Success', 'Assigned successfully', 'success');
      this.closeAssignModel.nativeElement.click();
      this.getListing();
    },
      error => {
        this.closeAssignModel.nativeElement.click();
        swal('Error', error.error.message, 'error');
      });
  }

  viewLeadDetails(lead_id: string, data: any) {
    this.leadsService.setLeadDetailData(data);
    this.router.navigate(['/dashboard/leads/csr-closers', lead_id]);
  }
}
