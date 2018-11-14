import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Constant } from './../../../common/constants';
import { IProperty } from './../../../common/property';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-viewed-property',
  templateUrl: './viewed-property.component.html',
  styleUrls: ['./viewed-property.component.css']
})
export class ViewedPropertyComponent implements OnInit {

  @Input('viewed_properties') viewed_properties;
  @Input('user_id') user_id;
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;

  itemsPerPage: number;
  page: number;
  total: number;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};
  constructor(public constant: Constant, private admin: AdminService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.page = this.constant.p;
    this.itemsPerPage = this.constant.itemsPerPage;
  }

  getPageForViewedProperty(page) {
    console.log('--', page);
    this.parameter.page = page;
    this.viewProperties('', this.user_id, this.parameter.page);
  }

  openModal(data, user_id, page) {
    this.viewProperties('', user_id, page);
    this.showPropertyModal.nativeElement.click();
  }

  viewProperties(data, user_id, page) {
    // this.parameter.viewed_properties = data;
    // this.showPropertyModal.nativeElement.click();
    this.parameter.loading = true;
    this.admin.postDataApi('leads/viewedProperties', {user_id: user_id, page: page}).subscribe(r => {
      this.parameter.loading = false;
      this.parameter.viewed_properties = r.data;
      this.parameter.total = r.total;
      this.total = r.total;
      console.log('Country', this.parameter.viewed_properties);
    }, error => {
      this.parameter.loading = false;
    });
  }
}
