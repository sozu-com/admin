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
import { IDestinationStatus, IMarritalStatus } from 'src/app/common/marrital-status-interface'
import { Bank, Credit, GeneralData, PaymentScheme } from 'src/app/models/credit.model'
import { forkJoin } from 'rxjs'
import { PricePipe } from 'src/app/pipes/price.pipe';
declare let swal: any
@Component({
  selector: 'app-credit-add-edit',
  templateUrl: './credit-add-edit.component.html',
  styleUrls: ['./credit-add-edit.component.css'],
  providers: [PricePipe]
})
export class CreditAddEditComponent implements OnInit {
  model: Users = new Users()
  public location: IProperty = {};
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
  PaymentScheme = Array<PaymentScheme>()
  selctedPayments: Array<any>
  executive_list = Array<IDestinationStatus>()
  state_list = Array<IDestinationStatus>()
  square_list = Array<IDestinationStatus>()
  caseStatus_list = Array<IDestinationStatus>()
  civilStatus_list = Array<IDestinationStatus>()
  Relationship_list = Array<IDestinationStatus>()
  CustomerProfile_list = Array<IDestinationStatus>()
  customerProfile_list = Array<IDestinationStatus>()
  marrital_status_list = Array<IMarritalStatus>();
  Scholarship_list = Array<IMarritalStatus>();
  jobType_list = Array<IMarritalStatus>();
  contactType_list = Array<IMarritalStatus>();
  LaboralSector_list = Array<IMarritalStatus>();
  accountType = Array<IMarritalStatus>();
  debt = Array<IMarritalStatus>();
  banks = Array<Bank>()
  selctedBanks: Array<any>
  deadLines = Array<PaymentScheme>()
  selctedDeadlines: Array<any>
  multiDropdownSettings = {}
  public creditModel: Credit = new Credit()
  public language_code: string
  userForm: FormGroup
  showSearch = false
  Onedit = false
  myFlag = false;
  constructor(
    public constant: Constant,
    private adminService: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private price: PricePipe
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    })
  }

  ngOnInit() {
    this.getCountries()
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
    this.selctedDeadlines = []
    this.creditModel.general_data = new GeneralData()
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

  unsetDeadlines(item: any) {
    let i = 0
    this.selctedDeadlines.map((r) => {
      if (r.id == item.id) {
        this.selctedDeadlines.splice(i, 1)
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

  setDeadline(item: any) {
    this.selctedDeadlines.push(item)
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
        this.tab = tab;
        if (this.tab == 3) {
          this.subtab = 1;
        }
      }
    });
  }

  setsubTab = (subtab: number): void => {
    this.subtab = subtab;
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
    if (!this.creditModel.user) {
      this.toastr.clear();
      this.toastr.error(
        this.translate.instant('message.error.pleaseEnterSomeText'),
        this.translate.instant('swal.error'),
      );
    } else {
      const modelSave = this.getRequestData();
      this.spinnerService.show();
      this.adminService.postDataApi('addcredits', modelSave).subscribe(
        (success) => {
          console.log(success, 'save data');
          localStorage.setItem('stepOneId', success.data.id);
          if (success.data.general_data != undefined && success.data.general_data != null) {
            localStorage.setItem('stepThreeId', success.data.general_data.id)
        }
          this.spinnerService.hide();
          if (this.getCurrentStep() == 4) {
            this.router.navigate(['dashboard/credit/view-credit'])
          } else {
            this.setCurrentStep();
          }
        }, (error) => {
          this.spinnerService.hide();
        });
    }
  }

  getcredits = (): void => {
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
          for (var i = 0; i < success.data.deadlines_quote.length; i++) {
            let deadlines = success.data.deadlines_quote[i].deadline
            self.selctedDeadlines.push({
              id: deadlines.id,
              name_en: deadlines.name_en,
            })
          }
          this.creditModel.bank_id = self.selctedBanks
          this.creditModel.payment_scheme = self.selctedPayments
          this.creditModel.deadlines_quote = self.selctedDeadlines
          // this.creditModel.deadlines_quote = this.creditModel.deadlines_quote.id
          //  localStorage.setItem('stepThreeId', success.data.general_data.id)
          //  this.creditModel.general_data_id = success.data.general_data.id
          this.spinnerService.hide()
        },
        (error) => {
          this.spinnerService.hide()
        },
      )
  }

  onSelectAll(obj: any) { }


  getCustomerProfile() {
    this.adminService
      .postDataApi('getCustomerProfile', {})
      .subscribe((success) => {
        this.customerProfile_list = success['data']
      });
  }

  getCountries() {
    this.adminService.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }
 
  onCountryChange(id) {
    this.parameter.country_id = id;
    this.location.states = []; this.parameter.state_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }
  getMarritalStatusList() {
    this.adminService.postDataApi('getmaritalStatus', {}).subscribe(r => {
      this.marrital_status_list = r['data'];
    });
  }
  getMaritalStatus(maritalStatusId) {
    this.model.marital_statuses_id = maritalStatusId;
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
      this.adminService.postDataApi('getCreditsExecutive', {}),
      this.adminService.postDataApi('getCountryState', { country_id: 1 }),
      this.adminService.postDataApi('getSquare', {}),
      this.adminService.postDataApi('getCaseStatus', {}),
      this.adminService.postDataApi('getCivilStatus', {}),
      this.adminService.postDataApi('getCustomerProfile', {}),
      this.adminService.postDataApi('getRelationship', {}),
      this.adminService.postDataApi('getScholarship', {}),
      this.adminService.postDataApi('getJobType', {}),
      this.adminService.postDataApi('getContractType', {}),
      this.adminService.postDataApi('getLaboralSector', {}),
      this.adminService.postDataApi('getDebtsType', {})
      
    ]).subscribe((response: any[]) => {
      this.program_list = response[0].data
      this.deadLines = response[1].data
      this.PaymentScheme = response[2].data
      this.destination_list = response[3].data
      this.banks = response[4].data
      this.amenities = response[5].data
      this.executive_list = response[6].data
      this.state_list = response[7].data
      this.square_list = response[8].data
      this.caseStatus_list = response[9].data
      this.civilStatus_list = response[10].data
      this.CustomerProfile_list = response[11].data
      this.Relationship_list = response[12].data
      this.Scholarship_list = response[13].data
      this.jobType_list = response[14].data
      this.contactType_list  = response[15].data
      this.LaboralSector_list  = response[16].data
      this.debt  = response[16].data
    })
  }

  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(this.fb.control(null));
  }

  removePhone(index) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('phones')).controls
  }

  send(values) {
    console.log(values)
  }
  
  getTransformedAmount(value: any) {
    return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  }


  getCurrentStep = (): number => {
    if (this.tab == 1 || this.tab == 2) {
      return this.tab;
    } else if (this.tab == 3) {
      return ((this.subtab + this.tab) - 1);
    }
  }

  setCurrentStep = (): void => {
    switch (this.getCurrentStep()) {
      case 1:
        this.tab = this.getCurrentStep() + 1;
        break;
      case 2:
        this.tab = this.getCurrentStep() + 1;
        this.subtab = 1;
        break;
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        this.subtab = this.subtab + 1;
        break;
      default:
        break;
    }
  }

  getRequestData = (): any => {
    let postData;
    switch (this.getCurrentStep()) {
      case 1:
        postData = this.getRequestDataForFirstStep(1);
        break;
      case 2:
        postData = this.getRequestDataForSecondStep(2);
        break;
      case 3:
        postData = this.getRequestDataForThirdStep(3);
        break;
      case 4:
        postData = this.getRequestDataForFourthStep(4);
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        break;
      case 8:
        break;
      case 9:
        break;
      case 10:
        break;
      default:
        break;
    }
    return postData;
  }

  getRequestDataForFirstStep = (currentStep: number): any => {
    return this.creditModel.id ?
      { step: currentStep, user_id: this.creditModel.user.id, id: this.creditModel.id }
      : { step: currentStep, user_id: this.creditModel.user.id };
  }

  getRequestDataForSecondStep = (currentStep: number): any => {
    let modelSave = JSON.parse(JSON.stringify(this.creditModel));
    const stepOneId = localStorage.getItem('stepOneId');
    modelSave = {
      step: currentStep,
      id: stepOneId,
      destination_id: this.creditModel.destination_id,
      programs_id: this.creditModel.programs_id,
      home_value: this.creditModel.home_value,
      credit_amount: this.creditModel.credit_amount,
      subaccount_balance: this.creditModel.subaccount_balance,
      infonavit_credit: this.creditModel.infonavit_credit,
      executive: this.creditModel.executive,
      state: this.creditModel.state,
      country_id: this.creditModel.country_id,
      square: this.creditModel.square,
      case_status: this.creditModel.case_status,
      property_status: this.creditModel.property_status,
      customer_profile: this.creditModel.customer_profile
    };
    if (this.creditModel.bank_id) {
      const d = this.creditModel.bank_id.map((o) => o.id);
      modelSave.bank_id = d;
    }
    if (this.creditModel.payment_scheme) {
      const d = this.creditModel.payment_scheme.map((o) => o.id);
      modelSave.payment_scheme = d;
    }
    if (this.creditModel.deadlines_quote) {
      const d = this.creditModel.deadlines_quote.map((o) => o.id);
      modelSave.deadlines_quote = d;
    }
    return modelSave;
  }

  getRequestDataForThirdStep = (currentStep: number): any => {
    let modelSave = JSON.parse(JSON.stringify(this.creditModel));
    const stepOneId = localStorage.getItem('stepOneId');
    const modelSave1 = {
      id: stepOneId,
      general_data_id: this.creditModel.general_data.id,
      co_credited_email: this.creditModel.general_data.co_credited_email,
      co_credited_relationship: this.creditModel.general_data.co_credited_relationship,
      co_credited_owner: this.creditModel.general_data.co_credited_owner,
      co_credited_involved_credit: this.creditModel.general_data.co_credited_involved_credit,
      co_credited_involved_revenue: this.creditModel.general_data.co_credited_involved_revenue
    };
    modelSave = { general_data: modelSave1, step: currentStep };
    return modelSave;
  }

  getRequestDataForFourthStep = (currentStep: number): any => {
    let modelSave = JSON.parse(JSON.stringify(this.creditModel));
    const stepOneId = localStorage.getItem('stepOneId');
    const stepThreeId = localStorage.getItem('stepThreeId');
    const modelSave2 = {
      id: stepOneId,
      credit_card: this.creditModel.general_data.credit_card,
      existing_mortgage: this.creditModel.general_data.existing_mortgage,
      loan: this.creditModel.general_data.loan,
      four_digit:this.creditModel.general_data.four_digit,
      general_data_id: stepThreeId
    };
    modelSave = { general_data: modelSave2, step: currentStep };
    return modelSave;
  }
}
