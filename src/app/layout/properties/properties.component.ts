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
  providers: [AddPropertyModel, DatePipe, PricePipe]
})
export class PropertiesComponent implements OnInit, OnDestroy {
  selectedvalue: bank;

  public parameter: IProperty = {};
  public location: IProperty = {};
  showMore = false;
  items: any = [];
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
  paymentBanks: Array<any>;

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

  public installmentFormGroup: FormGroup;
  public paymentBankDetailsArray: any[] = [];
  private installmentFormGroupSubscription: Subscription;
  logoImageBase64: any;
  projectLogoImageBase64: any;
  private bankDetails: any;
  private fedTaxPayer: string;
  base64: any;
  fullName: any;

  constructor(
    public constant: Constant,
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
    private price: PricePipe
  ) {
    this.installmentFormGroup = this.formBuilder.group({
      downPayment: [''],
      discount: [''],
      monthlyInstallment: [''],
      numberOfMI: [''],
      paymentupondelivery: [''],
      isAddVariables: [false],
      agencyOrSeller: [false],
      leadName: [''],
      tempAddVariablesText: [''],
      tempAddVariablesPercentage: [''],
      interest: [''],
      paymentBankDetails: [''],
      addVariablesFormArray: this.formBuilder.array([]),
      addNoteFormArray: this.formBuilder.array([]),
      addbankFormArray: this.formBuilder.array([]),
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

  ngOnInit() {
    this.iniDropDownSetting();
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
    this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForProperty'));
    this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
    this.getCountries();
    this.getPropertyConfigurations();
    this.getListing();
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
    this.admin.postDataApi('getPropertyTypes', { hide_blocked: 1 })
      .subscribe(
        success => {
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
    const input: any = JSON.parse(JSON.stringify(this.parameter));
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
    this.admin.postDataApi('propertyHome', input).subscribe(
      success => {
        localStorage.setItem('parametersForProperty', JSON.stringify(this.parameter));
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
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  getPropertyConfigurations() {
    this.admin.postDataApi('getPropertyConfigurations', {}).subscribe(r => {
      this.configurations = r['data'];
    });
  }

  onCountryChange(id) {
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
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    this.parameter.buildings = []; this.parameter.building_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  getLocalityBuildings(id) {
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
    this.spinner.show();
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

  changeFlag(flag: number) {
    this.parameter.dash_flag = flag;
    this.propertyService.dash_flag = flag;
    if (flag === 5) {
      return false;
    }
    this.resetDates();
    this.getListing();
  }

  changePropertyFlag(flag) {
    this.parameter.flag = flag;
    this.getListing();
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

  openModalInstallment = (propertyDetails: any): void => {
    this.property_array = propertyDetails;
    this.getBase64ImageFromUrl(this.property_array.id);
    this.spinner.show();
    this.admin.postDataApi('getPropertyDetails', { id: (propertyDetails || {}).id }).subscribe((success) => {
      this.spinner.hide();
      this.bankDetails = (success || {}).data;
      this.makePaymentBankDetailsArray(true);
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  closeModalInstallment = (): void => {
    this.closeInstallmentModal.nativeElement.click();
    this.installmentFormGroupPatchValue();
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
    this.parameter.parking_for_sale = null;
    this.resetDates();
    this.getListing();
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
      if (property) { this.linkUserModal.nativeElement.click(); }
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
      swal(this.translate.instant('swal.error'), this.translate.instant('message.success.cannotDeleteProperty'), 'error');
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
          'Price': p.min_price || 0,
          'Carpet Area': p.max_area || 0,
          'Agent Commission (in %)': p.broker_commision || 0,
          'Commercialized by SOZU': p.is_commercialized ? 'yes' : 'no',
          'Total Commission (in %)': p.total_commission || 0,
          'Leads': p.lead_properties_count || 0,
          'Buyer': p.selected_buyer && p.selected_buyer.user.name ? p.selected_buyer.user.name : '',
          'Seller': p.selected_seller && p.selected_seller.user.name ? p.selected_seller.user.name : '',
          'Is Property Sold': p.is_property_sold ? 'yes' : 'no',
          'Linked Collection': p.collection ? 'yes' : 'no',
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'properties');
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
    let pricePerM2 = this.property_array.min_price / this.property_array.max_area;
    let discount = this.installmentFormGroup.value.discount ? (this.installmentFormGroup.value.discount * this.property_array.min_price) / 100 : 0;
    let interest = this.installmentFormGroup.value.interest ? (this.installmentFormGroup.value.interest * this.property_array.min_price) / 100 : 0;
    let final_price = discount ? this.property_array.min_price - discount : interest ? this.property_array.min_price + interest : this.property_array.min_price;
    let downpayment = (this.installmentFormGroup.value.downPayment * final_price) / 100;
    let monthly_installment_amount = (this.installmentFormGroup.value.monthlyInstallment * final_price) / 100;
    let payment_upon_delivery = (this.installmentFormGroup.value.paymentupondelivery * final_price) / 100;
    let monthly_installments = monthly_installment_amount / this.installmentFormGroup.value.numberOfMI;

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

              text: this.translate.instant('generatePDF.addressName') + '\n' + date,
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
                      { text: this.translate.instant('generatePDF.tower'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.property_array.building_towers.tower_name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.floor'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.property_array.floor_num == 0 ? 'Ground Floor' : this.property_array.floor_num, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.model'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.property_array.building_configuration.name, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.propertyName'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.property_array.name || 0, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.parkingPlaces'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.property_array.parking_count || 0, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.carpetArea'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.property_array.max_area, border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.PricePerM2'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.price.transform(Number(pricePerM2).toFixed(2)), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.listPrice'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.price.transform(Number(this.property_array.min_price).toFixed(2)), border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.installmentFormGroup.value.discount ? this.translate.instant('generatePDF.discountP'): this.translate.instant('generatePDF.interestP'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: discount? this.installmentFormGroup.value.discount + '%' : interest ? this.installmentFormGroup.value.interest + '%' : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.installmentFormGroup.value.discount ? this.translate.instant('generatePDF.discountD'): this.translate.instant('generatePDF.interestD'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
                      { text: this.price.transform(Number(discount? discount : interest ? interest : 0).toFixed(2)) || 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.finalPrice'), bold: true, border: [false, false, false, false], color: '#858291', height: 80 },
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
                      { text: this.installmentFormGroup.value.leadName || 'N/A', border: [false, false, false, false], bold: true }
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
                      { text: this.installmentFormGroup.value.numberOfMI || 'N/A', border: [false, false, false, false], bold: true },
                      { text: '', border: [false, false, false, false] }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPayment'), border: [false, false, false, false], color: '#858291' },
                      { text: '', border: [false, false, false, false] },
                      { text: monthly_installments ? this.price.transform(Number(monthly_installments || 0).toFixed(2)) : 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.layaway'), border: [false, false, false, false], color: '#858291' },
                      { text: '', border: [false, false, false, false] },
                      { text: this.price.transform(20000) + '*', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.downpayment'), border: [false, false, false, false], color: '#858291' },
                      { text: this.installmentFormGroup.value.downPayment ? this.installmentFormGroup.value.downPayment + '%' : 'N/A', border: [false, false, false, false], bold: true },
                      { text: downpayment ? this.price.transform(Number(downpayment || 0).toFixed(2)) : '', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.monthlyPaymentsAmount'), border: [false, false, false, false], color: '#858291' },
                      { text: this.installmentFormGroup.value.monthlyInstallment ? this.installmentFormGroup.value.monthlyInstallment + '%' : 'N/A', border: [false, false, false, false], bold: true },
                      { text: monthly_installment_amount ? this.price.transform(Number(monthly_installment_amount).toFixed(2)) : '', border: [false, false, false, false], bold: true }
                    ],
                    [
                      {
                        text: [
                          { text: this.translate.instant('generatePDF.PaymentUponDelivery') },
                          { text: '\n' + this.translate.instant('generatePDF.commercialOfferP'), color: '#858291', fontSize: 8, margin: [0, 5, 0, 5] }
                        ],
                        border: [false, false, false, true], color: '#858291'
                      },
                      { text: this.installmentFormGroup.value.paymentupondelivery ? this.installmentFormGroup.value.paymentupondelivery + '%' : '', border: [false, false, false, true], bold: true },
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
                text: this.installmentFormGroup.value.addNoteFormArray.length > 0 ? this.installmentFormGroup.value.addNoteFormArray[0].addNote : '',
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
                      { text: this.installmentFormGroup.value.paymentBankDetails.bank_name || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountInNameOf'), border: [false, false, false, false], color: '#858291' },
                      {
                        text: this.installmentFormGroup.value.paymentBankDetails.legal_name, border: [false, false, false, false], bold: true
                      },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.federalTaxPayer'), border: [false, false, false, false], color: '#858291' },
                      { text: this.installmentFormGroup.value.paymentBankDetails.bank_name && this.fedTaxPayer ? this.fedTaxPayer : 'N/A', border: [false, false, false, false], bold: true },
                    ],
                    [
                      { text: this.translate.instant('generatePDF.accountNumber'), border: [false, false, false, false], color: '#858291' },
                      { text: this.installmentFormGroup.value.paymentBankDetails.account_number || 'N/A', border: [false, false, false, false], bold: true }
                    ],
                    [
                      { text: this.translate.instant('generatePDF.cLABE'), border: [false, false, false, false], color: '#858291' },
                      { text: this.installmentFormGroup.value.paymentBankDetails.swift || 'N/A', border: [false, false, false, false], bold: true }
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
              },
              {
                text: this.translate.instant('generatePDF.titleMargot') + ' ' + this.property_array.building.name + ', ' + this.translate.instant('generatePDF.title2Margot'),
                bold: true
              },
            ]
          ],
          margin: [0, 40, 0, 0]
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

    pdfMake.createPdf(docDefinition).download(this.translate.instant('generatePDF.commercialOffer'));
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
    this.getAddVariablesFormArray.push(this.createFormGroup());
    this.markIsAddVariables(false);
  }

  createFormGroup = (): FormGroup => {
    return this.formBuilder.group({
      addVariablesText: [{ value: this.installmentFormGroup.get('tempAddVariablesText').value, disabled: true }],
      addVariablesPercentage: [{ value: this.installmentFormGroup.get('tempAddVariablesPercentage').value, disabled: true }]
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
    let totalPercentage = 0.00;
    this.getAddVariablesFormArray.controls.forEach((formGroup: FormGroup) => {
      totalPercentage += parseFloat(formGroup.get('addVariablesPercentage').value || 0.00);
    });
    totalPercentage += parseFloat(this.installmentFormGroup.get('downPayment').value || 0.00);
    // totalPercentage += Number(this.installmentFormGroup.get('discount').value);
    // totalPercentage += Number(this.installmentFormGroup.get('interest').value);
    totalPercentage += parseFloat(this.installmentFormGroup.get('monthlyInstallment').value || 0.00);
    totalPercentage += parseFloat(this.installmentFormGroup.get('paymentupondelivery').value || 0.00);
    //console.log(totalPercentage)
    if (totalPercentage == 100.00) {
      this.generatePDF();
      this.closeModalInstallment();
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
      agencyOrSeller: false,
      leadName: '',
      tempAddVariablesText: '',
      tempAddVariablesPercentage: '',
      interest: '',
      paymentBankDetails: ''
    });
    this.getAddNoteFormArray.controls = [];
    this.getAddVariablesFormArray.controls = [];
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
       this.fedTaxPayer = (((this.bankDetails || {}).selected_seller || {}).user || {}).fed_tax_pay || '';
      ((((this.bankDetails || {}).selected_seller || {}).user || {}).legal_rep_banks || []).forEach((element, innerIndex) => {
        element.name = 'Seller Bank | ' + element.bank_name;
        element.legal_name = this.bankDetails.selected_seller.user.developer_company? this.bankDetails.selected_seller.user.developer_company : 
        this.bankDetails.selected_seller.user.is_developer == 0  && !this.bankDetails.selected_seller.user.legal_entity_id? this.bankDetails.selected_seller.user.name + ' ' + this.bankDetails.selected_seller.user.first_surname 
        + ' ' + this.bankDetails.selected_seller.user.second_surname : this.bankDetails.selected_seller.user.legal_entity.legal_name? this.bankDetails.selected_seller.user.legal_entity.legal_name: '';
        this.paymentBankDetailsArray.push(element);
      });
      // payment directly received by seller
      // if (((this.bankDetails || {}).collection || {}).seller_type != 2) {
      //   // seller (as a person or developer) banks
      //   for (let index = 0; index < (((this.bankDetails.collection || {}).buyer || {}).legal_rep_banks || []).length; index++) {
      //     const element = this.bankDetails.collection.buyer.legal_rep_banks[index];
      //     element.name = 'Seller Bank | ' + element.bank_name;
      //     element.is_agency = 2;
      //     element.bank_id = element.id;
      //     element.legal_rep_bank_id = null;
      //     element.Legal_name = (((this.bankDetails || {}).collection || {}).seller_legal_entity || {}).legal_name || '';
      //     this.paymentBankDetailsArray.push(element);
      //   }

      //   // agency legal representative banks
      //   if (((this.bankDetails.collection || {}).buyer || {}).legal_representative) {
      //     for (let index = 0; index < ((this.bankDetails.collection.buyer.legal_representative || {}).legal_rep_banks || []).length; index++) {
      //       const element = this.bankDetails.collection.buyer.legal_representative.legal_rep_banks[index];
      //       element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
      //       element.is_agency = 2;
      //       element.bank_id = null;
      //       element.legal_rep_bank_id = element.id;
      //       this.paymentBankDetailsArray.push(element);
      //     }
      //   }
      // } else {
      //   // seller (as a legal entity) banks
      //   if ((((this.bankDetails || {}).collection || {}).seller_legal_entity || {}).legal_entity_banks) {
      //     for (let index = 0; index < (this.bankDetails.collection.seller_legal_entity.legal_entity_banks || []).length; index++) {
      //       const element = this.bankDetails.collection.seller_legal_entity.legal_entity_banks[index];
      //       element.name = 'Seller Bank | ' + element.bank_name;
      //       element.is_agency = 2;
      //       element.bank_id = element.id;
      //       element.legal_rep_bank_id = null;
      //       this.paymentBankDetailsArray.push(element);
      //     }

      //     // agency legal representative banks
      //     if (((((this.bankDetails || {}).collection || {}).seller_legal_entity || {}).legal_reps || {}).legal_rep_banks) {
      //       for (let index = 0; index < (this.bankDetails.collection.seller_legal_entity.legal_reps.legal_rep_banks || []).length; index++) {
      //         const element = this.bankDetails.collection.seller_legal_entity.legal_reps.legal_rep_banks[index];
      //         element.name = 'Seller Legal Rep Bank | ' + element.bank_name;
      //         element.is_agency = 2;
      //         element.bank_id = null;
      //         element.legal_rep_bank_id = element.id;
      //         this.paymentBankDetailsArray.push(element);
      //       }
      //     }
      //   }
      // }
    }
    if (isFirstTimeClick) {
      this.openInstallmentModal.nativeElement.click();
    }
  }

  updateCommercialized = (propertyDetails: any): void => {
    this.spinner.show();
    this.admin.postDataApi('updateCommercialized', { id: (propertyDetails || {}).id }).subscribe((success) => {
      this.spinner.hide();
      this.getListing();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.commercializedStatusChanged'), 'success');
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  ngOnDestroy(): void {
    if (this.installmentFormGroupSubscription) {
      this.installmentFormGroupSubscription.unsubscribe();
    }
  }
}
