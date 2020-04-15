import { Component, OnInit, ViewChild, ElementRef, NgZone, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AddProjectModel, Towers, Configuration } from 'src/app/models/addProject.model';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddPropertyModel, PropertyDetails, Building } from 'src/app/models/addProperty.model';
// import { Building } from 'src/app/models/global.model';
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
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-edit-collection',
  templateUrl: './add-edit-collection.component.html',
  styleUrls: ['./add-edit-collection.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor, Collection]
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
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.collectionFolders = [];
    this.model = new Collection();
    this.model.building = new Building();
    this.model.building_towers = new Towers();
    this.model.seller_type = 1;
    this.model.buyer_type = 1;
    this.setDatePickerLocale();
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.getAllPaymentChoices();
    // this.paymentChoices = [
    //   { id: 1, name: 'Layaway Payment' },
    //   { id: 2, name: 'Downaway Payment' },
    //   { id: 3, name: 'Payment upon Delivery' },
    //   { id: 4, name: 'Special Payment' },
    //   { id: 5, name: 'Monthly Installments' }];
    
    this.initFormStep1();
    this.initFormStep2();
    this.initFormStep3();
    this.initFormStep4();
    this.initFormStep5();
    // this.initFormStep6();

    this.parameter.sub = this.route.params.subscribe(params => {
      this.model.id = params['id'];
      if (params['id'] === '0') {
        this.showSearch = true;
      } else {
        this.showSearch = false;
        this.getCollectionDetails(this.model.id);
      }
    });
    this.tab = 1;
    // this.getPaymentMethods();
    // this.getDealTypes();
    this.getCurrencies();
    this.searchControl = new FormControl();
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
      dateFormat: 'yyyy-mm-dd',
      weekHeader: 'Wk'
    };
  }

  initFormStep1() {
    this.addFormStep1 = this.fb.group({
      // step 1
      building_id: ['', [Validators.required]],
      building_towers_id: ['', [Validators.required]],
      floor_num: ['', [Validators.required]],
      property_id: ['', [Validators.required]],
      // deal_type_id: ['', [Validators.required]],
      for_sale: ['', [Validators.required]],
      for_rent: ['', [Validators.required]],
      building_configuration_id: ['', [Validators.required]],
      step: ['', [Validators.required]]
    });
  }

  initFormStep2() {
    this.addFormStep2 = this.fb.group({
      step: ['', [Validators.required]],
      seller_id: ['', [Validators.required]],
      seller_name: ['', [Validators.required]], // commer cial name and seller name
      seller_legal_name: ['', [Validators.required]], // legal name in case of entity/dev
      seller_address: ['', [Validators.required]],  // legal entiy/dev address
      seller_email: ['', [Validators.required]],
      seller_phone: ['', [Validators.required]],
      seller_company_name: ['', [Validators.required]],
      seller_fed_tax: ['', [Validators.required]],
      seller_leg_rep_name: ['', [Validators.required]],
      seller_leg_rep_phone: ['', [Validators.required]],
      seller_leg_rep_email: ['', [Validators.required]],
      seller_leg_rep_comp: ['', [Validators.required]],
      seller_leg_rep_fed_tax: ['', [Validators.required]],
      collection_seller_banks: this.fb.array([]),
      collection_seller_rep_banks: this.fb.array([]),
      seller_type: ['', [Validators.required]],
      seller_legal_entity_id: ['']
    });
  }

  setValue(key: string, value: number) {
    this.model[key] = value;
  }

  initFormStep3() {
    this.addFormStep3 = this.fb.group({
      step: ['', [Validators.required]],
      buyer_id: ['', [Validators.required]],
      buyer_name: ['', [Validators.required]], // commer cial name and seller name
      buyer_legal_name: ['', [Validators.required]], // legal name in case of entity/dev
      buyer_address: ['', [Validators.required]],  // legal entiy/dev address
      buyer_email: ['', [Validators.required]],
      buyer_phone: ['', [Validators.required]],
      buyer_company_name: ['', [Validators.required]],
      buyer_fed_tax: ['', [Validators.required]],
      buyer_leg_rep_name: ['', [Validators.required]],
      buyer_leg_rep_phone: ['', [Validators.required]],
      buyer_leg_rep_email: ['', [Validators.required]],
      buyer_leg_rep_comp: ['', [Validators.required]],
      buyer_leg_rep_fed_tax: ['', [Validators.required]],
      collection_buyer_banks: this.fb.array([]),
      collection_buyer_rep_banks: this.fb.array([]),
      buyer_type: ['', [Validators.required]],
      buyer_legal_entity_id: ['']
    });
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

      // deal_lay_date: ['', [Validators.required]],
      // deal_lay_type: ['', [Validators.required]],
      // deal_lay_percent_value: ['', [Validators.required]],
      // deal_lay_amount_value: ['', [Validators.required]],
      // deal_down_date: ['', [Validators.required]],
      // deal_down_type: ['', [Validators.required]],
      // deal_down_percent_value: ['', [Validators.required]],
      // deal_down_amount_value: ['', [Validators.required]],
      // deal_pay_date: ['', [Validators.required]],
      // deal_pay_type: ['', [Validators.required]],
      // deal_pay_percent_value: ['', [Validators.required]],
      // deal_pay_amount_value: ['', [Validators.required]],
      // deal_spe_name: ['', [Validators.required]],
      // deal_spe_date: ['', [Validators.required]],
      deal_interest_rate: [0, [Validators.required]],
      // deal_monthly_payment: ['', [Validators.required]],
      // deal_payment_date: ['', [Validators.required]],
      // deal_monthly_amount: ['', [Validators.required]],
      // deal_monthly_percentage: ['', [Validators.required]],
      deal_penality: [0, [Validators.required]]
      // payment_method_id: ['', [Validators.required]]
    });
  }


  initFormStep5() {
    this.addFormStep5 = this.fb.group({
      // step 5
      step: ['', [Validators.required]],
      comm_total_commission: ['', [Validators.required]],
      comm_total_commission_amount: ['', [Validators.required]],
      comm_shared_commission: ['', [Validators.required]],
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
          // this.setModelData(success['data']);
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
    this.patchFormStep2(data);
    this.patchFormStep3(data);
    this.patchFormStep4(data);
    this.patchFormStep5(data);
    this.setFolders(data);
  }

  patchFormStep1(data) {
    // this.model.building_id = data.building.id;
    // this.model.building.name = data.building.name;
    this.model.building = data.property.building;
    this.model.building_towers = data.property.building_towers;
    this.model.floor_num = data.property.floor_num;
    this.model.name = data.property.name;
    this.model.availabilityStatusId = data.for_sale ? this.availabilityStatus[0].id : this.availabilityStatus[1].id;
    this.model.building_configuration_id = data.property.building_configuration_id;
    this.model.building_configuration = data.property.building_configuration;
    // this.model.deal_type = data.deal_type;
    this.addFormStep1.controls.building_id.patchValue(data.property.building.id);
    this.addFormStep1.controls.building_towers_id.patchValue(data.property.building_towers.id);
    this.addFormStep1.controls.floor_num.patchValue(data.property.floor_num);
    this.addFormStep1.controls.property_id.patchValue(data.property_id);
    this.addFormStep1.controls.for_sale.patchValue(data.for_sale);
    this.addFormStep1.controls.for_rent.patchValue(data.for_rent);
    // this.addFormStep1.controls.deal_type_id.patchValue(data.deal_type_id);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep2(data) {
    this.model.seller_type = data.seller_type;
    this.addFormStep2.controls.seller_type.patchValue(data.seller_type || 1);
    if (data.seller_type != 2) {
      this.addFormStep2.controls.seller_id.patchValue(data.seller ? data.seller.id : '');
      this.addFormStep2.controls.seller_email.patchValue(data.seller ? data.seller.email : '');
      this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name ? data.seller_company_name : '');
    }
    if (data.seller_type == 2) {
      this.addFormStep2.controls.seller_legal_entity_id.patchValue(data.seller_legal_entity ? data.seller_legal_entity.id : '');
    }
    
    this.addFormStep2.controls.seller_name.patchValue(data.seller_type == 2 
      ? (data.seller_legal_entity ? data.seller_legal_entity.comm_name : '') 
      : (data.seller ? data.seller.name : ''));
    this.addFormStep2.controls.seller_legal_name.patchValue(data.seller_type == 2 
      ? (data.seller_legal_entity ? data.seller_legal_entity.legal_name : '') 
      : (data.seller_legal_name ? data.seller_legal_name : ''));
    this.addFormStep2.controls.seller_address.patchValue(data.seller_type == 2 
      ? (data.seller_legal_entity ? data.seller_legal_entity.address : '') 
      : (data.seller_address ? data.seller_address : ''));
    this.addFormStep2.controls.seller_phone.patchValue(data.seller_type == 2 
      ? (data.seller_legal_entity ? data.seller_legal_entity.phone : '') 
      : (data.seller ? data.seller.phone : ''));
    this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller_type == 2 
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
    this.setSeller(data);
  }

  patchFormStep3(data) {
    this.model.buyer_type = data.buyer_type;
    this.addFormStep3.controls.buyer_type.patchValue(data.buyer_type || 1);

    if (data.buyer_type != 2) {
      this.addFormStep3.controls.buyer_id.patchValue(data.buyer ? data.buyer.id : '');
      this.addFormStep3.controls.buyer_email.patchValue(data.buyer ? data.buyer.email : '');
      this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name ? data.buyer_company_name : '');
    }
    if (data.seller_type == 2) {
      this.addFormStep3.controls.buyer_legal_entity_id.patchValue(data.buyer_legal_entity ? data.buyer_legal_entity.id : '');
    }

    this.addFormStep3.controls.buyer_name.patchValue(data.buyer_type == 2 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.comm_name : '') 
      : (data.buyer ? data.buyer.name : ''));
    this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer_type == 2 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.legal_name : '') 
      : (data.buyer_legal_name ? data.buyer_legal_name : ''));
    this.addFormStep3.controls.buyer_address.patchValue(data.buyer_type == 2 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.address : '') 
      : (data.buyer_address ? data.buyer_address : ''));
    this.addFormStep3.controls.buyer_phone.patchValue(data.buyer_type == 2 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.phone : '') 
      : (data.buyer ? data.buyer.phone : ''));
    this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer_type == 2 
      ? (data.buyer_legal_entity ? data.buyer_legal_entity.fed_tax_pay : '') 
      : (data.buyer_fed_tax || ''));
      
    // this.addFormStep3.controls.buyer_id.patchValue(data.buyer ? data.buyer.id : '');
    // this.addFormStep3.controls.buyer_name.patchValue(data.buyer ? data.buyer.name : '');
    // this.addFormStep3.controls.buyer_legal_name.patchValue(data.buyer ? data.buyer.legal_name : '');
    // this.addFormStep3.controls.buyer_address.patchValue(data.buyer ? data.buyer.address : '');
    // this.addFormStep3.controls.buyer_email.patchValue(data.buyer ? data.buyer.email : '');
    // this.addFormStep3.controls.buyer_phone.patchValue(data.buyer ? data.buyer.phone : '');
    // this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name || '');
    // this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer_fed_tax || '');
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
    this.addFormStep4.controls.deal_purchase_date.patchValue(data.deal_purchase_date ? moment.utc(data.deal_purchase_date).toDate() : null);
    this.addFormStep4.controls.deal_price.patchValue(data.deal_price);
    // this.addFormStep4.controls.deal_lay_date.patchValue(data.deal_lay_date ? moment.utc(data.deal_lay_date).toDate() : null);
    // this.addFormStep4.controls.deal_lay_type.patchValue(data.deal_lay_type);
    // this.addFormStep4.controls.deal_lay_percent_value.patchValue(data.deal_lay_percent_value);
    // this.addFormStep4.controls.deal_lay_amount_value.patchValue(data.deal_lay_amount_value);
    // this.addFormStep4.controls.deal_down_date.patchValue(data.deal_down_date ? moment.utc(data.deal_down_date).toDate() : null);
    // this.addFormStep4.controls.deal_down_type.patchValue(data.deal_down_type);
    // this.addFormStep4.controls.deal_down_percent_value.patchValue(data.deal_down_percent_value);
    // this.addFormStep4.controls.deal_down_amount_value.patchValue(data.deal_down_amount_value);
    // this.addFormStep4.controls.deal_pay_date.patchValue(data.deal_pay_date ? moment.utc(data.deal_pay_date).toDate() : null);
    // this.addFormStep4.controls.deal_pay_type.patchValue(data.deal_pay_type);
    // this.addFormStep4.controls.deal_pay_percent_value.patchValue(data.deal_pay_percent_value);
    // this.addFormStep4.controls.deal_pay_amount_value.patchValue(data.deal_pay_amount_value);
    // this.addFormStep4.controls.deal_spe_name.patchValue(data.deal_spe_name);
    // this.addFormStep4.controls.deal_spe_date.patchValue(data.deal_spe_date ? moment.utc(data.deal_spe_date).toDate() : null);
    this.addFormStep4.controls.currency_id.patchValue(data.currency_id ? data.currency_id : 1);
    this.addFormStep4.controls.deal_interest_rate.patchValue(data.deal_interest_rate);
    // this.addFormStep4.controls.deal_payment_date.patchValue(data.deal_payment_date ? moment.utc(data.deal_payment_date).toDate() : null);
    // this.addFormStep4.controls.deal_monthly_payment.patchValue(data.deal_monthly_payment);
    this.addFormStep4.controls.deal_penality.patchValue(data.deal_penality);
    // this.addFormStep4.controls.payment_method_id.patchValue(data.payment_method_id);
    const control1 = this.addFormStep4.get('payment_choices') as FormArray;
    if (data.payment_choices) {
      data.payment_choices.forEach(x => {
        x.date = x.date ? moment.utc(x.date).toDate() : null;
        control1.push(this.fb.group(x));
      });
    }
    this.addFormStep4.controls.step.patchValue(4);
  }

  patchFormStep5(data) {
    this.addFormStep5.controls.comm_total_commission.patchValue(data.comm_total_commission);
    this.addFormStep5.controls.comm_total_commission_amount.patchValue(data.comm_total_commission_amount ? data.comm_total_commission_amount : 0);
    this.addFormStep5.controls.comm_shared_commission.patchValue(data.comm_shared_commission);
    this.addFormStep5.controls.deal_commission_agents.patchValue(data.deal_commission_agents);
    // const control = this.addFormStep5.get('deal_commission_agents') as FormArray;
    // data.deal_commission_agents.forEach(x => {
    //     control.push(this.fb.group(x));
    // });
    const control = this.addFormStep5.get('collection_agent_banks') as FormArray;
    if (data.collection_agent_banks) {
      data.collection_agent_banks.forEach(x => {
        control.push(this.fb.group(x));
      });
    }

    this.model.collection_commissions = [];
    const control1 = this.addFormStep5.get('collection_commissions') as FormArray;
    if (data.payment_choices) {
      for (let index = 0; index < data.payment_choices.length; index++) {
        const element = data.payment_choices[index];
        const element1 = data.collection_commissions[index];
        const obj = {};
        obj['id'] = data.collection_commissions.length > 0 ? data.collection_commissions[index].id : '';
        obj['name'] = element['name'];
        obj['date'] = element['date'];
        obj['payment_amount'] = element['amount'];
        obj['payment_choice_id'] = element['id'];
        obj['add_collection_commission'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].add_collection_commission : 0;
        obj['percent'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].percent : 0;
        obj['amount'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].amount : 0;
        
        obj['add_purchase_commission'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].add_purchase_commission : 0;
        obj['purchase_comm_amount'] = data.collection_commissions.length>0 && data.collection_commissions[index] ? data.collection_commissions[index].purchase_comm_amount : 0;
        
        control1.push(this.fb.group(obj));
        this.model.collection_commissions.push(obj);
      }
    }
    this.addFormStep5.controls.step.patchValue(5);
  }
// 
  setFolders(data: any) {
    this.collectionFolders = data['collection_folders'];
  }

  getProjectById(step: number) {
    if (!this.building.id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectBuilding'), 'error');
      return false;
    }
    if (!this.model.floor_num) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectFloor'), 'error');
      return false;
    }
    this.spinner.show();
    this.us.postDataApi('getProjectByIdWithCSC', { building_id: this.building.id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.buildingData = success['data'];
          this.tab = step + 1;
        }, error => {
          this.spinner.hide();
        }
      );
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
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSomeText'), 'error');
      return false;
    }

    this.showBuilding = false;
    this.buildingLoading = true;

    const input = new FormData();
    input.append('keyword', keyword);

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
    // this.scrollToTower.nativeElement.scrollTop = this.scrollToTower.nativeElement.scrollHeight;
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
            // this.selectedTower = bt[i];
            this.model.building_towers = bt[i];
          }
        }
      }
    }
  }

  // setFloor(floor_num: any) {
  //   this.model.floor_num = floor_num;
  // }

  tagBuilding() {

    const input = new FormData();
    if (this.parameter.property_id) {
      input.append('property_id', this.parameter.property_id);
    }
    input.append('building_id', this.building.id);

    this.spinner.show();
    this.us.postDataApi('tagBuilding', input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal({
            html: this.translate.instant('message.success.submittedSccessfully') + '<br>' +
            this.translate.instant('message.error.notifiedWhenAdminReview'),
            type: 'success'
          });
          if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
            this.router.navigate(['/dashboard/properties/view-properties']);
          }
        }, error => {
          this.spinner.hide();
        }
      );
  }

  buildingRequest() {

    if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillCompleteDevloperInformation'), 'error');
      return false;
    }

    if (!this.latitude && !this.longitude) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocationFromTheDropdownList'), 'error');
      return false;
    }

    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    if (!this.building.lat || !this.building.lng) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocation'), 'error');
      return false;
    }
    this.spinner.show();
    this.us.postDataApi('buildingRequest', this.building)
      .subscribe(
        success => {
          this.spinner.hide();
          // swal('Submitted successfully.',
          //   'You will be notified once your property will be reviewed by them, you can view status in your properties.',
          //   'success');
          // if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
          //   this.router.navigate(['/dashboard/properties/view-properties']);
          // }
          // update tab=1 because we need to save property details, after adding property details
          // data collector will create project template and then edit property and tag that
          // particular project
          swal({
            html: 'Success' + '<br>' +
            this.translate.instant('message.success.dataCollectorWillLinkPropertyToBuilding'),
            type: 'success'
          });
          // this.tab = 1;
        }, error => {
          this.spinner.hide();
        }
      );
  }


  getProperties($event) {
    $event.stopPropagation();
    this.model.floor_num = $event.target.value;
    if (!this.model.building_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectBuilding'), 'error');
      return;
    } else if (!this.model.building_towers.id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectFloor'), 'error');
      return;
    } else if (!this.model.floor_num) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFloor'), 'error');
      return;
    }
    const input = {
      'building_id' : this.model.building_id,
      'tower_id' : this.model.building_towers_id,
      'floor_num' : this.model.floor_num
    };
    this.us.postDataApi('getProperties', input)
      .subscribe(
        success => {
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
      bank_name: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      swift: ['', [Validators.required]],
      currency_id: ['', [Validators.required]]
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
      this.getPaymentChoices.push(fb);
    }else {
      this.showMonthlyInput = true;
      // return this.fb.group({
      //   name: ['', [Validators.required]],
      //   date: ['', [Validators.required]],
      //   percent: ['', [Validators.required]],
      //   amount: ['', [Validators.required]]
      // });
    }
    this.selectedPaymentChoice.nativeElement.value = '';
  }

  addMonthlyInputs($event) {
    this.num_of_months = $event.target.value;
    $event.stopPropagation();
    for (let index = 0; index < this.num_of_months; index++) {
      this.getPaymentChoices.push(this.newMonthlyPaymentsChoice(index));
    }
  }

  addMonthlyDates($event) {
    const date = this.addFormStep4.get('monthly_date').value;
    const pchoice = this.getPaymentChoices.value;
    for (let index = 0; index < pchoice.length; index++) {
      const element = pchoice[index];
      if (element.payment_choice_id == 5) {
        element['date'] = moment.utc(date).toDate();
      }
    }
    this.addFormStep4.get('payment_choices').patchValue(pchoice);
  }

  addMonthlyAmounts() {
    const monthly_amount = this.addFormStep4.get('monthly_amount').value;
    const pchoice = this.getPaymentChoices.value;
    for (let index = 0; index < pchoice.length; index++) {
      const element = pchoice[index];
      if (element.payment_choice_id == 5) {
        element['amount'] = monthly_amount;
      }
    }
    this.addFormStep4.get('payment_choices').patchValue(pchoice);
  }

  findMonthlyInstallments() {
    this.num_of_months = this.addFormStep4.get('num_of_months').value;
    const monthly_amount = this.addFormStep4.get('monthly_amount').value;
    const monthly_date = this.addFormStep4.get('monthly_date').value;
    if (!this.num_of_months || !monthly_amount || !monthly_date) {
      swal(this.translate.instant('swal.error'), 'Please enter Number of months, Monthly date, and Monthly amount to be paid', 'error');
      return false;
    }
    for (let index = 0; index < this.num_of_months; index++) {
      this.getPaymentChoices.push(this.newMonthlyPaymentsChoice(index));
    }
  }

  newMonthlyPaymentsChoice(index: number): FormGroup {
    const monthly_amount = this.addFormStep4.get('monthly_amount').value;
    let monthly_date = this.addFormStep4.get('monthly_date').value;
    const price = this.addFormStep4.get('deal_price').value;
    const percent = (price / monthly_amount);
    let name = '';
    monthly_date = moment.utc(moment(monthly_date).add(index, 'months').format('YYYY-MM-DD')).toDate();
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

  removePaymentChoice($event: Event, item: any, i: number) {
    $event.stopPropagation();
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
    // $event.stopPropagation();
    // if () {
    const input = {
      step: 6,
    }
    const folder_docs = {
      display_name: '',
      name: ''
    }
    // this.folders.push(this.newFolder());
    // this.us.postDataApi('addCollection', formdata).subscribe(success => {
    //   this.tab = tab + 1;
    //   this.spinner.hide();
    //   this.model.id = success['data'].id;
    //   if (tab == 6) {
    //     swal({
    //       html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
    //     });
    //   }
    //   this.parameter.property_id = success['data'].id;
    // }, error => {
    //   this.spinner.hide();
    // });
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
    // }
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
    // this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
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
          swal({
            html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
          });
          // this.router.navigate(['dashboard/collections/view-collections']);
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addDocs() {

    if (!this.docsName) {
      swal(this.translate.instant('swal.error'), 'Please enter document name.', 'error');
      return;
    }
    if (!this.docFile) {
      swal(this.translate.instant('swal.error'), 'Please choose the document file.', 'error');
      return;
    }
    this.docs.push({name: this.docsName, display_name: this.docFile});
    this.docFile = ''; this.docsName = '';
    this.docsFile.nativeElement.value = '';
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
    if ($event) {
      $event.stopPropagation();
    }
    this.agents.push(this.newAgent());
  }

  get agents(): FormArray {
    return this.addFormStep5.get('deal_commission_agents') as FormArray;
  }

  newAgent(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      fed_tax_payer_reg: ['', [Validators.required]]
    });
  }

  onSelect(e) {
    // this.leadData.planning_to_buy = e;
  }

  
  getBothBroker(keyword: string) {
    this.spinner.show();
    // if (property) { this.property = property; }
    const input = { keyword: '' };
    input.keyword = keyword;
    this.us.postDataApi('getBothBroker', input).subscribe(r => {
      this.spinner.hide();
      if (keyword === '') { this.linkExtBrokerModal.nativeElement.click(); }
      this.allExtBrokers = r['data'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  setAgent(item) {
    this.model.buyer_id = item.id;
    this.model.buyer = item;
    const ftpr = this.addFormStep5.get('deal_commission_agents').value;
    const dca = [{
      name: item.name,
      fed_tax_payer_reg: ftpr.length > 0 ? ftpr[0].fed_tax_payer_reg : ''
    }];
    
    this.addFormStep5.controls.deal_commission_agents.patchValue(dca);
    
    this.closeExtBrokerModal.nativeElement.click();
  }

  unsetAgent(item) {
    if (this.tab == 2) {
      this.model.seller_id = '';
      this.model.seller = new Seller();
      this.addFormStep2.controls.seller_id.patchValue('');
      this.addFormStep2.controls.seller_name.patchValue('');
      this.addFormStep2.controls.seller_email.patchValue('');
      this.addFormStep2.controls.seller_phone.patchValue('');
    } else {
      this.model.buyer_id = '';
      this.model.buyer = new Seller();
      this.addFormStep3.controls.buyer_id.patchValue('');
      this.addFormStep3.controls.buyer_name.patchValue('');
      this.addFormStep3.controls.buyer_email.patchValue('');
      this.addFormStep3.controls.buyer_phone.patchValue('');
    }
    this.closeLinkUserModal.nativeElement.click();
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
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  setSeller(item) {
    if (this.tab == 2) {
      this.addFormStep2.reset();
      this.model.seller_id = item.id;
      this.model.seller = item;

      if (this.model.seller_type == 1) {
        this.addFormStep2.controls.seller_id.patchValue(item.id);
        this.addFormStep2.controls.seller_name.patchValue(this.model.seller_type == 1 ? item.name : item.comm_name);
        this.addFormStep2.controls.seller_email.patchValue(this.model.seller_type == 1 ? item.email : '');
        this.addFormStep2.controls.seller_phone.patchValue(this.model.seller_type == 1 ? item.phone : item.phone);  
      }

      if (this.model.seller_type == 2) {
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
      
      if (this.model.seller_type == 3) {   
        this.addFormStep2.controls.seller_id.patchValue(item.id);
        this.addFormStep2.controls.seller_name.patchValue(item.legal_entity ? item.legal_entity.comm_name : '');
        this.addFormStep2.controls.seller_legal_name.patchValue(item.legal_entity ? item.legal_entity.legal_name : '');
        this.addFormStep2.controls.seller_fed_tax.patchValue(item.legal_entity ? item.legal_entity.fed_tax_pay : '');
        this.addFormStep2.controls.seller_phone.patchValue(item.legal_entity ? item.legal_entity.phone : '');
        this.addFormStep2.controls.seller_address.patchValue(item.legal_entity ? item.legal_entity.address : '');
        this.addFormStep2.controls.seller_leg_rep_name.patchValue(item.name);
        this.addFormStep2.controls.seller_leg_rep_phone.patchValue(item.phone);
        this.addFormStep2.controls.seller_leg_rep_email.patchValue(item.email);
        this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(item.fed_tax_pay);
        const control = this.addFormStep2.get('collection_seller_banks') as FormArray;
        if (item.legal_entity && item.legal_entity.legal_entity_banks) {
          item.legal_entity.legal_entity_banks.forEach(x => {
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
      this.addFormStep3.reset();
      this.model.buyer_id = item.id;
      this.model.buyer = item;

      
      if (this.model.buyer_type == 1) {
        this.addFormStep3.controls.buyer_id.patchValue(item.id);
        this.addFormStep3.controls.buyer_name.patchValue(this.model.buyer_type == 1 ? item.name : item.comm_name);
        this.addFormStep3.controls.buyer_email.patchValue(this.model.buyer_type == 1 ? item.email : '');
        this.addFormStep3.controls.buyer_phone.patchValue(this.model.buyer_type == 1 ? item.phone : item.phone);  
      }

      if (this.model.buyer_type == 2) {
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
      
      if (this.model.buyer_type == 3) {   
        this.addFormStep3.controls.buyer_id.patchValue(item.id);
        this.addFormStep3.controls.buyer_name.patchValue(item.legal_entity ? item.legal_entity.comm_name : '');
        this.addFormStep3.controls.buyer_legal_name.patchValue(item.legal_entity ? item.legal_entity.legal_name : '');
        this.addFormStep3.controls.buyer_fed_tax.patchValue(item.legal_entity ? item.legal_entity.fed_tax_pay : '');
        this.addFormStep3.controls.buyer_phone.patchValue(item.legal_entity ? item.legal_entity.phone : '');
        this.addFormStep3.controls.buyer_address.patchValue(item.legal_entity ? item.legal_entity.address : '');
        this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.name);
        this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.phone);
        this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.email);
        this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(item.fed_tax_pay);
        const control = this.addFormStep3.get('collection_buyer_banks') as FormArray;
        if (item.legal_entity && item.legal_entity.legal_entity_banks) {
          item.legal_entity.legal_entity_banks.forEach(x => {
            control.push(this.fb.group(x));
          });
        }
        const control1 = this.addFormStep3.get('collection_buyer_rep_banks') as FormArray;
        if (item.legal_rep_banks) {
          item.legal_rep_banks.forEach(x => {
            control1.push(this.fb.group(x));
          });
        }
      }

      // this.addFormStep3.controls.buyer_id.patchValue(item.id);
      // this.addFormStep3.controls.buyer_name.patchValue(item.name);
      // this.addFormStep3.controls.buyer_email.patchValue(item.email);
      // this.addFormStep3.controls.buyer_phone.patchValue(item.phone);

      // this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.name);
      // this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.phone);
      // this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.email);
    }
    this.closeLinkUserModal.nativeElement.click();
  }

  unsetSeller(item) {
    if (this.tab == 2) {
      this.addFormStep2.reset();
      this.model.seller_id = '';
      this.model.seller = new Seller();
      this.addFormStep2.controls.seller_id.patchValue('');
      this.addFormStep2.controls.seller_name.patchValue('');
      this.addFormStep2.controls.seller_email.patchValue('');
      this.addFormStep2.controls.seller_phone.patchValue('');
      
      this.addFormStep2.controls.seller_leg_rep_name.patchValue('');
      this.addFormStep2.controls.seller_leg_rep_email.patchValue('');
      this.addFormStep2.controls.seller_leg_rep_phone.patchValue('');
    } else {
      this.addFormStep3.reset();
      this.model.buyer_id = '';
      this.model.buyer = new Seller();
      this.addFormStep3.controls.buyer_id.patchValue('');
      this.addFormStep3.controls.buyer_name.patchValue('');
      this.addFormStep3.controls.buyer_email.patchValue('');
      this.addFormStep3.controls.buyer_phone.patchValue('');
      
      this.addFormStep2.controls.buyer_leg_rep_name.patchValue('');
      this.addFormStep2.controls.buyer_leg_rep_email.patchValue('');
      this.addFormStep2.controls.buyer_leg_rep_phone.patchValue('');
    }
    this.closeLinkUserModal.nativeElement.click();
  }

  // getAmount(key: string, key1: string, key2: string) {
  //   const price = this.addFormStep4.get(key).value;
  //   const percent = this.addFormStep4.get(key1).value;
  //   console.log(price, percent);
  //   const amount = Math.round((percent * price) / 100);
  //   this.addFormStep4.controls[key2].patchValue(amount);
  // }

  // getPercentage(key: string, key1: string, key2: string) {
  //   const price = this.addFormStep4.get(key).value;
  //   const amount = this.addFormStep4.get(key1).value;
  //   console.log(price, amount);
  //   const percent = (amount * 100) / price;
  //   this.addFormStep4.controls[key2].patchValue(percent);
  // }

  getAmount(index: number) {
    const price = this.addFormStep4.get('deal_price').value;
    if (!price || price == 0) {
      swal('Error', 'Please enter price', 'error');
      return;
    }
    const pcArray = this.addFormStep4.get('payment_choices').value;
    const percent = pcArray[index].percent;
    const amount = Math.round((percent * price) / 100);
    pcArray[index].amount = amount;
    this.addFormStep4.controls['payment_choices'].patchValue(pcArray);
  }

  getPercentage(index: number) {
    const price = this.addFormStep4.get('deal_price').value;
    if (!price || price == 0) {
      swal('Error', 'Please enter price', 'error');
      return;
    }
    const pcArray = this.addFormStep4.get('payment_choices').value;
    const amount = pcArray[index].amount;
    const percent = (amount * 100) / price;
    pcArray[index].percent = percent;
    this.addFormStep4.controls['payment_choices'].patchValue(pcArray);
  }

  getCollAmount(percent: number, index: number, payment_amount: number) {
    const amount = Math.round((percent * payment_amount) / 100);
    const pcArray = this.addFormStep5.get('collection_commissions').value;
    pcArray[index].amount = amount;
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getCollPercentage(amount: number, index: number, payment_amount: number) {
    const pcArray = this.addFormStep5.get('collection_commissions').value;
    const percent = (amount * 100) / payment_amount;
    pcArray[index].percent = percent;
    this.addFormStep5.controls['collection_commissions'].patchValue(pcArray);
  }

  getMonthlyPerAndAmount() {
    const price = this.addFormStep4.get('deal_price').value;
    const numOfInstallments = this.addFormStep4.get('deal_monthly_payment').value;
    const monthlyAmount = Math.round(price / numOfInstallments);
    const percent = (monthlyAmount * 100) / price;
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
      if (!formdata['building_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectBuilding'), 'error');
        return;
      } else if (!formdata['building_towers_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectFloor'), 'error');
        return;
      } else if (!formdata['floor_num']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFloor'), 'error');
        return;
      } else if (!formdata['property_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseApartment'), 'error');
        return;
      } else if (!formdata['building_configuration_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseApartment'), 'error');
        return;
      }
      // else if (!formdata['deal_type_id']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseDealType'), 'error');
      //   return;
      // }
    }

    if (this.model.step == 2) {
      formdata['seller_type'] = this.model.seller_type;
       if (!formdata['seller_fed_tax']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        return;
      }
      // else if (!formdata['collection_seller_banks'] || formdata['collection_seller_banks'].length < 1) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
      //   return;
      // }
      if (this.model.seller_type == 1 || this.model.seller_type == 3) {
        if (!formdata['seller_id']) {
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseSeller'), 'error');
          return;
        }
      } 
      if (this.model.seller_type == 1) {
        if (!formdata['seller_company_name']) {
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
          return;
        }
      }
      if (this.model.seller_type != 1) {
        if (!formdata['seller_leg_rep_name'] || !formdata['seller_leg_rep_phone'] || !formdata['seller_leg_rep_email'] || !formdata['seller_leg_rep_fed_tax']) {
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillLegalRepInfo'), 'error');
          // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseSeller'), 'error');
          return;
        }
        // else if (!formdata['seller_leg_rep_phone']) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
        //   return;
        // } else if (!formdata['seller_leg_rep_email']) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        //   return;
        // }  
      }
    }

    if (this.model.step == 3) {
      formdata['buyer_type'] = this.model.buyer_type;
       if (!formdata['buyer_fed_tax']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        return;
      }
      // else if (!formdata['collection_buyer_banks'] || formdata['collection_buyer_banks'].length < 1) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
      //   return;
      // }
      if (this.model.buyer_type == 1 || this.model.buyer_type == 3) {
        if (!formdata['buyer_id']) {
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseBuyer'), 'error');
          return;
        }
      } 
      if (this.model.buyer_type == 1) {
        if (!formdata['buyer_company_name']) {
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
          return;
        }
      }
      if (this.model.buyer_type != 1) {
        if (!formdata['buyer_leg_rep_name'] || !formdata['buyer_leg_rep_phone'] || !formdata['buyer_leg_rep_email'] || !formdata['buyer_leg_rep_fed_tax']) {
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillLegalRepInfo'), 'error');
          // swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseSeller'), 'error');
          return;
        }
        // else if (!formdata['seller_leg_rep_phone']) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
        //   return;
        // } else if (!formdata['seller_leg_rep_email']) {
        //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        //   return;
        // }  
      }
    }

    // if (this.model.step == 3) {
    //   if (!formdata['buyer_id']) {
    //     swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseBuyer'), 'error');
    //     return;
    //   } else if (!formdata['buyer_company_name']) {
    //     swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
    //     return;
    //   } else if (!formdata['buyer_fed_tax']) {
    //     swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
    //     return;
    //   } else if (!formdata['collection_buyer_banks'] || formdata['collection_buyer_banks'].length < 1) {
    //     swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
    //     return;
    //   }
    // }

    if (this.model.step == 4) {
      if (!formdata['deal_purchase_date']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPurchaseDate'), 'error');
        return;
      } else if (!formdata['deal_price']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPrice'), 'error');
        return;
      }
      // else if (!formdata['deal_lay_date'] 
      // // || !formdata['deal_lay_type'] 
      //   || !formdata['deal_lay_percent_value'] || !formdata['deal_lay_amount_value']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLayawayPayment'), 'error');
      //   return;
      // } else if (!formdata['deal_down_date'] || 
      // // !formdata['deal_down_type'] ||
      //     !formdata['deal_down_percent_value'] || !formdata['deal_down_amount_value']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterDownPayment'), 'error');
      //   return;
      // } else if (!formdata['deal_pay_date'] || 
      // // !formdata['deal_pay_type'] ||
      //     !formdata['deal_pay_percent_value'] || !formdata['deal_pay_amount_value']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPaymentUponDelivery'), 'error');
      //   return;
      // } else if (!formdata['deal_spe_name'] || !formdata['deal_spe_date']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSpecialPayment'), 'error');
      //   return;
      // } else if (!formdata['deal_monthly_payment']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterMonthlyPayment'), 'error');
      //   return;
      // } 
      else if (!formdata['payment_choices']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChoosePayments'), 'error');
        return;
      }
      // else if (!formdata['deal_interest_rate']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterInterestRate'), 'error');
      //   return;
      // } 
      // else if (!formdata['deal_penality']) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPenality'), 'error');
      //   return;
      // }
    }

    if (this.model.step == 5) {
      if (!formdata['comm_total_commission']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSozuCommission'), 'error');
        return;
      } else if (!formdata['comm_total_commission_amount']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSozuCommission'), 'error');
        return;
      } else if (!formdata['comm_shared_commission']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterAgentCommission'), 'error');
        return;
      } else if (!formdata['deal_commission_agents']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        return;
      }
      const collection_commissions = formdata['collection_commissions'];
      delete formdata['collection_commissions'];
      collection_commissions.forEach(element => {
        element.add_collection_commission = element.add_collection_commission ? 1 : 0
        element.add_purchase_commission = element.add_purchase_commission ? 1 : 0
      });
      formdata['collection_commissions'] = collection_commissions;
    }

    this.spinner.show();
    this.us.postDataApi('addCollection', formdata)
      .subscribe(
        success => {
          this.tab = tab + 1;
          this.spinner.hide();
          this.model.id = success['data'].id;
          // if (tab == 4) {
            // for payment choices
            this.patchFormData(success['data']);
          // }
          if (tab == 6) {
            swal({
              html: this.translate.instant('message.success.submittedSccessfully'), type: 'success'
            });
          }
          this.parameter.property_id = success['data'].id;
        }, error => {
          this.spinner.hide();
        }
      );
  }

}
