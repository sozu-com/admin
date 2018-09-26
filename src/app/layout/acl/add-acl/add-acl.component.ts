import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { ACL, Permission } from './../../../models/acl.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Constant } from './../../../common/constants';
declare let swal: any;

@Component({
  selector: 'app-add-acl',
  templateUrl: './add-acl.component.html',
  styleUrls: ['./add-acl.component.css'],
  providers: [ACL]
})
export class AddAclComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  constructor(public constant: Constant, public model: ACL, private cs: CommonService,
    private admin: AdminService, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
//     if (this.cs.data !== {}) {
// console.log('data', this.cs.data);
//     } else {
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          this.model.id = params['id'];
          this.getAclUserById(this.model.id);
        } else {
          this.model.id = '';
          this.getAclList();
        }
      });
    // }
  }

  getAclUserById(id) {
    this.admin.postDataApi('getAclUserById', {'id': id})
    .subscribe(
      success => {
        console.log('getAclUserById', success);
        this.model = success.data;
        this.model.admin_acl = success.data.admin_acl;
        console.log('====', this.model);
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event) {
    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;
    const reader = new FileReader();
    reader.onload = (e: any) => {
        // this.url = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  getAclList() {
    this.admin.postDataApi('getAclList', {})
      .subscribe(
        success => {
          // this.parameter.data = success.data;
          success.data.forEach(element => {
            const e = new Permission();
            console.log('===', element.name);
            const acl = {name: element.name};
            e.acl_id = element.id; e.acl = acl; e.show = false;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_crud = 1;
            this.model.admin_acl.push(e);
          });
        });
  }

  expandBox(index) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
  }

  setPermission(param, index) {
    if (param === 'can_crud') {
      this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
    } else {
      this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
      this.model.admin_acl[index][param] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
      this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
      this.model.admin_acl[index]['can_delete'] === 1 ? 1 : 0;
    }
  }


  add(formdata: NgForm) {
    console.log(this.model);
    this.admin.postDataApi('addAclUser', this.model)
      .subscribe(
        success => {
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          }else {
            formdata.reset();
            const text = this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
            swal('Success', text, 'success');
            // if (this.parameter.items.length < 10) {
            //   if (this.model.id !== '') {
            //     this.parameter.items[this.parameter.index] = success.data;
            //   } else {
            //     this.parameter.items.push(success.data);
            //   }
            // }
          }
        });
  }
}
