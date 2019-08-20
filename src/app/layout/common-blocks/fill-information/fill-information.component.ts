import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Leads, Prefs, BuyerAmenities, AddPrefrences } from 'src/app/models/leads.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { Constant } from 'src/app/common/constants';
declare let swal: any;

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.css']
})

export class FillInformationComponent implements OnInit {

  @Input('lead_id') lead_id: string;
  @Input('leadData') leadData: Leads;
  @Input('allAmenities') allAmenities: Array<BuyerAmenities>;
  @Input('selectedAmenities') selectedAmenities: Array<BuyerAmenities>;
  @Input('fillInfo') fillInfo;
  @Input('sent_as') sent_as: number;

  showOtherTextBox: boolean;
  today: any;
  dropdownSettings: any;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};
  model: AddPrefrences;
  configurationCount: Array<string>;

  constructor(public admin: AdminService, public constant: Constant) { }

  ngOnInit() {
    this.today = new Date();
    this.configurationCount = ['1', '2', '3', '4', '5+'];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
    if (this.leadData.prefs.proximity_other) {
      this.showOtherTextBox = true;
    }
    // if (this.leadData.planning_to_buy) {
    //   this.leadData.planning_to_buy = moment.utc(this.leadData.planning_to_buy).toDate();
    // }
    // this.getPrefOptions();
  }

  getPrefOptions() {
    this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.lead_id}).subscribe(r => {
      this.parameter.proximity_places = r.data.proximity_places;
      this.parameter.car_types = r.data.car_types;
    });
  }

  onSelect(e) {
    console.log('eee', e);
    // this.leadData.planning_to_buy = e;
  }

  setCarType(param: string, i: number, id: number) {
    this.leadData.buyer_car_type.forEach(element => {
      if (element.id === id) {
        element.is_selected = 1;
      } else {
        element.is_selected = 0;
      }
    });
    // this.leadData[param][i].is_selected = this.leadData[param][i].is_selected === 1 ? 0 : 1;
  }

  setValue(param: string, i: any) {
    this.leadData[param][i].is_selected = this.leadData[param][i].is_selected === 1 ? 0 : 1;
  }

  setProximityValue(value: string) {
    console.log(value);
    this.showOtherTextBox = this.showOtherTextBox ? false : true;
  }

  setPrefValue (param: string, value: number) {
    console.log(param, value);
    this.leadData.prefs[param] = value;
  }

  onItemSelect(amenity: BuyerAmenities) {
    this.selectedAmenities.push(amenity);
    console.log(amenity);
  }

  onSelectAll(amenity: BuyerAmenities) {
    console.log(amenity);
  }

  addPreferences() {
    console.log(this.selectedAmenities);
    console.log(this.leadData);
    if (this.leadData.prefs.min_price > this.leadData.prefs.max_price) {
      swal('Error', 'Maximum price should be greater than minimum price.', 'error');
      return false;
    }
    this.model = new AddPrefrences();
    this.model.property_types = [];
    this.model.amenities = [];
    this.model.proximity_place_ids = [];
    this.model.property_purpose = [];
    this.model.payment_plans = [];

    this.model.lead_id = this.lead_id;
    this.model.looking_for = this.leadData.prefs.looking_for;
    this.model.bedroom = this.leadData.prefs.bedroom;
    this.model.bathroom = this.leadData.prefs.bathroom;
    this.model.half_bathroom = this.leadData.prefs.half_bathroom;
    this.model.min_price = this.leadData.prefs.min_price;
    this.model.max_price = this.leadData.prefs.max_price;
    this.leadData.buyer_property_type.forEach(element => {
      if (element.is_selected === 1) {
        this.model.property_types.push(element.id);
      }
    });
    this.selectedAmenities.forEach(element => {
      this.model.amenities.push(element.id);
    });
    this.leadData.buyer_proximity.forEach(element => {
      if (element.is_selected === 1) {
        this.model.proximity_place_ids.push(element.id);
      }
    });
    this.leadData.buyer_car_type.forEach(element => {
      if (element.is_selected === 1) {
        this.model.car_type_id = element.id;
      }
    });
    this.model.proximity_other = this.leadData.prefs.proximity_other;
    this.model.family_size = this.leadData.prefs.family_size;
    this.model.kid_count = this.leadData.prefs.kid_count;
    this.model.pets = this.leadData.prefs.pets;
    // this.leadData.kid_count = this.leadData.kid_count === true || this.leadData.kid_count.toString() === '1' ? '1' : '0';
    if (this.leadData.prefs.planning_to_buy) {
      this.model.planning_to_buy = moment.utc(this.leadData.prefs.planning_to_buy).toDate();
      // this.leadData.planning_to_buy = new ChatTimePipe().transform(this.leadData.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 3);
    }
    if (this.model.looking_for === 1) {
      this.leadData.property_purposes.forEach(element => {
        if (element.is_selected === 1) {
          this.model.property_purpose.push(element.id);
        }
      });
      this.leadData.payment_modes.forEach(element => {
        if (element.is_selected === 1) {
          this.model.payment_plans.push(element.id);
        }
      });
    } else {
      this.model.property_purpose = [];
      this.model.payment_plans = [];
    }
    this.admin.postDataApi('leads/addPreferences', this.model).subscribe(r => {
      swal('Success', this.constant.successMsg.DETAILS_UPDATED_SUCCESSFULLY, 'success');
    });
  }
}
