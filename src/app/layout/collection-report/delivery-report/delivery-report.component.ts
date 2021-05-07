import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CollectionReport } from 'src/app/models/collection-report.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.css']
})
export class DeliveryReportComponent implements OnInit {

  public parameter: IProperty = {};
  multiDropdownSettings: any;
  input: CollectionReport;
  projects: Array<any>;
  selctedProjects: Array<any>;
  //currencies: Array<any>;
  //selectedCurrencies: Array<any>;
  colorScheme = {
    domain: ['#ee7b7c', '#f5d05c']
  };
  locale: any;
  today: any;//= new Date();
  reportData: any[] = [];
  tempReportData: any[] = [];
  //items: Array<any>;
  reportType: number;
  already_index: any;
  cashFlowInfos: any[];
  already_value: any;

  constructor(
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  onSelect(event) { }

  ngOnInit(): void {
    this.reportType = 1;
    this.input = new CollectionReport();
    //this.input.sort_sales_by = 1;
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.iniDropDownSetting();
    this.getProjectsForCollections();
    //this.getCurrencies();
    this.initCalendarLocale();
    this.getReportData();

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.initCalendarLocale();
    });
  }

  initCalendarLocale = (): void => {
    if (this.translate.defaultLang === 'en') {
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
      };
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

  iniDropDownSetting = (): void => {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }

  onItemDeSelect = (arrayNAme: any, obj: any): void => {
    //this[arrayNAme].push(obj);
  }

  onItemSelect = (param: any, obj: any): void => {
    //this[param].push(obj);
  }

  onSelectAll = (obj: any): void => { }

  // getCurrencies() {
  //   this.admin.postDataApi('getCurrencies', {})
  //     .subscribe(
  //       success => {
  //         this.currencies = success.data;
  //         this.currencies.map(r => {
  //           r['name'] = r.code + ' | ' + r.currency;
  //         });
  //       }, error => {
  //         this.spinner.hide();
  //       }
  //     );
  // }

  getProjectsForCollections = (): void => {
    this.spinner.show();
    this.admin.postDataApi('getProjectsForCollections', {}).subscribe((success) => {
      this.spinner.hide();
      this.projects = success.data || [];
    }, (error) => {
      this.spinner.hide();
    });
  }

  getReportData = (): void => {
    this.reportType = 1;
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.building_id = (this.selctedProjects || []).length > 0 ? this.selctedProjects.map(o => o.id) : null;
    // if (this.selctedProjects) {
    //   const d = this.selctedProjects.map(o => o.id);
    //   input.building_id = d;
    // }
    // if (this.selectedCurrencies) {
    //   const d = this.selectedCurrencies.map(o => o.id);
    //   input.currency_id = d;
    // }
    this.spinner.show();
    this.admin.postDataApi('graphs/collection-delivery-report', input).subscribe((response) => {
      this.spinner.hide();
      this.reportData = (response.data || {}).delivery_report || [];
      // this.items = [];
      // for (let index = 0; index < this.reportData.approved.length; index++) {
      //   const e = this.reportData.approved[index];
      //   const obj = { label: e.label, approved_count: e.y, unapproved_count: this.reportData.unapproved[index].y };
      //   this.items.push(obj);
      // }
      this.tempReportData = [];
      this.reportData.forEach((data) => {
        this.tempReportData.push({ label: data.label, y: data.p_count });
      });
      this.plotData();
    }, (error) => {
      this.spinner.hide();
    });
  }

  plotData = (): void => {

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportFileName: 'sales-report',
      exportEnabled: true,
      axisY: {
        gridColor: '#222222ab',
        tickColor: '#222222ab'
      },
      toolTip: {
        shared: true
        // content: toolTipContent
      },
      data: [{
        type: 'stackedColumn',
        showInLegend: true,
        color: '#f5d05c',
        name: this.translate.instant('collectionReport.propertiesCount'),
        dataPoints: this.tempReportData
      }
        //   , {
        //   type: 'stackedColumn',
        //   showInLegend: true,
        //   name: 'Outside Agent Approved Collections',
        //   color: '#2d2a2a',
        //   dataPoints: this.reportData['unapproved']
        // }, {
        //   type: 'stackedColumn',
        //   showInLegend: true,
        //   color: '#b95500',
        //   name: 'Collections Without Agent',
        //   dataPoints: this.reportData['not_linked']
        // }
      ]
    });

    // function toolTipContent(e) {
    //   let str = '';
    //   let total = 0;
    //   let str2, str3;
    //   for (let i = 0; i < e.entries.length; i++) {
    //     const str1 = '<span style= "color:' + e.entries[i].dataSeries.color + '"> ' +
    //       e.entries[i].dataSeries.name + '</span>: $<strong>' + e.entries[i].dataPoint.y + '</strong>bn<br/>';
    //     total = e.entries[i].dataPoint.y + total;
    //     str = str.concat(str1);
    //   }
    //   str2 = '<span style = "color:DodgerBlue;"><strong>' + (e.entries[0].dataPoint.label).getFullYear() + '</strong></span><br/>';
    //   total = Math.round(total * 100) / 100;
    //   str3 = '<span style = "color:Tomato">Total:</span><strong> $' + total + '</strong>bn<br/>';
    //   return (str2.concat(str)).concat(str3);
    // }

    chart.render();
  }

  resetFilters = (): void => {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    //this.selectedCurrencies = [];
    this.selctedProjects = [];
    this.getReportData();
  }

  exportData() {
    if (this.reportData.length > 0) {
      const finalData = [];
      for (let index = 0; index < this.reportData.length; index++) {
        const p = this.reportData[index];

        finalData.push({
          'Month': p.label || '',
          'Properties Count': parseInt(p.p_count) || 0 //,
          //'Outside Agent Approved Collections': p.unapproved_count || 0
        });
      }
      this.exportAsExcelFile(finalData, 'delivery-report-');
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

  getCashFlowInfo = (item, index): void => {
    if (index != this.already_index && item.id && item.p_count > 0) {
      this.already_index = index;
      // this.already_value = value;
      this.cashFlowInfos = [];
      // let data = value == 1 ? this.reportData.approved.find(value => value.label == item.label) :
      //   this.reportData.unapproved.find(value => value.label == item.label);
      let id = item.id.split(',');
      let param = { id: id };
      this.spinner.show();
      this.admin.postDataApi('graphs/delivery-reports-actualinfo', param).subscribe((success) => {
        this.cashFlowInfos = success.data;
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
      });
    }
  }


}