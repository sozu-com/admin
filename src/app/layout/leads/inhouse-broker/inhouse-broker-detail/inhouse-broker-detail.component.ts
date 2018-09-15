import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { DealFinalize } from './../../../../models/leads.model';
import { FillInformation } from './../../../../models/leads.model';
import { ChatTimePipe } from './../../../../pipes/chat-time.pipe';
declare let swal: any;
// const SERVER_URL = 'http://kanguroo.com.mx/api:8080';

@Component({
  selector: 'app-inhouse-broker-detail',
  templateUrl: './inhouse-broker-detail.component.html',
  styleUrls: ['./inhouse-broker-detail.component.css'],
  providers: [DealFinalize, FillInformation]
})

export class InhouseBrokerDetailComponent implements OnInit {
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;
  public parameter: IProperty = {};
  public selected_prop_ids = [];

  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    public constant: Constant,
    public fillInfo: FillInformation
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {
    this.parameter.sent_as = 2;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        console.log('details', r);
        this.parameter.lead = r.data.lead;
        this.setFillInformationData(r);
        this.parameter.favorites = r.data.favorites;
        this.parameter.interested_properties = r.data.interested_properties;

        // this.selected_prop_ids = r.data.lead.selected_properties.map(s => s.property_id);
        // this.parameter.interested_properties.forEach(element => {
        //   const test = this.parameter.lead.selected_properties.map(i => i.property_id === element.property.id);
        //   if (test[0]) {
        //     element.is_finalised = 1;
        //   } else {
        //     element.is_finalised = 0;
        //   }
        // });
        this.parameter.viewed_properties = r.data.viewed_properties;
        this.parameter.user_id = this.parameter.lead.user.id;
      });
    });
  }


  setFillInformationData(r) {
    this.admin.postDataApi('leads/getPrefOptions', {lead_id: this.parameter.lead_id}).subscribe(res => {
      this.fillInfo.lead_id = this.parameter.lead_id;
      this.fillInfo.proximity_places_array = res.data.proximity_places;
      this.fillInfo.car_types = res.data.car_types;
      this.fillInfo.property_types_array = res.data.property_types;
      this.fillInfo.configurations_array = res.data.configurations;
      this.fillInfo.configurations = [];
      this.fillInfo.proximity_place_ids = [];
      this.fillInfo.property_types = [];
      this.fillInfo.proximity_places_array.forEach(element => {
        r.data.lead.proximity_places.forEach(p => {
          if (p.id === element.id) {
            element.is_selected = 1;
          }
          // element.is_selected = p.id === element.id ? 1 : 0;
          console.log('====', element.is_selected, element.id);
        });
      });
console.log('fillInfo', this.fillInfo);
console.log('r.data.lead.prefs-->', r.data.lead.prefs);
      this.fillInfo.car_types.forEach(element => {
        element.is_selected = (r.data.lead.prefs != null) &&
        r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
      });

      this.fillInfo.property_types_array.forEach(element => {
        r.data.lead.property_types.forEach(pt => {
          if (pt.id === element.id) {
            element.is_selected = 1;
          }
          // element.is_selected = pt.id === element.id ? 1 : 0;
        });
      });

      this.fillInfo.configurations_array.forEach(element => {
        r.data.lead.configuration.forEach(c => {
          if (c.id === element.id) {
            element.is_selected = 1;
          }
          // element.is_selected = c.id === element.id ? 1 : 0;
        });
      });
      console.log('leads/getPrefOptions', this.fillInfo);
    });

    if (r.data.lead.prefs !== null) {
      this.fillInfo.family_size = r.data.lead.prefs.family_size;
      this.fillInfo.pets = r.data.lead.prefs.pets;
      this.fillInfo.kid_count = r.data.lead.prefs.kid_count;
      this.fillInfo.min_price = r.data.lead.min_price;
      this.fillInfo.max_price = r.data.lead.max_price;
      this.fillInfo.price_range = [r.data.lead.prefs.min_price, r.data.lead.prefs.max_price];
      this.fillInfo.planning_to_buy = new ChatTimePipe().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD H:m:s', 4);
      // this.fillInfo.configuration = r.data.lead.configuration;

      // this.parameter.prefs = r.data.lead.prefs;
    } else {
      this.fillInfo.family_size = 1;
      this.fillInfo.pets = '';
      this.fillInfo.kid_count = '';
      this.fillInfo.min_price = this.constant.minValue;
      this.fillInfo.max_price = this.constant.maxValue;
      this.fillInfo.price_range = [this.constant.minValue, this.constant.maxValue];
      // this.parameter.prefs = new FillInformation();
    }
  }

  viewFavProperties() {
    this.showPropertyModal.nativeElement.click();
  }
}
