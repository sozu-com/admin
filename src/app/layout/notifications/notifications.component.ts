import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../common/property';
import { AdminService } from '../../services/admin.service';
import { Constant } from '../../common/constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public parameter: IProperty = {};
  constructor(public admin: AdminService, private constant: Constant, private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.getNotifications();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getNotifications();
  }

  getNotifications() {
    this.spinner.show();
    this.admin.postDataApi('getNotifications', {page: this.parameter.page}).subscribe(r => {
      this.spinner.hide();
      this.parameter.items = r.data;
      this.parameter.total = r.total_count;
    }, error => {
      this.spinner.hide();
    });
  }

  redirect(item) {
    console.log('redirect', item.notification_type, item.notification_data);
    let redirectPath;
    switch (item.notification_type) {
      case 4:
        // new lead assigned to csr seller
        redirectPath = '/dashboard/leads/csr-sellers';
        break;
      case 5:
        // when developer schedule meeting
        redirectPath = '/dashboard/leads/csr-sellers';
        break;
      case 6:
        // new lead assigned to csr closer
        redirectPath = '/dashboard/leads/csr-closers';
        break;
      case 7:
        // new lead assigned to inhouse broker
        redirectPath = '/dashboard/leads/inhouse-broker';
        break;
      case 8:
        // new lead assigned to csr buyer
        redirectPath = '/dashboard/leads/csr-buyers';
        break;
      case 14:
        // token amount paid by user
        redirectPath = '/dashboard/leads/inhouse-broker';
        break;
      case 25:
        // new lead assigned to bank
        redirectPath = '/dashboard/banks/bank-leads';
        break;
      case 26:
        // new lead assigned to notary
        redirectPath = '/dashboard/notary/notary-leads';
        break;
    }

    if (item.notification_type !== 5) {
      this.router.navigate([redirectPath, item.notification_data.ref_id]);
    }
  }
}
