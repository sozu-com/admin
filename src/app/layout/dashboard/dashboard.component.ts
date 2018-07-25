import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { DashboardModel } from './../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardModel]
})

export class DashboardComponent {
  public parameter: IProperty = {};

  constructor(private dashModel: DashboardModel, private admin: AdminService, private router: Router, private swal: SweetAlertService) {
  }
}
