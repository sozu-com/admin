import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { SelectedProperties} from './../../../../models/leads.model';
declare let swal: any;

@Component({
  selector: 'app-csr-closer-detail',
  templateUrl: './csr-closer-detail.component.html',
  styleUrls: ['./csr-closer-detail.component.css'],
  providers: [Constant, SelectedProperties]
})

export class CsrCloserDetailComponent implements OnInit, OnDestroy {

  public parameter: IProperty = {};

  id: any;
  lead: any;
  conversation: any;
  message: any;

  private socket;
  socket_id: any;
  connected: any;

  constructor(
    private route: ActivatedRoute,
    private admin: AdminService,
    public selectedProperties: SelectedProperties
  ) { }

  ngOnInit() {
    this.parameter.sent_as = 3;
    this.parameter.subscriber = this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        console.log('lead details', r);
        this.parameter.lead = r.data.lead;
        this.selectedProperties = r.data.lead.selected_properties[0];
        this.parameter.user_id = this.parameter.lead.user.id;
        console.log('selected property', this.selectedProperties);
        this.getDocumentOptions();
      });
    });
  }

  ngOnDestroy() {
    // this.parameter.subscriber.uns
  }

  assignToBroker() {
    this.admin.postDataApi('conversation/assignBroker', {lead_id: this.id}).subscribe(r => {
      this.lead = r.data;
    }
  );
  }

  setValue(i) {
    console.log('ss', i, this.selectedProperties.allDocuments);
    this.selectedProperties.allDocuments[i].is_selected =
    this.selectedProperties.allDocuments[i].is_selected && this.selectedProperties.allDocuments[i].is_selected === 1 ? 0 : 1;
  }

  getDocumentOptions() {
    this.admin.postDataApi('getDocumentOptions', {}).subscribe(r => {
      this.selectedProperties.allDocuments = r.data;
      this.selectedProperties.allDocuments.forEach(element => {
        this.selectedProperties.selected_documents.forEach(pt => {
          if (pt.id === element.id) {
            element.is_selected = 1;
          }
        });
      });
    }
  );
  }

  blockThisLead() {
    this.admin.postDataApi('conversation/block', {lead_id: this.id}).subscribe(r => {
      console.log(r);
    });
  }

  save() {
    const ids = this.selectedProperties.allDocuments.filter(d => d.is_selected === 1);
    const idss = ids.map(d => d.id);
    console.log('ids', ids, idss);
  //   this.admin.postDataApi('getDocumentOptions', {}).subscribe(r => {
  //     this.selectedProperties.allDocuments = r.data;
  //     console.log('this.allDocuments', this.selectedProperties.allDocuments);
  //     // this.selectedProperties.allDocuments.forEach(element => {
  //     //   // console.log('aa', this.selectedProperties);
  //     //   this.selectedProperties.selected_documents.forEach(pt => {
  //     //     if (pt.id === element.id) {
  //     //       element.is_selected = 1;
  //     //     }
  //     //   });
  //     // });

  //     console.log('this.allDocuments after', this.selectedProperties.allDocuments);
  //   }
  // );
  }
}
