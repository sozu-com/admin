import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { DealFinalize } from './../../../../models/leads.model';

declare let swal: any;
const SERVER_URL = 'http://kanguroo.com.mx/api:8080';

@Component({
  selector: 'app-inhouse-broker-detail',
  templateUrl: './inhouse-broker-detail.component.html',
  styleUrls: ['./inhouse-broker-detail.component.css'],
  providers: [Constant, DealFinalize]
})

export class InhouseBrokerDetailComponent implements OnInit {

  public parameter: IProperty = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private admin: AdminService,
    private constant: Constant,
    private dealFinalise: DealFinalize
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
        this.parameter.user_id = this.parameter.lead.user.id;
      });
    });
  }
}
