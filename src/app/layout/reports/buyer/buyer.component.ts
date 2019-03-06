import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../common/property';
import { AdminService } from './../../../services/admin.service';
import * as moment from 'moment';

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

  constructor(public admin: AdminService) {
    // Object.assign(this, this.chartView);
  }

  onSelect(event) {}

  ngOnInit() {
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
    this.parameter.loading = true;
    this.admin.postDataApi('reports/buyers', input).subscribe(r => {
      this.parameter.loading = false;
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
              'name': 'Sign Up',
              'value': element.signup_count
            }, {
              'name': 'Added Information',
              'value': element.info_count
            }, {
              'name': 'Brokers Assigned',
              'value': element.broker_count
            }, {
              'name': 'Sold',
              'value': element.property_sold
            }
          ]
        });
      });
      this.parameter.total = this.totalSignUpCount + this.totalInfoCount + this.totalBrokerCount + this.totalSold;
      this.chartView = data;
      // Object.assign(this, this.chartView);
    }, error => {
      this.parameter.loading = false;
    });
  }
}
