import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-preferences-property',
  templateUrl: './preferences-property.component.html',
  styleUrls: ['./preferences-property.component.css']
})
export class PreferencesPropertyComponent implements OnInit {

  //@Input('preferences_properties') preferences_properties;
  _preferences_properties: any[] = [];
  get preferences_properties(): any {
    return this.preferences_properties;
  }
  @Input() set preferences_properties(value: any) {
    this._preferences_properties = value;
  }
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
    this.admin.postDataApi('leads/PreferencesProperty', {user_id: user_id, page: page}).subscribe(r => {
      this.spinner.hide();
      this.parameter.preferences_properties = r.data;
      this.parameter.total = r.total;
      if (this.parameter.page === 1) {
        this.showPropertyModal.nativeElement.click();
      }
    }, error => {
      this.spinner.hide();
    });
  }

}
