import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddProjectModel, Towers, Configuration } from 'src/app/models/addProject.model';

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
import { Collection } from 'src/app/models/collection.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor, Collection]
})
export class AddCollectionComponent implements OnInit {

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

  video: any;
  image: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  videoSrc: any;
  num_of_property: any;
  property_names: Array<any>;
  amenity_index: number;
  amenity_obj: any;

  locale: any;
  properties: SelectItem[];
  addFormStep1: FormGroup;
  addFormStep2: FormGroup;
  addFormStep3: FormGroup;
  addFormStep4: FormGroup;
  addFormStep5: FormGroup;
  addFormStep6: FormGroup;
  constructor(public model: Collection, private us: AdminService, private cs: CommonService,
    private router: Router,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute,
    private http: HttpInterceptor,
    private spinner: NgxSpinnerService,
    private element: ElementRef,
    private translate: TranslateService,
    private fb: FormBuilder) {

    this.us.globalSettings$.subscribe(suc1 => {
      this.parameter.bulk_approve_property = suc1['bulk_approve_property'];
    });
  }

  ngOnInit() {
    this.setDatePickerLocale();
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.parameter.amenities = [];
    this.parameter.banks = [];
    this.http.loader.next({ value: true });
    this.details = new PropertyDetails;

    this.file2 = new FileUpload(false, this.us);
    this.file360 = new FileUpload(false, this.us);
    this.amenMoreImg = new FileUpload(false, this.us);
    this.amen360Img = new FileUpload(false, this.us);
    this.amenVideo = new VideoUpload(false, this.us);

    this.parameter.sub = this.route.params.subscribe(params => {
      this.model.id = params['id'];
      if (this.parameter.property_id === '0') {
        this.us.postDataApi('getPropertyAmenities', {hide_blocked: 1}).subscribe(res => {
          this.parameter.amenities = res.data.map(item => {
            item.selected = false;
            item.images = [];
            item.images_360 = [];
            item.images_360 = [];
            item.videos = [];
            return item;
          });
        });

        this.parameter.property_id = '';
        this.model.marital_status = [1];
        // set 0 bcz optional
        this.model.quantity = 0;
        this.model.half_bathroom = 0;
        this.model.property_price = 0;
        this.showSearch = true;
        this.parameter.propertyDetails = new AddPropertyModel();
      } else {
        this.getCollectionDetails(this.model.id);
      }
    });

    this.parameter.buildingCount = 0;
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    this.building.dev_countrycode = this.constant.dial_code;

    this.tab = 1;
    this.getPropertyTypes();
    this.getPropertyAmenities();
    // this.getBanks();
    // this.getBuildingSpecificTypes();
    // this.getPaymentStatuses();

    // create search FormControl
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
      property_id: ['', [Validators.required]],
      selectedTowerId: ['', [Validators.required]],
      deal_type_id: ['', [Validators.required]],
      step: ['', [Validators.required]]
    });
  }

  initFormStep2() {
    this.addFormStep2 = this.fb.group({
      // step 2
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
      collection_seller_banks: ['', [Validators.required]], // array
    });
  }


  initFormStep3() {
    this.addFormStep3 = this.fb.group({
      // step 3
      step: ['', [Validators.required]],
      buyer_id: ['', [Validators.required]],
      buyer_company_name: ['', [Validators.required]],
      buyer_fed_tax: ['', [Validators.required]],
      buyer_leg_rep_name: ['', [Validators.required]],
      buyer_leg_rep_phone: ['', [Validators.required]],
      buyer_leg_rep_email: ['', [Validators.required]],
      buyer_leg_rep_comp: ['', [Validators.required]],
      buyer_leg_rep_fed_tax: ['', [Validators.required]],
      collection_buyer_banks: ['', [Validators.required]], // array
    });
  }


  initFormStep4() {
    this.addFormStep4 = this.fb.group({
      // step 4
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
      deal_penality: ['', [Validators.required]]
    });
  }


  initFormStep5() {
    this.addFormStep5 = this.fb.group({
      // step 5
      step: ['', [Validators.required]],
      comm_total_commission: ['', [Validators.required]],
      comm_shared_commission: ['', [Validators.required]],
      deal_commission_agents: ['', [Validators.required]],  // array
    });
  }


  initFormStep6() {
    this.addFormStep6 = this.fb.group({
      // step 6
      step: ['', [Validators.required]],
      collection_folders: ['', [Validators.required]] // array
    });
  }


  getCollectionDetails(id: string) {
    this.spinner.show();
    this.us.postDataApi('getCollectionById', {id: id})
      .subscribe(
        success => {
          this.spinner.hide();
          // this.parameter.propertyDetails = success['data'];
          // this.setModelData(success['data']);
          this.patchFormData(success['data']);
        }, error => {
          this.spinner.hide();
        }
      );
  }

  patchFormData(data) {
    // this.patchFormStep1(data);
    this.patchFormStep2(data);
    this.patchFormStep3(data);
    this.patchFormStep4(data);
    this.patchFormStep5(data);
  }

  patchFormStep1(data) {
    // patch form 1
    this.addFormStep1.controls.property_id.patchValue(data.property.id);
    this.addFormStep1.controls.deal_type_id.patchValue(data.deal_type.id);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep2(data) {
    // patch form 1
    this.addFormStep1.controls.seller_id.patchValue(data.seller.id);
    this.addFormStep1.controls.seller_company_name.patchValue(data.seller_company_name);
    this.addFormStep1.controls.seller_fed_tax.patchValue(data.seller_fed_tax);
    this.addFormStep1.controls.seller_leg_rep_name.patchValue(data.seller_leg_rep_name);
    this.addFormStep1.controls.seller_leg_rep_phone.patchValue(data.seller_leg_rep_phone);
    this.addFormStep1.controls.seller_leg_rep_email.patchValue(data.seller_leg_rep_email);
    this.addFormStep1.controls.seller_leg_rep_comp.patchValue(data.seller_leg_rep_comp);
    this.addFormStep1.controls.seller_leg_rep_fed_tax.patchValue(data.seller_leg_rep_fed_tax);
    this.addFormStep1.controls.collection_seller_banks.patchValue(data.collection_seller_banks);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep3(data) {
    // patch form 1
    this.addFormStep1.controls.property_id.patchValue(data.property.id);
    this.addFormStep1.controls.deal_type_id.patchValue(data.deal_type.id);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep4(data) {
    // patch form 1
    this.addFormStep1.controls.property_id.patchValue(data.property.id);
    this.addFormStep1.controls.deal_type_id.patchValue(data.deal_type.id);
    this.addFormStep1.controls.step.patchValue(1);
  }

  patchFormStep5(data) {
    // patch form 1
    this.addFormStep1.controls.property_id.patchValue(data.property.id);
    this.addFormStep1.controls.deal_type_id.patchValue(data.deal_type.id);
    this.addFormStep1.controls.step.patchValue(1);
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

  getCountries(keyword: string) {
    this.us.postDataApi('getCountries', {})
      .subscribe(
        success => {
          this.parameter.countries = success['data'];
        }
      );
  }

  getStates(country_id: any, keyword: string) {
    // this.spinner.show();
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.cities = [];
    this.parameter.localities = [];
    const input = new FormData();
    input.append('country_id', country_id);

    this.us.postDataApi('country/getStates', input).subscribe(success => {
      this.parameter.states = success['data'];
      // this.spinner.hide();
    },
      error => {
        // this.spinner.hide();
      });
  }

  getCities(state_id: any, keyword: string) {
    // this.spinner.show();
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.localities = [];
    const input = new FormData();
    input.append('state_id', state_id);

    this.us.postDataApi('getCities', input).subscribe(success => {
      this.parameter.cities = success['data'];
      // this.spinner.hide();
    },
      error => {
        // this.spinner.hide();
      });
  }


  getLocalities(city_id: any, keyword = '') {
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.us.postDataApi('getLocalities', input)
      .subscribe(
        success => {
          this.parameter.localities = success['data'];
        }
      );
  }

  setAmenity(id: any) {
    this.model.amenities = [id];
  }

  setConfiguration(con: Configuration) {
    this.model.building_configuration_id = con.id;
    this.model.configuration_id = con.configuration_id;
    this.model.floor_plan = con.floor_map_image;
    this.model.images = con.images;
    this.model.images360 = con.images360;
    this.model.videos = con.videos;
    this.model.bedroom = con.config.bedroom;
    this.model.bathroom = con.config.bathroom;
    this.model.half_bathroom = con.config.half_bathroom;
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  getConfigurations() {
    this.us.postDataApi('getConfigurations', {hide_blocked: 1})
      .subscribe(
        success => {
          this.parameter.items = success['data'];
          if (this.parameter.items.length !== 0 && this.parameter.property_id === '') {
            this.model.configuration_id = this.parameter.items[0].id;
          }
        }
      );
  }

  getPropertyTypes() {
    this.us.postDataApi('getPropertyTypes', {hide_blocked: 1})
      .subscribe(
        success => {
          this.parameter.propertyTypes = success['data'];
          if (this.parameter.propertyTypes.length !== 0 && this.parameter.property_id === '') {
            this.model.property_type_id = this.parameter.propertyTypes[0].id;
          }
        }
      );
  }

  getPropertyAmenities() {
    this.us.postDataApi('getPropertyAmenities', {hide_blocked: 1})
      .subscribe(
        success => {
          this.parameter.amenities = success['data'].map(item => {
            item.selected = false;
            item.images = [];
            item.images_360 = [];
            item.videos = [];
            return item;
          });
        }
      );
  }

  modelAmenityOpenFun(amenityObj: any, index: number) {
    this.amenity_index = index;
    this.amenity_obj = amenityObj;
    this.modalAmenOpen.nativeElement.click();
    this.amenMoreImg.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].images ?
      this.parameter.amenities[index].images : [])));
    this.amen360Img.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].images_360 ?
      this.parameter.amenities[index].images_360 : [])));
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].videos ? this.parameter.amenities[index].videos : [])));
  }

  modelAmenityCloseFun() {
    this.modalAmenClose.nativeElement.click();
  }

  addAmenity(amen) {
    if (!amen) {
      return false;
    }
    const index = this.amenityList.findIndex(x => x.id == amen.id);
    if (index < 0) {
      this.model.amenities.push(amen.id);
      this.amenityList.push(amen);

      const removeIndex = this.parameter.amenities.findIndex(x => x.id == amen.id);
      this.parameter.amenities.splice(removeIndex, 1);
    }
  }

  getSelectedAmenityByName(selectedName: string) {
    const r = this.amenityList.find(amenity => amenity.name_en === selectedName);
    if (r) {
      return '';
    } else {
      return this.parameter.amenities.find(amenity => amenity.name_en === selectedName);
    }
  }

  removeAmenity(amenity, index) {
    this.parameter.amenities.push(amenity);
    this.model.amenities.splice(index, 1);
    this.amenityList.splice(index, 1);
  }


  getBanks() {
    const input = new FormData();
    this.us.postDataApi('getBanks', input)
      .subscribe(
        success => {
          this.parameter.banks = success['data'];
        }
      );
  }

  getBuildingSpecificTypes() {
    const input = new FormData();
    this.us.postDataApi('getBuildingSpecificTypes', input)
      .subscribe(
        success => {
          this.parameter.buildingSpecificTypes = success['data'];
        }
      );
  }

  getPaymentStatuses() {
    const input = new FormData();
    this.us.postDataApi('getPaymentStatuses', input)
      .subscribe(
        success => {
          this.parameter.paymentStatuses = success['data'];
        }
      );
  }

  addBank(bank) {
    if (!bank) {
      return false;
    }
    const index = this.bankList.findIndex(x => x.id == bank.id);
    if (index < 0) {
      this.model.banks.push(bank.id);
      this.bankList.push(bank);
      const removeIndex = this.parameter.banks.findIndex(x => x.id == bank.id);
      this.parameter.banks.splice(removeIndex, 1);
    }
  }

  removeBank(bank, index) {
    this.parameter.banks.push(bank);
    this.model.banks.splice(index, 1);
    this.bankList.splice(index, 1);
  }

  addCarpetArea() {
    if (!this.newcarpet_area.area || !this.newcarpet_area.price) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillCarpetAreaFields'), 'error');
    } else {
      this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));
      this.newcarpet_area = { area: '', price: '' };
    }
  }

  addCustomAttribute() {
    if (!this.newcustom_attribute.name || !this.newcustom_attribute.value) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillCustomAttributeFields'), 'error');
    } else {
      this.model.custom_attributes.push(this.newcustom_attribute);
      this.newcustom_attribute = { name: '', value: '' };
    }
  }

  getSelectedBankByName(selectedName: string) {
    const r = this.bankList.find(bank => bank.name === selectedName);
    if (r) {
      return '';
    } else {
      return this.parameter.banks.find(bank => bank.name === selectedName);
    }
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

  createCollection(formdata: NgForm, tab: number) {
console.log(this.tab);
console.log(this.model, this.property_id);
    this.model.step = tab;
    if (this.model.step == 1) {
      if (!this.model.building_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectBuilding'), 'error');
        return;
      } else if (!this.model.building_towers_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectFloor'), 'error');
        return;
      } else if (!this.model.floor_num) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFloor'), 'error');
        return;
      } else if (!this.model.property_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseApartment'), 'error');
        return;
      } else if (!this.model.deal_type_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseDealType'), 'error');
        return;
      }
    }


    if (this.model.step == 2) {
      if (!this.model.building_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectBuilding'), 'error');
        return;
      } else if (!this.model.building_towers_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectFloor'), 'error');
        return;
      } else if (!this.model.floor_num) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseFloor'), 'error');
        return;
      } else if (!this.model.property_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseApartment'), 'error');
        return;
      } else if (!this.model.deal_type_id) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseDealType'), 'error');
        return;
      }
    }
    console.log(this.model);
    // setting newcarpert area to carpert_areas bcz ealier it was array => now single carpertarea
    this.model.carpet_areas = [];
    this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));

    if (this.model.carpet_areas.length < 1 && this.tab == 1) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddCarpetArea'), 'error');
    }  else {
      const input = new FormData();
      if (this.parameter.property_id) {
        input.append('property_id', this.parameter.property_id);
      }
      if (this.parameter.seller_id && this.parameter.seller_id !== '0') {
        input.append('seller_id', this.parameter.seller_id);
      }
      input.append('step', this.model.step.toString());
      if (this.model.step === 1) {
        input.append('name', this.model.name);
        input.append('country_id', this.model.country_id);
        input.append('state_id', this.model.state_id);
        input.append('city_id', this.model.city_id);
        input.append('locality_id', this.model.locality_id);
        input.append('configuration_id', this.model.configuration_id);
        if (this.model.building_configuration_id) {
          input.append('building_configuration_id', this.model.building_configuration_id);
        }
        input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
        input.append('property_type_id', this.model.property_type_id);
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('building_towers_id', this.model.building_towers_id);
        input.append('floor_num', this.model.floor_num);
      }

      if (this.model.step === 2) {
        const imagesString = this.model.images ? this.model.images.map(r => r.image) : [];
        const imagesString360 = this.model.images360 ? this.model.images360.map(r => r.image) : [];
        // const videoString = this.model.videos.map(r => r.image);
        if (this.model.parking === 0) {
          this.model.parking_count = 0;
          this.model.parking_for_sale = 0;
        }

        // amenities images
          console.log(this.parameter.amenities);
        if (this.parameter.amenities && this.parameter.amenities.length > 0) {
          this.parameter.amenities.forEach(element => {
            const img = [];
            const img_360 = [];
            const vid = [];
            // amenities images
            if (element.images && element.images.length > 0) {
              element.images.forEach(e => {
                img.push(e);
              });
            }
            element.images = img;

            // amenities 360 images
            if (element.images_360 && element.images_360.length > 0) {
              element.images_360.forEach(e => {
                img_360.push(e);
              });
            }
            element.images360 = img_360;

            // amenities videos
            if (element.videos && element.videos.length > 0) {
              element.videos.forEach(e => {
                let s = {};
                s = { 'video': e.video, 'thumb': e.thumb };
                vid.push(s);
              });
            }
            element.videos = vid;
          });

          this.model.amenities = this.parameter.amenities.filter(op => {
            if (op.selected === true) {
              return op;
            }
          });
        }
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('images', JSON.stringify(imagesString));
        input.append('images360', JSON.stringify(imagesString360));
        input.append('videos', JSON.stringify(this.model.videos));
        input.append('cover_image', this.model.cover_image);
        input.append('floor_plan', this.model.floor_plan);
        input.append('bedroom', this.model.bedroom.toString());
        input.append('bathroom', this.model.bathroom.toString());
        input.append('half_bathroom', this.model.half_bathroom ? this.model.half_bathroom.toString() : '0');
        input.append('floor', this.model.floor.toString());
        input.append('broker_commision', this.model.broker_commision.toString());
        input.append('property_price', this.model.property_price ? this.model.property_price.toString() : '0');
        input.append('parking', this.model.parking.toString());
        input.append('parking_count', this.model.parking_count ? this.model.parking_count.toString() : '0');
        input.append('parking_for_sale', this.model.parking_for_sale ? this.model.parking_for_sale.toString() : '0');
        input.append('furnished', this.model.furnished.toString());
        input.append('description', this.model.description);
        input.append('quantity', this.model.quantity ? this.model.quantity.toString() : '0');
        input.append('amenities', JSON.stringify(this.model.amenities ? this.model.amenities : []));
        input.append('banks', JSON.stringify(this.model.banks ? this.model.banks : []));
        input.append('property_quantity_details',
          JSON.stringify(this.model.property_quantity_details ? this.model.property_quantity_details : []));
      }
      if (this.model.step === 3) {
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('pets', this.model.pets.toString());
        input.append('kids_friendly', this.model.kids_friendly.toString());
        input.append('students_friendly', this.model.students_friendly.toString());
        input.append('lgtb_friendly', this.model.lgtb_friendly.toString());
        input.append('mature_people_friendly', this.model.mature_people_friendly.toString());
        input.append('marital_status', JSON.stringify(this.model.marital_status));
      }
      if (this.model.step === 4) {
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
      }
      this.tab = tab + 1;
      // this.spinner.show();
      // this.us.postDataApi('addCollection', input)
      //   .subscribe(
      //     success => {
      //       this.spinner.hide();

      //       this.spinner.hide();
      //       if (this.model.step.toString() === '4') {
      //         const successText = this.parameter.bulk_approve_property ? '' :
      //         this.translate.instant('message.error.notifiedWhenAdminReview');
      //         swal({
      //           html: this.translate.instant('message.success.submittedSccessfully') + '<br>' + successText, type: 'success'
      //         });
      //         if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
      //           this.router.navigate(['/dashboard/properties/view-properties']);
      //         }
      //       }
      //       this.parameter.property_id = success['data'].id;
      //       this.tab = tab;
      //     }, error => {
      //       this.spinner.hide();
      //     }
      //   );
    }
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

    this.model.pets = building.pets !== null ? building.pets : '1';
    this.model.kids_friendly = building.kids_friendly !== null ? building.kids_friendly : '1';
    this.model.students_friendly = building.students_friendly !== null ? building.students_friendly : '1';
    this.model.lgtb_friendly = building.lgtb_friendly !== null ? building.lgtb_friendly : '1';
    this.model.mature_people_friendly = building.mature_people_friendly !== null ? building.mature_people_friendly : '1';

  }

  // setTower(tower: Towers) {
  //   console.log(tower);
  //   this.selectedTower = tower;
  //   this.model.building_towers_id = tower.id;
  //   // this.selectedTower.floor_array = [];
  //   // for (let index = 0; index <= this.selectedTower.num_of_floors; index++) {
  //   //   this.selectedTower.floor_array.push(index);
  //   // }
  // }

  setTower(building_towers_id: string) {
    for (let index = 0; index < this.searchedBuildings.length; index++) {
      if (this.searchedBuildings[index].id == this.model.building_id) {
        const bt = this.searchedBuildings[index].building_towers;
        for(let i = 0; i < bt.length; i++) {
          if (bt[i].id == building_towers_id) {
            this.selectedTower = bt[i];
          }
        }
      }
    }
  }

  setFloor(floor_num: any) {
    this.model.floor_num = floor_num;
  }

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


  showCanvas(event) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
    } else {

      setTimeout(() => {
        this.model.videoLoader = true;
        this.video = document.getElementById('video1');
        const reader = new FileReader();
        const videoTest = this.element.nativeElement.querySelector('.video55');
        reader.onload = function (e) {
          const src = e.target['result'];
          videoTest.src = src;
          const timer = setInterval(() => {
            // find duration of video only of video is in ready state
            if (videoTest.readyState === 4) {
              setTimeout(() => {
                // create canvas at middle of video
                this.newcanvas(videoTest, event.target.files[0]);
              }, 3000);
              clearInterval(timer);
            }
          }, 100);
        }.bind(this);
        reader.readAsDataURL(event.target.files[0]);
      }, 100);
    }
  }

  newcanvas(video: any, videoFile: File) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
      0, 0, canvas.width, canvas.height);
    const ImageURL = canvas.toDataURL('image/jpeg');
    // model.image = ImageURL;
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        this.model.videoLoader = false;
        this.model.videos = [];
        const videoObj = {
          video: '', thumb: ''
        };
        videoObj.video = success['data'].video;
        videoObj.thumb = success['data'].thumb;
        this.model.videos = [videoObj];
      }, error => {
        // console.log(error);
      }
    );
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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


  amenMoreImgSelect($event) {
    if ((this.amenMoreImg.files.length + $event.target.files.length) > 6) {
      swal(this.translate.instant('message.error.limitExceeded'),
          this.translate.instant('message.error.youCanUploadMaximumof6Images'), 'error');
      return false;
    }
    this.amenMoreImg.onSelectFile($event);
  }

  amen360ImagesSelect($event) {
    if ((this.amen360Img.files.length + $event.target.files.length) > 6) {
      swal(this.translate.instant('message.error.limitExceeded'),
          this.translate.instant('message.error.youCanUploadMaximumof6Images'), 'error');
      return false;
    }
    this.amen360Img.onSelectFile($event);
  }

  modelOpenVideos() {
    this.modalAddMoreVideos.nativeElement.click();
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.model.videos)));
  }

  setVideoStaticThumb(myIndex) {
    const fileToUpload = 'assets/img/video-file.svg';
    this.amenVideo.files[myIndex].loading = false;
    this.amenVideo.files[myIndex]['thumb'] = fileToUpload;
    this.amenVideo.files[myIndex]['fileToUpload'] = fileToUpload;
  }

  remove(index: any) {
    this.amenVideo.files.splice(index, 1);
  }

  getProperties($event) {
    $event.stopPropagation();
    this.model.floor_num = $event.target.value;
    if (!this.model.building_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectBuilding'), 'error');
      return;
    } else if (!this.model.building_towers_id) {
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
          console.log(success.data);
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
    console.log(this.property_id)
    this.model.property_id = 5521; // property_id;
  }
}
