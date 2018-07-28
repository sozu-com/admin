import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
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

export class AddPropertyComponent implements OnInit, OnChanges {

  public parameter: IProperty = {};
  url: any[];
  tab: number;

  image1;
  image2;
  image3;

  constructor(private model: AddPropertyModel, private admin: AdminService, private swal: SweetAlertService, private router: Router, private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.tab = 1;
    this.getCountries('')
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities()
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', this.model)
  }

  setTab(tab){
    this.tab = tab;
    console.log('zz11111111', this.model);
  }

  ngOnChanges(){
    console.log('zzzzzzzzzzzzzz', this.model);
  }

  getCountries(keyword){

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword)
      input.append('keyword', keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.parameter.countries = success.data;
          // this.parameter.countryCount = success.data.length;
          // if (this.parameter.countries.length != 0){
          //   this.parameter.country_id = this.parameter.countries[0].id;
          //   this.getStates(this.parameter.countries[0].id, '');
          // }
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode == 401) {
            this.swal.warning({
              title: 'Error',
              text: error.message,
            });
            this.router.navigate(['']);
          }
          else
            this.swal.warning({
              title: 'Error',
              text: error.message,
            });
        });
  }

  getStates(country_id, keyword){
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.model.country_id = country_id
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';
    
    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword)
      input.append('keyword', keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states', success);
          this.parameter.loading = false;
          this.parameter.states = success.data;
          // this.parameter.stateCount = success.data.length;
          // if (this.parameter.states.length){
          //   this.parameter.state_id = this.parameter.states[0].id;
          //   this.getCities(this.parameter.states[0].id, '');
          // }
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }

  getCities(state_id, keyword){
    console.log('mm', state_id, keyword);
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.model.state_id = state_id
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('state_id', state_id);

    if (keyword)
      input.append('keyword', keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('cities', success);
          this.parameter.loading = false;
          this.parameter.cities = success.data;
          // this.parameter.cityCount = success.data.length;
          // if (this.parameter.cities.length){
          //   this.parameter.city_id = this.parameter.cities[0].id;
          //   console.log('cityid', this.parameter.city_id);
          //   this.getLocalities(this.parameter.city_id, '');
          // }
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }


  getLocalities(city_id, keyword= ''){
    console.log('mm', city_id, keyword);
    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword)
    input.append('keyword', keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('Localities', success);
          this.parameter.loading = false;
          this.parameter.localities = success.data;
          // this.parameter.localityCount = success.data.length;
          // if(this.parameter.localities.length != 0)
          //   this.parameter.locality_id = this.parameter.localities[0].id;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }

  setLocality(locality_id){
    this.model.locality_id = locality_id;
  }

  setConfiguration(id){
    this.model.configuration_id = id;
    console.log(id, this.model)
  }

  setPropertyType(id){
    this.model.property_type_id = id;
    console.log('zz', this.model)
  }

  setAmenity(id){
    this.model.amenities = [id];
    console.log('amenity', this.model.amenities)
  }

  getConfigurations(){
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
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }


  getPropertyTypes(){
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
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }

  getAmenities(){
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
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }

  onSelectFile1(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.url = event.target.result;
          this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      }

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.newPostDataApi('http://45.232.252.136/api/data-collector/saveImage', input)
      .subscribe(
        success => {
          console.log('successimage',success)
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
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.url = event.target.result;
          this.image2 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      }

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.newPostDataApi('http://45.232.252.136/api/data-collector/saveImage', input)
      .subscribe(
        success => {
          console.log('successimage',success)
          this.model.images = success.data.image;
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
      var reader = new FileReader();

      reader.onload = (event:any) => {
          this.url = event.target.result;
          this.image3 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      }

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.newPostDataApi('http://45.232.252.136/api/data-collector/saveImage', input)
      .subscribe(
        success => {
          console.log('successimage',success)
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


  addProperty(formdata: NgForm, tab){
    console.log('formdata', formdata)
    console.log('api', this.model)
    this.tab = tab;
    this.parameter.loading = true;
    this.parameter.url = this.model.id != '' ? 'addProperty' : 'addProperty';
    
    const input = new FormData();
    // input.append('property_id', '241');242
    if(this.parameter.property_id)
      input.append('property_id', this.parameter.property_id);

    input.append('step', this.tab.toString());
    if(this.tab == 1){
      input.append('for_rent', this.model.for_rent == true ? '1' : '0');
      input.append('for_sale', this.model.for_sale == true ? '1' : '0');
      input.append('country_id', this.model.country_id);
      input.append('state_id', this.model.state_id);
      input.append('city_id', this.model.city_id);
      input.append('locality_id', this.model.locality_id);
      input.append('configuration_id', this.model.configuration_id);
      input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
      input.append('property_type_id', this.model.property_type_id);  
    }

    if(this.tab == 2){
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

    if(this.tab == 3){
      input.append('pets', this.model.pets);
      input.append('marital_status', this.model.marital_status);
    }

    if(this.tab == 4){
      input.append('custom_attributes', JSON.stringify(this.model.carpet_areas));
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.property_id = success.data.id;
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
  }
}
