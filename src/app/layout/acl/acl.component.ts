import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { ACL, Permission } from './../../models/acl.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from './../../services/common.service';
import { Router } from '@angular/router';
declare let swal: any;
import { Location } from '@angular/common';

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css'],
  providers: [ACL]
})
export class AclComponent implements OnInit {

  url: any[];
  image1;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  // model = new ACL();
  public parameter: IProperty = {};
  initialCountry: any;

  constructor(public constant: Constant, public model: ACL,
    public admin: AdminService, private cs: CommonService,
    public sanitization: DomSanitizer, private router: Router,
    private location: Location
  ) {
    const dd = this.cs.checkAccess('Broker Management', 'can_read');
    console.log('==', dd);
    if (dd === 0) {
      this.location.back();
    }
  }

  ngOnInit() {

    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.model.id = '';
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.getAclList();
    this.getAclUsers(this.parameter.p, '', '', '');
  }

  closeModal() {
    this.model = new ACL;
    this.modalClose.nativeElement.click();
  }

  getPage(page) {
    this.parameter.p = page;
    this.getAclUsers(this.parameter.p, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getAclList() {
    this.admin.postDataApi('getAclList', {})
      .subscribe(
        success => {
          success.data.forEach(element => {
            const e = new Permission();
            e.acl_id = element.id; const acl = {name: element.name}; e.acl = acl;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1;
            this.model.admin_acl.push(e);
          });
        });
  }

  getAclUsers(page, name, phone, email) {

    this.parameter.p = page;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.parameter.url = 'getAclUsers';

    const input = new FormData();
    input.append('page', this.parameter.p.toString());

    if (this.parameter.name) {input.append('name', this.parameter.name); }

    if (this.parameter.phone) {input.append('phone', this.parameter.phone); }

    if (this.parameter.email) {input.append('email', this.parameter.email); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        });
  }

  setPermission(param, index) {
    this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
    this.model.admin_acl[index][param] === 1 ? 0 : 1;
  }

  changeListner(event) {
    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;
    const reader = new FileReader();
    reader.onload = (e: any) => {
        this.url = e.target.result;
        this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  add(formdata: NgForm) {
    this.parameter.url = this.model.id !== '' ? 'updateAclUser' : 'addAclUser';
    this.admin.postDataApi(this.parameter.url, this.model)
      .subscribe(
        success => {
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          }else {
            this.modalClose.nativeElement.click();
            formdata.reset();
            const text = this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
            swal('Success', text, 'success');
            if (this.parameter.items.length < 10) {
              if (this.model.id !== '') {
                this.parameter.items[this.parameter.index] = success.data;
              } else {
                this.parameter.items.push(success.data);
              }
            }
          }
        });
  }

  editData(item, id) {
    this.cs.data = item;
    this.router.navigate(['/dashboard/access-control-mgt/add-acl-user', id]);
  }

  blockUnblockPopup(index, id, flag, user_type) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_USER;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_USER;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index, id, flag, user_type) {
    this.parameter.index = index;
    this.admin.postDataApi('blockAclUser', {id: id, flag: flag})
      .subscribe(
        success => {
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }
}
