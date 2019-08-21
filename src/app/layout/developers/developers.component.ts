import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
declare let swal: any;

@Component({
  selector: 'app-developers',
  templateUrl: './developers.component.html',
  styleUrls: ['./developers.component.css'],
  providers: [Users]
})
export class DevelopersComponent implements OnInit {

  public parameter: IProperty = {};
  model: Users;
  items: Array<Users>;
  constructor(public constant: Constant, public admin: AdminService, private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.model = new Users();
    this.model.buildings_sort = 2;  // 2 means desc
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.getDevelopersFrAdmin();
  }

  getPage(page: number) {
    this.parameter.page = page;
    this.getDevelopersFrAdmin();
  }

  setBuildingsSort(buildings_sort: number) {
    this.model.buildings_sort = buildings_sort;
    this.getDevelopersFrAdmin();
  }

  getDevelopersFrAdmin() {
    this.model.page = this.parameter.page;
    this.spinner.show();
    this.admin.postDataApi('getDevelopersFrAdmin', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(item: Users) {
    this.router.navigate(['/dashboard/developers/add-developer', item.id]);
  }

  blockUnblockPopup(index: any, id: string, flag: number, user_type: string = '3') {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_DEVELOPER;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_DEVELOPER;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
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


  blockAdmin(index: number, id: any, flag: any, user_type: any) {
    this.parameter.index = index;
    this.parameter.url = 'blockBuyerSeller';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          swal('Success', this.parameter.successText, 'success');
          // this.items[this.parameter.index] = success.data;
          this.items[this.parameter.index]['is_blocked'] = flag;
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this developer?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteData(item, index);
      }
    });
  }

  deleteData(item: any, index: number) {
    this.admin.postDataApi('deleteBuyerSeller',
    { id: item.id, user_type: 3 }).subscribe(r => {
      this.items.splice(index, 1);
      this.parameter.total--;
      swal('Success', 'Deleted successfully.', 'success');
    },
    error => {
      swal('Error', error.error.message, 'error');
    });
  }
}
