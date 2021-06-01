import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';

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

  // @Input('countries') countries;
  // @Input('states') states;
  // @Input('cities') cities;
  // @Input('localities') localities;
  // @Input('buildings') buildings;

  _countries;
   get countries(): any {
    return this._countries;
}
@Input() set countries(value: any) {
    this._countries = value;
    this.address.countries = this._countries && this._countries.length > 0 ? (this._countries[0] || {}).id : 0;
    if(this._countries && this._countries.length > 0 && this._countries[0]){
      this.getStatesNew1(this._countries[0].id, 0);
      }
}

_states;
get states(): any {
    return this._states;
}
@Input() set states(value: any) {
    this._states = value;
    this.address.states = this._states  && this._states.length > 0 ? (this._states[0] || {}).id : 0;
    if(this.states && this.states.length > 0 && this.states[0]){
      this.getCitiesNew1(this.states[0].id, 0);
    }
}

_cities;
get cities(): any {
    return this._cities;
}
@Input() set cities(value: any) {
    this._cities = value;
    this.address.cities = this._cities && this._cities.length > 0 ? (this._cities[0] || {}) .id : 0;
    if(this.cities && this.cities.length > 0 && this.cities[0]){
      this.getLocalitiesNew1(this.cities[0].id, 0);
      }
}

_localities;
get localities(): any {
    return this._localities;
}
@Input() set localities(value: any) {
    this._localities = value;
    this.address.localities = this._localities  && this._localities.length ? (this._localities[0] || {}).id : 0;
    if(this.localities && this.localities.length > 0 && this.localities[0]){
      this.getLocalityBuildings(this.localities[0].id, 0);
      }
}

_buildings;
get buildings(): any {
    return this._buildings;
}
@Input() set buildings(value: any) {
    this._buildings = value;
    this.address.buildings = this._buildings  && this._buildings.length ? (this._buildings[0] || {}).id : 0;
}
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
      this.getLocalityBuildings(this.address.localities, 0);
    }
    // else{
    //   this.address.countries = this.countries[0].id;
    //   this.address.states = this.states[0].id;
    //   this.address.cities = this.cities[0].id;
    //   this.address.localities = this.localities[0].id;
    //   this.getStatesNew(this.countries[0].id, 0);
    //   this.getCitiesNew(this.states[0].id, 0);
    //   this.getLocalitiesNew(this.cities[0].id, 0);
    //   this.getLocalityBuildings(this.localities[0].id, 0);
    // }
  }

  removeRow() {
    this.removeAddress.emit(this.index);
  }


  getCountriesNew1(index) {
    this.parameter.statesAdd = []; this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    this.parameter.buildingsAdd = [];
    this.admin.postDataApi('getCountries', {})
      .subscribe(success => { this.parameter.countriesAdd = success.data; });
  }

  getCountriesNew(index) {
    this.parameter.statesAdd = []; this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    this.parameter.buildingsAdd = [];
  }

  getStatesNew1(country_id, index) {
    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.country_id = country_id;

    if (country_id !== '' && country_id !== '0') {
      this.admin.postDataApi('country/getStates', {country_id: country_id})
      .subscribe(
        success => {
          this.parameter.statesAdd = success.data;
          this.address.countries = country_id;
          this.address.states = '0'; this.address.cities = '0';
          this.address.localities = '0'; this.address.buildings = '0';
        });
    } else {
      this.parameter.statesAdd = [];
      this.address.countries = country_id; this.address.states = '0';
      this.address.cities = '0'; this.address.localities = '0'; this.address.buildings = '0';
    }
  }

  getStatesNew(country_id, setZero) {
    this.parameter.statesAdd = [];
    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.country_id = country_id;

    this.address.countries = country_id;
    this.address.states = this.address.states && setZero === 1 ? '0' : this.address.states;
    this.address.cities = this.address.cities && setZero === 1 ? '0' : this.address.cities;
    this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
    this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;

    if (country_id === '' || country_id === '0') {
      return false;
    } else {
      this.parameter.country_id = country_id;
      if (this._countries) {
        const selectedCountry = this._countries.filter(x => x.id.toString() === country_id.toString());
        this.parameter.statesAdd = selectedCountry[0].states || [];
      }
    }
  }

  getCitiesNew1(state_id, index) {

    this.parameter.localitiesAdd = [];
    this.parameter.state_id = state_id;

    if (state_id !== '' && state_id !== '0') {
      this.admin.postDataApi('getCities', {state_id: state_id})
      .subscribe(
        success => {
          this.parameter.citiesAdd = success.data;
          this.address.states = state_id; this.address.cities = '0';
          this.address.localities = '0'; this.address.buildings = '0';
        });
    } else {
      this.parameter.citiesAdd = []; this.address.states = state_id;
      this.address.cities = '0'; this.address.localities = '0'; this.address.buildings = '0';
    }
  }

  getCitiesNew(state_id, setZero) {
    this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.citiesAdd = [];
    this.address.states = state_id;


    this.address.cities = this.address.cities && setZero === 1 ? '0' : this.address.cities;
    this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
    this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;

    if (state_id === '' || state_id === '0') {
      return false;
    }
    if (this.parameter.statesAdd.length !== 0) {
      const selectedState = this.parameter.statesAdd.filter(x => x.id.toString() === state_id.toString());
      this.parameter.citiesAdd = selectedState[0].cities;
    }
  }

  getLocalitiesNew1(city_id, index) {

    this.parameter.city_id = city_id;

    if (city_id !== '' && city_id !== '0') {
      this.admin.postDataApi('getLocalities', {city_id: city_id})
      .subscribe(
        success => {
          this.parameter.localitiesAdd = success.data;
          this.address.cities = city_id; this.address.localities = '0'; this.address.buildings = '0';
        });
    } else {
      this.parameter.localitiesAdd = []; this.address.cities = city_id;
      this.address.localities = '0'; this.address.buildings = '0';
    }
  }


  getLocalitiesNew(city_id, setZero) {
    this.parameter.city_id = city_id;
    this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = []; this.address.cities = city_id;

    this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
    this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;

    if (city_id === '' || city_id === '0') {
      return false;
    }

    if (this.parameter.citiesAdd.length !== 0) {
      const selectedCountry = this.parameter.citiesAdd.filter(x => x.id.toString() === city_id.toString());
      this.parameter.localitiesAdd = selectedCountry[0].localities;
    }
  }

  getLocalityBuildings(locality_id, setZero) {
    this.parameter.locality_id = locality_id;
    this.parameter.buildingsAdd = [];
    this.admin.postDataApi('getLocalityBuildings', {localities: [locality_id]})
      .subscribe(
        success => {
          this.parameter.buildingsAdd = success.data;
          this.address.localities = locality_id;
          // this.address.buildings = '0';

          this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;

          // this.parameter.buildingsAdd.push({id: '0', name: 'All', status: 1});
          for (let c = 0; c < this.parameter.buildingsAdd.length; c++) {
            this.parameter.buildingsAdd[c].disabled = false;
            // if (this.disabledBuildings !== undefined) {
              for (let d = 0; d < this.disabledBuildings.length; d++) {
                if (this.disabledBuildings[d] === (this.parameter.buildingsAdd[c].id).toString()) {
                  this.parameter.buildingsAdd[c].disabled = true;
                }
              }
            // }
          }
        });
  }

  setBuilding(building_id, index) {
    this.address.buildings = building_id;
    this.disabledBuilding.emit(this.index);
  }
}
