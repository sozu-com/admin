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
  file360: FileUpload;
  amenMoreImg: FileUpload;
  amen360Img: FileUpload;
  amenVideo: VideoUpload;

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalOpen360Img') modalOpen360Img: ElementRef;
  @ViewChild('modalClose360Img') modalClose360Img: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('modalAmenClose') modalAmenClose: ElementRef;
  @ViewChild('modalAmenOpen') modalAmenOpen: ElementRef;
  @ViewChild('modalAddMoreVideos') modalAddMoreVideos: ElementRef;
  @ViewChild('modalVideosClose') modalVideosClose: ElementRef;
  @ViewChild('linkUserModal') linkUserModal: ElementRef;
  @ViewChild('closeLinkUserModal') closeLinkUserModal: ElementRef;
  @ViewChild('linkExtBrokerModal') linkExtBrokerModal: ElementRef;
  @ViewChild('closeExtBrokerModal') closeExtBrokerModal: ElementRef;

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

  folderName: string;
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
  keyword: string;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
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
    this.model = new Collection();
    this.model.building = new Building();
    this.model.building_towers = new Towers();
    this.setDatePickerLocale();
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();

    this.initFormStep1();
    this.initFormStep2();
    this.initFormStep3();
    this.initFormStep4();
    this.initFormStep5();
    this.initFormStep6();

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
    this.getPaymentMethods();
    this.getDealTypes();
    this.getCurrencies();
    this.searchControl = new FormControl();
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
      dateFormat: 'mm/dd/yy',
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
      deal_type_id: ['', [Validators.required]],
      step: ['', [Validators.required]]
    });
  }

  initFormStep2() {
    this.addFormStep2 = this.fb.group({
      step: ['', [Validators.required]],
      seller_id: ['', [Validators.required]],
      seller_name: ['', [Validators.required]],
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
      is_seller_legal_entity: ['', [Validators.required]]
    });
  }

  setValue(key: string, value: number) {
    this.model[key] = value;
  }

  initFormStep3() {
    this.addFormStep3 = this.fb.group({
      step: ['', [Validators.required]],
      buyer_id: ['', [Validators.required]],
      buyer_name: ['', [Validators.required]],
      buyer_email: ['', [Validators.required]],
      buyer_phone: ['', [Validators.required]],
      buyer_company_name: ['', [Validators.required]],
      buyer_fed_tax: ['', [Validators.required]],
      buyer_leg_rep_name: ['', [Validators.required]],
      buyer_leg_rep_phone: ['', [Validators.required]],
      buyer_leg_rep_email: ['', [Validators.required]],
      buyer_leg_rep_comp: ['', [Validators.required]],
      buyer_leg_rep_fed_tax: ['', [Validators.required]],
      collection_buyer_banks: this.fb.array([])
    });
  }


  initFormStep4() {
    this.addFormStep4 = this.fb.group({
      step: ['', [Validators.required]],
      deal_purchase_date: ['', [Validators.required]],
      deal_price: ['', [Validators.required]],
      deal_lay_date: ['', [Validators.required]],
      deal_lay_type: ['', [Validators.required]],
      deal_lay_percent_value: ['', [Validators.required]],
      deal_lay_amount_value: ['', [Validators.required]],
      deal_down_date: ['', [Validators.required]],
      deal_down_type: ['', [Validators.required]],
      deal_down_percent_value: ['', [Validators.required]],
      deal_down_amount_value: ['', [Validators.required]],
      deal_pay_date: ['', [Validators.required]],
      deal_pay_type: ['', [Validators.required]],
      deal_pay_percent_value: ['', [Validators.required]],
      deal_pay_amount_value: ['', [Validators.required]],
      deal_spe_name: ['', [Validators.required]],
      deal_spe_date: ['', [Validators.required]],
      deal_interest_rate: ['', [Validators.required]],
      deal_monthly_payment: ['', [Validators.required]],
      deal_payment_date: ['', [Validators.required]],
      deal_penality: ['', [Validators.required]],
      payment_method_id: ['', [Validators.required]]
    });
  }


  initFormStep5() {
    this.addFormStep5 = this.fb.group({
      // step 5
      step: ['', [Validators.required]],
      comm_total_commission: ['', [Validators.required]],
      comm_shared_commission: ['', [Validators.required]],
      // deal_commission_agents: ['', [Validators.required]]
      deal_commission_agents: this.fb.array([])
    });
    // if (this.model.id === '0') {
      this.addAgent('');
    // }
  }


  initFormStep6() {
    this.addFormStep6 = this.fb.group({
      // step 6
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


  patchFormData(data) {
    this.patchFormStep1(data);
    this.patchFormStep2(data);
    this.patchFormStep3(data);
    this.patchFormStep4(data);
    this.patchFormStep5(data);
  }

  patchFormStep1(data) {
    // this.model.building_id = data.building.id;
    // this.model.building.name = data.building.name;
    this.model.building = data.property.building;
    this.model.building_towers = data.property.building_towers;
    this.model.floor_num = data.property.floor_num;
    this.model.name = data.property.name;
    this.model.deal_type = data.deal_type;
    this.addFormStep1.controls.building_id.patchValue(data.property.building.id);
    this.addFormStep1.controls.building_towers_id.patchValue(data.property.building_towers.id);
    this.addFormStep1.controls.floor_num.patchValue(data.property.floor_num);
    this.addFormStep1.controls.property_id.patchValue(data.property_id);
    this.addFormStep1.controls.deal_type_id.patchValue(data.deal_type_id);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep2(data) {
    this.addFormStep2.controls.seller_id.patchValue(data.seller ? data.seller.id : '');
    this.addFormStep2.controls.seller_name.patchValue(data.seller ? data.seller.name : '');
    this.addFormStep2.controls.seller_email.patchValue(data.seller ? data.seller.email : '');
    this.addFormStep2.controls.seller_phone.patchValue(data.seller ? data.seller.phone : '');
    this.addFormStep2.controls.seller_company_name.patchValue(data.seller_company_name || '');
    this.addFormStep2.controls.seller_fed_tax.patchValue(data.seller_fed_tax || '');
    this.addFormStep2.controls.seller_leg_rep_name.patchValue(data.seller_leg_rep_name || '');
    this.addFormStep2.controls.seller_leg_rep_phone.patchValue(data.seller_leg_rep_phone || '');
    this.addFormStep2.controls.seller_leg_rep_email.patchValue(data.seller_leg_rep_email || '');
    this.addFormStep2.controls.seller_leg_rep_comp.patchValue(data.seller_leg_rep_comp || '');
    this.addFormStep2.controls.seller_leg_rep_fed_tax.patchValue(data.seller_leg_rep_fed_tax || '');
    this.addFormStep2.controls.step.patchValue(2);
    const control = this.addFormStep2.get('collection_seller_banks') as FormArray;
    data.collection_seller_banks.forEach(x => {
        control.push(this.fb.group(x));
    });
  }

  patchFormStep3(data) {
    this.addFormStep3.controls.buyer_id.patchValue(data.buyer ? data.buyer.id : '');
    this.addFormStep3.controls.buyer_name.patchValue(data.buyer ? data.buyer.name : '');
    this.addFormStep3.controls.buyer_email.patchValue(data.buyer ? data.buyer.email : '');
    this.addFormStep3.controls.buyer_phone.patchValue(data.buyer ? data.buyer.phone : '');
    this.addFormStep3.controls.buyer_company_name.patchValue(data.buyer_company_name || '');
    this.addFormStep3.controls.buyer_fed_tax.patchValue(data.buyer_fed_tax || '');
    this.addFormStep3.controls.buyer_leg_rep_name.patchValue(data.buyer_leg_rep_name || '');
    this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(data.buyer_leg_rep_phone || '');
    this.addFormStep3.controls.buyer_leg_rep_email.patchValue(data.buyer_leg_rep_email || '');
    this.addFormStep3.controls.buyer_leg_rep_comp.patchValue(data.buyer_leg_rep_comp || '');
    this.addFormStep3.controls.buyer_leg_rep_fed_tax.patchValue(data.buyer_leg_rep_fed_tax || '');
    this.addFormStep3.controls.step.patchValue(2);
    const control = this.addFormStep3.get('collection_buyer_banks') as FormArray;
    data.collection_buyer_banks.forEach(x => {
        control.push(this.fb.group(x));
    });
  }

  patchFormStep4(data) {
    this.addFormStep4.controls.deal_purchase_date.patchValue(data.deal_purchase_date ? moment.utc(data.deal_purchase_date).toDate() : null);
    this.addFormStep4.controls.deal_price.patchValue(data.deal_price);
    this.addFormStep4.controls.deal_lay_date.patchValue(data.deal_lay_date ? moment.utc(data.deal_lay_date).toDate() : null);
    this.addFormStep4.controls.deal_lay_type.patchValue(data.deal_lay_type);
    this.addFormStep4.controls.deal_lay_percent_value.patchValue(data.deal_lay_percent_value);
    this.addFormStep4.controls.deal_lay_amount_value.patchValue(data.deal_lay_amount_value);
    this.addFormStep4.controls.deal_down_date.patchValue(data.deal_down_date ? moment.utc(data.deal_down_date).toDate() : null);
    this.addFormStep4.controls.deal_down_type.patchValue(data.deal_down_type);
    this.addFormStep4.controls.deal_down_percent_value.patchValue(data.deal_down_percent_value);
    this.addFormStep4.controls.deal_down_amount_value.patchValue(data.deal_down_amount_value);
    this.addFormStep4.controls.deal_pay_date.patchValue(data.deal_pay_date ? moment.utc(data.deal_pay_date).toDate() : null);
    this.addFormStep4.controls.deal_pay_type.patchValue(data.deal_pay_type);
    this.addFormStep4.controls.deal_pay_percent_value.patchValue(data.deal_pay_percent_value);
    this.addFormStep4.controls.deal_pay_amount_value.patchValue(data.deal_pay_amount_value);
    this.addFormStep4.controls.deal_spe_name.patchValue(data.deal_spe_name);
    this.addFormStep4.controls.deal_spe_date.patchValue(data.deal_spe_date ? moment.utc(data.deal_spe_date).toDate() : null);
    this.addFormStep4.controls.deal_interest_rate.patchValue(data.deal_interest_rate);
    this.addFormStep4.controls.deal_payment_date.patchValue(data.deal_payment_date ? moment.utc(data.deal_payment_date).toDate() : null);
    this.addFormStep4.controls.deal_monthly_payment.patchValue(data.deal_monthly_payment);
    this.addFormStep4.controls.deal_penality.patchValue(data.deal_penality);
    this.addFormStep4.controls.payment_method_id.patchValue(data.payment_method_id);
    this.addFormStep4.controls.step.patchValue(4);
  }

  patchFormStep5(data) {
    this.addFormStep5.controls.comm_total_commission.patchValue(data.comm_total_commission);
    this.addFormStep5.controls.comm_shared_commission.patchValue(data.comm_shared_commission);
    this.addFormStep5.controls.deal_commission_agents.patchValue(data.deal_commission_agents);
    // const control = this.addFormStep5.get('deal_commission_agents') as FormArray;
    // data.deal_commission_agents.forEach(x => {
    //     control.push(this.fb.group(x));
    // });
    this.addFormStep5.controls.step.patchValue(5);
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

  addPropertyDetails() {
    this.model.property_quantity_details.push(JSON.parse(JSON.stringify(this.details)));
    this.details = new PropertyDetails;
  }

  checkEmptyDetails() {
    for (const item of this.details) {
      if (item == '') {
        return false;
      }
    }
    return true;
  }

  removeDetails(i: any) {
    this.model.property_quantity_details.splice(i, 1);
  }

  clickOnSale() {
    // console.log(this.model.for_sale);
  }

  onSelectVideo(event) {

  }

  onEnteringNumOfProperty(e: any) {
    // this.property_names = Array(e).fill(1);
    this.property_names = [];
    for (let index = 0; index < e; index++) {
      const pn = { name: 0 };
      pn.name = index;
      this.property_names.push(pn);
    }
  }

  setPropertyName(value: string, index: number) {
    this.property_names[index] = value;
  }


  getProperties($event) {
    console.log('qqqqq', $event.target.value)
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
        this.model.deal_price = p.min_price;
        this.addFormStep4.controls.deal_price.patchValue(p.min_price);
//         for_sale: 1
// for_rent: 0
// for_hold: 0
        // this.addFormStep1.controls.deal_type_id.patchValue(p.min_price);
      }
    })
  }

  addSellerBank($event) {
    $event.stopPropagation();
    this.collectionSellerBanks.push(this.newSellerBanks());
  }

  get collectionSellerBanks(): FormArray {
    return this.addFormStep2.get('collection_seller_banks') as FormArray;
  }

  newSellerBanks(): FormGroup {
    return this.fb.group({
      account_number: ['', [Validators.required]],
      swift: ['', [Validators.required]],
      currency_id: ['', [Validators.required]]
    });
  }

  removeSellerBank($event: Event, i: number) {
    $event.stopPropagation();
    this.collectionSellerBanks.removeAt(i);
  }

  // buyer bank
  addBuyerBank($event) {
    $event.stopPropagation();
    this.collectionBuyerBanks.push(this.newBuyerBanks());
  }

  get collectionBuyerBanks(): FormArray {
    return this.addFormStep3.get('collection_buyer_banks') as FormArray;
  }

  newBuyerBanks(): FormGroup {
    return this.fb.group({
      account_number: ['', [Validators.required]],
      swift: ['', [Validators.required]],
      currency_id: ['', [Validators.required]]
    });
  }

  removeBuyerBank($event: Event, i: number) {
    $event.stopPropagation();
    this.collectionBuyerBanks.removeAt(i);
  }
  // end buyer bank

  // folder
  addFolder() {
    // $event.stopPropagation();
    // if () {
     this.folders.push(this.newFolder());
     this.closeModal();
    // }
  }

  closeModal() {
    this.modalClose.nativeElement.click();
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
    console.log(ftpr);
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
    const input = { name: '', is_user_legal_entity: 0 };
    input.name = keyword ? keyword : '';
    if (this.tab == 2 && this.model.is_seller_legal_entity) {
     input.is_user_legal_entity = this.model.is_seller_legal_entity;
    }
    if (this.tab == 3 && this.model.is_buyer_legal_entity) {
     input.is_user_legal_entity = this.model.is_buyer_legal_entity;
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
      console.log(item);
      this.model.seller_id = item.id;
      this.model.seller = item;
      this.addFormStep2.controls.seller_id.patchValue(item.id);
      this.addFormStep2.controls.seller_name.patchValue(item.name);
      this.addFormStep2.controls.seller_email.patchValue(item.email);
      this.addFormStep2.controls.seller_phone.patchValue(item.phone);

      if (this.model.is_seller_legal_entity) {   
        // seller_company_name: ['', [Validators.required]],
        // seller_fed_tax: ['', [Validators.required]],
        // seller_leg_rep_comp: ['', [Validators.required]],
        // seller_leg_rep_fed_tax: ['', [Validators.required]],   
        this.addFormStep2.controls.seller_leg_rep_name.patchValue(item.name);
        this.addFormStep2.controls.seller_leg_rep_phone.patchValue(item.phone);
        this.addFormStep2.controls.seller_leg_rep_email.patchValue(item.email);
        // this.addFormStep2.controls.seller_phone.patchValue(item.phone);
        // this.addFormStep2.controls.seller_phone.patchValue(item.phone);
        // this.addFormStep2.controls.seller_phone.patchValue(item.phone);
      }
    } else {
      this.model.buyer_id = item.id;
      this.model.buyer = item;
      this.addFormStep3.controls.buyer_id.patchValue(item.id);
      this.addFormStep3.controls.buyer_name.patchValue(item.name);
      this.addFormStep3.controls.buyer_email.patchValue(item.email);
      this.addFormStep3.controls.buyer_phone.patchValue(item.phone);

      this.addFormStep3.controls.buyer_leg_rep_name.patchValue(item.name);
      this.addFormStep3.controls.buyer_leg_rep_phone.patchValue(item.phone);
      this.addFormStep3.controls.buyer_leg_rep_email.patchValue(item.email);
    }
    this.closeLinkUserModal.nativeElement.click();
  }

  unsetSeller(item) {
    if (this.tab == 2) {
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

  getAmount(key: string, key1: string, key2: string) {
    const price = this.addFormStep4.get(key).value;
    const percentage = this.addFormStep4.get(key1).value;
    console.log(price, percentage);
    const amount = Math.round((percentage * price) / 100);
    this.addFormStep4.controls[key2].patchValue(amount);
  }

  getPercentage(key: string, key1: string, key2: string) {
    const price = this.addFormStep4.get(key).value;
    const amount = this.addFormStep4.get(key1).value;
    console.log(price, amount);
    const percentage = (amount * 100) / price;
    this.addFormStep4.controls[key2].patchValue(percentage);
  }

  createCollection(formdata: NgForm, tab: number) {
// console.log(this.tab);
// console.log(formdata);
// console.log(this.model, this.property_id);
console.log(formdata);
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
      } else if (!formdata['deal_type_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseDealType'), 'error');
        return;
      }
    }

    if (this.model.step == 2) {
      if (!formdata['seller_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseSeller'), 'error');
        return;
      } else if (!formdata['seller_company_name']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
        return;
      } else if (!formdata['seller_fed_tax']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        return;
      } else if (!formdata['collection_seller_banks'] || formdata['collection_seller_banks'].length < 1) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
        return;
      }
    }

    if (this.model.step == 3) {
      if (!formdata['buyer_id']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseBuyer'), 'error');
        return;
      } else if (!formdata['buyer_company_name']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterCompanyName'), 'error');
        return;
      } else if (!formdata['buyer_fed_tax']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        return;
      } else if (!formdata['collection_buyer_banks'] || formdata['collection_buyer_banks'].length < 1) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
        return;
      }
    }

    if (this.model.step == 4) {
      if (!formdata['deal_purchase_date']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPurchaseDate'), 'error');
        return;
      } else if (!formdata['deal_price']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPrice'), 'error');
        return;
      } else if (!formdata['deal_lay_date'] || !formdata['deal_lay_type'] ||
          !formdata['deal_lay_percent_value'] || !formdata['deal_lay_amount_value']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLayawayPayment'), 'error');
        return;
      } else if (!formdata['deal_down_date'] || !formdata['deal_down_type'] ||
          !formdata['deal_down_percent_value'] || !formdata['deal_down_amount_value']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterDownPayment'), 'error');
        return;
      } else if (!formdata['deal_pay_date'] || !formdata['deal_pay_type'] ||
          !formdata['deal_pay_percent_value'] || !formdata['deal_pay_amount_value']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPaymentUponDelivery'), 'error');
        return;
      } else if (!formdata['deal_spe_name'] || !formdata['deal_spe_date']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSpecialPayment'), 'error');
        return;
      } else if (!formdata['deal_interest_rate']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterInterestRate'), 'error');
        return;
      } else if (!formdata['deal_monthly_payment']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterMonthlyPayment'), 'error');
        return;
      } else if (!formdata['deal_penality']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterPenality'), 'error');
        return;
      }


      formdata['deal_purchase_date'] = formdata['deal_purchase_date'] ?
       moment(formdata['deal_purchase_date']).format('YYYY-MM-DD') : null;
      formdata['deal_lay_date'] = moment(formdata['deal_lay_date']).format('YYYY-MM-DD');
      formdata['deal_down_date'] = moment(formdata['deal_down_date']).format('YYYY-MM-DD');
      formdata['deal_pay_date'] = moment(formdata['deal_pay_date']).format('YYYY-MM-DD');
      formdata['deal_spe_date'] = moment(formdata['deal_spe_date']).format('YYYY-MM-DD');
      formdata['deal_payment_date'] = moment(formdata['deal_payment_date']).format('YYYY-MM-DD');
    }

    if (this.model.step == 5) {
      if (!formdata['comm_total_commission']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterTotalCommission'), 'error');
        return;
      } else if (!formdata['comm_shared_commission']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSharedCommission'), 'error');
        return;
      } else if (!formdata['deal_commission_agents']) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFederalTaxPayer'), 'error');
        return;
      }
    }


    // this.spinner.show();
    this.us.postDataApi('addCollection', formdata)
      .subscribe(
        success => {
          this.tab = tab + 1;
          this.spinner.hide();
          this.model.id = success['data'].id;
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
