import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.css']
})
export class NotaryComponent implements OnInit {

  public parameter: IProperty = {};
  today = new Date();
  chartView: any = [];
  totalSignUpCount: number;
  totalPropertyCount: number;
  colorScheme = {
    domain: ['#4eb96f', '#4a85ff']
  };

  constructor(public admin: AdminService, private spinner: NgxSpinnerService,
    private translate: TranslateService) {
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
    this.totalSignUpCount = 0; this.totalPropertyCount = 0;
    // const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    const input = {start_date: moment(this.parameter.min).format('YYYY-MM-DD'), end_date: moment(this.parameter.max).format('YYYY-MM-DD')};
    this.spinner.show();
    this.admin.postDataApi('reports/noatary', input).subscribe(r => {
      this.spinner.hide();
      this.parameter.items = r.data;
      const data = [];
      this.parameter.items.forEach(element => {
        this.totalSignUpCount = this.totalSignUpCount + element.signup_count;
        this.totalPropertyCount = this.totalPropertyCount + element.property_count;
        data.push({
          'name' : element.month_name + ', ' + element.year,
          'series': [
            {
              'name': this.translate.instant('reports.signUp'),
              'value': element.signup_count
            }, {
              'name': this.translate.instant('reports.properties'),
              'value': element.property_count
            }
          ]
        });
      });
      this.parameter.total = this.totalSignUpCount + this.totalPropertyCount;
      this.chartView = data;
      // Object.assign(this, this.chartView);
    }, error => {
      this.spinner.hide();
    });
  }
}
