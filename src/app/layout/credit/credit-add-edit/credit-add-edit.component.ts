import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Constant } from 'src/app/common/constants'
import { Users } from 'src/app/models/users.model'
import { AdminService } from 'src/app/services/admin.service'
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { IProperty } from 'src/app/common/property'
import { NgxSpinnerService } from 'ngx-spinner'
import { ActivatedRoute, Router } from '@angular/router'
import { IDestinationStatus } from 'src/app/common/marrital-status-interface'
import { Bank, Credit, PaymentScheme } from 'src/app/models/credit.model'
import { forkJoin } from 'rxjs'
declare let swal: any
@Component({
  selector: 'app-credit-add-edit',
  templateUrl: './credit-add-edit.component.html',
  styleUrls: ['./credit-add-edit.component.css'],
})
export class CreditAddEditComponent implements OnInit {
  model: Users = new Users()
  userName: string
  searchedUser = []
  public parameter: IProperty = {}
  showText: boolean
  buildingLoading: boolean
  showBuilding: boolean
  addFormStep1: FormGroup
  tab: number
  subtab: number
  amenities = Array<any>()
  destination_list = Array<IDestinationStatus>()
  program_list = Array<IDestinationStatus>()
  deadlines_list = Array<IDestinationStatus>()
  PaymentScheme = Array<PaymentScheme>()
  selctedPayments: Array<any>
  executive_list = Array<IDestinationStatus>()
  state_list = Array<IDestinationStatus>()
  square_list = Array<IDestinationStatus>()
  caseStatus_list = Array<IDestinationStatus>()
  civilStatus_list = Array<IDestinationStatus>()
  customerProfile_list = Array<IDestinationStatus>()
  banks = Array<Bank>()
  selctedBanks: Array<any>
  multiDropdownSettings = {}
  public creditModel: Credit = new Credit()
  public language_code: string
  userForm: FormGroup
  showSearch = false
  Onedit = false
  constructor(
    //public creditModel: Credit,
    public constant: Constant,
    private adminService: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    })
  }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code')
    this.tab = 1
    this.parameter.page = 1
    this.parameter.itemsPerPage = this.constant.limit4
    this.parameter.sub = this.activatedRoute.params.subscribe((params) => {
      if (params['edit'] === 'edit') {
        this.Onedit = true
      }
      if (params['id'] !== '0') {
        this.parameter.property_id = params['id']
        this.getcredits()
      } else {
        this.parameter.property_id = ''
        this.showSearch = true
      }
    })

    this.getCreditsBasicDetails()
    this.initializeDropDownSetting()
    //this.getCustomerProfile();
    this.selctedBanks = []
    this.selctedPayments = []
  }

  showSearchBox() {
    this.showSearch = true
  }

  unsetProject(item: any) {
    let i = 0
    this.selctedBanks.map((r) => {
      if (r.id == item.id) {
        this.selctedBanks.splice(i, 1)
      }
      i = i + 1
    })
  }

  unsetPayments(item: any) {
    let i = 0
    this.selctedPayments.map((r) => {
      if (r.id == item.id) {
        this.selctedPayments.splice(i, 1)
      }
      i = i + 1
    })
  }
  setProject(item: any) {
    this.selctedPayments.push(item)
  }
  setBank(item: any) {
    this.selctedBanks.push(item)
  }

  initializeDropDownSetting = (): void => {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_en',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2,
    }
  }

  setTab = (tab: number): void => {
    swal({
      html:
        this.translate.instant('message.error.areYouSure') +
        '<br>' +
        this.translate.instant(
          'message.error.movingBackCanResetInformationEnteredOnCurrentTab',
        ),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.tab = tab
        if (this.tab == 3) {
          this.subtab = 1
        }
      }
    })
  }

  setsubTab = (subtab: number): void => {
    this.subtab = subtab
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView()
  }

  searchUser = (keyword: string): void => {
    if (!keyword) {
      this.toastr.clear()
      this.toastr.error(
        this.translate.instant('message.error.pleaseEnterSomeText'),
        this.translate.instant('swal.error'),
      )
    } else {
      this.showBuilding = false
      this.buildingLoading = true
      this.searchedUser = []
      this.adminService
        .postDataApi('getFilterUser', { name: keyword })
        .subscribe(
          (success) => {
            this.searchedUser = success['data']
            this.parameter.buildingCount = success['data'].length
            if (this.parameter.buildingCount === 0) {
              this.showText = true
            }
            this.buildingLoading = false
          },
          (error) => {
            this.buildingLoading = true
          },
        )
    }
  }

  getUserIndex(i: number) {
    this.searchedUser.forEach((e) => {
      e.selected = false
    })
    const searchindex = (this.parameter.page - 1) * 4 + i
    this.searchedUser[searchindex].selected = true
    //this.searchedUser[i].selected = true;
  }

  setUserId(building: any) {
    this.creditModel.user = building
    this.creditModel.user.id = building.id
    // this.creditModel.user = building;
    console.log(building, 'building')
  }
  getPage(page: number) {
    this.parameter.page = page
  }

  addcredits() {
    let modelSave = JSON.parse(JSON.stringify(this.creditModel));
    var id = localStorage.getItem('stepOneId')
    var general_data_id = localStorage.getItem('stepThreeId')
    if (!this.creditModel.user) {
      this.toastr.clear()
      this.toastr.error(
        this.translate.instant('message.error.pleaseEnterSomeText'),
        this.translate.instant('swal.error'),
      )
    } else {
      if (this.tab == 1) {
        modelSave = this.creditModel.id ? {
            step: this.tab,
            user_id: this.creditModel.user.id,
            id: this.creditModel.id,
          }: { step: this.tab, user_id: this.creditModel.user.id }
      } else if (this.tab == 2) {
        modelSave = {
          step: this.tab,
          id: id,
          general_data_id: general_data_id,
          destination_id: this.creditModel.destination_id,
          programs_id: this.creditModel.programs_id,
          home_value: this.creditModel.home_value,
          credit_amount: this.creditModel.credit_amount,
          executive: this.creditModel.executive,
          state: this.creditModel.state,
          square_id: this.creditModel.square_id,
          case_status: this.creditModel.case_status,
          property_status: this.creditModel.property_status,
          customer_profile: this.creditModel.customer_profile,
          deadlines_quote: this.creditModel.deadlines_quote,
        }
        if (this.creditModel.bank_id) {
          const d = this.creditModel.bank_id.map((o) => o.id)
          modelSave.bank_id = d
        }

        if (this.creditModel.payment_scheme) {
          const d = this.creditModel.payment_scheme.map((o) => o.id)
          modelSave.payment_scheme = d
        }
        this.subtab = 1
      } else if (this.tab == 3) {
          this.subtab = 1
          modelSave = {
          step: this.tab,
          id:id,
          general_data_id: general_data_id,
          name: this.creditModel.name,
          first_surname: this.creditModel.first_surname,
          second_surname: this.creditModel.second_surname,
          gender: this.creditModel.gender,
          email: this.creditModel.email,
          contact_number: this.creditModel.contact_number,
          dob: this.creditModel.dob,
          curp: this.creditModel.curp,
          rfc: this.creditModel.rfc,
          nationaliy: this.creditModel.nationaliy,
          civil_status: this.creditModel.civil_status,
          street: this.creditModel.street,
          outdoor_number: this.creditModel.outdoor_number,
          interior_number: this.creditModel.interior_number,
          colony: this.creditModel.colony,
          municipality: this.creditModel.municipality,
          city: this.creditModel.city,
          zip_code: this.creditModel.zip_code,
          state: this.creditModel.state,
          co_credited_email: this.creditModel.co_credited_email,
          co_credited_relationship: this.creditModel.co_credited_relationship,
          co_credited_owner: this.creditModel.co_credited_owner,
          co_credited_involved_credit: this.creditModel.co_credited_involved_credit,
          co_credited_involved_revenue: this.creditModel.co_credited_involved_revenue
        }
      }
      this.spinnerService.show()
      this.adminService.postDataApi('addcredits', modelSave).subscribe(
        (success) => {
          console.log(success, 'save data')
          localStorage.setItem('stepOneId', success.data.id)
         // localStorage.setItem('stepThreeId', success.data.general_data.id)
          this.spinnerService.hide()
          if (this.tab == 3) {
              this.subtab = 1
            this.router.navigate(['dashboard/credit/view-credit'])
          } else {
            this.tab = this.tab + 1
          }
        },
        (error) => {
          this.spinnerService.hide()
        },
      )
    }
  }
  isChecked(gender) {
    return gender == this.creditModel.gender ? true : false;
  }
  onCountryChange(e) {}

  selectGender(gender) {
    this.creditModel.gender = gender;
  }
  onSelectAll(obj: any) { }

  getcredits = (): void => {
     if (this.tab == 3) {
          this.subtab = 1
      }
    let self = this
    this.spinnerService.show()
    this.adminService
      .postDataApi('getcredits', { id: this.parameter.property_id })
      .subscribe(
        (success) => {
          this.creditModel = success.data
          for (var i = 0; i < success.data.payment_scheme.length; i++) {
            let payment = success.data.payment_scheme[i].payment
            self.selctedPayments.push({
              id: payment.id,
              name_en: payment.name_en,
            })
          }
          for (var i = 0; i < success.data.bank.length; i++) {
            let bank_details = success.data.bank[i].bank_details
            self.selctedBanks.push({
              id: bank_details.id,
              name_en: bank_details.name_en,
            })
          }
          this.creditModel.bank_id = self.selctedBanks
          this.creditModel.payment_scheme = self.selctedPayments
          this.creditModel.deadlines_quote = this.creditModel.deadlines_quote.id
          this.creditModel.general_data = success.data.general_data
          console.log(this.creditModel.general_data, 'general_data')
          localStorage.setItem('stepThreeId', success.data.general_data.id)
          this.spinnerService.hide()
        },
        (error) => {
          this.spinnerService.hide()
        },
      )
  }

  getCustomerProfile() {
    this.adminService
      .postDataApi('getCustomerProfile', {})
      .subscribe((success) => {
        this.customerProfile_list = success['data']
      })
  }

  getCreditsBasicDetails = (): void => {
    forkJoin([
      this.adminService.postDataApi('getPrograms', {}),
      this.adminService.postDataApi('getCreditsDeadlines', {}),
      this.adminService.postDataApi('getPaymentScheme', {}),
      this.adminService.postDataApi('getDestination', {}),
      this.adminService.postDataApi('getCreditsBanks', {}),
      this.adminService.postDataApi('getPropertyAmenities', {
        hide_blocked: 1,
      }),
      this.adminService.postDataApi('getExecutive', {}),
      this.adminService.postDataApi('getState', {}),
      this.adminService.postDataApi('getSquare', {}),
      this.adminService.postDataApi('getCaseStatus', {}),
      this.adminService.postDataApi('getCivilStatus', {}),
    ]).subscribe((response: any[]) => {
      this.program_list = response[0].data
      this.deadlines_list = response[1].data
      this.PaymentScheme = response[2].data
      this.destination_list = response[3].data
      this.banks = response[4].data
      this.amenities = response[5].data
      this.executive_list = response[6].data
      this.state_list = response[7].data
      this.square_list = response[8].data
      this.caseStatus_list = response[9].data
      this.civilStatus_list = response[10].data
    })
  }

  addPhone(): void {
    ; (this.userForm.get('phones') as FormArray).push(this.fb.control(null))
  }

  removePhone(index) {
    ; (this.userForm.get('phones') as FormArray).removeAt(index)
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('phones')).controls
  }

  send(values) {
    console.log(values)
  }
}
