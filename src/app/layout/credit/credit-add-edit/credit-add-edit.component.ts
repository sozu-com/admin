
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Constant } from 'src/app/common/constants';
import { Users } from 'src/app/models/users.model';
import { AdminService } from 'src/app/services/admin.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IProperty } from 'src/app/common/property';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { IDestinationStatus } from 'src/app/common/marrital-status-interface';
import { Credit } from 'src/app/models/credit.model';
import { forkJoin } from 'rxjs';
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
  addFormStep1: FormGroup;
  tab: number;
  subtab: number;
  amenities = Array<any>();
  destination_list = Array<IDestinationStatus>();
  program_list = Array<IDestinationStatus>();
  CreditsDeadlines = Array<IDestinationStatus>();
  PaymentScheme = Array<IDestinationStatus>();
  banks = Array<any>();
  selctedBanks: Array<any>;
  selctedPayments: Array<any>;
  selctedDeadlines: Array<any>;
  multiDropdownSettings = {};
  public creditModel: Credit = new Credit();

  constructor(
    public constant: Constant,
    private adminService: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.tab = 1;
    // if(this.tab = 3){
    //   this.subtab = 1;
    // }
    //this.subtab = 3;
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.parameter.sub = this.activatedRoute.params.subscribe((params) => {
      if (params['id'] !== '0') {
        this.parameter.property_id = params['id'];
        this.getcredits();
      } else {
        this.parameter.property_id = '';
      }
    });
    this.getCreditsBasicDetails();
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

  getdestination(id) {
    this.model.destination_id = id;
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
    this.adminService.postDataApi('getFilterUser', { name: keyword })
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
    this.creditModel.user = building;
  }
  getPage(page: number) {
    this.parameter.page = page;
  }

  addcredits = (step: number): void => {
    if (!this.creditModel.user) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterSomeText'), this.translate.instant('swal.error'));
    } else {
      this.spinnerService.show();
      this.adminService.postDataApi('addcredits', { step: step, user_id: this.creditModel.user.id }).subscribe((success) => {
        this.spinnerService.hide();
        this.router.navigate(['dashboard/credit/view-credit']);
      }, (error) => {
        this.spinnerService.hide();
      });
    }
  }

  getcredits = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getcredits', { id: this.parameter.property_id }).subscribe((success) => {
      this.creditModel = success.data;
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  getCreditsBasicDetails = (): void => {
    forkJoin([
      this.adminService.postDataApi('getPrograms', {}), this.adminService.postDataApi('getCreditsDeadlines', {}),
      this.adminService.postDataApi('getPaymentScheme', {}), this.adminService.postDataApi('getDestination', {}),
      this.adminService.postDataApi('getCreditsBanks', {}), this.adminService.postDataApi('getPropertyAmenities', { hide_blocked: 1 })
    ]).subscribe((response: any[]) => {
      this.program_list = response[0].data;
      this.CreditsDeadlines = response[1].data;
      this.PaymentScheme = response[2].data;
      this.destination_list = response[3].data;
      this.banks = response[4].data;
      this.amenities = response[5].data;
    })
  }
}
