
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { CSRBuyerLeads } from 'src/app/models/leads.model';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
// import { TranslateService } from 'src/app/lang/translate.service';
declare let swal: any;

@Component({
  selector: 'app-csr-buyer',
  templateUrl: './csr-buyer.component.html',
  styleUrls: ['./csr-buyer.component.css']
})
export class CsrBuyerComponent implements OnInit {

  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;
  @ViewChild('openNewAssignModel') openNewAssignModel: ElementRef;
  @ViewChild('closeNewAssignModel') closeNewAssignModel: ElementRef;

  @ViewChild('addChangeStatusModelOpen') addChangeStatusModelOpen: ElementRef;
  @ViewChild('addChangeStatusModelClose') addChangeStatusModelClose: ElementRef;

  public parameter: IProperty = {};
  public location: IProperty = {};
  public assign: IProperty = {};
  assignItem: any;
  locale: any;
  items: Array<CSRBuyerLeads> = [];
  today = new Date();
  users: any = [];
  selectedUser: any;
  initSelection = false;
  openFor: string;

  dash: any = {
    lead_total: 0,
    lead_without_broker: 0,
    lead_information_filled: 0,
    lead_broker_assigned: 0
  };
  chartView: any = [];
  showSearchText: boolean;
  allSelected: boolean = false;
  addChangeStatusNames: string[] = [];
  selectedAddChangeStatus: any;

  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  selected_lead: any;
  constructor(
    public admin: AdminService,
    private constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public leadsService: LeadsService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

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
    this.showSearchText = true;
    this.parameter.is_selected = false;
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = this.leadsService.buyerLeadsFlag ? this.leadsService.buyerLeadsFlag : this.constant.flag;
    this.parameter.total = 0;
    this.parameter.count_flag = this.leadsService.buyerLeadsCountFlag ? this.leadsService.buyerLeadsCountFlag : this.constant.count_flag;
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
  }

  changeFlag(flag: number) {
    this.parameter.flag = flag;
    this.parameter.count_flag = 1;
    this.leadsService.buyerLeadsFlag = flag;
    this.resetDates();
    this.getListing();
    this.getCSRDashBoardData();
  }

  changeFilter = (key: string, value: any): void => {
    this.parameter[key] = value;
    this.getListing();
  }

  changeCountFlag(flag: number) {
    this.parameter.count_flag = flag;
    this.leadsService.buyerLeadsCountFlag = flag;
    this.getListing();
  }

  getCsrListing() {
    this.initSelection = true;
    this.users = [];
    const input = new FormData();
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
    this.admin.postDataApi('getCsrBuyers', input).subscribe(
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

    this.admin.postDataApi('leads/csr-buyer-dash-count', input).subscribe(r => {
      this.dash = r.data;

      this.chartView = [
        {
          'name': this.translate.instant('leads.infoFilled'),
          'value': parseInt(this.dash.lead_information_filled, 10)
        },
        {
          'name': this.translate.instant('leads.withAgentAssigned'),
          'value': parseInt(this.dash.lead_broker_assigned, 10)
        },
        {
          'name': this.translate.instant('leads.withoutAgentAssigned'),
          'value': parseInt(this.dash.lead_without_broker, 10)
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
    this.admin.postDataApi('leads/csr-buyer', input).subscribe(
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
    this.showSearchText = false;
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      this.showSearchText = true;
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleast1Lead'), 'error');
      return false;
    }
    if (!this.assign.items) {
      this.getAssignListing();
    }
    this.openAssignModel.nativeElement.click();
  }

  getAssignListing() {
    const input = {
      keyword: this.assign.keyword
    };
    this.assign.items = [];
    this.spinner.show();
    this.admin.postDataApi('getCsrBuyers', input).subscribe(
      success => {
        this.spinner.hide();
        this.assign.items = success.data;
      });
  }

  getInhouseAgentListing() {
    const input = {
      keyword: this.assign.keyword
    };
    this.spinner.show();
    this.assign.items = [];
    this.admin.postDataApi('getInhouseBroker', input).subscribe(
      success => {
        this.spinner.hide();
        this.assign.items = success.data;
      });
  }


  assignNow() {
    let users_ids;
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if(this.openFor == 'CSR'){
    //users_ids = this.items.filter(x => x.selected).map(y => y.admin.id);
    }
    const inputCSR = {
      csr_buyer_id: this.assignItem.id,
      leads: leads_ids,
      //users: users_ids
    };

    const input = {
      broker_id: this.assignItem.id,
      leads: leads_ids
    };

    this.spinner.show();
    let url = this.openFor == 'CSR' ? 'leads/bulkAssignBuyer' : 'leads/bulkAssignBroker';
    this.admin.postDataApi(url, this.openFor == 'CSR' ? inputCSR : input).subscribe(r => {
      this.spinner.hide();
      this.closeNewAssignModel.nativeElement.click();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.assignedSuccessfully'), 'success');
      this.getListing();
      this.items.filter(item=>{
        if(item.selected){
          item.selected = false;
        }
      });
    },
      error => {
        this.spinner.hide();
        //this.closeAssignModel.nativeElement.click();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  viewLeadDetails(lead_id: string, data: any) {
    this.leadsService.setLeadDetailData(data);
    this.router.navigate(['/dashboard/leads/csr-buyers', lead_id]);
  }

  openModel(openFor, selected) {
    this.openFor = openFor;
    this.items.filter(item=>{
      if(item.id == selected.id){
        item.selected = true;
      }
      else{
        item.selected = false;
      }
    });
    if(openFor != 'CSR' && !selected.user_id){
      this.toastr.warning(this.translate.instant('message.error.userNotRegisterInWebsite'), this.translate.instant('swal.warning'));
      return;
    }
    openFor == 'CSR' ? this.getAssignListing() : this.getInhouseAgentListing();
    this.openNewAssignModel.nativeElement.click();
  }

  openAddChangeStatusModel(item){ 
    this.selected_lead = item;
    this.selectedAddChangeStatus = item.status ? item.status.status_id : 0;
    this.spinner.show();
    //this.addChangeStatusNames = ['Mailbox', 'Call later', 'Not interested', 'Scheduled appointment', 'Incorrect data', 'Real estate advisory', 'Lead lost', 'N/A'];
    this.admin.getApi("leads/all-csr-buyer-statuses" ).subscribe(r => {
      this.addChangeStatusNames = r.data;
      this.spinner.hide();
      this.addChangeStatusModelOpen.nativeElement.click();
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  closeAddChangeStatusModel = (): void => {
    this.addChangeStatusModelClose.nativeElement.click();
  }

  onClickAddStatus() {
    let input={
      lead_id: this.selected_lead.id,
      admin_id: this.selected_lead.admin.id,
      status_id: this.selectedAddChangeStatus
    }
    this.admin.postDataApi("leads/csr-buyer-status", input).subscribe(r => {
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
    return tempStatusName.id == this.selectedAddChangeStatus ? true : false;
  }

  closeModal(){
    this.items.filter(item=>{
     item.selected = false;
    });
  }

  deletePopup(item){
    if(!item.admin){
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
        this.deleteCSRBuyerLead(item);
      }
    });
  }
  else{
    this.toastr.warning(this.translate.instant('message.error.leadCannotDeleteCSRBuyerAssigned'), this.translate.instant('swal.warning'))
  }
  }

  deleteCSRBuyerLead(item){
    this.spinner.show();
    let index = this.items.findIndex(x=> x.id == item.id)
    this.admin.postDataApi('deleteCsrBuyer',{ id: item.id }).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      this.items.splice(index, 1);
      this.parameter.total = this.items.length;
      this.spinner.hide();
    },
      error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
  }
}
