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
import { Bank, Credit, EconomicDependent, GeneralData, PaymentScheme, References, SolidarityLiabilities, BankDetail, Incomes, Debit, CreditBeneficiary } from 'src/app/models/credit.model';
import { forkJoin } from 'rxjs'
import { PricePipe } from 'src/app/pipes/price.pipe';
import { ViewChild } from '@angular/core'
import { ElementRef } from '@angular/core'
import { CreditFormPdfService } from 'src/app/services/credit-form-pdf.service'
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
  public isDocumentLoading: boolean = false;
  showText: boolean;
  buildingLoading: boolean;
  showBuilding: boolean;
  isShow: boolean = false;
  addFormStep1: FormGroup;
  tab: number;
  selected_id: number;
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
  Participant_list = Array<IDestinationStatus>();
  CustomerProfile_list = Array<IDestinationStatus>();
  CreditsStatus_list = Array<IDestinationStatus>();
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
  debit_list: Array<any>;
  credits_bank_account: any[] = [];
  multiDropdownSettings = {};
  multiDropdownSettingsForBanks = {};
  public creditModel: Credit = new Credit();
  public language_code: string;
  userForm: FormGroup;
  showSearch = false;
  Onedit = false;
  toggleSelectedDetails: {
    isCreditCardChecked: boolean, isOwnCarChecked: boolean, additionalDetail: boolean, additionalDetailBeneficiary: boolean
    , Business: boolean, WarrantyProperty: boolean, Personal: boolean, credits_participant: boolean
  } =
    {
      isCreditCardChecked: false, isOwnCarChecked: false, additionalDetail: false, additionalDetailBeneficiary: false, Business: false,
      WarrantyProperty: false, Personal: false, credits_participant: false
    };
  //dataView: boolean = false ;
  initialCountry: any;
  public credits_document_list: any[] = [];
  @ViewChild('openAddDocumentationModal') openAddDocumentationModal: ElementRef;
  @ViewChild('closeAddDocumentationModal') closeAddDocumentationModal: ElementRef;
  @ViewChild('docsFile') docsFile: ElementRef;
  docFile: any;
  folderId: number;
  folderName: string;
  docs = new Array<any>();
  user_data: any;
  valueScore007: any[] = [];
  valueScore004: any[] = [];
  frequencyPayments: any[] = [];
  contractType: any[] = [];
  accountTypeCredit: any[] = [];
  ValorScoreDes004: any[] = [];
  ValorScoreDes007: any[] = [];
  creditoTab: any;

  constructor(
    public constant: Constant,
    private adminService: AdminService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private spinnerService: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private credito: CreditFormPdfService,
    private fb: FormBuilder, private price: PricePipe
  ) {
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([this.fb.control(null)]),
    });
  }

  ngOnInit(): void {
    console.log(this.creditModel, "creditModel");
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
        this.getValueScore(params['id']);
        this.getcredits();
        // this.getCreditsDocument();
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
      case 3:
        this.toggleSelectedDetails.additionalDetail = !this.toggleSelectedDetails.additionalDetail;
        break;
      case 4:
        this.toggleSelectedDetails.additionalDetailBeneficiary = !this.toggleSelectedDetails.additionalDetailBeneficiary;
        break;
      case 5:
        this.toggleSelectedDetails.Personal = !this.toggleSelectedDetails.Personal;
        break;
      case 6:
        this.toggleSelectedDetails.WarrantyProperty = !this.toggleSelectedDetails.WarrantyProperty;
        break;
      case 7:
        this.toggleSelectedDetails.Business = !this.toggleSelectedDetails.Business;
        break;
      case 8:
        this.toggleSelectedDetails.credits_participant = !this.toggleSelectedDetails.credits_participant;
        console.log(this.toggleSelectedDetails.credits_participant, "toggle")
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
        else if (this.tab == 6) {
          this.creditoTab = 1;
        }
      }
    });
  }

  setsubTab = (subtab: number): void => {
    this.subtab = subtab;
  }

  setDocumentationTab = (tab: number): void => {
    this.tab = tab;
    this.subtab = 20; // for upload documentation  
    if (this.parameter.property_id) {
      this.getCreditsDocument();
    }
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
    //console.log(building, 'building')
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
      this.spinnerService.show();
      this.adminService.postDataApi('addcredits', this.getRequestData()).subscribe(
        (success) => {
          this.spinnerService.hide();
          this.afterAddcredit(success.data);
          this.parameter.property_id = success.data.id;
          // if (success.data.incomes_bank_account != undefined && success.data.incomes_bank_account != null) {
          this.creditModel.incomes_bank_account = success.data.incomes_bank_account || [];
          //console.log(this.creditModel.incomes_bank_account, "this.creditModel.incomes_bank_account")
          // }

          if (success.data.general_data != undefined && success.data.general_data != null) {
            this.parameter.general_id = success.data.general_data.id
            // localStorage.setItem('stepThreeId', success.data.general_data.id);
          }

        }, (error) => {
          this.spinnerService.hide();
        });
    }
  }

  afterAddcredit = (creditDetails: any): void => {
    if (this.getCurrentStep() == 5) {
      this.creditModel.economic_dependent = new EconomicDependent();
      this.getEcoDependent();
    } else if (this.getCurrentStep() == 6) {
      this.creditModel.references.credit_references_id = undefined;
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
      this.creditModel.solidarity_liabilities.solidarity_id = undefined;
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
      this.creditModel.solidarity_liabilities.neighbourhood = undefined;
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
    } else if (this.getCurrentStep() == 9) {
      this.credits_bank_account = creditDetails.credits_bank_account || [];
      this.setCurrentStep();
    } else if (this.getCurrentStep() == 10) {
      this.creditModel.debit = new Debit();
      this.getDebit();
    } else if (this.getCurrentStep() == 11) {
      this.creditModel.credit_beneficiary = creditDetails.credit_beneficiary;// || new CreditBeneficiary();
      this.setCurrentStep();
    } else {
      this.setCurrentStep();
      // this.router.navigate(['dashboard/credit/view-credit']);
    }
  }

  getEcoDependent = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getEcoDependent', { id: this.parameter.property_id || '0' })
      .subscribe(
        success => {

          this.spinnerService.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
            return;
          } else {
            this.economic_dependent_list = success.data || [];
            swal({
              html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
            });
            // console.log(this.economic_dependent_list, "this.economic_dependent_list")
            // this.economic_dependent_list.forEach((p) => {
            //   console.log(p.id, "this.economic_dependent_list")
            //   if (p.id ==  this.creditModel.economic_dependent.credit_dependent_id) {
            //     swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
            //   } else {
            //     this.spinnerService.hide();
            //     swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
            //   }
            // });
          }
        }, error => {
          this.spinnerService.hide();
        });
    // .subscribe((success) => {
    //   this.economic_dependent_list = success.data || [];
    //   this.spinnerService.hide();
    //   swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    // }, (error) => {
    //   this.spinnerService.hide();
    // });
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
      swal({
        html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
      });
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  editDependent(data) {
    this.creditModel.economic_dependent = data;
    this.creditModel.economic_dependent.credit_dependent_id = data.id
    //console.log(this.creditModel.economic_dependent.credit_dependent_id, "data")
  }
  editReferences(data) {
    this.creditModel.references = data;
    this.creditModel.references.credit_references_id = data.id
    // console.log(this.creditModel.references.credit_references_id, "data")
  }
  editSolidarity(data) {
    this.creditModel.solidarity_liabilities = data;
    this.creditModel.solidarity_liabilities.solidarity_id = data.id
    // console.log(this.creditModel.solidarity_liabilities.solidarity_id, "data")
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
      swal({
        html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
      });
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
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

  getDebit = (): void => {
    this.spinnerService.show();
    this.adminService.postDataApi('getDebit', { id: this.parameter.property_id || '0' }).subscribe((success) => {
      this.debit_list = success.data || [];
      this.spinnerService.hide();
      swal({
        html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
      });
      // swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
    }, (error) => {
      this.spinnerService.hide();
    });
  }

  deleteDebit = (debitDetails: any, index: number): void => {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDeleteDebit'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinnerService.show();
        this.adminService.postDataApi('deleteDebit', { id: debitDetails.id }).subscribe((success) => {
          this.spinnerService.hide();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.debit_list.splice(index, 1);
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

  getCreditsDocument = (): void => {
    this.spinnerService.show()
    this.adminService.postDataApi('getCreditsDocument', { id: this.parameter.property_id }).subscribe((success) => {
      this.spinnerService.hide();
      this.credits_document_list = success.data || [];
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
    if (this.creditModel.general_data) {
      this.creditModel.general_data.credits_participant_id = creditDetails.general_data.credits_participant_id || '';
      this.creditModel.general_data.participant_toggel = creditDetails.general_data.participant_toggel || 0;
    }

    this.creditModel.payment_scheme = self.selctedPayments;
    this.creditModel.deadlines_quote = self.selctedDeadlines;
    this.creditModel.user['neighbourhoods'] = [];
    this.creditModel.user.neighbourhoods.push(this.creditModel.user.neighborhood);
    this.credits_bank_account = creditDetails.credits_bank_account || [];
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
      this.creditModel.incomes_bank_account = new Array<BankDetail>();
    }
    if (!this.creditModel.incomes) {
      this.creditModel.incomes = new Incomes();
      this.creditModel.incomes.country_code = this.constant.country_code;
      this.creditModel.incomes.phone_code = this.constant.dial_code;
      this.creditModel.incomes.last_country_code = this.constant.country_code;
      this.creditModel.incomes.last_phone_code = this.constant.dial_code;
    } else {
      this.creditModel.incomes.incomes_id = this.creditModel.incomes.id;
      if (this.creditModel.incomes.colony) {
        this.creditModel.incomes['neighbourhoods'] = [];
        this.creditModel.incomes.neighbourhoods.push(this.creditModel.incomes.colony);
      }
    }
    if (!this.creditModel.debit) {
      this.creditModel.debit = new Debit();
    }
    if (!this.creditModel.credit_beneficiary) {
      this.creditModel.credit_beneficiary = new CreditBeneficiary();
      this.creditModel.credit_beneficiary.country_code = this.constant.country_code;
      this.creditModel.credit_beneficiary.phone_code = this.constant.dial_code;
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
      this.adminService.postDataApi('getCreditesInsured', {}),
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
      this.adminService.postDataApi('getSolidarity', { id: this.parameter.property_id || '0' }),
      this.adminService.postDataApi('getCurrencies', {}),
      this.adminService.postDataApi('getDebit', { id: this.parameter.property_id || '0' }),
      this.adminService.postDataApi('getCreditsStatus', {}),
      this.adminService.postDataApi('getParticipant', {})
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
      this.currencies = response[25].data || [];
      this.debit_list = response[26].data || [];
      this.CreditsStatus_list = response[27].data || [];
      this.Participant_list = response[28].data || [];
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
    //console.log(values)
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
      case 11:
      case 12:
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
        postData = this.getRequestDataForEighthStep(8);
        break;
      case 9:
        postData = this.getRequestDataForNinethStep(9);
        break;
      case 10:
        postData = this.getRequestDataForTenthStep(10);
        break;
      case 11:
        postData = this.getRequestDataForEleventhStep(11);
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
      nss: this.creditModel.nss,
      subaccount_balance: this.creditModel.subaccount_balance,
      infonavit_credit: this.creditModel.infonavit_credit,
      executive: this.creditModel.executive,
      state: this.creditModel.state,
      country_id: this.creditModel.country_id,
      square: this.creditModel.square,
      case_status: this.creditModel.case_status,
      property_status: this.creditModel.property_status,
      customer_profile: this.creditModel.customer_profile,
      credites_status_id: this.creditModel.credites_status_id
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
      credits_participant_id: this.creditModel.general_data.credits_participant_id,
      participant_toggel: this.creditModel.general_data.participant_toggel
      // co_credited_relationship: this.creditModel.general_data.co_credited_relationship,
      // co_credited_owner: this.creditModel.general_data.co_credited_owner,
      // co_credited_involved_credit: this.creditModel.general_data.co_credited_involved_credit,
      // co_credited_involved_revenue: this.creditModel.general_data.co_credited_involved_revenue
    };
    modelSave = { general_data: modelSave1, step: currentStep };
    return modelSave;
  }
  togglePart(value) {
    this.isShow = value.target.checked ? true : false;
    console.log(this.isShow, "val");
    //  if(value == true){
    //   this.isShow = true;
    //   console.log(this.isShow,"show");
    //  }else{
    //   this.isShow = false;
    //   console.log(this.isShow,"show");
    //  }
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
    if (this.creditModel.economic_dependent.credit_dependent_id) {
      const modelSave = {
        id: this.parameter.property_id,
        credit_dependent_id: this.creditModel.economic_dependent.credit_dependent_id,
        credits_relationship_id: this.creditModel.economic_dependent.credits_relationship_id,
        age: this.creditModel.economic_dependent.age,
        occupation: this.creditModel.economic_dependent.occupation,
        step: currentStep
      };
      return modelSave;
    } else {
      const modelSave = {
        id: this.parameter.property_id,
        credits_relationship_id: this.creditModel.economic_dependent.credits_relationship_id,
        age: this.creditModel.economic_dependent.age,
        occupation: this.creditModel.economic_dependent.occupation,
        step: currentStep
      };
      return modelSave;
    }


  }

  getRequestDataForSixthStep = (currentStep: number): any => {
    // const stepOneId = localStorage.getItem('stepOneId');
    if (this.creditModel.references.credit_references_id) {
      const modelSave = {
        credit_references_id: this.creditModel.references.credit_references_id,
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
    } else {
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

  }

  getRequestDataForSeventhStep = (currentStep: number): any => {
    if (this.creditModel.solidarity_liabilities.solidarity_id) {
      const modelSave: any = this.creditModel.solidarity_liabilities;
      modelSave.step = currentStep;
      modelSave.id = this.parameter.property_id;
      modelSave.solidarity_id = this.creditModel.solidarity_liabilities.solidarity_id
      return modelSave;
    } else {
      const modelSave: any = this.creditModel.solidarity_liabilities;
      modelSave.step = currentStep;
      modelSave.id = this.parameter.property_id;
      return modelSave;
    }

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

  getRequestDataForNinethStep = (currentStep: number): any => {
    if (!this.creditModel.incomes_bank_account) {
      this.toastr.clear();
      this.toastr.error(
        this.translate.instant('message.error.pleaseEnterSomeText'),
        this.translate.instant('swal.error'),
      );
    }

    const modelSave: any = {
      step: currentStep,
      incomes_bank_account: this.creditModel.incomes_bank_account
    };
    (this.creditModel.incomes_bank_account || []).length > 0 ? '' : modelSave.credites_details_id = this.parameter.property_id;
    return modelSave;
  }

  getRequestDataForTenthStep = (currentStep: number): any => {
    const modelSave: any = this.creditModel.debit;
    modelSave.step = currentStep;
    modelSave.id = parseInt(this.parameter.property_id);
    return modelSave;
  }

  getRequestDataForEleventhStep = (currentStep: number): any => {
    const modelSave: any = this.creditModel.credit_beneficiary;
    modelSave.step = currentStep;
    if (modelSave.id) {
      this.creditModel.credit_beneficiary.credites_beneficiary_id = modelSave.id;
    }
    modelSave.id = parseInt(this.parameter.property_id);
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
      this.adminService.postDataApi('getZipcodeinfo', { zip_code: zipcode }).
        subscribe((success) => {
          this.spinnerService.hide();
          let data = success.data.trim();
          success.data = JSON.parse(data);
          switch (index) {
            case 1:
              this.creditModel.solidarity_liabilities.municipality = ((success.data || [])[0] || {}).Municipio || ''; // Municipality
              this.creditModel.solidarity_liabilities.state = ((success.data || [])[0] || {}).Entidad || ''; // State
              this.creditModel.solidarity_liabilities.city = ((success.data || [])[0] || {}).Ciudad || ''; // city
              this.creditModel.solidarity_liabilities.country = this.creditModel.solidarity_liabilities.municipality || this.creditModel.solidarity_liabilities.state || this.creditModel.solidarity_liabilities.city ? 'Mexico' : ''; // Country
              const tempNeighbourhoods1 = [];
              if (!(success.data || {}).error) {
                (success.data || []).forEach((data) => { tempNeighbourhoods1.push(data.Colonia); });
              }
              this.creditModel.solidarity_liabilities.neighbourhoods = tempNeighbourhoods1;//((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
              this.creditModel.solidarity_liabilities.neighbourhood = (this.creditModel.solidarity_liabilities.neighbourhoods || [])[0] || '';
              break;
            case 2:
              this.creditModel.solidarity_liabilities.municipality = ((success.data || [])[0] || {}).Municipio || ''; // Municipality
              this.creditModel.solidarity_liabilities.state = ((success.data || [])[0] || {}).Entidad || ''; // State
              this.creditModel.solidarity_liabilities.city = ((success.data || [])[0] || {}).Ciudad || ''; // city
              this.creditModel.solidarity_liabilities.country = this.creditModel.solidarity_liabilities.municipality || this.creditModel.solidarity_liabilities.state || this.creditModel.solidarity_liabilities.city ? 'Mexico' : ''; // Country
              const tempNeighbourhoods2 = [];
              if (!(success.data || {}).error) {
                (success.data || []).forEach((data) => { tempNeighbourhoods2.push(data.Colonia); });
              }
              this.creditModel.incomes.neighbourhoods = tempNeighbourhoods2;//((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
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
      case 7:
        this.creditModel.credit_beneficiary.country_code = event.iso2;
        this.creditModel.credit_beneficiary.phone_code = '+' + event.dialCode;
        break;
      default:
        break;
    }
  }

  hasErrorCoCredited = (): boolean => {
    if (!this.parameter.property_id ||
      !this.creditModel.general_data.credits_participant_id ||
      this.creditModel.general_data.credits_participant_id
      // !this.creditModel.general_data.co_credited_email ||
      // this.creditModel.general_data.co_credited_email == '' ||
      // !this.creditModel.general_data.co_credited_relationship ||
      // this.creditModel.general_data.co_credited_relationship == '' ||
      // !this.creditModel.general_data.co_credited_owner ||
      // !this.creditModel.general_data.co_credited_involved_revenue ||
      // !this.creditModel.general_data.co_credited_involved_credit
    ) {
      return true;
    }
    return false;
  }

  hasErrorEconomicDependent = (): boolean => {
    if (!this.creditModel.economic_dependent.credits_relationship_id || !this.parameter.property_id
      // !this.parameter.property_id ||
      // !this.creditModel.economic_dependent.age ||
      // this.creditModel.economic_dependent.age == '' ||
      // !this.creditModel.economic_dependent.occupation ||
      // this.creditModel.economic_dependent.occupation == ''
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

  addDeveloperBank(e) {
    const bank = new BankDetail();
    bank.credites_details_id = JSON.parse(this.parameter.property_id || '0');
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

  hasErrorDebit = (): boolean => {
    if (!this.parameter.property_id) {
      return true;
    } else if (this.creditModel.debit.creditor_institution ||
      this.creditModel.debit.type_of_debit ||
      this.creditModel.debit.monthly_payment
    ) {
      return false;
    } else {
      return true;
    }
  }

  getAccountTypeText = (bankId: any): any => {
    const data = this.income_list.find((item) => item.id == bankId);
    return (this.language_code == 'en' ? data.name_en : data.name_es);
  }

  getCurrencyText = (currencyId: any): any => {
    const data = this.currencies.find((item) => item.id == currencyId);
    return data.code + ' | ' + data.currency;
  }

  getTypeOfDebitText = (debitId: any): any => {
    const data = this.debt.find((item) => item.id == debitId);
    return (this.language_code == 'en' ? data.name_en : data.name_es);
  }

  viewDocument = (document: string): void => {
    window.open(document, '_blank');
  }

  deletePopup = (index: number, id: string): void => {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDeleteFile'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteCreditsDocument(index, id);
      }
    });
  }

  deleteCreditsDocument = (index: number, id: string): void => {
    this.spinnerService.show();
    const input = new FormData();
    input.append('id', id);
    this.adminService.postDataApi('deleteCreditsDocument', input).subscribe((success) => {
      this.spinnerService.hide();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
      this.getCreditsDocument();
    });
  }

  addDocumentationModalClose = (): void => {
    this.docFile = '';
    this.docsFile.nativeElement.value = '';
    this.closeAddDocumentationModal.nativeElement.click();
  }

  onSelectFile = (files: any, folderId: number): void => {
    this.docFile = files[0];
    this.folderId = folderId;
  }


  addDocs = (): void => {
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
    } else {
      const postData = new FormData();
      postData.append('attachment', this.docFile);
      postData.append('id', this.folderId.toString());
      this.isDocumentLoading = true;
      this.adminService.postDataApi('addcreditsDocument', postData).subscribe((success) => {
        this.isDocumentLoading = false;
        this.docs.push({ display_name: this.docFile });
        this.docFile = '';
        this.docsFile.nativeElement.value = '';
        this.getCreditsDocument();
      }, (error) => {
        this.isDocumentLoading = false;
      });
    }
  }

  openAddFolder = (folder: any, index: number): void => {
    this.folderName = this.language_code == 'en' ? folder.creadit_document.name_en : folder.creadit_document.name_es;;
    this.folderId = folder.id;
    this.openAddDocumentationModal.nativeElement.click();
  }

  setTabCredito(tab) {
    this.creditoTab = tab;
  }

  getValueScore(data) {
    this.spinnerService.show();
    forkJoin([
      this.adminService.postDataApi('valueScore', { user_id: 13 }),
      this.adminService.postDataApi('valueScore007', { user_id: 13 }),
      this.adminService.postDataApi('frequencyPayments', { user_id: 13 }),
      this.adminService.postDataApi('contractType', { user_id: 13 }),
      this.adminService.postDataApi('accountType', { user_id: 13 })
    ]).subscribe(
      success => {
        this.valueScore004 = success[0]['data'];
        this.valueScore007 = success[1]['data'];
        this.frequencyPayments = success[2]['data'];
        this.contractType = success[3]['data'];
        this.accountTypeCredit = success[4]['data'];
        this.getUserById(13)
      });
  }

  sendUserForXML(data) {
    this.adminService.postDataApi('sendXml', { user_id: 13 }).subscribe(
      success => {

      });
    } 

    sendXML(data) {
      this.adminService.postDataApi('storeXmlData', { user_id: 13 }).subscribe(
        success => {
  
        });
      }


  getUserById(data) {
    this.adminService.postDataApi('getXmlFinalData', { user_id: 13 }).subscribe(
      success => {
        this.user_data = success['data'];
        this.user_data.xml_name.name = this.user_data.xml_name.PrimerNombre + ' ' + this.user_data.xml_name.SegundoNombre + ' ' + this.user_data.xml_name.ApellidoPaterno + ' ' + this.user_data.xml_name.ApellidoMaterno;
        this.user_data.xml_accounts.forEach(item => {
          item.HistoricoPagosArray = [];
          let month_no1 = item.FechaMasRecienteHistoricoPagos.substring(2, 4);
          item.LimiteCredito = (this.price.transform(Number(item.LimiteCredito)).replace('$', '') || 'N/A');
          item.CreditoMaximo = (this.price.transform(Number(item.CreditoMaximo)).replace('$', '') || 'N/A');
          item.SaldoActual = (this.price.transform(Number(item.SaldoActual.replace('+', ''))).replace('$', '') || 'N/A')
          let value = this.frequencyPayments.find(data => data.code == item.FrecuenciaPagos);
          let value1 = this.contractType.find(data => data.code == item.TipoContrato);
          let value2 = this.accountTypeCredit.find(data => data.code == item.TipoCuenta);
          item.FrecuenciaPagosDes = value.description;
          item.TipoContratoDes = value1.description;
          item.TipoCuentaDes = value2.description;
          item.FechaAperturaCuentaDate = (item.FechaAperturaCuenta ? ((item.FechaAperturaCuenta.substring(0, 2) + '/' +
            item.FechaAperturaCuenta.substring(2, item.FechaAperturaCuenta.length)).substring(0, 5) + '/' +
            item.FechaAperturaCuenta.substring(4, item.FechaAperturaCuenta.length)) : '');
          item.FechaUltimoPagoDate = (item.FechaUltimoPago ? ((item.FechaUltimoPago.substring(0, 2) + '/' +
            item.FechaUltimoPago.substring(2, item.FechaUltimoPago.length)).substring(0, 5) + '/' +
            item.FechaUltimoPago.substring(4, item.FechaUltimoPago.length)) : '');
          item.FechaUltimaCompraDate = (item.FechaUltimaCompra ? ((item.FechaUltimaCompra.substring(0, 2) + '/' +
            item.FechaUltimaCompra.substring(2, item.FechaUltimaCompra.length)).substring(0, 5) + '/' +
            item.FechaUltimaCompra.substring(4, item.FechaUltimaCompra.length)) : '');
          item.FechaActualizacionDate = (item.FechaActualizacion ? ((item.FechaActualizacion.substring(0, 2) + '/' +
            item.FechaActualizacion.substring(2, item.FechaActualizacion.length)).substring(0, 5) + '/' +
            item.FechaActualizacion.substring(4, item.FechaActualizacion.length)) : '');
          if (item.HistoricoPagos.length > 0) {
            if (month_no1 == '01') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  F: '', M: '', A: '', Ma: '', J: '', Ju: '', Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '02') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  F: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  M: '', A: '', Ma: '', J: '', Ju: '', Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '03') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  F: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  M: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  A: '', Ma: '', J: '', Ju: '', Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '04') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  F: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  M: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  A: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  Ma: '', J: '', Ju: '', Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '05') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  F: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  M: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  A: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  Ma: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  J: '', Ju: '', Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '06') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  F: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  M: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  A: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  Ma: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  J: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  Ju: '', Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '07') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  F: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  M: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  A: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  Ma: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  J: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  Ju: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  Au: '', S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '08') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  F: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  M: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  A: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  Ma: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  J: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  Ju: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  Au: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  S: '', O: '', N: '', D: '',
                });
            }
            if (month_no1 == '09') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  F: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  M: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  A: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  Ma: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  J: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  Ju: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  Au: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  S: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  O: '', N: '', D: '',
                });
            }
            if (month_no1 == '10') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  F: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  M: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  A: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  Ma: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  J: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  Ju: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  Au: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  S: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  O: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  N: '', D: '',
                });
            }
            if (month_no1 == '11') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  F: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  M: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  A: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  Ma: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  J: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  Ju: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  Au: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  S: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  O: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  N: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                  D: '',
                });
            }
            if (month_no1 == '12') {
              item.HistoricoPagosArray.push(
                {
                  year: item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length),
                  E: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  F: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  M: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  A: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  Ma: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  J: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  Ju: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  Au: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  S: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  O: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  N: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : '',
                  D: (item.HistoricoPagos.length - 1) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 1] : '',
                });
            }
          }
          if (item.HistoricoPagos.length > 0) {
            if (month_no1 == '01') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  F: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  M: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  A: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  Ma: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  J: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  Ju: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  Au: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  S: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  O: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  N: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : '',
                  D: (item.HistoricoPagos.length - 2) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 2] : ''
                });
            }
            if (month_no1 == '02') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  F: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  M: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  A: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  Ma: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  J: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  Ju: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  Au: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  S: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  O: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  N: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : '',
                  D: (item.HistoricoPagos.length - 3) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 3] : ''
                });
            }
            if (month_no1 == '03') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  F: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  M: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  A: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  Ma: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  J: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  Ju: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  Au: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  S: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  O: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  N: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : '',
                  D: (item.HistoricoPagos.length - 4) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 4] : ''
                });
            }
            if (month_no1 == '04') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  F: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  M: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  A: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  Ma: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  J: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  Ju: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  Au: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  S: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  O: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  N: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : '',
                  D: (item.HistoricoPagos.length - 5) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 5] : ''
                });
            }
            if (month_no1 == '05') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  F: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  M: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  A: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  Ma: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  J: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  Ju: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  Au: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  S: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  O: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  N: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : '',
                  D: (item.HistoricoPagos.length - 6) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 6] : ''
                });
            }
            if (month_no1 == '06') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  F: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  M: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  A: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  Ma: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  J: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  Ju: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  Au: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  S: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  O: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  N: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : '',
                  D: (item.HistoricoPagos.length - 7) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 7] : ''
                });
            }
            if (month_no1 == '07') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  F: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  M: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  A: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  Ma: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  J: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  Ju: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  Au: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  S: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  O: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  N: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : '',
                  D: (item.HistoricoPagos.length - 8) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 8] : ''
                });
            }
            if (month_no1 == '08') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  F: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  M: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  A: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  Ma: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  J: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  Ju: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  Au: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  S: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  O: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  N: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : '',
                  D: (item.HistoricoPagos.length - 9) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 9] : ''
                });
            }
            if (month_no1 == '09') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  F: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  M: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  A: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  Ma: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  J: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  Ju: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  Au: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  S: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  O: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  N: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : '',
                  D: (item.HistoricoPagos.length - 10) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 10] : ''
                });
            }
            if (month_no1 == '10') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  F: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  M: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  A: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  Ma: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  J: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  Ju: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  Au: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  S: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  O: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  N: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : '',
                  D: (item.HistoricoPagos.length - 11) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 11] : ''
                });
            }
            if (month_no1 == '11') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  F: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  M: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  A: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  Ma: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  J: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  Ju: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  Au: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  S: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  O: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  N: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : '',
                  D: (item.HistoricoPagos.length - 12) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 12] : ''
                });
            }
            if (month_no1 == '12') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 1,
                  E: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  F: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  M: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  A: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  Ma: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  J: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  Ju: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  Au: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  S: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  O: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  N: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : '',
                  D: (item.HistoricoPagos.length - 13) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 13] : ''
                });
            }
          }
          if (item.HistoricoPagos.length > 0) {
            if (month_no1 == '01') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  F: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  M: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  A: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  Ma: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  J: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  Ju: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  Au: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  S: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  O: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  N: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : '',
                  D: (item.HistoricoPagos.length - 14) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 14] : ''
                });
            }
            if (month_no1 == '02') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  F: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  M: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  A: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  Ma: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  J: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  Ju: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  Au: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  S: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  O: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  N: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : '',
                  D: (item.HistoricoPagos.length - 15) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 15] : ''
                });
            }
            if (month_no1 == '03') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  F: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  M: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  A: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  Ma: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  J: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  Ju: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  Au: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  S: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  O: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  N: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : '',
                  D: (item.HistoricoPagos.length - 16) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 16] : ''
                });
            }
            if (month_no1 == '04') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  F: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  M: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  A: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  Ma: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  J: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  Ju: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  Au: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  S: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  O: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  N: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : '',
                  D: (item.HistoricoPagos.length - 17) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 17] : ''
                });
            }
            if (month_no1 == '05') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  F: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  M: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  A: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  Ma: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  J: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  Ju: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  Au: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  S: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  O: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  N: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : '',
                  D: (item.HistoricoPagos.length - 18) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 18] : ''
                });
            }
            if (month_no1 == '06') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  F: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  M: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  A: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  Ma: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  J: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  Ju: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  Au: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  S: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  O: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  N: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : '',
                  D: (item.HistoricoPagos.length - 19) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 19] : ''
                });
            }
            if (month_no1 == '07') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 31) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 31] : '',
                  F: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  M: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  A: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  Ma: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  J: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  Ju: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  Au: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  S: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  O: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  N: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : '',
                  D: (item.HistoricoPagos.length - 20) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 20] : ''
                });
            }
            if (month_no1 == '08') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 32) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 32] : '',
                  F: (item.HistoricoPagos.length - 31) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 31] : '',
                  M: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  A: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  Ma: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  J: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  Ju: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  Au: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  S: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  O: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  N: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : '',
                  D: (item.HistoricoPagos.length - 21) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 21] : ''
                });
            }
            if (month_no1 == '09') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 33) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 33] : '',
                  F: (item.HistoricoPagos.length - 32) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 32] : '',
                  M: (item.HistoricoPagos.length - 31) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 31] : '',
                  A: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  Ma: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  J: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  Ju: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  Au: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  S: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  O: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  N: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : '',
                  D: (item.HistoricoPagos.length - 22) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 22] : ''
                });
            }
            if (month_no1 == '10') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 34) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 34] : '',
                  F: (item.HistoricoPagos.length - 33) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 33] : '',
                  M: (item.HistoricoPagos.length - 32) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 32] : '',
                  A: (item.HistoricoPagos.length - 31) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 31] : '',
                  Ma: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  J: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  Ju: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  Au: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  S: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  O: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  N: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : '',
                  D: (item.HistoricoPagos.length - 23) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 23] : ''
                });
            }
            if (month_no1 == '11') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 35) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 35] : '',
                  F: (item.HistoricoPagos.length - 34) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 34] : '',
                  M: (item.HistoricoPagos.length - 33) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 33] : '',
                  A: (item.HistoricoPagos.length - 32) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 32] : '',
                  Ma: (item.HistoricoPagos.length - 31) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 31] : '',
                  J: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  Ju: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  Au: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  S: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  O: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  N: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : '',
                  D: (item.HistoricoPagos.length - 24) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 24] : ''
                });
            }
            if (month_no1 == '12') {
              item.HistoricoPagosArray.push(
                {
                  year: (Number(item.FechaMasRecienteHistoricoPagos.substring(4, item.FechaMasRecienteHistoricoPagos.length))) - 2,
                  E: (item.HistoricoPagos.length - 36) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 36] : '',
                  F: (item.HistoricoPagos.length - 35) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 35] : '',
                  M: (item.HistoricoPagos.length - 34) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 34] : '',
                  A: (item.HistoricoPagos.length - 33) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 33] : '',
                  Ma: (item.HistoricoPagos.length - 32) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 32] : '',
                  J: (item.HistoricoPagos.length - 31) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 31] : '',
                  Ju: (item.HistoricoPagos.length - 30) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 30] : '',
                  Au: (item.HistoricoPagos.length - 29) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 29] : '',
                  S: (item.HistoricoPagos.length - 28) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 28] : '',
                  O: (item.HistoricoPagos.length - 27) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 27] : '',
                  N: (item.HistoricoPagos.length - 26) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 26] : '',
                  D: (item.HistoricoPagos.length - 25) >= 0 ? item.HistoricoPagos[item.HistoricoPagos.length - 25] : ''
                });
            }
          }
        });

        this.user_data.xml_report.forEach(item => {
          let value3Array = item.MensajesAlerta.split("");
          let value3 = '';
          value3Array.forEach((item, index) => {
            if (index == 0) {
              value3 = value3 + (item == 'Y' ? 'Aparece Fecha de defunción en la base de datos. ' : item == 'N' ? '' : '');
            }
            if (index == 1) {
              value3 = value3 + (item == 'Y' ? 'RFC del cliente no corresponde al RFC de la base de datos. ' : item == 'N' ? '' : '');
            }
            if (index == 2) {
              value3 = value3 + (item == 'Y' ? 'Dirección no corresponde a la de la base de datos. ' : item == 'N' ? '' : '');
            }
            if (index == 3) {
              value3 = value3 + (item == 'Y' ? 'Existe información adicional en el Buró de Crédito Comercial. ' : item == 'N' ? '' : '');
            }
            if (index == 4) {
              value3 = value3 + (item == 'Y' ? 'Dirección inválida en la consulta. ' : item == 'N' ? '' : '');
            }
            if (index == 5) {
              value3 = value3 + (item == 'Y' ? 'Usuario con menos de 5 mil registros en el expediente. ' : item == 'N' ? '' : '');
            }
          });
          item.MensajesAlertaDes = value3;
          item.FechaAperturaCuentaMasAntiguaDate = (item.FechaAperturaCuentaMasAntigua ? ((item.FechaAperturaCuentaMasAntigua.substring(0, 2) + '/' +
            item.FechaAperturaCuentaMasAntigua.substring(2, item.FechaAperturaCuentaMasAntigua.length)).substring(0, 5) + '/' +
            item.FechaAperturaCuentaMasAntigua.substring(4, item.FechaAperturaCuentaMasAntigua.length)) : '');
          item.FechaAperturaCuentaMasRecienteDate = (item.FechaAperturaCuentaMasReciente ? ((item.FechaAperturaCuentaMasReciente.substring(0, 2) + '/' +
            item.FechaAperturaCuentaMasReciente.substring(2, item.FechaAperturaCuentaMasReciente.length)).substring(0, 5) + '/' +
            item.FechaAperturaCuentaMasReciente.substring(4, item.FechaAperturaCuentaMasReciente.length)) : '');
          item.FechaSolicitudReporteMasRecienteDate = (item.FechaSolicitudReporteMasReciente ? ((item.FechaSolicitudReporteMasReciente.substring(0, 2) + '/' +
            item.FechaSolicitudReporteMasReciente.substring(2, item.FechaSolicitudReporteMasReciente.length)).substring(0, 5) + '/' +
            item.FechaSolicitudReporteMasReciente.substring(4, item.FechaSolicitudReporteMasReciente.length)) : '');
          item.TotalCreditosMaximosRevolventesChange = item.TotalCreditosMaximosRevolventes ? (this.price.transform(Number(item.TotalCreditosMaximosRevolventes))).replace('$', '') : '';
          item.TotalLimitesCreditoRevolventesChange = item.TotalLimitesCreditoRevolventes ? (this.price.transform(Number(item.TotalLimitesCreditoRevolventes))).replace('$', '') : '';
          item.TotalSaldosActualesRevolventesChange = item.TotalSaldosActualesRevolventes ? (this.price.transform(Number(item.TotalSaldosActualesRevolventes.replace('+', '')))).replace('$', '') : '';
          item.TotalSaldosVencidosRevolventesChange = item.TotalSaldosVencidosRevolventes ? (this.price.transform(Number(item.TotalSaldosVencidosRevolventes))).replace('$', '') : '';
          item.PctLimiteCreditoUtilizadoRevolventesChange = item.PctLimiteCreditoUtilizadoRevolventes ? ((Number(item.PctLimiteCreditoUtilizadoRevolventes)) + '%') : '';
          item.TotalPagosRevolventesChange = item.TotalPagosRevolventes ? (this.price.transform(Number(item.TotalPagosRevolventes))).replace('$', '') : '';
          item.TotalCreditosMaximosPagosFijosChange = item.TotalCreditosMaximosPagosFijos ? (this.price.transform(Number(item.TotalCreditosMaximosPagosFijos))).replace('$', '') : '';
          item.TotalSaldosActualesPagosFijosChange = item.TotalSaldosActualesPagosFijos ? (this.price.transform(Number(item.TotalSaldosActualesPagosFijos))).replace('$', '') : '';
          item.TotalSaldosVencidosPagosFijosChange = item.TotalSaldosVencidosPagosFijos ? (this.price.transform(Number(item.TotalSaldosVencidosPagosFijos))).replace('$', '') : '';
          item.TotalPagosPagosFijosChange = item.TotalPagosPagosFijos ? (this.price.transform(Number(item.TotalPagosPagosFijos))).replace('$', '') : '';
        });

        this.user_data.xml_value_score.forEach(item => {
          if (item.CodigoScore == '007') {
            let value = this.valueScore007.find(data => data.code == item.ValorScore);
            this.ValorScoreDes007 = value.description;
          }
          if (item.CodigoScore == '004') {
            let value = this.valueScore004.find(data => data.code == item.ValorScore);
            this.ValorScoreDes004 = value.description;
          }
        });

        this.user_data.xml_alert_query.forEach(item => {
          item.FechaReporteDate = (item.FechaReporte ? ((item.FechaReporte.substring(0, 2) + '/' + item.FechaReporte.substring(2, item.FechaReporte.length)).substring(0, 5) +
          '/' + item.FechaReporte.substring(4, item.FechaReporte.length)) : '');
        })
        this.spinnerService.hide();
      });
  }

  downloadPdf(data){
    this.credito.getValueScore(data);
  }

}
