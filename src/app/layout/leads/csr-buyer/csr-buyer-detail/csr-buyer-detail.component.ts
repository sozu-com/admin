import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import { Constant } from './../../../../common/constants';

declare let swal: any;

@Component({
  selector: 'app-csr-buyer-detail',
  templateUrl: './csr-buyer-detail.component.html',
  styleUrls: ['./csr-buyer-detail.component.css']
})

export class CsrBuyerDetailComponent implements OnInit {
  // public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public parameter: IProperty = {};

  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    public constant: Constant
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.parameter.id = params.id;
        this.admin.postDataApi('leads/details', {lead_id: this.parameter.id}).subscribe(r => {
          this.parameter.lead = r.data.lead;
          this.parameter.interested_properties = r.data.interested_properties;
          this.parameter.lead_id = this.parameter.id;
          this.parameter.user_id = this.parameter.lead.user ? this.parameter.lead.user.id : 0;
        });
    });
  }

  assignToBroker() {
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.parameter.id}).subscribe(r => {
      this.parameter.lead = r.data;
    }
  );
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', {lead_id: this.parameter.id}).subscribe(r => {
      // console.log('conversation/block', r);
    });
  }
}
