import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CollectionReport } from '../../../models/collection-report.model';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { KeyValue } from '@angular/common';
import { PricePipe } from 'src/app/pipes/price.pipe';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-arrear-report',
  templateUrl: './arrear-report.component.html',
  styleUrls: ['./arrear-report.component.css']
})
export class ArrearReportComponent implements OnInit {

  public parameter: IProperty = {};
  singleDropdownSettings: any;
  multiDropdownSettings: any;
  legalRepDropdownSettings: any;
  items: any = [];
  dash: any = {
    below_30: 0,
    below_60: 0,
    above_90: 0,
    above_60: 0
  };
  colorScheme = {
    domain: ['#DFDFDF','#4c4e50','#F9F6F0','#03b971']
  };
  view: any[] = [250, 250];
  total: any = 0;
  today: any;
  item: any;
  locale: any;
  input: CollectionReport;
  data: any;
  paymentConcepts: Array<any>;
  model: Array<any>;
  finalData: Array<any>;
  finalDataSum: any;
  developers: Array<any>;
  buyers: Array<any>;
  legalReps: Array<any>;
  chartView: any = [];
  selectedBuilding: any;
  previousMonth: any;
  nextMonth: any;
  projects: Array<any>;
  selctedProjects: Array<any>;
  selectedCurrencies: Array<any>;
  selectedBuyers: Array<any>;
  selectedBuyerDev: Array<any>;
  selectedLegalReps: Array<any>;
  currencies: Array<any>;
  paymentChoices: Array<any>;
  incomeProjection: Array<any>;
  paidConcepts: Array<any>;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  overdueReportTableDetails: any;
  public isShow :boolean= true;
  tested: any;
  constructor(
    public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private price: PricePipe
  ) { }

  ngOnInit() {
    this.finalData = [];
    this.iniDropDownSetting();
    this.today = new Date();
    this.input = new CollectionReport();
    this.previousMonth = moment().subtract(1, 'months').toDate();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.nextMonth = moment().add(1, 'months').toDate();
    this.generateTableReport();
    this.getDevelopers();
    this.getBuyers();
    this.getLegalRep();
    this.searchBuilding();
    this.getCurrencies();
    this.initCalendarLocale();
    this.getAllPaymentChoices();
    this.getListing();
    this.generateOverdueReport();
    Object.assign(this, this.chartView);
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
    this.legalRepDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'comm_name',
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

  getAllPaymentChoices() {
    this.admin.postDataApi('getPaymentChoices', {})
      .subscribe(
        success => {
          this.paymentChoices = success.data;
        }, error => {
          this.spinner.hide();
        });
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


  onSelectProject(isSelected: number, obj: any) {
    if (isSelected) {
      // this.setBuildingId(obj.id);
    } else {
      this.input.building_id = [];
    }
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

  getDevelopers() {
    this.admin.postDataApi('getDevelopersForCollections', {})
      .subscribe(
        success => {
          this.developers = success.data;
        });
  }
  getBuyers() {
    this.admin.postDataApi('getAllBuyersForCollections', { user_type: 1 })
      .subscribe(
        success => {
          this.buyers = success.data;
        });
  }

  getLegalRep() {
    this.admin.postDataApi('getAllBuyersForCollections', { user_type: 2 })
      .subscribe(
        success => {
          this.legalReps = success.data;
        });
  }

  valueOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
    return a.value.localeCompare(b.value);
  }

  getListing() {
    this.spinner.show();
    let self = this;
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.year = new Date(this.input.end_date).getFullYear(),
      input.month = new Date(this.input.end_date).getMonth() + 1;

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
    if (this.selectedBuyers) {
      const d = this.selectedBuyers.map(o => o.id);
      input.buyer_id = d;
    }
    if (this.selectedLegalReps) {
      const d = this.selectedLegalReps.map(o => o.id);
      input.legal_rep_id = d;
    }
    if (this.selectedBuyerDev) {
      const d = this.selectedBuyerDev.map(o => o.id);
      input.buyer_dev_id = d;
    }
    this.admin.postDataApi('generateCollectionArrearsReport', input).subscribe(
      success => {
        this.spinner.hide();
        this.data = success['data'];
        this.incomeProjection = success['income_projection'];
        this.paidConcepts = success['data2'];
        // this.finalDataSum = [];
        this.finalData = [];
        this.model = [];
        for (const property in self.data) {
          if (property) {
            self.model.push(property);
          }
        }

        for (let index = 0; index < self.model.length; index++) {
          const element = self.model[index];
          let tempTotalAmount = 0;
          self.data[element].forEach((r, index) => {
            //let t = 0;
            self.data[element][index]['showInfo'] = true;
            tempTotalAmount = tempTotalAmount + (((r['amount'] || 0) + (r['penelty'] || 0)) - (r.calc_payment_amount || 0));
            // self.data[element][index]['total_amount'] = t;
          });

          self.data[element].forEach((r, index) => {
            if (index == 0) {
              self.data[element][index]['total_amount'] = tempTotalAmount;
            } else {
              self.data[element][index]['total_amount'] = 0;
            }

          });

          self.finalData = [...self.finalData, ...self.data[element]];
          // self.data[element].map(r => {
          //   t = t + (r['amount'] || 0) + (r['penelty'] || 0);
          // });
          // self.data[element][0]['total_amount'] = t;
          // self.finalData = [...self.finalData, ...self.data[element]];
        }
        let grand_amount = 0; let grand_penalty = 0; let grand_total_amount = 0;
        for (let index = 0; index < self.finalData.length; index++) {
          const element = self.finalData[index];
          grand_amount = grand_amount + (element['amount'] || 0) - (element['calc_payment_amount'] || 0);
          grand_penalty = grand_penalty + (element['penelty'] || 0);
          // grand_total = grand_total + (element['amount'] || 0) + (element['penalty'] || 0)
          grand_total_amount = grand_total_amount + (element['total_amount'] || 0);

        }
        this.finalData.push({ id: 'Total', key: 1, symbol: '$', amount: grand_amount - grand_penalty, penelty: grand_penalty, total_amount: grand_total_amount });
        
        this.finalDataSum = grand_total_amount
        for (let index = 0; index < this.paymentChoices.length; index++) {
          const element = this.paymentChoices[index];
          let expected_amt = []; let penalty = [];
          expected_amt = this.incomeProjection.filter(r => { if (r.id == element.id) { return r['expected_amt']; } });
          penalty = this.incomeProjection.filter(r => { if (r.id == element.id) { return r['expected_penalty']; } });
          const ea = expected_amt && expected_amt.length > 0 ? expected_amt[0].expected_amt : 0;
          const p = penalty && penalty.length > 0 ? penalty[0].expected_penalty : 0;
          const paid_amount = this.paidConcepts.filter(r => { if (r.id == element.id) { return r['paid_amount']; } });
          element.paid_amount = paid_amount && paid_amount.length > 0 ? paid_amount[0].paid_amount : 0;
          element.total = (ea + p).toFixed(2);
        }
      },
      error => {
        this.spinner.hide();
      });
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selctedProjects = [];
    this.selectedCurrencies = [];
    this.selectedBuyerDev = [];
    this.selectedLegalReps = [];
    this.selectedBuyers = [];
    this.getListing();
    this.generateOverdueReport();
    this.generateTableReport();
  }

  apply(){
    this.getListing();
    this.generateOverdueReport(); 
    this.generateTableReport();
  }

  exportData() {
    if (this.finalData) {
      const finalData = [];
      for (let index = 0; index < this.finalData.length; index++) {
        const item = this.finalData[index];
        finalData.push({
          'Account ID': item.id != 'Total' ? item.id || '' : 'Total',
          'Buyer Name': item.buyer_name || '',
          'Seller Name': item.seller_name || '',
          'Project': item.project_name || '',
          'Tower': item.tower_name || '',
          'Model': item.model || '',
          'Property Name': item.property_name || '',
          'Currency': item.code || '',
          'Concept': item.NAME || '',
          'Date': item.date || '',
          'Payment Total': (((item.amount || 0) + (item.penelty || 0)) - (item.calc_payment_amount || 0)) || 0,
          // item.symbol + Number((((item.amount || 0) + (item.penelty || 0)) - (item.calc_payment_amount || 0))).toFixed(2),
          'Total Arrear': Number((item.total_amount || 0)).toFixed(2),
        });
      }
      this.exportAsExcelFile(finalData, 'arrearReport-');
    }
  }

  // getTransformedAmount(value: any) {
  //   return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  // }

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

  generateOverdueReport() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.year = new Date(this.input.end_date).getFullYear(),
      input.month = new Date(this.input.end_date).getMonth() + 1;

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
    if (this.selectedBuyers) {
      const d = this.selectedBuyers.map(o => o.id);
      input.buyer_id = d;
    }
    if (this.selectedLegalReps) {
      const d = this.selectedLegalReps.map(o => o.id);
      input.legal_rep_id = d;
    }
    if (this.selectedBuyerDev) {
      const d = this.selectedBuyerDev.map(o => o.id);
      input.buyer_dev_id = d;
    }
    this.isShow = false;
    this.admin.postDataApi('generateOverdueReport', input).subscribe(r => {
      this.spinner.hide();
      this.dash  = r.data;
      this.chartView = [
        {
          'name': '61-90',
          'value': parseFloat(this.dash.above_60)
        },
        {
          'name': '31-60',
          'value': parseFloat(this.dash.below_60)
        },
        {
          'name': '91+',
          'value': parseFloat(this.dash.above_90)
        },
        {
          'name': '1-30',
          'value': parseFloat(this.dash.below_30)
        }
      ];
     
     
      // this.overdueReportDetails = r.data;
      this.dash.above_60 = parseFloat(this.dash.above_60 );
      this.dash.above_90 = parseFloat(this.dash.above_90 );
      this.dash.below_30 = parseFloat(this.dash.below_30 );
      this.dash.below_60 = parseFloat(this.dash.below_60 );
      // this.overdueReportDetails['overdueTotal'] = ((this.overdueReportDetails.below_30 || 0) + (this.overdueReportDetails.below_60 || 0) + 
      // (this.overdueReportDetails.above_60 || 0) + (this.overdueReportDetails.above_90 || 0));
      // this.isShow = true;
    }, (error) => {
      this.spinner.hide();
    });
  }


  generateTableReport() {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');
    input.year = new Date(this.input.end_date).getFullYear(),
    input.month = new Date(this.input.end_date).getMonth() + 1;

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
    if (this.selectedBuyers) {
      const d = this.selectedBuyers.map(o => o.id);
      input.buyer_id = d;
    }
    if (this.selectedLegalReps) {
      const d = this.selectedLegalReps.map(o => o.id);
      input.legal_rep_id = d;
    }
    if (this.selectedBuyerDev) {
      const d = this.selectedBuyerDev.map(o => o.id);
      input.buyer_dev_id = d;
    }
    //this.isShow = false;
    this.admin.postDataApi('generateOverdueReportIntable', input).subscribe(r => {
      this.spinner.hide();
      this.overdueReportTableDetails  = r.data;
      this.tested  = Object.values(r.data);
      for (let index = 0; index < this.tested.length; index++) {
        const element = this.tested[index];
        element['overdueTotal'] = (parseFloat(element.below_30 || 0) + parseFloat(element.below_60 || 0) + 
       parseFloat(element.above_60 || 0) + parseFloat(element.above_90 || 0));
      }
    }, (error) => {
      this.spinner.hide();
    });
  }
}
