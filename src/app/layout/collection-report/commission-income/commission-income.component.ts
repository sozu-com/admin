import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CollectionReport } from 'src/app/models/collection-report.model';
declare let swal: any;
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-commission-income',
  templateUrl: './commission-income.component.html',
  styleUrls: ['./commission-income.component.css']
})
export class CommissionIncomeComponent implements OnInit {
  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  input: CollectionReport;
  projects: Array<any>;
  selctedProjects: Array<any>;
  currencies: Array<any>;
  selectedCurrencies: Array<any>;
  commissionsType: Array<any>;
  selectedCommissions: Array<any>;
  colorScheme = {
    domain: ['#ee7b7c', '#f5d05c']
  };
  locale: any;
  today = new Date();
  reportData: any;
  avgValue: number;
  reportType: number;
  items: Array<any>;
  commissions = [];
  already_index: any;
  commission_sum: any = 0 ;
  iva_amountt: any = 0 ;
  constructor(public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
  }

  onSelect(event) {}

  ngOnInit() {
    this.reportType = 1;
    this.commissionsType = [
      {id: 1, name: this.translate.instant('collectionReport.purchaseCommission')},
      {id: 2, name: this.translate.instant('collectionReport.collectionCommission')},
      {id: 3, name: this.translate.instant('collectionReport.agentCommission')}
    ];
    this.selectedCommissions = [
      {id: 1, name: this.translate.instant('collectionReport.purchaseCommission')}
    ];
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.iniDropDownSetting();
    this.searchBuilding();
    this.getCurrencies();
    this.initCalendarLocale();
    this.getReportData();

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.initCalendarLocale();
    });
  }

  initCalendarLocale() {
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
      allowSearchFilter: true,
      itemsShowLimit: 1
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
            r['name'] = r.code + ' | ' + r.currency;
          });
        }, error => {
          this.spinner.hide();
        }
      );
  }
  searchBuilding() {
    this.spinner.show();
    this.admin.postDataApi('getProjectsForCollections', {})
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

  onSelectCommission(isSelected: number, obj: any) {
    if (isSelected) {
      // this.getProperties(obj.id);
      // this.selectedCommissions()
    } else {
    }
  }

  getReportData () {
    this.reportType = 1;
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    // input.start_date = moment(this.input.start_date).format('YYYY-MM');
    // input.end_date = moment(this.input.end_date).format('YYYY-MM');

    // input.start_date = input.start_date + '-01';
    // input.end_date = input.end_date + '-31';

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }
    if (this.selectedCommissions) {
      const d = this.selectedCommissions.map(o => o.id);
      input.commission_type = d[0];
    }
    if (!input.commission_type) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectCommissionType'), 'error');
      return false;
    }
    this.spinner.show();
    this.admin.postDataApi('graphs/sozu-commission-income', input).subscribe(r => {
      this.spinner.hide();
      this.items = [];
      this.reportData = r['data'];
      for (let index = 0; index < this.reportData.commission.length; index++) {
        const e = this.reportData.commission[index];
        const obj = {label: e.label, commission: e.y, iva_amount: this.reportData.iva_amount[index].y};
        this.items.push(obj);
      }
      let sum: any = 0;
      this.reportData.commission.forEach(a => sum += a.y);
          this.commission_sum = sum
          console.log(this.commission_sum,"this.commission_sum");
          let sum1: any = 0;
          this.reportData.iva_amount.forEach(a => sum1 += a.y);
           console.log(sum1,"iva_amount");
          this.iva_amountt = sum1
      this.plotData();
      this.plotData1();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportFileName: 'commission-report',
      exportEnabled: true,
      theme: 'light2',
      dataPointWidth: 30,
      title: {
        // text: "Top Oil Reserves"
      },
      axisY: {
        gridColor: '#222222ab',
        tickColor: '#222222ab'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: 'stackedColumn',
        showInLegend: true,
        color: '#00b96f',
        name: 'Commission Amount',
        dataPoints: this.reportData['commission']
        },
        {
          type: 'stackedColumn',
          showInLegend: true,
          name: 'IVA Amount',
          color: '#00b96f61',
          dataPoints: this.reportData['iva_amount']
      }]
    });
    chart.render();
  }

  plotData1() {
    const chart = new CanvasJS.Chart('chartContainer1', {
      animationEnabled: true,
      exportFileName: 'commission-report',
      exportEnabled: true,
      theme: 'light2',
      dataPointWidth: 30,
      title: {
        // text: "Top Oil Reserves"
      },
      axisY: {
        gridColor: '#222222ab',
        tickColor: '#222222ab'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Expected Commission',
        color: '#4a85ff',
        dataPoints: this.reportData['expected']
      },
      {
        type: 'stackedColumn',
        showInLegend: true,
        name: 'Expected IVA Amount',
        color: '#4a84ff69',
        dataPoints: this.reportData['iva_amount_expected']
    }]
    });
    chart.render();
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selectedCurrencies = [];
    this.selctedProjects = [];
    this.selectedCommissions = [];
  }
  exportData() {
    if (this.items) {
      const finalData = [];
      for (let index = 0; index < this.items.length; index++) {
        const p = this.items[index];

        finalData.push({
          'Month': p.label || '',
          'Commission Amount': p.commission || 0,
          'IVA Amount': p.iva_amount || 0
        });
      }
      this.exportAsExcelFile(finalData, 'commissionReport-');
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

  getCommission(item, index) {
    if(index != this.already_index){
      this.already_index = index;
      this.commissions = [];
    let data = this.reportData.commission.find(value=> value.label == item.label);
    let  id = data.id.split(',');
    let param ={
      commission_type: this.selectedCommissions[0].id,
      id: id
    }
    this.spinner.show();
    this.admin.postDataApi('graphs/sozu-get-commission', param)
      .subscribe(
        success => {
          this.commissions = success.data;
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
      }
  }
}
