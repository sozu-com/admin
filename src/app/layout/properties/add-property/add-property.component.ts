import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
import { SweetAlertService } from 'ngx-sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { AddPropertyModel } from './../../../models/addProperty.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [AddPropertyModel]
})

export class AddPropertyComponent implements OnInit {

  public parameter: IProperty = {};
  url: any[];
  tab: number;
  selectedGuest;
  image1;
  image2;
  image3;
  showBuilding = false;
  amenityList = [];
  amen = '';
  bankList = [];
  bank = '';
  testMarital = [];

  constructor(private model: AddPropertyModel, private admin: AdminService, private swal: SweetAlertService,
    private router: Router, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.parameter.buildingCount = 0;
    this.testMarital = [
      {id: 1,
      name: 'Married',
      checked: ''},
      {id: 2,
      name: 'Unmarried',
      checked: ''},
      {id: 3,
      name: 'Divorced',
      checked: ''}
    ];
    this.model.marital_status = [1];

    this.tab = 1;
    this.getCountries('');
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities();
    this.getBanks();
  }

  setTab(tab) {
    this.tab = tab;
  }

  getCountries(keyword) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.parameter.countries = success.data;
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.swal.warning({
              title: 'Error',
              text: error.message,
            });
            this.router.navigate(['']);
          }else {
            this.swal.warning({ title: 'Error', text: error.message });
          }
        });
  }

  getStates(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states', success);
          this.parameter.loading = false;
          this.parameter.states = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.warning({
              text: error.messages,
            });
          }
        });
  }

  getCities(state_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('state_id', state_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('cities', success);
          this.parameter.loading = false;
          this.parameter.cities = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              text: error.messages,
            });
          }
        });
  }


  getLocalities(city_id, keyword= '') {
    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('Localities', success);
          this.parameter.loading = false;
          this.parameter.localities = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
  }

  setLocality(locality_id) {
    this.model.locality_id = locality_id;
  }

  setConfiguration(id) {
    this.model.configuration_id = id;
  }

  setPropertyType(id) {
    this.model.property_type_id = id;
  }

  setAmenity(id) {
    this.model.amenities = [id];
  }

  getConfigurations() {
    this.parameter.loading = true;
    this.parameter.url = 'getConfigurations';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getConfigurations', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
  }


  getPropertyTypes() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyTypes', success);
          this.parameter.loading = false;
          this.parameter.propertyTypes = success.data;
          this.parameter.propertyTypesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              text: error.messages,
            });
          }
        });
  }

  getAmenities() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyAmenities', success);
          this.parameter.loading = false;
          this.parameter.amenities = success.data;
          this.parameter.amenitiesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              text: error.messages,
            });
          }
        });
  }

  addAmenity(a) {
    const tt = this.getSelectedAmenityByName(a);
    if (tt) {
      this.amenityList.push(tt);
      this.model.amenities.push(tt.id);
    }
    this.amen = '';
  }

  getSelectedAmenityByName(selectedName: string) {
    const r = this.amenityList.find(amenity => amenity.name_en === selectedName);
    if (r) {
      return '';
    }else {
      return this.parameter.amenities.find(amenity => amenity.name_en === selectedName);
    }
  }

  removeAmenity(index) {
    this.model.amenities.splice(index, 1);
    this.amenityList.splice(index, 1);
  }


  getBanks() {
    this.parameter.loading = true;
    this.parameter.url = 'getBanks';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBanks', success);
          this.parameter.loading = false;
          this.parameter.banks = success.data;
          this.parameter.bankCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              text: error.messages,
            });
          }
        });
  }

  addBank(a) {
    const tt = this.getSelectedBankByName(a);
    if (tt) {
      this.bankList.push(tt);
      this.model.banks.push(tt.id);
    }
    this.bank = '';
  }

  getSelectedBankByName(selectedName: string) {
    const r = this.bankList.find(bank => bank.name === selectedName);
    if (r) {
      return '';
    }else {
      return this.parameter.banks.find(bank => bank.name === selectedName);
    }
  }

  removeBank(index) {
    this.model.banks.splice(index, 1);
    this.bankList.splice(index, 1);
  }

  searchBuilding(keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'searchBuilding';
    const input = new FormData();
    input.append('keyword', keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('searchBuilding', success);
          this.parameter.loading = false;
          this.parameter.buildings = success.data;
          this.parameter.buildingCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            this.swal.warning({
              text: error.messages,
            });
          }
        });
  }

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
  }

  onSelectFile1(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      };

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage', success);
          this.model.cover_image = success.data.image;
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
        });

      // this.model.cover_image = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSelectFile2(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.image2 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      };

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage', success);
          this.model.images.push(success.data.image);
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
        });

      // this.model.images = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  onSelectFile3(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.image3 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      };

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage', success);
          this.model.floor_plan = success.data.image;
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
        });

      // this.model.images = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addMaritalStatus(id, i) {
    this.testMarital[i].checked = this.testMarital[i].checked === '' ? 'checked' : '';
  }

  addProperty(formdata: NgForm, tab) {
    console.log('formdata', formdata);
    console.log('api', this.model);
    this.tab = tab;

    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === 'checked') {
        const r = this.model.marital_status.indexOf(this.testMarital[index]);
        if (r === -1) { this.model.marital_status.push(this.testMarital[index].id); }
      }
    }
    this.parameter.loading = true;
    this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
    this.model.step = tab - 1;
    const input = new FormData();
    // input.append('property_id', '31');
    if (this.parameter.property_id) {input.append('property_id', this.parameter.property_id); }

    input.append('step', this.model.step.toString());
    if (this.model.step === 1) {
      input.append('for_rent', this.model.for_rent === true ? '1' : '0');
      input.append('for_sale', this.model.for_sale === true ? '1' : '0');
      input.append('country_id', this.model.country_id);
      input.append('state_id', this.model.state_id);
      input.append('city_id', this.model.city_id);
      input.append('locality_id', this.model.locality_id);
      input.append('configuration_id', this.model.configuration_id);
      input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
      input.append('property_type_id', this.model.property_type_id);
    }

    if (this.model.step === 2) {
      input.append('cover_image', this.model.cover_image);
      input.append('images', JSON.stringify([this.model.images]));
      input.append('floor_plan', this.model.floor_plan);
      input.append('bedroom', this.model.bedroom);
      input.append('bathroom', this.model.bathroom);
      input.append('floor', this.model.floor);
      input.append('parking', this.model.parking);
      input.append('furnished', this.model.furnished);
      input.append('description', this.model.description);
      input.append('quantity', this.model.quantity);
      input.append('amenities', JSON.stringify(this.model.amenities));
      input.append('banks', JSON.stringify(this.model.banks));
    }

    if (this.model.step === 3) {
      input.append('pets', this.model.pets);
      input.append('marital_status', JSON.stringify(this.model.marital_status));
    }

    if (this.model.step === 4) {
      input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
    }



    this.parameter.loading = false;
    // this.admin.postDataApi(this.parameter.url, input)
    //   .subscribe(
    //     success => {
    //       console.log('success', success);
    //       this.parameter.property_id = success.data.id;
    //       this.parameter.loading = false;
    //     },
    //     error => {
    //       this.parameter.loading = false;
    //       this.swal.error({
    //         title: 'Error',
    //         text: error.message,
    //       });
    //     });
  }

  setBuildingId(building_id) {
    this.parameter.building_id = building_id;
  }

  tagBuilding() {

    this.parameter.loading = true;
    this.parameter.url = 'tagBuilding';

    const input = new FormData();
    if (this.parameter.property_id) {input.append('property_id', this.parameter.property_id); }
    input.append('building_id', this.parameter.building_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('tagBuilding', success);
          this.parameter.loading = false;
        },
        error => {
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
        });
  }
}
