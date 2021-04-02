import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { Settings } from 'src/app/models/settings.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.css'],
  providers: [Settings]
})
export class DefaultSettingsComponent implements OnInit {

  public parameter: IProperty = {};

  constructor(private admin: AdminService, public model: Settings, private spinner: NgxSpinnerService,
    private translate: TranslateService) { }

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
          this.admin.globalSettings.next(success.data);
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
        },
        error => {
          this.spinner.hide();
        });
  }
}
