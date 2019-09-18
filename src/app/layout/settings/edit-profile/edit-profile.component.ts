import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { ACL } from 'src/app/models/acl.model';
declare let swal: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  image: string;
  model: ACL;
  constructor(
    public constant: Constant,
    private admin: AdminService,
    private cs: CommonService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.model = new ACL();
    this.model.img_loader = false;
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.admin.loginData$.subscribe(success => {
      if (success['id']) {
        this.model = success;
      } else {
        this.loginData();
      }
    });
  }

  loginData() {
    this.spinner.show();
    this.admin.postDataApi('loginData', {})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
        this.image = this.model.image;
      }, error => {
        this.spinner.hide();
      });
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.model[param] = e.target.result;
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  updateProfile(formData: NgForm) {
    if (this.model.img_loader) {
      swal('Error', 'Uploading image.', 'error');
      return;
    }

    const input = new FormData();
    input.append('name', formData.value.name);
    input.append('phone', formData.value.phone);
    input.append('country_code', this.model.country_code);
    input.append('dial_code', this.model.dial_code);
    input.append('image', this.model.image);
    this.spinner.show();
    this.admin.postDataApi('updateProfile', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.admin.login.next(success.data);
          swal('Success', success.message, 'success');
        }, error => {
          this.spinner.hide();
        }
      );
  }
}
