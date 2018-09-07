import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DealFinalize } from './../../../models/leads.model';
import { IProperty } from './../../../common/property';
import { AdminService } from './../../../services/admin.service';
declare let swal: any;

@Component({
  selector: 'app-interested-property',
  templateUrl: './interested-property.component.html',
  styleUrls: ['./interested-property.component.css'],
  providers: [DealFinalize]
})

export class InterestedPropertyComponent implements OnInit {

  @Input('data') data;
  @Input('adminType') adminType;
  @ViewChild('modalClose') modalClose;

  public parameter: IProperty = {};

  constructor(public model: DealFinalize, private admin: AdminService) { }

  ngOnInit() {
    console.log('ip', this.data);
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  attachProperty() {

    if  (this.data && this.data.property_id) {
      this.parameter.url = 'leads/attach-property';
      const input = {
        lead_id: this.data.lead_id,
        property_id: this.data.property_id,
        token_amount: this.model.token_amount,
        commision: this.model.commision,
        total_amount: this.model.total_amount
      };
      this.modalClose.nativeElement.click();
  console.log('leads/attach-property', input);
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.modalClose.nativeElement.click();
            swal('Success', 'Deal has been finalized successfully.', 'success');
            console.log('aa', success);
            // this.parameter.countries = success.data;
          });
    }
  }
}
