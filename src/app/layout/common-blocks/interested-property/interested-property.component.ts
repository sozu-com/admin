import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DealFinalize } from './../../../models/leads.model';
import { IProperty } from './../../../common/property';
import { AdminService } from './../../../services/admin.service';
import { Constant } from './../../../common/constants';
declare let swal: any;

@Component({
  selector: 'app-interested-property',
  templateUrl: './interested-property.component.html',
  styleUrls: ['./interested-property.component.css'],
  providers: [DealFinalize]
})

export class InterestedPropertyComponent implements OnInit {

  @Input('data') data;
  @Input('lead_id') lead_id;
  @Input('adminType') adminType;
  @Input('interested_properties') interested_properties;
  @Input('selected_properties') selected_properties;

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;
  @ViewChild('hidePropertyModal') hidePropertyModal: ElementRef;

  public parameter: IProperty = {};

  constructor(public model: DealFinalize, private admin: AdminService, public constant: Constant) { }

  ngOnInit() {
    console.log('ip', this.data);
    this.showProperties(this.lead_id);
  }

  openModal(property_id, lead_id) {
    this.model.property_id = property_id;
    this.model.lead_id = lead_id;
    this.modalOpen.nativeElement.click();
  }
  closeModal() {
    this.modalClose.nativeElement.click();
  }

  attachProperty() {
console.log('===', this.model);
    this.parameter.url = 'leads/attach-property';
    // const input = {
    //   lead_id: this.model.lead_id,
    //   property_id: this.model.property_id,
    //   token_amount: this.model.token_amount,
    //   commision: this.model.commision,
    //   total_amount: this.model.total_amount
    // };
    this.modalClose.nativeElement.click();
    console.log('leads/attach-property', this.model);
    this.admin.postDataApi(this.parameter.url, this.model)
      .subscribe(
        success => {
          this.modalClose.nativeElement.click();
          swal('Success', 'Deal has been finalized successfully.', 'success');
          console.log('aa', success);
        });
  }

  deleteLeadInterestedProperty(property_id, lead_id, index) {
    console.log('ssss==>', this.selected_properties);
    const test = this.selected_properties.map(i => i.property_id === property_id);
    console.log('test', test[0]);
    if (test[0]) {
      swal('Error', 'You cannot remove this property as this is finalized property.', 'error');
    } else {
      console.log('aaa');
      this.parameter.url = 'leads/deleteLeadInterestedProperty';
      swal({
        html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to remove this property?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const input = {property_id: property_id, lead_id: this.lead_id};
          console.log('const', input);
          this.admin.postDataApi(this.parameter.url, {property_id: property_id, lead_id: lead_id})
            .subscribe(
              success => {
                console.log('deleteLeadInterestedProperty', success);
                this.interested_properties.splice(index, 1);
                swal('Success', 'Interested property removed successfully.', 'success');
                // this.parameter.countries = success.data;
              });
        }
      });
    }
  }


  showProperties(lead_id) {
    this.parameter.lead_id = lead_id;
    this.admin.generalApi('user/allCities', {}).subscribe(r => {
      console.log('allCities', r);
      this.parameter.cities = r.data;
      if (r.data.length !== 0) {
        this.parameter.city_id = r.data[0].id;
        this.homeSearch(r.data[0].id);
      } else {
        swal('Error', 'No city exists.', 'error');
      }
    });
  }

  homeSearch(city_id) {
    this.parameter.city_id = city_id;
    this.admin.generalApi('user/homeSearch', {city_id: city_id}).subscribe(r => {
      console.log('homeSearch', r);
      this.parameter.items = r.data;
    });
  }

  showModal() {
    this.showPropertyModal.nativeElement.click();
  }

  addLeadInterestedProperty(property_id) {
    const ids = this.interested_properties.map(d => d.property.id);
    const ff = ids.filter(p => p === property_id);
    console.log('fffff', ff);
    if (ff.length !== 0) {
      swal('Error', 'This property is added in your interested properties.', 'error');
    } else {
      swal({
        html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to add this property to your interested property?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const input = {property_id: property_id, lead_id: this.lead_id};
          console.log('const', input);
          this.admin.postDataApi('leads/addLeadInterestedProperty', input).subscribe(r => {
            console.log('addLeadInterestedProperty', r);
            this.showPropertyModal.nativeElement.click();
            // this.parameter.items = r.data;
            this.interested_properties.push(r.data);
          });
        }
      });
    }
  }

  checkIfExist(id) {
    console.log('id', id);
    return this.selected_properties.find(i => i.property_id === id);
    // const ids = this.selected_properties.map(d => d.property.id);
    // const ff = ids.filter(p => p === id);
  }
}
