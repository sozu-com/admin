import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../../common/property';
import { AdminService } from './../../../services/admin.service';
import * as moment from 'moment';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {

  public parameter: IProperty = {};
  today = new Date();
  chartView: any = [];
  totalSignUpCount: number;
  totalPropertyCount: number;
  colorScheme = {
    domain: ['#ee7b7c', '#f5d05c']
  };

  constructor(public admin: AdminService) {
    // Object.assign(this, this.chartView);
  }

  onSelect(event) {}

  ngOnInit() {
    const date = new Date();
    this.parameter.min = new Date(date.getFullYear() + '-' + '01' + '-' + '01');
    this.parameter.max = date;
    // this.parameter.min = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
    // this.parameter.max = moment().format('YYYY-MM-DD');
    this.getReportData();
  }

  getReportData () {
    this.totalSignUpCount = 0; this.totalPropertyCount = 0;
    // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    const input = {start_date: moment(this.parameter.min).format('YYYY-MM-DD'), end_date: moment(this.parameter.max).format('YYYY-MM-DD')};
    this.parameter.loading = true;
    this.admin.postDataApi('reports/bank', input).subscribe(r => {
      this.parameter.loading = false;
      this.parameter.items = r.data;
      const data = [];
      this.parameter.items.forEach(element => {
        this.totalSignUpCount = this.totalSignUpCount + element.signup_count;
        this.totalPropertyCount = this.totalPropertyCount + element.property_count;
        data.push({
          'name' : element.month_name + ', ' + element.year,
          'series': [
            {
              'name': 'Sign Up',
              'value': element.signup_count
            }, {
              'name': 'Properties',
              'value': element.property_count
            }
          ]
        });
      });
      this.parameter.total = this.totalSignUpCount + this.totalPropertyCount;
      this.chartView = data;
      // Object.assign(this, this.chartView);
    }, error => {
      this.parameter.loading = false;
    });
  }
}
