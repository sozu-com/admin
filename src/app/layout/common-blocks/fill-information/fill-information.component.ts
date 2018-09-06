import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { IProperty } from './../../../common/property';
import { Constant } from './../../../common/constants';
import { FillInformation } from './../../../models/leads.model';
import { NouisliderModule } from 'ng2-nouislider';
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

  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};

  constructor(private admin: AdminService, public constant: Constant, public model: FillInformation) { }

  ngOnInit() {
    // console.log('dd', this.proximity_places);
    console.log('dd', this.fillInfo);
    this.getPrefOptions();
  }

  getPrefOptions() {
    this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.lead_id}).subscribe(r => {
      this.parameter.proximity_places = r.data.proximity_places;
      this.parameter.car_types = r.data.car_types;
      console.log('leads/getPrefOptions', r);
    });
  }

  setValue(param, i) {
    this.fillInfo[param][i].is_selected = this.fillInfo[param][i].is_selected === 1 ? 0 : 1;
    console.log('aaaa', this.fillInfo);
  }

  addPreferences() {
    console.log(this.fillInfo);
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
    this.fillInfo.pets = this.fillInfo.pets === true ? '1' : '0';
    this.fillInfo.min_price = this.fillInfo.price_range[0];
    this.fillInfo.max_price = this.fillInfo.price_range[1];

    this.fillInfo.planning_to_buy = this.fillInfo.planning_to_buy + ' 00:00:00';

    console.log('addPreferences', this.fillInfo);
    this.admin.postDataApi('leads/addPreferences', this.fillInfo).subscribe(r => {
      console.log('leads/getPrefOptions', this.parameter.items);
      swal('Success', this.constant.successMsg.DETAILS_UPDATED_SUCCESSFULLY, 'success');
    });
  }
}
