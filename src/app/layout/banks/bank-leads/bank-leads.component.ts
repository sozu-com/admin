import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Users } from '../../../models/users.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-bank-leads',
  templateUrl: './bank-leads.component.html',
  styleUrls: ['./bank-leads.component.css']
})
export class BankLeadsComponent implements OnInit {

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
    all_count: 0,
    open_count: 0,
    close_count: 0
  };

  chartView: any = [];

  constructor(
    public admin: AdminService,
    private constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.route.params.subscribe(params => {
      this.parameter.assignee_id = params.id;
    });
    this.getListing();
    this.getCSRDashBoardData();
    Object.assign(this, this.chartView);
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
    this.admin.postDataApi('getBanks', input).subscribe(
      success => {
        this.users = success.data;
      }, error => {
        this.spinner.hide();
      });
  }

  resetFilters() {
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.parameter.total = 0;
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
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    }
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    } else if (this.parameter.assignee_id) {
      input.assignee_id = this.parameter.assignee_id;
    }

    this.admin.postDataApi('leads/bank-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
        {
          'name': 'Leads (Open)',
          'value': parseInt(this.dash.open_count, 10)
        },
        {
          'name': 'Leads (Closed)',
          'value': parseInt(this.dash.close_count, 10)
        }
      ];
      console.log('data', this.dash);
      console.log('chart', this.chartView);
    });
  }

  getListing() {
    this.items = [];
    this.parameter.noResultFound = false;
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    }
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    } else if (this.parameter.assignee_id) {
      input.assignee_id = this.parameter.assignee_id;
    }
    this.spinner.show();
    this.admin.postDataApi('leads/banks', input).subscribe(
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

  selectAll() {
    this.items.forEach(item => {
      item.selected = true;
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
    // this.admin.postDataApi('getBanks', {}).subscribe(
    //   success => {
    //     this.assign.items = success.data;
    //   });
  }

  getAssignListing() {
    // this.assign.items = [];
    const input = {
      keyword: this.assign.keyword
    };
    this.spinner.show();
    this.admin.postDataApi('getBanks', input).subscribe(
      success => {
        this.spinner.hide();
        this.assign.items = success.data;
      }, error => {
        this.spinner.hide();
      });
  }

  assignNow() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    const input = {
      bank_id: this.assignItem.id,
      leads: leads_ids
    };
    // this.spinner.show();
    this.admin.postDataApi('leads/bulkAssignBank', input).subscribe(r => {
      // this.spinner.hide();
      swal('Success', 'Assigned successfully', 'success');
      this.closeAssignModel.nativeElement.click();
      this.getListing();
    },
      error => {
        this.closeAssignModel.nativeElement.click();
        swal('Error', error.error.message, 'error');
      });
  }
}
