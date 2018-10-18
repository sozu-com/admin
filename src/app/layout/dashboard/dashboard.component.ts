import { Component } from '@angular/core';
import { IProperty } from '../../common/property';
import { AdminService } from '../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

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
  constructor (private admin: AdminService) {
    const date = new Date();
    this.parameter.min = moment(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + '01').format('YYYY-MM-DD');
    this.parameter.max = moment().format('YYYY-MM-DD');

    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'];
    });

    this.getReportData();
  }


  getReportData() {
    this.parameter.noResultFound = false;
    const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    this.admin.postDataApi('dashboard', input).subscribe(
    success => {
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
    });
  }
}
