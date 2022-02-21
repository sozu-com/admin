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
import { PricePipe } from 'src/app/pipes/price.pipe';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css'],
  providers: [PricePipe]
})
export class CashFlowComponent implements OnInit {

  public parameter: IProperty = {};
  multiDropdownSettings: any;
  input: CollectionReport;
  projects: Array<any>;
  selctedProjects: Array<any>;
  currencies: Array<any>;
  selectedCurrencies: Array<any>;
  colorScheme = {
    domain: ['#ee7b7c', '#f5d05c']
  };
  locale: any;
  today = new Date();
  reportData: any;
  reportData_stp: any;
  reportsData: any;
  expectedTotal: any;
  actualTotal: any;
  pay_method_Total: any;
  expectedData: any;
  actualData: Array<any>;
  paymentChoices: Array<any>;
  finalData: Array<any>;
  finalData1: Array<any>;
  bankTransfer_cash_flow: Array<any>;
  stp_final: Array<any>;
  finalData2: Array<any>;
  items: Array<any>;
  finalDataExpacted: Array<any>;
  finalDataActual: Array<any>;
  finalDataPending: Array<any>;
  finalDatadue: Array<any>;
  reportType: number;
  start_purchase_date: any;
  end_purchase_date: any;
  y: any;
  already_index: any;
  cashFlowInfos: any[];
  empList: Array<any>;
  actualList: Array<any> = [];
  methodList: Array<any> = [];
  finalData3: Array<any> = [];
  arrearList: Array<any> = [];
  arrearTotal: any; manually_method_total: any;
  constructor(public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private price: PricePipe) {
  }

  onSelect(event) { }

  ngOnInit() {
    this.reportType = 1;
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.iniDropDownSetting();
    this.searchBuilding();
    this.getCurrencies();
    this.initCalendarLocale();
    this.getAllPaymentChoices();
    this.getReportData();

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.initCalendarLocale();
    });

  }

  getListing() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }

    this.spinner.show();
    this.admin.postDataApi('graphs/cash-flow-v2', input).subscribe(r => {
      this.spinner.hide();
      this.reportsData = r['data'];
      this.finalDataExpacted = [];
      for (let index = 0; index < this.reportsData['expected'].length; index++) {
        const element = this.reportsData['expected'][index];
        // array to export
        const obj = {
          label: element.label,
          expected: element.y,
          total_expected: this.reportsData['total_expected'][index].y,
          pending: this.reportsData['pending'][index].y,
          total_pending: this.reportsData['total_pending'][index].y,
          actual: this.reportsData['actual'][index].y
        };
        this.finalDataExpacted.push(obj);
      }


      // this.admin.postDataApi('graphs/cash-flow-v2', input).subscribe(r => {
      //   this.spinner.hide();
      //   this.finalDataExpacted = [];
      //   this.finalDataActual = [];
      //   this.finalDataPending = [];
      //   this.finalDatadue = []
      //   const reportData = r['data'];
      //   console.log(reportData,"reportData")
      //   for (let index = 0; index < reportData['expected'].length; index++) {
      //     const element = reportData['expected'][index];
      //     for (let ind = 0; ind < element.y.length; ind++) {
      //       const obj = {expected: element.y[ind].y, label: element.y[ind].label};
      //     this.finalDataExpacted.push(obj);
      //     }
      //   }
      //   for (let index = 0; index < reportData['actual'].length; index++) {
      //     const element = reportData['actual'][index];
      //     for (let ind = 0; ind < element.y.length; ind++) {
      //       const obj = {actual: element.y[ind].y, label: element.y[ind].label};
      //     this.finalDataActual.push(obj);
      //     }
      //   }
      //   for (let index = 0; index < reportData['pending'].length; index++) {
      //     const element = reportData['pending'][index];
      //     for (let ind = 0; ind < element.y.length; ind++) {
      //       const obj = {pending: element.y[ind].y, label: element.y[ind].label};
      //     this.finalDataPending.push(obj);
      //     }
      //   }

      //   for (let index = 0; index < reportData['total_over_due'].length; index++) {
      //     const element = reportData['total_over_due'][index];
      //     for (let ind = 0; ind < element.y.length; ind++) {
      //       const obj = {total_over_due: element.y[ind].y, label: element.y[ind].label};
      //     this.finalDatadue.push(obj);
      //     }
      //   }

    }, error => {
      this.spinner.hide();
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

  getAllPaymentChoices() {
    this.admin.postDataApi('getPaymentChoices', {})
      .subscribe(
        success => {
          this.paymentChoices = success.data;
        }, error => {
          this.spinner.hide();
        });
  }

  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 3
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

  getReportData() {
    this.reportType = 1;
    this.getReportData1();
    this.getReportData2();
    this.getReportData3();
    this.getReportData4();
    this.getReportData6();
    this.getListing();
  }
  getReportData4() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }


    this.spinner.show();
    this.admin.postDataApi('graphs/payment-cash-flow', input).subscribe(r => {
      this.spinner.hide();
      this.stp_final = [];
      const reportData = r['data'];
      for (let index = 0; index < reportData['payment'].length; index++) {
        const element = reportData['payment'][index];
        const ff = []; let d = {};
        let sum1: any = element.y.map(a => a.y).reduce(function (a, b) {
          return a + b;
        });
        this.actualList.push(sum1);
        var total = this.actualList.reduce(function (a, b) { return a + b; });
        this.actualTotal = total;
        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label, };
          ff.push(d);
        }
        this.stp_final.push(ff);
      }
      this.plotData5();
    }, error => {
      this.spinner.hide();
    });
  }


  getReportData1() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }


    this.spinner.show();
    this.admin.postDataApi('graphs/cash-flow', input).subscribe(r => {
      this.spinner.hide();
      this.finalData = [];
      this.finalData1 = [];
      this.finalData3 = [];
      this.empList = [];
      this.actualList = [];
      const reportData = r['data'];
      for (let index = 0; index < reportData['expected'].length; index++) {
        const element = reportData['expected'][index];
        const ff = []; let d = {};
        let sum: any = element.y.map(a => a.y).reduce(function (a, b) {
          return a + b;
        });
        this.empList.push(sum);
        var total = this.empList.reduce(function (a, b) { return a + b; });
        this.expectedTotal = total;

        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label };
          ff.push(d);
        }
        this.finalData.push({
          legendText: element.label,
          showInLegend: 'true',
          type: 'stackedColumn',
          dataPoints: ff
        });

      }
      this.plotData();

      for (let index = 0; index < reportData['actual'].length; index++) {
        const element = reportData['actual'][index];
        const ff = []; let d = {};
        // let sum1: any = element.y.map(a => a.y).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.actualList.push(sum1);
        // var total = this.actualList.reduce(function (a, b) { return a + b; });
        // this.actualTotal = total;
        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label };
          ff.push(d);
        }
        this.finalData1.push({
          legendText: element.label,
          showInLegend: 'true',
          type: 'stackedColumn',
          dataPoints: ff
        });
      }
      this.plotData1();

      for (let index = 0; index < reportData['arrear'].length; index++) {
        const element = reportData['arrear'][index];
        const ff = []; let d = {};
        // let sum1: any = element.y.map(a => a.y).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.arrearList.push(sum1);
        // var total = this.actualList.reduce(function (a, b) { return a + b; });
        // this.arrearTotal = total;
        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label };
          ff.push(d);
        }
        this.finalData3.push({
          legendText: element.label,
          showInLegend: 'true',
          type: 'stackedColumn',
          dataPoints: ff
        });
      }
      this.plotData4();
    }, error => {
      this.spinner.hide();
    });
  }

  getReportData2() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }

    this.spinner.show();
    this.admin.postDataApi('graphs/cash-flows', input).subscribe(r => {
      this.spinner.hide();
      this.reportData = r['data'];

      this.items = [];
      for (let index = 0; index < this.reportData['expected'].length; index++) {
        const element = this.reportData['expected'][index];
        // array to export
        const obj = { label: element.label, expected: element.y, actual: this.reportData['actual'][index].y };

        this.items.push(obj);
        // expected output: 81
      }
      let sum: number = this.items.map(a => a.expected).reduce(function (a, b) {
        return a + b;
      });
      console.log(sum, "Expected & Actual Revenue");
      let sum1: number = this.items.map(a => a.actual).reduce(function (a, b) {
        return a + b;
      });
      console.log(sum1, "Expected & Actual Revenue");

      this.plotData2();
    }, error => {
      this.spinner.hide();
    });
  }

  getReportData3() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }


    this.spinner.show();
    this.admin.postDataApi('graphs/expenditure-cash-flow', input).subscribe(r => {
      this.spinner.hide();
      this.finalData = [];
      this.finalData1 = [];
      this.empList = [];
      this.actualList = [];
      const reportData = r['data'];
      for (let index = 0; index < reportData['expected'].length; index++) {
        const element = reportData['expected'][index];
        const ff = []; let d = {};
        let sum: any = element.y.map(a => a.y).reduce(function (a, b) {
          return a + b;
        });
        this.empList.push(sum);
        var total = this.empList.reduce(function (a, b) { return a + b; });
        this.expectedTotal = total;

        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label };
          ff.push(d);
        }
        //   this.finalData.push({
        //     legendText: element.label,
        //     showInLegend: 'true',
        //     type: 'stackedColumn',
        //     dataPoints: ff
        //   });

      }
      //this.plotData();

      for (let index = 0; index < reportData['actual'].length; index++) {
        const element = reportData['actual'][index];
        const ff = []; let d = {};
        // let sum1: any = element.y.map(a => a.y).reduce(function (a, b) {
        //   return a + b;
        // });
        // this.actualList.push(sum1);
        // var total = this.actualList.reduce(function (a, b) { return a + b; });
        // this.actualTotal = total;
        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label };
          ff.push(d);
        }
        this.finalData1.push({
          legendText: element.label,
          showInLegend: 'true',
          type: 'stackedColumn',
          dataPoints: ff
        });
      }
      this.plotData3();
    }, error => {
      this.spinner.hide();
    });
  }

  getReportData6() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }


    this.spinner.show();
    this.admin.postDataApi('graphs/bankTransfer-cash-flow', input).subscribe(r => {
      this.spinner.hide();
      this.bankTransfer_cash_flow = [];
      const reportData = r['data'];
      for (let index = 0; index < reportData['payment'].length; index++) {
        const element = reportData['payment'][index];
        const ff = []; let d = {};
        for (let ind = 0; ind < element.y.length; ind++) {
          d = { y: element.y[ind].y, label: element.y[ind].label };
          ff.push(d);
        }
        this.bankTransfer_cash_flow.push(ff);
      }
      this.plotData6();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {
    let self = this;
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportFileName: 'cash-flow',
      exportEnabled: true,
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            if (i == 0) {
              content += "<span style='color:#5a728d'> Layaway Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 1) {
              content += "<span style='color:#c0514f'> Down Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 2) {
              content += "<span style='color:#9bbb58'> Payment Upon Delivery</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 3) {
              content += "<span style='color:#23bfaa'> Special Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 4) {
              content += "<span style='color:#8165a2'> Monthly Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 5) {
              content += "<span style='color:#4aacc5'> Cancel Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
          }
          return content;
        }
      },
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      data: this.finalData
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  plotData1() {
    let self = this;
    const chart = new CanvasJS.Chart('chartContainer1', {
      animationEnabled: true,
      exportFileName: 'cash-flow',
      exportEnabled: true,
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            if (i == 0) {
              content += "<span style='color:#5a728d'> Layaway Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 1) {
              content += "<span style='color:#c0514f'> Down Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 2) {
              content += "<span style='color:#9bbb58'> Payment Upon Delivery</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 3) {
              content += "<span style='color:#23bfaa'> Special Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 4) {
              content += "<span style='color:#8165a2'> Monthly Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 5) {
              content += "<span style='color:#4aacc5'> Cancel Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
          }
          return content;
        }
      },
      data: this.finalData1
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  plotData2() {
    const chart = new CanvasJS.Chart('chartContainer2', {
      animationEnabled: true,
      exportFileName: 'cash-flow',
      exportEnabled: true,
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: 'pointer',
        itemclick: toggleDataSeries
      },
      data: [{
        type: 'column',
        name: 'Expected Cash Flow',
        legendText: 'Expected Cash Flow',
        color: '#4a85ff',
        showInLegend: true,
        dataPoints: this.reportData['expected']
      },
      {
        type: 'column',
        name: 'Actual Cash Flow',
        legendText: 'Actual Cash Flow',
        color: '#ee7b7c',
        // axisYType: "secondary",
        showInLegend: true,
        dataPoints: this.reportData['actual']
      }
      ]
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  plotData3() {
    let self = this;
    const chart = new CanvasJS.Chart('chartContainer3', {
      animationEnabled: true,
      exportFileName: 'cash-flow',
      exportEnabled: true,
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            if (i == 0) {
              content += "<span style='color:#5a728d'> Layaway Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 1) {
              content += "<span style='color:#c0514f'> Down Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 2) {
              content += "<span style='color:#9bbb58'> Payment Upon Delivery</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 3) {
              content += "<span style='color:#23bfaa'> Special Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 4) {
              content += "<span style='color:#8165a2'> Monthly Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
          }
          return content;
        }
      },
      data: this.finalData1
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  plotData4() {
    let self = this;
    const chart = new CanvasJS.Chart('chartContainer4', {
      animationEnabled: true,
      exportFileName: 'Total-Arrear',
      exportEnabled: true,
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            if (i == 0) {
              content += "<span style='color:#5a728d'> Overdue 30</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 1) {
              content += "<span style='color:#c0514f'> Overdue 60</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 2) {
              content += "<span style='color:#9bbb58'> Overdue 90</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 3) {
              content += "<span style='color:#23bfaa'> Past due</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
          }
          return content;
        }
      },
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      data: this.finalData3
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  plotData5() {
    let self = this;
    const chart = new CanvasJS.Chart('chartContainer5', {
      animationEnabled: true,
      exportFileName: 'cash-flow',
      exportEnabled: true,
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            var total = e.entries.reduce((accumulator, current) => accumulator + current.dataPoint.y, 0);
            this.pay_method_Total = (total).toFixed(2);
            if (i == 0) {
              content += "<span style='color:#4285F4'>Cash</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 1) {
              content += "<span style='color:#EA4335'> Check </span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 2) {
              content += "<span style='color:#FBBC04'> Bank transfer </span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            // else if (i == 3) {
            //   content += "<span style='color:#23bfaa'> Special Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
            //   content += "<br/>";
            // }
            // else if (i == 4) {
            //   content += "<span style='color:#8165a2'> Monthly Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
            //   content += "<br/>";
            // }
          }
          content += "<span style='color:#00B96F;'> Total </span>" + "   " + self.price.transform(this.pay_method_Total);
          content += "<br/>";
          return content;
        }
      },
      // data: this.stp_final
      data: [{
        name: 'Cash',
        legendText: 'Cash',
        type: 'stackedColumn',
        color: '#4285F4',
        showInLegend: true,
        dataPoints: this.stp_final[0]
      },
      {
        type: 'stackedColumn',
        name: 'Check',
        legendText: 'Check',
        color: '#EA4335',
        showInLegend: true,
        dataPoints: this.stp_final[1]
      },
      {
        type: 'stackedColumn',
        name: 'Bank transfer',
        legendText: 'Bank transfer',
        color: '#FBBC04',
        showInLegend: true,
        dataPoints: this.stp_final[2]
      }]
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  plotData6() {
    let self = this;
    const chart = new CanvasJS.Chart('chartContainer6', {
      animationEnabled: true,
      exportFileName: 'cash-flow',
      exportEnabled: true,
      title: {
        // text: "Crude Oil Reserves vs Production, 2016"
      },
      toolTip: {
        shared: true,
        contentFormatter: function (e) {
          var content = " ";
          for (var i = 0; i < e.entries.length; i++) {
            if (i == 0) {
              content += "<span style='color:#5a728d'>bank amount</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            else if (i == 1) {
              content += "<span style='color:#c0514f'>STP amount</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
              content += "<br/>";
            }
            // else if (i == 2) {
            //   content += "<span style='color:#9bbb58'> Payment Upon Delivery</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
            //   content += "<br/>";
            // }
            // else if (i == 3) {
            //   content += "<span style='color:#23bfaa'> Special Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
            //   content += "<br/>";
            // }
            // else if (i == 4) {
            //   content += "<span style='color:#8165a2'> Monthly Payment</span>" + "   " + self.price.transform(e.entries[i].dataPoint.y);
            //   content += "<br/>";
            // }
          }
          // content += "<span style='color:#00B96F;'> Total </span>" + "   " + self.price.transform(this.manually_method_total);
          // content += "<br/>";
          return content;
        }
      },
      //data: this.bankTransfer_cash_flow
      data: [{
        name: 'bank amount',
        legendText: 'bank amount',
        type: 'stackedColumn',
        color: '#5a728d',
        showInLegend: true,
        dataPoints: this.bankTransfer_cash_flow[0]
      },
      {
        type: 'stackedColumn',
        name: 'STP amount',
        legendText: 'STP amount',
        color: '#c0514f',
        showInLegend: true,
        dataPoints: this.bankTransfer_cash_flow[1]
      }]
    });
    chart.render();
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.start_purchase_date = null;
    this.end_purchase_date = null;
    this.selectedCurrencies = [];
    this.selctedProjects = [];
  }

  exportData() {
    const input: any = JSON.parse(JSON.stringify(this.input));
    input.start_date = moment(this.input.start_date).format('YYYY-MM-DD');
    input.end_date = moment(this.input.end_date).format('YYYY-MM-DD');

    if (this.selctedProjects) {
      const d = this.selctedProjects.map(o => o.id);
      input.building_id = d;
    }
    if (this.selectedCurrencies) {
      const d = this.selectedCurrencies.map(o => o.id);
      input.currency_id = d;
    }

    if (this.input.start_purchase_date) {
      input.start_purchase_date = moment(this.input.start_purchase_date).format('YYYY-MM-DD');
    }
    if (this.input.end_purchase_date) {
      input.end_purchase_date = moment(this.input.end_purchase_date).format('YYYY-MM-DD');
    }

    this.spinner.show();
    this.admin.postDataApi('graphs/cash-flows-export', input).subscribe(r => {
      let data = r.data;
      const finalData = [];
      data.actual.forEach((element, index) => {
        finalData.push({
          'Month': element.label || '',
          'Expected Amount': data.expected[index].y || 0,
          'Actual Amount': element.y || 0
        });
        element.id.forEach(item => {
          finalData.push({
            'Collection ID': item.id || '',
            'Property name': item.name || '',
            'Buyer name': item.buyer_name || '',
            'Date': item.payment_date || '',
            'Amount paid': item.amount || 0
          });
        });
      })
      this.spinner.hide();
      this.exportAsExcelFile(finalData, 'cashFlow-');
    });
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

  getCashFlowInfo(item, index) {
    if (item && (this.reportData.actual || []).length > 0) {
      if (index != this.already_index) {
        this.already_index = index;
        this.cashFlowInfos = [];
        let data = this.reportData.actual.find(value => value.label == item.label);
        let id = data.id ? data.id.split(',') : undefined;
        let param = {
          id: id
        }
        this.spinner.show();
        this.admin.postDataApi('graphs/cash-flow-actualinfo', param)
          .subscribe(
            success => {
              this.cashFlowInfos = success.data;
              this.spinner.hide();
            }, error => {
              this.spinner.hide();
            });
      }
    }
  }
}
