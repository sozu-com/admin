import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';

declare let swal: any;

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  public parameter: IProperty = {};
  constructor(
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    public constant: Constant,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.getAclUsers()
  }

  getPage(page) {
    this.parameter.page = page;
    this.getAclUsers();
  }

  getAclUsers() {
    this.spinner.show();
    this.admin.postDataApi('getAclUser', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.spinner.hide();
        });
  }

  editData(item, id) {
    //this.cs.data = item;
    this.router.navigate(['/dashboard/roles/add-roles/', id]);
  }

  deletePopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteUserRole'),
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
    this.admin.postDataApi('deleteUserRole',
      { id: item.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.parameter.items.splice(index, 1);
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }
}
