import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { UserModel } from 'src/app/models/inhouse-users.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { SellerSelections, AddPropertyModel } from 'src/app/models/addProperty.model';
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
  selector: 'app-properties-for-sale-listing',
  templateUrl: './properties-for-sale-listing.component.html',
  styleUrls: ['./properties-for-sale-listing.component.css'],
  providers: [AddPropertyModel, DatePipe, PricePipe]
})
export class PropertiesForSaleListingComponent implements OnInit, OnDestroy {

  selectedvalue: bank;

  public parameter: IProperty = {};
  public location: IProperty = {};
  showMore = false;
  items: any[] = [];
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
  exportfinalData: Array<any>;
  baseUrl = this.admin.baseUrl + 'exportProperties';
  is_back: boolean;
  amenities = Array<any>();
  propertyTypes = Array<any>();
  selctedAmenities: Array<any>;
  multiDropdownSettings = {};
  //multiDropdownSettingss = {};
  invoice = new Invoice();
  property_array: any;
  offer_array: any;
  property_offer_payment: any;
  paymentBanks: Array<any>;
  isPreview: boolean = false;

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
  local_storage_parameter: any;
  @ViewChild('notesadddModalOpen') notesadddModalOpen: ElementRef;
  @ViewChild('notesadddModalClose') notesadddModalClose: ElementRef;
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
  public language_code: string;
  public selectedLocation: { selectedCountry: string, selectedStates: any[], selectedCities: any[], selectedLocalities: any[] } =
    { selectedCountry: '', selectedStates: [], selectedCities: [], selectedLocalities: [] };
  public parkingSpaceLotsArray: any[] = [];
  property_offers: any[] = [];
  property_index: any;
  is_for_Offer: boolean;
  offer_id: any;

  constructor(
    public constant: Constant,
    public apiConstant: ApiConstants,
    public admin: AdminService,
    private propertyService: PropertyService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    public model: AddPropertyModel,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private http: HttpClient,
    private price: PricePipe,
    private toastr: ToastrService
  ) {
    this.installmentFormGroup = this.formBuilder.group({
      downPayment: [''],
      discount: [''],
      monthlyInstallment: [''],
      numberOfMI: [''],
      paymentupondelivery: [''],
      isAddVariables: [false],
      isAddParkingLotForSale: [false],
      parkingLotsNumber: [''],
      parkingLotsType: [''],
      parkingLotsPrice: [''],
      agencyOrSeller: [false],
      leadName: [''],
      tempAddVariablesText: [''],
      tempAddVariablesPercentage: [''],
      interest: [''],
      paymentBankDetails: [''],
      addVariablesFormArray: this.formBuilder.array([]),
      parkingLotForSaleFormArray: this.formBuilder.array([]),
      addNoteFormArray: this.formBuilder.array([]),
      addbankFormArray: this.formBuilder.array([]),
      listPrice: [{ value: '', disabled: true }],
      finalPrice: [{ value: '', disabled: true }],
      downPaymentFinalPrice: [{ value: '', disabled: true }],
      discountFinalPrice: [{ value: '', disabled: true }],
      monthlyInstallmentFinalPrice: [{ value: '', disabled: true }],
      interestFinalPrice: [{ value: '', disabled: true }],
      paymentupondeliveryFinalPrice: [{ value: '', disabled: true }]
    });
  }

  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name_en',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }

  // iniDropDownSettings() {
  //   this.multiDropdownSettingss = {
  //     singleSelection: true,
  //     idField: 'id',
  //     textField: 'name',
  //     selectAllText: this.translate.instant('commonBlock.selectAll'),
  //     unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
  //     searchPlaceholderText: this.translate.instant('commonBlock.search'),
  //     allowSearchFilter: true,
  //     itemsShowLimit: 2
  //   };
  // }

  ngOnInit(): void {
    this.language_code = localStorage.getItem('language_code');
    this.iniDropDownSetting();
    this.initializedDropDownSetting();
    // this.iniDropDownSettings();
    this.selctedAmenities = [];
    this.seller_type = 1;
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
      this.parameter.project_id = params.project_id;
      this.parameter.property_id = params.property_id || '';
      this.parameter.keyword = params.name;
      if (params.availability_filter) {
        this.parameter.availability_filter = params.availability_filter;
      }
      if (params.type === 'agent') {
        this.parameter.agent_id = params.id;
      } else if (params.type === 'agency') {
        this.parameter.agency_id = params.id;
      }
      if (params.for) {
        this.is_back = true;
      }
    });
    this.setFloors();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.dash_flag = this.constant.dash_flag;
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
    // this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForProperty'));
    // this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
    //this.getCountries();
    this.getPropertyConfigurations();
    //this.getListing();
    this.getPropertyTypes();
    this.getPropertyAmenities();
    this.subscribeInstallmentFormGroup();
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
  }

  getParametersForProperty = (): void => {
    if (this.is_back) {
      this.selectedLocation.selectedLocalities = JSON.parse(localStorage.getItem('selectedLocalitiesForProperty'));
      this.selectedLocation.selectedCities = JSON.parse(localStorage.getItem('selectedCitiesForProperty'));
      this.parameter = JSON.parse(localStorage.getItem('parametersForProperty')) ? JSON.parse(localStorage.getItem('parametersForProperty')) : this.parameter;
    }
    this.getCountries();
  }

  // onItemDeSelect(arrayNAme: any, obj: any) {
  //   this[arrayNAme].push(obj);
  // }
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

  onItemSelect(param: any, obj: any) {
    this[param].push(obj);
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  onSelectAll(obj: any) {
  }
  // increment() {
  //   this.count++;
  // }

  // decrement() {
  //   this.count--;
  //   if (this.count < 0) {
  //     this.count = 0;
  //   }
  // }


  getPropertyTypes() {
    this.spinner.show();
    this.admin.postDataApi('getPropertyTypes', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.propertyTypes = success['data'];
          // if (this.parameter.propertyTypes.length !== 0 && this.parameter.property_id === '') {
          //   this.model.property_type_id = this.parameter.propertyTypes[0].id;
          // }
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
    $('.modal').modal('hide');
  }


  getListing() {
    this.spinner.show();
    this.makePostRequest();
    this.parameter.availability_filter = 1;
    let input: any = JSON.parse(JSON.stringify(this.parameter));
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
      // console.log(d, "filter")
      input.amenities_id = d;
    }

    input.min_price = this.parameter.min_price;
    input.max_price = this.parameter.max_price;
    input.min_carpet_area = this.parameter.min_carpet_area;
    input.max_carpet_area = this.parameter.max_carpet_area;
    input.parking = this.parameter.parking;
    input.furnished = this.parameter.furnished;
    input.parking_place = this.parameter.parking_place;
    input.parking_for_sale = this.parameter.parking_for_sale;
    input.bedroom = this.parameter.bedroom;
    input.bathroom = this.parameter.bathroom;
    input.half_bathroom = this.parameter.half_bathroom;

    if (this.parameter.property_id) {
      input = {};
      input.flag = 3;
      input.property_id = this.parameter.property_id
    }
    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        // localStorage.setItem('parametersForProperty', JSON.stringify(this.parameter));
        this.items = success.data;
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  searchProperties() {
    this.close();
    this.getListing();
  }


  getCountries() {
    this.spinner.show();
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.spinner.hide();
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
      this.getListing();
    });
  }

  getPropertyConfigurations() {
    this.spinner.show();
    this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(r => {
      this.spinner.hide();
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

  // onCityChange(id) {
  //   this.location.localities = []; this.parameter.locality_id = '0';
  //   this.parameter.buildings = []; this.parameter.building_id = '0';
  //   if (!id || id.toString() === '0') {
  //     return false;
  //   }

  //   this.parameter.city_id = id;
  //   const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
  //   this.location.localities = selectedCountry[0].localities;
  // }

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
    // this.selectedLocation.selectedLocalities = [];
    // this.location.localities = [];
    // const localities = [];
    // this.selectedLocation.selectedCities.forEach((cityObject) => {
    //   const selectedlocality = this.location.cities.filter(x => x.id == cityObject.id);
    //   (selectedlocality[0].localities || []).forEach((localityObject) => {
    //     localities.push(localityObject);
    //   });
    // });
    // this.location.localities = localities;
    this.parameter.building_id = '0';
    this.parameter.buildings = [];
    if (this.selectedLocation.selectedLocalities.length > 0) {
      this.getLocalityBuildings();
    }
  }

  // onLocalityChange(id) {
  //   this.parameter.buildings = []; this.parameter.building_id = '0';
  //   if (!id || id.toString() === '0') {
  //     return false;
  //   }
  //   this.parameter.locality_id = id;
  // }
  getLocalityBuildings = (): void => {
    //getLocalityBuildings(id) {
    // if (!id || id.toString() === '0') {
    //   return false;
    // }
    // this.parameter.locality_id = id;
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
    this.spinner.show();
    this.admin.postDataApi('getPropertyAmenities', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.spinner.hide();
          this.amenities = success['data'];
          // this.exportfinalData = success['data'].map(item => {
          //   item.name
          //   item.selected = false;
          //   item.images = [];
          //   item.images_360 = [];
          //   item.videos = [];
          //   return item;
          // });
          // console.log(this.amenities, "Amenities")
        }
      );
  }
  setBuilding(building_id) {
    this.parameter.building_id = building_id;
  }

  sort_by(sort_by) {
    if (this.parameter.sort_by !== sort_by) {
      this.parameter.sort_by = sort_by;
      this.parameter.sort_by_order = 1;
    } else {
      this.parameter.sort_by_order = this.parameter.sort_by_order ? 0 : 1;
    }
    this.getListing();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing();
  }

  openCancellationModal(item, status) {
    this.item = item;
    this.parameter.status = status;
    this.modalOpen.nativeElement.click();
  }


  closeReasonModal() {
    this.rejectModalClose.nativeElement.click();
  }


  closeModalInstallment = (): void => {
    this.closeInstallmentModal.nativeElement.click();
    this.installmentFormGroupPatchValue();
  }


  resetFilters() {
    this.location.countries = JSON.parse(JSON.stringify(this.location.countries));
    this.onCountryChange('0');
    this.parameter.is_selected = false;
    this.parameter.page = this.constant.p;
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
    this.parameter.parking_for_sale = null;
    this.getListing();
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
    const input = {
      property_id: property.id,
      for_hold: 0,
      for_sale: 0,
      for_rent: 0
    };
    if (value === '1') {
      this.items[index].for_sale = 1;
      input.for_sale = 1;
    } else if (value === '2') {
      this.items[index].for_rent = 1;
      input.for_rent = 1;
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

  getBothBroker(property: any, keyword: string) {
    this.spinner.show();
    if (property) { this.property = property; }
    const input = { keyword: '' };
    input.keyword = keyword;
    this.admin.postDataApi('getBothBroker', input).subscribe(r => {
      this.spinner.hide();
      if (property) { this.linkExtBrokerModal.nativeElement.click(); }
      this.allExtBrokers = r['data'];
    }, error => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  attachExternalBrokerPopUp(broker: any, flag: number) {

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
        this.attachExternalBroker(broker, flag);
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
    this.spinner.show();
    this.makePostRequest();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    input.page = 0;
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
    delete input.seller_id;
    delete input.buyer_id;

    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        this.exportfinalData = success['data'];
        this.exportData();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
  }

  exportData() {
    if (this.exportfinalData) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        exportfinalData.push({
          'Name of Building': p.building && p.building.name ? p.building.name : '',
          'Name of Tower': p.building_towers && p.building_towers.tower_name ? p.building_towers.tower_name : '',
          'Floor': p.floor_num > 0 ? 'Floor ' + p.floor_num : 'Ground Floor',
          'Apartment': p.name || '',
          'Model': p.building_configuration && p.building_configuration.name ? p.building_configuration.name : '',
          'Configuration Bed': p.configuration ? p.configuration.bedroom + ' Bed' : "0 Bed",
          'Configuration Bath': p.configuration ? p.configuration.bathroom + ' Bath' : '0 Bath',
          'Configuration Half Bath': p.configuration ? p.configuration.half_bathroom + ' Half Bath' : '0 Half Bath',
          'Price': parseInt(p.min_price) || 0,
          'Carpet Area': parseInt(p.max_area) || 0,
          'Agent Commission (in %)': parseInt(p.broker_commision) || 0,
          'Commercialized by SOZU': p.is_commercialized ? 'yes' : 'no',
          'Total Commission (in %)': parseInt(p.total_commission) || 0,
          'Leads': parseInt(p.lead_properties_count) || 0,
          'Buyer': p.selected_buyer && p.selected_buyer.user.name ? p.selected_buyer.user.name : '',
          'Seller': p.selected_seller && p.selected_seller.user.name ? p.selected_seller.user.name : '',
          'Is Property Sold': p.is_property_sold ? 'yes' : 'no',
          'Linked Collection': p.collection ? 'yes' : 'no',
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'properties');
    }
  }


  generatePDF() {
    let current_date = new Date();
    let date = this.datePipe.transform(current_date, 'd/M/y');
    let least_price = this.property_array.min_price;
    let pricePerM2;
    let downpayment;
    let payment_upon_delivery;
    let monthly_installments;
    let discount;
    let interest;
    let final_price;
    let monthly_installment_amount;
    let index;
    let add_variable = [];
    let bank_detail;
    if(!this.is_for_Offer){
    if (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value && this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.length > 0) {
      this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.forEach(element => {
        least_price = least_price + parseInt(element.parkingLotsPrice.replace('$', ''));
      });
    }
    discount = this.installmentFormGroup.value.discount ? (this.installmentFormGroup.value.discount * least_price) / 100 : 0;
    interest = this.installmentFormGroup.value.interest ? (this.installmentFormGroup.value.interest * least_price) / 100 : 0;
    final_price = discount ? least_price - discount : interest ? least_price + interest : least_price;
    pricePerM2 = final_price / this.property_array.max_area;
    downpayment = (this.installmentFormGroup.value.downPayment * final_price) / 100;
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

  else{
    index = this.property_array.property_offer_payment.findIndex(x=> x.random_id == this.offer_id);
    discount = this.property_array.property_offer_payment[index].discount;
    interest = this.property_array.property_offer_payment[index].interest;
    final_price = this.property_array.property_offer_payment[index].final_price;
    pricePerM2 = final_price / this.property_array.max_area;
    downpayment = (this.property_array.property_offer_payment[index].down_payment * final_price) / 100;
    monthly_installment_amount = (this.property_array.property_offer_payment[index].monthly_installment * final_price) / 100;
    payment_upon_delivery = (this.property_array.property_offer_payment[index].payment_upon_delivery * final_price) / 100;
    monthly_installments = monthly_installment_amount / this.property_array.property_offer_payment[index].number_of_month;
    let bank_index = this.paymentBankDetailsArray.findIndex(bank => bank.id == this.property_array.property_offer_payment[0].bank_id)
    bank_detail = this.paymentBankDetailsArray[bank_index];
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
                      { text: this.installmentFormGroup.value.discount ? this.translate.instant('generatePDF.discountP') : this.translate.instant('generatePDF.interestP'), bold: true, border: [false, false, false, false], color: '#858291' },
                      { text: discount ? this.installmentFormGroup.value.discount + '%' : interest ? this.installmentFormGroup.value.interest + '%' : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.installmentFormGroup.value.discount ? this.translate.instant('generatePDF.discountD') : this.translate.instant('generatePDF.interestD'), bold: true, border: [false, false, false, false], color: '#858291' },
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
                      { text: '', border: [false, false, false, false] },
                      { text: this.price.transform(20000) + '*', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.downpayment') + ':', border: [false, false, false, false], color: '#858291' },
                      { text: this.is_for_Offer && this.property_array.property_offer_payment[index].down_payment ? this.property_array.property_offer_payment[index].down_payment + '%' : 
                      this.installmentFormGroup.value.downPayment ? this.installmentFormGroup.value.downPayment + '%' : 'N/A', border: [false, false, false, false], bold: true },
                      { text: downpayment ? this.price.transform(Number(downpayment || 0).toFixed(2)) : '', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPaymentsAmount'), border: [false, false, false, false], color: '#858291' },
                      { text: this.is_for_Offer && this.property_array.property_offer_payment[index].monthly_installment ? this.property_array.property_offer_payment[index].monthly_installment + '%' : 
                      this.installmentFormGroup.value.monthlyInstallment ? this.installmentFormGroup.value.monthlyInstallment + '%' : 'N/A', border: [false, false, false, false], bold: true },
                      { text: monthly_installment_amount ? this.price.transform(Number(monthly_installment_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
                    ],
                    [
                      {
                        text: [
                          { text: this.translate.instant('generatePDF.PaymentUponDelivery') + ':' },
                          { text: '\n' + this.translate.instant('generatePDF.commercialOfferP'), color: '#858291', fontSize: 8, margin: [0, 5, 0, 5] }
                        ],
                        border: [false, false, false, true], color: '#858291'
                      },
                      { text: this.is_for_Offer && this.property_array.property_offer_payment[index].payment_upon_delivery? this.property_array.property_offer_payment[index].payment_upon_delivery  + '%' : 
                      this.installmentFormGroup.value.paymentupondelivery ? this.installmentFormGroup.value.paymentupondelivery + '%' : '', border: [false, false, false, true], bold: true },
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
      add_variable
    }
    if (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value && this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.length > 0) {
      let no = 5;
      let count = 1;
      this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.forEach(element => {
        let parkingName = this.parkingSpaceLotsArray.find(parking => parking.id == element.parkingLotsType)
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
    this.updateAddVariablesFinalValue();
    if (this.getTotalPercentage() == 100.00) {
      this.spinner.show();
      let least_price = this.property_array.min_price
    if (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value && this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.length > 0) {
      this.installmentFormGroup.controls.parkingLotForSaleFormArray.value.forEach(element => {
        least_price = least_price + parseInt(element.parkingLotsPrice.replace('$', ''));
      });
    }
      let discount = this.installmentFormGroup.value.discount ? (this.installmentFormGroup.value.discount * least_price) / 100 : 0;
      let interest = this.installmentFormGroup.value.interest ? (this.installmentFormGroup.value.interest * least_price) / 100 : 0;
      let final_price = discount ? least_price - discount : interest ? least_price + interest : least_price;
      let addVar = [];
      this.getAddVariablesFormArray.controls.forEach((element: FormGroup) => {
        addVar.push({variable_name: element.value.addVariablesText, variable_percentage: element.value.addVariablesPercentage});
      });
      let park = [];
      (this.installmentFormGroup.controls.parkingLotForSaleFormArray.value || []).forEach(element =>{
        park.push({parking_lots: element.parkingLotsNumber, parking_type: element.parkingLotsType, price: element.parkingLotsPrice});
      });
      let param={
        id: this.property_array.id,
        down_payment: this.installmentFormGroup.get('downPayment').value,
        discount: this.installmentFormGroup.get('discount').value,
        monthly_installment: this.installmentFormGroup.get('monthlyInstallment').value,
        interest: this.installmentFormGroup.get('interest').value,
        number_of_month: this.installmentFormGroup.get('numberOfMI').value,
        payment_upon_delivery: this.installmentFormGroup.get('paymentupondelivery').value,
        lead_name: this.installmentFormGroup.get('leadName').value,
        final_price: final_price,
        bank_id: this.installmentFormGroup.value.paymentBankDetails.id,
        account_type: this.installmentFormGroup.get('agencyOrSeller').value? 2 : 1,
        note: (this.installmentFormGroup.value.addNoteFormArray[0] || []).addNote || null,
        parking_lots: park,
        property_var: addVar
      }
      this.admin.postDataApi('createOffers', param).subscribe(result=>{
        this.is_for_Offer = false;
        this.offer_id = result.data;
        this.generatePDF();
        this.closeModalInstallment();
        this.getListing();
        this.spinner.hide();
      });
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('generatePDF.percentageText'), 'error');
    }
  }

  installmentFormGroupPatchValue = (): void => {
    this.installmentFormGroup.patchValue({
      downPayment: '',
      discount: '',
      monthlyInstallment: '',
      numberOfMI: '',
      paymentupondelivery: '',
      isAddVariables: false,
      isAddParkingLotForSale: false,
      parkingLotsNumber: '',
      parkingLotsType: '',
      parkingLotsPrice: '',
      agencyOrSeller: false,
      leadName: '',
      tempAddVariablesText: '',
      tempAddVariablesPercentage: '',
      interest: '',
      listPrice: '',
      finalPrice: '',
      paymentBankDetails: '',
      downPaymentFinalPrice: '',
      discountFinalPrice: '',
      monthlyInstallmentFinalPrice: '',
      interestFinalPrice: '',
      paymentupondeliveryFinalPrice: ''
    });
    this.getAddNoteFormArray.controls = [];
    this.getAddVariablesFormArray.controls = [];
    this.getParkingLotForSaleFormArray.controls = [];
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
    this.getAddVariablesFormArray.controls.forEach((formGroup: FormGroup) => {
      totalPercentage += parseFloat(formGroup.get('addVariablesPercentage').value || 0.00);
    });
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
      parking_price += (parseFloat(element.get('parkingLotsPrice').value.toString().substring(1)) || 0)
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
    localStorage.setItem('parametersForProperty', JSON.stringify(this.parameter));
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


  checkAlreadySelected = (parkingSpaceId: number): boolean => {
    const data = this.getParkingLotForSaleFormArray.controls.find((item: FormGroup) => item.get('parkingLotsType').value == parkingSpaceId);
    return data ? true : false;
  }

  openOfferModel(item: any, i) {
    this.property_index = i;
    this.spinner.show();
    this.admin.postDataApi('getPropertyOfferById', {id: item.id}).subscribe(result=>{
      this.property_offers = result.data;
      this.notesadddModalOpen.nativeElement.click();
      this.spinner.hide();
      },error=>{
        this.spinner.hide();
      });
  }

  deleteOffer(offer){
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
        this.admin.postDataApi('deleteOffers', {id: offer.id}).subscribe(result=>{
      if(result.data){
      let index = self.property_offers.findIndex(x=> x.id == result.data);
      self.property_offers.splice(index, 1);
      self.items.filter(x=>{
     
      })
      }
      this.spinner.hide();
      },error=>{
        this.spinner.hide();
      });
      }
    });
  }

  closeNotesadddModalModal = (): void => {
    this.notesadddModalClose.nativeElement.click();
    this.modalClose.nativeElement.click();
  }
}