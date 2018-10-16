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
  chartView: any = [];
  totalSignUpCount = 0;
  totalAddedProperty = 0;
  totalApproved = 0;
  totalSold = 0;
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
    this.parameter.start_date = moment(date.getFullYear() + '-' + '01' + '-' + '01').format('YYYY-MM-DD');
    this.parameter.end_date = moment().format('YYYY-MM-DD');
    this.getReportData();
  }

  getReportData () {
    const input = {start_date: this.parameter.start_date, end_date: this.parameter.end_date};
    this.admin.postDataApi('reports/sellers', input).subscribe(r => {
      this.parameter.items = r.data;
      const data = [];
      this.parameter.items.forEach(element => {
        this.totalSignUpCount = this.totalSignUpCount + element.signup_count;
        this.totalAddedProperty = this.totalSignUpCount + element.property_count;
        this.totalApproved = this.totalSignUpCount + element.property_approved;
        this.totalSold = this.totalSignUpCount + element.property_sold;
        data.push({
          'name' : element.month_name + ', ' + element.year,
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
