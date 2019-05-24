import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Users } from './../../models/users.model';
import { Constant } from './../../common/constants';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(public constant: Constant, public admin: AdminService, private router: Router) { }

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
    this.parameter.loading = true;
    this.admin.postDataApi('getDevelopersFrAdmin', this.model)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.items = success.data;
          // this.parameter.items[0].developer_image = 'https://s3-ap-southeast-2.amazonaws.com/hyrit/Pic_352055028839.jpg';
          // this.parameter.items[1].developer_image = 'https://s3-us-west-2.amazonaws.com/livehyritbucket/Pic_813786977653.jpg';
          this.parameter.total = success.total;
        }, error => {
          this.parameter.loading = false;
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
          console.log('success', success);
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }
}
