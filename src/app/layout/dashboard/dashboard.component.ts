// import { Component } from '@angular/core';
// import { IProperty } from '../../common/property';
// import { AdminService } from '../../services/admin.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })

// export class DashboardComponent {

//   chartCommision: any[];
//   chartSales: any[];

//   // options
//   showXAxis = true;
//   showYAxis = true;
//   gradient = false;
//   showLegend = true;
//   showXAxisLabel = true;
//   xAxisLabel = 'Months';
//   showYAxisLabel = true;
//   yAxisLabel = 'Amount';

//   colorScheme = {
//     domain: ['#00B96F']
//   };

//   public parameter: IProperty = {};
//   constructor (private admin: AdminService) {
//     this.chartCommision = [
//       {
//         'name': 'JAN',
//         'value': '10000'
//       },
//       {
//         'name': 'FAB',
//         'value': '15000'
//       },
//       {
//         'name': 'MAR',
//         'value': '12000'
//       },
//       {
//         'name': 'APR',
//         'value': '19000'
//       },
//       {
//         'name': 'MAY',
//         'value': '21000'
//       },
//     ];

//     this.chartSales = [{
//       name: 'Sales',
//       series: this.chartCommision
//     }];
//     this.getListing();
//   }

//   onSelect (e) {

//   }

//   getListing() {
//     this.parameter.noResultFound = false;
//     this.admin.postDataApi('get-details', {}).subscribe(
//     success => {
//       this.parameter.items = success.data;
//       if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
//     });
//   }

// }



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
  chartCommision: any[];
  chartSales: any[];
  all_properties_count = 0;
  rent_properties_count = 0;
  sale_properties_count = 0;
  colorScheme = {
    domain: ['#00B96F']
  };

  public parameter: IProperty = {};
  constructor (private admin: AdminService) {
    const date = new Date();
    this.parameter.min = moment(date.getFullYear() + '-' + (date.getMonth() - 4) + '-' + '01').format('YYYY-MM-DD');
    this.parameter.max = moment().format('YYYY-MM-DD');
    this.getListing();
  }

  onSelect (e) {

  }

  getListing() {
    this.parameter.noResultFound = false;
    const input = {start_date: this.parameter.min, end_date: this.parameter.max};
    this.admin.postDataApi('dashboard', input).subscribe(
    success => {
      this.all_properties_count = success.data.all_properties_count;
      this.rent_properties_count = success.data.rent_properties_count;
      this.sale_properties_count = success.data.sale_properties_count;
      // const data = [];
      // const data1 = [];
      // // commission graph data
      // success.data.commission_graph.forEach(element => {
      //   data.push({
      //     'name': element.month_name + ', ' + element.year,
      //     'value': element.commission
      //   });
      // });
      // this.chartCommision = data;

      // // sale graph data
      // success.data.sale_graph.forEach(element => {
      //   data1.push({
      //     'name': element.month_name + ', ' + element.year,
      //     'value': element.sale
      //   });
      // });

      // this.chartSales = [{
      //   name: 'Sales',
      //   series: data1
      // }];

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

      console.log('========', this.chartCommision, this.chartSales);
      // this.parameter.items = success.data;
      // if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
    });
  }

}
