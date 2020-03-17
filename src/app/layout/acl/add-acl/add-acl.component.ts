import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { ACL, Permission } from 'src/app/models/acl.model';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-add-acl',
  templateUrl: './add-acl.component.html',
  styleUrls: ['./add-acl.component.css']
})
export class AddAclComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  model: ACL;
  allAcl = [];
  constructor(public constant: Constant, private cs: CommonService,
    private admin: AdminService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.admin.loginData$.subscribe(res => {
      this.parameter.admin_id = res['id'];
    });
  }

  ngOnInit() {
    this.model = new ACL();
    this.model.img_loader = false;
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getAclUserById(this.model.id);
      } else {
        this.model.id = '';
        this.getAclList();
      }
    });
  }

  getAclUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getAclUserById', {'id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
        this.image = this.model.image;
        this.model.admin_acl = success.data.admin_acl;
      }, error => {
        this.spinner.hide();
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
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

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  getAclList() {
    this.spinner.show();
    this.admin.postDataApi('getAclList', {})
      .subscribe(
        success => {
          this.allAcl = success.data;
          this.spinner.hide();
          success.data.forEach(element => {
            const e = new Permission();
            const acl = {name: element.name};
            e.acl_id = element.id; e.acl = acl; e.show = false;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_purge = 1; e.can_crud = 1;
            this.model.admin_acl.push(e);
          });
        }, error => {
          this.spinner.hide();
        });
  }

  expandBox(index: any) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
  }

  setPermission(param: any, index: any) {
    if (param === 'can_crud') {
      this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_purge'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
    } else {
      this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
      this.model.admin_acl[index][param] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
      this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
      this.model.admin_acl[index]['can_delete'] === 1 && this.model.admin_acl[index]['can_purge'] === 1 ? 1 : 0;
    }
  }


  add(formData: NgForm) {
    if (this.model.img_loader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
      return;
    }
    this.spinner.show();
    this.admin.postDataApi('addAclUser', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
          } else {
            const text = this.model.id === '' ?
                    this.translate.instant('message.success.addedSuccessfully') :
                    this.translate.instant('message.success.updatedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            if (this.model.id === '') {
              // this.model.image = '';
              // formData.reset();
              // this.getAclList();
              this.router.navigate(['/dashboard/access-control-mgt']);
            } else {
              if (this.parameter.admin_id === this.model.id) {
                this.admin.login.next(success.data);
                this.admin.permissions = success.data.permissions ? success.data.permissions : {};
                const dd = success.data.m.map((obj, index) => {
                  const key =  Object.keys(obj)[0];
                  this.admin.admin_acl[key] =  obj[key];
                });
              }
            }
          }
        }, error => {
          this.spinner.hide();
        });
  }
}
