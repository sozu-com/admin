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

  public parameter: IProperty = {};
  constructor(public constant: Constant, private admin: AdminService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    // console.log('ip', this.viewed_properties);
  }

  viewProperties(data, user_id) {
    // this.parameter.viewed_properties = data;
    // this.showPropertyModal.nativeElement.click();
    this.parameter.loading = true;
    this.admin.postDataApi('leads/viewedProperties', {user_id: user_id, page: this.parameter.page}).subscribe(r => {
      this.parameter.loading = false;
      this.parameter.viewed_properties = r.data;
      console.log('Country', this.parameter.viewed_properties);
      this.showPropertyModal.nativeElement.click();
    }, error => {
      this.parameter.loading = false;
    });
  }
}
