import { Component, OnInit, Input, ViewChild, ElementRef, Output } from '@angular/core';
import * as moment from 'moment';
import { Leads, Prefs, BuyerAmenities, AddPrefrences } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { IMarritalStatus } from 'src/app/common/marrital-status-interface';
import { EventEmitter } from '@angular/core';
import { forkJoin } from 'rxjs';
// import { TranslateService } from 'src/app/lang/translate.service';
declare let swal: any;

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.css']
})

export class FillInformationComponent implements OnInit {
  @Output() referDetail: EventEmitter<any> = new EventEmitter();
  @Input('lead_id') lead_id: string;
  //@Input('_leadData') _leadData: Leads;

  _leadData: any;
  language_code: string;
  locality_ids: number[];
  firstTime: any;
  text_data: any;
  get leadData(): any {
    return this.leadData;
  }
  @Input() set leadData(value: any) {
    this._leadData = value;
    (this._leadData.lead_text || []).forEach(element => {
      this.allValues.push(element.text);
      //this.allValues = element.text;
    });
    this.updatePeriodTypes();
  }

  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;
  @ViewChild('hidePropertyModal') hidePropertyModal: ElementRef;

  @Input('allAmenities') allAmenities: Array<BuyerAmenities>;
  @Input('selectedAmenities') selectedAmenities: Array<BuyerAmenities>;
  @Input('allPropAmenities') allPropAmenities: Array<BuyerAmenities>;
  @Input('selectedPropAmenities') selectedPropAmenities: Array<BuyerAmenities>;
  @Input('sent_as') sent_as: number;
  @Input('showOtherTextBox') showOtherTextBox: boolean;
  marrital_status_list = Array<IMarritalStatus>();
  today: any;
  dropdownSettings: any;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside' };
  model: AddPrefrences;
  configurationCount: Array<string>;
  locale: any;
  temp_array: any = []; noteEmails: any; bathroom: any; half_bedroom: any;
  configurationCounted: any = [1, 2, 3, 4, 5];
  public location: IProperty = {};
  interested_properties = [];
  property_ids = [];
  public multiDropdownSettings = {};
  bedrooms: any = [
    { is_selected: 0, name: 1 },
    { is_selected: 0, name: 2 },
    { is_selected: 0, name: 3 },
    { is_selected: 0, name: 4 },
    { is_selected: 0, name: 5 }
  ];
  parkings: any = [
    { is_selected: 0, name: 1 },
    { is_selected: 0, name: 2 },
    { is_selected: 0, name: 3 },
    { is_selected: 0, name: 4 },
    { is_selected: 0, name: 5 }
  ];
  bathrooms: any = [
    { is_selected: 0, name: 1 },
    { is_selected: 0, name: 2 },
    { is_selected: 0, name: 3 },
    { is_selected: 0, name: 4 },
    { is_selected: 0, name: 5 }
  ];
  half_bathrooms: any = [
    { is_selected: 0, name: 1 },
    { is_selected: 0, name: 2 },
    { is_selected: 0, name: 3 },
    { is_selected: 0, name: 4 },
    { is_selected: 0, name: 5 }
  ]; allValues: any[] = [];
  constructor(public admin: AdminService, public constant: Constant,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.firstTime = true;
    this.getCountries(this.lead_id);
    this.parameter.country_id = '9';
    this.parameter.state_id = '13';
    this.parameter.city_id = '13';
    this.locality_ids = [40, 59, 60, 45, 41];
    this.language_code = localStorage.getItem('language_code');
    this.initializedDropDownSetting();
    this.getMarritalStatusList(); this.parameter.country_id = '9';
    this.parameter.state_id = '13';
    this.parameter.city_id = '13';
    this.locality_ids = [40, 59, 60, 45, 41];
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
    this.today = new Date();
    this.configurationCount = ['1', '2', '3', '4', '5+'];
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.total = 0;

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };

    // if (this._leadData.planning_to_buy) {
    //   this._leadData.planning_to_buy = moment.utc(this._leadData.planning_to_buy).toDate();
    // }
    // this.getPrefOptions();
    $('.section-section2').scroll(function (e) {
      e.stopPropagation();
    });
  }
  add_text() {
    this.text_data = this.text_data ? this.text_data : '';
    this.allValues.push(this.text_data);
    if (this.allValues) {
      this.text_data = '';
    }
    //this._leadData.lead_text = this.allValues;
  }
  delete(item) {
    this.allValues.slice(item);
  }
  initializedDropDownSetting = (): void => {
    this.multiDropdownSettings = {
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

  getMarritalStatusList() {
    this.admin.postDataApi('getmaritalStatus', {}).subscribe(r => {
      this.marrital_status_list = r['data'];
    });
  }
  updatePeriodTypes() {
    //lead_bedroom
    if (this._leadData.lead_bedroom) {
      let newArray = [];
      for (var i = 0; i < this._leadData.lead_bedroom.length; i++) {
        let mails = this._leadData.lead_bedroom[i].bedroom;
        newArray.push(mails);
      }
      this.noteEmails = newArray;
      (this.noteEmails || []).forEach(res => {
        this.bedrooms.forEach(element => {
          if (element.name === res && element.is_selected == 0) {
            element['is_selected'] = 1;
          } else if (element.name != res && element.is_selected == 0) {
            element['is_selected'] = 0;
          }
        });
      });
    }
    if (this._leadData.lead_parking) {
      let newArraies = [];
      for (var i = 0; i < this._leadData.lead_parking.length; i++) {
        let mails = this._leadData.lead_parking[i].parking_lot;
        newArraies.push(mails);
      }
      this.noteEmails = newArraies;
      (this.noteEmails || []).forEach(res => {
        this.parkings.forEach(element => {
          if (element.name === res && element.is_selected == 0) {
            element['is_selected'] = 1;
          } else if (element.name != res && element.is_selected == 0) {
            element['is_selected'] = 0;
          }
        });
      });
    }
    //lead_bathroom
    if (this._leadData.lead_bathroom) {
      let lead_bathrooms = [];
      for (var i = 0; i < this._leadData.lead_bathroom.length; i++) {
        let mails = this._leadData.lead_bathroom[i].bathroom;
        lead_bathrooms.push(mails);
      }
      this.bathroom = lead_bathrooms;
      (this.bathroom || []).forEach(res => {
        this.bathrooms.forEach(element => {
          if (element.name === res && element.is_selected == 0) {
            element['is_selected'] = 1;
          } else if (element.name != res && element.is_selected == 0) {
            element['is_selected'] = 0;
          }
        });
      });
    }

    //lead_bedroom
    if (this._leadData.lead_half_bedroom) {
      let half_bedrooms = [];
      for (var i = 0; i < this._leadData.lead_half_bedroom.length; i++) {
        let mails = this._leadData.lead_half_bedroom[i].half_bedroom;
        half_bedrooms.push(mails);
      }
      this.half_bedroom = half_bedrooms;
      (this.half_bedroom || []).forEach(res => {
        this.half_bathrooms.forEach(element => {
          if (element.name === res && element.is_selected == 0) {
            element['is_selected'] = 1;
          } else if (element.name != res && element.is_selected == 0) {
            element['is_selected'] = 0;
          }
        });
      });
    }

  }
  getPrefOptions() {
    this.admin.postDataApi('leads/getPrefOptions', { lead_id: this.lead_id }).subscribe(r => {
      this.parameter.proximity_places = r.data.proximity_places;
      this.parameter.car_types = r.data.car_types;
    });
  }

  onSelect(e) {
    // this._leadData.planning_to_buy = e;
  }
  setAccepted(item) {
    if (item.is_selected == 0) {
      item.is_selected = 1;
    } else {
      item.is_selected = 0;
    }
  }
  setCarType(id: number) {
    this.marrital_status_list.forEach(element => {
      if (element.id === id) {
        element['is_selected'] = 1;
      } else {
        element['is_selected'] = 0;
      }
    });
  }

  setPaymentMode(id: number) {
    this._leadData.payment_modes.forEach(element => {
      if (element.id === id) {
        element.is_selected = 1;
      } else {
        element.is_selected = 0;
      }
    });
  }

  setValue(param: string, i: any) {
    this._leadData[param][i].is_selected = this._leadData[param][i].is_selected === 1 ? 0 : 1;
  }

  setProximityValue(value: string, showOtherTextBox: boolean) {
    this.showOtherTextBox = showOtherTextBox;
  }

  setPrefValue(param: string, value: number) {
    this._leadData.prefs[param] = value;
  }

  onItemDeSelect(amenity: BuyerAmenities) {
    this.allAmenities.push(amenity);
  }

  onItemSelect(amenity: BuyerAmenities) {
    this.selectedAmenities.push(amenity);
  }
  onItemDePropSelect(amenity: BuyerAmenities) {
    this.allPropAmenities.push(amenity);
  }

  onItemPropSelect(amenity: BuyerAmenities) {
    this.selectedPropAmenities.push(amenity);
  }
  onSelectAll(amenity: BuyerAmenities) {
  }

  addPreferences() {
    if (this._leadData.prefs.min_price > this._leadData.prefs.max_price) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.maximumPriceLimit'), 'error');
      return false;
    }
    this.model = new AddPrefrences();
    this.model.property_types = [];
    this.model.amenities = [];
    this.model.property_amenities = [];
    this.model.proximity_place_ids = [];
    this.model.property_purpose = [];
    // this.model.payment_plans = [];

    this.model.lead_id = this.lead_id;
    this.model.looking_for = this._leadData.prefs.looking_for;
    this.model.lead_text = this.allValues;
    //  this.model.bedroom = this._leadData.prefs.bedroom;
    //  this.model.bathroom = this._leadData.prefs.bathroom;
    //   this.model.half_bathroom = this._leadData.prefs.half_bathroom;
    this.model.min_price = this._leadData.prefs.min_price;
    this.model.max_price = this._leadData.prefs.max_price;
    this._leadData.buyer_property_type.forEach(element => {
      if (element.is_selected === 1) {
        this.model.property_types.push(element.id);
      }
    });
    this.selectedAmenities.forEach(element => {
      this.model.amenities.push(element.id);
    });
    this.selectedPropAmenities.forEach(element => {
      this.model.property_amenities.push(element.id);
    });
    this._leadData.buyer_proximity.forEach(element => {
      if (element.is_selected === 1) {
        this.model.proximity_place_ids.push(element.id);
      }
    });
    this._leadData.buyer_car_type.forEach(element => {
      if (element.is_selected === 1) {
        this.model.car_type_id = element.id;
      }
    });

    this.model.bedroom = this.bedrooms.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    this.model.bathroom = this.bathrooms.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    this.model.half_bathroom = this.half_bathrooms.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    this.model.proximity_other = this.showOtherTextBox ? this._leadData.prefs.proximity_other : '';
    this._leadData.prefs.proximity_other = this.showOtherTextBox ? this._leadData.prefs.proximity_other : '';
    this.model.family_size = this._leadData.prefs.family_size;
    this.model.marital_status = this._leadData.prefs.marital_statuses_id;
    this.model.parking_lot = this.parkings.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    //this.model.parking_lot = this._leadData.prefs.parking_lot;
    this.model.job = this._leadData.prefs.job;
    this.model.kid_count = this._leadData.prefs.kid_count;
    this.model.pets = this._leadData.prefs.pets;
    if (this._leadData.prefs.planning_to_buy) {
      this.model.planning_to_buy = moment.utc(this._leadData.prefs.planning_to_buy).toDate();
      // this._leadData.planning_to_buy = new ChatTimePipe().transform(this._leadData.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 3);
    }
    if (this.model.looking_for === 1) {
      this._leadData.property_purposes.forEach(element => {
        if (element.is_selected === 1) {
          this.model.property_purpose.push(element.id);
        }
      });
      // this._leadData.payment_modes.forEach(element => {
      //   if (element.is_selected === 1) {
      //     this.model.payment_plans.push(element.id);
      //   }
      // });
    } else {
      this.model.property_purpose = [];
      // this.model.payment_plans = [];
    }
    this.spinner.show();
    this.admin.postDataApi('leads/addPreferences', this.model).subscribe(r => {
      this.spinner.hide();
      swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
    });
  }

  getPage(page) {
    this.parameter.page = page;
    this.SearchPreferences(false);
  }

  SearchPreferences(data) {
    this.firstTime = data;
    if (data) {
      this.parameter.country_id = '9';
      this.parameter.state_id = '13';
      this.parameter.city_id = '13';
      this.locality_ids = [40, 59, 60, 45, 41];
      this.getCountries(this.lead_id);
    }
    this.model = new AddPrefrences();
    this.model.page = this.parameter.page;
    this.model.property_types = [];
    this.model.amenities = [];
    this.model.property_amenities = [];
    this.model.proximity_place_ids = [];
    this.model.property_purpose = [];
    // this.model.payment_plans = [];

    this.model.lead_id = this.lead_id;
    this.model.looking_for = this._leadData.prefs.looking_for;
    //  this.model.bedroom = this._leadData.prefs.bedroom;
    //  this.model.bathroom = this._leadData.prefs.bathroom;
    //   this.model.half_bathroom = this._leadData.prefs.half_bathroom;
    this.model.min_price = this._leadData.prefs.min_price;
    this.model.max_price = this._leadData.prefs.max_price;
    this._leadData.buyer_property_type.forEach(element => {
      if (element.is_selected === 1) {
        this.model.property_types.push(element.id);
      }
    });
    this.selectedAmenities.forEach(element => {
      this.model.amenities.push(element.id);
    });
    this.selectedPropAmenities.forEach(element => {
      this.model.property_amenities.push(element.id);
    });
    this._leadData.buyer_proximity.forEach(element => {
      if (element.is_selected === 1) {
        this.model.proximity_place_ids.push(element.id);
      }
    });
    this._leadData.buyer_car_type.forEach(element => {
      if (element.is_selected === 1) {
        this.model.car_type_id = element.id;
      }
    });

    this.model.bedroom = this.bedrooms.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    this.model.bathroom = this.bathrooms.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    this.model.half_bathroom = this.half_bathrooms.filter(f => { return f.is_selected == 1 }).map(r => { return r.name });
    this.model.proximity_other = this.showOtherTextBox ? this._leadData.prefs.proximity_other : '';
    this._leadData.prefs.proximity_other = this.showOtherTextBox ? this._leadData.prefs.proximity_other : '';
    this.model.family_size = this._leadData.prefs.family_size;
    this.model.marital_status = this._leadData.prefs.marital_statuses_id;
    this.model.parking_lot = this._leadData.prefs.parking_lot;
    this.model.job = this._leadData.prefs.job;
    this.model.kid_count = this._leadData.prefs.kid_count;
    this.model.pets = this._leadData.prefs.pets;
    if (this._leadData.prefs.planning_to_buy) {
      this.model.planning_to_buy = moment.utc(this._leadData.prefs.planning_to_buy).toDate();
      // this._leadData.planning_to_buy = new ChatTimePipe().transform(this._leadData.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 3);
    }
    if (this.model.looking_for === 9) {
      this._leadData.property_purposes.forEach(element => {
        if (element.is_selected === 1) {
          this.model.property_purpose.push(element.id);
        }
      });
      // this._leadData.payment_modes.forEach(element => {
      //   if (element.is_selected === 1) {
      //     this.model.payment_plans.push(element.id);
      //   }
      // });
    } else {
      this.model.property_purpose = [];
      // this.model.payment_plans = [];
    }
    this.model.looking_for = this.model.looking_for == 1 ? 9 : this.model.looking_for == 2 ? 8 : this.model.looking_for;
    let ids = [];
    this.model.country_id = this.parameter.country_id;
    this.model.state_id = this.parameter.state_id;
    this.parameter.locality_ids.forEach(item => {
      ids.push(item.id);
    });
    this.model.city_id = this.parameter.city_id;
    this.model.locality_id = data ? this.locality_ids : ids;
    this.spinner.show();
    this.admin.postDataApi('homeSearch', this.model).subscribe(r => {
      this.spinner.hide();
      this.parameter.items = r.data;
      if (this.property_ids.length > 0) {
        this.parameter.items.forEach(element => {
          const check_id = this.property_ids.indexOf(element.id);
          if (check_id !== -1) { element.checked = true; }
        });
      }
      this.parameter.total = r.total_count;
      if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
    });
  }

  getCountries(lead_id) {
    let self = this;
    this.location.cities = [];
    this.location.localities = [];
    this.location.states = [];
    this.parameter.items = [];
    this.parameter.total = 0;
    this.parameter.noResultFound = false;
    this.parameter.lead_id = lead_id;
    //this.showPropertyModal.nativeElement.click();
    forkJoin([
      this.admin.postDataApi('getCountryLocality', {})]).subscribe(r => {
        this.location.countries = r[0].data;
        const selectedCountry = this.location.countries.filter(x => x.id.toString() === this.parameter.country_id);
        this.location.states = selectedCountry[0].states;
        const selectedState = this.location.states.filter(x => x.id.toString() === this.parameter.state_id);
        this.location.cities = selectedState[0].cities;
        const selectedcity = this.location.cities.filter(x => x.id.toString() === this.parameter.city_id);
        this.location.localities = selectedcity[0].localities;
        if (this.firstTime) {
          self.parameter.locality_ids = [];
          this.location.localities.forEach(element => {
            self.locality_ids.forEach(item => {
              if (item == element.id) {
                self.parameter.locality_ids.push({ id: element.id, name_en: element.name_en, name_es: element.name_es })
              }
            });
          });
        }
      });
  }

  onCountryChange(id) {
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id.toString() === '0') {
      this.parameter.state_id = '0';
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;

  }

  onStateChange(id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id.toString() === '0') {
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id.toString() === '0') {
      this.parameter.locality_id = '0';
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
    this.parameter.locality_ids = [];
  }

  onLocalityChange(id) {
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  propertySearch() {
    this.spinner.show();
    this.admin.postDataApi('propertySearch', this.parameter).subscribe(r => {
      this.spinner.hide();
      this.parameter.items = r.data;
      if (this.property_ids.length > 0) {
        this.parameter.items.forEach(element => {
          const check_id = this.property_ids.indexOf(element.id);
          if (check_id !== -1) { element.checked = true; }
        });
      }
      this.parameter.total = r.total;
      if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
    });
  }

  addPropertyToInterest() {
    let self = this;
    this.parameter.text = this.translate.instant('message.error.wantToAddToPreferences');
    if (this.property_ids.length > 0) {
      swal({
        html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const input = { property_id: self.property_ids, lead_id: self.lead_id };
          self.admin.postDataApi('leads/addLeadPreferencesProperty', input).subscribe(r => {
            self.referDetail.emit('true');
            self.hidePropertyModal.nativeElement.click();
            self.property_ids = [];
            swal(self.translate.instant('swal.success'), self.translate.instant('message.success.addedSuccessfully'), 'success');
          });
        }
      });
    } else {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.chooseAnyProperty'), 'error');
    }
  }

  addLeadInterestedProperty(property_id) {
    const ids = this.interested_properties.map(d => d.id);
    const ff = ids.filter(p => p === property_id);
    if (ff.length !== 0) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.alreadyAddedPreferences'), 'error');
    } else {
      const check_id = this.property_ids.indexOf(property_id);
      if (check_id === -1) {
        this.property_ids.push(property_id);
      } else {
        this.property_ids.splice(check_id, 1);
      }
    }
  }
}
