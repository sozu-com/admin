import { Component, OnInit, Input, ViewChild, ElementRef, Output } from '@angular/core';
import { DealFinalize } from './../../../models/leads.model';
import { IProperty } from './../../../common/property';
import { AdminService } from './../../../services/admin.service';
import { Constant } from './../../../common/constants';
import { EventEmitter } from 'events';
import { NgForm } from '@angular/forms';
declare let swal: any;

@Component({
  selector: 'app-interested-property',
  templateUrl: './interested-property.component.html',
  styleUrls: ['./interested-property.component.css'],
  providers: [DealFinalize]
})

export class InterestedPropertyComponent implements OnInit {

  @Output() deal_finalised_success = new EventEmitter();
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
  public location: IProperty = {};
  property_ids = [];
  public scrollbarOptions = { axis: 'y', theme: 'dark', scrollbarPosition: 'inside'};
  constructor(public model: DealFinalize, public admin: AdminService, public constant: Constant) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.page2 = this.constant.p;
    this.parameter.total = 0;
    this.parameter.total2 = 0;
  }

  openModal(property_id, lead_id) {
    this.model.property_id = property_id;
    this.model.lead_id = lead_id;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
  }

  getPage(page) {
    this.parameter.page = page;
    this.propertySearch();
  }

  getPage2(page) {
    this.parameter.page2 = page;
    this.viewProperties('', page);
  }

  attachProperty(formdata: NgForm) {
    if (this.model.total_amount < this.model.token_amount) {
      swal('Error', 'Total amount must be greater than token amount.', 'error');
      return false;
    }
    this.modalClose.nativeElement.click();
    this.parameter.loading = true;
    this.admin.postDataApi('leads/attach-property', this.model)
      .subscribe(
        success => {
          formdata.reset();
          this.parameter.loading = false;
          this.is_deal_finalised = true;
          this.modalClose.nativeElement.click();
          swal('Success', 'Deal has been finalized successfully.', 'success');
          this.deal_finalised_success.emit('true');
        }, error => {
          this.parameter.loading = false;
        });
  }

  deleteLeadInterestedProperty(property_id, lead_id, index) {
    const test = this.selected_properties.map(i => i.property_id === property_id);
    if (test[0]) {
      swal('Error', 'You cannot remove this property as this is finalized property.', 'error');
    } else {
      swal({
        html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to remove this property?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const input = {property_id: property_id, lead_id: this.lead_id};
          this.admin.postDataApi('leads/deleteLeadInterestedProperty', {property_id: [property_id], lead_id: lead_id})
            .subscribe(
              success => {
                this.parameter.interested_properties.splice(index, 1);
                this.interested_properties = this.parameter.interested_properties;
                swal('Success', 'Interested property removed successfully.', 'success');
              });
        }
      });
    }
  }

  showModal() {
    this.showPropertyModal.nativeElement.click();
  }

  addLeadInterestedProperty(property_id) {
    const ids = this.interested_properties.map(d => d.property.id);
    const ff = ids.filter(p => p === property_id);
    console.log(property_id, ids, ff);
    if (ff.length !== 0) {
      swal('Error', 'This property is already added in your interests.', 'error');
    } else {
      const check_id = this.property_ids.indexOf(property_id);
      if (check_id === -1) {
        this.property_ids.push(property_id);
      } else {
        this.property_ids.splice(check_id, 1);
      }
    }
  }

  addPropertyToInterest() {
    console.log(this.property_ids);
    if (this.property_ids.length > 0) {
      swal({
        html: this.constant.title.ARE_YOU_SURE + '<br>' + 'You want to add selected properties to your interested properties?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          const input = {property_id: this.property_ids, lead_id: this.parameter.lead_id};
          this.admin.postDataApi('leads/addLeadInterestedProperty', input).subscribe(r => {
            this.showPropertyModal.nativeElement.click();
            this.property_ids = [];
            swal('Success', 'Added Successfully', 'success');
            this.interested_properties.push(r.data);
          });
        }
      });
    } else {
      swal('Error', 'Please choose any property.', 'error');
    }
  }

  checkIfAlreadyExist() {
    const ids = this.interested_properties.map(d => d.property.id);
    // const ff = ids.filter(p => p === property_id);
  }

  checkIfExist(id) {
    return this.selected_properties.find(i => i.property_id === id);
  }

  openviewPropertyModal(data, page) {
    this.viewProperties(data, page);
    this.showInterestedProperty.nativeElement.click();
  }

  viewProperties(data, page) {
    // this.parameter.interested_properties = data;
    this.parameter.loading = true;
    this.admin.postDataApi('leads/getLeadInterestedProperty', {lead_id: this.lead_id, page: this.parameter.page2}).subscribe(r => {
      this.parameter.loading = false;
      console.log('Country', r);
      this.parameter.interested_properties = r['data'];
      this.parameter.total2 = r.total;
    }, error => {
      this.parameter.loading = false;
    });
  }

  getCountries(lead_id) {
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    this.location.states = []; this.parameter.state_id = '0';
    this.parameter.items = [];
    this.parameter.total = 0;
    this.parameter.noResultFound = false;
    this.parameter.lead_id = lead_id;
    this.showPropertyModal.nativeElement.click();
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      console.log('Country', r);
      this.location.countries = r['data'];
    });
  }

  onCountryChange(id) {
    this.location.states = []; this.parameter.state_id = '0';
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id.toString() === '0') {
      this.parameter.state_id = '0';
      return false;
    }
    this.parameter.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    console.log(selectedCountry);
    this.location.states = selectedCountry[0].states;

  }

  onStateChange(id) {
    console.log(id);
    this.location.cities = []; this.parameter.city_id = '0';
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id.toString() === '0') {
      this.parameter.city_id = '0';
      return false;
    }
    this.parameter.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    console.log(id);
    this.location.localities = []; this.parameter.locality_id = '0';
    if (!id || id.toString() === '0') {
      this.parameter.locality_id = '0';
      return false;
    }
    this.parameter.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    console.log(id);
    if (!id || id.toString() === '0') {
      return false;
    }
    this.parameter.locality_id = id;
  }

  propertySearch() {
    this.admin.postDataApi('propertySearch', this.parameter).subscribe(r => {
      this.parameter.items = r.data;
      if (this.property_ids.length > 0) {
        this.parameter.items.forEach(element => {
          const check_id = this.property_ids.indexOf(element.id);
          if (check_id !== -1) { element.checked = true; }
        });
      }
      this.parameter.total = r.total;
      if (this.parameter.items.length <= 0) { this.parameter.noResultFound = true; }
    });
  }
}
