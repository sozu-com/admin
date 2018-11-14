import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { Settings } from '../../../models/settings.model';
declare let swal: any;

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.css'],
  providers: [Settings]
})
export class DefaultSettingsComponent implements OnInit {

  public parameter: IProperty = {};

  constructor(private admin: AdminService, public model: Settings) { }

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
          this.parameter.loading = false;
          this.model = success.data;
        },
        error => {
          this.parameter.loading = false;
        });
  }

  updateGlobalSetting() {
    this.parameter.loading = true;
    this.admin.postDataApi('updateGlobalSetting', this.model)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal('Success', 'Details updated successfully!', 'success');
        },
        error => {
          this.parameter.loading = false;
        });
  }
}
