import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ACL, Permission } from './../../../models/acl.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-legal-entity',
  templateUrl: './add-legal-entity.component.html',
  styleUrls: ['./add-legal-entity.component.css']
})
export class AddLegalEntityComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  model: Users;
  constructor(
    public constant: Constant,
    private cs: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.model = new Users();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          this.model.id = params['id'];
          this.getUserById(this.model.id);
        } else {
          this.model.id = '';
        }
      });
  }

  getUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getUserById', {'user_id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
      }, error => {
        this.spinner.hide();
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this[param] = e.target.result;
      this.spinner.show();
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.spinner.hide();
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  add(formData: NgForm) {
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    if (!modelSave.lat || !modelSave.lng) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAddressFromDropdown'), 'error');
      return;
    }
    if (modelSave.images) {
      modelSave.images = modelSave.images.map(r => r.image);
    }
    this.spinner.show();
    this.admin.postDataApi('addDeveloper', modelSave)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
            return;
          } else {
            const text = this.model.id === '' ?
                    this.translate.instant('message.success.addedSuccessfully') :
                    this.translate.instant('message.success.updatedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            if (this.model.id === '') {
              formData.reset();
            }
          }
        }, error => {
          this.spinner.hide();
        });
  }

}
