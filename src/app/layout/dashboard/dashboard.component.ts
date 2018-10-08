import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {

  public parameter: IProperty = {};
  constructor (private admin: AdminService) {
    this.getListing();
  }

  getListing() {
    this.parameter.noResultFound = false;
    this.admin.postDataApi('get-details', {}).subscribe(
    success => {
      this.parameter.items = success.data;
      if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
    });
  }
}
