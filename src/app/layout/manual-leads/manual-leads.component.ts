import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Constant } from './../../common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-manual-leads',
  templateUrl: './manual-leads.component.html',
  styleUrls: ['./manual-leads.component.css']
})

export class ManualLeadsComponent implements OnInit {

  public parameter: IProperty = {};
  items = [];

  constructor(
    private admin: AdminService,
    private constant: Constant,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
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
    this.parameter.url = 'getManualLeads';
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          console.log('suceess', success);
          this.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.spinner.hide();
        });
  }
}
