import { Component, OnInit, ViewChild, ElementRef, NgZone, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddProjectModel, Towers, Configuration } from 'src/app/models/addProject.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddPropertyModel, PropertyDetails, Building } from 'src/app/models/addProperty.model';
import { Constant } from 'src/app/common/constants';
import { FileUpload } from 'src/app/common/fileUpload';
import { VideoUpload } from 'src/app/common/videoUpload';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpInterceptor } from 'src/app/services/http-interceptor';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/primeng';
import { Collection, Seller } from 'src/app/models/collection.model';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import * as numeral from 'numeral';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-edit-collection',
  templateUrl: './add-edit-collection.component.html',
  styleUrls: ['./add-edit-collection.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor, Collection, CurrencyPipe, DecimalPipe]
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
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

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
  initialCountry: any;
  propertyDetails = false;
  details: any;
  editMode = false;
  newcarpet_area = { area: '', price: '' };
  newcustom_attribute = { name: '', value: '' };
  buildingLoading = false;
  buildingData: AddProjectModel;
  searchedBuildings: Array<AddProjectModel>;
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
  showError:  boolean;
  availabilityStatus = [
    { id: '1', name: this.translate.instant('leadDetails.purchase'), checked: false },
    { id: '2', name: this.translate.instant('leadDetails.rent'), checked: false }];
  
  constructor(public model: Collection, private us: AdminService, private cs: CommonService,
    private router: Router,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute,
    private http: HttpInterceptor,
    private spinner: NgxSpinnerService,
    private element: ElementRef,
    private translate: TranslateService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe) {
  }

  ngOnInit() {
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
 

    this.parameter.sub = this.route.params.subscribe(params => {
      this.model.id = params['id'];
      if (params['id'] === '0') {
        this.showSearch = true;
        this.initFormStep1();
        this.setValue('seller_type', '1');
        this.setValue('buyer_type', '1');
        // this.initFormStep2();
        // this.initFormStep3();
        this.initFormStep4();
        this.initFormStep5();
      } else {
        this.editCollection();
      }
    });
    this.tab = 1;
    // this.getPaymentMethods();
    // this.getDealTypes();
    this.getCurrencies();
    this.searchControl = new FormControl();
  }

  editCollection() {    
    this.showSearch = false;
    this.initFormStep1();
    // this.setValue('seller_type', 1);
    // this.setValue('buyer_type', 1);
    this.initFormStep2();
    this.initFormStep3();
    this.initFormStep4();
    this.initFormStep5();
    this.getCollectionDetails(this.model.id);
  }

  getAllPaymentChoices() {
    this.us.postDataApi('getPaymentChoices', {})
      .subscribe(
        success => {
          this.paymentChoices = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  setDatePickerLocale() {
    if (this.translate.defaultLang == 'en') {
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
      }
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
    this.addFormStep1 = this.fb.group({
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
    this.addFormStep2 = this.fb.group({
      step: ['', [Validators.required]],
      seller_id: [''],
      seller_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]], // commer cial name and seller name
      seller_legal_name: [''], // legal name in case of entity/dev
      seller_address: [null],  // legal entiy/dev address
      seller_email: [''],
      seller_phone: ['', [Validators.required, Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      seller_company_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      seller_fed_tax: [''],
      seller_leg_rep_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      seller_leg_rep_phone: ['', [Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      seller_leg_rep_email: ['', [Validators.email]],
      seller_leg_rep_comp: [''],
      seller_leg_rep_fed_tax: ['', [Validators.minLength(12), Validators.maxLength(13)]],
      collection_seller_banks: this.fb.array([]),
      collection_seller_rep_banks: this.fb.array([]),
      seller_type: ['', [Validators.required]],
      seller_legal_entity_id: ['']
    });
  }

  setValue(key: string, value: any) {
    this.model[key] = value; 
    if (key == 'seller_type') {
      // this.addFormStep2.reset();
      this.initFormStep2();
      this.showError = false;
      if (value != '1') {
        // console.log('not person')
        this.addFormStep2.controls['seller_email'].setValidators(null);
        this.addFormStep2.controls['seller_email'].updateValueAndValidity();
        this.addFormStep2.controls['seller_address'].setValidators([Validators.required, Validators.minLength(1)]);
        this.addFormStep2.controls['seller_fed_tax'].setValidators([Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep2.controls['seller_legal_name'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_name'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_phone'].setValidators([Validators.required, Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]);
        this.addFormStep2.controls['seller_leg_rep_email'].setValidators([Validators.required, Validators.email]);
        // this.addFormStep2.controls['seller_leg_rep_comp'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep2.controls['seller_leg_rep_fed_tax'].setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(13)]);
      
      } else {
        // console.log('person')
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
    }
    else {
      this.initFormStep3();
      this.showError = false;
      if (value != '1') {
        this.addFormStep3.controls['buyer_address'].setValidators([Validators.required, Validators.minLength(1)]);
        this.addFormStep3.controls['buyer_fed_tax'].setValidators([Validators.minLength(12), Validators.maxLength(13)]);
        this.addFormStep3.controls['buyer_legal_name'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_name'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_phone'].setValidators([Validators.required, Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]);
        this.addFormStep3.controls['buyer_leg_rep_email'].setValidators([Validators.required, Validators.email]);
        // this.addFormStep3.controls['buyer_leg_rep_comp'].setValidators([Validators.required, Validators.minLength(1), Validators.maxLength(30)]);
        this.addFormStep3.controls['buyer_leg_rep_fed_tax'].setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(13)]);
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
    this.addFormStep3 = this.fb.group({
      step: ['', [Validators.required]],
      buyer_id: [''],
      buyer_name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]], // commer cial name and seller name
      buyer_legal_name: [''], // legal name in case of entity/dev
      buyer_address: [null],  // legal entiy/dev address
      buyer_email: [''],
      buyer_phone: ['', [Validators.required, Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      buyer_company_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      buyer_fed_tax: [''],
      buyer_leg_rep_name: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      buyer_leg_rep_phone: ['', [Validators.pattern(this.constant.numberPattern), Validators.minLength(8), Validators.maxLength(15)]],
      buyer_leg_rep_email: ['', [Validators.email]],
      buyer_leg_rep_comp: [''],
      buyer_leg_rep_fed_tax: ['', [Validators.minLength(12), Validators.maxLength(13)]],
      collection_buyer_banks: this.fb.array([]),
      collection_buyer_rep_banks: this.fb.array([]),
      buyer_type: ['', [Validators.required]],
      buyer_legal_entity_id: ['']
    });
    // console.log(this.addFormStep2)
  }

  initFormStep4() {
    this.addFormStep4 = this.fb.group({
      step: ['', [Validators.required]],
      currency_id: ['', [Validators.required]],
      paymentchoice: [''],
      payment_choices: this.fb.array([]),
      num_of_months: [''],
      monthly_date: [''],
      monthly_amount: [''],

      deal_purchase_date: ['', [Validators.required]],
      deal_price: ['', [Validators.required]],
      sum_of_concepts: [''],
      deal_interest_rate: [0],
      deal_penality: [0]
    });
  }


  initFormStep5() {
    this.addFormStep5 = this.fb.group({
      // step 5
      step: ['', [Validators.required]],
      comm_total_commission: ['', [Validators.required, Validators.max(100)]],
      comm_total_commission_amount: ['', [Validators.required]],
      comm_shared_commission: ['', [Validators.required, Validators.max(100)]],
      comm_shared_commission_amount: ['', [Validators.required]],
      // deal_commission_agents: ['', [Validators.required]]
      deal_commission_agents: this.fb.array([]),
      collection_agent_banks: this.fb.array([]),

      collection_commissions: this.fb.array([]),
    });
    // if (this.model.id === '0') {
      this.addAgent('');
    // }
  }


  initFormStep6() {
    this.addFormStep6 = this.fb.group({
      step: ['', [Validators.required]],
      folderName: [''],
      collection_folders: this.fb.array([])
    });
  }


  getCollectionDetails(id: string) {
    this.spinner.show();
    this.us.postDataApi('getCollectionById', {id: id})
      .subscribe(
        success => {
          this.spinner.hide();
          this.patchFormData(success['data']);
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getPaymentMethods() {
    this.us.postDataApi('getPaymentMethods', {})
      .subscribe(
        success => {
          this.paymentMethods = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getDealTypes() {
    this.us.postDataApi('getDealTypes', {})
      .subscribe(
        success => {
          this.dealTypes = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getCurrencies() {
    this.us.postDataApi('getCurrencies', {})
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
    }else {
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
    this.model.building = data.property.building;
    this.model.building_towers = data.property.building_towers;
    this.model.floor_num = data.property.floor_num;
    this.model.name = data.property.name;
    this.model.availabilityStatusId = data.for_sale ? this.availabilityStatus[0].id : this.availabilityStatus[1].id;
    this.model.building_configuration_id = data.property.building_configuration_id;
    this.model.building_configuration = data.property.building_configuration;
    this.addFormStep1.controls.building_id.patchValue(data.property.building.id);
    this.addFormStep1.controls.building_towers_id.patchValue(data.property.building_towers.id);
    this.addFormStep1.controls.floor_num.patchValue(data.property.floor_num);
    this.addFormStep1.controls.property_id.patchValue(data.property_id);
    this.addFormStep1.controls.for_sale.patchValue(data.for_sale);
    this.addFormStep1.controls.for_rent.patchValue(data.for_rent);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep2(data, mode: string) {
    this.model.seller_type = data.seller_type ? data.seller_type : '1';
    this.addFormStep2.controls.seller_type.patchValue(data.seller_type ? data.seller_type.toString() : '1');
    if (data.seller_type != '2') {
      this.addFormStep2.controls.seller_id.patchValue(data.seller ? data.seller.id : '');
      this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name ? data.seller_company_name : '');
    }
    if (data.seller_type == '1') {
      this.addFormStep2.controls.seller_email.patchValue(data.seller ? data.seller.email : '');
    }
    if (data.seller_type == '2') {
      this.addFormStep2.controls.seller_legal_entity_id.patchValue(data.seller_legal_entity ? data.seller_legal_entity.id : '');
    }
    
    this.addFormStep2.controls.seller_name.patchValue(data.seller_type == '2' 
      ? (data.seller_legal_entity ? data.seller_legal_entity.comm_name : '') 
      : (data.seller ? data.seller.name : ''));
    this.addFormStep2.controls.seller_legal_name.patchValue(data.seller_type == '2' 
      ? (data.seller_legal_entity ? data.seller_legal_entity.legal_name : '') 
      : (data.seller_legal_name ? data.seller_legal_name : ''));
    this.addFormStep2.controls.seller_address.patchValue(data.seller_type == '2' 
      ? (data.seller_legal_entity ? data.seller_legal_entity.address : '') 
      : (data.seller_address ? data.seller_address : ''));
    this.addFormStep2.controls.seller_phone.patchValue(data.seller_type == '2' 
      ? (data.seller_legal_entity ? data.seller_legal_entity.phone : '') 
      : (data.seller ? data.seller.phone : ''));
    this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller_type == '2' 
      ? (data.seller_legal_entity ? data.seller_legal_entity.fed_tax_pay : '') 
      : (data.seller_fed_tax || ''));

    this.addFormStep2.controls.seller_leg_rep_name.patchValue(data.seller_leg_rep_name || '');
    this.addFormStep2.controls.seller_leg_rep_phone.patchValue(data.seller_leg_rep_phone || '');
    this.addFormStep2.controls.seller_leg_rep_email.patchValue(data.seller_leg_rep_email || '');
    this.addFormStep2.controls.seller_leg_rep_comp.patchValue(data.seller_leg_rep_comp || '');
    this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(data.seller_leg_rep_fed_tax || '');
    this.addFormStep2.controls.step.patchValue(2);
    const control = this.addFormStep2.get('collection_seller_banks') as FormArray;
    if (data.collection_seller_banks) {
      data.collection_seller_banks.forEach(x => {
        control.push(this.fb.group(x));
      });
    }
    const control1 = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
    if (data.collection_seller_rep_banks) {
      data.collection_seller_rep_banks.forEach(x => {
        control1.push(this.fb.group(x));
      });
    }
    // console.log('sellerrrrr', this.addFormStep2.value);
    if (mode == 'edit') {
      this.setSeller(data);
    }
  }

  patchFormStep3(data) {
    this.model.buyer_type = data.buyer_type ? data.buyer_type : '1';
    this.addFormStep3.controls.buyer_type.patchValue(data.buyer_type ? data.buyer_type.toString() : '1');

    if (data.buyer_type != '2') {
      this.addFormStep3.controls.buyer_id.patchValue(data.buyer ? data.buyer.id : '');
      this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name ? data.buyer_company_name : '');
    }
    if (data.buyer_type == '1') {
      this.addFormStep3.controls.buyer_email.patchValue(data.buyer ? data.buyer.email : '');
    }
    if (data.buyer_type == '2') {
      this.addFormStep3.controls.buyer_legal_entity_id.patchValue(data.buyer_legal_entity ? data.buyer_legal_entity.id : '');
    }

    this.addFormStep3.controls.buyer_name.patchValue(data.buyer_type == '2' 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.comm_name : '') 
      : (data.buyer ? data.buyer.name : ''));
    this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer_type == '2' 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.legal_name : '') 
      : (data.buyer_legal_name ? data.buyer_legal_name : ''));
    this.addFormStep3.controls.buyer_address.patchValue(data.buyer_type == '2' 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.address : '') 
      : (data.buyer_address ? data.buyer_address : ''));
    this.addFormStep3.controls.buyer_phone.patchValue(data.buyer_type == '2' 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.phone : '') 
      : (data.buyer ? data.buyer.phone : ''));
    this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer_type == '2' 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.fed_tax_pay : '') 
      : (data.buyer_fed_tax || ''));
      
    this.addFormStep3.controls.buyer_leg_rep_name.patchValue(data.buyer_leg_rep_name || '');
    this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(data.buyer_leg_rep_phone || '');
    this.addFormStep3.controls.buyer_leg_rep_email.patchValue(data.buyer_leg_rep_email || '');
    this.addFormStep3.controls.buyer_leg_rep_comp.patchValue(data.buyer_leg_rep_comp || '');
    this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(data.buyer_leg_rep_fed_tax || '');
    this.addFormStep3.controls.step.patchValue(2);
    const control = this.addFormStep3.get('collection_buyer_banks') as FormArray;
    if (data.collection_buyer_banks) {
      data.collection_buyer_banks.forEach(x => {
        control.push(this.fb.group(x));
      });
    }
    const control1 = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
    if (data.collection_buyer_rep_banks) {
      data.collection_buyer_rep_banks.forEach(x => {
        control1.push(this.fb.group(x));
      });
    }
  }

  patchFormStep4(data) {
    // const d = moment(data.deal_purchase_date).utc(true).local().toDate()
    this.addFormStep4.controls.deal_purchase_date.patchValue(data.deal_purchase_date ? new Date(data.deal_purchase_date) : null);
    this.addFormStep4.controls.deal_price.patchValue(this.numberUptoTwoDecimal(data.deal_price));
    this.addFormStep4.controls.currency_id.patchValue(data.currency_id ? data.currency_id : 1);
    this.addFormStep4.controls.deal_interest_rate.patchValue(data.deal_interest_rate);
    this.addFormStep4.controls.deal_penality.patchValue(data.deal_penality);
    const control1 = this.addFormStep4.get('payment_choices') as FormArray;
    let sum_of_concepts = 0;
    if (data.payment_choices) {
      for (let index = 0; index < data.payment_choices.length; index++) {
        const x = data.payment_choices[index];
        x.percent = this.numberUptoTwoDecimal(x.percent);
        x.amount = this.numberUptoTwoDecimal(x.amount);
        sum_of_concepts = sum_of_concepts + parseFloat(x.amount);
        // x.date = x.date ? moment.utc(x.date).toDate() : null;
        // console.log(sum_of_concepts);
        x.date = x.date ? new Date(x.date) : null;
        control1.push(this.fb.group(x)); 
      }
    }

    this.addFormStep4.controls['sum_of_concepts'].patchValue(sum_of_concepts);
    this.addFormStep4.controls.step.patchValue(4);
  }

  patchFormStep5(data) {
    this.addFormStep5.controls.comm_total_commission.patchValue(this.numberUptoTwoDecimal(data.comm_total_commission || 0));
    this.addFormStep5.controls.comm_total_commission_amount.patchValue(this.numberUptoTwoDecimal(data.comm_total_commission_amount || 0));
    this.addFormStep5.controls.comm_shared_commission.patchValue(this.numberUptoTwoDecimal(data.comm_shared_commission || 0));
    this.addFormStep5.controls.comm_shared_commission_amount.patchValue(this.numberUptoTwoDecimal(data.comm_shared_commission_amount || 0));
    this.addFormStep5.controls.deal_commission_agents.patchValue(data.deal_commission_agents);
    const control = this.addFormStep5.get('collection_agent_banks') as FormArray;
    if (data.collection_agent_banks) {
      data.collection_agent_banks.forEach(x => {
        control.push(this.fb.group(x));
      });
    }

    this.setCommission(data);
    this.addFormStep5.controls.step.patchValue(5);
  }

  setCommission(data) {  
    this.model.collection_commissions = [];
    const payment_choices = this.addFormStep4.get('payment_choices').value;
    const control1 = this.addFormStep5.get('collection_commissions') as FormArray;
    if (payment_choices) {
      for (let index = 0; index < payment_choices.length; index++) {
          const element = payment_choices[index];
          const element1 = data.collection_commissions[index];
          const obj = {};
          obj['id'] = data.collection_commissions.length > 0 && data.collection_commissions[index] ? data.collection_commissions[index].id : '';
          obj['pc_id'] = element['payment_choice_id'];   // payment choice dropdown id
          obj['name'] = element['name'];
          obj['date'] = element['date'];
          obj['payment_amount'] = element['amount'];
          obj['payment_choice_id'] = element['id'];
          obj['add_collection_commission'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].add_collection_commission : 0;
          obj['percent'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].percent : 0;
          obj['amount'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].amount : 0.00;
          
          obj['add_purchase_commission'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].add_purchase_commission : 0;
          obj['purchase_comm_amount'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].purchase_comm_amount : 0;
        
          if (control1.length != payment_choices.length) {
            control1.push(this.fb.group(obj));
          }
          this.model.collection_commissions.push(obj);
      }
    }
  }

  setFolders(data: any) {
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

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSomeText'), 'error');
      return false;
    }

    this.showBuilding = false;
    this.buildingLoading = true;

    const input = new FormData();
    input.append('keyword', keyword);
    input.append('status', '1');  // means only approved projects

    this.us.postDataApi('searchBuilding', input)
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

  getPage(page: number) {
    this.parameter.page = page;
  }

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
    this.buildingName = '';
  }
  getBuildingIndex(i: number) {
    this.searchedBuildings.forEach(e => {
      e.selected = false;
    });
    const searchindex = (this.parameter.page - 1) * 4 + i;
    this.searchedBuildings[searchindex].selected = true;
  }

  setBuildingId(building: any) {
    this.selectedBuilding = building;
    this.building.id = building.id;
    this.model.building_id = building.id;
  }

  setTower(building_towers_id: string) {
    for (let index = 0; index < this.searchedBuildings.length; index++) {
      if (this.searchedBuildings[index].id == this.model.building_id) {
        const bt = this.searchedBuildings[index].building_towers;
        for(let i = 0; i < bt.length; i++) {
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
      this.toastr.error(this.translate.instant('message.error.pleaseFillCompleteDevloperInformation'), this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillCompleteDevloperInformation'), 'error');
      return false;
    }

    if (!this.latitude && !this.longitude) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectLocationFromTheDropdownList'), this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocationFromTheDropdownList'), 'error');
      return false;
    }

    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    if (!this.building.lat || !this.building.lng) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseSelectLocation'), this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocation'), 'error');
      return false;
    }
    this.spinner.show();
    this.us.postDataApi('buildingRequest', this.building)
      .subscribe(
        success => {
          this.spinner.hide();
          
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.dataCollectorWillLinkPropertyToBuilding'), this.translate.instant('swal.success'));

          // swal({
          //   html: 'Success' + '<br>' +
          //   this.translate.instant('message.success.dataCollectorWillLinkPropertyToBuilding'),
          //   type: 'success'
          // });
          // this.tab = 1;
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
      building_id : this.model.building_id,
      tower_id : this.model.building_towers_id,
      floor_num : this.model.floor_num
    };
    this.us.postDataApi('getProperties', input)
      .subscribe(
        success => {
          success.data.unshift({'name': this.translate.instant('message.error.pleaseChooseApartment')})
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
        if (p.for_sale == 1) {
          this.setAvailableStatus(0);
        }
        if (p.for_rent == 1) {
          this.setAvailableStatus(1);
        }
        this.addFormStep5.controls.comm_total_commission.patchValue(p.total_commision ? p.total_commision : 0)
        this.addFormStep5.controls.comm_total_commission_amount.patchValue(p.total_commision ? (p.total_commision *p.min_price)/100 : 0)
        this.addFormStep5.controls.comm_shared_commission.patchValue(p.broker_commision ? p.broker_commision : 0)
        this.addFormStep5.controls.comm_shared_commission_amount.patchValue(p.broker_commision ? (p.broker_commision *p.min_price)/100 : 0)
      }
    })
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
      this.us.postDataApi('deleteAgentBank', {id: item.value.id}).subscribe(success => {
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
      this.us.postDataApi('deleteSellerBank', {id: item.value.id}).subscribe(success => {
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
      this.us.postDataApi('deleteSellerRefBank', {id: item.value.id}).subscribe(success => {
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
      this.us.postDataApi('deleteBuyerRefBank', {id: item.value.id}).subscribe(success => {
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
    return this.fb.group({
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
      this.us.postDataApi('deleteBuyerBank', {id: item.value.id}).subscribe(success => {
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
    if (this.currentPaymentChoiceId != 5){
      let name = '';
      this.paymentChoices.map(r => {
        if (r.id == this.currentPaymentChoiceId) {
          name = r.name;
        }
      });
      const fb = this.fb.group({
        payment_choice_id: [this.currentPaymentChoiceId, [Validators.required]],
        name: [name, [Validators.required]],
        date: ['', [Validators.required]],
        percent: ['', [Validators.required]],
        amount: ['', [Validators.required]]
      });
      const c = this.getPaymentChoices.push(fb);
    }else {
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
    const v = parseFloat(sum) + parseFloat((this.num_of_months*monthly_amount).toFixed(2));
  
    if (!this.num_of_months || !monthly_amount || !monthly_date) {      
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterMonthlyData'), this.translate.instant('swal.error'));
      return false;
    }
    for (let index = 0; index < this.num_of_months; index++) {
      this.getPaymentChoices.push(this.newMonthlyPaymentsChoice(index));
    }
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoTwoDecimal(v));
  
    this.addFormStep4.get('num_of_months').patchValue(null);
    this.addFormStep4.get('monthly_amount').patchValue(null);
    this.addFormStep4.get('monthly_date').patchValue(null);
  }

  newMonthlyPaymentsChoice(index: number): FormGroup {
    const num_of_months = this.addFormStep4.get('num_of_months').value;
    let monthly_amount = this.addFormStep4.get('monthly_amount').value;
    let monthly_date = this.addFormStep4.get('monthly_date').value;
    const price = this.addFormStep4.get('deal_price').value;
    const percent = this.numberUptoTwoDecimal((monthly_amount * 100) / price);
    monthly_amount = this.numberUptoTwoDecimal(monthly_amount);
    let name = '';
    // moment.utc(x.date).local().toDate() : null;
    // monthly_date = moment.utc(moment(monthly_date).add(index, 'months').format('YYYY-MM-DD')).toDate();
    // monthly_date = new Date(moment(monthly_date).add(index, 'months').format('YYYY-MM-DD'));
    // monthly_date = moment.utc(monthly_date).add(index, 'months').toDate();
    monthly_date = moment(monthly_date).add(index, 'months').toDate();
    this.paymentChoices.map(r => {
      if (r.id == 5) {
        name = r.name + ' ' + (index + 1);
      }
    });
    return this.fb.group({
      payment_choice_id: [this.currentPaymentChoiceId, [Validators.required]],
      name: [name, [Validators.required]],
      date: [monthly_date, [Validators.required]],
      percent: [percent, [Validators.required]],
      amount: [monthly_amount, [Validators.required]]
    });      
  }

  removePaymentChoicePopup($event: Event, item: any, i: number) {
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

  removePaymentChoice(item: any, i: number) {
    this.getPaymentChoices.removeAt(i);
    if (item.value.id) {
      this.us.postDataApi('deletePaymentChoice', {id: item.value.id}).subscribe(success => {
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
    }
    const folder_docs = {
      display_name: '',
      name: ''
    }
    if (this.mode == 'add') {
      this.collectionFolders.push({name: this.folderName, folder_docs: []})
    }
    else if (this.mode == 'edit') {
      if (this.selectedFolder && this.selectedFolder.id) {
        this.editFolderName(this.selectedFolder);
      } else {
        this.collectionFolders[this.folderIndex].name = this.folderName;
      }
    }
    this.closeFolderModal();
  }

  closeFolderModal() {
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
    this.us.postDataApi('updateCollectionFolder', {id: this.selectedFolder.id, name: this.folderName})
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
    this.docsModalOpen.nativeElement.click();
  }

  closeModal() {
    this.docsModalClose.nativeElement.click();
  }

  onSelectFile(files) {
    this.parameter.loading = true;
    this.cs.saveAttachment(files[0]).subscribe(
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
    this.us.postDataApi('addCollection', {id: this.model.id, step: 6, 'collection_folders': this.collectionFolders})
      .subscribe(
        success => {
          this.spinner.hide();
          // swal({
          //   html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
          // });
          this.router.navigate(['/dashboard/collections/view-collections'])
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addDocs() {
    if (!this.docsName) {
      
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuName'), this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterDocuName'), 'error');
      return;
    }
    if (!this.docFile) {
      
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterDocuFile'), this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterDocuFile'), 'error');
      return;
    }
    this.docs.push({name: this.docsName, display_name: this.docFile});
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
      this.us.postDataApi('deleteFolderDoc', {id: item.id}).subscribe(success => {
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
      this.us.postDataApi('deleteCollectionFolder', {id: item.id}).subscribe(success => {
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
    return this.fb.group({
      name: [this.folderName, [Validators.required]],
      folder_docs: this.fb.array([])
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
    const collFolders =  this.addFormStep6.get('collection_folders') as FormArray;
    return collFolders.get('folder_docs') as FormArray;
  }

  newDocx(): FormGroup {
    return this.fb.group({
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
    return this.fb.group({
      broker_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      fed_tax_payer_reg: ['']
    });
  }

  onSelect(event) {
    console.log(event)
  }
  
  getBothBroker(keyword: string) {
    this.spinner.show();
    const input = { keyword: '' };
    input.keyword = keyword;
    this.us.postDataApi('getBothBroker', input).subscribe(r => {
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
    // this.addFormStep5.controls['deal_commission_agents'].patchValue([this.newAgent()]);
    delete this.addFormStep5.value['deal_commission_agents'];
    delete this.addFormStep5.value['collection_agent_banks'];
    // this.addAgent('');
    delete this.addFormStep5.value.deal_commission_agents;
    // this.addFormStep5.get('collection_agent_banks') as FormArray;
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
    this.us.postDataApi('getAllBuyers', input).subscribe(r => {
      this.spinner.hide();
      if (keyword === '') {
        this.linkUserModal.nativeElement.click();
      }
      this.allUsers = r['data'];
    }, error => {
      this.spinner.hide();
      
      this.toastr.clear();
      this.toastr.error(error.error.message, this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), error.error.message, 'error');
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
            control.push(this.fb.group(x));
          });
        }
        let control1 = new FormArray([]);
        control1 = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
        if (item.legal_reps && item.legal_reps.legal_rep_banks) {
          item.legal_reps.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control1.push(this.fb.group(x));
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
        this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(item.legal_representative ? item.legal_representative.fed_tax_pay : '');
        const control = this.addFormStep2.get('collection_seller_banks') as FormArray;
        if (item.legal_representative && item.legal_representative.legal_rep_banks) {
          item.legal_representative.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control.push(this.fb.group(x));
          });
        }
        const control1 = this.addFormStep2.get('collection_seller_rep_banks') as FormArray;
        if (item.legal_rep_banks) {
          item.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control1.push(this.fb.group(x));
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
            control.push(this.fb.group(x));
          });
        }
        let control1 = new FormArray([]);
        control1 = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
        if (item.legal_reps && item.legal_reps.legal_rep_banks) {
          item.legal_reps.legal_rep_banks.forEach(x => {
            control1.push(this.fb.group(x));
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
        const control = this.addFormStep3.get('collection_buyer_banks') as FormArray;
        if (item.legal_representative && item.legal_representative.legal_rep_banks) {
          item.legal_representative.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control.push(this.fb.group(x));
          });
        }
        const control1 = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
        if (item.legal_rep_banks) {
          item.legal_rep_banks.forEach(x => {
            delete x.id;  // no need to send id ( cuz these are saving separtely in table)
            control1.push(this.fb.group(x));
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
    const price = this.addFormStep4.get('deal_price').value;
    if (!price || price == 0) {
      
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const amount = this.numberUptoTwoDecimal((percent * price) / 100);
    this.addFormStep5.controls['comm_total_commission_amount'].patchValue(amount);
  }

  getAgentAmount(percent: number) {
    const price = this.addFormStep4.get('deal_price').value;
    if (!price || price == 0) {
            
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));

      // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPrice'), 'error');
      return;
    }
    const amount = this.numberUptoTwoDecimal((percent * price) / 100);
    this.addFormStep5.controls['comm_shared_commission_amount'].patchValue(amount);
  }

  getAmount(index: number) {
    const price = this.addFormStep4.get('deal_price').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const pcArray: Array<any> = this.addFormStep4.get('payment_choices').value;
    const percent = pcArray[index].percent;
    const amount = this.numberUptoTwoDecimal((percent * price) / 100);
    pcArray[index].amount = amount;
    this.addFormStep4.controls['payment_choices'].patchValue(pcArray);

    // calculating sum of all payment concepts
    const sum_of_concepts = pcArray.reduce(function (a, v) {
      return a + parseFloat(v['amount']);
    }, 0);
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoTwoDecimal(sum_of_concepts));
  }

  getPercentage(index: number) {
    const price = this.addFormStep4.get('deal_price').value;
    if (!price || price == 0) {
      this.toastr.clear();
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPrice'), this.translate.instant('swal.error'));
      return;
    }
    const pcArray: Array<any> = this.addFormStep4.get('payment_choices').value;
    const amount: any = this.numberUptoTwoDecimal(pcArray[index].amount);
    const percent: any = this.numberUptoTwoDecimal((amount * 100) / price);
    pcArray[index].amount = amount;
    this.addFormStep4.controls.payment_choices['controls'][index]['controls'].percent.patchValue(percent);
    
    // calculating sum of all payment concepts
    const sum_of_concepts = pcArray.reduce(function (a, v) {
      return a + parseFloat(v['amount']);
    }, 0);
    this.addFormStep4.controls['sum_of_concepts'].patchValue(this.numberUptoTwoDecimal(sum_of_concepts));
  }

  setCollectionComm(add_collection_commission: any, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne && (installOne.name == pcArray[index].name)) {
      const sta = add_collection_commission;
      for (let index = 0; index < pcArray.length; index++) {
        const e = pcArray[index];
        if (e.name.includes('Monthly Installment')){
          e.add_collection_commission = sta;
          installOne.add_collection_commission = sta;
        }
      }
    }
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getCollAmount(percent: number, index: number, payment_amount: number) {
    const amount = this.numberUptoTwoDecimal((percent * payment_amount) / 100);
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    pcArray[index].amount = amount;
    // const installOne = pcArray.find(r => r.pc_id == 5);
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne.id == pcArray[index].id) {
      pcArray.map(e => {
        // if (e.pc_id == 5) {
        if (e.name.includes('Monthly Installment')){
          e.amount = amount;
          e.percent = percent;
        }
      })
    }
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getCollPercentage(amount: number, index: number, payment_amount: number) {
    const pcArray = this.addFormStep5.get('collection_commissions').value;
    const percent = this.numberUptoTwoDecimal((amount * 100) / payment_amount);
    pcArray[index].percent = percent;
    // const installOne = pcArray.find(r => r.pc_id == 5);
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne.id == pcArray[index].id) {
      pcArray.map(e => {
        // if (e.pc_id == 5) {
        if (e.name.includes('Monthly Installment')){
          e.amount = amount;
          e.percent = percent;
        }
      })
    }
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  setPurchaseComm(add_purchase_commission: any, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne && (installOne.name == pcArray[index].name)) {
      const sta = add_purchase_commission;
      for (let index = 0; index < pcArray.length; index++) {
        const e = pcArray[index];
        if (e.name.includes('Monthly Installment')){
          e.add_purchase_commission = sta;
          installOne.add_purchase_commission = sta;
        }
      }
    }
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }
  
  getPurcAmount(amount: number, index: number) {
    const pcArray: Array<any> = this.addFormStep5.get('collection_commissions').value;
    pcArray[index].purchase_comm_amount = amount;
    const installOne = pcArray.find(r => r.name.includes('Monthly Installment'));
    // if first monthly installment percent added, => update amount in all monthly installments
    if (installOne.id == pcArray[index].id) {
      pcArray.map(e => {
        if (e.name.includes('Monthly Installment')){
          e.purchase_comm_amount = amount;
        }
      })
    }
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getMonthlyPerAndAmount() {
    const price = this.addFormStep4.get('deal_price').value;
    const numOfInstallments = this.addFormStep4.get('deal_monthly_payment').value;
    const monthlyAmount = Math.round(price / numOfInstallments);
    // const monthlyAmount: any = this.currencyPipe.transform(price / numOfInstallments);
    const percent = this.numberUptoTwoDecimal((monthlyAmount * 100) / price);
    this.addFormStep4.controls['deal_monthly_amount'].patchValue(monthlyAmount);
    this.addFormStep4.controls['deal_monthly_percentage'].patchValue(percent);
  }

  createCollection(formdata: NgForm, tab: number) {
    this.model.step = tab;
    formdata['step'] = tab;
    if (this.model.id) {
      formdata['id'] = this.model.id;
    }
    if (this.model.step == 1) {
      if (formdata['property_id']) {
        const pid = formdata['property_id'].id;
        formdata['property_id'] = pid;
      }
      if (this.model.building_id) {
        formdata['building_id'] = this.model.building_id;
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
          if (!formdata['seller_leg_rep_name'] || !formdata['seller_leg_rep_phone'] || !formdata['seller_leg_rep_email'] || !formdata['seller_leg_rep_fed_tax']) {
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
          if (!formdata['buyer_leg_rep_name'] || !formdata['buyer_leg_rep_phone'] || !formdata['buyer_leg_rep_email'] || !formdata['buyer_leg_rep_fed_tax']) {
            this.toastr.error(this.translate.instant('message.error.pleaseFillLegalRepInfo'), this.translate.instant('swal.error'));
            return;
          }
        }
       }
       else {
        this.showError = true;
        return;
       }
    }

    if (this.model.step == 4) {
      this.addFormStep4.controls.step.patchValue(this.model.step);
      delete this.addFormStep4.value.paymentchoice;
      // console.log(this.addFormStep4.controls);
      if (this.addFormStep4.valid) {
    
        if (this.addFormStep4.controls.payment_choices.value && this.addFormStep4.controls.payment_choices.value.length < 1) {
          this.toastr.error(this.translate.instant('message.error.pleaseChoosePayments'), this.translate.instant('swal.error'));
          return;
        }

        // converting to local
        const d = formdata['deal_purchase_date'];
        // const nd = moment(d).add(330, 'minutes').toDate();
        formdata['deal_purchase_date']=moment(d).format('YYYY-MM-DD');
        let paymentSum = 0;
        let i = 0;
        for (let index = 0; index < formdata['payment_choices'].length; index++) {
          const element = formdata['payment_choices'][index];
          // console.log(element.date);

          if (!element.name || !element.amount || !element.date || !element.percent) {
            i = i + 1;
            const text = element.name ? 
                          this.translate.instant('message.error.pleaseFillAllDetailsFor') + element.name :
                          this.translate.instant('message.error.pleaseFillAllDetailsFor')
                          
            this.toastr.clear();
            this.toastr.error(text, this.translate.instant('swal.error'));
            return;
          }
          // element.date = moment(moment.utc(element.date).toDate()).local().toDate();
          // console.log(element.date);
          element.date = moment(element.date).format('YYYY-MM-DD');
          // console.log(element.date);
          // element.date = moment(element.date).add(330, 'minutes').toDate();
          paymentSum = paymentSum + parseInt(element.amount || 0);
        }
        // check if total sum of monthly installments is equal or greater than property price
        // if (formdata['deal_price'] != paymentSum) {
        //   const text = this.translate.instant('message.error.priceIsNotEqualToPaymentConceptPrice') + '<br>' + 
        //   this.translate.instant('message.error.priceIs') + formdata['deal_price'] + '<br>' +
        //   this.translate.instant('message.error.sumOfPaymentConceptIs') + paymentSum;
        //   swal(this.translate.instant('swal.error'), text, 'error');
        //   return;
        // }
      } else {
        this.showError = true;
        return false;
      }
    }
    // console.log(formdata);

    if (this.model.step == 5) {
      this.addFormStep5.controls.step.patchValue(this.model.step);
      // console.log(this.addFormStep5.controls)
      if (this.addFormStep5.valid) {
       
        if (!formdata['deal_commission_agents']) {                    
          this.toastr.clear();
          this.toastr.error(this.translate.instant('message.error.pleaseEnterAgent'), this.translate.instant('swal.error'));
          return;
        } else if (formdata['deal_commission_agents'] || formdata['deal_commission_agents'].length>0) {
          let i = 0;
          for (let index = 0; index < formdata['deal_commission_agents'].length; index++) {
            const element = formdata['deal_commission_agents'][index];
            if (!element.name || !element.fed_tax_payer_reg) {
              i = i + 1;
              if (!element.name) {
                this.toastr.clear();
                this.toastr.error(this.translate.instant('message.error.pleaseEnterAgent'), this.translate.instant('swal.error'));
                return;
              }
              // else {                          
              //   this.toastr.clear();
              //   this.toastr.error(this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), this.translate.instant('swal.error'));
              // }
            }
          }
        }
        const collection_commissions = formdata['collection_commissions'];
        delete formdata['collection_commissions'];
        collection_commissions.forEach(element => {
          element.add_collection_commission = element.add_collection_commission ? 1 : 0
          element.add_purchase_commission = element.add_purchase_commission ? 1 : 0
        });
        formdata['collection_commissions'] = collection_commissions;
        // console.log(formdata);
      } else {
        this.showError = true;
        return false;
      }
    }

    this.spinner.show();
    this.us.postDataApi('addCollection', formdata)
      .subscribe(
        success => {
          this.tab = tab + 1;
          this.spinner.hide();
          this.showError = false;
          this.model.id = success['data'].id;
          // if (tab != 6) { 
          //   if (tab == 4) {
          //     this.selectedPaymentChoice.nativeElement.value = '';
          //   }
          //   this.editCollection();
          // }
          if (tab == 1 || tab == 2) {
            this.initFormStep2();
            this.patchFormStep2(success['data'], 'add')
          // }
          // if (tab == 2) {
            this.initFormStep3();
            this.patchFormStep3(success['data'])
          }
          if (tab == 4) {
            this.initFormStep4();
            this.patchFormStep4(success['data'])

            this.initFormStep5()
            this.selectedPaymentChoice.nativeElement.value = '';
            this.patchFormStep5(success['data']);
          }
          if (tab == 6) {
            this.router.navigate(['/dashboard/collections/view-collections'])
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

   numberUptoTwoDecimal(num: any) {
    //  console.log(num);
     return num.toFixed(2);
   }
}
