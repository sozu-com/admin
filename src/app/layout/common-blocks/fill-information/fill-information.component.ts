import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Leads, Prefs, BuyerAmenities, AddPrefrences } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { IMarritalStatus } from 'src/app/common/marrital-status-interface';
// import { TranslateService } from 'src/app/lang/translate.service';
declare let swal: any;

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.css']
})

export class FillInformationComponent implements OnInit {

  @Input('lead_id') lead_id: string;
  //@Input('_leadData') _leadData: Leads;

  _leadData: any;
  get leadData(): any {
    return this.leadData;
  }
  @Input() set leadData(value: any) {
    this._leadData = value;
    this.updatePeriodTypes();
  }

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
  temp_array: any = []; noteEmails: any;bathroom: any;half_bedroom: any;
  configurationCounted: any = [1, 2, 3, 4, 5];
  bedrooms: any = [
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
  ];
  constructor(public admin: AdminService, public constant: Constant,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.getMarritalStatusList();
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
          } else if(element.name != res && element.is_selected == 0) {
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
        } else if(element.name != res && element.is_selected == 0) {
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
        } else if(element.name != res && element.is_selected == 0) {
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
    this.model.propAmenities = [];
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
      this.model.propAmenities.push(element.id);
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
    this.model.marital_statuses_id = this._leadData.prefs.marital_statuses_id;
    this.model.parking_lot = this._leadData.prefs.parking_lot;
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
}
