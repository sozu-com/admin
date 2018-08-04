import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from './../../../models/location.model';
import { Constant } from './../../../common/constants';
import { AGMComponent } from './../../../common/agm.component';
import { MapsAPILoader } from '@agm/core';
declare let swal: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [Location, Constant]
})

export class LocationComponent implements OnInit {

  public parameter: IProperty = {};
  public modalRef: BsModalRef;
  agm: any;

  @ViewChild('mapDiv') mapDiv: ElementRef;

  constructor(private loader: MapsAPILoader, private location: Location, private constant: Constant,
    private modalService: BsModalService, private admin: AdminService, private router: Router
  ) {
    this.parameter.countryCount = 0;
    this.parameter.stateCount = 0;
    this.parameter.cityCount = 0;
  }

  ngOnInit() {
    this.getCountries('');
    this.getAllCountries('');
    this.getAllCountriesForCities('');
    this.agm = new AGMComponent(this.loader);
  }

  public openCountryModal(template: TemplateRef<any>, country_id, name_en, name_es, status, index) {
    this.parameter.index = index;
    this.location.countryModel.country_id = country_id;
    this.location.countryModel.name_en = name_en;
    this.location.countryModel.name_es = name_es;
    this.location.countryModel.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openStateModal(template: TemplateRef<any>, country_id, state_id, name_en, name_es, status, index) {
    this.parameter.index = index;
    this.location.stateModel.country_id = country_id;
    this.location.stateModel.state_id = state_id;
    this.location.stateModel.name_en = name_en;
    this.location.stateModel.name_es = name_es;
    this.location.stateModel.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openCityModal(template: TemplateRef<any>, country_id, state_id, city_id, name_en, name_es, status, index) {
    this.parameter.index = index;
    this.location.cityModel.country_id = country_id;
    this.location.cityModel.state_id = state_id;
    this.location.cityModel.city_id = city_id;
    this.location.cityModel.name_en = name_en;
    this.location.cityModel.name_es = name_es;
    this.location.cityModel.status = status;
    this.modalRef = this.modalService.show(template);
  }

  public openLocalityModal(template: TemplateRef<any>, city_id, locality_id, name_en, name_es, poly_coordinates, status, index) {
    this.parameter.index = index;

    this.agm.init(this.mapDiv);

    this.location.localityModel.city_id = city_id;
    this.location.localityModel.locality_id = locality_id;
    this.location.localityModel.name_en = name_en;
    this.location.localityModel.name_es = name_es;
    this.location.localityModel.status = status;
    this.location.localityModel.poly_coordinates = poly_coordinates;
    this.modalRef = this.modalService.show(template);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }


  // used for dropdown for states
  getAllCountries(keyword) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.parameter.countries1 = success.data;
          if (this.parameter.countries1.length !== 0) {
            this.parameter.country_id = this.parameter.countries1[0].id;
            this.getStatesWRTCountry(this.parameter.countries1[0].id, '');
          }
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


  // used for dropdown for cities
  getAllCountriesForCities(keyword) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.parameter.countries2 = success.data;
          if (this.parameter.countries2.length !== 0) {
            this.parameter.country_id = this.parameter.countries2[0].id;
            this.getStates(this.parameter.countries2[0].id, '');
          }
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


  // used for country listing and country search
  getCountries(keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.parameter.countries = success.data;
          this.parameter.countryCount = success.data.length;
          // if (this.parameter.countries.length !== 0) {
          //   this.parameter.country_id = this.parameter.countries[0].id;
          //   this.getStatesWRTCountry(this.parameter.countries[0].id, '');
          // }
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

  // used on click of country -- city
  getStates(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states', success);
          this.parameter.loading = false;
          this.parameter.states1 = success.data;
          // this.parameter.stateCount = success.data.length;
          if (this.parameter.states1.length !== 0) {
            this.parameter.state_id = this.parameter.states1[0].id;
            this.getCities(this.parameter.states1[0].id, '');
          }
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

  // used for search and listing
  getStatesWRTCountry(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states', success);
          this.parameter.loading = false;
          this.parameter.states = success.data;
          this.parameter.stateCount = success.data.length;
          // if (this.parameter.states.length !== 0) {
          //   this.parameter.state_id = this.parameter.states[0].id;
          //   this.getCities(this.parameter.states[0].id, '');
          // }
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

  getCities(state_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    const input = new FormData();
    input.append('state_id', state_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('cities', success);
          this.parameter.loading = false;
          this.parameter.cities = success.data;
          this.parameter.cityCount = success.data.length;
          // if (this.parameter.cities.length !== 0) {
          //   this.parameter.city_id = this.parameter.cities[0].id;
          //   this.getLocalities(this.parameter.cities[0].id, '');
          // }
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

  getLocalities(city_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('cities', success);
          this.parameter.loading = false;
          this.parameter.localities = success.data;
          this.parameter.localityCount = success.data.length;
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

  checkIfCountrySpanishNameEntered(name_en, name_es= '') {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addCountry(name_en, name_en, self.location.countryModel.status, '');
        }
      });
    }else {
      self.addCountry(name_en, name_es, self.location.countryModel.status, '');
    }
  }


  addCountry(name_en: string, name_es: string, status, country_id) {

    if (country_id === '') {this.modalRef.hide(); }    // hide only when open

    this.parameter.loading = true;
    this.parameter.url = 'addCountry';

    const input = new FormData();
    input.append('name_es', name_es);
    input.append('name_en', name_en);
    input.append('status', status);

    if (this.location.countryModel.country_id) {
      input.append('country_id', this.location.countryModel.country_id);
    }else if (country_id) {
      input.append('country_id', country_id);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          const text = this.location.countryModel.country_id || country_id ?
            this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');

          this.parameter.loading = false;
          this.getAllCountries('');   // loading dropdown

          if (this.parameter.index === -1) {
            this.parameter.countries.push(success.data);
          }else {
            this.parameter.countries[this.parameter.index] = success.data;
          }

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


  checkIfStateSpanishNameEntered(country_id, name_en, name_es= '') {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_STATE_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addState(country_id, name_en, name_en, self.location.stateModel.status, '');
        }
      });
    }else {
      self.addState(country_id, name_en, name_es, self.location.stateModel.status, '');
    }
  }


  addState(country_id, name_en, name_es, status, state_id) {

    if (state_id === '') {this.modalRef.hide(); }

    this.parameter.loading = true;
    this.parameter.url = 'country/addState';

    const input = new FormData();
    input.append('name_es', name_es);
    input.append('name_en', name_en);
    input.append('status', status);


    if (this.location.stateModel.country_id) {
      input.append('country_id', this.location.stateModel.country_id);  // edit
    }else {
      input.append('country_id', country_id);  // add
    }

    if (this.location.stateModel.state_id) {
      input.append('state_id', this.location.stateModel.state_id);
    }else if (state_id) {
      input.append('state_id', state_id);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success1', success);
          const text = this.location.stateModel.state_id || state_id ?
          this.constant.successMsg.STATE_UPDATED_SUCCESSFULLY :
          this.constant.successMsg.STATE_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.parameter.loading = false;
          // this.getStates(this.location.stateModel.country_id ? this.location.stateModel.country_id : country_id, '');
          this.getStates(this.parameter.country_id, '');

          if (this.parameter.index === -1) {
            this.parameter.states.push(success.data);
          }else {
            this.parameter.states[this.parameter.index] = success.data;
          }

          // formdata.reset();
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


  checkIfCitySpanishNameEntered(state_id, name_en, name_es= '') {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_CITY_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addCity(state_id, name_en, name_en, self.location.cityModel.status, '');
        }
      });
    }else {
      self.addCity(state_id, name_en, name_es, self.location.cityModel.status, '');
    }
  }


  addCity(state_id, name_en, name_es, status, city_id) {
    if (city_id === '') {this.modalRef.hide(); }
    this.parameter.loading = true;
    this.parameter.url = 'addCity';

    const input = new FormData();
    input.append('name_es', name_es);
    input.append('name_en', name_en);
    input.append('status', status);

    if (this.location.cityModel.state_id) {
      input.append('state_id', this.location.cityModel.state_id);   // edit
    }else {
      input.append('state_id', state_id);   // add
    }

    if (this.location.cityModel.city_id) {
      input.append('city_id', this.location.cityModel.city_id);   // edit
    }else if (city_id) {
      input.append('city_id', city_id);   // edit
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success2', success);
          const text = this.location.cityModel.city_id || city_id ?
          this.constant.successMsg.CITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.CITY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.parameter.loading = false;
          // this.getCities(this.location.cityModel.state_id, '');


          if (this.parameter.index === -1) {
            this.parameter.cities.push(success.data);
          }else {
            this.parameter.cities[this.parameter.index] = success.data;
          }

          // formdata.reset();
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


  blockUnblockCountry(country_id, name_en, name_es, type, index) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (type) {
      case 0:
        this.parameter.text = this.constant.title.BLOCK_COUNTRY;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.UNBLOCK_COUNTRY;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
    }

    swal({
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addCountry(name_en, name_es, type, country_id);
      }
    });
  }


  blockUnblockState(country_id, name_en, name_es, type, state_id, index) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (type) {
      case 0:
        this.parameter.text = this.constant.title.BLOCK_STATE;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.UNBLOCK_STATE;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
    }

    // const self = this;
    swal({
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addState(country_id, name_en, name_es, type, state_id);
      }
    });
  }


  blockUnblockCity(state_id, name_en, name_es, type, city_id, index) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (type) {
      case 0:
        this.parameter.text = this.constant.title.BLOCK_CITY;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.UNBLOCK_CITY;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
    }

    swal({
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addCity(state_id, name_en, name_es, type, city_id);
      }
    });
  }

}
