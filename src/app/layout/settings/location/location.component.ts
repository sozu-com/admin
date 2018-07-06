import { Component, OnInit, TemplateRef } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from './location.model';
import { Constant } from './../../common/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  providers: [Location, Constant]
})

export class LocationComponent implements OnInit {
  
  public parameter: IProperty = {};
  public modalRef: BsModalRef;

  constructor(private location: Location, private constant: Constant, private modalService: BsModalService, private admin: AdminService, private router: Router, private swal: SweetAlertService) {   }

  ngOnInit() {
    this.getCountries('');
    // this.getStates();
  }

  public openCountryModal(template: TemplateRef<any>, country_id, name_en, name_es) {
    this.location.countryModel.country_id = country_id;
    this.location.countryModel.name_en = name_en;
    this.location.countryModel.name_es = name_es;
    this.modalRef = this.modalService.show(template);
  }

  public openStateModal(template: TemplateRef<any>, country_id, state_id, name_en, name_es) {
    this.location.stateModel.country_id = country_id;
    this.location.stateModel.state_id = state_id;
    this.location.stateModel.name_en = name_en;
    this.location.stateModel.name_es = name_es;
    this.modalRef = this.modalService.show(template);
  }

  public openCityModal(template: TemplateRef<any>, country_id, state_id, city_id, name_en, name_es) {
    this.location.cityModel.country_id = country_id;
    this.location.cityModel.state_id = state_id;
    this.location.cityModel.city_id = city_id;
    this.location.cityModel.name_en = name_en;
    this.location.cityModel.name_es = name_es;
    this.modalRef = this.modalService.show(template);
  }
  
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }
  
  getCountries(keyword){
    
    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    let input = new FormData();
    
    if(keyword)
      input.append("keyword", keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.countries = success.data
          this.parameter.countryCount = success.data.length;
          if(this.parameter.countries.length!=0){
            this.getStates(this.parameter.countries[0].id);
          }
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) {
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
            this.router.navigate(['']);
          }
          else
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
        });
  }
  
  getStates(country_id){
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';

    let input = new FormData();
    input.append("country_id", country_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states',success)
          this.parameter.loading = false;
          this.parameter.states = success.data
          this.parameter.stateCount = success.data.length;
          if(this.parameter.states.length!=0){
            this.getCities(this.parameter.states[0].id);
          }
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }
  
  getCities(state_id){
    this.parameter.loading = true;
    this.parameter.url = 'getCities';

    let input = new FormData();
    input.append("state_id", state_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log(success)
          this.parameter.loading = false;
          this.parameter.cities = success.data
          this.parameter.cityCount = success.data.length;
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.warning({ 
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
  }

  checkIfCountrySpanishNameEntered(formdata: NgForm){
    let self=this;
    if(formdata.value.name_es == ''){
      console.log('xxx')
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_COUNTRY_NAME,
      }).then(function(){
        formdata.value.name_es = formdata.value.name_en;
        self.addCountry(formdata)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      console.log('zz')
      self.addCountry(formdata);
    }
  }


  addCountry(formdata: NgForm){
    
    this.modalRef.hide();
    this.parameter.loading = true;
    this.parameter.url = 'addCountry';

    let input = new FormData();
    input.append("name_es", formdata.value.name_es);
    input.append("name_en", formdata.value.name_en);
    input.append("status", '1');

    if(this.location.countryModel.country_id)
      input.append("country_id", this.location.countryModel.country_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: this.location.countryModel.country_id ? this.constant.successMsg.COUNTRY_UPDATED_SUCCESSFULLY : this.constant.successMsg.COUNTRY_ADDED_SUCCESSFULLY,
          })
          this.getCountries('');
          formdata.reset();
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) {
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
            this.router.navigate(['']);
          }
          else
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
        });
  }


  checkIfStateSpanishNameEntered(formdata: NgForm){
    let self=this;
    if(formdata.value.name_es == ''){
      console.log('xxx')
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_STATE_NAME,
      }).then(function(){
        formdata.value.name_es = formdata.value.name_en;
        self.addState(formdata)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      console.log('zz')
      self.addState(formdata);
    }
  }


  addState(formdata: NgForm){
    
    this.modalRef.hide();
    this.parameter.loading = true;
    this.parameter.url = 'country/addState';

    let input = new FormData();
    input.append("name_es", formdata.value.name_es);
    input.append("name_en", formdata.value.name_en);
    input.append("status", '1');

    if(this.location.stateModel.country_id)
      input.append("country_id", this.location.stateModel.country_id);  // edit
    else
      input.append("country_id", formdata.value.country_id);  // add

    if(this.location.stateModel.state_id)
      input.append("state_id", this.location.stateModel.state_id);

console.log('==', formdata.value, this.location.stateModel.country_id, this.location.stateModel.state_id)
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: this.location.stateModel.state_id ? this.constant.successMsg.STATE_UPDATED_SUCCESSFULLY : this.constant.successMsg.STATE_ADDED_SUCCESSFULLY,
          })
          this.getStates(this.location.stateModel.country_id);
          formdata.reset();
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) {
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
            this.router.navigate(['']);
          }
          else
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
        });
  }


  checkIfCitySpanishNameEntered(formdata: NgForm){
    let self=this;
    if(formdata.value.name_es == ''){
      console.log('xxx')
      this.swal.confirm({ 
        text: this.constant.errorMsg.SAVE_ENGLISH_CITY_NAME,
      }).then(function(){
        formdata.value.name_es = formdata.value.name_en;
        self.addCity(formdata)
      })
      .catch(function(){
      // console.log('Logout cancelled by user');
      })
    }
    else{
      console.log('zz')
      self.addState(formdata);
    }
  }

  addCity(formdata: NgForm){
    
    this.modalRef.hide();
    this.parameter.loading = true;
    this.parameter.url = 'addCity';
console.log(formdata.value)
    let input = new FormData();
    input.append("state_id", formdata.value.state_id);
    input.append("name_es", formdata.value.name_es);
    input.append("name_en", formdata.value.name_en);
    input.append("status", '1');

    if(this.location.cityModel.country_id)
      input.append("country_id", this.location.cityModel.country_id);

    if(this.location.cityModel.state_id)
      input.append("state_id", this.location.cityModel.state_id);

    if(this.location.cityModel.city_id)
      input.append("city_id", this.location.cityModel.city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: this.location.cityModel.city_id ? this.constant.successMsg.CITY_UPDATED_SUCCESSFULLY : this.constant.successMsg.CITY_ADDED_SUCCESSFULLY,
          })
          this.getCities(this.location.cityModel.state_id);
          formdata.reset();
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) {
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
            this.router.navigate(['']);
          }
          else
            this.swal.warning({ 
              title: 'Error',
              text: error.message,
            })
        });
  }
}
