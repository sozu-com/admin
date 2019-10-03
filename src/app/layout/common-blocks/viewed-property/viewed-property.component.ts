import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';

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
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};
  constructor(public constant: Constant, private admin: AdminService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.parameter.page = this.constant.p;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
  }

  getPageForViewedProperty(page) {
    this.parameter.page = page;
    this.viewProperties('', this.user_id, this.parameter.page);
  }


  viewProperties(data, user_id, page) {
    // this.parameter.viewed_properties = data;
    // this.showPropertyModal.nativeElement.click();
    this.spinner.show();
    this.admin.postDataApi('leads/viewedProperties', {user_id: user_id, page: page}).subscribe(r => {
      this.spinner.hide();
      this.parameter.viewed_properties = r.data;
      this.parameter.total = r.total;
      if (this.parameter.page === 1) {
        this.showPropertyModal.nativeElement.click();
      }
    }, error => {
      this.spinner.hide();
    });
  }
}
