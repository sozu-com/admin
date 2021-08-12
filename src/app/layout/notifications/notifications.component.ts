import { Component, OnInit } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public parameter: IProperty = {};
  constructor(public admin: AdminService, private constant: Constant, private router: Router,
    private spinner: NgxSpinnerService,
    private commonSerice: CommonService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.getNotifications();
    this.getNotificationsCount();
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
    let redirectPath: string;
    switch (item.notification_type) {
      case 2:
        // building request accepted
        redirectPath = '/dashboard/projects/details';
        break;
      case 3:
        // building request rejected
        redirectPath = '/dashboard/projects/details';
        break;
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
      case 21:
        // data collector mark as complete
        redirectPath = '/dashboard/projects/details';
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

  readSingleNotification(item) {
    this.spinner.show();
    this.admin.postDataApi('readSingleNotification', {id: item.id}).subscribe(r => {
      this.spinner.hide();
      this.redirect(item);
    }, error => {
      this.spinner.hide();
    });
  }

  getNotificationsCount() {
    this.admin.postDataApi('getNotificationsCount', {}).subscribe(r => {
     localStorage.setItem('notificationCount', r.data.count) ;
     this.commonSerice.notificationUnreadCount.next(r.data.count);
      // this.msg_count = r.total_count;
    });
  }
}
