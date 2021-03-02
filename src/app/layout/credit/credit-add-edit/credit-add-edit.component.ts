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
import { Bank, Credit, EconomicDependent, GeneralData, PaymentScheme, References, SolidarityLiabilities,BankDetail, Incomes } from 'src/app/models/credit.model';
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
  model: Users = new Users();
  public location: IProperty = {};
  userName: string;
  searchedUser = [];
  currencies = Array<any>();
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
  PaymentScheme = Array<PaymentScheme>();
  selctedPayments: Array<any>;
  executive_list = Array<IDestinationStatus>();
  income_list = Array<IDestinationStatus>();
  state_list = Array<IDestinationStatus>();
  square_list = Array<IDestinationStatus>();
  caseStatus_list = Array<IDestinationStatus>();
  civilStatus_list = Array<IDestinationStatus>();
  Relationship_list = Array<IDestinationStatus>();
  CustomerProfile_list = Array<IDestinationStatus>();
  customerProfile_list = Array<IDestinationStatus>();
  marrital_status_list = Array<IMarritalStatus>();
  Scholarship_list = Array<IMarritalStatus>();
  jobType_list = Array<IMarritalStatus>();
  contactType_list = Array<IMarritalStatus>();
  LaboralSector_list = Array<IMarritalStatus>();
  accountType = Array<IMarritalStatus>();
  debt = Array<IMarritalStatus>();
  nationality_list = Array<any>();
  banks = Array<Bank>();
  selctedBanks: Array<any>;
  deadLines = Array<PaymentScheme>();
  selctedDeadlines: Array<any>;
  economic_dependent_list: Array<any>;
  references_list: Array<any>;
  solidarity_list: Array<any>;
  multiDropdownSettings = {};
  multiDropdownSettingsForBanks = {};
  public creditModel: Credit = new Credit();
  public language_code: string;
  userForm: FormGroup;
  showSearch = false;
  Onedit = false;
  toggleSelectedDetails: { isCreditCardChecked: boolean, isOwnCarChecked: boolean } =
    { isCreditCardChecked: false, isOwnCarChecked: false };
  //dataView: boolean = false ;
  initialCountry: any;

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
    });
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.language_code = localStorage.getItem('language_code');
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.tab = 1;
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.parameter.sub = this.activatedRoute.params.subscribe((params) => {
      if (params['edit'] === 'edit') {
        this.Onedit = true;
      }
      if (params['id'] !== '0') {
        this.parameter.property_id = params['id'];
        this.getcredits();
      } else {
        this.parameter.property_id = '';
        this.showSearch = true;
        this.assignedObject();
      }
    });

    this.getCreditsBasicDetails();
    this.initializeDropDownSetting();
    this.selctedBanks = [];
    this.selctedPayments = [];
    this.selctedDeadlines = [];
  }

  showSearchBox() {
    this.showSearch = true
  }

  toggleShow = (index: number): void => {
    switch (index) {
      case 1:
        this.toggleSelectedDetails.isCreditCardChecked = !this.toggleSelectedDetails.isCreditCardChecked;
        break;
      case 2:
        this.toggleSelectedDetails.isOwnCarChecked = !this.toggleSelectedDetails.isOwnCarChecked;
        break;
      default:
        break;
    }
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
    };
  }

  initializeDropDownSettingForBanks = (): void => {
    this.multiDropdownSettingsForBanks = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_en',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: this.banks.length,
    };
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

  addcredits = (): void => {
  

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
          this.parameter.property_id = success.data.id;
          // if (success.data.incomes_bank_account != undefined && success.data.incomes_bank_account != null) {
          //   this.creditModel.incomes_bank_account = success.data.incomes_bank_account || [];
          //   console.log(this.creditModel.incomes_bank_account,"this.creditModel.incomes_bank_account")
          // }
          
          if (success.data.general_data != undefined && success.data.general_data != null) {
            this.parameter.general_id = success.data.general_data.id
            // localStorage.setItem('stepThreeId', success.data.general_data.id);
          }
          this.spinnerService.hide();
          this.afterAddcredit();
        }, (error) => {
          this.spinnerService.hide();
        });
    }
  }

  afterAddcredit = (): void => {
    if (this.getCurrentStep() == 5) {
      this.creditModel.economic_dependent.credits_relationship_id = undefined;
      this.creditModel.economic_dependent.age = '';
      this.creditModel.economic_dependent.occupation = '';
      this.getEcoDependent();
    } else if (this.getCurrentStep() == 6) {
      this.creditModel.references.credits_relationship_id = undefined;
      this.creditModel.references.name = '';
      this.creditModel.references.first_surname = '';
      this.creditModel.references.second_surname = '';
      this.creditModel.references.years = '';
      this.creditModel.references.country_code = this.constant.country_code;
      this.creditModel.references.phone_code = this.constant.dial_code;
      this.creditModel.references.phone_number = '';
      this.creditModel.references.address = '';
      this.creditModel.references.home_country_code = this.constant.country_code;
      this.creditModel.references.home_dial_code = this.constant.dial_code;
      this.creditModel.references.home_phone = '';
      this.creditModel.references.office_country_code = this.constant.country_code;
      this.creditModel.references.office_dial_code = this.constant.dial_code;
      this.creditModel.references.office_phone = '';
      this.creditModel.references.email = '';
      this.creditModel.references.participate_credit = '';
      this.getReferences();
    } else if (this.getCurrentStep() == 7) {
      this.creditModel.solidarity_liabilities.name = '';
      this.creditModel.solidarity_liabilities.first_surname = '';
      this.creditModel.solidarity_liabilities.second_surname = '';
      this.creditModel.solidarity_liabilities.gender = undefined;
      this.creditModel.solidarity_liabilities.email = '';
      this.creditModel.solidarity_liabilities.country_code = this.constant.country_code;
      this.creditModel.solidarity_liabilities.phone_code = this.constant.dial_code;
      this.creditModel.solidarity_liabilities.phone_number = '';
      this.creditModel.solidarity_liabilities.dob = undefined;
      this.creditModel.solidarity_liabilities.curp = '';
      this.creditModel.solidarity_liabilities.federal_tax = '';
      this.creditModel.solidarity_liabilities.nationality = '1';
      this.creditModel.solidarity_liabilities.marital_status = undefined;
      this.creditModel.solidarity_liabilities.scholarship = undefined;
      this.creditModel.solidarity_liabilities.street_address = '';
      this.creditModel.solidarity_liabilities.external_number = '';
      this.creditModel.solidarity_liabilities.internal_number = '';
      this.creditModel.solidarity_liabilities.zip_code = '';
      this.creditModel.solidarity_liabilities.municipality = '';
      this.creditModel.solidarity_liabilities.country = '';
      this.creditModel.solidarity_liabilities.state = '';
      this.creditModel.solidarity_liabilities.city = '';
      this.creditModel.solidarity_liabilities.neighbourhood = undefined;;
      this.creditModel.solidarity_liabilities.neighbourhoods = [];
      this.creditModel.solidarity_liabilities.number_of_dependents = '';
      this.creditModel.solidarity_liabilities.own_property = '';
      this.creditModel.solidarity_liabilities.total_value_property = '';
      this.creditModel.solidarity_liabilities.total_assessed_value = '';
      this.creditModel.solidarity_liabilities.own_car = '';
      this.creditModel.solidarity_liabilities.value_of_own_car = '';
      //this.toggleSelectedDetails.isOwnCarChecked = false;
      this.getSolidarity();
    } else if (this.getCurrentStep() == 8) {
      this.setCurrentStep();
    } else {
      this.setCurrentStep();
      // this.router.navigate(['dashboard/credit/view-credit']);
    }
  }

  getEcoDependent = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getEcoDependent', { id: this.parameter.property_id || '0' }).subscribe((success) => {
      this.economic_dependent_list = success.data || [];
      this.spinnerService.hide();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  deleteDependent = (economicDependent: any, index: number): void => {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDeleteEconomicDependent'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinnerService.show();
        this.adminService.postDataApi('DeleteDependent', { id: economicDependent.id }).subscribe((success) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.economic_dependent_list.splice(index, 1);
        }, (error) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
      }
    });
  }

  getReferences = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getReferences', { id: this.parameter.property_id || '0' }).subscribe((success) => {
      this.references_list = success.data || [];
      this.spinnerService.hide();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  deleteReferences = (references: any, index: number): void => {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDeleteReferences'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinnerService.show();
        this.adminService.postDataApi('deleteReferences', { id: references.id }).subscribe((success) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.references_list.splice(index, 1);
        }, (error) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
      }
    });
  }

  getSolidarity = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getSolidarity', { id: this.parameter.property_id || '0' }).subscribe((success) => {
      this.solidarity_list = success.data || [];
      this.spinnerService.hide();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  deleteSolidarity = (solidarity: any, index: number): void => {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDeleteSolidarityLiabilities'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinnerService.show();
        this.adminService.postDataApi('deleteSolidarity', { id: solidarity.id }).subscribe((success) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.solidarity_list.splice(index, 1);
        }, (error) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
      }
    });
  }

  getcredits = (): void => {
    this.spinnerService.show()
    this.adminService
      .postDataApi('getcredits', { id: this.parameter.property_id }).subscribe((success) => {
        this.spinnerService.hide();
        this.loadCredits(success.data);
      }, (error) => {
        this.spinnerService.hide();
      });
  }

  loadCredits = (creditDetails: any): void => {
    this.creditModel = creditDetails;
    let self = this;
    for (var i = 0; i < creditDetails.payment_scheme.length; i++) {
      let payment = creditDetails.payment_scheme[i].payment
      self.selctedPayments.push({
        id: payment.id,
        name_en: payment.name_en,
      });
    }
    for (var i = 0; i < creditDetails.bank.length; i++) {
      let bank_details = creditDetails.bank[i].bank_details
      self.selctedBanks.push({
        id: bank_details.id,
        name_en: bank_details.name_en,
      });
    }
    for (var i = 0; i < creditDetails.deadlines_quote.length; i++) {
      let deadlines = creditDetails.deadlines_quote[i].deadline
      self.selctedDeadlines.push({
        id: deadlines.id,
        name_en: deadlines.name_en,
      });
    }
    this.creditModel.bank_id = self.selctedBanks;
    this.creditModel.payment_scheme = self.selctedPayments;
    this.creditModel.deadlines_quote = self.selctedDeadlines;
    this.creditModel.user['neighbourhoods'] = [];
    this.creditModel.user.neighbourhoods.push(this.creditModel.user.neighborhood);
    this.assignedObject();
  }

  assignedObject = (): void => {
    if (!this.creditModel.user) {
      this.creditModel.user = new Users();
    }
    if (!this.creditModel.general_data) {
      this.creditModel.general_data = new GeneralData();
    }
    if (!this.creditModel.economic_dependent) {
      this.creditModel.economic_dependent = new EconomicDependent();
    }
    if (!this.creditModel.references) {
      this.creditModel.references = new References();
      this.creditModel.references.country_code = this.constant.country_code;
      this.creditModel.references.phone_code = this.constant.dial_code;
      this.creditModel.references.home_country_code = this.constant.country_code;
      this.creditModel.references.home_dial_code = this.constant.dial_code;
      this.creditModel.references.office_country_code = this.constant.country_code;
      this.creditModel.references.office_dial_code = this.constant.dial_code;
    }
    if (!this.creditModel.solidarity_liabilities) {
      this.creditModel.solidarity_liabilities = new SolidarityLiabilities();
      this.creditModel.solidarity_liabilities.country_code = this.constant.country_code;
      this.creditModel.solidarity_liabilities.phone_code = this.constant.dial_code;
    }
    if (!this.creditModel.incomes_bank_account) {
      this.creditModel.incomes_bank_account = new Array();
    }
    if (!this.creditModel.incomes) {
      this.creditModel.incomes = new Incomes();
      this.creditModel.incomes.country_code = this.constant.country_code;
      this.creditModel.incomes.phone_code = this.constant.dial_code;
      this.creditModel.incomes.last_country_code = this.constant.country_code;
      this.creditModel.incomes.last_phone_code = this.constant.dial_code;
    } else {
      this.creditModel.incomes.incomes_id = this.creditModel.incomes.id;
      this.creditModel.incomes['neighbourhoods'] = [];
      this.creditModel.incomes.neighbourhoods.push(this.creditModel.incomes.colony);
    }
  }

  onSelectAll(obj: any) { }

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

  // getMaritalStatus(maritalStatusId) {
  //   this.model.marital_statuses_id = maritalStatusId;
  // }

  getCreditsBasicDetails = (): void => {
    this.spinnerService.show();
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
      this.adminService.postDataApi('getDebtsType', {}),
      this.adminService.postDataApi('getmaritalStatus', {}),
      this.adminService.postDataApi('getNationality', {}),
      this.adminService.postDataApi('getIncomeBank', {}),
      this.adminService.postDataApi('getCountryLocality', {}),
      this.adminService.postDataApi('getEcoDependent', { id: this.parameter.property_id || '0' }),
      this.adminService.postDataApi('getReferences', { id: this.parameter.property_id || '0' }),
      this.adminService.postDataApi('getSolidarity', { id: this.parameter.property_id || '0' })
    ]).subscribe((response: any[]) => {
      this.spinnerService.hide();
      this.program_list = response[0].data
      this.deadLines = response[1].data
      this.PaymentScheme = response[2].data
      this.destination_list = response[3].data
      this.banks = response[4].data || [];
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
      this.contactType_list = response[15].data
      this.LaboralSector_list = response[16].data
      this.debt = response[17].data
      this.marrital_status_list = response[18].data;
      this.nationality_list = response[19].data || [];
      this.income_list = response[20].data;
      this.location.countries = response[21].data;
      this.economic_dependent_list = response[22].data || [];
      this.references_list = response[23].data || [];
      this.solidarity_list = response[24].data || [];
      this.loadCreditsBasicDetails();
    });
  }

  loadCreditsBasicDetails = (): void => {
    //this.nationality_list.push({ id: 0, name: 'Other' });
    this.creditModel.country_id = this.location.countries[0].id;
    this.initializeDropDownSettingForBanks();
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

  // toFixedHomeValue = (): void => {
  //  // this.creditModel.home_value = parseFloat(this.creditModel.home_value).toFixed(2);
  // }

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
        postData = this.getRequestDataForFifthStep(5);
        break;
      case 6:
        postData = this.getRequestDataForSixthStep(6);
        break;
      case 7:
        postData = this.getRequestDataForSeventhStep(7);
        break;
      case 8:
        break;
      case 9:
        postData = this.getRequestDataForninethStep(9);
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
    // const stepOneId = localStorage.getItem('stepOneId');
    modelSave = {
      step: currentStep,
      id: this.parameter.property_id,
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
    // const stepOneId = localStorage.getItem('stepOneId');
    const modelSave1 = {
      id: this.parameter.property_id,
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
    //  const stepOneId = localStorage.getItem('stepOneId');
    // const stepThreeId = localStorage.getItem('stepThreeId');
    const modelSave2 = {
      id: this.parameter.property_id,
      credit_card: this.creditModel.general_data.credit_card,
      existing_mortgage: this.creditModel.general_data.existing_mortgage,
      loan: this.creditModel.general_data.loan,
      four_digit: this.creditModel.general_data.four_digit,
      general_data_id: this.parameter.general_id
    };
    modelSave = { general_data: modelSave2, step: currentStep };
    return modelSave;
  }

  getRequestDataForFifthStep = (currentStep: number): any => {
    // const stepOneId = localStorage.getItem('stepOneId');
    const modelSave = {
      id: this.parameter.property_id,
      credits_relationship_id: this.creditModel.economic_dependent.credits_relationship_id,
      age: this.creditModel.economic_dependent.age,
      occupation: this.creditModel.economic_dependent.occupation,
      step: currentStep
    };
    return modelSave;
  }

  getRequestDataForSixthStep = (currentStep: number): any => {
    // const stepOneId = localStorage.getItem('stepOneId');
    const modelSave = {
      id: this.parameter.property_id,
      credits_relationship_id: this.creditModel.references.credits_relationship_id,
      name: this.creditModel.references.name,
      first_surname: this.creditModel.references.first_surname,
      second_surname: this.creditModel.references.second_surname,
      years: this.creditModel.references.years,
      country_code: this.creditModel.references.country_code || '',
      phone_code: this.creditModel.references.phone_code || '',
      phone_number: this.creditModel.references.phone_number || '',
      address: this.creditModel.references.address,
      home_country_code: this.creditModel.references.home_country_code || '',
      home_phone_code: this.creditModel.references.home_dial_code || '',
      home_phone: this.creditModel.references.home_phone || '',
      office_country_code: this.creditModel.references.office_country_code || '',
      office_phone_code: this.creditModel.references.office_dial_code || '',
      office_phone: this.creditModel.references.office_phone || '',
      email: this.creditModel.references.email,
      participate_credit: this.creditModel.references.participate_credit,
      step: currentStep
    };
    return modelSave;
  }

  getRequestDataForSeventhStep = (currentStep: number): any => {
    const modelSave: any = this.creditModel.solidarity_liabilities;
    modelSave.step = currentStep;
    modelSave.id = this.parameter.property_id;
    return modelSave;
  }
  getRequestDataForninethStep = (currentStep: number): any => {
    const modelSave: any = this.creditModel.incomes_bank_account;
    modelSave.step = currentStep;
    modelSave.credites_details_id = this.parameter.property_id;
    //modelSave.credites_details_id = this.parameter.property_id;

    // if (modelSave['incomes_bank_account'] && modelSave['incomes_bank_account'].length > 0) {
    //   let i = 0;
    //   for (let index = 0; index < modelSave['incomes_bank_account'].length; index++) {
    //     const element = modelSave['incomes_bank_account'][index];
    //     if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
    //       i = i + 1;
    //       swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
    //       return;
    //     }
    //   }
    // }
    return modelSave;
  }
  
  getRequestDataForEighthStep = (currentStep: number): any => {
    const tempModelSave: any = this.creditModel.incomes;
    tempModelSave.id = this.parameter.property_id;
    const modelSave = {
      step: currentStep,
      incomes: tempModelSave,
      id: this.parameter.property_id
    };
    return modelSave;
  }

  getCounrtyByZipcode = (index: number): void => {
    let zipcode;
    switch (index) {
      case 1:
        zipcode = this.creditModel.solidarity_liabilities.zip_code;
        break;
      case 2:
        zipcode = this.creditModel.incomes.zip_code;
        break;
      default:
        break;
    }
    if (((zipcode || '0').toString()).length >= 5) {
      this.spinnerService.show();
      this.adminService.postDataApi('getCounrtyByZipcode', { zip_code: zipcode }).
        subscribe((success) => {
          this.spinnerService.hide();
          switch (index) {
            case 1:
              this.creditModel.solidarity_liabilities.municipality = ((success.data || {}).response || {}).municipio || ''; // Municipality
              this.creditModel.solidarity_liabilities.state = ((success.data || {}).response || {}).estado || ''; // State
              this.creditModel.solidarity_liabilities.city = ((success.data || {}).response || {}).ciudad || ''; // city
              this.creditModel.solidarity_liabilities.country = ((success.data || {}).response || {}).pais || ''; // Country
              this.creditModel.solidarity_liabilities.neighbourhoods = ((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
              this.creditModel.solidarity_liabilities.neighbourhood = (this.creditModel.solidarity_liabilities.neighbourhoods || [])[0] || '';
              break;
            case 2:
              this.creditModel.incomes.municipality = ((success.data || {}).response || {}).municipio || ''; // Municipality
              this.creditModel.incomes.state = ((success.data || {}).response || {}).estado || ''; // State
              this.creditModel.incomes.city = ((success.data || {}).response || {}).ciudad || ''; // city
              this.creditModel.incomes.country = ((success.data || {}).response || {}).pais || ''; // Country
              this.creditModel.incomes.neighbourhoods = ((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
              this.creditModel.incomes.colony = (this.creditModel.incomes.neighbourhoods || [])[0] || '';
              break;
            default:
              break;
          }
        }, (error) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
    } else {
      switch (index) {
        case 1:
          this.creditModel.solidarity_liabilities.municipality = '';
          this.creditModel.solidarity_liabilities.state = '';
          this.creditModel.solidarity_liabilities.city = '';
          this.creditModel.solidarity_liabilities.country = '';
          this.creditModel.solidarity_liabilities.neighbourhoods = [];
          this.creditModel.solidarity_liabilities.neighbourhood = '';
          break;
        case 2:
          this.creditModel.incomes.municipality = '';
          this.creditModel.solidarity_liabilities.state = '';
          this.creditModel.incomes.city = '';
          this.creditModel.incomes.country = '';
          this.creditModel.incomes.neighbourhoods = [];
          this.creditModel.incomes.colony = '';
          break;
        default:
          break;
      }
    }
  }

  updateNationalityName = (value: string): void => {
    if (parseInt(value) > 0) {
      this.creditModel.user.nationality_name = '';
    }
  }

  onPhoneCountryChange = (event: any, index: number): void => {
    switch (index) {
      case 1:
        this.creditModel.references.country_code = event.iso2;
        this.creditModel.references.phone_code = '+' + event.dialCode;
        break;
      case 2:
        this.creditModel.references.home_country_code = event.iso2;
        this.creditModel.references.home_dial_code = '+' + event.dialCode;
        break;
      case 3:
        this.creditModel.references.office_country_code = event.iso2;
        this.creditModel.references.office_dial_code = '+' + event.dialCode;
        break;
      case 4:
        this.creditModel.solidarity_liabilities.country_code = event.iso2;
        this.creditModel.solidarity_liabilities.phone_code = '+' + event.dialCode;
        break;
      case 5:
        this.creditModel.incomes.country_code = event.iso2;
        this.creditModel.incomes.phone_code = '+' + event.dialCode;
        break;
      case 6:
        this.creditModel.incomes.last_country_code = event.iso2;
        this.creditModel.incomes.last_phone_code = '+' + event.dialCode;
        break;
      default:
        break;
    }
  }

  hasErrorCoCredited = (): boolean => {
    if (!this.parameter.property_id ||
      !this.creditModel.general_data.co_credited_email ||
      this.creditModel.general_data.co_credited_email == '' ||
      !this.creditModel.general_data.co_credited_relationship ||
      this.creditModel.general_data.co_credited_relationship == '' ||
      !this.creditModel.general_data.co_credited_owner ||
      !this.creditModel.general_data.co_credited_involved_revenue ||
      !this.creditModel.general_data.co_credited_involved_credit
    ) {
      return true;
    }
    return false;
  }

  hasErrorEconomicDependent = (): boolean => {
    if (!this.creditModel.economic_dependent.credits_relationship_id ||
      !this.parameter.property_id ||
      !this.creditModel.economic_dependent.age ||
      this.creditModel.economic_dependent.age == '' ||
      !this.creditModel.economic_dependent.occupation ||
      this.creditModel.economic_dependent.occupation == ''
    ) {
      return true;
    }
    return false;
  }

  hasErrorCredits = (): boolean => {
    if (!this.parameter.property_id) {
      return true;
    } else if (!this.creditModel.destination_id) {
      return true;
    } else if (parseInt(this.creditModel.destination_id) == 2) {
      return false;
    } else if (!this.creditModel.programs_id) {
      return true;
    }
    return false;
  }

  hasErrorSolidarityLiabilities = (): boolean => {
    if (!this.parameter.property_id ||
      !this.creditModel.solidarity_liabilities.name ||
      this.creditModel.solidarity_liabilities.name == ''
    ) {
      return true;
    }
    return false;
  }
  
  getCurrencies() {
    this.adminService.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
        });
  }


  addDeveloperBank(e) {
    const bank = new BankDetail();
    this.creditModel.incomes_bank_account.push(bank);
  }

  removeDeveloperBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.creditModel.incomes_bank_account.splice(i, 1);
    if (item.id) {
      this.adminService.postDataApi('deleteBankAccount', { id: item.id }).subscribe(success => {
        this.spinnerService.hide();
      }, error => {
        this.spinnerService.hide();
      });
    }
  }

  hasErrorIncomes = (): boolean => {
    if (!this.parameter.property_id ||
      !this.creditModel.incomes.monthly_income ||
      this.creditModel.incomes.monthly_income == '' ||
      !this.creditModel.incomes.net_income ||
      this.creditModel.incomes.net_income == ''
    ) {
      return true;
    }
    return false;
  }

}
