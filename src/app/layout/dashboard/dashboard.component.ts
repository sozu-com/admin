import { Component } from '@angular/core';
import { IProperty } from '../../common/property';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  chartCommision: any[];
  chartSales: any[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Months';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';

  colorScheme = {
    domain: ['#00B96F']
  };

  public parameter: IProperty = {};
  constructor (private admin: AdminService) {
    this.chartCommision = [
      {
        'name': 'JAN',
        'value': '10000'
      },
      {
        'name': 'FAB',
        'value': '15000'
      },
      {
        'name': 'MAR',
        'value': '12000'
      },
      {
        'name': 'APR',
        'value': '19000'
      },
      {
        'name': 'MAY',
        'value': '21000'
      },
    ];

    this.chartSales = [{
      name: 'Sales',
      series: this.chartCommision
    }];
    this.getListing();
  }

  onSelect (e) {

  }

  getListing() {
    this.parameter.noResultFound = false;
    this.admin.postDataApi('get-details', {}).subscribe(
    success => {
      this.parameter.items = success.data;
      if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
    });
  }

}
