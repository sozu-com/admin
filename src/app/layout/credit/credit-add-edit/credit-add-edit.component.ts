
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
import { IDestinationStatus } from 'src/app/common/marrital-status-interface';
declare let swal: any;
@Component({
  selector: 'app-credit-add-edit',
  templateUrl: './credit-add-edit.component.html',
  styleUrls: ['./credit-add-edit.component.css']
})
export class CreditAddEditComponent implements OnInit {
  selectedvalue: Users;
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
  subtab: number;
  amenities = Array<any>();
  destination_list = Array<IDestinationStatus>();
  program_list = Array<IDestinationStatus>();
  CreditsDeadlines = Array<IDestinationStatus>();
  PaymentScheme= Array<IDestinationStatus>();
  banks = Array<any>();
  selctedBanks: Array<any>;
  selctedPayments: Array<any>;
  selctedDeadlines: Array<any>;
  multiDropdownSettings = {};

  constructor(
    public constant: Constant,
    private us: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.tab = 1;
    // if(this.tab = 3){
    //   this.subtab = 1;
    // }
    //this.subtab = 3;
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.getPropertyAmenities();
    this.getDestination();
    this.getPrograms();
    this.getCreditsDeadlines();
    this.getPaymentScheme();
    this.getCreditsBanks();
    this.iniDropDownSetting();
    this.selctedBanks = [];
    this.selctedPayments = [];
    this.selctedDeadlines = [];
  }
  unsetProject(item: any) {
    let i = 0;
    this.selctedBanks.map(r => {
      if (r.id == item.id) {
        this.selctedBanks.splice(i, 1);
      }
      i = i + 1;
    });
  }
  unsetPayments(item: any) {
    let i = 0;
    this.selctedPayments.map(r => {
      if (r.id == item.id) {
        this.selctedPayments.splice(i, 1);
      }
      i = i + 1;
    });
  }
  unsetDeadlines(item: any) {
    let i = 0;
    this.selctedDeadlines.map(r => {
      if (r.id == item.id) {
        this.selctedDeadlines.splice(i, 1);
      }
      i = i + 1;
    });
  }
  onItemSelects(value) {
    this.selectedvalue = value
  }
  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_en',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }
  getListing() {
  }

  getPropertyAmenities() {
    this.us.postDataApi('getPropertyAmenities', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.amenities = success['data'];
        }
      );
  }

  getDestination(){
    this.us.postDataApi('getDestination', {}).subscribe(r => {
      this.destination_list = r['data'];
      console.log( this.destination_list,"getDestination")
    });
  }

  getdestination(id) {
    this.model.destination_id = id;
  }

  getPrograms(){
    this.us.postDataApi('getPrograms', {}).subscribe(r => {
      this.program_list = r['data'];
      console.log( this.program_list,"getPrograms")
    });
  }

  getCreditsDeadlines(){
    this.us.postDataApi('getCreditsDeadlines', {}).subscribe(r => {
      this.CreditsDeadlines = r['data'];
      console.log( this.CreditsDeadlines,"getCreditsDeadlines")
    });
  }

  getPaymentScheme(){
    this.us.postDataApi('getPaymentScheme', {}).subscribe(r => {
      this.PaymentScheme = r['data'];
      console.log( this.PaymentScheme,"getPaymentScheme")
    });
  }

  getCreditsBanks(){
    this.us.postDataApi('getCreditsBanks', {}).subscribe(r => {
      this.banks = r['data'];
      console.log( this.banks,"getCreditsBanks")
    });
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
  setsubTab(subtab: any){
    console.log(subtab, "subtab")
    this.subtab = subtab;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
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
  }
  getPage(page: number) {
    this.parameter.page = page;
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
