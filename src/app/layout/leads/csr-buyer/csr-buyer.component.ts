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
  items = [];

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
    this.admin.postDataApi(this.parameter.url, this.parameter)
      .subscribe(
        success => {
          this.items = success.data;
          this.parameter.total = success.total_count;
        });
  }


  blockUnblockPopup(index, id, flag, user_type) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_LEAD;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_LEAD;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.block(index, id, flag, user_type);
      }
    });
  }


  block(index, id, flag, user_type) {
    this.admin.postDataApi('leads/blockLead', {lead_id: id, flag: flag})
      .subscribe(
        success => {
          swal('Success', this.parameter.successText, 'success');
          this.items[index].is_blocked = flag;
        });
  }
}
