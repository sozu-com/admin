import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ACL, Permission } from 'src/app/models/acl.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-acl',
  templateUrl: './acl.component.html',
  styleUrls: ['./acl.component.css']
})
export class AclComponent implements OnInit {

  model: ACL;
  url: any[];
  image1: any;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  public parameter: IProperty = {};
  initialCountry: any;

  constructor(public constant: Constant,
    public admin: AdminService, private cs: CommonService,
    public sanitization: DomSanitizer, private router: Router,
    private spinner: NgxSpinnerService,
    private location: Location,
    private translate: TranslateService
  ) {
    const dd = this.cs.checkAccess('Inhouse Agent Management', 'can_read');
    if (dd === 0) {
      this.location.back();
    }
  }

  ngOnInit() {
    this.model = new ACL();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.model.id = '';
    this.initialCountry = { initialCountry: this.constant.country_code };
    // this.getAclList();
    this.getAclUsers(this.parameter.page, '', '', '');
  }

  closeModal() {
    this.model = new ACL;
    this.modalClose.nativeElement.click();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getAclUsers(this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getAclList() {
    this.admin.postDataApi('getAclList', {})
      .subscribe(
        success => {
          success.data.forEach(element => {
            const e = new Permission();
            e.acl_id = element.id; const acl = { name: element.name }; e.acl = acl;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_purge = 1;
            this.model.admin_acl.push(e);
          });
        });
  }

  getAclUsers(page: any, name: string, phone: string, email: string) {
    this.spinner.show();
    this.admin.postDataApi('getAclUsers', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  setPermission(param: any, index: any) {
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
    this.initialCountry = { initialCountry: e.iso2 };
  }

  add(formdata: NgForm) {
    this.parameter.url = this.model.id !== '' ? 'updateAclUser' : 'addAclUser';
    this.admin.postDataApi(this.parameter.url, this.model)
      .subscribe(
        success => {
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
          } else {
            this.modalClose.nativeElement.click();
            formdata.reset();
            const text = this.model.id === '' ?
                    this.translate.instant('message.success.addedSuccessfully') :
                    this.translate.instant('message.success.updatedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
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
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    switch (flag) {
      case 0:
      this.parameter.text = this.translate.instant('message.error.wantToUnblockUser');
      this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
      this.parameter.text = this.translate.instant('message.error.wantToBlockUser');
      this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index, id, flag, user_type) {
    this.parameter.index = index;
    this.admin.postDataApi('blockAclUser', { id: id, flag: flag })
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  
  deletePopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteUser'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteUser(item, index);
      }
    });
  }

  deleteUser(item: any, index: number) {
    this.admin.postDataApi('deleteAclUser',
      { id: item.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.parameter.items.splice(index, 1);
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

}
