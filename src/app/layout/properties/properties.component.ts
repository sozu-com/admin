import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { UserModel } from 'src/app/models/inhouse-users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { SellerSelections, AddPropertyModel, Notes } from 'src/app/models/addProperty.model';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from 'src/app/services/property.service';
import { TranslateService } from '@ngx-translate/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { createPipeInstance } from '@angular/core/src/view/provider';
import { Subscription } from 'rxjs';
import { Column } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { ApiConstants } from 'src/app/common/api-constants';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GenerateOfferPdfService } from 'src/app/services/generate-offer-pdf.service';
import { runInThisContext } from 'vm';
import { ThrowStmt } from '@angular/compiler';
import { value } from 'numeral';
import { CommonService } from 'src/app/services/common.service';

declare let swal: any;
declare var $: any;

class Product {
  name: string;
  price: number;
  qty: number;
}
class bank {
  id: number;
  name: string;
  AccountName: string;
  RFC: string;
  accountNumber: string;
  CLABE: string
}

class Invoice {
  customerName: string;
  address: string;
  contactNo: number;
  email: string;

  products: Product[] = [];
  additionalDetails: string;

  constructor() {
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
  providers: [AddPropertyModel, DatePipe, PricePipe, Notes]
})
export class PropertiesComponent implements OnInit, OnDestroy {
  selectedvalue: bank;
  prop_data: any = [];
  pub: any;
  value: any;
  value1: any;
  public parameter: IProperty = {};
  public location: IProperty = {};
  showMore = false;
  isSelected = false;
  items: any[] = [];
  propertyItems: any;
  total: any = 0;
  configurations: any = [];
  countries: any;
  property_status: string;
  price_sort = 1;
  availability_sort = 1;
  lead_sort = 1;
  keyword: string;
  selecter_seller: SellerSelections;
  selecter_buyer: SellerSelections;
  allSellers: Array<SellerSelections>;
  allExtBrokers: Array<UserModel>;
  allUsers: Array<UserModel>;
  property: any;
  reason: string;
  item: any;
  count = 0;
  locale: any;
  floors: Array<any>;
  seller_type: number;
  user_type: string;
  min_price: any;
  max_price: any;
  min_carpet_area: any;
  max_carpet_area: any;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  exportfinalData: Array<any> = [];
  baseUrl = this.admin.baseUrl + 'exportProperties';
  is_back: boolean = false;
  is_filter: boolean = false;
  amenities = Array<any>();
  availabilityStatus = Array<any>();
  projectAmenities = Array<any>();
  propertyTypes = Array<any>();
  selctedAmenities: Array<any>;
  selctedFilters: any;
  selctedProjectAmenities: Array<any>;
  multiDropdownSettings = {};
  //multiDropdownSettingss = {};
  invoice = new Invoice();
  property_array: any;
  offer_array: any;
  property_offer_payment: any;
  paymentBanks: Array<any>;
  isPreview: boolean = false;
  avg_price: any;
  isApplyBtnClicked = false;
  property_for: any = [
    { is_selected: false, id: 1, name_en: 'For sale', name_es: 'En venta' },
    { is_selected: false, id: 3, name_en: 'Inventory', name_es: 'Inventario' },
    { is_selected: false, id: 2, name_en: 'Rent', name_es: 'Renta' }
  ];
  possession_status_id: any = [
    { is_selected: false, id: 9, name_en: 'Presale', name_es: 'Preventa' },
    { is_selected: false, id: 8, name_en: 'Sale', name_es: 'Venta' }
  ];

  bedrooms: any = [
    { is_selected: false, name: '1' },
    { is_selected: false, name: '2' },
    { is_selected: false, name: '3' },
    { is_selected: false, name: '4' },
    { is_selected: false, name: '+5' }
  ];
  bathrooms: any = [
    { is_selected: false, name: '1' },
    { is_selected: false, name: '2' },
    { is_selected: false, name: '3' },
    { is_selected: false, name: '4' },
    { is_selected: false, name: '+5' }
  ];
  halfBathrooms: any = [
    { is_selected: false, name: '1' },
    { is_selected: false, name: '2' },
    { is_selected: false, name: '3' },
    { is_selected: false, name: '4' },
    { is_selected: false, name: '+5' }
  ];
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('rejectModalOpen') rejectModalOpen: ElementRef;
  @ViewChild('rejectModalClose') rejectModalClose: ElementRef;
  @ViewChild('linkUserModal') linkUserModal: ElementRef;
  @ViewChild('closeLinkUserModal') closeLinkUserModal: ElementRef;
  @ViewChild('linkSellerModal') linkSellerModal: ElementRef;
  @ViewChild('closeLinkSellerModal') closeLinkSellerModal: ElementRef;
  @ViewChild('linkExtBrokerModal') linkExtBrokerModal: ElementRef;
  @ViewChild('closeExtBrokerModal') closeExtBrokerModal: ElementRef;
  @ViewChild('openInstallmentModal') openInstallmentModal: ElementRef;
  @ViewChild('closeInstallmentModal') closeInstallmentModal: ElementRef;
  @ViewChild('linkOutsideBrokerModal') linkOutsideBrokerModal: ElementRef;
  @ViewChild('closeOutsideBrokerModal') closeOutsideBrokerModal: ElementRef;
  @ViewChild('openpusblishModal') openpusblishModal: ElementRef;
  @ViewChild('closepusblish') closepusblish: ElementRef;
  local_storage_parameter: any;
  @ViewChild('notesadddModalOpen') notesadddModalOpen: ElementRef;
  @ViewChild('notesadddModalClose') notesadddModalClose: ElementRef;
  @ViewChild('notesModalOpen') notesModalOpen: ElementRef;
  @ViewChild('notesModalClose') notesModalClose: ElementRef;
  public installmentFormGroup: FormGroup;
  public paymentBankDetailsArray: any[] = [];
  private installmentFormGroupSubscription: Subscription;
  logoImageBase64: any;
  projectLogoImageBase64: any;
  private bankDetails: any;
  private fedTaxPayer: string;
  base64: any;
  fullName: any;
  public multiDropdownSettingsForLocation = {};
  public multiDropdownSettingsForfilter = {};
  public language_code: string;
  public selectedLocation: { selectedCountry: string, selectedStates: any[], selectedCities: any[], selectedLocalities: any[] } =
    { selectedCountry: '', selectedStates: [], selectedCities: [], selectedLocalities: [] };
  public parkingSpaceLotsArray: any[] = [];
  property_offers: any[] = [];
  property_index: any;
  is_for_Offer: boolean;
  offer_id: any;
  @ViewChild('openLinkAgencyModal') openLinkAgencyModal: ElementRef;
  @ViewChild('closeLinkAgencyModal') closeLinkAgencyModal: ElementRef;
  agency_list: any[] = [];
  propertyIndex: number;
  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  select_columns_list: any[] = [];
  public selectedPropertyColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  project_id: any;
  configurationCount: Array<any>;
  possessionStatuses: Array<any>;
  export_num: any;
  progress_bar_per: number;
  text_1: any;
  initialCountry = { initialCountry: 'mx' };
  propertyDetail: any;

  constructor(
    public constant: Constant, public cs: CommonService,
    public apiConstant: ApiConstants,
    public admin: AdminService, public noted: Notes,
    private propertyService: PropertyService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router,
    private translate: TranslateService, public model: AddPropertyModel,
    private formBuilder: FormBuilder, private datePipe: DatePipe,
    private http: HttpClient, private price: PricePipe,
    private toastr: ToastrService, private offerPdf: GenerateOfferPdfService
  ) {
    this.installmentFormGroup = this.formBuilder.group({
      payment_name: '',
      downPayment: '',
      discount: '',
      monthlyInstallment: '',
      numberOfMI: '',
      paymentupondelivery: '',
      // isAddVariables: [false],
      // isAddParkingLotForSale: [false],
      // parkingLotsNumber: [''],
      // parkingLotsType: [''],
      // parkingLotsPrice: [''],
      // agencyOrSeller: [false],
      // tempAddVariablesText: [''],
      // tempAddVariablesPercentage: [''],
      // interest: [''],
      // paymentBankDetails: [''],
      // addVariablesFormArray: this.formBuilder.array([]),
      // parkingLotForSaleFormArray: this.formBuilder.array([]),
      addNoteFormArray: this.formBuilder.array([]),
      // addbankFormArray: this.formBuilder.array([]),
      // listPrice: [{ value: '', disabled: true }],
      // finalPrice: [{ value: '', disabled: true }],
      // downPaymentFinalPrice: [{ value: '', disabled: true }],
      // discountFinalPrice: [{ value: '', disabled: true }],
      // monthlyInstallmentFinalPrice: [{ value: '', disabled: true }],
      // interestFinalPrice: [{ value: '', disabled: true }],
      // paymentupondeliveryFinalPrice: [{ value: '', disabled: true }],
      leadName: '',
      email: '',
      phone: '',
      dial_code: '+52',
      country_code: 'mx'
    });
  }

  onCountryCodeChange(obj) {
    let dev_countrycode = obj.iso2;
    let dev_dialcode = '+' + obj.dialCode;
    this.installmentFormGroup.patchValue({
      dial_code: dev_dialcode,
      country_code: dev_countrycode
    });
  }

  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: this.language_code == 'en' ? 'name_en' : 'name_es',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }

  ngOnInit(): void {
    this.configurationCount = ['1', '2', '3', '4', '5+'];
    this.language_code = localStorage.getItem('language_code');
    this.cs.propertyData = JSON.parse(localStorage.getItem('property_data'));
    this.cs.totalProperty = JSON.parse(localStorage.getItem('property_total'));
    this.getPropertyHome();
    this.getPropertyFilter();
    this.iniDropDownSetting();
    this.initializedDropDownSetting();
    this.initializedDropDownSettingfor();
    this.selctedAmenities = [];
    this.selctedFilters = [];
    this.selctedProjectAmenities = [];
    this.seller_type = 1;
    this.export_num = 1;
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

    this.route.params.subscribe(params => {

      this.project_id = JSON.parse(localStorage.getItem('project_id'));
      if (params.name) {
        this.parameter.keyword = params.name;
        this.parameter.flag = 3;
        this.parameter.building_name = params.name;
        this.getListing(null, null);
      }
      this.parameter.building_name = params.name;
      if (params.property_id) {
        this.parameter.random_id = params['property_id'];
      } else {
        this.parameter.keyword = params.name;
      }
      this.parameter.project_id = this.project_id;
      this.parameter.property_id = params.property_id || '';

      if (params.type === 'agent') {
        this.parameter.agent_id = params.id;
      } else if (params.type === 'agency') {
        this.parameter.agency_id = params.id;
      }
      if (params.for) {
        this.is_back = true;
        this.getParametersForProperty();
        this.getListingForBack();
        this.getListing(null, null);
      }
      if (params.for == 'go') {
        this.getListing(null, null);
      }
    });
    this.setFloors();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.propertyService.dash_flag ? this.propertyService.dash_flag : this.constant.dash_flag;
    this.parameter.flag = 3;
    this.parameter.min_price = 0;
    this.parameter.max_price = 0;
    this.parameter.min_carpet_area = 0;
    this.parameter.max_carpet_area = 0;
    this.parameter.parking = 0;
    this.parameter.furnished = 0;
    this.parameter.parking_place = 0;
    this.parameter.bedroom = 0;
    this.parameter.parking_for_sale = 0;
    this.parameter.bathroom = 0;
    this.parameter.half_bathroom = 0;
    this.parameter.property_type_id = 0;
    this.parameter.possession_status_id = 0; // 0-all, 9-presale, 8-sale
    this.parameter.country_id = '0';
    this.parameter.state_id = '0';
    this.parameter.building_id = '0';
    this.getPropertyConfigurations();
    // if (!this.is_back) {
    //   this.getListing(null, null);
    // }
    this.getPropertyTypes();
    this.getPossessionStatuses();
    this.getPropertyAmenities();
    this.getProjectAmenities();
    //this.subscribeInstallmentFormGroup();
    this.http.get('../../../assets/img/sozu_black.png', { responseType: 'blob' })
      .subscribe(res => {
        const reader = new FileReader();
        reader.onloadend = () => {
          let base64data = reader.result;
          this.logoImageBase64 = base64data;
        }

        reader.readAsDataURL(res);
      });
    this.admin.loginData$.subscribe(success => {
      this.fullName = success['name'] + ' ' + success['first_surname'] + ' ' + success['second_surname'];
    });
    this.getParametersForProperty();
    localStorage.removeItem('project_id');
  }

  getPropertyFilter() {
    this.availabilityStatus = [
      //{ id: 0, name_en: 'All', name_es: 'All'},
      { id: 1, name_en: 'For Sale', name_es: 'En venta' },
      { id: 2, name_en: 'Rent', name_es: 'Renta' },
      { id: 3, name_en: 'Inventory', name_es: 'Inventario' },
      { id: 4, name_en: 'For Sale & Rent', name_es: 'En venta & Renta' }
    ];
  }

  getParametersForProperty = (): void => {
    if (this.is_back) {
      this.selectedLocation.selectedLocalities = JSON.parse(localStorage.getItem('selectedLocalitiesForProperty'));
      this.selectedLocation.selectedCities = JSON.parse(localStorage.getItem('selectedCitiesForProperty'));
      this.parameter = this.is_back ? JSON.parse(localStorage.getItem('parametersForProperty')) : this.parameter;
    }
    this.getCountries();
  }

  toggleOptions(item, items) {
    items.forEach(r => {
      r.is_selected = false;
    });
    item.is_selected = true;
  }

  onItemSelects(value) {
    this.selectedvalue = value
  }

  unsetProject(item: any) {
    let i = 0;
    this.selctedAmenities.map(r => {
      if (r.id == item.id) {
        this.selctedAmenities.splice(i, 1);
      }
      i = i + 1;
    });
  }

  unsetProjectAmne(item: any) {
    let i = 0;
    this.selctedProjectAmenities.map(r => {
      if (r.id == item.id) {
        this.selctedProjectAmenities.splice(i, 1);
      }
      i = i + 1;
    });
  }

  onItemSelect(param: any, obj: any) {
    this[param].push(obj);
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  onSelectAll(obj: any) { }

  getPropertyTypes() {
    this.admin.postDataApi('getPropertyTypes', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.propertyTypes = success['data'];
        }
      );
  }

  setFloors() {
    var foo = new Array(30);
    this.floors = [];
    for (var i = 0; i < foo.length; i++) {
      const obj = {
        id: i,
        name: i == 0 ? this.translate.instant('addForm.groundFloor') : this.translate.instant('addForm.floor') + i
      }
      this.floors.push(obj);
    }
  }

  close() {
    this.export_num = 1;
    this.exportfinalData = [];
    this.progress_bar_per = 0;
    $('.modal').modal('hide');
  }

  getListingForBack() {
    this.spinner.show();
    this.makePostRequest();
    let input: any = JSON.parse(JSON.stringify(this.parameter));
    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        localStorage.setItem('parametersForProperty', JSON.stringify(input));
        this.items = success.data;
        this.items.forEach(function (element) {
          if (element.id == (element.collection || {}).property_id) {
            element['avgg_price'] = (((parseFloat(element.final_price) || 0) / (parseFloat(element.max_area) || 0)));
          } else {
            element['avgg_price'] = (((parseFloat(element.min_price) || 0) / (parseFloat(element.max_area) || 0)));
          }
        });
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  getListing(data, value) {
    this.spinner.show();
    this.makePostRequest();
    let input: any = JSON.parse(JSON.stringify(this.parameter));
    if (value) {
      this.value = data;
      this.value1 = value;
      if (data == "all") {
        const d = value.map(o => o.id);
        input.availability_filter = d;
      } else if (data == "select") {
        const d = this.parameter.availability_filter.map(o => o.id);
        input.availability_filter = d;
      } else if (data == "unselect") {
        const d = this.parameter.availability_filter.map(o => o.id);
        input.availability_filter = d;
      }
    }
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }
    if (this.parameter.agent_id) {
      input.agent_id = this.parameter.agent_id;
    } else {
      delete input.agent_id;
    }
    if (this.parameter.agency_id) {
      input.agency_id = this.parameter.agency_id;
    } else {
      delete input.agency_id;
    }
    if (this.parameter.property_type_id) {
      input.property_type_id = this.parameter.property_type_id;
    } else {
      delete input.property_type_id;
    }
    delete input.seller_id;
    delete input.buyer_id;


    if (this.selctedAmenities) {
      const d = this.selctedAmenities.map(o => o.id);
      input.amenities_id = d;
    }
    if (this.selctedProjectAmenities) {
      const d = this.selctedProjectAmenities.map(o => o.id);
      input.building_amenities_id = d;
    }
    if (this.property_for !== '' && this.property_for !== '0') {
      input.property_for = this.property_for.filter(f => { return f.is_selected == true }).map(r => { return r.id })[0] || '';
    }
    input.bedroom = this.bedrooms.filter(f => { return f.is_selected == true }).map(r => { return r.name });
    input.bathroom = this.bathrooms.filter(f => { return f.is_selected == true }).map(r => { return r.name });
    input.half_bathroom = this.halfBathrooms.filter(f => { return f.is_selected == true }).map(r => { return r.name });
    input.property_id = this.propertyTypes.filter(f => { return f.is_selected == true }).map(r => { return r.id });
    input.min_price = this.parameter.min_price == '0.00' ? 0 : this.parameter.min_price;
    input.max_price = this.parameter.max_price == '0.00' ? 0 : this.parameter.max_price;
    input.min_carpet_area = this.parameter.min_carpet_area == '0.00' ? 0 : this.parameter.min_carpet_area;
    input.max_carpet_area = this.parameter.max_carpet_area == '0.00' ? 0 : this.parameter.max_carpet_area;
    input.parking = this.parameter.parking;
    input.furnished = this.parameter.furnished;
    input.parking_place = this.parameter.parking_place;
    input.parking_for_sale = this.parameter.parking_for_sale;
    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        this.is_filter = true;
        localStorage.setItem('parametersForProperty', JSON.stringify(input));
        this.items = success.data;
        this.items.forEach(function (element) {
          if (element.id == (element.collection || {}).property_id) {
            element['avgg_price'] = (((parseFloat(element.final_price) || 0) / (parseFloat(element.max_area) || 0)));
          } else {
            element['avgg_price'] = (((parseFloat(element.min_price) || 0) / (parseFloat(element.max_area) || 0)));
          }
        });
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  searchProperties() {
    this.close();
    this.getListing(null, null);
  }

  clearData() {
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.parameter.min_price = 0;
    this.parameter.max_price = 0;
    this.parameter.min_carpet_area = 0;
    this.parameter.max_carpet_area = 0;
    this.parameter.parking = null;
    this.parameter.bedroom = null;
    this.parameter.bathroom = null;
    this.parameter.half_bathroom = null;
    this.propertyTypes = [];
    // this.possession_status_id = null;
    //this.property_for = null;
    this.selctedAmenities = [];
    this.selctedProjectAmenities = [];
    this.parameter.parking_for_sale = null;
    this.property_for.forEach(item => {
      item.is_selected = false;
    });
    this.possession_status_id.forEach(item => {
      item.is_selected = false;
    });
    this.propertyTypes.forEach(item => {
      item.is_selected = false;
    });
    this.bedrooms.forEach(item => {
      item.is_selected = false;
    });
    this.bathrooms.forEach(item => {
      item.is_selected = false;
    });
    this.halfBathrooms.forEach(item => {
      item.is_selected = false;
    });
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
      if (this.is_back) {
        const selectedCountry = this.location.countries.filter(x => x.id.toString() === this.parameter.country_id);
        this.location.states = selectedCountry.length > 0 ? selectedCountry[0].states : [];
        const selectedState = this.location.states.filter(x => x.id.toString() === this.parameter.state_id);
        this.location.cities = selectedState.length > 0 ? selectedState[0].cities : [];
        const localities = [];
        this.selectedLocation.selectedCities.forEach((cityObject) => {
          const selectedlocality = this.location.cities.filter(x => x.id == cityObject.id);
          (selectedlocality[0].localities || []).forEach((localityObject) => {
            localities.push(localityObject);
          });
        });
        this.location.localities = localities;
      } else {
        this.parameter.country_id = '0';
        this.parameter.state_id = '0';
        this.parameter.building_id = '0';
      }
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(r => {
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
    this.selectedLocation.selectedCities = [];
    this.selectedLocation.selectedLocalities = [];
    this.parameter.country_id = id;
    this.location.states = [];
    this.parameter.state_id = '0';
    this.location.cities = [];
    this.parameter.city_id = '0';
    this.location.localities = [];
    this.parameter.locality_id = '0';
    this.parameter.buildings = [];
    this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.selectedLocation.selectedCities = [];
    this.location.cities = [];
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    this.parameter.city_id = '0';
    this.parameter.locality_id = '0';
    this.parameter.buildings = [];
    this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }


  onCityChangeAll = (data: any[]): void => {
    this.selectedLocation.selectedCities = data;
    this.onCityChange();
  }

  onCityChange = (): void => {
    this.selectedLocation.selectedLocalities = [];
    this.location.localities = [];
    this.parameter.building_id = '0';
    const localities = [];
    this.selectedLocation.selectedCities.forEach((cityObject) => {
      const selectedlocality = this.location.cities.filter(x => x.id == cityObject.id);
      (selectedlocality[0].localities || []).forEach((localityObject) => {
        localities.push(localityObject);
      });
    });
    this.location.localities = localities;
  }

  onLocalityChangeAll = (data: any[]): void => {
    this.selectedLocation.selectedLocalities = data;
    this.onLocalityChange();
  }

  onLocalityChange = (): void => {
    this.parameter.building_id = '0';
    this.parameter.buildings = [];
    if (this.selectedLocation.selectedLocalities.length > 0) {
      this.getLocalityBuildings();
    }
  }


  getLocalityBuildings = (): void => {
    this.spinner.show();
    this.makePostRequest();
    this.admin.postDataApi('getLocalityBuildings', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.buildings = success.data;
        }, error => {
          this.spinner.hide();
        });
  }

  getPropertyAmenities() {
    this.admin.postDataApi('getPropertyAmenities', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.amenities = success['data'];
        }
      );
  }

  getProjectAmenities() {
    this.admin.postDataApi('getProjectAmenities', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.projectAmenities = success['data'];
        });
  }

  setBuilding(building_id) {
    this.parameter.building_id = building_id;
  }

  changeFlag(flag: number) {
    this.parameter.dash_flag = flag;
    this.propertyService.dash_flag = flag;
    if (flag === 5) {
      return false;
    }
    this.resetDates();
    this.getListing(null, null);
  }

  changePropertyFlag(flag) {
    this.parameter.flag = flag;
    this.getListing(null, null);
  }

  sort_by(sort_by) {
    if (this.parameter.sort_by !== sort_by) {
      this.parameter.sort_by = sort_by;
      this.parameter.sort_by_order = 1;
    } else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing(null, null);
  }
  sortData(value: number) {
    this.parameter.sort_by = 7;
    this.parameter.sort_by_order = value;
    this.getListing(this.value, this.value1);
  }
  price_by(price_sort) {
    if (this.parameter.price_sort !== price_sort) {
      this.parameter.price_sort = price_sort;
      //this.parameter.price_sort = 1;
    } else {
      this.parameter.price_sort = 0;
    }
    this.getListing(null, null);
  }
  getPage(page) {
    this.parameter.page = page;
    this.getListing(this.value, this.value1);
  }

  blockUnblock(item, flag: number) {
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockProperty');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockProperty');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockProperty(item, flag);
      }
    });
  }

  blockProperty(item, flag: number) {
    this.admin.postDataApi('blockProperty', { property_id: item.id, flag: flag })
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          item.is_blocked = flag;
          // this.items[this.parameter.index] = success.data;
        },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  openCancellationModal(item, status) {
    this.item = item;
    this.parameter.status = status;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  closeReasonModal() {
    this.rejectModalClose.nativeElement.click();
  }

  pusblish = (propertyDetails: any): void => {
    this.propertyItems = propertyDetails;
    this.openpusblishModal.nativeElement.click();
  }
  openPublish(item) {
    this.spinner.show();
    this.isApplyBtnClicked = true;
    this.admin.postDataApi('updateProperyStatus', { id: item }).subscribe((success) => {
      this.closepusblish.nativeElement.click();
      this.prop_data = success.data;
      this.isApplyBtnClicked = false;
      this.prop_data.forEach((cityObject) => {
        this.pub = cityObject.is_published;
      });
      if (this.pub == 1) {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.publishSuccessfully'), 'success');
      } else {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.UnpublishSuccessfully'), 'success');
      }
      this.getListing(null, null);
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  changePop(p) {
    if (p.for_rent == 1) {
      this.text_1 = this.translate.instant('table.th.rent');
    } else if (p.for_hold == 1) {
      this.text_1 = this.translate.instant('table.th.inventory');
    } else if (p.for_resale == 1) {
      this.text_1 = this.translate.instant('table.th.saleAndrent');
    }
    this.parameter.text = this.translate.instant('message.error.wantToDeletepop');
    swal({
      html: this.parameter.text + '\xa0' + this.text_1 + '<br>' + this.translate.instant('message.error.wantToDeletepoped'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      // if (result.value) {
      //   this.deleteProject(item,index);
      // }
    });
  }

  openModalInstallment = (propertyDetails: any): void => {
    this.property_array = propertyDetails;
    this.openInstallmentModal.nativeElement.click();
    this.getBase64ImageFromUrl(this.property_array.id);
    // this.spinner.show();
    // this.admin.postDataApi('getBuildingOfferInfo', { property_id: (propertyDetails || {}).id }).subscribe((success) => {
    //   this.spinner.hide();
    //   this.bankDetails = (success || {}).data;
    // this.getParkingSpaceLots(((success || {}).data || {}).building_id);
    // this.installmentFormGroup.get('paymentBankDetails').setValue(false);
    // this.installmentFormGroup.patchValue({
    //   listPrice: this.property_array.min_price ? ('$' + this.getTransformedAmount(this.property_array.min_price)) : ('$' + 0.00),
    //   discount: this.property_array.building.building_payment_way.length > 0 && this.property_array.building.building_payment_way[0].downpayment ? (this.getTransformedAmount(this.property_array.building.building_payment_way[0].discount)) : 0.00,
    //   downPayment: this.property_array.building.building_payment_way.length > 0 && this.property_array.building.building_payment_way[0].downpayment ? (this.getTransformedAmount(this.property_array.building.building_payment_way[0].downpayment)) : 0.00,
    //   numberOfMI: this.property_array.building.building_payment_way.length > 0 && this.property_array.building.building_payment_way.length > 0 && this.property_array.building.building_payment_way[0].number_monthly_payments ? (this.getTransformedAmount(this.property_array.building.building_payment_way[0].number_monthly_payments)) : 0.00,
    //   monthlyInstallment: this.property_array.building.building_payment_way.length > 0 && this.property_array.building.building_payment_way[0].monthly_installment ? (this.getTransformedAmount(this.property_array.building.building_payment_way[0].monthly_installment)) : 0.00,
    //   paymentupondelivery: this.property_array.building.building_payment_way.length > 0 && this.property_array.building.building_payment_way[0].payment_upon_delivery ? (this.getTransformedAmount(this.property_array.building.building_payment_way[0].payment_upon_delivery)) : 0.00
    // });
    // this.makePaymentBankDetailsArray(true);
    //   }, (error) => {
    //     this.spinner.hide();
    //     swal(this.translate.instant('swal.error'), error.error.message, 'error');
    //   });
  }

  closeModalInstallment = (): void => {
    this.closeInstallmentModal.nativeElement.click();
    this.installmentFormGroupPatchValue();
  }
  closeModalPusblish = (): void => {
    this.closepusblish.nativeElement.click();
  }
  changeStatus(item, status) {
    item.status = status;
    const input = { property_id: item.id, status_id: status, reason: '' };
    if (this.reason) {
      input.reason = this.reason;
    }
    this.admin.postDataApi('updatePropertyStatus', input).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.propertyStatusChanged'), 'success');
      this.closeModal();
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }
  updateCommercialized = (propertyDetails: any, is_commercialized): void => {
    propertyDetails.is_commercialized = is_commercialized;
    this.admin.postDataApi('updateCommercialized', { id: (propertyDetails || {}).id, is_commercialized: is_commercialized }).subscribe((success) => {
      // this.spinner.hide();
      // this.getListing();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.commercializedStatusChanged'), 'success');
      this.closeModal();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }
  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
    this.parameter.total = 0;
    this.parameter.count_flag = 1;
    this.parameter.min_price = null;
    this.parameter.max_price = null;
    this.parameter.min_carpet_area = null;
    this.parameter.max_carpet_area = null;
    this.parameter.parking = null;
    this.parameter.furnished = null;
    this.parameter.bedroom = null;
    this.parameter.parking_place = null;
    this.parameter.bathroom = null;
    this.parameter.half_bathroom = null;
    this.parameter.property_type_id = null;
    this.selctedAmenities = [];
    this.selctedFilters = [];
    this.selctedProjectAmenities = [];
    this.parameter.parking_for_sale = null;
    this.resetDates();
    this.getListing(null, null);
  }

  resetDates() {
    this.parameter.min = '';
    this.parameter.max = '';
  }

  markPropertyFeatured(item, is_featured: number) {
    item.is_featured = is_featured;
    this.admin.postDataApi('markPropertyFeatured', { property_id: item.id, flag: is_featured }).subscribe(r => {
      const msg = is_featured === 1 ? this.translate.instant('message.success.featuredSuccessfully') :
        this.translate.instant('message.success.unfeaturedSuccessfully');
      swal(this.translate.instant('swal.success'), msg, 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  showAllSellers(property_id: any, index: any) {
    this.spinner.show();
    if (index !== '') { this.parameter.index = index; }
    this.admin.postDataApi('getSellerSelections', { property_id: property_id }).subscribe(r => {
      this.spinner.hide();
      this.linkSellerModal.nativeElement.click();
      this.allSellers = r['data'];
      this.selecter_seller = r['selecter_seller'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getAllSellers(property: any, keyword: string, index, user_type: string, seller_type: number) {
    this.seller_type = seller_type;
    this.user_type = user_type;
    this.spinner.show();
    if (index !== '') { this.parameter.index = index; }
    if (property && user_type == 'seller') {
      delete this.selecter_buyer;
      this.parameter.property_id = property.id;
      this.parameter.seller_id = property.selected_seller_id;
      this.admin.postDataApi('getSellerSelections', { property_id: property.id }).subscribe(r => {
        this.allSellers = r['data'];
        this.selecter_seller = r['selecter_seller'];
      });
    }
    if (property && user_type == 'buyer') {
      delete this.selecter_seller;
      this.parameter.property_id = property.id;
      this.parameter.buyer_id = property.selected_buyer_id;
      this.selecter_buyer = property.selected_buyer;
    }

    const input = { name: '', user_type: 0 };
    input.name = keyword !== '1' ? keyword : '';
    input.user_type = seller_type;

    this.admin.postDataApi('getAllBuyers', input).subscribe(r => {
      this.spinner.hide();
      if (property) {
        this.linkUserModal.nativeElement.click();
        this.keyword = '';
      }
      this.allUsers = r['data'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  linkSellerPopUp(property_id: any, user_id: any, status: number) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.status = status;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToAccessThisRequest') :
      this.translate.instant('message.error.wantToRejectThisRequest');
    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changeStatusSellerSelection();
      }
    });
  }

  showRejectSellerRequestModal(property_id: any, user_id: any, status: number) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.status = status;
    this.changeStatusSellerSelection();
    this.closeLinkSellerModal.nativeElement.click();
    this.closeLinkUserModal.nativeElement.click();
    // this.rejectModalOpen.nativeElement.click();
  }

  changeStatusPopUp(property_id: any, user_id: any, name: string, status: number, type: string) {
    this.parameter.property_id = property_id;
    this.parameter.user_id = user_id;
    this.parameter.fullName = name;
    this.parameter.status = status;
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    if (type === 'request') {
      this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToAccessThisRequest') :
        this.translate.instant('message.error.wantToRejectThisRequest');
    } else {
      if (this.user_type == 'seller') {
        this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToLinkSeller') :
          this.translate.instant('message.error.wantToUnLinkSeller');
      } else {
        this.parameter.text = status === 1 ? this.translate.instant('message.error.wantToLinkBuyer') :
          this.translate.instant('message.error.wantToUnLinkBuyer');
      }
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changeStatusSellerSelection();
      }
    });
  }

  changeStatusSellerSelection() {
    const input = {
      type: this.seller_type,
      property_id: this.parameter.property_id,
      user_id: this.parameter.user_id,
      status: this.parameter.status,
      reason: ''
    };
    if (this.reason) {
      input.reason = this.reason;
    }
    const url = this.user_type == 'seller' ? 'changeStatusSellerSelection' : 'changeStatusBuyerSelection';
    this.admin.postDataApi(url, input).subscribe(r => {
      if (this.parameter.status === 1) {
        if (this.user_type == 'seller') {
          this.parameter.seller_id = this.parameter.user_id;
          this.items[this.parameter.index].selected_seller_id = this.parameter.user_id;
          const sel_user = {
            user: { name: '' }
          };
          this.items[this.parameter.index].selected_seller = sel_user;
          this.items[this.parameter.index].selected_seller.user.name = this.parameter.fullName;
        } else {
          this.parameter.buyer_id = this.parameter.user_id;
          this.items[this.parameter.index].selected_buyer_id = this.parameter.user_id;
          const sel_user = {
            user: { name: '' }
          };
          this.items[this.parameter.index].selected_buyer = sel_user;
          this.items[this.parameter.index].selected_buyer.user.name = this.parameter.fullName;
        }
      } else {
        // reject
        if (this.user_type == 'seller') {
          this.items[this.parameter.index].selected_seller_id = null;
          this.items[this.parameter.index].selected_seller = null;
        } else {
          this.items[this.parameter.index].selected_buyer_id = null;
          this.items[this.parameter.index].selected_buyer = null;
        }
      }
      this.parameter.property_id = undefined;
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.doneSuccessfully'), 'success');
      // accept => then close listing modal
      // if (this.parameter.status === 1) {
      this.closeLinkSellerModal.nativeElement.click();
      this.closeLinkUserModal.nativeElement.click();
      // }
      // else reason modal
      this.rejectModalClose.nativeElement.click();
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  changeSoldStatusPopup(property: any, index: number, event) {

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToChangeStatus'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.changePropertySoldStatus(property, index, event.target.value);
      } else {
        if (property.for_sale === 1) {
          event.target.value = 1;
        } else if (property.for_rent === 1) {
          event.target.value = 2;
        } else if (property.for_resale === 1) {
          event.target.value = 4;
        } else {
          event.target.value = 3;
        }
      }
    });
  }

  changePropertySoldStatus(property: any, index: number, value: string) {
    this.property_status = value;
    this.items[index].for_sale = 0;
    this.items[index].for_rent = 0;
    this.items[index].for_hold = 0;
    this.items[index].for_resale = 0;
    const input = {
      property_id: property.id,
      for_hold: 0,
      for_sale: 0,
      for_rent: 0,
      for_resale: 0
    };
    if (value === '1') {
      this.items[index].for_sale = 1;
      input.for_sale = 1;
    } else if (value === '2') {
      this.items[index].for_rent = 1;
      input.for_rent = 1;
    } else if (value === '4') {
      this.items[index].for_resale = 1;
      input.for_resale = 1;
    } else {
      this.items[index].for_hold = 1;
      input.for_hold = 1;
    }
    this.admin.postDataApi('changePropertySoldStatus', input).subscribe(r => {
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.changedSuccessfully'), 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  deletePopup(property: any, index: number) {

    if (property.collection && property.collection.is_cancelled != 1) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.success.cannotDeleteProperty'), 'error');
      return;
    }

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteProperty'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteProperty(property, index);
      }
    });
  }

  deleteProperty(property: any, index: number) {
    this.admin.postDataApi('deleteProperty',
      { property_id: property.id }).subscribe(r => {
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
      },
        error => {
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
  }

  getBothBroker(property: any, keyword: string, inhouse) {
    this.spinner.show();
    if (property) { this.property = property; }
    const input = { keyword: '', type: inhouse ? 1 : 2 };
    input.keyword = keyword;
    this.admin.postDataApi('getBothBroker', input).subscribe(r => {
      this.spinner.hide();
      if (property) {
        this.keyword = '';
        inhouse ? this.linkExtBrokerModal.nativeElement.click() : this.linkOutsideBrokerModal.nativeElement.click();
      }
      this.allExtBrokers = r['data'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  agentTab(details: any, inhouse) {
    let route = '';
    if (details.is_external_agent) {
      route = `${'/dashboard/view-inhouse-users/outside-broker/'}${details.id}`;
    } else {
      route = `${'/dashboard/view-inhouse-users/inhouse-broker/'}${details.id}`;
    }
    this.keyword = '';
    inhouse ? this.closeExtBrokerModal.nativeElement.click() : this.closeOutsideBrokerModal.nativeElement.click();
    this.router.navigate([route]);
  }

  attachExternalBrokerPopUp(broker: any, flag: number, inhouse) {

    this.parameter.text = flag === 1 ? this.translate.instant('message.error.wantToLinkAgent') :
      this.translate.instant('message.error.wantToUnLinkAgent');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        inhouse ? this.attachExternalBroker(broker, flag) : this.attachOutsideBroker(broker, flag);
      }
    });
  }

  attachExternalBroker(broker: any, flag: number) {
    this.admin.postDataApi('attachExternalBroker', {
      property_id: this.property.id,
      broker_id: broker.id, flag: flag, name: broker.name
    }).subscribe(r => {
      this.closeExtBrokerModal.nativeElement.click();
      this.property.external_broker = flag === 1 ? broker : null;
      const text = flag === 1 ? this.translate.instant('message.success.linkedSuccessfully') :
        this.translate.instant('message.success.unlinkedSuccessfully');
      swal(this.translate.instant('swal.success'), text, 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  attachOutsideBroker(broker: any, flag: number) {
    this.admin.postDataApi('attachOutsideAgent', {
      property_id: this.property.id,
      outside_agent_id: broker.id,
      flag: flag, name: broker.name
    }).subscribe(r => {
      this.closeOutsideBrokerModal.nativeElement.click();
      this.property.external_outside_agent = flag === 1 ? broker : null;
      const text = flag === 1 ? this.translate.instant('message.success.linkedSuccessfully') :
        this.translate.instant('message.success.unlinkedSuccessfully');
      swal(this.translate.instant('swal.success'), text, 'success');
    },
      error => {
        swal(this.translate.instant('swal.error'), error.error.message, 'error');
      });
  }

  editPricePopup(item: any, index: number) {

    if (item.collection && item.collection.is_cancelled != 1 && this.admin.permissions && this.admin.permissions.can_collection_agent != 1) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.success.cannotEditProperty'), 'error');
      return;
    }

    this.parameter.title = this.translate.instant('message.error.areYouSure');
    swal({
      text: this.translate.instant('message.error.doYouWantToChangeThePrice'),
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        swal({
          text: this.translate.instant('message.error.pleaseEnterNewPropertyPrice'),
          input: 'number',
          showCancelButton: true,
          confirmButtonColor: this.constant.confirmButtonColor,
          cancelButtonColor: this.constant.cancelButtonColor,
          confirmButtonText: 'Update',
          inputValidator: (value) => {
            if (!value) {
              return this.translate.instant('message.error.pleaseEnterNewPrice');
            }
          }
        }).then((r) => {
          if (r.value) {
            this.admin.postDataApi('updatePrice', { id: item.id, price: r.value }).subscribe(success => {
              this.items[index].min_price = r.value;
              swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
            }, error => {
              swal(this.translate.instant('swal.error'), error.error.message, 'error');
            });
          }
        });
      }
    });
  }

  editAgentCommissionPopup(item: any, index: number, isBrokerCommissionEdited: boolean) {
    this.parameter.title = this.translate.instant('message.error.areYouSure');
    swal({
      text: this.translate.instant('message.error.doYouWantToChangeTheCommission'),
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        swal({
          text: this.translate.instant('message.error.pleaseEnterNewCommission') + ' -',
          input: 'number',
          showCancelButton: true,
          confirmButtonColor: this.constant.confirmButtonColor,
          cancelButtonColor: this.constant.cancelButtonColor,
          confirmButtonText: 'Update',
          inputValidator: (value) => {
            if (!value) {
              return this.translate.instant('message.error.pleaseEnterNewCommission');
            }
          }
        }).then((r) => {
          if (r.value) {
            const broker_commision = isBrokerCommissionEdited ? r.value : (item.broker_commision || 0);
            const total_commission = isBrokerCommissionEdited ? (item.total_commission || 0) : r.value;
            const input = { id: item.id, broker_commision: broker_commision, total_commission: total_commission };
            this.admin.postDataApi('updateBrokerCommision', input).subscribe(success => {
              this.items[index].broker_commision = broker_commision;
              this.items[index].total_commission = total_commission;
              swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
            }, error => {
              swal(this.translate.instant('swal.error'), error.error.message, 'error');
            });
          }
        });
      }
    });
  }

  viewPropertyDetails(property_id: string, data: AddPropertyModel) {
    // this.propertyService.property = data;
    this.propertyService.setPropertyData(data);
    this.router.navigate(['/dashboard/properties/details', property_id]);
  }

  getExportlisting() {
    let self = this;
    this.spinner.show();
    this.makePostRequest();
    let input: any = JSON.parse(JSON.stringify(this.parameter));
    input.page = 0;
    if (this.value1) {
      if (this.value == "all") {
        const d = this.value1.map(o => o.id);
        input.availability_filter = d;
      } else if (this.value == "select") {
        const d = this.parameter.availability_filter.map(o => o.id);
        input.availability_filter = d;
      } else if (this.value == "unselect") {
        const d = this.parameter.availability_filter.map(o => o.id);
        input.availability_filter = d;
      }
    }
    if (this.parameter.min) {
      input.min = moment(this.parameter.min).format('YYYY-MM-DD');
    } else {
      delete input.min;
    }
    if (this.parameter.max) {
      input.max = moment(this.parameter.max).format('YYYY-MM-DD');
    } else {
      delete input.max;
    }
    if (this.parameter.agent_id) {
      input.agent_id = this.parameter.agent_id;
    } else {
      delete input.agent_id;
    }
    if (this.parameter.agency_id) {
      input.agency_id = this.parameter.agency_id;
    } else {
      delete input.agency_id;
    }
    if (this.parameter.property_type_id) {
      input.property_type_id = this.parameter.property_type_id;
    } else {
      delete input.property_type_id;
    }
    delete input.seller_id;
    delete input.buyer_id;


    if (this.selctedAmenities) {
      const d = this.selctedAmenities.map(o => o.id);
      input.amenities_id = d;
    }
    if (this.selctedProjectAmenities) {
      const d = this.selctedProjectAmenities.map(o => o.id);
      input.building_amenities_id = d;
    }
    if (this.property_for !== '' && this.property_for !== '0') {
      input.property_for = this.property_for.filter(f => { return f.is_selected == true }).map(r => { return r.id })[0] || '';
    }
    input.bedroom = this.bedrooms.filter(f => { return f.is_selected == true }).map(r => { return r.name });
    input.bathroom = this.bathrooms.filter(f => { return f.is_selected == true }).map(r => { return r.name });
    input.half_bathroom = this.halfBathrooms.filter(f => { return f.is_selected == true }).map(r => { return r.name });
    input.property_id = this.propertyTypes.filter(f => { return f.is_selected == true }).map(r => { return r.id });
    input.min_price = this.parameter.min_price == '0.00' ? 0 : this.parameter.min_price;
    input.max_price = this.parameter.max_price == '0.00' ? 0 : this.parameter.max_price;
    input.min_carpet_area = this.parameter.min_carpet_area == '0.00' ? 0 : this.parameter.min_carpet_area;
    input.max_carpet_area = this.parameter.max_carpet_area == '0.00' ? 0 : this.parameter.max_carpet_area;
    input.parking = this.parameter.parking;
    input.furnished = this.parameter.furnished;
    input.parking_place = this.parameter.parking_place;
    input.parking_for_sale = this.parameter.parking_for_sale;
    input.export = this.export_num;
    this.admin.postDataApi('propertyHomeForExport', input).subscribe(
      success => {
        if (success['data'] && success['data'].length > 0) {
          success['data'].forEach(element => {
            this.exportfinalData.push(element);
          });
          if (this.exportfinalData.length == this.total) {
            self.progress_bar_per = (self.exportfinalData.length / self.total) * 100;
            self.export_num = 1;
            self.exportData();
            this.spinner.hide();
          }
          else {
            self.progress_bar_per = (self.exportfinalData.length / self.total) * 100;
            self.export_num = this.export_num + 1;
            self.getExportlisting();
          }
        }
      },
      error => {
        // this.spinner.hide();
      });
  }

  exportData() {
    if (this.exportfinalData) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];
        let obj = {
          'ID': p.id || '',
          'Name of Building': (p.building || {}).name || '',
          'City': (p.city || {}).name || '',
          'Locality': (p.locality || {}).name || '',
          'Name of Tower': (p.building_towers || {}).tower_name || '',
          'Floor': p.floor_num > 0 ? 'Floor ' + p.floor_num : 'Ground Floor',
          'Apartment': p.name || '',
          'Model': (p.building_configuration || {}).name || '',
          'Configuration Bed': p.building_configuration && p.building_configuration.config ? p.building_configuration.config.bedroom + ' Bed' : "0 Bed",
          'Configuration Bath': p.building_configuration && p.building_configuration.config ? p.building_configuration.config.bathroom + ' Bath' : '0 Bath',
          'Configuration Half Bath': p.building_configuration && p.building_configuration.config ? p.building_configuration.config.half_bathroom + ' Half Bath' : '0 Half Bath',
          'List Price': p.min_price || 0,
          'Final Price': p.final_price || 0,
          'Rent Price': p.rent_price || 0,
          'Price per m2': p.avgg_price || 0,
          'Commercial offers': p.offer_count || 0,
          'Carpet Area': p.max_area || 0,
          'Agent Commission (in %)': parseFloat(p.broker_commision).toFixed(3) || 0,
          'Commercialized by SOZU': p.is_commercialized ? 'yes' : 'no',
          'Total Commission (in %)': parseFloat(p.total_commission).toFixed(3) || 0,
          'Possession Status': p.building_towers && p.building_towers.possession_status_id == this.apiConstant.possessionStatus.sale ?
            this.translate.instant('table.tr.td.sale') : this.translate.instant('table.tr.td.presale'),
          'Delivery estimated date': p.building_towers.launch_date || 0,
          'Inhouse Agent': p.external_broker && p.external_broker.id ? p.external_broker.name : '',
          'Outside Agent': p.external_outside_agent && p.external_outside_agent.id ? p.external_outside_agent.name : '',
          'Agency': p.get_agency && p.get_agency.id ? p.get_agency.name : '',
          'Availability': p.for_sale == 1 ? this.translate.instant('table.th.buy') : p.for_rent == 1 ? this.translate.instant('table.th.rent') :
            p.for_hold == 1 ? this.translate.instant('table.th.inventory') : '',
          'Leads': parseInt(p.lead_properties_count) || 0,
          'Buyer': ((p.selected_buyer || {}).user || {}).name || '',
          'Seller': ((p.selected_seller || {}).user || {}).name || '',
          'Is Property Sold': p.is_property_sold ? 'yes' : 'no',
          'Linked Collection': p.collection ? 'yes' : 'no',
        };
        // this.selectedPropertyColumnsToShow.property_id == 0 ? delete obj['ID'] : undefined;
        // this.selectedPropertyColumnsToShow.building_name == 0 ? delete obj['Name of Building'] : undefined;
        // this.selectedPropertyColumnsToShow.tower_name == 0 ? delete obj['Name of Tower'] : undefined;
        // this.selectedPropertyColumnsToShow.floor == 0 ? delete obj['Floor'] : undefined;
        // this.selectedPropertyColumnsToShow.apartment == 0 ? delete obj['Apartment'] : undefined;
        // this.selectedPropertyColumnsToShow.model == 0 ? delete obj['Model'] : undefined;
        // this.selectedPropertyColumnsToShow.configuration == 0 ? delete obj['Configuration Bed'] : undefined;
        // this.selectedPropertyColumnsToShow.configuration == 0 ? delete obj['Configuration Bath'] : undefined;
        // this.selectedPropertyColumnsToShow.configuration == 0 ? delete obj['Configuration Half Bath'] : undefined;
        // this.selectedPropertyColumnsToShow.list_price == 0 ? delete obj['List Price'] : undefined;
        // this.selectedPropertyColumnsToShow.final_price == 0 ? delete obj['Final Price'] : undefined;
        // this.selectedPropertyColumnsToShow.rent_price == 0 ? delete obj['Rent Price'] : undefined;
        // this.selectedPropertyColumnsToShow.commercial_offers == 0 ? delete obj['Commercial offers'] : undefined;
        // this.selectedPropertyColumnsToShow.carpet_area == 0 ? delete obj['Carpet Area'] : undefined;
        // this.selectedPropertyColumnsToShow.commercialized_sozu == 0 ? delete obj['Commercialized by SOZU'] : undefined;
        // this.selectedPropertyColumnsToShow.possession_status == 0 ? delete obj['Possession Status'] : undefined;
        // this.selectedPropertyColumnsToShow.agent_commission == 0 ? delete obj['Agent Commission (in %)'] : undefined;
        // this.selectedPropertyColumnsToShow.total_commission == 0 ? delete obj['Total Commission (in %)'] : undefined;
        // this.selectedPropertyColumnsToShow.leads == 0 ? delete obj['Leads'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.change_buyer == 0 ? delete obj['Buyer'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.change_seller == 0 ? delete obj['Seller'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.link_unlink_inhouse_agent == 0 ? delete obj['Inhouse Agent'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.link_unlink_outside_agent == 0 ? delete obj['Outside Agent'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.link_agency == 0 ? delete obj['Agency'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.change_availability == 0 ? delete obj['Availability'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.is_property_sold == 0 ? delete obj['Is Property Sold'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.linked_collection == 0 ? delete obj['Linked Collection'] : undefined;
        // this.selectedPropertyColumnsToShow.price_per_m2 == 0 ? delete obj['Price per m2'] : undefined;

        exportfinalData.push(obj);
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'properties');
      this.close();
    }
  }

  getBase64ImageFromUrl(id) {
    this.admin.postDataApi('getPdfImage', { id: id }).subscribe((success) => {
      this.base64 = (success || {}).data;
      this.projectLogoImageBase64 = 'data:image/jpeg;base64,' + this.base64;
    }, (error) => {
    });
  }

  generatePDF() {
    let current_date = new Date();
    let date = this.datePipe.transform(current_date, 'd/M/y');
    let least_price = this.property_array.min_price;
    let price = this.property_array.min_price;
    let pricePerM2;
    let downpayment;
    let payment_upon_delivery;
    let monthly_installments;
    let discountPer;
    let interestPer;
    let discount;
    let interest;
    let final_price;
    let monthly_installment_amount;
    let index;
    let add_variable = [];
    let bank_detail;
    let final_downpayment_per;
    let final_downpayment;
    let layaway_per;
    if (!this.is_for_Offer) {
      if (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value && this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.length > 0) {
        this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.forEach(element => {
          let parkingPrice = parseInt(element.parkingLotsPrice.replace('$', '')) * parseInt(element.parkingLotsNumber);
          price = price + parkingPrice;
        });
      }
      discount = this.installmentFormGroup.value.discount ? (this.installmentFormGroup.value.discount * price) / 100 : 0;
      interest = this.installmentFormGroup.value.interest ? (this.installmentFormGroup.value.interest * price) / 100 : 0;
      final_price = discount ? price - discount : interest ? price + interest : price;
      pricePerM2 = final_price / this.property_array.max_area;
      layaway_per = 20000 * 100 / final_price;
      final_downpayment = this.installmentFormGroup.value.downPayment ? (this.installmentFormGroup.value.downPayment * final_price) / 100 : 0;
      downpayment = final_downpayment - 20000;
      final_downpayment_per = downpayment ? downpayment * 100 / final_price : 0;
      monthly_installment_amount = (this.installmentFormGroup.value.monthlyInstallment * final_price) / 100;
      payment_upon_delivery = (this.installmentFormGroup.value.paymentupondelivery * final_price) / 100;
      monthly_installments = monthly_installment_amount / this.installmentFormGroup.value.numberOfMI;
      this.getAddVariablesFormArray.controls.forEach((element: FormGroup) => {
        let variable_amount = element.value.addVariablesPercentage ? (element.value.addVariablesPercentage * final_price) / 100 : 0;
        add_variable.push([
          { text: element.value.addVariablesText, border: [false, false, false, false], color: '#858291' },
          { text: element.value.addVariablesPercentage ? element.value.addVariablesPercentage + '%' : 'N/A', border: [false, false, false, false], bold: true },
          { text: variable_amount ? this.price.transform(Number(variable_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
        ]);
      })
    }

    else {
      index = this.property_array.property_offer_payment.findIndex(x => x.random_id == this.offer_id);
      discountPer = this.property_array.property_offer_payment[index].discount;
      interestPer = this.property_array.property_offer_payment[index].interest;
      discount = this.property_array.property_offer_payment[index].discount ? (this.property_array.property_offer_payment[index].discount * price) / 100 : 0;
      interest = this.property_array.property_offer_payment[index].interest ? (this.property_array.property_offer_payment[index].interest * price) / 100 : 0;
      final_price = this.property_array.property_offer_payment[index].final_price;
      pricePerM2 = final_price / this.property_array.max_area;
      layaway_per = 20000 * 100 / final_price;
      downpayment = (this.property_array.property_offer_payment[index].down_payment * final_price) / 100;
      monthly_installment_amount = (this.property_array.property_offer_payment[index].monthly_installment * final_price) / 100;
      payment_upon_delivery = (this.property_array.property_offer_payment[index].payment_upon_delivery * final_price) / 100;
      monthly_installments = monthly_installment_amount / this.property_array.property_offer_payment[index].number_of_month;
      let bank_index = this.paymentBankDetailsArray.findIndex(bank => bank.id == this.property_array.property_offer_payment[0].bank_id)
      bank_detail = this.paymentBankDetailsArray[bank_index];
      this.property_array.property_offer_payment[index].property_variable.forEach(element => {
        let variable_amount = element.variable_percentage ? (element.variable_percentage * final_price) / 100 : 0;
        add_variable.push([
          { text: element.variable_name, border: [false, false, false, false], color: '#858291' },
          { text: element.variable_percentage ? element.variable_percentage + '%' : 'N/A', border: [false, false, false, false], bold: true },
          { text: variable_amount ? this.price.transform(Number(variable_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
        ]);
      })
    }

    let docDefinition = {
      pageSize: {
        width: 891,
        height: 630
      },
      content: [
        {
          columns: [
            {
              image: this.logoImageBase64,
              width: 100
            },
            {
              text: this.translate.instant('generatePDF.address'),
              margin: [80, 0, 0, 0],
              color: '#858291'
            },
            {

              text: this.translate.instant('generatePDF.addressName') + '\n' + date + '\n' + this.translate.instant('generatePDF.comnercialOfferId') + ' ' + this.offer_id,
              alignment: 'right',
              color: '#858291'
            },
          ]
        },
        {
          columns: [
            [
              this.base64 ?
                {
                  image: this.projectLogoImageBase64,
                  width: 120,
                  height: 20,
                  margin: [0, 0, 0, 20]
                } : {
                  text: ''
                },
              {
                text: this.translate.instant('generatePDF.propertyDetails'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 20]
              },
              {
                style: 'table',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],

                  body: [
                    [
                      { text: this.translate.instant('generatePDF.tower'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.building_towers.tower_name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.floor'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.floor_num == 0 ? 'Ground Floor' : this.property_array.floor_num, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.model'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.building_configuration.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.propertyName'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.name || 0, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.parkingPlaces'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.parking_count || 0, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.carpetArea'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.property_array.max_area, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.listPrice'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(least_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.installmentFormGroup.value.discount || discountPer ? this.translate.instant('generatePDF.discountP') : this.translate.instant('generatePDF.interestP'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: discount ? (this.installmentFormGroup.value.discount || discountPer) + '%' : interest ? (this.installmentFormGroup.value.interest || interestPer) + '%' : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.installmentFormGroup.value.discount || discountPer ? this.translate.instant('generatePDF.discountD') : this.translate.instant('generatePDF.interestD') || interestPer, bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(discount ? discount : interest ? interest : 0).toFixed(2)) || 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.PricePerM2'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(pricePerM2).toFixed(2)), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.finalPrice'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: this.price.transform(Number(final_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ]
                  ]
                }
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.leadName'), border: [false, false, false, false], bold: true, color: '#858291' },
                      { text: (this.is_for_Offer ? this.property_array.property_offer_payment[index].lead_name : this.installmentFormGroup.value.leadName) || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.agent'), border: [false, false, false, false], color: '#858291' },
                      { text: this.fullName || 'N/A', border: [false, false, false, false], bold: true }
                    ]
                  ]
                }
              },
            ],
            [
              {
                text: this.translate.instant('generatePDF.commercialOffer'),
                bold: true,
                fontSize: 20,
                margin: [0, 0, 0, 10]
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.monthlyPayments'), border: [false, false, false, false], color: '#858291' },
                      { text: (this.is_for_Offer ? this.property_array.property_offer_payment[index].number_of_month : this.installmentFormGroup.value.numberOfMI) || 'N/A', border: [false, false, false, false], bold: true },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPayment'), border: [false, false, false, false], color: '#858291' },
                      { text: '', border: [false, false, false, false] },
                      { text: monthly_installments ? this.price.transform(Number(monthly_installments || 0).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.layaway') + ':', border: [false, false, false, false], color: '#858291' },
                      { text: layaway_per ? ((Number(layaway_per).toFixed(3)) + '%') : '', border: [false, false, false, false], bold: true },
                      { text: this.price.transform(20000), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.downpayment') + ':', border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.is_for_Offer && this.property_array.property_offer_payment[index].down_payment ? this.property_array.property_offer_payment[index].down_payment + '%' :
                          final_downpayment_per ? ((Number(final_downpayment_per).toFixed(3)) + '%') : 'N/A', border: [false, false, false, false], bold: true
                      },
                      { text: downpayment ? this.price.transform(Number(downpayment || 0).toFixed(2)) : '', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPaymentsAmount'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.is_for_Offer && this.property_array.property_offer_payment[index].monthly_installment ? this.property_array.property_offer_payment[index].monthly_installment + '%' :
                          this.installmentFormGroup.value.monthlyInstallment ? this.installmentFormGroup.value.monthlyInstallment + '%' : 'N/A', border: [false, false, false, false], bold: true
                      },
                      { text: monthly_installment_amount ? this.price.transform(Number(monthly_installment_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.PaymentUponDelivery') + ':', border: [false, false, false, true], color: '#858291' },
                      {
                        text: this.is_for_Offer && this.property_array.property_offer_payment[index].payment_upon_delivery ? this.property_array.property_offer_payment[index].payment_upon_delivery + '%' :
                          this.installmentFormGroup.value.paymentupondelivery ? this.installmentFormGroup.value.paymentupondelivery + '%' : '', border: [false, false, false, true], bold: true
                      },
                      { text: payment_upon_delivery ? this.price.transform(Number(payment_upon_delivery).toFixed(2)) : 'N/A', border: [false, false, false, true], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.finalPrice'), border: [false, false, false, false], bold: true, fontSize: 14 },
                      { text: '', border: [false, false, false, false] },
                      { text: this.price.transform(Number(final_price).toFixed(2)), border: [false, false, false, false], bold: true, fontSize: 14 },
                    ],
                  ]
                }
              },
              {
                text: this.translate.instant('generatePDF.comments'),
                margin: [0, 10, 0, 3],
                bold: true
              },
              {
                text: this.is_for_Offer ? this.property_array.property_offer_payment[index].notes : this.installmentFormGroup.value.addNoteFormArray.length > 0 ? this.installmentFormGroup.value.addNoteFormArray[0].addNote : '',
                color: '#858291'
              },
              {
                style: 'table2',
                table: {
                  headerRows: 1,
                  widths: ['auto', 'auto'],
                  body: [
                    [
                      { text: this.translate.instant('generatePDF.bankDetails'), border: [false, false, false, false], bold: true, fontSize: 16 },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.bank'), border: [false, false, false, false], color: '#858291' },
                      { text: (this.is_for_Offer ? bank_detail.bank_name : this.installmentFormGroup.value.paymentBankDetails.bank_name) || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountInNameOf'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: (this.is_for_Offer ? bank_detail.legal_name : this.installmentFormGroup.value.paymentBankDetails.legal_name) || 'N/A', border: [false, false, false, false], bold: true
                      },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.federalTaxPayer'), border: [false, false, false, false], color: '#858291' },
                      { text: this.fedTaxPayer ? this.fedTaxPayer : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: (this.is_for_Offer ? bank_detail.account_number : this.installmentFormGroup.value.paymentBankDetails.account_number) || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.cLABE'), border: [false, false, false, false], color: '#858291' },
                      { text: (this.is_for_Offer ? bank_detail.swift : this.installmentFormGroup.value.paymentBankDetails.swift) || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                  ]
                }
              },
              {
                text: [
                  { text: this.translate.instant('generatePDF.contactUS') + '\n' + this.translate.instant('generatePDF.contactUS2'), color: '#858291' },
                  { text: ' ' + this.translate.instant('generatePDF.contactUS3'), bold: true },
                  { text: '\n' + this.translate.instant('generatePDF.contactUS4'), color: '#858291' },
                ],
                margin: [0, 10, 0, 10]
              }
            ]
          ],
          margin: [0, 40, 0, 0],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        table: {
          margin: [0, 5, 0, 15],
          border: [false, false, false, false]

        },
        table2: {
          margin: [0, 5, 0, 15],
          border: [false, false, false, false]
        },
      },
    };
    if (add_variable.length > 0) {
      let no = 5;
      add_variable.forEach(element => {
        docDefinition.content[1].columns[1][1].table.body.splice(no, 0, element);
        no = no + 1;
      });
    }
    if (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value && this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.length > 0) {
      let no = 7;
      let count = 1;
      this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.forEach(element => {
        let parkingName = this.parkingSpaceLotsArray.find(parking => parking.id == element.parkingLotsType);
        if (parkingName) {
          docDefinition.content[1].columns[0][2].table.body.splice(no, 0, [
            { text: this.translate.instant('generatePDF.parkingForSale') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
            { text: element.parkingLotsNumber, border: [false, false, false, false], bold: true }
          ]);
          // docDefinition.content[1].columns[0][2].table.body.splice(no + 1, 0, [
          //   { text: this.translate.instant('generatePDF.parkingType') + ' ' + (this.translate.defaultLang == 'en'? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
          //   { text: element.parkingLotsType, border: [false, false, false, false], bold: true }
          // ]); 
          docDefinition.content[1].columns[0][2].table.body.splice(no + 1, 0, [
            { text: this.translate.instant('generatePDF.parkingPrice') + ' ' + (this.translate.defaultLang == 'en' ? parkingName.name_en : parkingName.name_es) + ':', bold: true, border: [false, false, false, false], color: '#858291' },
            { text: this.price.transform(Number(element.parkingLotsPrice.replace('$', '')).toFixed(2)), border: [false, false, false, false], bold: true }
          ]);
          no = no + 2;
          count = count + 1;
        }
      });
    }
    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.commercialOffer') + ' ' + current_date.toISOString() + '.pdf');
    // }else if(action === 'print'){
    //   pdfMake.createPdf(docDefinition).print();
    // }else{
    //   pdfMake.createPdf(docDefinition).open();
    // }
  }

  get getAddVariablesFormArray(): FormArray {
    return this.installmentFormGroup.get('addVariablesFormArray') as FormArray;
  }

  get getAddVariablesFormArrayLength(): number {
    return this.getAddVariablesFormArray.length;
  }

  addNewAddVariables = ($event: any): void => {
    $event.stopPropagation();
    if (this.installmentFormGroup.get('tempAddVariablesText').value == '') {
      this.toastr.clear()
      this.toastr.error(this.translate.instant('message.error.pleaseEnterVariableName'), this.translate.instant('swal.error'));
    } else if (this.installmentFormGroup.get('tempAddVariablesPercentage').value == '') {
      this.toastr.clear()
      this.toastr.error(this.translate.instant('message.error.pleaseEnterVariablePercentage'), this.translate.instant('swal.error'));
    } else {
      this.getAddVariablesFormArray.push(this.createFormGroup());
      this.markIsAddVariables(false);
    }
  }

  createFormGroup = (): FormGroup => {
    const tempPercentage = this.installmentFormGroup.get('tempAddVariablesPercentage').value ? (this.installmentFormGroup.get('tempAddVariablesPercentage').value * this.getFinalPrice()) / 100 : 0;
    return this.formBuilder.group({
      addVariablesText: [{ value: this.installmentFormGroup.get('tempAddVariablesText').value, disabled: true }],
      addVariablesPercentage: [{ value: this.installmentFormGroup.get('tempAddVariablesPercentage').value, disabled: true }],
      addVariablesPercentageFinalPrice: [{
        value: this.getTransformedAmount(tempPercentage), disabled: true
      }]
    });
  }

  markIsAddVariables = (isAddVariables: boolean, $event?: any): void => {
    if ($event) {
      $event.stopPropagation();
    }
    this.installmentFormGroup.patchValue({
      isAddVariables: isAddVariables,
      tempAddVariablesText: '',
      tempAddVariablesPercentage: ''
    });
  }

  removeAddVariablesFormGroup = (index: number): void => {
    this.getAddVariablesFormArray.removeAt(index);
  }

  get getAddNoteFormArray(): FormArray {
    return this.installmentFormGroup.get('addNoteFormArray') as FormArray;
  }

  get getAddNoteFormArrayLength(): number {
    return this.getAddNoteFormArray.length;
  }

  createNoteFormGroup = (): FormGroup => {
    return this.formBuilder.group({
      addNote: [''],
    });
  }
  //banks
  createBankFormGroup = (): FormGroup => {
    return this.formBuilder.group({
      bankName: [''],
    });
  }

  addbanks = ($event: any): void => {
    $event.stopPropagation();
    this.getAddBanksFormArray.push(this.createBankFormGroup());
  }

  get getAddBanksFormArray(): FormArray {
    return this.installmentFormGroup.get('addbankFormArray') as FormArray;
  }


  //banks

  addNotes = ($event: any): void => {
    $event.stopPropagation();
    this.getAddNoteFormArray.push(this.createNoteFormGroup());
  }

  removeAddNoteFormGroup = (index: number): void => {
    this.getAddNoteFormArray.removeAt(index);
  }

  checkIsGeneratePDF = (): void => {
    //this.updateAddVariablesFinalValue();
    //if (this.getTotalPercentage() == 100.00) {
    this.spinner.show();
    //let least_price = this.property_array.min_price;
    // let price = this.property_array.min_price;
    // if (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value && this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.length > 0) {
    //   this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.forEach(element => {
    //     let parkingPrice = parseInt(element.parkingLotsPrice.replace('$', '')) * parseInt(element.parkingLotsNumber);
    //     price = price + parkingPrice;
    //   });
    // }
    // let discount = this.installmentFormGroup.value.discount ? (this.installmentFormGroup.value.discount * price) / 100 : 0;
    // let interest = this.installmentFormGroup.value.interest ? (this.installmentFormGroup.value.interest * price) / 100 : 0;
    // let final_price = discount ? price - discount : interest ? price + interest : price;
    // let layaway_per = 20000 * 100 / final_price;
    // let downpayment = this.installmentFormGroup.value.downPayment ? (this.installmentFormGroup.value.downPayment * final_price) / 100 : 0;
    // let value = downpayment - 20000;
    // let final_downpayment = value ? value * 100 / final_price : 0;
    // let addVar = [];
    // this.getAddVariablesFormArray.controls.forEach((element: FormGroup) => {
    //   addVar.push({ variable_name: element.value.addVariablesText, variable_percentage: element.value.addVariablesPercentage });
    // });
    // let park = [];
    // (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value || []).forEach(element => {
    //   park.push({ parking_lots: element.parkingLotsNumber, parking_type: element.parkingLotsType, price: element.parkingLotsPrice.substring(1) });
    // });
    if (this.property_array.building.building_payment_way.length == 0) {
      if (this.getTotalPercentage() != 100.00) {
        swal(this.translate.instant('swal.error'), this.translate.instant('generatePDF.percentageText'), 'error');
        return;
      }
    }
    let user_id = localStorage.getItem('user-id');
    let param = {
      property_id: this.property_array.id,
      name: this.installmentFormGroup.get('leadName').value,
      email: this.installmentFormGroup.get('email').value,
      country_code: this.installmentFormGroup.get('country_code').value,
      dial_code: this.installmentFormGroup.get('dial_code').value,
      phone: this.installmentFormGroup.get('phone').value,
      note: (this.installmentFormGroup.value.addNoteFormArray[0] || []).addNote || null,
      user_id: user_id,
      is_payment_way: this.property_array.building.building_payment_way.length == 0 ? 1 : 0,
      payment_ways: this.property_array.building.building_payment_way.length == 0 ? [{
        payment_name: this.installmentFormGroup.get('payment_name').value,
        downpayment: this.installmentFormGroup.get('downPayment').value,
        discount: this.installmentFormGroup.get('discount').value,
        monthly_installment: this.installmentFormGroup.get('monthlyInstallment').value,
        number_monthly_payments: this.installmentFormGroup.get('numberOfMI').value,
        payment_upon_delivery: this.installmentFormGroup.get('paymentupondelivery').value,
      }] : null
    }
    this.admin.postDataApi('propertyModifyOffer', param).subscribe(result => {
      this.is_for_Offer = false;
      this.offer_id = result.data;
      //this.generatePDF();
      this.offerPdf.offerID(this.offer_id, this.property_array);
      this.closeModalInstallment();
      this.getListing(null, null);
      this.spinner.hide();
    });
    // } else {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('generatePDF.percentageText'), 'error');
    // }
  }

  installmentFormGroupPatchValue = (): void => {
    this.installmentFormGroup.patchValue({
      payment_name: '',
      downPayment: '',
      discount: '',
      monthlyInstallment: '',
      numberOfMI: '',
      paymentupondelivery: '',
      // isAddVariables: false,
      // isAddParkingLotForSale: false,
      // parkingLotsNumber: '',
      // parkingLotsType: '',
      // parkingLotsPrice: '',
      // agencyOrSeller: false,
      // leadName: '',
      // tempAddVariablesText: '',
      // tempAddVariablesPercentage: '',
      // interest: '',
      // listPrice: '',
      // finalPrice: '',
      // paymentBankDetails: '',
      // downPaymentFinalPrice: '',
      // discountFinalPrice: '',
      // monthlyInstallmentFinalPrice: '',
      // interestFinalPrice: '',
      // paymentupondeliveryFinalPrice: ''
      leadName: '',
      email: '',
      phone: '',
      dial_code: '+52',
      country_code: 'mx'
    });
    this.getAddNoteFormArray.controls = [];
    //this.getAddVariablesFormArray.controls = [];
    //this.getParkingLotForSaleFormArray.controls = [];
    this.isPreview = false;
  }

  subscribeInstallmentFormGroup = (): void => {
    this.installmentFormGroupSubscription = this.installmentFormGroup.valueChanges.subscribe((currentValue) => {
      if (this.installmentFormGroup.get('discount').value != '') {
        this.installmentFormGroup.get('interest').disable({ onlySelf: true });
      } else if (this.installmentFormGroup.get('interest').value != '') {
        this.installmentFormGroup.get('discount').disable({ onlySelf: true });
      } else {
        this.installmentFormGroup.get('discount').enable({ onlySelf: true });
        this.installmentFormGroup.get('interest').enable({ onlySelf: true });
      }
      // if(currentValue){
      //   this.onClickPreview(false);
      // }      
    });
  }

  onAgencyOrSellerChange = (): void => {
    this.installmentFormGroup.get('paymentBankDetails').setValue('');
    this.makePaymentBankDetailsArray(false);
  }

  makePaymentBankDetailsArray = (isFirstTimeClick: boolean): void => {
    this.paymentBankDetailsArray = [];
    // this.installmentFormGroup.get('agencyOrSeller').value if true == seller or false == agency
    if (!this.installmentFormGroup.get('agencyOrSeller').value) {
      this.fedTaxPayer = (((this.bankDetails || {}).building || {}).agency || {}).fed_tax_pay || '';
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
    } else if (this.installmentFormGroup.get('agencyOrSeller').value) {
      if ((((this.bankDetails || {}).selected_seller || {}).user || {}).developer_company || (((this.bankDetails || {}).selected_seller || {}).user || {}).is_developer == 0 && !(((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity_id) {
        this.fedTaxPayer = (((this.bankDetails || {}).selected_seller || {}).user || {}).fed_tax_pay || '';
        ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_rep_banks || []).forEach((element, innerIndex) => {
          element.name = 'Seller Bank | ' + element.bank_name;
          element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
            this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
              + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name ? this.bankDetails.selected_seller.user.legal_entity.legal_name : '';
          this.paymentBankDetailsArray.push(element);
        });
      }
      else {
        this.fedTaxPayer = ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).fed_tax_pay || '';
        (((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_entity || {}).legal_entity_banks || []).forEach((element, innerIndex) => {
          element.name = 'Seller Bank | ' + element.bank_name;
          element.legal_name = this.bankDetails.selected_seller.user.developer_company ? this.bankDetails.selected_seller.user.developer_company :
            this.bankDetails.selected_seller.user.is_developer == 0 && !this.bankDetails.selected_seller.user.legal_entity_id ? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname
              + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name ? this.bankDetails.selected_seller.user.legal_entity.legal_name : '';
          this.paymentBankDetailsArray.push(element);
        });
      }
    }
    if (isFirstTimeClick) {
      this.openInstallmentModal.nativeElement.click();
    }
  }



  onClickPreview = (isPreviewClick: boolean): void => {
    if (this.getTotalPercentage() == 100.00) {
      let parking_price = this.property_array.min_price;
      this.getParkingLotForSaleFormArray.controls.forEach((element: FormGroup) => {
        parking_price += (parseFloat(element.get('parkingLotsPrice').value.toString().substring(1)) || 0)
      });
      const discount = this.installmentFormGroup.get('discount').value ? (this.installmentFormGroup.get('discount').value * parking_price) / 100 : 0;
      const interest = this.installmentFormGroup.get('interest').value ? (this.installmentFormGroup.get('interest').value * parking_price) / 100 : 0;
      // const finalPrice = discount ? this.property_array.min_price - discount : interest ? this.property_array.min_price + interest : this.property_array.min_price;
      const downPayment = this.installmentFormGroup.get('downPayment').value ? (this.installmentFormGroup.get('downPayment').value * this.getFinalPrice()) / 100 : 0;
      const paymentUponDelivery = this.installmentFormGroup.get('paymentupondelivery').value ? (this.installmentFormGroup.get('paymentupondelivery').value * this.getFinalPrice()) / 100 : 0;
      const monthlyInstallments = this.installmentFormGroup.get('monthlyInstallment').value ? (this.installmentFormGroup.get('monthlyInstallment').value * this.getFinalPrice()) / 100 : 0;
      this.installmentFormGroup.patchValue({
        listPrice: this.property_array.min_price ? ('$' + this.getTransformedAmount(this.property_array.min_price)) : ('$' + 0.00),
        finalPrice: this.getFinalPrice() ? ('$' + this.getTransformedAmount(this.getFinalPrice())) : ('$' + 0.00),
        downPaymentFinalPrice: downPayment ? this.getTransformedAmount(downPayment) : 0.00,
        discountFinalPrice: discount ? this.getTransformedAmount(discount) : 0.00,
        monthlyInstallmentFinalPrice: monthlyInstallments ? this.getTransformedAmount(monthlyInstallments) : 0.00,
        interestFinalPrice: interest ? this.getTransformedAmount(interest) : 0.00,
        paymentupondeliveryFinalPrice: paymentUponDelivery ? this.getTransformedAmount(paymentUponDelivery) : 0.00
      });
      if (isPreviewClick) {
        this.isPreview = !this.isPreview;
        (!this.isPreview) ? this.installmentFormGroup.patchValue({ finalPrice: '' }) : '';
      }
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('generatePDF.percentageText'), 'error');
    }
    this.updateAddVariablesFinalValue();
  }

  updateAddVariablesFinalValue = (): void => {
    this.getAddVariablesFormArray.controls.forEach((formGroup: FormGroup) => {
      const tempPercentage = formGroup.get('addVariablesPercentage').value ? (formGroup.get('addVariablesPercentage').value * this.getFinalPrice()) / 100 : 0;
      formGroup.get('addVariablesPercentageFinalPrice').setValue(this.getTransformedAmount(tempPercentage));
    });
  }

  getTotalPercentage() {
    let totalPercentage = 0.00;
    totalPercentage += parseFloat(this.installmentFormGroup.get('downPayment').value || 0.00);
    totalPercentage += parseFloat(this.installmentFormGroup.get('monthlyInstallment').value || 0.00);
    totalPercentage += parseFloat(this.installmentFormGroup.get('paymentupondelivery').value || 0.00);
    return totalPercentage;
  }

  getTransformedAmount(value: any) {
    return (this.price.transform(Number(value).toFixed(2)).toString()).substring(1);
  }

  getFinalPrice = (): any => {
    let parking_price = this.property_array.min_price;
    this.getParkingLotForSaleFormArray.controls.forEach((element: FormGroup) => {
      const tempparkingLotsNumber = (parseInt(element.get('parkingLotsNumber').value.toString()) || 0);
      const parkings = (parseFloat(element.get('parkingLotsPrice').value.toString().substring(1)) || 0);
      parking_price += (parkings * tempparkingLotsNumber);
    });

    const discount = this.installmentFormGroup.get('discount').value ? (this.installmentFormGroup.get('discount').value * parking_price) / 100 : 0;
    const interest = this.installmentFormGroup.get('interest').value ? (this.installmentFormGroup.get('interest').value * parking_price) / 100 : 0;
    const finalPrice = discount ? (parking_price - discount) : interest ? (parking_price + interest) : parking_price;
    return finalPrice;
  }

  initializedDropDownSetting = (): void => {
    this.multiDropdownSettingsForLocation = {
      singleSelection: false,
      idField: 'id',
      textField: this.language_code == 'en' ? 'name_en' : 'name_es',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }
  initializedDropDownSettingfor = (): void => {
    this.multiDropdownSettingsForfilter = {
      singleSelection: false,
      idField: 'id',
      textField: this.language_code == 'en' ? 'name_en' : 'name_es',
      selectAllText: this.language_code == 'en' ? 'Select All' : 'Seleccionar todo',
      unSelectAllText: this.language_code == 'en' ? 'Unselect All' : 'Deselecciona todo',
      searchPlaceholderText: this.language_code == 'en' ? 'Search' : 'Buscar',
      allowSearchFilter: true,
      itemsShowLimit: 1
    };
  }

  makePostRequest = (): void => {
    this.parameter.localities = this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities.map(o => o.id) : null;
    this.parameter.cities = this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities.map(o => o.id) : null;
  }

  addManagerNote() {

  }

  ngOnDestroy(): void {
    if (this.installmentFormGroupSubscription) {
      this.installmentFormGroupSubscription.unsubscribe();
    }
    this.makePostRequest();
    localStorage.setItem('selectedLocalitiesForProperty', JSON.stringify(this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities : []));
    localStorage.setItem('selectedCitiesForProperty', JSON.stringify(this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities : []));
    //localStorage.setItem('parametersForProperty', JSON.stringify(this.parameter));
  }

  get getParkingLotForSaleFormArray(): FormArray {
    return this.installmentFormGroup.get('parkingLotForSaleFormArray') as FormArray;
  }

  get getParkingLotForSaleFormArrayLength(): number {
    return this.getParkingLotForSaleFormArray.length;
  }

  addNewParkingLotForSale = ($event: any): void => {
    $event.stopPropagation();
    if (this.installmentFormGroup.get('parkingLotsNumber').value == '') {
      this.toastr.clear()
      this.toastr.error(this.translate.instant('message.error.pleaseEnterNoParkingLots'), this.translate.instant('swal.error'));
    } else if (this.installmentFormGroup.get('parkingLotsType').value == '') {
      this.toastr.clear()
      this.toastr.error(this.translate.instant('message.error.pleaseEnterType'), this.translate.instant('swal.error'));
    } else if (this.installmentFormGroup.get('parkingLotsPrice').value == '') {
      this.toastr.clear()
      this.toastr.error(this.translate.instant('message.error.pleaseEnterPriceEach'), this.translate.instant('swal.error'));
    } else {
      this.getParkingLotForSaleFormArray.push(this.createFormGroupForParkingLotForSale());
      this.markIsParkingLotForSale(false);
    }
  }

  createFormGroupForParkingLotForSale = (): FormGroup => {
    return this.formBuilder.group({
      parkingLotsNumber: [{ value: this.installmentFormGroup.get('parkingLotsNumber').value, disabled: true }],
      parkingLotsType: [{ value: this.installmentFormGroup.get('parkingLotsType').value, disabled: true }],
      parkingLotsPrice: [{ value: ('$' + this.installmentFormGroup.get('parkingLotsPrice').value), disabled: true }]
    });
  }

  markIsParkingLotForSale = (isParkingLotForSale: boolean, $event?: any): void => {
    if ($event) {
      $event.stopPropagation();
    }
    if (this.getParkingLotForSaleFormArrayLength == this.parkingSpaceLotsArray.length && isParkingLotForSale) {
      this.toastr.clear()
      this.toastr.error(this.translate.instant('message.error.parkingSpaceTypeAllAreInUse'), this.translate.instant('swal.error'));
    } else {
      this.installmentFormGroup.patchValue({
        isAddParkingLotForSale: isParkingLotForSale,
        parkingLotsNumber: '',
        parkingLotsType: '',
        parkingLotsPrice: ''
      });
    }
  }

  removeParkingLotForSaleFormGroup = (index: number): void => {
    this.getParkingLotForSaleFormArray.removeAt(index);
  }

  getParkingSpaceLots = (buildingId: any): void => {
    this.spinner.show();
    forkJoin([
      //this.admin.postDataApi('parkingSpaceLots', { building_id: buildingId || 0 }),
      this.admin.postDataApi('parkingSpaceRent', { building_id: buildingId || 0 }),
    ]).subscribe((response: any[]) => {
      this.spinner.hide();
      this.parkingSpaceLotsArray = response[0].data || [];
      // this.parkingSpaceRentArray = response[1].data;
    });
  }

  checkAlreadySelected = (parkingSpaceId: number): boolean => {
    const data = this.getParkingLotForSaleFormArray.controls.find((item: FormGroup) => item.get('parkingLotsType').value == parkingSpaceId);
    return data ? true : false;
  }

  openOfferModel(item: any, i) {
    this.property_index = i;
    this.propertyDetail = item;
    this.spinner.show();
    this.admin.postDataApi('getPropertyOfferById', { id: item.id }).subscribe(result => {
      this.property_offers = result.data;
      this.notesadddModalOpen.nativeElement.click();
      this.spinner.hide();
    }, error => {
      this.spinner.hide();
    });
  }

  deleteOffer(offer) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' +
        this.translate.instant('message.error.wantToDeleteCommercialOffer'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        let self = this;
        this.spinner.show();
        this.admin.postDataApi('deleteOffers', { id: offer.id }).subscribe(result => {
          if (result.data) {
            let index = self.property_offers.findIndex(x => x.id == result.data);
            self.property_offers.splice(index, 1);
            self.items.filter(x => {

            })
          }
          this.spinner.hide();
        }, error => {
          this.spinner.hide();
        });
      }
    });
  }

  closeNotesadddModalModal = (): void => {
    this.notesadddModalClose.nativeElement.click();
    this.modalClose.nativeElement.click();
  }

  offerID(item) {
    // this.offer_id = item.random_id;
    // this.spinner.show();
    // this.admin.postDataApi('getOfferById', { id: (item || {}).id }).subscribe((success) => {
    //   this.spinner.hide();
    //   this.offer_array = (success || {}).data;
    //   if(this.offer_array.id){
    //      this.openModaloffer(this.offer_array)
    //   }
    // }, (error) => {
    //   this.spinner.hide();
    //   swal(this.translate.instant('swal.error'), error.error.message, 'error');
    // });
    this.offerPdf.offerID(item, this.propertyDetail);
  }

  openModaloffer = (propertyDetails: any): void => {
    // (propertyDetails.property_offer_payment || []).forEach(e => {
    //   this.property_offer_payment = e;
    //  });
    this.property_array = propertyDetails;
    this.getBase64ImageFromUrl(this.property_array.id);
    this.spinner.show();
    this.admin.postDataApi('getPropertyDetails', { id: (propertyDetails || {}).id }).subscribe((success) => {
      this.spinner.hide();
      this.bankDetails = (success || {}).data;
      this.installmentFormGroup.get('agencyOrSeller').setValue(this.property_array.property_offer_payment[0].account_type == 1 ? false : true);
      this.makePaymentBankDetailsArray(false);
      this.getParkingSpaceLots(((success || {}).data || {}).building_id);
      this.is_for_Offer = true;
      //this.generatePDF();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  gotoAgencyTab = (details: any): void => {
    let route = '';
    route = `${'/dashboard/agencies/view-all/'}${details.name}`;
    this.keyword = '';
    this.closeLinkAgencyModal.nativeElement.click();
    this.router.navigate([route]);
  }

  getAgency = (property: any, keyword: string, index?: number): void => {
    this.spinner.show();
    if (property) {
      this.property = property;
    }
    const input = { name: keyword };
    this.admin.postDataApi('getAgency', input).subscribe((response) => {
      this.spinner.hide();
      if (property) {
        this.keyword = '';
        this.openLinkAgencyModal.nativeElement.click();
        this.propertyIndex = index;
      }
      this.agency_list = response.data || [];
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  attachAgencyPopUp = (agency: any, isUnlinkAgency: boolean): void => {
    this.parameter.text = isUnlinkAgency == false ? this.translate.instant('message.error.wantToLinkAgency') :
      this.translate.instant('message.error.wantToUnLinkAgency');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.attachAgency(agency, isUnlinkAgency);
      }
    });
  }

  attachAgency = (agency: any, isUnlinkAgency: boolean): void => {
    this.spinner.show();
    const input = {
      property_id: (this.property || {}).id, agency_id: (agency || {}).id
    };
    if (isUnlinkAgency) {
      input.agency_id = null;
    }
    this.admin.postDataApi('attachAgency', input).subscribe((response) => {
      this.spinner.hide();
      this.closeLinkAgencyModal.nativeElement.click();
      if (isUnlinkAgency) {
        this.items[this.propertyIndex].get_agency = null;
      } else {
        this.items[this.propertyIndex].get_agency = agency;
      }
      const text = isUnlinkAgency == false ? this.translate.instant('message.success.linkedSuccessfully') :
        this.translate.instant('message.success.unlinkedSuccessfully');
      swal(this.translate.instant('swal.success'), text, 'success');
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPropertySelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getPropertySelection', { name: keyword }).subscribe((response) => {
      this.spinner.hide();
      this.select_columns_list = (response.data || []).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      (this.select_columns_list || []).forEach((data, index) => {
        this.makeSelectedColumns(data.id, index);
      });
      this.changeSelect();
      if (isFirstTime) {
        this.keyword = '';
        this.isSelectAllColumns = false;
        this.language_code = localStorage.getItem('language_code');
        this.openSelectColumnsModal.nativeElement.click();
      }
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), ((error || {}).error || {}).message, 'error');
    });
  }

  closeSelectColumnsPopup = (): void => {
    this.keyword = '';
    this.isSelectAllColumns = false;
    this.closeSelectColumnsModal.nativeElement.click();
  }

  applyShowSelectedColumns = (): void => {
    this.spinner.show();
    this.admin.postDataApi('updatePropertyHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getPropertyHome();
      this.getListing(null, null);
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      building_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
      tower_name: (this.select_columns_list[1] || []).isCheckBoxChecked,
      floor: (this.select_columns_list[2] || []).isCheckBoxChecked,
      apartment: (this.select_columns_list[3] || []).isCheckBoxChecked,
      model: (this.select_columns_list[4] || []).isCheckBoxChecked,
      configuration: (this.select_columns_list[5] || []).isCheckBoxChecked,
      edit_list_price: (this.select_columns_list[6] || []).isCheckBoxChecked,
      list_price: (this.select_columns_list[7] || []).isCheckBoxChecked,
      final_price: (this.select_columns_list[8] || []).isCheckBoxChecked,
      commercial_offers: (this.select_columns_list[9] || []).isCheckBoxChecked,
      carpet_area: (this.select_columns_list[10] || []).isCheckBoxChecked,
      commercialized_sozu: (this.select_columns_list[11] || []).isCheckBoxChecked,
      possession_status: (this.select_columns_list[12] || []).isCheckBoxChecked,
      agent_commission: (this.select_columns_list[13] || []).isCheckBoxChecked,
      total_commission: (this.select_columns_list[14] || []).isCheckBoxChecked,
      edit_agent_commission: (this.select_columns_list[15] || []).isCheckBoxChecked,
      leads: (this.select_columns_list[16] || []).isCheckBoxChecked,
      change_buyer: (this.select_columns_list[17] || []).isCheckBoxChecked,
      change_seller: (this.select_columns_list[18] || []).isCheckBoxChecked,
      link_agency: (this.select_columns_list[19] || []).isCheckBoxChecked,
      change_availability: (this.select_columns_list[20] || []).isCheckBoxChecked,
      is_property_sold: (this.select_columns_list[21] || []).isCheckBoxChecked,
      linked_collection: (this.select_columns_list[22] || []).isCheckBoxChecked,
      edit_total_commission: (this.select_columns_list[23] || []).isCheckBoxChecked,
      view_seller_request: (this.select_columns_list[24] || []).isCheckBoxChecked,
      action: (this.select_columns_list[25] || []).isCheckBoxChecked,
      price_per_m2: (this.select_columns_list[26] || []).isCheckBoxChecked,
      link_unlink_inhouse_agent: (this.select_columns_list[27] || []).isCheckBoxChecked,
      link_unlink_outside_agent: (this.select_columns_list[28] || []).isCheckBoxChecked,
      rent_price: (this.select_columns_list[29] || []).isCheckBoxChecked,
      property_id: (this.select_columns_list[30] || []).isCheckBoxChecked,
      launch_date: (this.select_columns_list[31] || []).isCheckBoxChecked,
    };
  }

  getPropertyHome = (): void => {
    //this.spinner.show();
    this.admin.postDataApi('getPropertyHome', { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
      this.selectedPropertyColumnsToShow = response.data || {};
      //this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  changeSelectAll = (): void => {
    (this.select_columns_list || []).forEach((data) => {
      data.isCheckBoxChecked = this.isSelectAllColumns;
    });
  }

  changeSelect = (): void => {
    let index = 0;
    (this.select_columns_list || []).forEach((data) => {
      if (data.isCheckBoxChecked) {
        index += 1;
      }
    });
    if ((this.select_columns_list || []).length == index) {
      this.isSelectAllColumns = true;
    } else {
      this.isSelectAllColumns = false;
    }
  }

  makeSelectedColumns = (id: number, index: number): void => {
    switch (id) {
      case 1:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.building_name;
        break;
      case 2:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.tower_name;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.floor;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.apartment;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.model;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.configuration;
        break;
      case 7:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.edit_list_price;
        break;
      case 8:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.list_price;
        break;
      case 9:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.final_price;
        break;
      case 10:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.commercial_offers;
        break;
      case 11:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.carpet_area;
        break;
      case 12:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.commercialized_sozu;
        break;
      case 13:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.possession_status;
        break;
      case 14:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.agent_commission;
        break;
      case 16:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.total_commission;
        break;
      case 17:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.edit_agent_commission;
        break;
      case 18:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.leads;
        break;
      case 19:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.change_buyer;
        break;
      case 20:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.change_seller;
        break;
      case 22:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.link_agency;
        break;
      case 23:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.change_availability;
        break;
      case 24:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.is_property_sold;
        break;
      case 25:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.linked_collection;
        break;
      case 26:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.edit_total_commission;
        break;
      case 27:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.view_seller_request;
        break;
      case 28:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.action;
        break;
      case 30:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.link_unlink_inhouse_agent;
        break;
      case 31:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.link_unlink_outside_agent;
        break;
      case 32:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.price_per_m2;
        break;
      case 33:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.rent_price;
        break;
      case 34:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.property_id;
        break;
      case 35:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.launch_date;
        break;
      default:
        break;
    }

  }

  getPossessionStatuses() {
    this.admin.postDataApi('getPossessionStatuses', { hide_blocked: 1 }).subscribe(r => {
      this.possessionStatuses = r['data'];
    });
  }
  getNotes(item) {
    this.noted.agent_id = item.id;
    const input = { agent_id: item.id };
    this.admin.postDataApi('viewPropertyNotes', input).subscribe(r => {
      this.parameter.notes = r.data;
      this.notesModalOpen.nativeElement.click();
    });
  }
  addNote() {
    this.spinner.show();
    this.admin.postDataApi('addPropertyNote', {
      note: this.noted.note, title: this.noted.title,
      agent_id: this.noted.agent_id
    }).subscribe(r => {
      this.spinner.hide();
      this.noted = new Notes();
      this.parameter.notes.push(r.data);
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.addedSuccessfully'), this.translate.instant('swal.success'));
      this.closeNotesModal();
    });
  }

  closeNotesModal() {
    this.notesModalClose.nativeElement.click();
  }
  deleteNote(note_id, index) {
    this.parameter.text = this.translate.instant('message.error.wantToDeleteNote');
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Delete!'
    }).then((result) => {
      if (result.value) {
        this.deleteLeadNote(note_id, index);
      }
    });
  }


  deleteLeadNote(note_id, index) {
    this.admin.postDataApi('deletePropertyNotes', { id: note_id }).subscribe(r => {
      this.parameter.notes.splice(index, 1);
      this.toastr.clear();
      this.toastr.success(this.translate.instant('message.success.deletedSuccessfully'), this.translate.instant('swal.success'));
      this.closeNotesModal();
    });
  }
}
