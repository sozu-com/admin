import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';

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

  @Input('countries') countries;
  @Output() removeAddress = new EventEmitter();
  @Output() disabledBuilding = new EventEmitter();

  constructor(private admin: AdminService) {
    this.getCountriesNew(0);
  }

  ngOnInit() {
    if (this.address && this.address.countries) {
      this.getStatesNew(this.address.countries, 0);
      this.getCitiesNew(this.address.states, 0);
      this.getLocalitiesNew(this.address.cities, 0);
    }
  }

  removeRow() {
    this.removeAddress.emit(this.index);
  }







  getCountriesNew1(index) {
    this.parameter.statesAdd = []; this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    this.parameter.buildingsAdd = [];
    this.parameter.url = 'getCountries';
    this.admin.postDataApi(this.parameter.url, {})
      .subscribe(success => { this.parameter.countriesAdd = success.data; });
  }

  getCountriesNew(index) {
    this.parameter.statesAdd = []; this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    this.parameter.buildingsAdd = [];
    // this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
    //   console.log('Country', r);
    //   this.parameter.countriesAdd = r['data'];
    // });
  }

  getStatesNew1(country_id, index) {
    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    if (country_id !== '' && country_id !== '0') {
      this.admin.postDataApi(this.parameter.url, {country_id: country_id})
      .subscribe(
        success => {
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

  getStatesNew(country_id, index) {
    this.parameter.statesAdd = [];
    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.country_id = country_id;

    this.address.countries = country_id;
    // this.parameter.statesAdd.push({id: '0', name: 'All', status: 1});
    this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
    this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
    this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
    this.address.states = '0'; this.address.cities = '0';
    this.address.localities = '0'; this.address.buildings = '0';
console.log('cit', this.parameter.citiesAdd, this.address.cities);
    if (country_id === '' || country_id === '0') {
      this.parameter.statesAdd.push({id: '0', name: 'All', status: 1});
      // this.parameter.statesAdd = [];
      // this.address.countries = country_id; this.address.states = '0';
      // this.address.cities = '0'; this.address.localities = '0'; this.address.buildings = '0';
      return false;
    } else {
      this.parameter.country_id = country_id;
      // const selectedCountry = this.parameter.countriesAdd.filter(x => x.id.toString() === country_id);
      if (this.countries) {
        const selectedCountry = this.countries.filter(x => x.id.toString() === country_id.toString());
        this.parameter.statesAdd = selectedCountry[0].states;
        console.log('-------', this.parameter.statesAdd);

      console.log('==========', this.countries, selectedCountry, country_id);
              this.parameter.statesAdd.push({id: '0', name: 'All', status: 1});
      }



      // this.address.countries = country_id;
      // this.parameter.statesAdd.push({id: '0', name: 'All', status: 1});
      // this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
      // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
      // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
      // this.address.states = '0'; this.address.cities = '0';
      // this.address.localities = '0'; this.address.buildings = '0';
    }
  }

  getCitiesNew1(state_id, index) {

    this.parameter.localitiesAdd = [];
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

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

  getCitiesNew(state_id, index) {
    this.parameter.localitiesAdd = [];
    this.parameter.citiesAdd = [];


    // this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
    this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
    this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
    this.address.states = state_id; this.address.cities = '0';
    this.address.localities = '0'; this.address.buildings = '0';

    if (state_id === '' || state_id === '0') {
      this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
      // this.parameter.citiesAdd = []; this.address.states = state_id;
      // this.address.cities = '0'; this.address.localities = '0'; this.address.buildings = '0';
      return false;
    }

    // this.parameter.citiesAdd = success.data;

    const selectedState = this.parameter.statesAdd.filter(x => x.id.toString() === state_id.toString());
    this.parameter.citiesAdd = selectedState[0].cities;
    this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
    // this.parameter.citiesAdd.push({id: '0', name: 'All', status: 1});
    // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
    // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
    // this.address.states = state_id; this.address.cities = '0';
    // this.address.localities = '0'; this.address.buildings = '0';

  }

  getLocalitiesNew1(city_id, index) {

    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    if (city_id !== '' && city_id !== '0') {
      this.admin.postDataApi(this.parameter.url, {city_id: city_id})
      .subscribe(
        success => {
          this.parameter.localitiesAdd = success.data;
          this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
          this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
          this.address.cities = city_id; this.address.localities = '0'; this.address.buildings = '0';
        });
    } else {
      this.parameter.localitiesAdd = []; this.address.cities = city_id;
      this.address.localities = '0'; this.address.buildings = '0';
    }
  }


  getLocalitiesNew(city_id, index) {
    this.parameter.city_id = city_id;
console.log(city_id);
    this.parameter.localitiesAdd = []; this.address.cities = city_id;
    // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
    this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
    this.address.localities = '0'; this.address.buildings = '0';

    if (city_id === '' || city_id === '0') {
      this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
      // this.parameter.localitiesAdd = []; this.address.cities = city_id;
      // this.address.localities = '0'; this.address.buildings = '0';
      return false;
    }

    const selectedCountry = this.parameter.citiesAdd.filter(x => x.id.toString() === city_id.toString());
    console.log(selectedCountry);
    this.parameter.localitiesAdd = selectedCountry[0].localities;
    this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
    // this.parameter.localitiesAdd.push({id: '0', name: 'All', status: 1});
    // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
    // this.address.cities = city_id; this.address.localities = '0'; this.address.buildings = '0';
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

  setBuilding(building_id, index) {
    this.address.buildings = building_id;
    this.disabledBuilding.emit(this.index);
  }
}
