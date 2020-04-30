import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
import { Towers } from 'src/app/models/addProject.model';
declare let swal: any;

@Component({
  selector: 'app-arrear-report',
  templateUrl: './arrear-report.component.html',
  styleUrls: ['./arrear-report.component.css']
})
export class ArrearReportComponent implements OnInit {

  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  items: any = [];
  total: any = 0;
  today: any;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  paymentConcepts: Array<any>;
  model: Array<any>;
  finalData: Array<any>;
  buyers: Array<any>;
  selectedBuilding: any;
  previousMonth: any;
  nextMonth: any;
  projects: Array<any>;
  selctedProjects: Array<any>;
  selectedCurrencies: Array<any>;
  currencies: Array<any>;

  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.finalData = [];
    this.iniDropDownSetting();
    this.today = new Date();
    this.input = new CollectionReport();
    this.previousMonth = moment().subtract(1, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.nextMonth = moment().add(1, 'months').toDate();
    this.searchBuilding();
    this.getCurrencies();
    this.initCalendarLocale()
    this.getListing();
  }

  initCalendarLocale() {
    if (this.translate.defaultLang == 'en') {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk'
      }
    } else {
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
        weekHeader: 'Sm'
      };
    }
  }
  iniDropDownSetting() {
    this.singleDropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true
    };
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true
    };
  }

  onItemDeSelect(arrayNAme: any, obj: any) {
    this[arrayNAme].push(obj);
  }

  onItemSelect(param: any, obj: any) {
    this[param].push(obj);
  }

  onSelectAll(obj: any) {
  }


  getCurrencies() {
    this.admin.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
          this.currencies.map(r => {
            r['name'] = r.code + ' | ' + r.currency
          })
        }, error => {
          this.spinner.hide();
        }
      );
  }


  onSelectProject(isSelected: number, obj: any) {
    if (isSelected) {
      // this.setBuildingId(obj.id);
    } else {
      this.input.building_id = [];
    }
  }

  searchBuilding() {
    this.spinner.show();
    this.admin.postDataApi('getUnblockedProjects', {})
      .subscribe(
        success => {
          this.spinner.hide();
          this.projects = success['data'];
        },
        error => {
          this.spinner.hide();
        }
      );
  }

  getListing() {
    this.spinner.show();

    const input: any = JSON.parse(JSON.stringify(this.input));
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.year = new Date(this.input.end_date).getFullYear(),
    input.month = new Date(this.input.end_date).getMonth() + 1

    this.previousMonth = moment(this.input.end_date).subtract(1, 'months').toDate();
    this.nextMonth = moment(this.input.end_date).add(1, 'months').toDate();

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }
    this.admin.postDataApi('generateCollectionArrearsReport', input).subscribe(
      success => {
        this.spinner.hide();
        this.data = success['data'];

        this.finalData = []
        this.model = [];
        for(var property in this.data) {
          this.model.push(property);
        }

        for (let index = 0; index < this.model.length; index++) {
          const element = this.model[index];
          this.data[element][0]['showInfo'] = true;
          let t = 0;
          this.data[element].map(r => {
            t = t + (r['amount'] || 0) + (r['penelty'] || 0)
          })
          this.data[element][0]['total_amount'] = t;
          this.finalData = [...this.finalData, ...this.data[element]]
        }

        let grand_amount = 0; let grand_penalty = 0; let grand_total = 0; let grand_total_amount = 0;
        for (let index = 0; index < this.finalData.length; index++) {
          const element = this.finalData[index];
          grand_amount = grand_amount + (element['amount'] || 0)
          grand_penalty = grand_penalty + (element['penelty'] || 0)
          // grand_total = grand_total + (element['amount'] || 0) + (element['penalty'] || 0)
          grand_total_amount = grand_total_amount + (element['total_amount'] || 0)
        }
        this.finalData.push({id: 'Total', amount: grand_amount, penelty: grand_penalty, total_amount: grand_total_amount})
        console.log(this.finalData)
      },
      error => {
        this.spinner.hide();
      });
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.end_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selctedProjects = [];
    this.selectedCurrencies = [];
  }

}
