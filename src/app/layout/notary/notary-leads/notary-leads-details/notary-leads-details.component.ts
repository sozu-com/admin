import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { CommonService } from '../../../../services/common.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { SelectedProperties, BankAssigned, NotaryAssigned, ScheduleMeeting } from './../../../../models/leads.model';
import { Chat } from '../../../../models/chat.model';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;

@Component({
  selector: 'app-notary-leads-details',
  templateUrl: './notary-leads-details.component.html',
  styleUrls: ['./notary-leads-details.component.css'],
  providers: [SelectedProperties, BankAssigned, NotaryAssigned, Chat, ScheduleMeeting]
})
export class NotaryLeadsDetailsComponent implements OnInit {
  show = false;
  public parameter: IProperty = {};
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  // meetingDate: any = {
  //   appointment_date: '',
  //   id: ''
  // };
  @ViewChild('modalClose') modalClose: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    public selectedProperties: SelectedProperties,
    public model: Chat,
    public scheduleMeeting: ScheduleMeeting,
    private spinner: NgxSpinnerService
  ) {
    this.admin.loginData$.subscribe(success => {
      this.parameter.admin_id = success['id'];
    });
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  ngOnInit() {
    this.parameter.sent_as = this.constant.userType.notary;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.spinner.show();
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        this.spinner.hide();
        // console.log('lead details', r);
        this.getDocumentOptions();
        this.parameter.lead = r.data.lead;
        this.selectedProperties = r.data.lead.selected_properties[0];

        if (this.parameter.lead.appointments.length !== 0) {
          this.scheduleMeeting = this.parameter.lead.appointments[0];
        }
        // if (this.parameter.lead.appointments && this.parameter.lead.appointments.length !== 0) {
        //   for (let index = 0; index < this.parameter.lead.appointments.length; index++) {
        //     const element = this.parameter.lead.appointments[index];
        //     if (element.sent_as === this.constant.userType.csr_closer) {
        //       this.meetingDate = {
        //         appointment_date: element.appointment_date,
        //         id: element.id
        //       };
        //     }
        //   }
        // }
        // notary will chat with closer
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
      swal('Success', 'Successfully saved', 'success');
    }, error => {
      this.spinner.hide();
    }
  );
  }

  noDocumentUploaded() {
    swal('Error', 'No document uploaded yet.', 'error');
  }

  viewPropertyDetails(property) {
    console.log('--', property.property_id);
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
        this.admin.postDataApi('leads/noatary-mark-lead-closed', {lead_id: this.parameter.lead_id}).subscribe(r => {
          console.log('r', r);
          this.parameter.lead.lead_status_noatary = 1;
          swal('Success', 'Lead closed successfully.', 'success');
        });
      }
    });
  }
}
