
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProperty } from 'src/app/common/property';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare let swal: any;
@Component({
  selector: 'app-credit-add-edit',
  templateUrl: './credit-add-edit.component.html',
  styleUrls: ['./credit-add-edit.component.css']
})
export class CreditAddEditComponent implements OnInit {

  model: Users = new Users();
  userName: string;
  searchedUser = [];
  public parameter: IProperty = {};
  showText: boolean;
  buildingLoading: boolean;
  showBuilding: boolean;
  selectedUser: any;
  addFormStep1: FormGroup;
  tab: number;
  amenities = Array<any>();
  constructor(
    public constant: Constant,
    private us: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tab = 0;
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.getPropertyAmenities();
  }
  getListing() {
    //  this.spinner.show();
  }
  getPropertyAmenities() {
    this.us.postDataApi('getPropertyAmenities', { hide_blocked: 1 })
      .subscribe(
        success => {
          //this.spinner.hide();
          this.amenities = success['data'];
        }
      );
  }
  setTab(tab: any) {
    console.log(tab, "tab")
    this.tab = tab;
    // swal({
    //   html: this.translate.instant('message.error.areYouSure') + '<br>' +
    //     this.translate.instant('message.error.movingBackCanResetInformationEnteredOnCurrentTab'),
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: this.constant.confirmButtonColor,
    //   cancelButtonColor: this.constant.cancelButtonColor,
    //   confirmButtonText: 'Yes'
    // }).then((result) => {
    //   if (result.value) {
    //     this.tab = tab;
    //   }
    // });
  }

  searchUser(keyword: string) {
    if (!keyword) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterSomeText'), this.translate.instant('swal.error'));
      return false;
    }

    this.showBuilding = false;
    this.buildingLoading = true;
    this.searchedUser = [];
    this.us.postDataApi('getFilterUser', { name: keyword })
      .subscribe(
        success => {
          this.searchedUser = success['data'];
          this.parameter.buildingCount = success['data'].length;
          if (this.parameter.buildingCount === 0) {
            this.showText = true;
          }
          this.buildingLoading = false;
        },
        error => {
          this.buildingLoading = true;
        }
      );
  }

  getUserIndex(i: number) {
    this.searchedUser.forEach(e => {
      e.selected = false;
    });
    const searchindex = (this.parameter.page - 1) * 4 + i;
    this.searchedUser[i].selected = true;
  }

  setUserId(building: any) {
    this.selectedUser = building;
    // this.building.id = building.id;
    // this.model.building_id = building.id;
  }
  getPage(page: number) {
    this.parameter.page = page;
  }
  createCollection(value, data) {

  }

  addcredits = (step: number): void => {
    if (!this.selectedUser) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterSomeText'), this.translate.instant('swal.error'));
    } else {
      this.spinnerService.show();
      this.us.postDataApi('addcredits', { step: step, user_id: this.selectedUser.id }).subscribe((success) => {
        this.spinnerService.hide();
        this.router.navigate(['dashboard/credit/view-credit']);
      }, (error) => {
        this.spinnerService.hide();
      });
    }
  }

}
