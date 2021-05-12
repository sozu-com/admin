import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddProjectModel, Towers, Configuration } from 'src/app/models/addProject.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddPropertyModel, Building } from 'src/app/models/addProperty.model';
import { Constant } from 'src/app/common/constants';
import { FileUpload } from 'src/app/common/fileUpload';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpInterceptor } from 'src/app/services/http-interceptor';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/primeng';
import { Collection, Seller } from 'src/app/models/collection.model';
import { ToastrService } from 'ngx-toastr';
import { Document } from 'src/app/models/document.model';
import { IDestinationStatus } from 'src/app/common/marrital-status-interface';
import { element } from 'protractor';
import { forkJoin } from 'rxjs';
import { GenerateOfferPdfService } from 'src/app/services/generate-offer-pdf.service';
declare let swal: any;

@Component({
  selector: 'app-add-edit-collection',
  templateUrl: './add-edit-collection.component.html',
  styleUrls: ['./add-edit-collection.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor, Collection, Document]
})
export class AddEditCollectionComponent implements OnInit {

  file2: FileUpload;

  public parameter: IProperty = {};
  @ViewChild('docsModalOpen') docsModalOpen: ElementRef;
  @ViewChild('docsModalClose') docsModalClose: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('linkUserModal') linkUserModal: ElementRef;
  @ViewChild('closeLinkUserModal') closeLinkUserModal: ElementRef;
  @ViewChild('linkExtBrokerModal') linkExtBrokerModal: ElementRef;
  @ViewChild('closeExtBrokerModal') closeExtBrokerModal: ElementRef;
  @ViewChild('folderModalOpen') folderModalOpen: ElementRef;
  @ViewChild('folderModalClose') folderModalClose: ElementRef;
  @ViewChild('docsFile') docsFile: ElementRef;
  @ViewChild('selectedPaymentChoice') selectedPaymentChoice: ElementRef;
  @ViewChild('localityOpen') localityOpen: ElementRef;
  @ViewChild('localityClose') localityClose: ElementRef;
  @ViewChild('buyerSellerPropertyDocumentationModalOpen') buyerSellerPropertyDocumentationModalOpen: ElementRef;
  @ViewChild('buyerSellerPropertyDocumentationModalClose') buyerSellerPropertyDocumentationModalClose: ElementRef;
  @ViewChild('notesadddModalOpen') notesadddModalOpen: ElementRef;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  Relationship_list = Array<IDestinationStatus>();
  public zoom: number;
  myFlag = false;
  name: string;
  property_id: string;
  url: File;
  url2 = [];
  urlImg360 = [];
  tab: number;
  selectedGuest: any;
  image1: any;
  image2: any;
  image3: any;
  showBuilding = false;
  amenityList = [];
  amen = '';
  bankList = [];
  bank = '';
  imageEvent = [];
  showText = false;
  showSearch = false;
  buildingName = '';
  offerId = '';
  initialCountry: any;
  propertyDetails = false;
  details: any;
  editMode = false;
  newcarpet_area = { area: '', price: '' };
  newcustom_attribute = { name: '', value: '' };
  buildingLoading = false;
  buildingData: AddProjectModel;
  searchedBuildings: Array<AddProjectModel>;
  searchedOffers: Array<AddProjectModel>;
  selectedBuilding: AddProjectModel;
  selectedTower: Towers;

  num_of_property: any;
  property_names: Array<any>;
  amenity_index: number;
  amenity_obj: any;

  mode: string;
  folderIndex: number;
  selectedFolder: any = {};
  folderName: string;
  docsName: string;
  docFile: any;
  locale: any;
  allUsers: Array<any>;
  allExtBrokers: Array<any>;
  properties: SelectItem[];
  paymentMethods: Array<any>;
  dealTypes: Array<any>;
  currencies: Array<any>;
  addFormStep1: FormGroup;
  addFormStep2: FormGroup;
  addFormStep3: FormGroup;
  addFormStep4: FormGroup;
  addFormStep5: FormGroup;
  addFormStep6: FormGroup;
  collectionFolders: Array<any>;
  docs: Array<any>;
  keyword: string;
  paymentChoices: Array<any>;
  currentPaymentChoiceId: number;
  showMonthlyInput: boolean;
  num_of_months: number;
  configurations: Array<any>;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  showError: boolean;
  payment_folder_id: number = 0;
  folderId: number;
  oldDocName: string;
  public paymentBankDetailsArray: any[] = [];
  private bankDetails: any;
  day_list = [];
  availabilityStatus = [
    { id: '1', name: this.translate.instant('leadDetails.purchase'), checked: false },
    { id: '2', name: this.translate.instant('leadDetails.rent'), checked: false }];

  ccsum: any;
  pcsum: any;
  acsum: any;
  isAgencyBank: boolean;
  buyerDocumentationFoldersDetails: any[] = [];
  sellerDocumentationFoldersDetails: any[] = [];
  propertyDocumentationFoldersDetails: any[] = [];
  beneficiaryDocumentationFoldersDetails: any[] = [];
  tutorDocumentationFoldersDetails: any[] = [];
  language_code: string;
  buyerSellerPropertyDocumentationId: number = 0;
  buyerSellerPropertyDocumentationFoldersDetailsLength: number = 0;
  buyerSellerPropertyDocumentationFoldersDetails: any[] = [];
  minimumDate: any;
  reminder_date: any;
  noteEmails: any;
  isShown: boolean = false;
  edit_reminder: boolean;

  public beneficiaries_list: any[] = [];
  public property_beneficiary: any[] = [];
  public property_collection_id: string = '';
  public percentage: string = '';
  public beneficiary_id: string = '';
  public beneficiaryIndex: number = -1;
  public multiDropdownSettings = {};
  collection_account_statement_id: any;
  isCommercialOffer: boolean;
  offer_id: any;
  offerDetail: any;
  is_choices: boolean;
  //public selectedbeneficiaries: any[] = [];
  public parkingLotIncludedDetails: any;
  public parkingLotSaleDetails: any;
  private parkingSpaceLotsArray: any[] = [];
  private parkingSpaceRentArray: any[] = [];
  property_offer_id: any;
  edit_price: boolean;
  edit_collection: boolean = false;
  isByOffer: any;
  parking_area: any[] = [];
  isEditDeliveryDate :boolean = false;

  constructor(
    public model: Collection,
    private adminService: AdminService,
    private commonService: CommonService,
    private router: Router,
    private building: Building,
    public constant: Constant,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public modelForDoc: Document,
    public tempmodel: Collection,
    private offerPdf: GenerateOfferPdfService
  ) { }

  ngOnInit(): void {
    this.day_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    this.language_code = localStorage.getItem('language_code');
    this.collectionFolders = [];
    this.model = new Collection();
    this.model.building = new Building();
    this.model.building_towers = new Towers();
    this.model.seller_type = '1';
    this.model.buyer_type = '1';
    this.setDatePickerLocale();
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.getAllPaymentChoices();
    this.getRelationship();

    this.parameter.sub = this.route.params.subscribe(params => {
      this.model.id = params['id'];
      if (params['id'] === '0') {
        this.showSearch = true;
        this.initFormStep1();
        this.setValue('seller_type', '1');
        this.setValue('buyer_type', '1');
        this.initFormStep4();
        this.initFormStep5();
      } else {
        this.editCollection();
      }
    });
    this.tab = 1;
    this.getCurrencies();
    this.initializedDropDownSetting();
    this.searchControl = new FormControl();

    this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
      this.setDatePickerLocale();
    });

    this.addFormStep4
      .controls["final_price"]
      .valueChanges
      .subscribe(selectedValue => {
        if (selectedValue) {
          this.onFinalPriceChange();
        }
        else {
          this.addFormStep4.controls.interest_discount.patchValue(Number(0).toFixed(3));
          //this.addFormStep4.controls.final_price.patchValue(0);
        }
      });
  }

  editCollection() {
    this.showSearch = false;
    this.initFormStep1();
    this.initFormStep2();
    this.initFormStep3();
    this.initFormStep4();
    this.initFormStep5();
    this.getCollectionDetails(this.model.id);
  }

  toggleShow(value) {
    this.isShown = value.target.checked ? true : false;
  }

  getAllPaymentChoices() {
    this.adminService.postDataApi('getPaymentChoices', {})
      .subscribe(
        success => {
          this.paymentChoices = success.data;
        }, error => {
          this.spinner.hide();
        });
  }
  getRelationship() {
    this.adminService.postDataApi('getRelationship', {})
      .subscribe(
        success => {
          this.Relationship_list = success.data;
        }, error => {
          this.spinner.hide();
        });
  }
  setDatePickerLocale() {
    if (this.translate.defaultLang === 'en') {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        dayNamesShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dayNamesMin: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
          'November', 'December'],
        monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Wk',
        dataType: 'string'
      };
    } else {
      this.locale = {
        firstDayOfWeek: 0,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun',
          'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Clara',
        dateFormat: 'mm/dd/yy',
        weekHeader: 'Sm',
        dataType: 'string'
      };
    }
  }

  initFormStep1() {
    this.addFormStep1 = this.formBuilder.group({
      // step 1
      building_id: ['', [Validators.required]],
      building_towers_id: ['', [Validators.required]],
      floor_num: ['', [Validators.required]],
      property_id: ['', [Validators.required]],
      for_sale: [''],
      for_rent: [''],
      building_configuration_id: [''],
      step: ['', [Validators.required]]
    });
  }

  initFormStep2() {
    this.addFormStep2 = this.formBuilder.group({
      step: ['', [Validators.required]],
      seller_id: [''],
      seller_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]], // commer cial name and seller name
      seller_first_surname: [''],
      seller_second_surname: [''],
      seller_legal_name: [''], // legal name in case of entity/dev
      seller_address: [null],  // legal entiy/dev address
      seller_email: [''],
      seller_phone: ['', [Validators.required, Validators.pattern(this.constant.numberPattern),
      Validators.minLength(8), Validators.maxLength(15)]],
      seller_company_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      seller_fed_tax: [''],
      seller_leg_rep_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      seller_leg_rep_first_surname: [''],
      seller_leg_rep_second_surname: [''],
      seller_leg_rep_phone: ['', [Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      seller_leg_rep_email: ['', [Validators.email]],
      seller_leg_rep_comp: [''],
      seller_leg_rep_fed_tax: ['', [Validators.minLength(12), Validators.maxLength(13)]],
      collection_seller_banks: this.formBuilder.array([]),
      collection_seller_rep_banks: this.formBuilder.array([]),
      seller_type: ['', [Validators.required]],
      seller_legal_entity_id: ['']
    });
  }

  setValue(key: string, value: any) {
    this.model[key] = value;
    if (key === 'seller_type') {
      // this.addFormStep2.reset();
      this.initFormStep2();
      this.showError = false;
      if (value != '1') {
        this.addFormStep2.controls['seller_email'].setValidators(null);
        this.addFormStep2.controls['seller_email'].updateValueAndValidity();
        this.addFormStep2.controls['seller_address'].setValidators([Validators.required, Validators.minLength(1)]);
        this.addFormStep2.controls['seller_fed_tax'].setValidators([Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep2.controls['seller_legal_name'].setValidators(
          [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_name'].setValidators(
          [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_phone'].setValidators(
          [Validators.required, Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]);
        this.addFormStep2.controls['seller_leg_rep_email'].setValidators([Validators.required, Validators.email]);
        // this.addFormStep2.controls['seller_leg_rep_comp'].setValidators(
        // [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_fed_tax'].setValidators(
          [Validators.required, Validators.minLength(12), Validators.maxLength(13)]);

      } else {
        this.addFormStep2.controls['seller_email'].setValidators([Validators.required, Validators.email]);
        this.addFormStep2.controls['seller_fed_tax'].setValidators([Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep2.controls['seller_leg_rep_comp'].setValidators([Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_name'].setValidators(null);
        this.addFormStep2.controls['seller_leg_rep_name'].updateValueAndValidity();
        this.addFormStep2.controls['seller_leg_rep_phone'].setValidators(null);
        this.addFormStep2.controls['seller_leg_rep_phone'].updateValueAndValidity();
        this.addFormStep2.controls['seller_leg_rep_email'].setValidators(null);
        this.addFormStep2.controls['seller_leg_rep_email'].updateValueAndValidity();
        // this.addFormStep2.controls['seller_leg_rep_comp'].setValidators(null);
        // this.addFormStep2.controls['seller_leg_rep_comp'].updateValueAndValidity();
        this.addFormStep2.controls['seller_leg_rep_fed_tax'].setValidators(null);
        this.addFormStep2.controls['seller_leg_rep_fed_tax'].updateValueAndValidity();
        // this.addFormStep2.controls['seller_fed_tax'].setValidators(null);
        // this.addFormStep2.controls['seller_fed_tax'].updateValueAndValidity();
      }
    } else {
      this.initFormStep3();
      this.showError = false;
      if (value != '1') {
        this.addFormStep3.controls['buyer_address'].setValidators([Validators.required, Validators.minLength(1)]);
        this.addFormStep3.controls['buyer_fed_tax'].setValidators([Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep3.controls['buyer_legal_name'].setValidators(
          [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_name'].setValidators(
          [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_phone'].setValidators(
          [Validators.required, Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]);
        this.addFormStep3.controls['buyer_leg_rep_email'].setValidators(
          [Validators.required, Validators.email]);
        // this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators(
        // [Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_fed_tax'].setValidators(
          [Validators.required, Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep3.controls['buyer_email'].setValidators(null);
        this.addFormStep3.controls['buyer_email'].updateValueAndValidity();
      } else {
        this.addFormStep3.controls['buyer_email'].setValidators([Validators.required, Validators.email]);
        this.addFormStep3.controls['buyer_fed_tax'].setValidators([Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators([Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_name'].setValidators(null);
        this.addFormStep3.controls['buyer_leg_rep_name'].updateValueAndValidity();
        this.addFormStep3.controls['buyer_leg_rep_phone'].setValidators(null);
        this.addFormStep3.controls['buyer_leg_rep_phone'].updateValueAndValidity();
        this.addFormStep3.controls['buyer_leg_rep_email'].setValidators(null);
        this.addFormStep3.controls['buyer_leg_rep_email'].updateValueAndValidity();
        // this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators(null);
        // this.addFormStep3.controls['buyer_leg_rep_comp'].updateValueAndValidity();
        this.addFormStep3.controls['buyer_leg_rep_fed_tax'].setValidators(null);
        this.addFormStep3.controls['buyer_leg_rep_fed_tax'].updateValueAndValidity();
      }
    }
  }

  initFormStep3() {
    this.addFormStep3 = this.formBuilder.group({
      step: ['', [Validators.required]],
      buyer_id: [''],
      buyer_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]], // commer cial name and seller name
      buyer_first_surname: [''],
      buyer_second_surname: [''],
      buyer_legal_name: [''], // legal name in case of entity/dev
      buyer_address: [null],  // legal entiy/dev address
      buyer_email: [''],
      buyer_phone: ['', [Validators.required, Validators.pattern(this.constant.numberPattern),
      Validators.minLength(8), Validators.maxLength(15)]],
      buyer_company_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      buyer_fed_tax: [''],
      buyer_leg_rep_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      buyer_leg_rep_first_surname: [''],
      buyer_leg_rep_second_surname: [''],
      buyer_leg_rep_phone: ['', [Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      buyer_leg_rep_email: ['', [Validators.email]],
      buyer_leg_rep_comp: [''],
      buyer_leg_rep_fed_tax: ['', [Validators.minLength(12), Validators.maxLength(13)]],
      collection_buyer_banks: this.formBuilder.array([]),
      collection_buyer_rep_banks: this.formBuilder.array([]),
      buyer_type: ['', [Validators.required]],
      buyer_legal_entity_id: ['']
    });
  }

  initFormStep4() {
    this.addFormStep4 = this.formBuilder.group({
      step: ['', [Validators.required]],
      currency_id: ['', [Validators.required]],
      paymentchoice: [''],
      payment_choices: this.formBuilder.array([]),
      num_of_months: [''],
      monthly_date: [''],
      monthly_amount: [''],
      email: [''],
      day: [''],
      deal_purchase_date: ['', [Validators.required]],
      deal_price: ['', [Validators.required]],
      sum_of_concepts: [''],
      deal_interest_rate: [0],
      deal_penality: [0],
      final_price: [''],
      interest_discount: [''],
      delivery_date: [{value:'',disabled:true}]
    });
    if (this.model.id === '0') {
      this.addFormStep4.get('deal_price').enable({ onlySelf: true });
      this.addFormStep4.controls['email'].enable();
      this.addFormStep4.controls['day'].enable();
    } else {
      this.addFormStep4.get('deal_price').disable({ onlySelf: true });
      this.addFormStep4.controls['email'].disable();
      this.addFormStep4.controls['day'].disable();
    }
  }

  initFormStep5() {
    this.addFormStep5 = this.formBuilder.group({
      // step 5
      step: ['', [Validators.required]],
      comm_total_commission: [{ value: '', disabled: true }, [Validators.required, Validators.max(100)]],
      comm_total_commission_amount: [{ value: '', disabled: true }, [Validators.required]],
      comm_shared_commission: [{ value: '', disabled: true }, [Validators.required, Validators.max(100)]],
      comm_shared_commission_amount: [{ value: '', disabled: true }, [Validators.required]],
      sozu_iva_percent: ['', [Validators.required, Validators.max(100)]],
      sozu_iva_amt: ['', [Validators.required]],
      agent_iva_percent: ['', [Validators.required, Validators.max(100)]],
      agent_iva_amt: ['', [Validators.required]],
      iva_percent: ['', [Validators.required]],
      add_iva_to_pc: [''],
      add_iva_to_cc: [''],
      add_iva_to_ac: [''],
      // deal_commission_agents: ['', [Validators.required]]
      deal_commission_agents: this.formBuilder.array([]),
      collection_agent_banks: this.formBuilder.array([]),
      collection_commissions: this.formBuilder.array([]),
      is_commission_sale_enabled: [''],
      payment_received_by: [''],
      bank_id: ['']
    });
    // if (this.model.id === '0') {
    // this.addAgent('');
    // }
  }

  initFormStep6() {
    this.addFormStep6 = this.formBuilder.group({
      step: ['', [Validators.required]],
      folderName: [''],
      collection_folders: this.formBuilder.array([])
    });
  }

  getCollectionDetails(id: string) {
    this.spinner.show();
    this.adminService.postDataApi('getCollectionById', { id: id })
      .subscribe(
        success => {
          this.edit_collection = true;
          this.isByOffer = (success.data || {}).offer_id;
          if (this.isByOffer) {
            this.parking_area = success.data.property.property_offer_payment.find(x => x.random_id == this.isByOffer);
            this.parkingSpaceSale(((success.data || {}).property || {}).building_id
            );
          }
          this.spinner.hide();
          this.tempmodel = JSON.parse(JSON.stringify(success['data']));
          this.property_beneficiary = (success.data || {}).beneficiary || [];
          this.getParkingSpaceLots(((success.data || {}).property || {}).building_id);
          this.getCollectionDocument(success.data);
          (success.data || {}).buyer_type == 1 ? this.getAllBeneficiary(success.data) : '';
          this.collection_account_statement_id = success.data.account_statement ? success.data.account_statement.id : undefined;
          this.patchFormData(success['data']);
          this.isAgencyBank = success['data'].payment_received_by == '1' ? true : false;
          this.getBanks(success['data'].property.id)
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getPaymentMethods() {
    this.adminService.postDataApi('getPaymentMethods', {})
      .subscribe(
        success => {
          this.paymentMethods = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getDealTypes() {
    this.adminService.postDataApi('getDealTypes', {})
      .subscribe(
        success => {
          this.dealTypes = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getCurrencies() {
    this.adminService.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  setAvailableStatus(aindex: number) {
    // this.availabilityStatus[aindex].checked = !this.availabilityStatus[aindex].checked;
    // handling this way because data already added in db
    if (aindex === 0) {
      this.availabilityStatus[0].checked = true;
      this.availabilityStatus[1].checked = false;
      this.model.availabilityStatusId = this.availabilityStatus[0].id;
    } else {
      this.availabilityStatus[0].checked = false;
      this.availabilityStatus[1].checked = true;
      this.model.availabilityStatusId = this.availabilityStatus[1].id;
    }
  }


  patchFormData(data) {
    this.patchFormStep1(data);
    this.patchFormStep2(data, 'edit');
    this.patchFormStep3(data);
    this.patchFormStep4(data);
    this.patchFormStep5(data);
    this.setFolders(data);
  }

  patchFormStep1(data) {
    this.model.building = this.isCommercialOffer ? data.building : data.property.building;
    this.model.building_towers = this.isCommercialOffer ? data.building_towers : data.property.building_towers;
    this.model.floor_num = this.isCommercialOffer ? data.floor_num : data.property.floor_num;
    this.model.name = this.isCommercialOffer ? data.name : data.property.name;
    this.model.availabilityStatusId = data.for_sale ? this.availabilityStatus[0].id : this.availabilityStatus[1].id;
    this.model.building_configuration_id = this.isCommercialOffer ? data.building_configuration_id : data.property.building_configuration_id;
    this.model.building_configuration = this.isCommercialOffer ? data.building_configuration : data.property.building_configuration;
    this.addFormStep1.controls.building_id.patchValue(this.isCommercialOffer ? data.building_id : data.property.building.id);
    this.addFormStep1.controls.building_towers_id.patchValue(this.isCommercialOffer ? data.building_towers.id : data.property.building_towers.id);
    this.addFormStep1.controls.floor_num.patchValue(this.isCommercialOffer ? data.floor_num : data.property.floor_num);
    this.addFormStep1.controls.property_id.patchValue(this.isCommercialOffer ? data.id : data.property_id);
    this.addFormStep1.controls.for_sale.patchValue(data.for_sale);
    this.addFormStep1.controls.for_rent.patchValue(data.for_rent);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep2(data, mode: string) {
    this.model.seller_type = data.seller_type ? data.seller_type : '1';
    this.addFormStep2.controls.seller_type.patchValue(data.seller_type ? data.seller_type.toString() : '1');

    // as a person
    if (this.model.seller_type == '1') {
      this.addFormStep2.controls.seller_id.patchValue(data.seller ? data.seller.id : '');
      this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name ? data.seller_company_name : '');
      this.addFormStep2.controls.seller_email.patchValue(data.seller ? data.seller.email : '');
      this.addFormStep2.controls.seller_name.patchValue(data.seller ? data.seller.name : '');
      this.addFormStep2.controls.seller_first_surname.patchValue(data.seller ? data.seller.first_surname : '');
      this.addFormStep2.controls.seller_second_surname.patchValue(data.seller ? data.seller.second_surname : '');
      this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller ? data.seller.fed_tax_pay : '');
      this.addFormStep2.controls.seller_legal_name.patchValue(data.seller_legal_name ? data.seller_legal_name : '');
      this.addFormStep2.controls.seller_address.patchValue(data.seller_address ? data.seller_address : '');
      this.addFormStep2.controls.seller_phone.patchValue(data.seller ? data.seller.phone : '');
      this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller ? data.seller.fed_tax_pay : '');

      this.addFormStep2.controls.seller_leg_rep_name.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.name : '');
      this.addFormStep2.controls.seller_leg_rep_first_surname.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.first_surname : '');
      this.addFormStep2.controls.seller_leg_rep_second_surname.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.second_surname : '');
      this.addFormStep2.controls.seller_leg_rep_phone.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.phone : '');
      this.addFormStep2.controls.seller_leg_rep_email.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.email : '');
      this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.fed_tax_pay : '');
      this.addFormStep2.controls.seller_leg_rep_comp.patchValue(data.seller_leg_rep_comp || '');

      this.addFormStep2.controls.step.patchValue(2);
      const control = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
      if (data.seller && data.seller.legal_representative && data.seller.legal_representative.legal_rep_banks) {
        data.seller.legal_representative.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control.push(this.formBuilder.group(x));
        });
      }
      const control1 = this.addFormStep2.get('collection_seller_banks') as FormArray;
      if (data.seller && data.seller.legal_rep_banks) {
        data.seller.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control1.push(this.formBuilder.group(x));
        });
      }
    }

    // seller as a developer
    if (this.model.seller_type == '3') {
      this.addFormStep2.controls.seller_id.patchValue(data.seller.id);
      this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name ? data.seller_company_name : '');
      this.addFormStep2.controls.seller_legal_name.patchValue(data.seller.developer_company || '');
      this.addFormStep2.controls.seller_name.patchValue(data.seller.name || '');
      this.addFormStep2.controls.seller_first_surname.patchValue(data.seller ? data.seller.first_surname : '');
      this.addFormStep2.controls.seller_second_surname.patchValue(data.seller ? data.seller.second_surname : '');
      this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller ? data.seller.fed_tax_pay : '');
      this.addFormStep2.controls.seller_phone.patchValue(data.seller.phone || '');
      this.addFormStep2.controls.seller_address.patchValue(data.seller.developer_address || '');
      this.addFormStep2.controls.seller_leg_rep_name.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.name : '');
      this.addFormStep2.controls.seller_leg_rep_first_surname.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.first_surname : '');
      this.addFormStep2.controls.seller_leg_rep_second_surname.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.second_surname : '');
      this.addFormStep2.controls.seller_leg_rep_phone.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.phone : '');
      this.addFormStep2.controls.seller_leg_rep_email.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.email : '');
      this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(
        data.seller && data.seller.legal_representative ? data.seller.legal_representative.fed_tax_pay : '');
      const control = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
      if (data.seller.legal_representative && data.seller.legal_representative.legal_rep_banks) {
        data.seller && data.seller.legal_representative.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control.push(this.formBuilder.group(x));
        });
      }
      const control1 = this.addFormStep2.get('collection_seller_banks') as FormArray;
      if (data.seller && data.seller.legal_rep_banks) {
        data.seller.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control1.push(this.formBuilder.group(x));
        });
      }
    }

    // seller as a legal entity
    if (this.model.seller_type == '2') {
      this.addFormStep2.controls.seller_legal_entity_id.patchValue(data.seller_legal_entity.id);
      this.addFormStep2.controls.seller_name.patchValue(data.seller_legal_entity.comm_name);
      this.addFormStep2.controls.seller_legal_name.patchValue(data.seller_legal_entity.legal_name);
      this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller_legal_entity.fed_tax_pay);
      this.addFormStep2.controls.seller_phone.patchValue(data.seller_legal_entity.phone);
      this.addFormStep2.controls.seller_address.patchValue(data.seller_legal_entity.address);
      this.addFormStep2.controls.seller_leg_rep_name.patchValue(
        data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.name : '');
      this.addFormStep2.controls.seller_leg_rep_first_surname.patchValue(
        data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.first_surname : '');
      this.addFormStep2.controls.seller_leg_rep_second_surname.patchValue(
        data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.second_surname : '');
      this.addFormStep2.controls.seller_leg_rep_phone.patchValue(
        data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.phone : '');
      this.addFormStep2.controls.seller_leg_rep_email.patchValue(
        data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.email : '');
      this.addFormStep2.controls.seller_leg_rep_comp.patchValue('');
      this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(
        data.seller_legal_entity.legal_reps ? data.seller_legal_entity.legal_reps.fed_tax_pay : '');
      let control = new FormArray([]);
      control = this.addFormStep2.get('collection_seller_banks') as FormArray;
      if (data.seller_legal_entity.legal_entity_banks) {
        data.seller_legal_entity.legal_entity_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control.push(this.formBuilder.group(x));
        });
      }
      let control1 = new FormArray([]);
      control1 = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
      if (data.seller_legal_entity.legal_reps && data.seller_legal_entity.legal_reps.legal_rep_banks) {
        data.seller_legal_entity.legal_reps.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control1.push(this.formBuilder.group(x));
        });
      }
    }


    if (mode == 'edit') {
      this.setSeller(data);
    }
  }

  patchFormStep3(data) {
    this.model.buyer_type = data.buyer_type ? data.buyer_type : '1';
    this.addFormStep3.controls.buyer_type.patchValue(data.buyer_type ? data.buyer_type.toString() : '1');

    // as a person
    if (this.model.buyer_type == '1') {
      this.addFormStep3.controls.buyer_id.patchValue(data.buyer ? data.buyer.id : '');
      this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name ? data.buyer_company_name : '');
      this.addFormStep3.controls.buyer_email.patchValue(data.buyer ? data.buyer.email : '');
      this.addFormStep3.controls.buyer_name.patchValue(data.buyer ? data.buyer.name : '');
      this.addFormStep3.controls.buyer_first_surname.patchValue(data.buyer ? data.buyer.first_surname : '');
      this.addFormStep3.controls.buyer_second_surname.patchValue(data.buyer ? data.buyer.second_surname : '');
      this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer_legal_name ? data.buyer_legal_name : '');
      this.addFormStep3.controls.buyer_address.patchValue(data.buyer_address ? data.buyer_address : '');
      this.addFormStep3.controls.buyer_phone.patchValue(data.buyer ? data.buyer.phone : '');
      this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer ? data.buyer.fed_tax_pay : '');

      this.addFormStep3.controls.buyer_leg_rep_name.patchValue(data.buyer && data.buyer.legal_representative ?
        data.buyer && data.buyer.legal_representative.name : '');
      this.addFormStep3.controls.buyer_leg_rep_first_surname.patchValue(data.buyer && data.buyer.legal_representative ?
        data.buyer && data.buyer.legal_representative.first_surname : '');
      this.addFormStep3.controls.buyer_leg_rep_second_surname.patchValue(data.buyer && data.buyer.legal_representative ?
        data.buyer && data.buyer.legal_representative.second_surname : '');
      this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(data.buyer && data.buyer.legal_representative ?
        data.buyer && data.buyer.legal_representative.phone : '');
      this.addFormStep3.controls.buyer_leg_rep_email.patchValue(data.buyer && data.buyer.legal_representative ?
        data.buyer && data.buyer.legal_representative.email : '');
      this.addFormStep3.controls.buyer_leg_rep_comp.patchValue(data.buyer_leg_rep_comp || '');
      this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(data.buyer && data.buyer.legal_representative ?
        data.buyer && data.buyer.legal_representative.fed_tax_pay : '');
      this.addFormStep3.controls.step.patchValue(2);
      const control = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
      if (data.buyer && data.buyer.legal_representative && data.buyer.legal_representative.legal_rep_banks) {
        data.buyer.legal_representative.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control.push(this.formBuilder.group(x));
        });
      }
      const control1 = this.addFormStep3.get('collection_buyer_banks') as FormArray;
      if (data.buyer && data.buyer.legal_rep_banks) {
        data.buyer.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control1.push(this.formBuilder.group(x));
        });
      }
      if (data.buyer && data.buyer.email && (this.model.id === '0' || (!data.account_statement && this.model.id != '0'))) {
        this.addFormStep4.controls.email.patchValue(data.buyer.email);
        this.isShown = true;
      }
    }
    // buyer as a legal entity
    if (this.model.buyer_type == '2') {
      this.addFormStep3.controls.buyer_legal_entity_id.patchValue(data.buyer_legal_entity.id);
      this.addFormStep3.controls.buyer_name.patchValue(data.buyer_legal_entity.comm_name);
      this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer_legal_entity.legal_name);
      this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer_legal_entity.fed_tax_pay);
      this.addFormStep3.controls.buyer_phone.patchValue(data.buyer_legal_entity.phone);
      this.addFormStep3.controls.buyer_address.patchValue(data.buyer_legal_entity.address);
      this.addFormStep3.controls.buyer_leg_rep_name.patchValue(
        data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.name : '');
      this.addFormStep3.controls.buyer_leg_rep_first_surname.patchValue(
        data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.first_surname : '');
      this.addFormStep3.controls.buyer_leg_rep_second_surname.patchValue(
        data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.second_surname : '');
      this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(
        data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.phone : '');
      this.addFormStep3.controls.buyer_leg_rep_email.patchValue(
        data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.email : '');
      this.addFormStep3.controls.buyer_leg_rep_comp.patchValue('');
      this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(
        data.buyer_legal_entity.legal_reps ? data.buyer_legal_entity.legal_reps.fed_tax_pay : '');
      let control = new FormArray([]);
      control = this.addFormStep3.get('collection_buyer_banks') as FormArray;
      if (data.buyer_legal_entity.legal_entity_banks) {
        data.buyer_legal_entity.legal_entity_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control.push(this.formBuilder.group(x));
        });
      }
      let control1 = new FormArray([]);
      control1 = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
      if (data.buyer_legal_entity.legal_reps && data.buyer_legal_entity.legal_reps.legal_rep_banks) {
        data.buyer_legal_entity.legal_reps.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control1.push(this.formBuilder.group(x));
        });
      }
      if (data.buyer_legal_entity && data.buyer_legal_entity.email && (this.model.id === '0' || (!data.account_statement && this.model.id != '0'))) {
        this.addFormStep4.controls.email.patchValue(data.buyer_legal_entity.email);
        this.isShown = true;
      }
    }

    // buyer as a developer
    if (this.model.buyer_type == '3') {
      this.addFormStep3.controls.buyer_id.patchValue(data.buyer.id);
      this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name ? data.buyer_company_name : '');
      this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer.developer_company || '');
      this.addFormStep3.controls.buyer_name.patchValue(data.buyer.name || '');
      this.addFormStep3.controls.buyer_first_surname.patchValue(data.buyer ? data.buyer.first_surname : '');
      this.addFormStep3.controls.buyer_second_surname.patchValue(data.buyer ? data.buyer.second_surname : '');
      this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer ? data.buyer.fed_tax_pay : '');
      this.addFormStep3.controls.buyer_phone.patchValue(data.buyer.phone || '');
      this.addFormStep3.controls.buyer_address.patchValue(data.buyer.developer_address || '');

      this.addFormStep3.controls.buyer_leg_rep_name.patchValue(
        data.buyer.legal_representative ? data.buyer.legal_representative.name : '');
      this.addFormStep3.controls.buyer_leg_rep_first_surname.patchValue(
        data.buyer.legal_representative ? data.buyer.legal_representative.first_surname : '');
      this.addFormStep3.controls.buyer_leg_rep_second_surname.patchValue(
        data.buyer.legal_representative ? data.buyer.legal_representative.second_surname : '');
      this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(
        data.buyer.legal_representative ? data.buyer.legal_representative.phone : '');
      this.addFormStep3.controls.buyer_leg_rep_email.patchValue(
        data.buyer.legal_representative ? data.buyer.legal_representative.email : '');
      this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(
        data.buyer.legal_representative ? data.buyer.legal_representative.fed_tax_pay : '');

      const control = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
      if (data.buyer.legal_representative && data.buyer.legal_representative.legal_rep_banks) {
        data.buyer.legal_representative.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control.push(this.formBuilder.group(x));
        });
      }
      const control1 = this.addFormStep3.get('collection_buyer_banks') as FormArray;
      if (data.buyer.legal_rep_banks) {
        data.buyer.legal_rep_banks.forEach(x => {
          delete x.id;  // no need to send id ( cuz these are saving separtely in table)
          control1.push(this.formBuilder.group(x));
        });
      }
      if (data.buyer && data.buyer.email && (this.model.id === '0' || (!data.account_statement && this.model.id != '0'))) {
        this.addFormStep4.controls.email.patchValue(data.buyer.email);
        this.isShown = true;
      }
    }
  }

  patchFormStep4(data) {
    this.addFormStep4.controls.deal_purchase_date.patchValue(
      data.deal_purchase_date ? this.getDateWRTTimezone(data.deal_purchase_date) : null);
      this.addFormStep4.controls.delivery_date.patchValue(
        data.delivery_date ? data.delivery_date : null);
    this.addFormStep4.controls.deal_price.patchValue(this.numberUptoNDecimal(data.deal_price, 2));
    this.addFormStep4.controls.currency_id.patchValue(data.currency_id ? data.currency_id : 1);
    this.addFormStep4.controls.deal_interest_rate.patchValue(data.deal_interest_rate);
    this.addFormStep4.controls.deal_penality.patchValue(data.deal_penality);
    const control1 = this.addFormStep4.get('payment_choices') as FormArray;
    let sum_of_concepts = 0;
    if (data.payment_choices) {
      for (let index = 0; index < data.payment_choices.length; index++) {
        const x = data.payment_choices[index];
        x.percent = this.numberUptoNDecimal(x.percent, 2);
        x.amount = this.numberUptoNDecimal(x.amount, 2);
        sum_of_concepts = sum_of_concepts + parseFloat(x.amount);
        x.date = x.date ? this.getDateWRTTimezone(x.date) : null;
        control1.push(this.formBuilder.group(x));
      }
    }

    if (!this.isByOffer) {
      let price = this.addFormStep4.controls.final_price.value;
      this.addFormStep4.controls.final_price.patchValue(price ? price : data.final_price);
      this.addFormStep4.controls.interest_discount.patchValue(data.property.interest_discount);
    }
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(sum_of_concepts, 2));
    this.addFormStep4.controls.step.patchValue(4);
    if (data.account_statement && data.account_statement.usersemail && data.account_statement.usersemail.length > 0) {
      let emails = '';
      data.account_statement.usersemail.forEach(element => {
        emails = emails == '' ? element.email : emails + ', ' + element.email;
      });
      this.addFormStep4.controls.email.patchValue(emails);
    }
    this.isShown = data.account_statement && data.account_statement.usersemail && data.account_statement.usersemail.length > 0 ? true : false;
    this.addFormStep4.controls.day.patchValue(data.account_statement ? data.account_statement.day : '');

    if (data.property.property_offer_payment && data.property.property_offer_payment.length > 0 && data.offer_id) {
      let index = data.property.property_offer_payment.findIndex(x => x.random_id == data.offer_id);
      this.addFormStep4.controls.final_price.patchValue(Number(data.property.property_offer_payment[index].final_price).toFixed(2));
      this.addFormStep4.controls.interest_discount.patchValue(data.property.property_offer_payment[index].discount ? data.property.property_offer_payment[index].discount :
        data.property.property_offer_payment[0].interest ? data.property.property_offer_payment[index].interest : 0);
    }
  }

  patchFormStep5(data) {
    this.addFormStep5.controls.comm_total_commission.patchValue(this.numberUptoNDecimal(data.comm_total_commission || 0, 3));
    this.addFormStep5.controls.comm_total_commission_amount.patchValue(this.numberUptoNDecimal(data.comm_total_commission_amount || 0, 2));
    this.addFormStep5.controls.is_commission_sale_enabled.patchValue(data.is_commission_sale_enabled || 0);
    this.addFormStep5.controls.comm_shared_commission.patchValue(this.numberUptoNDecimal(data.comm_shared_commission || 0, 3));
    this.addFormStep5.controls.comm_shared_commission_amount.patchValue(
      this.numberUptoNDecimal(data.comm_shared_commission_amount || 0, 2));
    this.addFormStep5.controls.sozu_iva_percent.patchValue(this.numberUptoNDecimal(data.sozu_iva_percent || 0, 3));
    this.addFormStep5.controls.sozu_iva_amt.patchValue(this.numberUptoNDecimal(data.sozu_iva_amt || 0, 2));
    this.addFormStep5.controls.agent_iva_percent.patchValue(this.numberUptoNDecimal(data.agent_iva_percent || 0, 3));
    this.addFormStep5.controls.agent_iva_amt.patchValue(this.numberUptoNDecimal(data.agent_iva_amt || 0, 2));
    this.addFormStep5.controls.iva_percent.patchValue(this.numberUptoNDecimal(data.iva_percent || 0, 3));
    this.addFormStep5.controls.add_iva_to_cc.patchValue(data.add_iva_to_cc || 0);
    this.addFormStep5.controls.add_iva_to_pc.patchValue(data.add_iva_to_pc || 0);
    this.addFormStep5.controls.add_iva_to_ac.patchValue(data.add_iva_to_ac || 0);
    let index;
    if (this.isByOffer) {
      index = data.property.property_offer_payment.findIndex(x => x.random_id == data.offer_id);
    }
    this.addFormStep5.controls.bank_id.patchValue(this.isByOffer ? data.property.property_offer_payment[index].bank_id || 0 : data.bank_id || 0);
    this.addFormStep5.controls.payment_received_by.patchValue(this.isByOffer ? (data.property.property_offer_payment[index].account_type == 1 ? 1 : '0') : data.payment_received_by.toString() || '0');

    // this.addFormStep5.controls.deal_commission_agents.patchValue(data.deal_commission_agents);
    const control1 = this.addFormStep5.get('deal_commission_agents') as FormArray;
    //console.log(control1);
    if (data.deal_commission_agents && data.deal_commission_agents.length > 0) {
      for (let index = 0; index < data.deal_commission_agents.length; index++) {
        const x = data.deal_commission_agents[index].broker;
        //console.log(control1);
        if (index === 0 && x) {
          control1.push(this.formBuilder.group(x));
        } else {
          this.addAgent('');
        }
      }
    } else {
      this.addAgent('');
    }

    const control = this.addFormStep5.get('collection_agent_banks') as FormArray;
    if (data.collection_agent_banks) {
      data.collection_agent_banks.forEach(x => {
        control.push(this.formBuilder.group(x));
      });
    }

    this.setCommission(data);
    this.addFormStep5.controls.step.patchValue(5);
  }

  setCommission(data) {
    this.model.collection_commissions = [];
    const payment_choices = this.addFormStep4.get('payment_choices').value;
    const control1 = this.addFormStep5.get('collection_commissions') as FormArray;
    this.ccsum = 0;
    this.pcsum = 0;
    this.acsum = 0;
    if (payment_choices) {
      for (let index = 0; index < payment_choices.length; index++) {
        const element = payment_choices[index];
        const element1 = data.collection_commissions[index];
        const obj = {};
        obj['id'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].id : '';
        obj['pc_id'] = element['payment_choice_id'];   // payment choice dropdown id
        obj['name'] = element['name'];
        obj['category_name'] = element['category_name'];
        obj['date'] = element['date'];
        obj['payment_amount'] = element['amount'];
        obj['payment_choice_id'] = element['id'];
        obj['add_collection_commission'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].add_collection_commission : 0;
        obj['percent'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].percent : 0;
        obj['amount'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].amount : 0.00;

        obj['add_purchase_commission'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].add_purchase_commission : 0;
        obj['purchase_comm_amount'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].purchase_comm_amount : 0;

        obj['add_agent_commission'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].add_agent_commission : 0;
        obj['agent_comm_amount'] = data.collection_commissions.length > 0 &&
          data.collection_commissions[index] ? data.collection_commissions[index].agent_comm_amount : 0;

        if (control1.length != payment_choices.length) {
          control1.push(this.formBuilder.group(obj));
        }
        this.model.collection_commissions.push(obj);
        // console.log('obj', obj['id'])
        this.ccsum = parseFloat(this.ccsum) + (obj['amount'] && obj['add_collection_commission'] ? parseFloat(obj['amount']) : 0.00);
        this.pcsum = parseFloat(this.pcsum) + (obj['purchase_comm_amount'] && obj['add_purchase_commission'] ? parseFloat(obj['purchase_comm_amount']) : 0.00);
        this.acsum = parseFloat(this.acsum) + (obj['agent_comm_amount'] && obj['add_agent_commission'] ? parseFloat(obj['agent_comm_amount']) : 0.00);
      }
    }
  }

  setFolders(data: any) {
    this.payment_folder_id = data.payment_folder_id;
    this.collectionFolders = data['collection_folders'];
  }

  setTab(tab: any) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.movingBackCanResetInformationEnteredOnCurrentTab'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.tab = tab;
        if (tab == 4) {
          this.edit_reminder = false;
          this.isShown = this.addFormStep4.controls['email'].value ? true : false;
        }
      }
    });
  }

  showSearchBox() {
    this.showSearch = true;
  }

  onCountryChange(e) {
    this.building.dev_countrycode = e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  searchBuilding(keyword: string) {
    if (!keyword) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterSomeText'), this.translate.instant('swal.error'));
      return false;
    }

    this.showBuilding = false;
    this.buildingLoading = true;
    this.isCommercialOffer = false;

    const input = new FormData();
    input.append('keyword', keyword);
    input.append('status', '1');  // means only approved projects

    this.adminService.postDataApi('searchBuilding', input)
      .subscribe(
        success => {
          this.searchedBuildings = success['data'];
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

  searchOffer(id: string) {
    if (!id) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterSomeText'), this.translate.instant('swal.error'));
      return false;
    }

    this.showBuilding = false;
    this.buildingLoading = true;

    const input = new FormData();
    input.append('id', id);
    //input.append('status', '1');  // means only approved projects
    this.model.building = undefined;
    this.model.building_towers = undefined;
    this.model.floor_num = undefined;
    this.model.name = undefined;
    this.model.availabilityStatusId = undefined;
    this.model.building_configuration_id = undefined;
    this.model.building_configuration = undefined;
    this.model.property_offer_payment_id = undefined;
    this.addFormStep1.reset()
    this.adminService.postDataApi('getPropertyOfferSearch', { id: id })
      .subscribe(
        success => {
          this.searchedOffers = success['data'];
          // this.searchedBuildings = success['data'];
          this.parameter.offerCount = success['data'].length;
          if (this.parameter.offerCount === 0) {
            this.showText = true;
          }
          this.buildingLoading = false;
        },
        error => {
          this.buildingLoading = true;
        }
      );
  }

  getPage(page: number) {
    this.parameter.page = page;
  }

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
    this.buildingName = '';
    this.offerId = '';
  }

  getBuildingIndex(i: number, item) {
    (this.searchedBuildings || []).forEach(e => {
      e.selected = false;
    });
    const searchindex = (this.parameter.page - 1) * 4 + i;
    this.searchedBuildings ? this.searchedBuildings[searchindex].selected = true : null;
    if (this.isCommercialOffer && item) {
      this.offer_id = item.ramdom_id;
      this.isByOffer = item.ramdom_id;
      this.getOfferPropertyDetail(this.offer_id);
    }
  }

  getofferIndex(i: number) {
    (this.searchedOffers || []).forEach(e => {
      e.selected = false;
    });
    const searchindex = (this.parameter.page - 1) * 4 + i;
    this.searchedOffers[searchindex].selected = true;
  }

  setBuildingId(building: any) {
    this.selectedBuilding = building;
    (building.property_offer_payment || []).forEach(e => {
      this.model.property_offer_payment_id = e.id;
    });
    this.building.id = building.id;
    this.model.building_id = building.id;
    this.model.building_towers = building.building_towers;
  }


  setTower(building_towers_id: string) {
    for (let index = 0; index < this.searchedBuildings.length; index++) {
      if (this.searchedBuildings[index].id == this.model.building_id) {
        const bt = this.searchedBuildings[index].building_towers;
        for (let i = 0; i < bt.length; i++) {
          if (bt[i].id == building_towers_id) {
            this.model.building_towers = bt[i];
          }
        }
      }
    }
  }

  buildingRequest() {

    if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant(
        'message.error.pleaseFillCompleteDevloperInformation'), this.translate.instant('swal.error'));
      return false;
    }

    if (!this.latitude && !this.longitude) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant(
        'message.error.pleaseSelectLocationFromTheDropdownList'), this.translate.instant('swal.error'));
      return false;
    }

    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    if (!this.building.lat || !this.building.lng) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectLocation'), this.translate.instant('swal.error'));
      return false;
    }
    this.spinner.show();
    this.adminService.postDataApi('buildingRequest', this.building)
      .subscribe(
        success => {
          this.spinner.hide();
          this.toastr.clear();
          this.toastr.success(this.translate.instant(
            'message.success.dataCollectorWillLinkPropertyToBuilding'), this.translate.instant('swal.success'));
        }, error => {
          this.spinner.hide();
        }
      );
  }


  getProperties($event) {
    this.properties = [];
    $event.stopPropagation();
    this.model.floor_num = $event.target.value;
    if (!this.model.building_id) {

      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectBuilding'), this.translate.instant('swal.error'));
      return;
    } else if (!this.model.building_towers.id) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectFloor'), this.translate.instant('swal.error'));
      return;
    } else if (!this.model.floor_num) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseChooseFloor'), this.translate.instant('swal.error'));
      return;
    }
    const input = {
      building_id: this.model.building_id,
      tower_id: this.model.building_towers_id,
      floor_num: this.model.floor_num
    };
    this.adminService.postDataApi('getProperties', input)
      .subscribe(
        success => {
          success.data.unshift({ 'name': this.translate.instant('message.error.pleaseChooseApartment') });
          this.properties = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  setDealType(id: number) {
    this.model.deal_type_id = id;
  }

  setPropertyId(property_id) {
    this.model.property_id = property_id;
    this.model.property_id = this.addFormStep1.get('property_id').value.id;
    this.properties.map((p: any) => {
      if (p.id == this.model.property_id) {
        this.configurations = p.building.configurations;
        this.model.deal_price = p.min_price;
        this.model.building_configuration_id = p.building_configuration.id;
        this.addFormStep4.controls.deal_price.patchValue(p.min_price);
        this.addFormStep4.controls.final_price.patchValue(p.min_price);
        if (p.for_sale == 1) {
          this.setAvailableStatus(0);
        }
        if (p.for_rent == 1) {
          this.setAvailableStatus(1);
        }
        this.addFormStep5.controls.comm_total_commission.patchValue(p.total_commision ? p.total_commision : 0);
        this.addFormStep5.controls.comm_total_commission_amount.patchValue(p.total_commision ? (p.total_commision * p.min_price) / 100 : 0);
        this.addFormStep5.controls.is_commission_sale_enabled.patchValue(p.is_commission_sale_enabled ? 1 : 0);
        this.addFormStep5.controls.payment_received_by.patchValue(p.payment_received_by ? '1' : '0');
        this.addFormStep5.controls.comm_shared_commission.patchValue(p.broker_commision ? p.broker_commision : 0);
        this.addFormStep5.controls.comm_shared_commission_amount.patchValue(p.broker_commision ? (p.broker_commision * p.min_price) / 100 : 0);
      }
    });
    this.isAgencyBank = this.model.payment_received_by == 1 ? true : false;
    this.getBanks(this.model.property_id);
  }

  setConfiguration(con: Configuration) {
    this.model.building_configuration_id = con.id;
  }

  addAgentBank($event) {
    $event.stopPropagation();
    this.collectionAgentBanks.push(this.newBank());
  }

  get collectionAgentBanks(): FormArray {
    return this.addFormStep5.get('collection_agent_banks') as FormArray;
  }

  removeAgentBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.collectionAgentBanks.removeAt(i);
    if (item.value.id) {
      this.adminService.postDataApi('deleteAgentBank', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  addSellerBank($event) {
    $event.stopPropagation();
    this.collectionSellerBanks.push(this.newBank());
  }

  get collectionSellerBanks(): FormArray {
    return this.addFormStep2.get('collection_seller_banks') as FormArray;
  }

  removeSellerBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.collectionSellerBanks.removeAt(i);
    if (item.value.id) {
      this.adminService.postDataApi('deleteSellerBank', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  addSellerRepBank($event) {
    $event.stopPropagation();
    this.collectionSellerRepBanks.push(this.newBank());
  }

  get collectionSellerRepBanks(): FormArray {
    return this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
  }

  removeSellerRepBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.collectionSellerRepBanks.removeAt(i);
    if (item.value.id) {
      this.adminService.postDataApi('deleteSellerRefBank', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  addBuyerRepBank($event) {
    $event.stopPropagation();
    this.collectionBuyerRepBanks.push(this.newBank());
  }

  get collectionBuyerRepBanks(): FormArray {
    return this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
  }

  removeBuyerRepBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.collectionBuyerRepBanks.removeAt(i);
    if (item.value.id) {
      this.adminService.postDataApi('deleteBuyerRefBank', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  // buyer bank
  addBuyerBank($event) {
    $event.stopPropagation();
    this.collectionBuyerBanks.push(this.newBank());
  }

  get collectionBuyerBanks(): FormArray {
    return this.addFormStep3.get('collection_buyer_banks') as FormArray;
  }

  newBank(): FormGroup {
    return this.formBuilder.group({
      // bank_name: ['', [Validators.required]],
      // account_number: ['', [Validators.required]],
      // swift: ['', [Validators.required]],
      // currency_id: ['', [Validators.required]]
      bank_name: [''],
      account_number: [''],
      swift: [''],
      currency_id: ['']
    });
  }

  removeBuyerBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.collectionBuyerBanks.removeAt(i);
    if (item.value.id) {
      this.adminService.postDataApi('deleteBuyerBank', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }
  // end buyer bank

  addPaymentChoice($event) {
    this.currentPaymentChoiceId = $event.target.value;
    $event.stopPropagation();
    this.newPaymentChoice();
  }

  get getPaymentChoices(): FormArray {
    return this.addFormStep4.get('payment_choices') as FormArray;
  }

  newPaymentChoice() {
    if (this.currentPaymentChoiceId != 5) {
      let name = ''; let payment_choice = {};
      this.paymentChoices.map(r => {
        if (r.id == this.currentPaymentChoiceId) {
          name = r.name;
          payment_choice = {
            name: r.name
          };
        }
      });
      const formBuilder = this.formBuilder.group({
        payment_choice_id: [this.currentPaymentChoiceId, [Validators.required]],
        payment_choice: [payment_choice],
        name: [name, [Validators.required]],
        category_name: [name, [Validators.required]],
        date: ['', [Validators.required]],
        percent: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        calc_payment_amount: ['']
      });
      const c = this.getPaymentChoices.push(formBuilder);
    } else {
      this.showMonthlyInput = true;
    }
    this.selectedPaymentChoice.nativeElement.value = '';
  }

  findMonthlyInstallments() {
    this.num_of_months = this.addFormStep4.get('num_of_months').value;
    const monthly_amount = this.addFormStep4.get('monthly_amount').value;
    const monthly_date = this.addFormStep4.get('monthly_date').value;

    // calculating sum of all payment concepts
    const sum = this.addFormStep4.get('sum_of_concepts').value;
    const v = parseFloat(sum) + parseFloat((this.num_of_months * monthly_amount).toFixed(2));

    if (!this.num_of_months || !monthly_amount || !monthly_date) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterMonthlyData'), this.translate.instant('swal.error'));
      return false;
    }
    for (let index = 0; index < this.num_of_months; index++) {
      this.getPaymentChoices.push(this.newMonthlyPaymentsChoice(index));
    }
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(v, 2));

    this.addFormStep4.get('num_of_months').patchValue(null);
    this.addFormStep4.get('monthly_amount').patchValue(null);
    this.addFormStep4.get('monthly_date').patchValue(null);
  }

  newMonthlyPaymentsChoice(index: number): FormGroup {
    const num_of_months = this.addFormStep4.get('num_of_months').value;
    let monthly_amount = this.addFormStep4.get('monthly_amount').value;
    let monthly_date = this.addFormStep4.get('monthly_date').value;
    const price = this.addFormStep4.get('final_price').value;
    const percent = this.numberUptoNDecimal((monthly_amount * 100) / price, 2);
    monthly_amount = this.numberUptoNDecimal(monthly_amount, 2);
    let name = ''; let payment_choice = {};
    monthly_date = moment(monthly_date).add(index, 'months').toDate();
    this.paymentChoices.map(r => {
      if (r.id == 5) {
        name = r.name + ' ' + (index + 1);
        payment_choice = {
          name: r.name
        };
      }
    });
    return this.formBuilder.group({
      payment_choice_id: [this.currentPaymentChoiceId, [Validators.required]],
      payment_choice: [payment_choice],
      name: [name, [Validators.required]],
      category_name: [name, [Validators.required]],
      date: [monthly_date, [Validators.required]],
      percent: [percent, [Validators.required]],
      amount: [monthly_amount, [Validators.required]]
    });
  }

  removePaymentChoicePopup(item: any, i: number) {
    if (item.value.calc_payment_amount) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.cannotRemoveAsPaymentApplied'), this.translate.instant('swal.error'));
      return;
    } else {
      swal({
        html: this.translate.instant('message.error.areYouSure') + '<br>' +
          this.translate.instant('message.error.wantToRemovePaymentConcept'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.removePaymentChoice(item, i);
        }
      });
    }
  }

  removePaymentChoice(item: any, i: number) {
    this.getPaymentChoices.removeAt(i);
    if (item.value.id) {
      this.adminService.postDataApi('deletePaymentChoice', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  // folder
  addFolder() {
    const input = {
      step: 6,
    };
    const folder_docs = {
      display_name: '',
      name: ''
    };
    if (this.mode === 'add') {
      this.collectionFolders.push({ name: this.folderName, folder_docs: [] });
    } else if (this.mode === 'edit') {
      if (this.selectedFolder && this.selectedFolder.id) {
        this.editFolderName(this.selectedFolder);
      } else {
        this.collectionFolders[this.folderIndex].name = this.folderName;
      }
    }
    this.closeFolderModal();
  }

  closeFolderModal() {
    this.folderName = '';
    this.folderModalClose.nativeElement.click();
  }

  showFiles() {

  }

  openAddFolder(mode: string, folder, index: number) {
    this.mode = mode;
    if (folder) {
      this.folderIndex = index;
      this.selectedFolder = folder;
      this.folderName = folder.name;
    }
    this.folderModalOpen.nativeElement.click();
  }

  editFolderName(folder) {
    this.collectionFolders[this.folderIndex]['name'] = this.folderName;
    this.adminService.postDataApi('updateCollectionFolder', { id: this.selectedFolder.id, name: this.folderName })
      .subscribe(
        success => {
          // this.collectionFolders[this.folderIndex]['name'] = this.folderName;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  modelOpenFun(folder, index: number) {
    this.folderIndex = index;
    this.folderName = folder.name;
    this.docs = folder.folder_docs;
    this.folderId = folder.id;
    this.docsModalOpen.nativeElement.click();
  }

  closeModal() {
    this.docsModalClose.nativeElement.click();
  }

  onSelectFile(files) {
    this.parameter.loading = true;
    this.commonService.saveAttachment(files[0]).subscribe(
      success => {
        this.parameter.loading = false;
        this.docFile = success['data'].name;
      }, error => {
        this.parameter.loading = false;
      }
    );
  }

  saveCollectionFolders() {
    this.spinner.show();
    this.adminService.postDataApi('addCollection', { id: this.model.id, step: 6, 'collection_folders': this.collectionFolders })
      .subscribe(
        success => {
          this.spinner.hide();
          // swal({
          //   html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
          // });
          this.router.navigate(['/dashboard/collections/view-collections']);
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addDocs() {
    if (!this.docsName) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuName'), this.translate.instant('swal.error'));
      return;
    }
    if (!this.docFile) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));
      return;
    }
    this.docs.push({ name: this.docsName, display_name: this.docFile });
    this.docFile = ''; this.docsName = '';
    this.docsFile.nativeElement.value = '';
  }

  deleteDocsPopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteDocs'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteDocs(item, index);
      }
    });
  }

  deleteDocs(item: any, i: number) {
    this.collectionFolders[this.folderIndex].folder_docs.splice(i, 1);
    if (item.id) {
      this.adminService.postDataApi('deleteFolderDoc', { id: item.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  deleteFolderPopup(item: any, index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteFolder'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteFolder(item, index);
      }
    });
  }

  deleteFolder(item, index: number) {
    this.collectionFolders.splice(index, 1);
    if (item.id) {
      this.adminService.postDataApi('deleteCollectionFolder', { id: item.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  saveFolder($event) {
    $event.stopPropagation();
    this.folders.push(this.newFolder());
  }

  get folders(): FormArray {
    return this.addFormStep6.get('collection_folders') as FormArray;
  }

  newFolder(): FormGroup {
    return this.formBuilder.group({
      name: [this.folderName, [Validators.required]],
      folder_docs: this.formBuilder.array([])
    });
  }

  removeFolder($event: Event, i: number) {
    $event.stopPropagation();
    this.collectionBuyerBanks.removeAt(i);
  }
  // end folder

  addDocument($event) {
    $event.stopPropagation();
    this.folderDocs.push(this.newDocx());
  }

  get folderDocs(): FormArray {
    const collFolders = this.addFormStep6.get('collection_folders') as FormArray;
    return collFolders.get('folder_docs') as FormArray;
  }

  newDocx(): FormGroup {
    return this.formBuilder.group({
      display_name: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  removeDocs($event: Event, i: number) {
    $event.stopPropagation();
    this.collectionBuyerBanks.removeAt(i);
  }
  // end docx

  addAgent($event) {
    this.agents.push(this.newAgent());
  }

  get agents(): FormArray {
    return this.addFormStep5.get('deal_commission_agents') as FormArray;
  }

  newAgent(): FormGroup {
    return this.formBuilder.group({
      broker_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      first_surname: ['', [Validators.required]],
      second_surname: ['', [Validators.required]],
      fed_tax_payer_reg: ['']
    });
  }

  onSelect(event, payment_choice) {
    // console.log(event);
    let count = 0;
    const control1 = this.addFormStep4.get('payment_choices') as FormArray;
    if (control1.value && payment_choice) {
      control1.value.forEach(function (result, index) {
        if (result.payment_choice.id == payment_choice.value.payment_choice.id && payment_choice.value.payment_choice.name.includes('Monthly Installment')) {
          result.date = moment(event).add(count, 'months').toDate();
          count = count + 1;
        }
      });
      this.addFormStep4.controls.payment_choices.patchValue(control1.value);
    }
  }

  onSelectDealPurchaseDate($event){
    this.addFormStep4.get('delivery_date').setValue(moment($event).add(3, 'years').format('DD/MM/YYYY'));
  }

  getBothBroker(keyword: string) {
    this.spinner.show();
    const input = { keyword: '' };
    input.keyword = keyword;
    this.adminService.postDataApi('getBothBroker', input).subscribe(r => {
      this.spinner.hide();
      if (keyword === '') { this.linkExtBrokerModal.nativeElement.click(); }
      this.allExtBrokers = r['data'];
    }, error => {
      this.spinner.hide();

      this.toastr.clear();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  setAgent(item) {
    const ftpr = this.addFormStep5.get('deal_commission_agents').value;
    const dca = [{
      broker_id: item.id,
      name: item.name,
      fed_tax_payer_reg: ftpr.length > 0 ? ftpr[0].fed_tax_payer_reg : ''
    }];
    this.addFormStep5.controls.deal_commission_agents.patchValue(dca);
    this.closeExtBrokerModal.nativeElement.click();
  }

  unsetAgent() {
    delete this.addFormStep5.value['deal_commission_agents'];
    delete this.addFormStep5.value['collection_agent_banks'];
    delete this.addFormStep5.value.deal_commission_agents;
    const s = this.addFormStep5.get('deal_commission_agents').value;
    this.closeExtBrokerModal.nativeElement.click();
  }

  getAllSellers(keyword: string) {
    this.spinner.show();
    const input = { name: '', user_type: 0 };
    input.name = keyword ? keyword : '';
    if (this.tab == 2 && this.model.seller_type) {
      input.user_type = this.model.seller_type;
    }
    if (this.tab == 3 && this.model.buyer_type) {
      input.user_type = this.model.buyer_type;
    }
    this.adminService.postDataApi('getAllBuyers', input).subscribe(r => {
      this.spinner.hide();
      if (keyword === '') {
        this.linkUserModal.nativeElement.click();
      }
      this.allUsers = r['data'];
    }, error => {
      this.spinner.hide();
      this.toastr.clear();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));
    });
  }

  setSeller(item) {
    if (this.tab == 2) {
      // this.addFormStep2.reset();
      // this.initFormStep2();
      this.setValue('seller_type', this.model.seller_type);
      this.addFormStep2.controls.seller_type.patchValue(this.model.seller_type);
      this.model.seller_id = item.id;
      this.model.seller = item;

      // seller as a person
      if (this.model.seller_type == '1') {
        this.addFormStep2.controls.seller_id.patchValue(item.id);
        this.addFormStep2.controls.seller_name.patchValue(item.name || '');
        this.addFormStep2.controls.seller_email.patchValue(item.email || '');
        this.addFormStep2.controls.seller_phone.patchValue(item.phone || '');
      }

      // seller as a legal entity
      if (this.model.seller_type == '2') {
        this.addFormStep2.controls.seller_legal_entity_id.patchValue(item.id);
        this.addFormStep2.controls.seller_name.patchValue(item.comm_name);
        this.addFormStep2.controls.seller_legal_name.patchValue(item.legal_name);
        this.addFormStep2.controls.seller_fed_tax.patchValue(item.fed_tax_pay);
        this.addFormStep2.controls.seller_phone.patchValue(item.phone);
        this.addFormStep2.controls.seller_address.patchValue(item.address);
        this.addFormStep2.controls.seller_leg_rep_name.patchValue(item.legal_reps ? item.legal_reps.name : '');
        this.addFormStep2.controls.seller_leg_rep_phone.patchValue(item.legal_reps ? item.legal_reps.phone : '');
        this.addFormStep2.controls.seller_leg_rep_email.patchValue(item.legal_reps ? item.legal_reps.email : '');
        this.addFormStep2.controls.seller_leg_rep_comp.patchValue('');
        this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(item.legal_reps ? item.legal_reps.fed_tax_pay : '');
        let control = new FormArray([]);
        control = this.addFormStep2.get('collection_seller_banks') as FormArray;
        if (item.legal_entity_banks) {
          item.legal_entity_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control.push(this.formBuilder.group(x));
          });
        }
        let control1 = new FormArray([]);
        control1 = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
        if (item.legal_reps && item.legal_reps.legal_rep_banks) {
          item.legal_reps.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control1.push(this.formBuilder.group(x));
          });
        }
      }

      // seller as a developer
      if (this.model.seller_type == '3') {
        this.addFormStep2.controls.seller_id.patchValue(item.id);
        this.addFormStep2.controls.seller_legal_name.patchValue(item.developer_company || '');
        this.addFormStep2.controls.seller_name.patchValue(item.name || '');
        this.addFormStep2.controls.seller_fed_tax.patchValue(item.fed_tax_pay ? item.fed_tax_pay : '');
        this.addFormStep2.controls.seller_phone.patchValue(item.phone ? item.phone : '');
        this.addFormStep2.controls.seller_address.patchValue(item.developer_address ? item.developer_address : '');
        this.addFormStep2.controls.seller_leg_rep_name.patchValue(item.legal_representative ? item.legal_representative.name : '');
        this.addFormStep2.controls.seller_leg_rep_phone.patchValue(item.legal_representative ? item.legal_representative.phone : '');
        this.addFormStep2.controls.seller_leg_rep_email.patchValue(item.legal_representative ? item.legal_representative.email : '');
        this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(
          item.legal_representative ? item.legal_representative.fed_tax_pay : '');
        const control = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
        if (item.legal_representative && item.legal_representative.legal_rep_banks) {
          item.legal_representative.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control.push(this.formBuilder.group(x));
          });
        }
        const control1 = this.addFormStep2.get('collection_seller_banks') as FormArray;
        if (item.legal_rep_banks) {
          item.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control1.push(this.formBuilder.group(x));
          });
        }
      }
    } else {
      // this.addFormStep3.reset();
      // this.initFormStep3();
      this.setValue('buyer_type', this.model.buyer_type);
      this.addFormStep3.controls.buyer_type.patchValue(this.model.buyer_type);
      this.model.buyer_id = item.id;
      this.model.buyer = item;
      // buyer as a person
      if (this.model.buyer_type == '1') {
        this.addFormStep3.controls.buyer_id.patchValue(item.id);
        this.addFormStep3.controls.buyer_name.patchValue(item.name || '');
        this.addFormStep3.controls.buyer_email.patchValue(item.email || '');
        this.addFormStep3.controls.buyer_phone.patchValue(item.phone || '');
      }

      // buyer as a legal entity
      if (this.model.buyer_type == '2') {
        this.addFormStep3.controls.buyer_legal_entity_id.patchValue(item.id);
        this.addFormStep3.controls.buyer_name.patchValue(item.comm_name);
        this.addFormStep3.controls.buyer_legal_name.patchValue(item.legal_name);
        this.addFormStep3.controls.buyer_fed_tax.patchValue(item.fed_tax_pay);
        this.addFormStep3.controls.buyer_phone.patchValue(item.phone);
        this.addFormStep3.controls.buyer_address.patchValue(item.address);
        this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.legal_reps ? item.legal_reps.name : '');
        this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.legal_reps ? item.legal_reps.phone : '');
        this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.legal_reps ? item.legal_reps.email : '');
        this.addFormStep3.controls.buyer_leg_rep_comp.patchValue('');
        this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(item.legal_reps ? item.legal_reps.fed_tax_pay : '');
        let control = new FormArray([]);
        control = this.addFormStep3.get('collection_buyer_banks') as FormArray;
        if (item.legal_entity_banks) {
          item.legal_entity_banks.forEach(x => {
            control.push(this.formBuilder.group(x));
          });
        }
        let control1 = new FormArray([]);
        control1 = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
        if (item.legal_reps && item.legal_reps.legal_rep_banks) {
          item.legal_reps.legal_rep_banks.forEach(x => {
            control1.push(this.formBuilder.group(x));
          });
        }
      }

      // buyer as a developer
      if (this.model.buyer_type == '3') {
        this.addFormStep3.controls.buyer_id.patchValue(item.id);
        this.addFormStep3.controls.buyer_name.patchValue(item.name || '');
        this.addFormStep3.controls.buyer_legal_name.patchValue(item.developer_company || '');
        this.addFormStep3.controls.buyer_fed_tax.patchValue(item.fed_tax_pay || '');
        this.addFormStep3.controls.buyer_phone.patchValue(item.phone || '');
        this.addFormStep3.controls.buyer_address.patchValue(item.developer_address || '');
        this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.legal_representative ? item.legal_representative.name : '');
        this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.legal_representative ? item.legal_representative.phone : '');
        this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.legal_representative ? item.legal_representative.email : '');
        this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(item.legal_representative ? item.legal_representative.fed_tax_pay : '');
        const control = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
        if (item.legal_representative && item.legal_representative.legal_rep_banks) {
          item.legal_representative.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control.push(this.formBuilder.group(x));
          });
        }
        const control1 = this.addFormStep3.get('collection_buyer_banks') as FormArray;
        if (item.legal_rep_banks) {
          item.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control1.push(this.formBuilder.group(x));
          });
        }
      }
    }
    this.closeLinkUserModal.nativeElement.click();
  }

  unsetSeller(item) {
    if (this.tab == 2) {
      this.addFormStep2.reset();
      this.model.seller_id = '';
      this.model.seller = new Seller();
    } else {
      this.addFormStep3.reset();
      this.model.buyer_id = '';
      this.model.buyer = new Seller();
    }
    this.closeLinkUserModal.nativeElement.click();
  }

  getSozuAmount(percent: number) {
    const price = this.addFormStep4.get('final_price').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const amount = this.numberUptoNDecimal((percent * price) / 100, 2);
    this.addFormStep5.controls['comm_total_commission_amount'].patchValue(amount);
  }

  getAgentAmount(percent: number) {
    const price = this.addFormStep4.get('final_price').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const amount = this.numberUptoNDecimal((percent * price) / 100, 2);
    this.addFormStep5.controls['comm_shared_commission_amount'].patchValue(amount);
  }

  getIVAAmount(percent: number, key: string, key2: string) {
    const price = this.addFormStep5.get(key).value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const amount = this.numberUptoNDecimal((percent * price) / 100, 2);
    this.addFormStep5.controls[key2].patchValue(amount);
  }


  getSozuIVAAmount(percent: number) {
    const price = this.addFormStep4.get('comm_total_commission_amount').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const amount = this.numberUptoNDecimal((percent * price) / 100, 2);
    this.addFormStep5.controls['sozu_iva_amt'].patchValue(amount);
  }

  getAgentIVAAmount(percent: number) {
    const price = this.addFormStep4.get('comm_shared_commission_amount').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const amount = this.numberUptoNDecimal((percent * price) / 100, 2);
    this.addFormStep5.controls['agent_iva_amt'].patchValue(amount);
  }
  getAmount(index: number) {
    const price = this.addFormStep4.get('final_price').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const pcArray: Array<any> = this.addFormStep4.get('payment_choices').value;
    const percent = pcArray[index].percent;
    const amount = this.numberUptoNDecimal((percent * price) / 100, 2);
    pcArray[index].amount = amount;
    // this.addFormStep4.controls['payment_choices'].patchValue(pcArray);
    this.addFormStep4.controls.payment_choices['controls'][index]['controls'].amount.patchValue(amount);

    // calculating sum of all payment concepts
    const sum_of_concepts = pcArray.reduce(function (a, v) {
      return a + parseFloat(v['amount']);
    }, 0);
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(sum_of_concepts, 2));
  }

  getPercentage(index: number) {
    const price = this.addFormStep4.get('final_price').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const pcArray: Array<any> = this.addFormStep4.get('payment_choices').value;
    const amount: any = this.numberUptoNDecimal(pcArray[index].amount, 2);
    const percent: any = this.numberUptoNDecimal((amount * 100) / price, 2);
    pcArray[index].amount = amount;
    this.addFormStep4.controls.payment_choices['controls'][index]['controls'].percent.patchValue(percent);

    // calculating sum of all payment concepts
    const sum_of_concepts = pcArray.reduce(function (a, v) {
      return a + parseFloat(v['amount']);
    }, 0);
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoNDecimal(sum_of_concepts, 2));
  }

  setCollectionComm(add_collection_commission: any, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne && (installOne.name == pcArray[index].name)) {
      const sta = add_collection_commission;
      for (let i = 0; i < pcArray.length; i++) {
        const e = pcArray[i];
        if (e.name.includes('Monthly Installment')) {
          e.add_collection_commission = sta;
          installOne.add_collection_commission = sta;
        }
      }
    }
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getCollAmount(percent: number, index: number, payment_amount: number) {
    const amount = this.numberUptoNDecimal((percent * payment_amount) / 100, 2);
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    pcArray[index].amount = amount;
    // const installOne = pcArray.find(r => r.pc_id == 5);
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    this.ccsum = 0;
    this.pcsum = 0;
    this.acsum = 0;
    if (installOne && (installOne.name === pcArray[index].name)) {
      pcArray.map(e => {
        // if (e.pc_id == 5) {
        if (e.name.includes('Monthly Installment')) {
          e.amount = amount;
          e.percent = percent;
        }
      });
    }
    pcArray.map(e => {
      this.ccsum = parseFloat(this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
      this.pcsum = parseFloat(this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
      this.acsum = parseFloat(this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
    });
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getCollPercentage(amount: number, index: number, payment_amount: number) {
    const pcArray = this.addFormStep5.get('collection_commissions').value;
    const percent = this.numberUptoNDecimal((amount * 100) / payment_amount, 2);
    pcArray[index].percent = percent;
    // const installOne = pcArray.find(r => r.pc_id == 5);
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    this.ccsum = 0;
    this.pcsum = 0;
    this.acsum = 0;
    if (installOne && (installOne.name === pcArray[index].name)) {
      pcArray.map(e => {
        // if (e.pc_id == 5) {
        if (e.name.includes('Monthly Installment')) {
          e.amount = amount;
          e.percent = percent;
        }
      });
    }
    pcArray.map(e => {
      this.ccsum = parseFloat(this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
      this.pcsum = parseFloat(this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
      this.acsum = parseFloat(this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
    });
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  setPurchaseComm(add_purchase_commission: any, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    this.ccsum = 0;
    this.pcsum = 0;
    this.acsum = 0;
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne && (installOne.name === pcArray[index].name)) {
      const sta = add_purchase_commission;
      for (let index1 = 0; index1 < pcArray.length; index1++) {
        const e = pcArray[index1];
        if (e.name.includes('Monthly Installment')) {
          e.add_purchase_commission = sta;
          installOne.add_purchase_commission = sta;
        }
      }
    }
    pcArray.map(e => {
      this.ccsum = parseFloat(this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
      this.pcsum = parseFloat(this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
      this.acsum = parseFloat(this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
    });
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getPurcAmount(amount: number, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    pcArray[index].purchase_comm_amount = amount;
    this.ccsum = 0;
    this.pcsum = 0;
    this.acsum = 0;
    pcArray.map(e => {
      this.ccsum = parseFloat(this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
      this.pcsum = parseFloat(this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
      this.acsum = parseFloat(this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
    });
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getAgentCommAmount(amount: number, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    pcArray[index].agent_comm_amount = amount;
    this.ccsum = 0;
    this.pcsum = 0;
    this.acsum = 0;
    pcArray.map(e => {
      this.ccsum = parseFloat(this.ccsum) + e.add_collection_commission ? parseFloat(e.amount) : 0.00;
      this.pcsum = parseFloat(this.pcsum) + e.add_purchase_commission ? parseFloat(e.purchase_comm_amount) : 0.00;
      this.acsum = parseFloat(this.acsum) + e.add_agent_commission ? parseFloat(e.agent_comm_amount) : 0.00;
    });
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getMonthlyPerAndAmount() {
    const price = this.addFormStep4.get('final_price').value;
    const numOfInstallments = this.addFormStep4.get('deal_monthly_payment').value;
    const monthlyAmount = Math.round(price / numOfInstallments);
    // const monthlyAmount: any = this.currencyPipe.transform(price / numOfInstallments);
    const percent = this.numberUptoNDecimal((monthlyAmount * 100) / price, 2);
    this.addFormStep4.controls['deal_monthly_amount'].patchValue(monthlyAmount);
    this.addFormStep4.controls['deal_monthly_percentage'].patchValue(percent);
  }

  createCollection(formdata: NgForm, tab: number) {
    let callApi = true;
    this.model.step = tab;
    formdata['step'] = tab;
    if (this.model.id) {
      formdata['id'] = this.model.id;
    }
    if (this.model.step == 1) {
      if (formdata['property_id']) {
        const pid = this.isCommercialOffer ? formdata['property_id'] : formdata['property_id'].id;
        formdata['property_id'] = pid;
      }
      if (this.model.building_id) {
        formdata['building_id'] = this.model.building_id;
      }
      if (this.isCommercialOffer) {
        formdata['offer_id'] = this.offer_id;
      }
      formdata['for_sale'] = this.availabilityStatus[0].checked ? 1 : 0;
      formdata['for_rent'] = this.availabilityStatus[1].checked ? 1 : 0;
      formdata['building_configuration_id'] = this.model.building_configuration_id;

      this.addFormStep1.controls.step.patchValue(this.model.step);
      this.addFormStep1.controls.building_id.patchValue(formdata['building_id']);
      this.addFormStep1.controls.property_id.patchValue(formdata['property_id']);
      this.addFormStep1.controls.building_configuration_id.patchValue(formdata['building_configuration_id']);
      this.addFormStep1.controls.for_rent.patchValue(formdata['for_rent']);
      this.addFormStep1.controls.for_rent.patchValue(formdata['for_rent']);
      if (this.addFormStep1.valid) {
        if (!formdata['building_id']) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseSelectBuilding'), this.translate.instant('swal.error'));
          return;
        } else if (!formdata['building_towers_id']) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseSelectFloor'), this.translate.instant('swal.error'));
          return;
        } else if (!formdata['floor_num']) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseChooseFloor'), this.translate.instant('swal.error'));
          return;
        } else if (!formdata['property_id']) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseChooseApartment'), this.translate.instant('swal.error'));
          return;
        } else if (!formdata['building_configuration_id']) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseChooseApartment'), this.translate.instant('swal.error'));
          return;
        }
      } else {
        this.showError = true;
        return false;
      }
    }

    if (this.model.step == 2) {
      formdata['seller_type'] = this.model.seller_type;
      this.addFormStep2.controls.seller_type.patchValue(this.model.seller_type);
      this.addFormStep2.controls.step.patchValue(this.model.step);
      if (this.addFormStep2.valid) {
        if (this.model.seller_type == '1' || this.model.seller_type == '3') {
          if (!formdata['seller_id']) {
            this.toastr.error(this.translate.instant('message.error.pleaseChooseSeller'), this.translate.instant('swal.error'));
            return;
          }
        }

        if (this.model.seller_type != '1') {
          if (!formdata['seller_leg_rep_name'] || !formdata['seller_leg_rep_phone'] ||
            !formdata['seller_leg_rep_email'] || !formdata['seller_leg_rep_fed_tax']) {
            this.toastr.error(this.translate.instant('message.error.pleaseFillLegalRepInfo'), this.translate.instant('swal.error'));
            return;
          }
        }
      } else {
        this.showError = true;
        return;
      }
    }

    if (this.model.step == 3) {
      formdata['buyer_type'] = this.model.buyer_type;
      this.addFormStep3.controls.buyer_type.patchValue(this.model.buyer_type);
      this.addFormStep3.controls.step.patchValue(this.model.step);
      // formdata['buyer_type'] = this.model.buyer_type;
      if (this.addFormStep3.valid) {
        if (this.model.buyer_type == '1' || this.model.buyer_type == '3') {
          if (!formdata['buyer_id']) {
            this.toastr.error(this.translate.instant('message.error.pleaseChooseBuyer'), this.translate.instant('swal.error'));
            return;
          }
        }
        if (this.model.buyer_type != '1') {
          if (!formdata['buyer_leg_rep_name'] || !formdata['buyer_leg_rep_phone'] ||
            !formdata['buyer_leg_rep_email'] || !formdata['buyer_leg_rep_fed_tax']) {
            this.toastr.error(this.translate.instant('message.error.pleaseFillLegalRepInfo'), this.translate.instant('swal.error'));
            return;
          }
        }
      } else {
        this.showError = true;
        return;
      }
      formdata['property_beneficiary'] = this.property_beneficiary;
    }

    if (this.model.step == 4) {
      this.addFormStep4.controls.step.patchValue(this.model.step);
      delete this.addFormStep4.value.paymentchoice;
      if (this.addFormStep4.valid) {

        if (this.addFormStep4.controls.payment_choices.value && this.addFormStep4.controls.payment_choices.value.length < 1) {
          this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
          return;
        }
        formdata['delivery_date'] = this.addFormStep4.get('delivery_date').value;
        // converting to local
        const d = formdata['deal_purchase_date'];
        // const nd = moment(d).add(330, 'minutes').toDate();
        formdata['deal_purchase_date'] = moment(d).format('YYYY-MM-DD');
        if (!this.isCommercialOffer || this.isByOffer) {
          formdata['final_price'] = this.addFormStep4.controls.final_price.value;
        }
        else {
          formdata['final_price'] = this.addFormStep4.controls.final_price.value;
          formdata['interest_discount'] = this.addFormStep4.controls.interest_discount.value;
        }
        let paymentSum: any = 0;
        let i = 0;
        for (let index = 0; index < formdata['payment_choices'].length; index++) {
          const element = formdata['payment_choices'][index];

          if (!element.name || !element.amount || !element.date || !element.percent) {
            i = i + 1;
            const text = element.name ?
              this.translate.instant('message.error.pleaseFillAllDetailsFor') + element.name :
              this.translate.instant('message.error.pleaseFillAllDetailsFor');
            this.toastr.clear();
            this.toastr.error(text, this.translate.instant('swal.error'));
            return;
          }
          // element.date = moment(moment.utc(element.date).toDate()).local().toDate();
          element.date = moment(element.date).format('YYYY-MM-DD');

          // element.date = moment(element.date).add(330, 'minutes').toDate();
          paymentSum = parseFloat(paymentSum) + parseFloat(element.amount || 0);
        }
        // check if total sum of monthly installments is equal or greater than property price
        paymentSum = paymentSum.toFixed(2);
        const diff = formdata['final_price'] - paymentSum;
        const currency_id = this.addFormStep4.get('currency_id').value;
        if (this.addFormStep4.controls.email.value && this.addFormStep4.controls.email.value.length > 0) {
          formdata['email'] = this.addFormStep4.controls.email.value.split(',');
        }
        formdata['day'] = this.addFormStep4.controls.day.value;
        formdata['collection_account_statement_id'] = this.collection_account_statement_id;
        formdata['is_language'] = this.translate.defaultLang == 'en' ? 1 : 2;
        if ((diff >= 5 && currency_id == 78) || (diff >= 0.5 && currency_id == 124)) {
          callApi = false;
          const text = this.translate.instant('message.error.priceIsNotEqualToPaymentConceptPrice') + '<br>';
          // this.translate.instant('message.error.priceIs') + formdata['deal_price'] + '<br>' +
          // this.translate.instant('message.error.sumOfPaymentConceptIs') + paymentSum;
          swal({
            html: this.translate.instant('message.error.areYouSure') + '<br>' + text,
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: this.constant.confirmButtonColor,
            cancelButtonColor: this.constant.cancelButtonColor,
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
              // continue;
              this.callCollectionView(formdata, tab);
            } else {
              return;
            }
          });
          // return;
        }
      } else {
        this.showError = true;
        return false;
      }
    }

    if (this.model.step == 5) {
      this.addFormStep5.controls.step.patchValue(this.model.step);
      if (this.addFormStep5.valid) {
        if (!formdata['deal_commission_agents']) {
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseEnterAgent'), this.translate.instant('swal.error'));
          return;
        } else if (formdata['deal_commission_agents'] || formdata['deal_commission_agents'].length > 0) {
          let i = 0;
          // formdata['deal_commission_agents'] = formdata['deal_commission_agents'].reverse();
          for (let index = 0; index < formdata['deal_commission_agents'].length; index++) {
            const element = formdata['deal_commission_agents'][index];
            if (!element.name || !element.fed_tax_payer_reg) {
              i = i + 1;
              if (!element.name) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.pleaseEnterAgent'), this.translate.instant('swal.error'));
                return;
              }
            }
          }
          // formdata['deal_commission_agents'] = formdata['deal_commission_agents'].splice(0, 1);
        }
        // if (this.pcsum != formdata['comm_total_commission_amount']) {
        //   this.toastr.clear();
        //   this.toastr.error(this.translate.instant('message.error.pcAmountIsNotEualToSozuCommission'), this.translate.instant('swal.error'));
        //   return;
        // }
        //console.log(formdata['deal_commission_agents'])
        const collection_commissions = formdata['collection_commissions'];
        delete formdata['collection_commissions'];
        collection_commissions.forEach(element => {
          element.add_collection_commission = element.add_collection_commission ? 1 : 0;
          element.add_purchase_commission = element.add_purchase_commission ? 1 : 0;
          element.add_agent_commission = element.add_agent_commission ? 1 : 0;
          element.percent = element.percent || 0;
          element.amount = element.amount || 0;
          element.purchase_comm_amount = element.purchase_comm_amount || 0;
          element.agent_comm_amount = element.agent_comm_amount || 0;
        });
        formdata['collection_commissions'] = collection_commissions;
        formdata['is_commission_sale_enabled'] = formdata['is_commission_sale_enabled'] ? 1 : 0;
        formdata['add_iva_to_cc'] = formdata['add_iva_to_cc'] ? 1 : 0;
        formdata['add_iva_to_pc'] = formdata['add_iva_to_pc'] ? 1 : 0;
        formdata['add_iva_to_ac'] = formdata['add_iva_to_ac'] ? 1 : 0;
        formdata['payment_received_by'] = formdata['payment_received_by'];
      } else {
        this.showError = true;
        return false;
      }
    }

    if (callApi) {
      this.spinner.show();
      this.adminService.postDataApi('addCollection', formdata)
        .subscribe(
          success => {
            this.tab = tab + 1;
            this.spinner.hide();
            this.property_beneficiary = (success.data || {}).beneficiary || [];
            this.showError = false;
            this.model.id = success['data'].id;
            // if (tab != 6) { 
            //   if (tab == 4) {
            //     this.selectedPaymentChoice.nativeElement.value = '';
            //   }
            //   this.editCollection();
            // }
            if (tab == 1 && !this.is_choices && this.isCommercialOffer) {
              this.createOfferCollections(this.offer_id);
            }
            if (tab == 1 || tab == 2) {
              this.initFormStep2();
              this.patchFormStep2(success['data'], 'add');
              // }
              // if (tab == 2) {
              this.initFormStep3();
              this.patchFormStep3(success['data']);
            }
            if (tab == 4) {
              this.initFormStep4();
              this.patchFormStep4(success['data']);

              this.initFormStep5();
              if (this.selectedPaymentChoice) {
                this.selectedPaymentChoice.nativeElement.value = '';
              }
              this.patchFormStep5(success['data']);
            }
            if (tab == 6) {
              this.router.navigate(['/dashboard/collections/view-collections']);
              // swal({
              //   html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
              // });
            }
            // this.parameter.property_id = success['data'].id;
          }, error => {
            this.spinner.hide();
          }
        );
    }
  }

  callCollectionView(formdata, tab) {
    this.spinner.show();
    this.adminService.postDataApi('addCollection', formdata)
      .subscribe(
        success => {
          this.tab = tab + 1;
          this.spinner.hide();
          this.showError = false;
          this.model.id = success['data'].id;
          if (tab == 4) {
            this.initFormStep4();
            this.patchFormStep4(success['data']);

            this.initFormStep5();
            this.selectedPaymentChoice.nativeElement.value = '';
            this.patchFormStep5(success['data']);
          }
          // this.parameter.property_id = success['data'].id;
        }, error => {
          this.spinner.hide();
        });
  }

  numberUptoTwoDecimal(num: any) {
    return num ? num.toFixed(2) : 0;
  }

  numberUptoNDecimal(num: any, n: number) {
    return num ? num.toFixed(n) : 0;
  }

  getDateWRTTimezone(date: any) {
    const offset = new Date(date).getTimezoneOffset();
    if (offset < 0) {
      return moment(date).subtract(offset, 'minutes').toDate();
    } else {
      return moment(date).add(offset, 'minutes').toDate();
    }
  }

  editDocsPopup(item: any, folderIndex: number, docIndex: number) {
    this.modelForDoc.name_en = item.name;
    this.modelForDoc.id = item.id;
    this.folderId = item.collection_folder_id;
    this.oldDocName = item.name;
    this.localityOpen.nativeElement.click();
  }

  checkIfLocalitySpanishNameEntered(document) {
    const self = this;
    if (document.name === '') {
      swal({
        text: this.translate.instant('message.error.saveName'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.editDocument(document);
        }
      });
    } else {
      self.editDocument(document);
    }
  }

  closeEditModal() {
    this.localityClose.nativeElement.click();
  }

  editDocument(document) {
    let self = this;
    this.spinner.show();
    let param = {
      id: this.modelForDoc.id,
      name: this.modelForDoc.name_en
    }
    if (!this.modelForDoc.id) {
      this.docs.filter(doc => {
        if (doc.name == this.oldDocName) {
          doc.name = self.modelForDoc.name_en;
        }
      });
      self.spinner.hide();
      self.closeEditModal();
    }
    else {
      this.adminService.postDataApi('updateDocFolderName', param).subscribe(
        r => {
          self.spinner.hide();
          self.collectionFolders.filter(folder => {
            if (folder.id == self.folderId) {
              folder.folder_docs.filter(doc => {
                if (doc.id == self.modelForDoc.id) {
                  doc.name = self.modelForDoc.name_en;
                }
              });
            }
          });
          self.closeEditModal();
        }, error => {
          self.spinner.hide();
        });
    }
  }

  getCollectionDocument = (details: any): void => {
    let self = this;
    this.spinner.show();
    this.buyerDocumentationFoldersDetails = [];
    this.sellerDocumentationFoldersDetails = [];
    this.propertyDocumentationFoldersDetails = [];
    this.beneficiaryDocumentationFoldersDetails = [];
    this.tutorDocumentationFoldersDetails = [];
    const postData = {
      property_id: (details.property || {}).id,
      seller_id: details.seller_type == 2 ? (details.seller_legal_entity || {}).id : (details.seller || {}).id,
      seller_type: details.seller_type,
      buyer_id: details.buyer_type == 2 ? (details.buyer_legal_entity || {}).id : (details.buyer || {}).id,
      buyer_type: details.buyer_type
    };
    this.adminService.postDataApi('getCollectionDocument', postData).subscribe((success) => {
      this.buyerDocumentationFoldersDetails = success.buyer || [];
      this.sellerDocumentationFoldersDetails = success.seller || [];
      this.propertyDocumentationFoldersDetails = success.property || [];
      let beneficiaryDocumentation = success.beneficiary || [];
      let tutorDocumentationFolders = [];
      beneficiaryDocumentation.forEach(function (element) {
        element.beneficiary_linked_document.forEach(function (x) {
          x.beneficiary_name = null;
          x.beneficiary_firstSurname = null;
          x.beneficiary_secondSurname = null;
          if (x.document_link) {
            x.beneficiary_name = element.beneficiary_name;
            x.beneficiary_firstSurname = element.beneficiary_firstSurname
            x.beneficiary_secondSurname = element.beneficiary_secondSurname;
            self.beneficiaryDocumentationFoldersDetails.push(x);
          }
        });
        if (element.tutor && element.tutor.tutor_name) {
          tutorDocumentationFolders.push(element.tutor);
        }
      });
      tutorDocumentationFolders.forEach(function (element) {
        element.tutor_linked_document.forEach(function (x) {
          x.tutor_name = null;
          x.tutor_firstSurname = null;
          x.tutor_secondSurname = null;
          if (x.document_link) {
            x.tutor_name = element.tutor_name;
            x.tutor_firstSurname = element.tutor_firstSurname;
            x.tutor_secondSurname = element.tutor_secondSurname;
            x.beneficiary_secondSurname = element.beneficiary_secondSurname;
            self.tutorDocumentationFoldersDetails.push(x);
          }
        });
      });
      self.beneficiaryDocumentationFoldersDetails.forEach(element => {
        let count = 1;
        self.beneficiaryDocumentationFoldersDetails.forEach(item => {
          item.last = null;
          if (element.beneficiary_document.name_en == item.beneficiary_document.name_en) {
            item.beneficiary_last = '_beneficiary_' + count;
            count = count + 1;
          }
        });
      });
      self.tutorDocumentationFoldersDetails.forEach(element => {
        let count = 1;
        self.tutorDocumentationFoldersDetails.forEach(item => {
          item.tutor_last = null;
          if (element.tutor_document.name_en == item.tutor_document.name_en) {
            item.tutor_last = '_tutor_' + count;
            count = count + 1;
          }
        });
      });
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }


  //documentationId 1 for buyer , 2 for seller and 3 for property
  openBuyerSellerPropertyDocumentationModal = (documentationId: number): void => {
    this.buyerSellerPropertyDocumentationFoldersDetailsLength = 0;
    this.buyerSellerPropertyDocumentationFoldersDetails = [];
    this.buyerSellerPropertyDocumentationId = documentationId;
    if (documentationId == 1) {
      this.buyerSellerPropertyDocumentationFoldersDetailsLength = this.buyerDocumentationFoldersDetailsLength;
      this.buyerSellerPropertyDocumentationFoldersDetails = this.buyerDocumentationFoldersDetails;
    } else if (documentationId == 2) {
      this.buyerSellerPropertyDocumentationFoldersDetailsLength = this.sellerDocumentationFoldersDetailsLength;
      this.buyerSellerPropertyDocumentationFoldersDetails = this.sellerDocumentationFoldersDetails;
    } else if (documentationId == 3) {
      this.buyerSellerPropertyDocumentationFoldersDetailsLength = this.propertyDocumentationFoldersDetailsLength;
      this.buyerSellerPropertyDocumentationFoldersDetails = this.propertyDocumentationFoldersDetails;
    }
    else if (documentationId == 4) {
      this.buyerSellerPropertyDocumentationFoldersDetailsLength = this.beneficiaryDocumentationFoldersDetailsLength(this.beneficiaryDocumentationFoldersDetails);
      this.buyerSellerPropertyDocumentationFoldersDetails = this.beneficiaryDocumentationFoldersDetails;
    }
    else {
      this.buyerSellerPropertyDocumentationFoldersDetailsLength = this.beneficiaryDocumentationFoldersDetailsLength(this.tutorDocumentationFoldersDetails);
      this.buyerSellerPropertyDocumentationFoldersDetails = this.tutorDocumentationFoldersDetails;
    }
    this.buyerSellerPropertyDocumentationModalOpen.nativeElement.click();
  }

  beneficiaryDocumentationFoldersDetailsLength(beneficiary): number {
    let count = 0;
    beneficiary.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  get buyerDocumentationFoldersDetailsLength(): number {
    let count = 0;
    this.buyerDocumentationFoldersDetails.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  get sellerDocumentationFoldersDetailsLength(): number {
    let count = 0;
    this.sellerDocumentationFoldersDetails.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  get propertyDocumentationFoldersDetailsLength(): number {
    let count = 0;
    this.propertyDocumentationFoldersDetails.forEach((item) => {
      if (item.document_link) {
        count = count + 1;
      }
    });
    return count;
  }

  closeBuyerSellerPropertyDocumentationModal = (): void => {
    this.buyerSellerPropertyDocumentationModalClose.nativeElement.click();
  }

  getBanks(id) {
    this.adminService.postDataApi('getPropertyDetails', { id: id }).subscribe((success) => {
      this.bankDetails = (success || {}).data;
      this.makePaymentBankDetailsArray(true);
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  onAgencyOrSellerChange = (value): void => {
    this.isAgencyBank = value == '1' ? true : false;
    this.addFormStep5.get('bank_id').setValue('');
    this.makePaymentBankDetailsArray(false);
  }

  makePaymentBankDetailsArray = (isFirstTimeClick: boolean): void => {
    this.paymentBankDetailsArray = [];
    if (this.isAgencyBank) {
      // payment directly received by agency
      if (((this.bankDetails || {}).building || {}).agency_id) {
        // agency banks
        for (let index = 0; index < (((this.bankDetails.building || {}).agency || {}).agency_banks || []).length; index++) {
          const element = this.bankDetails.building.agency.agency_banks[index];
          element.name = 'Agency Bank | ' + element.bank_name;
          element.is_agency = 1;
          element.bank_id = element.id;
          element.legal_rep_bank_id = null;
          element.legal_name = (((this.bankDetails || {}).building || {}).agency || {}).razon_social || '';
          this.paymentBankDetailsArray.push(element);
        }

        // agency legal representative banks
        if (((this.bankDetails.building || {}).agency || {}).legal_representative) {
          for (let index = 0; index < ((this.bankDetails.building.agency.legal_representative || {}).legal_rep_banks || []).length; index++) {
            const element = this.bankDetails.building.agency.legal_representative.legal_rep_banks[index];
            element.name = 'Agency Legal Rep Bank | ' + element.bank_name;
            element.is_agency = 1;
            element.bank_id = null;
            element.legal_rep_bank_id = element.id;
            element.Legal_name = (((this.bankDetails || {}).building || {}).agency || {}).name || '';
            this.paymentBankDetailsArray.push(element);
          }
        }
      }
    } else if (!this.isAgencyBank) {
      if (this.bankDetails.selected_seller.user.developer_company || this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id) {
        ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_rep_banks || []).forEach((element, innerIndex) => {
          element.name = 'Seller Bank | ' + element.bank_name;
          element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
            this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
              + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name ? this.bankDetails.selected_seller.user.legal_entity.legal_name : '';
          this.paymentBankDetailsArray.push(element);
        });
      }
      else {
        (((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).legal_entity_banks || []).forEach((element, innerIndex) => {
          element.name = 'Seller Bank | ' + element.bank_name;
          element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
            this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
              + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name ? this.bankDetails.selected_seller.user.legal_entity.legal_name : '';
          this.paymentBankDetailsArray.push(element);
        });
      }
    }
  }
  goBack(value) {
    value ? this.router.navigate(['/dashboard/collections/view-collections', { for: 'back' }]) : this.router.navigate(['/dashboard/collections/view-collections'])
  }

  editLeadPopup(value) {
    if (value) {
      this.addFormStep4.controls['email'].enable();
      this.addFormStep4.controls['day'].enable();
      this.edit_reminder = true;
    }
    else {
      this.addFormStep4.controls['email'].disable();
      this.addFormStep4.controls['day'].disable();
      this.edit_reminder = false;
    }
  }

  addNote() {

  }

  onSelect2(data) {

  }

  modelChange(data) {

  }

  initializedDropDownSetting = (): void => {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'beneficiary_name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }

  getAllBeneficiary = (collectionDetails: any): void => {
    this.spinner.show();
    this.adminService.postDataApi('getAllBeneficiary', { user_id: (collectionDetails.buyer || {}).id }).subscribe((success) => {
      this.spinner.hide();
      this.beneficiaries_list = success.data || [];
      //swal(this.translate.instant('swal.success'), this.translate.instant('message.success.emailSend'), 'success');
    }, (error) => {
      this.spinner.hide();
      // swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  addBeneficiary = (isAddBeneficiaryDetails: boolean): void => {
    if (isAddBeneficiaryDetails) {
      // this.selectedbeneficiaries.forEach((item) => {
      //   this.property_beneficiary.push({ property_collection_id: this.property_collection_id, percentage: this.percentage, beneficiary_id: item.id });
      // });
      this.property_beneficiary.push({ property_collection_id: this.model.id, percentage: this.percentage, beneficiary_id: this.beneficiary_id });
      this.makeEditBeneficiary();
      // this.createCollection(this.addFormStep3.value, 3);
    } else {
      this.property_beneficiary.splice(this.beneficiaryIndex, 1, { property_collection_id: this.model.id, percentage: this.percentage, beneficiary_id: this.beneficiary_id });
      this.beneficiaryIndex = -1;
      this.makeEditBeneficiary();
    }
  }

  editBeneficiary = (beneficiaryDetails: any, index: number): void => {
    // this.property_collection_id = beneficiaryDetails.property_collection_id;
    this.percentage = beneficiaryDetails.percentage;
    this.beneficiary_id = beneficiaryDetails.beneficiary_id;
    this.beneficiaryIndex = index;
  }

  deleteBeneficiary = (beneficiaryDetails: any, index: number): void => {
    this.property_beneficiary.splice(index, 1);
    this.makeEditBeneficiary();
  }

  getBeneficiaryText = (beneficiaryId: any): any => {
    const data = this.beneficiaries_list.find((item) => item.id == beneficiaryId);
    if (
      data &&
      data.beneficiary_name &&
      data.beneficiary_firstSurname &&
      data.beneficiary_secondSurname
    ) {
      return (data.beneficiary_name + ' ' + data.beneficiary_firstSurname + ' ' + data.beneficiary_secondSurname);
    } else if (
      data &&
      data.beneficiary_name &&
      data.beneficiary_firstSurname
    ) {
      return (data.beneficiary_name + ' ' + data.beneficiary_firstSurname);
    } else if (
      data &&
      data.beneficiary_name &&
      data.beneficiary_secondSurname
    ) {
      return (data.beneficiary_name + ' ' + data.beneficiary_secondSurname);
    } else if (data) {
      return data.beneficiary_name;
    } else {
      return this.translate.instant('table.tr.td.NA');
    }
  }

  getTutorText = (beneficiaryId: any): any => {
    const data = this.beneficiaries_list.find((item) => item.id == beneficiaryId);
    if (((data || {}).tutor || {}).tutor_name &&
      ((data || {}).tutor || {}).tutor_firstSurname &&
      ((data || {}).tutor || {}).tutor_secondSurname) {
      return (data.tutor.tutor_name + ' ' + data.tutor.tutor_firstSurname + ' ' + data.tutor.tutor_secondSurname);
    } else if (((data || {}).tutor || {}).tutor_name &&
      ((data || {}).tutor || {}).tutor_firstSurname) {
      return (data.tutor.tutor_name + ' ' + data.tutor.tutor_firstSurname);
    } else if (((data || {}).tutor || {}).tutor_name &&
      ((data || {}).tutor || {}).tutor_secondSurname) {
      return (data.tutor.tutor_name + ' ' + data.tutor.tutor_secondSurname);
    } else if (((data || {}).tutor || {}).tutor_name) {
      return data.tutor.tutor_name;
    } else {
      return this.translate.instant('table.tr.td.NA');
    }
  }

  makeEditBeneficiary = (): void => {
    this.percentage = '';
    this.beneficiary_id = '';
    const temp_property_beneficiary = this.property_beneficiary;
    this.property_beneficiary = [];
    this.property_beneficiary = temp_property_beneficiary;
  }

  checkAlreadySelected = (beneficiaryId: number): boolean => {
    const data = this.property_beneficiary.find((item) => item.beneficiary_id == beneficiaryId);
    return data ? true : false;
  }

  toggleSearch(value) {
    this.isCommercialOffer = value.target.checked ? true : false;
    this.searchedBuildings = undefined;
    this.parameter.buildingCount = undefined
    this.searchedOffers = undefined;
    this.parameter.offerCount = undefined;
  }

  getOfferPropertyDetail(id) {
    this.spinner.show();
    this.adminService.postDataApi('getOfferById', { id: id }).subscribe(success => {
      this.model.property_offer_payment_id = id;
      this.offerDetail = success.data;
      this.parkingSpaceSale(this.offerDetail.building_id);
      this.patchFormStep1(this.offerDetail);
      this.parking_area = success.data.property_offer_payment.find(x => x.random_id == id);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  createOfferCollections(id) {
    this.adminService.postDataApi('createOfferCollections', { id: id }).subscribe(success => {
      if (success.data) {
        this.is_choices = true;
        this.patchFormStep4(success.data[0]);
        this.patchFormStep5(success.data[0]);
      }
    }, (error) => {
    });
  }

  getParkingSpaceLots = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      this.adminService.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }), // included
      this.adminService.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }), // for sale
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceLotsArray = response[0].data || [];
      this.parkingSpaceRentArray = response[1].data || [];
      this.makeDetailsForPaking();
    });
  }

  makeDetailsForPaking = (): void => {
    ((this.tempmodel.property || {}).property_parking_space || []).forEach((item) => {
      if (this.parkingLotIncludedDetails) {
        this.parkingLotIncludedDetails += ', ';
      } else {
        this.parkingLotIncludedDetails = '';
      }
      this.parkingLotIncludedDetails += (this.getParkingLotIncludedText(item.parking_type) + ':' + item.parking_count);
    });

    // (((this.tempmodel || {}).property || {}).property_offer_payment || []).forEach((item) => {
    //   if (this.parkingLotSaleDetails) {
    //     this.parkingLotSaleDetails += ',';
    //   } else {
    //     this.parkingLotSaleDetails = '';
    //   }
    //   this.parkingLotSaleDetails += (this.getParkingLotForSaleText(item.parking_type) + ':' + item.parking_count);
    // });
    // const property_parking_lot_sale_array = (((this.tempmodel || {}).property || {}).property_offer_payment || [])[(((this.tempmodel || {}).property || {}).property_offer_payment || []).length - 1];
    // ((property_parking_lot_sale_array || {}).property_parking_lot_sale || []).forEach((item) => {
    //   if (this.parkingLotSaleDetails) {
    //     this.parkingLotSaleDetails += ',';
    //   } else {
    //     this.parkingLotSaleDetails = '';
    //   }
    //   this.parkingLotSaleDetails += (this.getParkingLotForSaleText(item.parking_type) + ':' + item.parking_lots);
    // });
  }

  getParkingLotIncludedText = (parking_type: any): any => {
    const data = this.parkingSpaceLotsArray.find((item) => item.id == parking_type);
    return this.language_code == 'en' ? ((data || {}).name_en || '') : ((data || {}).name_es || '');
  }

  getParkingLotForSaleText = (parking_type: any): any => {
    const data = this.parkingSpaceRentArray.find((item) => item.id == parking_type);
    return this.language_code == 'en' ? ((data || {}).name_en || '') : ((data || {}).name_es || '');
  }

  identify(index, item) {
    return item.name;
  }

  getOfferPdf() {
    this.property_offer_id = this.tempmodel.offer_id;
    let offer = this.tempmodel.property.property_offer_payment.find(x => x.random_id == this.property_offer_id)
    this.offerPdf.offerID(offer);
  }

  editPrice(isEdit) {
    if (isEdit) {
      swal({
        html: this.translate.instant('message.error.areYouSure') + '<br>' +
          this.translate.instant('message.error.doYouWantToEditTheFinalPriceOfCollection'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        this.edit_price = result.value;
      });
    }
    else {
      this.edit_price = false;
    }
  }

  parkingSpaceSale = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      //this.admin.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }),
      this.adminService.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }),
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceRentArray = response[0].data || [];
      this.ForPakingSale(this.parking_area);
      // this.parkingSpaceRentArray = response[1].data;
    });
  }

  ForPakingSale(offer) {
    ((offer || {}).property_parking_lot_sale || []).forEach((item) => {
      let parkingName = this.parkingSpaceRentArray.find(parking => parking.id == item.parking_type);
      if (this.parkingLotSaleDetails) {
        this.parkingLotSaleDetails += ', ';
      } else {
        this.parkingLotSaleDetails = '';
      }
      this.parkingLotSaleDetails += ((this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':' + item.parking_lots);
    });
  }

  onFinalPriceChange() {
    let interest;
    let discount;
    let price = this.addFormStep4.controls.final_price.value;
    let deal_price = this.addFormStep4.controls.deal_price.value;
    if (!this.isByOffer) {
      if (deal_price > price) {
        let diff = (price * 100) / Number(deal_price);
        discount = 100 - diff;
        this.addFormStep4.controls.interest_discount.patchValue(Number(discount).toFixed(3));
      }
      else {
        let diff = price - deal_price;
        interest = (diff * 100) / Number(deal_price);
        this.addFormStep4.controls.interest_discount.patchValue(Number(interest).toFixed(3));
      }
    }
  }

  editDeliveryDate(value:any){
    this.isEditDeliveryDate = value;
    if(value){
      this.addFormStep4.get('delivery_date').enable({onlySelf:true});
    }else{
      this.addFormStep4.get('delivery_date').disable({onlySelf:true});
    }
  }
}