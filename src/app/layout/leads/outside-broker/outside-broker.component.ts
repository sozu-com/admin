
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-outside-broker',
  templateUrl: './outside-broker.component.html',
  styleUrls: ['./outside-broker.component.css'],
  providers: [Constant]
})
export class OutsideBrokerComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'dark'};
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
    public leadsService: LeadsService,
    private constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.parameter.is_selected = false;
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = this.leadsService.outsideAgentLeadsFlag ? this.leadsService.outsideAgentLeadsFlag : this.constant.flag;
    this.parameter.total = 0;
    this.parameter.count_flag = this.leadsService.outsideAgentLeadsCountFlag ?
    this.leadsService.outsideAgentLeadsCountFlag : this.constant.count_flag;
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

  changeFlag(flag: number) {
    this.parameter.flag = flag;
    this.leadsService.outsideAgentLeadsFlag = flag;
    this.parameter.count_flag = 1;
    this.resetDates();
    this.getListing();
    this.getCSRDashBoardData();
  }

  changeFilter(key, value) {
    this.parameter[key] = value;
    this.getListing();
  }

  changeCountFlag(flag: number) {
    this.parameter.count_flag = flag;
    this.leadsService.outsideAgentLeadsCountFlag = flag;
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
    this.admin.postDataApi('getExternalBroker', input).subscribe(
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
    input.is_external_agent = 1;
    this.admin.postDataApi('leads/in-house-broker-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
        // {
        //   'name': 'Total Leads',
        //   'value': parseInt(this.dash.lead_total, 10)
        // },
        {
          'name': this.translate.instant('leads.properties'),
          'value': parseInt(this.dash.lead_properties, 10)
        },
        {
          'name': this.translate.instant('leads.leadsOpen'),
          'value': parseInt(this.dash.lead_open, 10)
        },
        {
          'name': this.translate.instant('leads.dealFinalised'),
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
    input.is_external_agent = 1;
    this.spinner.show();
    this.admin.postDataApi('leads/in-house-broker', input).subscribe(
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

  updateLeadType($event, sale_rent, lead_id, index) {
    $event.stopPropagation();
    this.parameter.url = 'leads/updateLeadType';
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' +
        this.translate.instant('message.question.wantToChangeAvailablity'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.admin.postDataApi(this.parameter.url, { sale_rent: sale_rent, lead_id: lead_id })
          .subscribe(
            success => {
              this.spinner.hide();
              this.items[index].sale_rent = sale_rent;
              swal('Success', this.translate.instant('message.success.availablityChangedSuccessfully'), 'success');
            }, error => {
              this.spinner.hide();
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
      swal('Error', this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
      return false;
    }
    if (!this.assign.items) {
      this.getAssignListing();
    }
    this.openAssignModel.nativeElement.click();
  }

  getAssignListing() {
    // this.assign.items = [];
    const input = {
      keyword: this.assign.keyword,
      is_external_agent: 1
    };
    this.spinner.show();
    this.admin.postDataApi('getInhouseBroker', input).subscribe(
      success => {
        this.spinner.hide();
        this.assign.items = success.data;
      });
  }

  assignNow() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    const input = {
      broker_id: this.assignItem.id,
      leads: leads_ids
    };
    this.spinner.show();
    this.admin.postDataApi('leads/bulkAssignBroker', input).subscribe(r => {
      this.spinner.hide();
      swal('Success', this.translate.instant('message.success.assignedSuccessfully'), 'success');
      this.closeAssignModel.nativeElement.click();
      this.getListing();
    },
      error => {
        this.spinner.hide();
        this.closeAssignModel.nativeElement.click();
        swal('Error', error.error.message, 'error');
      });

  }


}
