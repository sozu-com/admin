import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { CommonService } from '../../../../services/common.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { SelectedProperties, BankAssigned, NotaryAssigned } from './../../../../models/leads.model';
import { Chat } from '../../../../models/chat.model';
declare let swal: any;

@Component({
  selector: 'app-bank-lead-details',
  templateUrl: './bank-lead-details.component.html',
  styleUrls: ['./bank-lead-details.component.css'],
  providers: [SelectedProperties, BankAssigned, NotaryAssigned, Chat]
})
export class BankLeadDetailsComponent implements OnInit {

  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    public selectedProperties: SelectedProperties,
    public model: Chat
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {
    this.parameter.sent_as = this.constant.userType.bank;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.parameter.loading = true;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        this.getDocumentOptions();
        this.parameter.loading = false;
        this.parameter.lead = r.data.lead;
        this.selectedProperties = r.data.lead.selected_properties[0];
        // bank will chat with closer only
        this.parameter.user_id = this.parameter.lead.closer.id;
      }, error => {
        this.parameter.loading = false;
      });
    });
  }

  setValue(i) {
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


  updateDocumentChecklist() {
    const ids = this.selectedProperties.allDocuments.filter(d => d.is_selected === 1);
    const documents_ids = ids.map(d => d.id);
    const input = {
      lead_id: this.parameter.lead_id,
      property_id: this.selectedProperties.property_id,
      documents: documents_ids
    };
    this.parameter.loading = true;
    this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(r => {
      this.parameter.loading = false;
      swal('Success', 'Successfully saved', 'success');
    }, error => {
      this.parameter.loading = false;
    }
  );
  }

  noDocumentUploaded() {
    swal('Error', 'No document uploaded yet.', 'error');
  }

  viewPropertyDetails(property) {
    this.cs.setPropertyDetails(property);
    this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
  }

  markLeadClose() {
    swal({
      html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to close this lead?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.parameter.loading = true;
        this.admin.postDataApi('leads/bank-mark-lead-closed', {lead_id: this.parameter.lead_id}).subscribe(r => {
          this.parameter.loading = false;
          this.parameter.lead.lead_status_bank = 1;
          swal('Success', 'Lead closed successfully.', 'success');
        }, error => {
          this.parameter.loading = false;
        });
      }
    });
  }
}
