import { Component, OnInit } from '@angular/core';
import { IProperty } from '../../common/property';
import { AdminService } from '../../services/admin.service';
import { Constant } from '../../common/constants';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  public parameter: IProperty = {};
  constructor(public admin: AdminService, private constant: Constant) { }

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
    this.parameter.loading = true;
    this.admin.postDataApi('getNotifications', {page: this.parameter.page}).subscribe(r => {
      this.parameter.loading = false;
      this.parameter.items = r.data;
      this.parameter.total = r.total_count;
    }, error => {
      this.parameter.loading = false;
    });
  }
}
