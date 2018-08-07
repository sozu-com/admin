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
  @Output() removeAddress = new EventEmitter();

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
    console.log('index removerow', this.index);
    this.removeAddress.emit(this.index);
  }

  getCountriesNew(index) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.countriesAdd = success.data;
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }

  getStatesNew(country_id, index) {

    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.statesAdd = success.data;
          this.address.countries = country_id;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }

  getCitiesNew(state_id, index) {

    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    const input = new FormData();
    input.append('state_id', state_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.citiesAdd = success.data;
          this.address.states = state_id;
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }


  getLocalitiesNew(city_id, index) {

    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    const input = new FormData();
    input.append('city_id', city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.localitiesAdd = success.data;
          this.address.cities = city_id;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }


  setLocality(locality_id, index) {
    this.address.localities = locality_id;
  }
}
