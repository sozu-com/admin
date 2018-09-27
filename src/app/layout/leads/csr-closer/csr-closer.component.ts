import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Constant } from './../../../common/constants';
import { Users } from '../../../models/users.model';
declare let swal: any;

@Component({
  selector: 'app-csr-closer',
  templateUrl: './csr-closer.component.html',
  styleUrls: ['./csr-closer.component.css'],
  providers: [Constant]
})
export class CsrCloserComponent implements OnInit {

  public parameter: IProperty = {};
  items: Array<Users> = [];

  constructor(
    private admin: AdminService,
    private constant: Constant
  ) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.flag = 2;
    this.getListing();
  }

  getPage(page) {
    this.parameter.page = page;
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

  getListing() {
    this.parameter.url = 'leads/csr-closer';
    this.admin.postDataApi(this.parameter.url, this.parameter)
      .subscribe(
        success => {
          this.items = success.data;
          this.parameter.total = success.total_count;
        }
      );
  }

}
