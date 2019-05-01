
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
declare let swal: any;


@Component({
  selector: 'app-outside-broker',
  templateUrl: './outside-broker.component.html',
  styleUrls: ['./outside-broker.component.css'],
  providers: [Constant]
})
export class OutsideBrokerComponent implements OnInit {

  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;

  public parameter: IProperty = {};
  public location: IProperty = {};
  public assign: IProperty = {};
  assignItem: any;

  items = [];
  today = new Date();
  users: any = [];
  selectedUser: any;
  initSelection = false;

  dash: any = {
    lead_total: 0,
    lead_lead_properties: 0,
    lead_open: 0,
    lead_closed: 0
  };
  chartView: any = [];

  constructor(
    public admin: AdminService,
    private constant: Constant,
    private route: ActivatedRoute
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
    input.append('is_external_agent', '1');
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
    this.admin.postDataApi('getInhouseBroker', input).subscribe(
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
    this.getListing();
    this.resetDates();
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
    input.append('is_external_agent', '1');
    this.admin.postDataApi('leads/in-house-broker-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
        // {
        //   'name': 'Total Leads',
        //   'value': parseInt(this.dash.lead_total, 10)
        // },
        {
          'name': 'Lead (Properties)',
          'value': parseInt(this.dash.lead_properties, 10)
        },
        {
          'name': 'Lead (Open)',
          'value': parseInt(this.dash.lead_open, 10)
        },
        {
          'name': 'Leads (Deal finalized)',
          'value': parseInt(this.dash.lead_closed, 10)
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
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    }
    if (this.selectedUser) {
      input.assignee_id = this.selectedUser.id;
    } else if (this.parameter.assignee_id) {
      input.assignee_id = this.parameter.assignee_id;
    }
    input.append('is_external_agent', '1');
    this.parameter.loading = true;
    this.admin.postDataApi('leads/in-house-broker', input).subscribe(
      success => {
        this.parameter.loading = false;
        this.items = success.data;
        if (this.items.length <= 0) { this.parameter.noResultFound = true; }
        this.parameter.total = success.total_count;
      }, error => {
        this.parameter.loading = false;
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

  updateLeadType($event, sale_rent, lead_id, index) {
    $event.stopPropagation();
    console.log('----');
    this.parameter.url = 'leads/updateLeadType';
    swal({
      html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to change availability for this property?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.parameter.loading = true;
        this.admin.postDataApi(this.parameter.url, { sale_rent: sale_rent, lead_id: lead_id })
          .subscribe(
            success => {
              this.parameter.loading = false;
              this.items[index].sale_rent = sale_rent;
              swal('Success', 'Availability for this property changed successfully.', 'success');
            }, error => {
              this.parameter.loading = false;
            });
      }
    });
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
    // this.admin.postDataApi('getInhouseBroker', {}).subscribe(
    //   success => {
    //     this.assign.items = success.data;
    //   });
  }

  getAssignListing() {
    // this.assign.items = [];
    const input = {
      keyword: this.assign.keyword,
      is_external_agent: 1
    };
    this.admin.postDataApi('getInhouseBroker', input).subscribe(
      success => {
        this.assign.items = success.data;
      });
  }

  assignNow() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    const input = {
      broker_id: this.assignItem.id,
      leads: leads_ids
    };
    this.parameter.loading = true;
    this.admin.postDataApi('leads/bulkAssignBroker', input).subscribe(r => {
      this.parameter.loading = false;
      swal('Success', 'Assigned successfully', 'success');
      this.closeAssignModel.nativeElement.click();
      this.getListing();
    },
      error => {
        this.parameter.loading = false;
        this.closeAssignModel.nativeElement.click();
        swal('Error', error.error.message, 'error');
      });

  }


}
