import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectedProperties, BankAssigned, NotaryAssigned } from 'src/app/models/leads.model';
import { Chat } from 'src/app/models/chat.model';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Constant } from 'src/app/common/constants';
import { TranslateService } from '@ngx-translate/core';
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
    private spinner: NgxSpinnerService,
    public selectedProperties: SelectedProperties,
    public model: Chat,
    private translate: TranslateService
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  ngOnInit() {
    this.parameter.sent_as = this.constant.userType.bank;
    this.route.params.subscribe(params => {
      this.parameter.lead_id = params.id;
      this.spinner.show();
      this.admin.postDataApi('leads/details', { lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as }).subscribe(r => {
        this.getDocumentOptions();
        this.spinner.hide();
        this.parameter.lead = r.data.lead;
        this.selectedProperties = r.data.lead.selected_properties[0];
        // bank will chat with closer only
        this.parameter.user_id = this.parameter.lead.closer.id;
      }, error => {
        this.spinner.hide();
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
    this.spinner.show();
    this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(r => {
      this.spinner.hide();
      swal('Success', this.translate.instant('message.success.savedSuccessfully'), 'success');
    }, error => {
      this.spinner.hide();
    }
    );
  }

  noDocumentUploaded() {
    swal('Error', this.translate.instant('message.error.noDocumentUploadedYet'), 'error');
  }

  viewPropertyDetails(property) {
    this.cs.setPropertyDetails(property);
    this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
  }

  markLeadClose() {
    swal({
      html: this.translate.instant('message.question.areYouSure') + '<br>' +
            this.translate.instant('message.question.wantTocloseLead'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.admin.postDataApi('leads/bank-mark-lead-closed', { lead_id: this.parameter.lead_id }).subscribe(r => {
          this.spinner.hide();
          this.parameter.lead.lead_status_bank = 1;
          swal('Success', this.translate.instant('message.success.leadClosedSuccessfully'), 'success');
        }, error => {
          this.spinner.hide();
        });
      }
    });
  }
}
