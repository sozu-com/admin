import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  public parameter: IProperty = {};
  today = new Date();
  chartView: any = [];
  totalSignUpCount: number;
  totalInfoCount: number;
  totalBrokerCount: number;
  totalSold: number;
  colorScheme = {
    domain: ['#4eb96f', '#4a85ff', '#ee7b7c', '#f5d05c']
  };
  locale: any;
  constructor(public admin: AdminService, private spinner: NgxSpinnerService,
    private translate: TranslateService) {
    // Object.assign(this, this.chartView);
  }

  onSelect(event) {}

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
    const date = new Date();
    // this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
    // this.parameter.max = date;
    // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
    // this.parameter.max = moment().format('YYYY-MM-DD');
    this.parameter.min = moment().subtract(12, 'months').toDate();
    this.parameter.max = moment().toDate();
    this.getReportData();
  }

  getReportData () {
    this.totalSignUpCount = 0; this.totalInfoCount = 0; this.totalBrokerCount = 0; this.totalSold = 0;
    // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    const input = {start_date: moment(this.parameter.min).format('YYYY-MM-DD'), end_date: moment(this.parameter.max).format('YYYY-MM-DD')};
    this.spinner.show();
    this.admin.postDataApi('reports/buyers', input).subscribe(r => {
      this.spinner.hide();
      this.parameter.items = r.data;
      const data = [];
      this.parameter.items.forEach(element => {
        this.totalSignUpCount = this.totalSignUpCount + element.signup_count;
        this.totalInfoCount = this.totalInfoCount + element.info_count;
        this.totalBrokerCount = this.totalBrokerCount + element.broker_count;
        this.totalSold = this.totalSold + element.property_sold;
        data.push({
          'name' : element.month_name + ', ' + element.year,
          'series': [
            {
              'name': this.translate.instant('reports.signUp'),
              'value': element.signup_count
            }, {
              'name': this.translate.instant('reports.addedInformation'),
              'value': element.info_count
            }, {
              'name': this.translate.instant('reports.inhouseAgentsAssigned'),
              'value': element.broker_count
            }, {
              'name': this.translate.instant('reports.sold'),
              'value': element.property_sold
            }
          ]
        });
      });
      this.parameter.total = this.totalSignUpCount + this.totalInfoCount + this.totalBrokerCount + this.totalSold;
      this.chartView = data;
      // Object.assign(this, this.chartView);
    }, error => {
      this.spinner.hide();
    });
  }
}
