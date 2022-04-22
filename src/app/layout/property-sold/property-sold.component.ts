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
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { ExcelDownload } from 'src/app/common/excelDownload';
import { ApiConstants } from 'src/app/common/api-constants';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { GenerateOfferPdfService } from 'src/app/services/generate-offer-pdf.service';

declare let swal: any;
declare var $: any;

@Component({
  selector: 'app-property-sold',
  templateUrl: './property-sold.component.html',
  styleUrls: ['./property-sold.component.css'],
  providers: [AddPropertyModel, DatePipe, PricePipe]
})
export class PropertySoldComponent implements OnInit {

  public parameter: IProperty = {};
  public location: IProperty = {};
  showMore = false;
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
  property_array: any;
  offer_array: any;
  property_offer_payment: any;
  paymentBanks: Array<any>;
  isPreview: boolean = false;
  local_storage_parameter: any;
  public installmentFormGroup: FormGroup;
  public paymentBankDetailsArray: any[] = [];
  private installmentFormGroupSubscription: Subscription;
  logoImageBase64: any;
  projectLogoImageBase64: any;
  private fedTaxPayer: string;
  base64: any;
  fullName: any;
  public multiDropdownSettingsForLocation = {};
  login_data_out: any = {};
  public language_code: string;
  public selectedLocation: { selectedCountry: string, selectedStates: any[], selectedCities: any[], selectedLocalities: any[] } =
    { selectedCountry: '', selectedStates: [], selectedCities: [], selectedLocalities: [] };
  public parkingSpaceLotsArray: any[] = [];
  property_offers: any[] = [];
  property_index: any;
  is_for_Offer: boolean;
  offer_id: any;
  agency_list: any;
  propertyIndex: any;
  @ViewChild('openSelectColumnsModal') openSelectColumnsModal: ElementRef;
  @ViewChild('closeSelectColumnsModal') closeSelectColumnsModal: ElementRef;
  select_columns_list: any[] = [];
  public selectedPropertyColumnsToShow: any = {};
  public isSelectAllColumns: boolean = false;
  items: any[] = [];
  total: any = 0;
  is_filter: boolean = false;
  found: any;
  initialCountry = { initialCountry: 'mx' };
  isShown = false;
  availabilityStatus = Array<any>();
  all: number;
  selectedvalue: any;
  value: any;

  constructor(
    public constant: Constant, private toastr: ToastrService,
    public apiConstant: ApiConstants, public admin: AdminService,
    private propertyService: PropertyService, private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private offerPdf: GenerateOfferPdfService,
    private translate: TranslateService, public model: AddPropertyModel,
    private formBuilder: FormBuilder, private datePipe: DatePipe,
    private http: HttpClient, private price: PricePipe, public cs: CommonService) {
    var all_data = JSON.parse(localStorage.getItem('all'));
    this.login_data_out = all_data.data;
    var keys = Object.keys(all_data.data.permissions);
    var filtered = keys.filter(function (key) {
      return all_data.data.permissions[key]
    });
    var theRemovedElement = filtered.slice(3);
    theRemovedElement.splice(-2);
    this.found = theRemovedElement.find(element => element == 'can_outside_broker');
    if (theRemovedElement.length > 1) {
      this.all = 0;
    } else if (theRemovedElement.length == 1) {
      console.log(this.found, "property_sale");
      if (this.found == 'can_outside_broker') {
        this.all = 1;
      } else {
        this.all = 0;
      }
    } else {
      this.all = 0;
    }
  }

  ngOnInit() {
    this.cs.sold_items = JSON.parse(localStorage.getItem('property_sold_data'));
    this.cs.sold_total = JSON.parse(localStorage.getItem('property_sold_total'));
    this.language_code = localStorage.getItem('language_code');
    this.getPropertyHome();
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
    this.parameter.broker_id = 1;
    this.getPropertyConfigurations();
    //  this.getListing();
    this.getPropertyTypes();
    this.getPropertyAmenities();
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
    this.getCountries();
    this.getParametersForProperty();
  }

  getParametersForProperty = (): void => {
    if (this.is_back) {
      this.selectedLocation.selectedLocalities = JSON.parse(localStorage.getItem('selectedLocalitiesForProperty'));
      this.selectedLocation.selectedCities = JSON.parse(localStorage.getItem('selectedCitiesForProperty'));
      this.parameter = JSON.parse(localStorage.getItem('parametersForProperty')) ? JSON.parse(localStorage.getItem('parametersForProperty')) : this.parameter;
    }
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

  onItemSelect(param: any, obj: any) {
    this[param].push(obj);
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  onSelectAll(obj: any) {
  }

  getPropertyTypes() {
    this.admin.postDataApi('getPropertyTypes', { hide_blocked: 1 })
      .subscribe(
        success => {
          this.propertyTypes = success['data'];
        });
  }


  makePostRequest = (): void => {
    this.parameter.localities = this.selectedLocation.selectedLocalities.length > 0 ? this.selectedLocation.selectedLocalities.map(o => o.id) : null;
    this.parameter.cities = this.selectedLocation.selectedCities.length > 0 ? this.selectedLocation.selectedCities.map(o => o.id) : null;
  }

  getListing(data, value) {
    this.spinner.show();
    this.makePostRequest();
    //this.parameter.availability_filter = 1;
    let input: any = JSON.parse(JSON.stringify(this.parameter));
    if (value) {
      this.value = data;
      this.value = value;
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
    if (this.found == 'can_outside_broker') {
      input.admin_id = this.login_data_out.id;
      console.log(input.admin_id, "list");
    }
    if (this.parameter.property_id) {
      input = {};
      input.flag = 3;
      input.property_id = this.parameter.property_id
    }
    this.admin.postDataApi('propertySold', input).subscribe(
      success => {
        this.is_filter = true;
        // localStorage.setItem('parametersForProperty', JSON.stringify(this.parameter));
        this.items = success.data;
        this.items.forEach(function (element) {
          element['price_per_square_meter'] = (((parseFloat(element.min_price) || 0) / (parseFloat(element.max_area) || 0)));
        });
        this.total = success.total_count;
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
      });
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

  searchProperties() {
    this.close();
    this.getListing(null, null);
  }


  getCountries() {
    //this.spinner.show();
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
      //this.getListing();
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
      if (this.found == 'can_outside_broker') {
        this.getLocalityBuildings_out();
      } else {
        this.getLocalityBuildings();
      }

    }
  }

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
  getLocalityBuildings_out = (): void => {
    this.spinner.show();
    this.makePostRequest();
    let input = {
      localities: this.parameter.localities,
      admin_id: this.login_data_out.id,
    }
    this.admin.postDataApi('getadminLocalityBuildings', input)
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
        });
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
    this.getListing(null, null);
  }

  getPage(page) {
    this.parameter.page = page;
    this.getListing(null, null);
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
    this.parameter.floor_num = null;
    this.parameter.configuration_id = null;
    this.parameter.building_id = null;
    this.parameter.configuration_name = null;
    this.getListing(null, null);
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
    if (this.found == 'can_outside_broker') {
      input.admin_id = this.login_data_out.id;
      console.log(this.login_data_out.id, "list");
    }
    this.admin.postDataApi('propertySold', input).subscribe(
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
        let obj = {
          'ID': p.id || '',
          'Name of Building': (p.building || {}).name || '',
          'Floor': p.floor_num > 0 ? 'Floor ' + p.floor_num : 'Ground Floor',
          'Apartment': p.name || '',
          'Model': (p.building_configuration || {}).name || '',
          'Configuration Bed': p.configuration ? p.configuration.bedroom + ' Bed' : "0 Bed",
          'Configuration Bath': p.configuration ? p.configuration.bathroom + ' Bath' : '0 Bath',
          'Configuration Half Bath': p.configuration ? p.configuration.half_bathroom + ' Half Bath' : '0 Half Bath',
          'Final Price': parseInt(p.final_price) || 0,
          'Price per m2': p.avgg_price || 0,
          'Outside Agent': p.external_outside_agent ? p.external_outside_agent.name : 'N/A',
        }

        this.selectedPropertyColumnsToShow.building_name == 0 ? delete obj['Name of Building'] : undefined;
        this.selectedPropertyColumnsToShow.floor == 0 ? delete obj['Floor'] : undefined;
        this.selectedPropertyColumnsToShow.apartament == 0 ? delete obj['Apartment'] : undefined;
        this.selectedPropertyColumnsToShow.model == 0 ? delete obj['Model'] : undefined;
        this.selectedPropertyColumnsToShow.configuration == 0 ? delete obj['Configuration Bed'] : undefined;
        this.selectedPropertyColumnsToShow.configuration == 0 ? delete obj['Configuration Bath'] : undefined;
        this.selectedPropertyColumnsToShow.configuration == 0 ? delete obj['Configuration Half Bath'] : undefined;
        this.selectedPropertyColumnsToShow.final_price == 0 ? delete obj['Final Price'] : undefined;
        // this.parameter.flag != 5 && this.selectedPropertyColumnsToShow.link_unlink_outside_agent == 0 ? delete obj['Outside Agent'] : undefined;
        this.selectedPropertyColumnsToShow.price_per_m2 == 0 ? delete obj['Price per m2'] : undefined;
        exportfinalData.push(obj);
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'properties_for_sale');
    }
  }

  getPropertySelection = (isFirstTime: boolean, keyword?: string): void => {
    this.spinner.show();
    this.admin.postDataApi('getPropertySoldSelection', { name: keyword }).subscribe((response) => {
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
    this.admin.postDataApi('updatePropertySoldHome', this.getPostRequestForColumn()).subscribe((response) => {
      this.spinner.hide();
      this.closeSelectColumnsPopup();
      this.getPropertyHome();
    }, (error) => {
      this.spinner.hide();
      swal(this.translate.instant('swal.error'), error.error.message, 'error');
    });
  }

  getPostRequestForColumn = (): any => {
    return {
      user_id: JSON.parse(localStorage.getItem('user-id')) || 0,
      building_name: (this.select_columns_list[0] || []).isCheckBoxChecked,
      floor: (this.select_columns_list[1] || []).isCheckBoxChecked,
      apartament: (this.select_columns_list[2] || []).isCheckBoxChecked,
      model: (this.select_columns_list[3] || []).isCheckBoxChecked,
      configuration: (this.select_columns_list[4] || []).isCheckBoxChecked,
      final_price: (this.select_columns_list[5] || []).isCheckBoxChecked,
      stp_key: (this.select_columns_list[6] || []).isCheckBoxChecked,
      agent: (this.select_columns_list[7] || []).isCheckBoxChecked,

    };
  }

  getPropertyHome = (): void => {
    this.admin.postDataApi('getPropertySoldHome',
      { user_id: JSON.parse(localStorage.getItem('user-id')) || 0 }).subscribe((response) => {
        this.selectedPropertyColumnsToShow = response.data || {};
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
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.floor;
        break;
      case 3:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.apartament;
        break;
      case 4:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.model;
        break;
      case 5:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.configuration;
        break;
      case 6:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.final_price;
        break;
      case 8:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.agent;
        break;
      case 7:
        this.select_columns_list[index].isCheckBoxChecked = this.selectedPropertyColumnsToShow.stp_key;
        break;
      default:
        break;
    }
  }
}
