import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { DashboardModel } from './../../models/dashboard.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardModel]
})

export class DashboardComponent {
  public parameter: IProperty = {};

  constructor(private dashModel: DashboardModel, private admin: AdminService, private router: Router, private swal: SweetAlertService) {  
    // this.dashboard();
  }

  dashboard(){
    this.parameter.loading = true;
    this.parameter.url = 'dashboard';
    this.admin.getDataApi(this.parameter.url)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.dashModel = success.data;
          console.log(this.dashModel, success)
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }
}
