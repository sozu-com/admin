import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { IProperty } from '../../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from './../../../models/location.model';
import { Constant } from './../../../common/constants';
import { NgxSpinnerService } from 'ngx-spinner';
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

  searchCountry: string;
  searchState: string;
  searchCity: string;

  constructor(private location: Location, private constant: Constant,
    private modalService: BsModalService, public admin: AdminService, private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.searchCountry = ''; this.searchState = ''; this.searchCity = '';
    this.getCountries(this.searchCountry, '');
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

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }


  // used for country listing and country search
  getCountries(keyword, keyname) {
    const input = new FormData();
    if (keyword) { input.append('keyword', keyword); }
    this.admin.postDataApi('getCountries', input)
      .subscribe(
        success => {
          if (keyname === '') {
            this.parameter.countries1 = success.data.reverse();
            this.parameter.countries2 = success.data.reverse();
            this.parameter.countries3 = success.data.reverse();
            this.parameter.countries4 = success.data.reverse();
            this.parameter.countries5 = success.data.reverse();
            this.getStates(this.parameter.countries2[0].id, '', '');
          } else if (keyname === 1) {
            this.parameter.countries1 = success.data.reverse();
          } else if (keyname === 2) {
            this.parameter.countries2 = success.data.reverse();
            if (this.parameter.countries2.length > 0) {
              // this.getStates(this.parameter.countries2[0].id, '', '1');
            }
          } else if (keyname === 3) {
            this.parameter.countries3 = success.data.reverse();
          } else if (keyname === 4) {
            this.parameter.countries4 = success.data.reverse();
          } else if (keyname === 5) {
            this.parameter.countries5 = success.data.reverse();
          }
        }, error => {
          // this.spinner.hide();
        });
  }

  // used on click of country -- city
  getStates(country_id, keyword, keyname) {
    this.parameter.country_id = country_id;

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi('country/getStates', input)
      .subscribe(
        success => {
          if (keyname === '') {
            this.parameter.country_id1 = country_id;
            this.parameter.country_id2 = country_id;
            this.parameter.states1 = success.data.reverse();
            this.parameter.states2 = success.data.reverse();
            this.parameter.states3 = success.data.reverse();
            this.getCities(this.parameter.states1[0].id, '', '');
          } else if (keyname === 1) {
            this.parameter.country_id1 = country_id;
            this.parameter.states1 = success.data.reverse();
            // this.getCities(this.parameter.states1[0].id, '', '1');
          } else if (keyname === 2) {
            this.parameter.country_id2 = country_id;
            this.parameter.states2 = success.data.reverse();
            if (this.parameter.states2.length > 0) {
              this.getCities(this.parameter.states2[0].id, '', 1);
            } else {
              this.parameter.cities1 = [];
            }
          } else if (keyname === 3) {
            this.parameter.states3 = success.data.reverse();
          }
          // if (this.parameter.states1.length !== 0) {
          //   this.parameter.state_id = this.parameter.states1[0].id;
          //   this.getCities(this.parameter.states1[0].id, '', '1');
          // }else { this.parameter.cities = []; }
        });
  }


  getCities(state_id, keyword, keyname) {
    this.parameter.state_id = state_id;
    this.searchCity = keyword;
    const input = new FormData();
    input.append('state_id', state_id);
    if (keyword) { input.append('keyword', keyword); }
    this.admin.postDataApi('getCities', input)
      .subscribe(
        success => {
          // this.parameter.cities = success.data.reverse();
          if (keyname === '') {
            this.parameter.state_id1 = state_id;
            this.parameter.cities1 = success.data.reverse();
            this.parameter.cities2 = success.data.reverse();
          } else if (keyname === 1) {
            this.parameter.state_id1 = state_id;
            this.parameter.cities1 = success.data.reverse();
          } else if (keyname === 2) {
            this.parameter.cities2 = success.data.reverse();
          }
        }, error => {
          // this.spinner.hide();
        });
  }


  checkIfCountrySpanishNameEntered(name_en, name_es = '') {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addCountry(name_en, name_en, self.location.countryModel.status, '');
        }
      });
    } else {
      self.addCountry(name_en, name_es, self.location.countryModel.status, '');
    }
  }


  addCountry(name_en: string, name_es: string, status, country_id) {
    if (country_id === '') { this.modalRef.hide(); }    // hide only when open

    const input = new FormData();
    input.append('name_es', name_es);
    input.append('name_en', name_en);
    input.append('status', status);

    if (this.location.countryModel.country_id) {
      input.append('country_id', this.location.countryModel.country_id);
    } else if (country_id) {
      input.append('country_id', country_id);
    }

    this.admin.postDataApi('addCountry', input)
      .subscribe(
        success => {
          const text = this.location.countryModel.country_id || country_id ?
            this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.getCountries('', '');
          // this.getAllCountries('', 'added-country');   // loading dropdown


          // if (this.parameter.index === -1) {
          //   this.parameter.countries1.push(success.data);
          // }else {
          //   this.parameter.countries1[this.parameter.index] = success.data;
          // }
        });
  }


  checkIfStateSpanishNameEntered(country_id, name_en, name_es = '') {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_STATE_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addState(country_id, name_en, name_en, self.location.stateModel.status, '');
        }
      });
    } else {
      self.addState(country_id, name_en, name_es, self.location.stateModel.status, '');
    }
  }


  addState(country_id, name_en, name_es, status, state_id) {

    if (state_id === '') { this.modalRef.hide(); }

    const input = new FormData();
    input.append('name_es', name_es);
    input.append('name_en', name_en);
    input.append('status', status);

    if (this.location.stateModel.country_id) {
      input.append('country_id', this.location.stateModel.country_id);  // edit
    } else {
      input.append('country_id', country_id);  // add
    }

    if (this.location.stateModel.state_id) {
      input.append('state_id', this.location.stateModel.state_id);
    } else if (state_id) {
      input.append('state_id', state_id);
    }

    this.admin.postDataApi('country/addState', input)
      .subscribe(
        success => {
          const text = this.location.stateModel.state_id || state_id ?
            this.constant.successMsg.STATE_UPDATED_SUCCESSFULLY :
            this.constant.successMsg.STATE_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.getStates(this.parameter.country_id1, '', 1);
          this.getStates(this.parameter.country_id2, '', 2);
          // this.getStatesWRTCountry(this.parameter.country_id, '');
          // if (this.parameter.index === -1) {
          //   this.parameter.states.push(success.data);
          // }else {
          //   this.parameter.states[this.parameter.index] = success.data;
          // }
        });
  }


  checkIfCitySpanishNameEntered(state_id, name_en, name_es = '') {
    const self = this;
    if (name_es === '') {
      swal({
        text: this.constant.errorMsg.SAVE_ENGLISH_CITY_NAME,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: this.constant.confirmButtonColor,
        cancelButtonColor: this.constant.cancelButtonColor,
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          this.addCity(state_id, name_en, name_en, self.location.cityModel.status, '');
        }
      });
    } else {
      self.addCity(state_id, name_en, name_es, self.location.cityModel.status, '');
    }
  }


  addCity(state_id, name_en, name_es, status, city_id) {
    if (city_id === '') { this.modalRef.hide(); }
    const input = new FormData();
    input.append('name_es', name_es);
    input.append('name_en', name_en);
    input.append('status', status);

    if (this.location.cityModel.state_id) {
      input.append('state_id', this.location.cityModel.state_id);   // edit
    } else {
      input.append('state_id', state_id);   // add
    }

    if (this.location.cityModel.city_id) {
      input.append('city_id', this.location.cityModel.city_id);   // edit
    } else if (city_id) {
      input.append('city_id', city_id);   // edit
    }

    this.admin.postDataApi('addCity', input)
      .subscribe(
        success => {
          const text = this.location.cityModel.city_id || city_id ?
            this.constant.successMsg.CITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.CITY_ADDED_SUCCESSFULLY;
          swal('Success', text, 'success');
          this.getCities(this.parameter.state_id1, '', 1);

          // if (this.parameter.index === -1) {
          //   this.parameter.cities.push(success.data);
          // }else {
          //   this.parameter.cities[this.parameter.index] = success.data;
          // }
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
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
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
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
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
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.addCity(state_id, name_en, name_es, type, city_id);
      }
    });
  }

}
