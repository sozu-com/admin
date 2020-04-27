import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
import { DatePipe, TitleCasePipe } from '@angular/common';
declare let swal: any;
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [DatePipe, TitleCasePipe]
})
export class GeneralComponent implements OnInit {

  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  items: any = [];
  total: any = 0;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  today: any;
  paymentConcepts: Array<any>;
  allMonths: Array<any>;
  finalData: Array<any>;
  currencies: Array<any>;
  projects: Array<any>;
  selctedProjects: Array<any>;
  selectedCurrencies: Array<any>;
  developers: Array<any>;
  selectedDevelopers: Array<any>;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private datePipe: DatePipe,
    private titleCase: TitleCasePipe
  ) { }

  ngOnInit() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.today = new Date();
    this.iniDropDownSetting()
    this.getDevelopers();
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

  onItemSelect(param:any, obj: any) {
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
        });
  }
  
  getDevelopers() {
    this.admin.postDataApi('getUnblockedDevelopers', {})
      .subscribe(
        success => {
          this.developers = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  onSelectDeveloper(isSelected: number, obj: any) {
    if (isSelected) {
      this.searchBuilding(obj.id);
    } else {
      this.projects = [];
      this.selctedProjects = [];
    }
  }

  searchBuilding(developer_id: string) {
    this.spinner.show();
    const input = {
      developer_id: developer_id
    };
    this.admin.postDataApi('getUnblockedProjects', input)
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
    input.start_date = moment(this.input.start_date).format('YYYY-MM');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    input.start_date = input.start_date + '-01';
    // input.end_date = input.end_date + '-01';

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedDevelopers) {
      const d = this.selectedDevelopers.map(o => o.id);
      input.developer_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }
    // this.admin.getModelData().subscribe(
    this.admin.postDataApi('generateCollectionGeneralReport', input).subscribe(
      success => {
        this.data = success['data'];
        this.finalData = [];

        this.allMonths = []; let firstCol = []; let temp = {};
        for(var property in this.data) {
          this.allMonths.push(property);
        }

        for(var property in this.data[this.allMonths[0]]) {
          firstCol.push(property);
        }

        let obj = {}
        for (let index = 0; index < firstCol.length; index++) {
          const element = firstCol[index];
          obj = {
            'firstCol': element,
            key: 0
          }
            for (let i = 0; i < this.allMonths.length; i++) {
              const ele = this.allMonths[i];
              if (element == ele) {
                obj[ele] = this.data[ele][element][0]['total_amount'];
              } else if (element == 'unapproved') {
                obj[ele] = this.data[ele][element][0]['total_amount'];
              } else if (element == 'purchase_commission') {
                obj[ele] = this.data[ele][element][0]['total_amount'];
              } else if (element == 'collection_commission') {
                obj[ele] = this.data[ele][element][0]['total_amount'];
              } else {
                obj[ele] = '';
              }
            }

            // calculating horizontal => obj wise total
            let t = 0;
            for(var pro in obj) {
              if (pro != 'firstCol') {
                t = t + (obj[pro] || 0)
              }
            }
            obj['t'] = t;
            this.finalData.push(obj);
        }

        let f = {
          'firstCol': 'Grand Total',
          key: 1
        }
        for (let index = 0; index < this.allMonths.length; index++) {
          const element = this.allMonths[index];
          let t = 0
          for (let i = 0; i < this.finalData.length; i++) {
            const e = this.finalData[i];
            t = t + (e[element] || 0)
          }
          f[element] = t;
        }

        // finding total fo total
        let t = 0;
        for (let i = 0; i < this.finalData.length; i++) {
          const e = this.finalData[i];
          t = t + (e['t'] || 0)

          // renaming firstCol
          if (e['firstCol'].includes('-')) {
            e['firstCol'] = this.datePipe.transform(e['firstCol'], 'MMM, y');
          } else {
            e['firstCol'] = this.titleCase.transform(e['firstCol'].replace('_', ' '));
          }
        }
        f['t'] = t;
        this.finalData.push(f);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selectedDevelopers = [];
    this.selctedProjects = [];
    this.selectedCurrencies = [];
  }


    
  exportData() {
    if (this.finalData) {
      const data = [];

      const c = this.translate.instant('collectionReport.monthsOfSchedulePayments');
      // header
      const h2 = [];
      this.allMonths.forEach(r => {
        h2.push(this.datePipe.transform(r, 'MMM, y'));
      })
      const h = [...['Months of Schedule Payments'], ...h2, ...['Grand Total']];
      console.log('h', h);
      for (let index = 0; index < this.finalData.length; index++) {
        const p = this.finalData[index];
        
        // this.translate.instant('collectionReport.monthsOfSchedulePayments');

        data.push({
          'Concept': p.name || '',
          'Month': p.date || '',
        });
      }
      this.exportAsExcelFile(data, 'collection-');
    }
  }


  // will be used in case of excel
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const today = new Date();
    const date =
      today.getDate() +
      '-' +
      today.getMonth() +
      '-' +
      today.getFullYear() +
      '_' +
      today.getHours() +
      '_' +
      today.getMinutes() +
      '_' +
      today.getSeconds();
    fileName = fileName + date;
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

}
