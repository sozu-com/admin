import { Component, OnInit, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { InhouseUsers } from './../../../models/inhouse-users.model';
declare let swal: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {

  public parameter: IProperty = {};
  @Input('address') address;
  @Input('index') index;
  @Input('status') status;
  @Input('disabledLocalities') disabledLocalities;

  @Output() removeAddress = new EventEmitter();
  @Output() disabledLocality = new EventEmitter();

  constructor(private model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute,
    private admin: AdminService, private router: Router) { }

  ngOnInit() {
    this.getCountriesNew(0);
    if (this.address.countries) {
      this.getStatesNew(this.address.countries, 0);
      this.getCitiesNew(this.address.states, 0);
      this.getLocalitiesNew(this.address.cities, 0);
    }
  }

  removeRow() {
    this.removeAddress.emit(this.index);
  }

  getCountriesNew(index) {

    this.parameter.statesAdd = []; this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    // this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.countriesAdd = success.data;
        });
  }

  getStatesNew(country_id, index) {

    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    // this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (country_id !== '') {
      this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.statesAdd = success.data;
          this.address.countries = country_id;
        });
    }
  }

  getCitiesNew(state_id, index) {

    this.parameter.localitiesAdd = [];
    // this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    const input = new FormData();
    input.append('state_id', state_id);

    if (state_id !== '') {
      this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.citiesAdd = success.data;
          this.address.states = state_id;
        });
    }
  }


  getLocalitiesNew(city_id, index) {

    // this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    const input = new FormData();
    input.append('city_id', city_id);

    if (city_id !== '') {
      this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.localitiesAdd = success.data;
          this.address.cities = city_id;
          for (let c = 0; c < this.parameter.localitiesAdd.length; c++) {
            this.parameter.localitiesAdd[c].disabled = false;
            for (let d = 0; d < this.disabledLocalities.length; d++) {
              if (this.disabledLocalities[d] === (this.parameter.localitiesAdd[c].id).toString()) {
                this.parameter.localitiesAdd[c].disabled = true;
              }
            }
          }
        });
    }
  }

  setLocality(locality_id, index) {
    this.address.localities = locality_id;
    this.disabledLocality.emit(this.index);
  }
}
