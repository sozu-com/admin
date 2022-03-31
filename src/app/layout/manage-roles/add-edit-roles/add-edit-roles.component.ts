import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { ACL } from 'src/app/models/acl.model';
import { Permission } from 'src/app/models/inhouse-users.model';
import { AdminService } from 'src/app/services/admin.service';

declare let swal: any;

@Component({
  selector: 'app-add-edit-roles',
  templateUrl: './add-edit-roles.component.html',
  styleUrls: ['./add-edit-roles.component.css']
})
export class AddEditRolesComponent implements OnInit {
  allAcl = [];
  model: ACL;
  permission_all = false;
  permission_show = false;
  public parameter: IProperty = {};

  constructor(
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public constant: Constant,
    private router: Router,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.model = new ACL();
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getRolerById(this.model.id, '');
      } else {
        this.model.id = '';
        this.getAclList();
      }
    });
  }

  getRolerById(id: string, data){
    this.spinner.show();
    this.admin.postDataApi('getAclUserRoleById', { id: id }).subscribe(r => {
      this.spinner.hide();
      const roledata = r['data'];
      this.model.adminAcls = roledata.user_permissison;
      for (let index = 0; index < roledata.user_permissison.length; index++) {
        const element = roledata.user_permissison[index];
        element['acl'] = element.user_acl;
      }
      this.model.id = roledata.id;
      this.model.name = roledata.name;
      this.permission_show = false;
        this.permission_all = true;
        this.model.admin_acl = roledata.user_permissison;
        for (let index = 0; index < this.model.admin_acl.length; index++) {
          const element = this.model.admin_acl[index];
          element.can_create = element.can_create || 0,
            element.can_delete = element.can_delete || 0,
            element.can_update = element.can_update || 0,
            element.can_read = element.can_read || 0,
            element.can_crud = element.can_crud || 0,
            element.can_purge = element.can_purge || 0;
        }
    });
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
            const acl = { name: element.name };
            e.acl_id = element.id; e.acl = acl; e.show = false;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_purge = 1; e.can_crud = 1;
            this.model.admin_acl.push(e);
            this.model.admin_estend.push(e);
            this.permission_all = true;
          });
        }, error => {
          this.spinner.hide();
        });
  }

  setPermission(param: any, index: any) {
    if (param === 'can_crud') {
      this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] == 1 ? 0 : 1;
      this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] == 1 ? 0 : 1;
      this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] == 1 ? 0 : 1;
      this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] == 1 ? 0 : 1;
      this.model.admin_acl[index]['can_purge'] = this.model.admin_acl[index]['can_crud'] == 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] == 1 ? 0 : 1;
      //another
      // this.model.admin_estend[index]['can_create'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_read'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_update'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_delete'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_purge'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_crud'] = this.model.admin_estend[index]['can_crud'] === 1 ? 0 : 1;
    } else {
      this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
        this.model.admin_acl[index][param] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
        this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
        this.model.admin_acl[index]['can_delete'] === 1 && this.model.admin_acl[index]['can_purge'] === 1 ? 1 : 0;

      //another
      // this.model.admin_estend[index][param] = this.model.admin_estend[index][param] &&
      //   this.model.admin_estend[index][param] === 1 ? 0 : 1;
      // this.model.admin_estend[index]['can_crud'] = this.model.admin_estend[index]['can_create'] === 1 &&
      //   this.model.admin_estend[index]['can_read'] === 1 && this.model.admin_estend[index]['can_update'] === 1 &&
      //   this.model.admin_estend[index]['can_delete'] === 1 && this.model.admin_estend[index]['can_purge'] === 1 ? 1 : 0;
    }
  }

  expandBox(index: any) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
    // this.model.admin_estend[index].show = this.model.admin_estend[index].show === true ? false : true;
  }

  add(formdata: NgForm) {
    this.parameter.url = this.model.id ? 'updateUserRole' : 'addUserRole';
    const input = new FormData();
    if (this.model.id !== '') { input.append('id', this.model.id); }
    input.append('name', this.model.name);
    input.append('admin_acl', JSON.stringify(this.model.admin_acl));
    // checking if locality is same or not
      this.spinner.show();
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.spinner.hide();
            if (success.success === '0') {
              swal(this.translate.instant('swal.error'), success.message, 'error');
            } else {
              const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
              swal(this.translate.instant('swal.success'), text, 'success');
              this.router.navigate(['/dashboard/roles/manage-roles']);
             }
          }, error => {
            this.spinner.hide();
          });
  }

  goBack() {
    this.router.navigate(['/dashboard/roles/manage-roles'])
  }
}
