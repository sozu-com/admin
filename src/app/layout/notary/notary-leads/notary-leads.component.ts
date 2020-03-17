import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
declare let swal: any;
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddNotaryAvailabilty, NotaryLeads } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notary-leads',
  templateUrl: './notary-leads.component.html',
  styleUrls: ['./notary-leads.component.css'],
  providers: [AddNotaryAvailabilty, NotaryLeads]
})
export class NotaryLeadsComponent implements OnInit {

  @ViewChild('openAssignModel') openAssignModel: ElementRef;
  @ViewChild('closeAssignModel') closeAssignModel: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  public location: IProperty = {};
  public assign: IProperty = {};
  assignItem: any;

  items = [];
  data = [];
  date: any;
  time: any;
  today: any;

  users: any = [];
  selectedUser: any;
  initSelection = false;

  dash: any = {
    all_count: 0,
    open_count: 0,
    close_count: 0
  };
  locale: any;

  chartView: any = [];
  constructor(
    public admin: AdminService,
    public leadsService: LeadsService,
    private constant: Constant,
    public availability: AddNotaryAvailabilty,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
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
    this.today = new Date();
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = this.leadsService.notaryLeadsFlag ? this.leadsService.notaryLeadsFlag : this.constant.flag;
    this.parameter.total = 0;
    this.parameter.count_flag = this.leadsService.notaryLeadsCountFlag ?
      this.leadsService.notaryLeadsCountFlag : this.constant.count_flag;
    this.route.params.subscribe(params => {
      this.parameter.assignee_id = params.id;
    });
    this.getListing();
    this.getCSRDashBoardData();
    Object.assign(this, this.chartView);
  }

  changeFlag(flag: number) {
    this.parameter.flag = flag;
    this.leadsService.notaryLeadsFlag = flag;
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
    this.leadsService.notaryLeadsCountFlag = flag;
    this.getListing();
  }

  getCsrListing() {
    this.initSelection = true;
    this.users = [];
    const input = new FormData();
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
    this.admin.postDataApi('getNoataries', input).subscribe(
      success => {
        this.users = success.data;
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
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.getListing();
    this.getCSRDashBoardData();
  }

  getCSRDashBoardData() {
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

    this.admin.postDataApi('leads/noatary-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
        // {
        //   "name": "Total",
        //   "value": parseInt(this.dash.all_count,10)
        // },
        {
          'name': this.translate.instant('charts.leadsOpen'),
          'value': parseInt(this.dash.open_count, 10)
        },
        {
          'name': this.translate.instant('charts.leadsClosed'),
          'value': parseInt(this.dash.close_count, 10)
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
    this.admin.postDataApi('leads/noataries', input).subscribe(
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

  addDateTime() {
    // if (this.date && this.time) {
    //   const newdate = this.date + ' ' + this.time + ':00';
    //   // const d = new ChatTimePipe().transform(newdate, 'YYYY-MM-DD HH:MM:SS', 3);
    //   // this.availability.date_time_array.push({date_time: d});
    //   this.availability.date_time_array.push({date_time: newdate});
    //   this.date = ''; this.time = '';
    // }
    if (this.date) {
      this.availability.date_time_array.push({ date_time: this.date });
      this.date = '';
    }
  }

  openModal($event, item, index) {
    // $event.stopPropagation();
    // this.availability.date_time_array = item.selected_properties[0].selected_noatary[0].noatary_availability;
    this.availability.property_id = item.selected_properties[0].property_id;
    this.availability.lead_id = item.id;
    this.parameter.index = index;
    this.data = item.selected_properties[0].selected_noatary[0].noatary_availability;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.availability = new AddNotaryAvailabilty();
  }

  add() {
    this.availability.date_time_array.forEach(element => {
      const d: any = new Date(element.date_time);
      const f = moment(d).utc().format('YYYY-MM-DD HH:mm:ss');
      this.availability.date_time.push(f);
    });
    this.data.forEach(element1 => {
      this.availability.date_time.push(element1.date_time);
    });
    if (this.availability.date_time.length === 0) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneLead'), 'error');
      return false;
    }
    this.spinner.show();
    this.admin.postDataApi('leads/addNoataryAvailability', this.availability)
      .subscribe(
        success => {
          this.items[this.parameter.index] = success.data;
          this.spinner.hide();
          this.closeModal();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.availabilityAddedSuccessfully'), 'success');
        }, error => {
          this.spinner.hide();
        }
      );
  }

  removeNoataryAvailability(id, j) {
    this.admin.postDataApi('leads/removeNoataryAvailability', { id: id })
      .subscribe(
        success => {
          this.data.splice(j, 1);
          // this.items = success.data;
          // this.parameter.total = success.total_count;
        }
      );
  }

  removeNoatary(i) {
    this.availability.date_time_array.splice(i, 1);
  }

  selectAll() {
    this.items.forEach(item => {
      item.selected = true;
    });
  }

  bulkAssign() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneLead'), 'error');
      return false;
    }
    this.openAssignModel.nativeElement.click();
  }

  getAssignListing() {
    const input = {
      keyword: this.assign.keyword
    };
    this.admin.postDataApi('getNoataries', input).subscribe(
      success => {
        this.assign.items = success.data;
      });
  }

  assignNow() {
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    const input = {
      noatary_id: this.assignItem.id,
      leads: leads_ids
    };
    this.spinner.show();
    this.admin.postDataApi('leads/bulkAssignNoatary', input).subscribe(r => {
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
}
