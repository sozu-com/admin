import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { IProperty } from './../../../common/property';
import { Constant } from './../../../common/constants';
import { FillInformation } from './../../../models/leads.model';
import { ChatTimePipe } from './../../../pipes/chat-time.pipe';
import * as moment from 'moment';
declare let swal: any;

@Component({
  selector: 'app-fill-information',
  templateUrl: './fill-information.component.html',
  styleUrls: ['./fill-information.component.css'],
  providers: [FillInformation]
})

export class FillInformationComponent implements OnInit {

  @Input('lead_id') lead_id;
  @Input('fillInfo') fillInfo;
  @Input('sent_as') sent_as;
  today: any;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};

  constructor(public admin: AdminService, public constant: Constant, public model: FillInformation) { }

  ngOnInit() {
    this.today = new Date();
    // if (this.fillInfo.planning_to_buy) {
    //   this.fillInfo.planning_to_buy = moment.utc(this.fillInfo.planning_to_buy).toDate();
    // }
    this.getPrefOptions();
  }

  getPrefOptions() {
    this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.lead_id}).subscribe(r => {
      this.parameter.proximity_places = r.data.proximity_places;
      this.parameter.car_types = r.data.car_types;
    });
  }

  onSelect(e) {
    console.log('ssss');
    console.log('eee', e);
    this.fillInfo.planning_to_buy = e;
  }

  setCarType(param, i, id) {
    this.fillInfo.car_types.forEach(element => {
      if (element.id === id) {
        element.is_selected = 1;
      } else {
        element.is_selected = 0;
      }
    });
    // this.fillInfo[param][i].is_selected = this.fillInfo[param][i].is_selected === 1 ? 0 : 1;
  }

  setValue(param, i) {
    this.fillInfo[param][i].is_selected = this.fillInfo[param][i].is_selected === 1 ? 0 : 1;
  }

  saveDate(s) {
    // console.log('save', s);
  }

  addPreferences() {
    console.log('fillinfo', this.fillInfo);
    this.fillInfo.car_types.forEach(element => {
      if (element.is_selected === 1) {
        this.fillInfo.car_type_id = element.id;
      }
    });
    this.fillInfo.proximity_places_array.forEach(element => {
      if (element.is_selected === 1) {
        this.fillInfo.proximity_place_ids.push(element.id);
      }
    });
    this.fillInfo.property_types_array.forEach(element => {
      if (element.is_selected === 1) {
        this.fillInfo.property_types.push(element.id);
      }
    });
    this.fillInfo.configurations_array.forEach(element => {
      if (element.is_selected === 1) {
        this.fillInfo.configurations.push(element.id);
      }
    });
    this.fillInfo.pets = this.fillInfo.pets === true || this.fillInfo.pets.toString() === '1' ? '1' : '0';
    this.fillInfo.kid_count = this.fillInfo.kid_count === true || this.fillInfo.kid_count.toString() === '1' ? '1' : '0';
    this.fillInfo.min_price = this.fillInfo.price_range[0];
    this.fillInfo.max_price = this.fillInfo.price_range[1];
    if (this.fillInfo.planning_to_buy) {
      this.fillInfo.planning_to_buy = moment.utc(this.fillInfo.planning_to_buy).toDate();
      // this.fillInfo.planning_to_buy = new ChatTimePipe().transform(this.fillInfo.planning_to_buy, 'YYYY-MM-DD HH:MM:SS', 3);
    }
    this.admin.postDataApi('leads/addPreferences', this.fillInfo).subscribe(r => {
      swal('Success', this.constant.successMsg.DETAILS_UPDATED_SUCCESSFULLY, 'success');
    });
  }
}
