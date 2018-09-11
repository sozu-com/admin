import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
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
  @Input('disabledBuildings') disabledBuildings;

  @Output() removeAddress = new EventEmitter();
  // @Output() disabledLocality = new EventEmitter();
  @Output() disabledBuilding = new EventEmitter();

  constructor(private admin: AdminService) { }

  ngOnInit() {
    this.getCountriesNew(0);
    if (this.address && this.address.countries) {
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
    this.parameter.buildingsAdd = [];
    this.parameter.url = 'getCountries';
    // const input = new FormData();

    this.admin.postDataApi(this.parameter.url, {})
      .subscribe(success => { this.parameter.countriesAdd = success.data; });
  }

  getStatesNew(country_id, index) {

    console.log('=====', country_id, index);

    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    // const input = new FormData();
    // input.append('country_id', country_id);

    if (country_id !== '' && country_id !== '0') {
      this.admin.postDataApi(this.parameter.url, {country_id: country_id})
      .subscribe(
        success => {
          console.log('getStates', success);
          this.parameter.statesAdd = success.data;
          this.address.countries = country_id;
          this.parameter.statesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
          this.address.states = '0'; this.address.cities = '0';
          this.address.localities = '0'; this.address.buildings = '0';
        });
    } else {
      this.parameter.statesAdd = [];
      this.address.countries = country_id; this.address.states = '0';
      this.address.cities = '0'; this.address.localities = '0'; this.address.buildings = '0';
    }
  }

  getCitiesNew(state_id, index) {

    this.parameter.localitiesAdd = [];
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    // const input = new FormData();
    // input.append('state_id', state_id);

    if (state_id !== '' && state_id !== '0') {
      this.admin.postDataApi(this.parameter.url, {state_id: state_id})
      .subscribe(
        success => {
          this.parameter.citiesAdd = success.data;
          this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
          this.address.states = state_id; this.address.cities = '0';
          this.address.localities = '0'; this.address.buildings = '0';
        });
    } else {
      this.parameter.citiesAdd = []; this.address.states = state_id;
      this.address.cities = '0'; this.address.localities = '0'; this.address.buildings = '0';
    }
  }


  getLocalitiesNew(city_id, index) {

    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    // const input = new FormData();
    // input.append('city_id', city_id);

    if (city_id !== '' && city_id !== '0') {
      this.admin.postDataApi(this.parameter.url, {city_id: city_id})
      .subscribe(
        success => {
          this.parameter.localitiesAdd = success.data;
          this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
          this.address.cities = city_id; this.address.localities = '0'; this.address.buildings = '0';
          // for (let c = 0; c < this.parameter.localitiesAdd.length; c++) {
          //   this.parameter.localitiesAdd[c].disabled = false;
          //   for (let d = 0; d < this.disabledLocalities.length; d++) {
          //     if (this.disabledLocalities[d] === (this.parameter.localitiesAdd[c].id).toString()) {
          //       this.parameter.localitiesAdd[c].disabled = true;
          //     }
          //   }
          // }
        });
    } else {
      this.parameter.localitiesAdd = []; this.address.cities = city_id;
      this.address.localities = '0'; this.address.buildings = '0';
    }
  }


  getLocalityBuildings(locality_id, index) {
    this.parameter.url = 'getLocalityBuildings';
    this.parameter.locality_id = locality_id;

    this.admin.postDataApi(this.parameter.url, {locality_id: locality_id})
      .subscribe(
        success => {
          this.parameter.buildingsAdd = success.data;
          this.address.localities = locality_id;
          this.address.buildings = '0';
          this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
          for (let c = 0; c < this.parameter.buildingsAdd.length; c++) {
            this.parameter.buildingsAdd[c].disabled = false;
            for (let d = 0; d < this.disabledBuildings.length; d++) {
              if (this.disabledBuildings[d] === (this.parameter.buildingsAdd[c].id).toString()) {
                this.parameter.buildingsAdd[c].disabled = true;
              }
            }
          }
        });
  }

  // setLocality(locality_id, index) {
  //   this.address.localities = locality_id;
  //   this.disabledLocality.emit(this.index);
  // }

  setBuilding(building_id, index) {
    this.address.buildings = building_id;
    this.disabledBuilding.emit(this.index);
  }
}
