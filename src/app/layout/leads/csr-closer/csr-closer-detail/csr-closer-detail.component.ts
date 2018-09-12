import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AdminService } from '../../../../services/admin.service';
import { CommonService } from '../../../../services/common.service';
import { IProperty } from '../../../../common/property';
import * as io from 'socket.io-client';
import { Constant } from './../../../../common/constants';
import { SelectedProperties, BankAssigned, NotaryAssigned } from './../../../../models/leads.model';
declare let swal: any;

@Component({
  selector: 'app-csr-closer-detail',
  templateUrl: './csr-closer-detail.component.html',
  styleUrls: ['./csr-closer-detail.component.css'],
  providers: [SelectedProperties, BankAssigned, NotaryAssigned]
})

export class CsrCloserDetailComponent implements OnInit, OnDestroy {

  @ViewChild('showBanks') showBanks: ElementRef;
  @ViewChild('hideBanks') hideBanks: ElementRef;

  @ViewChild('showNotaries') showNotaries: ElementRef;
  @ViewChild('hideNotaries') hideNotaries: ElementRef;

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
    private router: Router,
    private admin: AdminService,
    private cs: CommonService,
    public constant: Constant,
    public selectedProperties: SelectedProperties,
    public bankModel: BankAssigned,
    public notaryModel: NotaryAssigned
  ) { }

  ngOnInit() {
    this.parameter.sent_as = 3;
    this.route.params.subscribe( params => {
      this.parameter.lead_id = params.id;
      this.admin.postDataApi('leads/details', {lead_id: this.parameter.lead_id, sent_as: this.parameter.sent_as}).subscribe(r => {
        console.log('lead details', r);
        this.getDocumentOptions();
        this.parameter.lead = r.data.lead;
        this.selectedProperties = r.data.lead.selected_properties[0];
        this.parameter.user_id = this.parameter.lead.user.id;
        console.log('selected property', this.selectedProperties);
      });
    });
  }

  ngOnDestroy() {
    // this.parameter.subscriber.uns
  }

  getNotaries(property_id) {
    this.notaryModel.property_id = property_id;
    this.notaryModel.lead_id = this.parameter.lead_id;
    this.admin.postDataApi('getNoataries', {}).subscribe(r => {
      console.log('getNoataries', r);
      this.showNotaries.nativeElement.click();
      this.parameter.items = r.data;
    });
  }

  assignNoatary(notary) {
    console.log('====', notary);
    this.notaryModel.noatary_id = notary.id;
    console.log('==', this.notaryModel);
    swal({
      html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this notary?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.selectedProperties.noataries = [notary];
        // this.hideNotaries.nativeElement.click();
        this.admin.postDataApi('leads/assignNoatary', this.notaryModel).subscribe(r => {
          console.log('assignBank', r);
          swal('Success', 'Notary is assigned successfully.', 'success');
          this.notaryModel = new NotaryAssigned();
          this.hideNotaries.nativeElement.click();
        });
      }
    });
  }

  getBanks(property_id) {
    this.bankModel.property_id = property_id;
    this.bankModel.lead_id = this.parameter.lead_id;
    this.admin.postDataApi('getBanks', {}).subscribe(r => {
      console.log('getbanks', r);
      this.showBanks.nativeElement.click();
      this.parameter.banks = r.data;
    });
  }

  assignBank(bank) {
    this.bankModel.bank_id = bank.id;
    swal({
      html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to assign this bank?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.selectedProperties.banks = [bank];
        // this.hideBanks.nativeElement.click();
        this.admin.postDataApi('leads/assignBank', this.bankModel).subscribe(r => {
          console.log('assignBank', r);
          swal('Success', 'Bank is assigned successfully.', 'success');
          this.bankModel = new BankAssigned();
          this.hideBanks.nativeElement.click();
        });
      }
    });
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

  updateDocumentChecklist() {
    const ids = this.selectedProperties.allDocuments.filter(d => d.is_selected === 1);
    const documents_ids = ids.map(d => d.id);
    console.log('selected', this.selectedProperties);
    console.log('ids', ids, documents_ids);
    const input = {
      lead_id: this.parameter.lead_id,
      property_id: this.selectedProperties.property_id,
      documents: documents_ids
    };
    this.admin.postDataApi('leads/updateDocumentChecklist', input).subscribe(r => {
      console.log('updateDocumentChecklist', r);
    }
  );
  }

  noDocumentUploaded() {
    swal('Error', 'No document uploaded yet.', 'error');
  }

  viewPropertyDetails(property) {
    this.cs.setPropertyDetails(property);
    this.router.navigate(['/dashboard/properties/details/' + property.property_id]);
    // routerLink="/dashboard/properties/details/"
  }
}
