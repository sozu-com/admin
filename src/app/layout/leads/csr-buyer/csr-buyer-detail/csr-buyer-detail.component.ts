import { Component, OnInit, ViewChild, ElementRef, Pipe } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import { Constant } from './../../../../common/constants';
import { FillInformation } from './../../../../models/leads.model';
import { ChatTimePipe } from './../../../../pipes/chat-time.pipe';
declare let swal: any;

@Component({
  selector: 'app-csr-buyer-detail',
  templateUrl: './csr-buyer-detail.component.html',
  styleUrls: ['./csr-buyer-detail.component.css'],
  providers: [FillInformation]
})

export class CsrBuyerDetailComponent implements OnInit {
  // public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public parameter: IProperty = {};


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
    this.parameter.sent_as = 1;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
        this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
          console.log('Lead Details', r);
          this.parameter.lead = r.data.lead;
          if (r.data.lead.prefs !== null) {
            this.fillInfo = r.data.lead.prefs;
            this.fillInfo.price_range = [r.data.lead.min_price, r.data.lead.max_price];
            this.fillInfo.planning_to_buy = new ChatTimePipe().transform(r.data.lead.prefs.planning_to_buy, 'YYYY-MM-DD H:m:s', 4);
            this.fillInfo.configuration = r.data.lead.configuration;
            // this.parameter.prefs = r.data.lead.prefs;
          } else {
            this.fillInfo.family_size = '';
            this.fillInfo.car_type_id = '';
            this.fillInfo.pets = '';
            this.fillInfo.price_range = [0, 1000000];
            // this.parameter.prefs = new FillInformation();
          }
          this.parameter.proximity_places = r.data.lead.proximity_places;
          console.log('r.data.lead.prefs', r.data.lead.prefs);
          this.parameter.interested_properties = r.data.interested_properties;
          this.parameter.user_id = this.parameter.lead.user ? this.parameter.lead.user.id : 0;
        });
    });
  }

  assignToBroker() {
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.parameter.lead_id}).subscribe(r => {
      this.parameter.lead = r.data;
    }
  );
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', {lead_id: this.parameter.lead_id}).subscribe(r => {
      // console.log('conversation/block', r);
    });
  }
}
