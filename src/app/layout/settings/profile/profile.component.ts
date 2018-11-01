import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { ACL, Permission } from './../../../models/acl.model';
import { ActivatedRoute } from '@angular/router';
import { Constant } from './../../../common/constants';
import { NgForm } from '@angular/forms';
declare let swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ACL]
})
export class ProfileComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  constructor(public constant: Constant, public model: ACL,
    private admin: AdminService
  ) { }

  ngOnInit() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
    // this.model.id = params['id'];
    this.loginData(this.model.id);
  }

  loginData(id) {
    this.parameter.loading = true;
    this.admin.postDataApi('loginData', {})
    .subscribe(
      success => {
        this.parameter.loading = false;
        this.model = success.data;
        this.model.admin_acl = success.data.admin_acl;
      }, error => {
        this.parameter.loading = false;
      });
  }

  // set() {
  //   this.show = true;
  // }

  // changeListner(event) {
  //   this.parameter.image = event.target.files[0];
  //   this.parameter.icon = this.parameter.image;
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //       // this.url = e.target.result;
  //   };
  //   reader.readAsDataURL(event.target.files[0]);
  // }

  // onCountryChange(e) {
  //   this.model.country_code = e.iso2;
  //   this.model.dial_code = '+' + e.dialCode;
  //   this.initialCountry = {initialCountry: e.iso2};
  // }

  // getAclList() {
  //   this.parameter.loading = true;
  //   this.admin.postDataApi('getAclList', {})
  //     .subscribe(
  //       success => {
  //         this.parameter.loading = false;
  //         success.data.forEach(element => {
  //           const e = new Permission();
  //           const acl = {name: element.name};
  //           e.acl_id = element.id; e.acl = acl; e.show = false;
  //           e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_crud = 1;
  //           this.model.admin_acl.push(e);
  //         });
  //       }, error => {
  //         this.parameter.loading = false;
  //       });
  // }

  // expandBox(index) {
  //   this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
  // }

  // setPermission(param, index) {
  //   if (param === 'can_crud') {
  //     this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
  //     this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
  //     this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
  //     this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
  //     this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
  //   } else {
  //     this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
  //     this.model.admin_acl[index][param] === 1 ? 0 : 1;
  //     this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
  //     this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
  //     this.model.admin_acl[index]['can_delete'] === 1 ? 1 : 0;
  //   }
  // }


  // add(formData: NgForm) {
  //   this.parameter.loading = true;
  //   this.admin.postDataApi('addAclUser', this.model)
  //     .subscribe(
  //       success => {
  //         this.parameter.loading = false;
  //         if (success.success === '0') {
  //           swal('Error', success.message, 'error');
  //         }else {
  //           const text = this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
  //           swal('Success', text, 'success');
  //           if (this.model.id === '') {
  //             formData.reset();
  //           }
  //         }
  //       }, error => {
  //         this.parameter.loading = false;
  //       });
  // }
}
