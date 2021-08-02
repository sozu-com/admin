
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-inhouse-broker',
  templateUrl: './inhouse-broker.component.html',
  styleUrls: ['./inhouse-broker.component.css'],
  providers: [Constant]
})
export class InhouseBrokerComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'dark'};
  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;
  @ViewChild('addChangeStatusModelOpen') addChangeStatusModelOpen: ElementRef;
  @ViewChild('addChangeStatusModelClose') addChangeStatusModelClose: ElementRef;
  
  @ViewChild('viewStatuHistoryModelOpen') viewStatuHistoryModelOpen: ElementRef;
  @ViewChild('viewStatuHistoryModelClose') viewStatuHistoryModelClose: ElementRef;

  public parameter: IProperty = {};
  public location: IProperty = {};
  public assign: IProperty = {};
  assignItem: any;

  items = [];
  today = new Date();
  users: any = [];
  selectedUser: any;
  initSelection = false;
  locale: any;
  dash: any = {
    lead_total: 0,
    lead_lead_properties: 0,
    lead_open: 0,
    lead_closed: 0
  };
  chartView: any = [];
  addChangeStatusNames: string[] = [];
  selectedAddChangeStatus: any;
  selected_lead: any;
  user: any;
  lang: string;
  history: any;

  constructor(
    public admin: AdminService,
    public leadsService: LeadsService,
    private constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('all'));
    this.lang = localStorage.getItem('language_code');
    this.locale = {
      firstDayOfWeek: 0,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
        'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Clara',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk'
    };
    this.parameter.is_selected = false;
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = this.leadsService.inhouseAgentLeadsFlag ? this.leadsService.inhouseAgentLeadsFlag : this.constant.flag;
    this.parameter.total = 0;
    this.parameter.count_flag = this.leadsService.inhouseAgentLeadsCountFlag ?
    this.leadsService.inhouseAgentLeadsCountFlag : this.constant.count_flag;
    this.route.params.subscribe(params => {
      this.parameter.assignee_id = params.id;
    });
    this.getCountries();
    this.getListing();
    this.getCSRDashBoardData();
    Object.assign(this, this.chartView);
    this.openAddChangeStatusModel(undefined);
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
    this.leadsService.inhouseAgentLeadsFlag = flag;
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
    this.leadsService.inhouseAgentLeadsCountFlag = flag;
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
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToChangeAvailablity'),
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
              swal(this.translate.instant('swal.success'), this.translate.instant('message.success.availablityChangedSuccessfully'), 'success');
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
    if(((this.user.data.permissions.can_in_house_broker == 1 || this.user.data.permissions.can_csr_coordinator == 1) && this.user.data.user_type == 2) || this.user.data.admin_acl['Buyer Management'].can_update == 1){
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
      return false;
    }
    if (!this.assign.items) {
      this.getAssignListing();
    }
    this.openAssignModel.nativeElement.click();
  }
  else{
    this.toastr.warning(this.translate.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'), this.translate.instant('swal.warning'));
  }
  }

  getAssignListing() {
    // this.assign.items = [];
    const input = {
      keyword: this.assign.keyword
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
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.assignedSuccessfully'), 'success');
      this.closeAssignModel.nativeElement.click();
      this.getListing();
    },
      error => {
        this.spinner.hide();
        this.closeAssignModel.nativeElement.click();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });

  }

  openAddChangeStatusModel(item){
    this.selected_lead = item;
    this.selectedAddChangeStatus = item && item.broker_status ? item.broker_status.status_id : 0;
    this.spinner.show();
    this.admin.getApi("leads/all-in-house-broker-statuses" ).subscribe(r => {
      this.addChangeStatusNames = r.data;
      this.spinner.hide();
      if(item && ((this.user.data.permissions.can_in_house_broker == 1 || this.user.data.permissions.can_csr_coordinator == 1) && this.user.data.user_type == 2)){
      this.addChangeStatusModelOpen.nativeElement.click();
      }
      else{
        if(item){
        this.toastr.warning(this.translate.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'), this.translate.instant('swal.warning'));
        }
      }
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  onClickAddStatus= (): void => {
    let input={
      lead_id: this.selected_lead.id,
      broker_id: this.selected_lead.broker.id,
      status_id: this.selectedAddChangeStatus
    }
    this.spinner.show();
    this.admin.postDataApi("leads/in-house-broker-status", input).subscribe(r => {
      this.getListing();
      this.spinner.hide();
      this.addChangeStatusModelClose.nativeElement.click();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.statusChangedSuccessfully'), 'success');
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  isChecked(tempStatusName) {
    this.selectedAddChangeStatus = tempStatusName.id;
  }

  deletePopup(item){
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteLead'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: this.translate.instant('deleteSwal.yes'),
      cancelButtonText: this.translate.instant('deleteSwal.cancel')
    }).then((result) => {
      if (result.value) {
        //this.deleteManualLead(item);
      }
    });
  }

  openStatusHistoryModel(item){
    let input = {
      lead_id: item.id
    }
    this.spinner.show();
    this.admin.postDataApi('leads/in-house-broker-lead-statuses', input).subscribe(
      success => {
        this.history = success.data;
        this.viewStatuHistoryModelOpen.nativeElement.click();
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
      });
  }

}
