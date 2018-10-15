import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../common/property';
import { AdminService } from './../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  public parameter: IProperty = {};
  today = new Date();
  single: any[];
  multi: any[];

  view: any[] = [700, 400];
  chartView: any = [];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Months';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  // red - #ee7b7c, blue - #4a85ff, green - #4eb96f, yellow - #f5d05c
  colorScheme = {
    domain: ['#4eb96f', '#4a85ff', '#ee7b7c', '#f5d05c']
  };

  constructor(public admin: AdminService) {
        Object.assign(this, this.chartView);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    const date = new Date();
    this.parameter.start_date = moment(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + date.getDate()).format('YYYY-MM-DD');
    this.parameter.end_date = moment().format('YYYY-MM-DD');
    this.getReportData();
  }

  getReportData () {
    const input = {start_date: this.parameter.start_date, end_date: this.parameter.end_date};
    this.admin.postDataApi('reports/sellers', input).subscribe(r => {
      this.parameter.items = r.data;
      const data = [];
      this.parameter.items.forEach(element => {
        data.push({
          'name' : element.month_name,
          'series': [
            {
              'name': 'Sign Up',
              'value': element.signup_count
            }, {
              'name': 'Added Property',
              'value': element.property_count
            }, {
              'name': 'Approved',
              'value': element.property_approved
            }, {
              'name': 'Sold',
              'value': element.property_sold
            }
          ]
        });
      });
      this.chartView = data;
      // Object.assign(this, this.chartView);
    });
  }
}
