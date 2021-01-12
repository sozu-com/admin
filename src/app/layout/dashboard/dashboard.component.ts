import { Component } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  locale: any;
  today = new Date();
  chartCommision: any = [];
  chartSales: any = [];
  total_commission = 0;
  total_sales = 0;
  all_properties_count = 0;
  rent_properties_count = 0;
  sale_properties_count = 0;
  fullName: string;
  colorScheme = {
    domain: ['#4eb96f']
  };

  public parameter: IProperty = {};
  constructor (private admin: AdminService,
    private spinner: NgxSpinnerService,
    public ts: TranslateService) {
    const date = new Date();

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
    // this.parameter.min = new Date(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + '01');
    // this.parameter.max = date;
    this.parameter.min = moment().subtract(6, 'months').toDate();
    this.parameter.max = moment().toDate();

    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
    });

    this.getReportData();
  }


  getReportData() {
    this.parameter.noResultFound = false;
   // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    const input = {start_date: moment(this.parameter.min).format('YYYY-MM-DD'), end_date: moment(this.parameter.max).format('YYYY-MM-DD')};
    this.spinner.show();
    this.admin.postDataApi('dashboard', input).subscribe(
    success => {
      this.spinner.hide();
      this.all_properties_count = success.data.all_properties_count;
      this.rent_properties_count = success.data.rent_properties_count;
      this.sale_properties_count = success.data.sale_properties_count;
      const data = [];
      const data1 = [];
      // commission graph data
      success.data.commission_graph.forEach(element => {
        this.total_commission = this.total_commission + element.commission;
        data.push({
          'name': element.month_name + ', ' + element.year,
          'value': element.commission
        });
      });
      this.chartCommision = data;

      // sale graph data
      success.data.sale_graph.forEach(element => {
        this.total_sales = this.total_sales + element.sale;
        data1.push({
          'name': element.month_name + ', ' + element.year,
          'value': element.sale
        });
      });

      this.chartSales = [{
        name: 'Sales',
        series: data1
      }];
    }, error => {
      this.spinner.hide();
    });
  }
}
