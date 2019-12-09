import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { Users } from 'src/app/models/users.model';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LeadsService } from 'src/app/services/leads.service';
import { TranslateService } from '@ngx-translate/core';
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

  locale: any;
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
    this.parameter.keyword = '';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = this.leadsService.bankLeadsFlag ? this.leadsService.bankLeadsFlag : this.constant.flag;
    this.parameter.total = 0;
    this.parameter.count_flag = this.leadsService.bankLeadsCountFlag ? this.leadsService.bankLeadsCountFlag : this.constant.count_flag;
    this.route.params.subscribe(params => {
      this.parameter.assignee_id = params.id;
    });
    this.getListing();
    this.getCSRDashBoardData();
    Object.assign(this, this.chartView);
  }

  changeFlag(flag: number) {
    this.parameter.flag = flag;
    this.leadsService.bankLeadsFlag = flag;
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
    this.leadsService.bankLeadsCountFlag = flag;
    this.getListing();
  }

  getCsrListing() {
    this.initSelection = true;
    this.users = [];
    const input = new FormData();
    if (this.parameter.keyword) {
      input.append('keyword', this.parameter.keyword);
    }
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

    this.admin.postDataApi('leads/bank-dash-count', input).subscribe(r => {
      this.dash = r.data;
      this.chartView = [
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
    const leads_ids = this.items.filter(x => x.selected).map(y => y.id);
    if (leads_ids.length === 0) {
      swal('Error', this.translate.instant('message.info.pleaseChooseAtleastOneDate'), 'error');
      return false;
    }
    this.openAssignModel.nativeElement.click();
  }

  getAssignListing() {
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
    this.spinner.show();
    this.admin.postDataApi('leads/bulkAssignBank', input).subscribe(r => {
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
