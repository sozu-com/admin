import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';

declare let swal: any;

@Component({
  selector: 'app-csr-buyer-detail',
  templateUrl: './csr-buyer-detail.component.html',
  styleUrls: ['./csr-buyer-detail.component.css'],
  providers: [Constant]
})

export class CsrBuyerDetailComponent implements OnInit {
  // public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public parameter: IProperty = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private constant: Constant
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
      console.log('admin_id', this.parameter.admin_id);
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.parameter.id = params.id;
        this.parameter.loading = true;
        this.admin.postDataApi('leads/details', {lead_id: this.parameter.id}).subscribe(r => {
          // console.log(r);
          this.parameter.loading = false;
          this.parameter.lead = r.data.lead;
          this.parameter.interested_properties = r.data.interested_properties;
          console.log('leads/details', r);
          this.parameter.lead_id = this.parameter.id;
          this.parameter.user_id = this.parameter.lead.user ? this.parameter.lead.user.id : 0;
          console.log('userid', this.parameter.lead_id, this.parameter.user_id);
        });
    });
  }

  assignToBroker() {
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.parameter.id}).subscribe(r => {
      console.log('conversation/assignBroker', r);
      this.parameter.lead = r.data;
      console.log(this.parameter.lead);
    },
    error => {
      swal('Error', error.message, 'error');
    });
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', {lead_id: this.parameter.id}).subscribe(r => {
      console.log('conversation/block', r);
    });
  }
}
