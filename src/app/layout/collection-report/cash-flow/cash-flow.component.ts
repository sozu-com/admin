import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/assets/js/canvasjs.min.js';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { CollectionReport } from 'src/app/models/collection-report.model';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
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
  expectedData: Array<any>;
  actualData: Array<any>;

  constructor(public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
  }

  onSelect(event) {}

  ngOnInit() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(12, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.iniDropDownSetting();
    this.searchBuilding();
    this.getCurrencies();
    this.initCalendarLocale();
    this.getReportData();
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

  getReportData () {
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

    this.spinner.show();
    this.admin.postDataApi('graphs/cash-flow', input).subscribe(r => {
      this.spinner.hide();
      this.reportData = r['data'];

      // for (let index = 0; index < this.reportData['expected'].length; index++) {
      //   const element = this.reportData['expected'][index];
      //   const temp = {
      //     type: 'stackedBar',
      //     name: 'Meals',
      //     showInLegend: 'true',
      //     xValueFormatString: 'DD, MMM',
      //     yValueFormatString: '$#,##0',
      //     dataPoints: [
      //       { x: new Date(2017, 0, 30), y: 56 },
      //       { x: new Date(2017, 0, 31), y: 45 },
      //       { x: new Date(2017, 1, 1), y: 71 },
      //       { x: new Date(2017, 1, 2), y: 41 },
      //       { x: new Date(2017, 1, 3), y: 60 },
      //       { x: new Date(2017, 1, 4), y: 75 },
      //       { x: new Date(2017, 1, 5), y: 98 }
      //     ]
      //   };
      // }
      this.plotData();
    }, error => {
      this.spinner.hide();
    });
  }

  plotData() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
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
      }]
    });
    chart.render();

    function toggleDataSeries(e) {
      if (typeof(e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      chart.render();
    }
  }

  resetFilters() {
    this.input = new CollectionReport();
    this.input.start_date = moment().subtract(6, 'months').toDate();
    this.input.end_date = moment().toDate();
    this.selectedCurrencies = [];
    this.selctedProjects = [];
  }
}
