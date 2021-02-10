import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {
  userName: string;
  searchedUser = [];
  public parameter: IProperty = {};
  showText: boolean;
  buildingLoading: boolean;
  showBuilding: boolean;
  selectedUser: any;
  addFormStep1: FormGroup;
  constructor(
    private us: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
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
    this.us.postDataApi('getFilterUser', {name:keyword })
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

  createCollection(value , data){

  }
}