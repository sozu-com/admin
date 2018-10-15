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
import {saveAs as importedSaveAs} from 'file-saver';
import { Http, ResponseContentType } from '@angular/http';
import * as moment from 'moment';

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
  is_deal_finalised: boolean;

  constructor(
    private route: ActivatedRoute,
    public admin: AdminService,
    public constant: Constant,
    public fillInfo: FillInformation,
    private http: Http
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {
    this.parameter.sent_as = this.constant.userType.inhouse_broker;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        this.parameter.lead = r.data.lead;
        this.setFillInformationData(r);
        this.parameter.favorites = r.data.favorites;
        this.parameter.interested_properties = r.data.interested_properties;
        this.is_deal_finalised = this.parameter.lead.selected_properties.length !== 0 ? true : false;
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
        });
      });
      this.fillInfo.car_types.forEach(element => {
        element.is_selected = (r.data.lead.prefs != null) &&
        r.data.lead.prefs.car_type_id && (r.data.lead.prefs.car_type_id === element.id) ? 1 : 0;
      });

      this.fillInfo.property_types_array.forEach(element => {
        r.data.lead.property_types.forEach(pt => {
          if (pt.id === element.id) {
            element.is_selected = 1;
          }
        });
      });

      this.fillInfo.configurations_array.forEach(element => {
        r.data.lead.configuration.forEach(c => {
          if (c.id === element.id) {
            element.is_selected = 1;
          }
        });
      });
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

  getInvoice() {
    this.parameter.url = 'getInvoicePdf/' + this.parameter.lead_id;
    this.admin.getInvoicePdf(this.parameter.url).subscribe(r => {
      if (r) {
        importedSaveAs(r, 'Invoice_' + moment(new Date()).format('DD MMM YYYY, h:mm a') + '.pdf');
      }
    });
  }
}
