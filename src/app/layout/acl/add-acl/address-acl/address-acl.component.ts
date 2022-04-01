import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-address-acl',
  templateUrl: './address-acl.component.html',
  styleUrls: ['./address-acl.component.css']
})
export class AddressAclComponent implements OnInit {

  public parameter: IProperty = {};
  // address: any = {};
  @Input('address') address;
  @Input('index') index;
  @Input('status') status;
  @Input('disabledBuildings') disabledBuildings;
  @Input('countries') countries;

  // address_array: any;
  // get address(): any {
  //   return this.address;
  // }
  // @Input() set address(value: any) {
  //   this.address_array = value;
  //   if (this.address_array.states != 0) {
  //     this.getStatesNew(this.address.countries, 0);
  //   }
  // }

  // countries_array = [];
  // get countries(): any {
  //   return this.countries;
  // }
  // @Input() set countries(value: any) {
  //   this.countries_array = value;
  //   this.getStatesNew(this.address.countries, 0);
  // }


  @Output() removeAddress = new EventEmitter();
  @Output() disabledBuilding = new EventEmitter();

  constructor(private admin: AdminService, private spinner: NgxSpinnerService,) {
    // this.admin.user_acl.subscribe(user => {
    //   this.address = user;
    //   console.log(this.address, "user_Acl_address chhild");
    // });
    // this.getCountriesNew(0);
  }

  ngOnInit() {
    if (this.address.cities != 0 && this.address.localities != 0 && this.address.buildings != 0) {
      this.getStatesNew(this.address.countries, 0);
      this.getLocalitiesNew(this.address.cities, 0);
      this.getLocalityBuildings(this.address.localities, 0);
      this.setBuilding(this.address.buildings, 0)
    }
  }

  getStatesNew(country_id, setZero) {
    this.address.countries = country_id ? country_id : this.address.countries;
    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.country_id = country_id;
    this.address.states = this.address.states && setZero === 1 ? '0' : this.address.states;
    this.address.cities = this.address.cities && setZero === 1 ? '0' : this.address.cities;
    this.address.localities = this.address.localities && setZero === 1 ? '0' : this.address.localities;
    this.address.buildings = this.address.buildings && setZero === 1 ? '0' : this.address.buildings;
    if (this.countries) {
      const selectedCountry = this.countries.filter(x => x.id.toString() === country_id.toString());
      selectedCountry.forEach(element => {
        this.parameter.statesAdd = element.states;
        this.getCitiesNew(this.address.states, 0);
      });
    } else {
      return false;
    }
    // if (country_id === '' || country_id === '0') {
    //   return false;
    // } else {
    //   this.parameter.country_id = country_id;
    //   if (this.countries) {
    //     const selectedCountry = this.countries.filter(x => x.id.toString() === country_id.toString());
    //     selectedCountry.forEach(element => {
    //       this.parameter.statesAdd = element.states;
    //       this.getCitiesNew(this.address.states, 0);
    //     });
    //     //this.parameter.statesAdd = selectedCountry[0].states;
    //   }
    // }
  }

  getCitiesNew(state_id, setZero) {
    this.address.states = state_id ? state_id : this.address.states;
    this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.citiesAdd = [];
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

  getLocalitiesNew(city_id, setZero) {
    this.address.cities = city_id ? city_id : this.address.cities;
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
    this.admin.postDataApi('getLocalityBuildings', { localities: [locality_id] })
      .subscribe(
        success => {
          this.parameter.buildingsAdd = success.data;
          this.address.localities = locality_id ? locality_id : this.address.localities;
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
    this.address.buildings = building_id ? building_id : this.address.buildings;
    this.disabledBuilding.emit(this.index);
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
      this.admin.postDataApi('country/getStates', { country_id: country_id })
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

  getCitiesNew1(state_id, index) {

    this.parameter.localitiesAdd = [];
    this.parameter.state_id = state_id;

    if (state_id !== '' && state_id !== '0') {
      this.admin.postDataApi('getCities', { state_id: state_id })
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

  getLocalitiesNew1(city_id, index) {

    this.parameter.city_id = city_id;

    if (city_id !== '' && city_id !== '0') {
      this.admin.postDataApi('getLocalities', { city_id: city_id })
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




}
