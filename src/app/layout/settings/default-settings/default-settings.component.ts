import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Settings } from '../../../models/settings.model';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.css'],
  providers: [Settings]
})
export class DefaultSettingsComponent implements OnInit {

  public parameter: IProperty = {};

  constructor(private admin: AdminService, public model: Settings, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getGlobalSetting();
  }

  setValue(key, value) {
    this.model[key] = value;
  }

  getGlobalSetting () {
    this.admin.postDataApi('getGlobalSetting', {})
      .subscribe(
        success => {
          this.model = success.data;
        },
        error => {
        });
  }

  updateGlobalSetting() {
    this.spinner.show();
    this.admin.postDataApi('updateGlobalSetting', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          swal('Success', 'Details updated successfully!', 'success');
        },
        error => {
          this.spinner.hide();
        });
  }
}
