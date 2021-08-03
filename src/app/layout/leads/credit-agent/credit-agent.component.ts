import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
declare let swal: any;

@Component({
  selector: 'app-credit-agent',
  templateUrl: './credit-agent.component.html',
  styleUrls: ['./credit-agent.component.css'],
  providers: [Constant]
})
export class CreditAgentComponent implements OnInit {
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;
  @ViewChild('linkBrokerModal') linkBrokerModal: ElementRef;
  @ViewChild('closeBrokerModal') closeBrokerModal: ElementRef;
  @ViewChild('addChangeStatusModelOpen') addChangeStatusModelOpen: ElementRef;
  @ViewChild('addChangeStatusModelClose') addChangeStatusModelClose: ElementRef;
  @ViewChild('viewStatuHistoryModelOpen') viewStatuHistoryModelOpen: ElementRef;
  @ViewChild('viewStatuHistoryModelClose') viewStatuHistoryModelClose: ElementRef;

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
  locale: any;
  user: any;
  selected_lead: any;
  addChangeStatusNames: string[] = [];
  selectedAddChangeStatus: any;
  history: any;

  constructor(
    public admin: AdminService,
    public leadsService: LeadsService,
    private constant: Constant,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
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
    this.parameter.is_selected = false;
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = this.leadsService.sellerLeadsFlag ? this.leadsService.sellerLeadsFlag : this.constant.flag;
    this.parameter.total = 0;
    this.parameter.count_flag = this.leadsService.sellerLeadsCountFlag ? this.leadsService.sellerLeadsCountFlag : this.constant.count_flag;
    this.route.params.subscribe(params => {
      this.parameter.assignee_id = params.id;
    });
    this.getCountries();
    this.getListing();
    this.getCSRDashBoardData();
    Object.assign(this, this.chartView);
    this.openAddChangeStatusModel(undefined)
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }
  getSearchAssign(){}
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

  changeFlag(flag: number) {
    this.parameter.flag = flag;
    this.leadsService.sellerLeadsFlag = flag;
    this.parameter.count_flag = 1;
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
    this.leadsService.sellerLeadsCountFlag = flag;
    // this.getListing();
  }

  getCsrListing() {
    this.initSelection = true;
    this.users = [];
    const input = new FormData();
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
    this.admin.postDataApi('getCsrSellers', input).subscribe(
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

    this.admin.postDataApi('leads/credit-agent-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
        {
          'name': this.translate.instant('leads.leadsOpen'),
          'value': parseInt(this.dash.lead_open, 10)
        },
        {
          'name': this.translate.instant('leads.leadsClosed'),
          'value': parseInt(this.dash.lead_close, 10)
        },
        {
          'name': this.translate.instant('leads.leadsLost'),
          'value': parseInt(this.dash.lead_lost, 10)
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
    this.admin.postDataApi('leads/credit-agent', input).subscribe(
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
    this.spinner.show();
    this.admin.postDataApi('getCsrSellers', input).subscribe(
      success => {
        this.spinner.hide();
        this.assign.items = [] // success.data;
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

  getCSRSellerChat($event: any, chat_with: number, csr_seller_id: number, lead_id: number) {
    // chat_with = 1 means chat with seller, 2 means chat with agent
    if (csr_seller_id) {
      this.router.navigate(['/dashboard/leads/chat-with-seller', chat_with, csr_seller_id, lead_id]);
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.noCSRSellerAssigned'), 'error');
    }
  }

  changeLeadStatus(status: number, id: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToChangeStatus'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.admin.postDataApi('leads/changeLeadStatus', { status: status, id: id })
          .subscribe(
            success => {
              this.items[index]['lead_status_agent'] = status;
            });
      }
    });
  }

  deletePopup(item: any, index: number) {

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteLead'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.delete(item, index);
      }
    });
  }

  delete(item: any, index: number) {
    this.admin.postDataApi('leads/deleteCreditLead',
      { id: item.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  viewLeadDetails(lead_id: string, data: any) {
    this.leadsService.setLeadDetailData(data);
    this.router.navigate(['/dashboard/leads/credit-agents', lead_id]);
  }

  getInhouseAgentListing() {
    const input = {
      keyword: this.assign.keyword
    };
    this.spinner.show();
    this.assign.items = [];
    this.admin.postDataApi('getCreditAgent', input).subscribe(
      success => {
        this.spinner.hide();
        this.assign.items = success.data;
        this.assignItem = this.assign.items.find(x=> x.id ==  this.selected_lead.broker_id);
      });
  }

  openModel(selected) {
    this.user = JSON.parse(localStorage.getItem('all'));
    if(this.user.data.permissions.can_credit_agent == 1 && this.user.data.user_type == 2){
    this.selected_lead = selected;
    this.items.filter(item=>{
      if(item.id == selected.id){
        item.selected = true;
      }
      else{
        item.selected = false;
      }
    })
    this.assign.keyword=null;
     this.getInhouseAgentListing();
     this.linkBrokerModal.nativeElement.click();
  }
  else{
    this.toastr.warning(this.translate.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'), this.translate.instant('swal.warning'))
  }
  }

  assignAgent(item){
        this.assignItem = item;
        let text = this.translate.instant('swalText.assignInhouseAgent');
        swal({
          html: this.translate.instant('message.error.areYouSure') + '<br>' +  text,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: this.constant.confirmButtonColor,
          cancelButtonColor: this.constant.cancelButtonColor,
          confirmButtonText: this.translate.instant('deleteSwal.yes'),
          cancelButtonText: this.translate.instant('deleteSwal.cancel')
        }).then((result) => {
          if (result.value) {
            this.assignCreditAgent(item)
          }
        });
  }

  assignCreditAgent(item) {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
      this.assignItem = item;
      let input = {
        admin_id: this.assignItem.id,
        id: leads_ids[0],
        type: this.selected_lead.admin_id ? 2 : 1
      };
    this.spinner.show();
    this.admin.postDataApi('assignCreditAgent', input).subscribe(r => {
      this.spinner.hide();
      this.closeBrokerModal.nativeElement.click();
      let test =  input.type == 2 ? this.translate.instant('message.success.assignedSuccessfully') : this.translate.instant('message.success.unassignedSuccessfully')
      swal(this.translate.instant('swal.success'), test, 'success');
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

  openAddChangeStatusModel(item){ 
    this.user = JSON.parse(localStorage.getItem('all'));
    this.selected_lead = item;
    this.selectedAddChangeStatus = item && item.status ? item.status.status_id : 0;
    this.spinner.show();
    this.addChangeStatusNames = [];
    //this.addChangeStatusNames = ['Mailbox', 'Call later', 'Not interested', 'Scheduled appointment', 'Incorrect data', 'Real estate advisory', 'Lead lost', 'N/A'];
    this.admin.getApi("leads/all-csr-buyer-statuses" ).subscribe(r => {
       r.data.forEach(item=>{
        if(item.id != 6){
          this.addChangeStatusNames.push(item);
        }
      });
      this.spinner.hide();
      if(item && item.admin && ((this.user.data.permissions.can_csr_buyer == 1 || this.user.data.permissions.can_credit_agent == 1) && this.user.data.user_type == 2)){
      this.addChangeStatusModelOpen.nativeElement.click();
      }
      else{
        if(item){
          if(!item.admin){
            this.toastr.warning(this.translate.instant('message.error.firstAssignCreditAgent'), this.translate.instant('swal.warning'));
            return;
          }
        this.toastr.warning(this.translate.instant('message.error.SorryYouDoNotHaveThePermissionToGoThere'), this.translate.instant('swal.warning'));
        }
        
      }
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
      status_id: this.selectedAddChangeStatus,
    }
    this.admin.postDataApi("leads/credit-agent-status", input).subscribe(r => {
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

  openStatusHistoryModel(item){
    let input = {
      lead_id: item.id
    }
    this.spinner.show();
    this.admin.postDataApi('leads/csr-buyer-lead-statuses', input).subscribe(
      success => {
        this.history = success.data;
        this.viewStatuHistoryModelOpen.nativeElement.click();
        this.spinner.hide();
      },error=>{
        this.spinner.hide();
      });
  }
}
