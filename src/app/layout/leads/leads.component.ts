import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Router } from '@angular/router';
import { Users } from '../../models/users.model';
declare let swal: any;

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {

  public parameter: IProperty = {};

  items: Array<Users> = [];

  constructor(
    private admin: AdminService
  ) { }

  ngOnInit() {
    this.parameter.page = 1;
    this.parameter.flag = 2;
    // this.getListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }
  changeFilter(key, value) {
    this.parameter[key] = value;
    this.getListing();
  }
  getListing() {
    this.parameter.loading = true;
    this.parameter.url = 'leads/csr-buyer';

    const input = new FormData();
    if (this.parameter.page) {
      input.append('page', this.parameter.page.toString());
    }
    if (this.parameter.flag) {
      input.append('flag', this.parameter.flag.toString());
    }
    if (this.parameter.name) {
      input.append('name', this.parameter.name);
    }
    if (this.parameter.email) {
      input.append('email', this.parameter.email);
    }
    if (this.parameter.phone) {
      input.append('phone', this.parameter.phone);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log(success);
          this.parameter.loading = false;
          this.items = success.data;
          this.parameter.total = success.total;
        }
      );
  }
}
