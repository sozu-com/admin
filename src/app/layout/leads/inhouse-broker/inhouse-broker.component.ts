import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Router } from '@angular/router';
import { Users } from '../../../models/users.model';
declare let swal: any;

@Component({
  selector: 'app-inhouse-broker',
  templateUrl: './inhouse-broker.component.html',
  styleUrls: ['./inhouse-broker.component.css'],
  providers: [Constant]
})
export class InhouseBrokerComponent implements OnInit {

  public parameter: IProperty = {};
  items: Array<Users> = [];

  constructor(
    private admin: AdminService,
    private router: Router,
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
    this.admin.postDataApi('leads/in-house-broker', this.parameter)
      .subscribe(
        success => {
          this.items = success.data;
          this.parameter.total = success.total_count;
        }
      );
  }

}
