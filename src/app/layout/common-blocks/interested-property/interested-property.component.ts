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
  @Input('sent_as') sent_as;
  @Input('interested_properties') interested_properties;
  @Input('selected_properties') selected_properties;
  @Input('is_deal_finalised') is_deal_finalised;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('showPropertyModal') showPropertyModal: ElementRef;
  @ViewChild('hidePropertyModal') hidePropertyModal: ElementRef;
  @ViewChild('showInterestedProperty') showInterestedProperty: ElementRef;
  @ViewChild('hideInterestedProperty') hideInterestedProperty: ElementRef;

  public parameter: IProperty = {};

  constructor(public model: DealFinalize, public admin: AdminService, public constant: Constant) { }

  ngOnInit() {
    // this.showProperties(this.lead_id);
  }

  openModal(property_id, lead_id) {
    // const test = this.selected_properties.map(i => i.property_id === property_id);
    // if (test[0]) {
    //   swal('Error', 'This property is already finalized by you.', 'error');
    // } else {
    //   this.model.property_id = property_id;
    //   this.model.lead_id = lead_id;
    //   this.modalOpen.nativeElement.click();
    // }
    console.log('==================');
    this.model.property_id = property_id;
    this.model.lead_id = lead_id;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  attachProperty() {
    this.parameter.url = 'leads/attach-property';
    this.modalClose.nativeElement.click();
    this.admin.postDataApi(this.parameter.url, this.model)
      .subscribe(
        success => {
          this.is_deal_finalised = true;
          this.modalClose.nativeElement.click();
          swal('Success', 'Deal has been finalized successfully.', 'success');
        });
  }

  deleteLeadInterestedProperty(property_id, lead_id, index) {
    const test = this.selected_properties.map(i => i.property_id === property_id);
    if (test[0]) {
      swal('Error', 'You cannot remove this property as this is finalized property.', 'error');
    } else {
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
          this.admin.postDataApi(this.parameter.url, {property_id: [property_id], lead_id: lead_id})
            .subscribe(
              success => {
                this.interested_properties.splice(index, 1);
                swal('Success', 'Interested property removed successfully.', 'success');
              });
        }
      });
    }
  }

  showProperties(lead_id) {
    this.parameter.lead_id = lead_id;
    this.admin.postDataApi('allCities', {}).subscribe(r => {
      this.parameter.cities = r.data;
      if (r.data.length !== 0) {
        this.parameter.city_id = r.data[0].id;
        this.propertySearch(r.data[0].id);
        this.showPropertyModal.nativeElement.click();
      } else {
        swal('Error', 'No city exists.', 'error');
      }
    });
  }

  // showProperties(lead_id) {
  //   this.parameter.lead_id = lead_id;
  //   this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
  //     console.log('getCountryLocality', r);
  //     this.parameter.cities = r.data;
  //     if (r.data.length !== 0) {
  //       this.showPropertyModal.nativeElement.click();
  //       this.parameter.countries = r.data;
  //       this.parameter.country_id = r.data[0].id;
  //       this.parameter.states = r.data[0].states;
  //       // this.parameter.states.push({id: '0', name: 'All', status: 1});
  //       this.parameter.state_id = '0';
  //       this.propertySearch(r.data[0].id);
  //     } else {
  //       swal('Error', 'No city exists.', 'error');
  //     }
  //   });
  // }

  propertySearch(city_id) {
    this.parameter.city_id = city_id;
    this.admin.postDataApi('propertySearch', {city_id: city_id, lead_id: this.lead_id}).subscribe(r => {
      // console.log('==>', r);
      this.parameter.items = r.data;
    });
  }

  showModal() {
    this.showPropertyModal.nativeElement.click();
  }

  addLeadInterestedProperty(property_id) {
    const ids = this.interested_properties.map(d => d.property.id);
    const ff = ids.filter(p => p === property_id);
    if (ff.length !== 0) {
      swal('Error', 'This property is already added in your interests.', 'error');
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
          this.admin.postDataApi('leads/addLeadInterestedProperty', input).subscribe(r => {
            this.showPropertyModal.nativeElement.click();
            swal('Success', 'Added Successfully', 'success');
            this.interested_properties.push(r.data);
          });
        }
      });
    }
  }

  checkIfAlreadyExist() {
    const ids = this.interested_properties.map(d => d.property.id);
    // const ff = ids.filter(p => p === property_id);
  }

  checkIfExist(id) {
    return this.selected_properties.find(i => i.property_id === id);
  }

  viewProperties(data) {
    this.parameter.interested_properties = data;
    this.showInterestedProperty.nativeElement.click();
  }
}
