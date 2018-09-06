import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Router } from '@angular/router';
import { Users } from '../../../models/users.model';
declare let swal: any;

@Component({
  selector: 'app-csr-buyer',
  templateUrl: './csr-buyer.component.html',
  styleUrls: ['./csr-buyer.component.css'],
  providers: [Constant]
})
export class CsrBuyerComponent implements OnInit {

  public parameter: IProperty = {};
  items: Array<Users> = [];

  constructor(
    private admin: AdminService,
    private constant: Constant
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.flag = 2;
    this.getListing();
  }

  changeFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
  }

  changeFilter(key, value) {
    this.parameter[key] = value;
    this.getListing();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  getListing() {
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
          console.log('succ', success);
          this.items = success.data;
          this.parameter.total = success.total_count;
        });
  }
}
