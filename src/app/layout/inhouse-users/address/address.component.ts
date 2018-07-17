import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { InhouseUsers } from './../inhouse-users.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  public parameter: IProperty = {};

  @Input('address') address;
  @Input('index') index;

  // @Output() addAddress = new EventEmitter();
  @Output() removeAddress = new EventEmitter();

  constructor(private model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute, private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

  ngOnInit() {
    this.getCountriesNew(0)
  }

  // addRow(){
  //   if(this.address.countries && this.address.states && this.address.cities && this.address.localities){
  //     var obj = {
  //       countries: '',
  //       states : '',
  //       cities: '',
  //       localities: ''
  //     }
  
  //     this.addAddress.emit(obj)
  //   }
  //   else{
  //     this.swal.error({
  //       title: 'Missing fields',
  //       text: 'Complete current row before adding new.',
  //     })
  //   }
  // }


  removeRow(){
    console.log('zzz', this.address)
    this.removeAddress.emit(this.index)
  }

  getCountriesNew(index){

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    let input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.countriesAdd = success.data
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          })
        });
  }

  getStatesNew(country_id, index){

    console.log('staaaa', country_id, index)

    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    let input = new FormData();
    input.append("country_id", country_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.statesAdd = success.data
          this.address.countries = country_id;
          console.log('countri', this.address)
          // if(this.parameter.statesAdd.length != 0){
          //   this.address.countries = country_id;
          //   console.log('countri', this.address)
          // }
        },
        error => {
          console.log(error)
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          })
        });
  }

  getCitiesNew(state_id, index){
    
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    let input = new FormData();
    input.append("state_id", state_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.citiesAdd = success.data
          this.address.states = state_id;
          console.log('zzzzzzz',this.address)
          // if(this.parameter.citiesAdd.length != 0){
          //   this.address.states = state_id;
          //   console.log('zzzzzzz',this.address)
          // }
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


  getLocalitiesNew(city_id, index){

    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    let input = new FormData();
    input.append("city_id", city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.localitiesAdd = success.data;
          this.address.cities = city_id;
          console.log('Localities2',this.address);
          // if(this.parameter.localitiesAdd.length != 0){
          //   this.address.cities = city_id;
          //   console.log('Localities2',this.address);
          // }
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


  setLocality(locality_id, index){
    // this.model.userModel.localities[index] = locality_id;
    this.address.localities = locality_id;
  }
}
