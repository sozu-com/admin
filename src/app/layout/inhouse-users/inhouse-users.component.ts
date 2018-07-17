import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../common/property';
import { InhouseUsers } from './inhouse-users.model';

@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css'],
  providers: [InhouseUsers]
})

export class InhouseUsersComponent implements OnInit {
  
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;
  addressIndex: number = 0;

  constructor(private model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute, private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

  ngOnInit() {
    this.parameter.routeName = this.router.url;
    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.userType = params['userType'];
      console.log(this.parameter.userType)
      this.getCountries('view');
      this.getCountriesNew(0);
      this.getInhouseUsers();
      this.initialCountry = {initialCountry: 'in'}
    });
  }

  // addEmptyObj(obj){
  //   var obj1 = {
  //     countries: '',
  //     states : '',
  //     cities: '',
  //     localities: ''
  //   }

  //   this.model.address.push(obj1)
  //   console.log('address', this.model.address)
  // }

  removeAddressObj(index){
    console.log('index', index)
    this.model.address.splice(index, 1)
  }

  addEmptyObj(){
    console.log('xxxxxxxxxxxxxx', this.model.address);
    if(this.model.address[this.addressIndex].countries && this.model.address[this.addressIndex].states && this.model.address[this.addressIndex].cities && this.model.address[this.addressIndex].localities){
      var obj = {
        countries: '',
        states : '',
        cities: '',
        localities: ''
      }
      this.addressIndex++;
      this.model.address.push(obj)
    }
    else{
      this.swal.error({
        title: 'Missing fields',
        text: 'Complete current row before adding new.',
      })
    }
  }

  public openUserModal(template: TemplateRef<any>) {
    console.log('zz', template);
    // this.project.possession.id = id;
    // this.project.possession.name_en = name_en;
    // this.project.possession.name_es = name_es==null? name_en : name_es;
    // this.project.possession.status = status;
    // this.modalRef = this.modalService.show(template);
  }

  onCountryChange(e){
    this.parameter.countryCode = e.iso2;
    this.parameter.dialCode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2}
  }
  
  openAddModal(){
    this.modalOpen.nativeElement.click();
  }


  changeListner(event) {
    var reader = new FileReader();
    
    var image = this.element.nativeElement.querySelector('.image');

    var fileToUpload = event.target.files[0];
    this.parameter.icon = fileToUpload;

    reader.onload = function(e) {
      console.log(image)
      var src = e.target['result'];
        image.src = src;
        console.log(image.src)
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  checkIfLocalitySpanishNameEntered(){

  }

  getCountries(type){

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    let input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;

          if(type == 'view'){
            console.log('countries1',success)
            this.parameter.countries = success.data
            this.parameter.countryCount = success.data.length;
            if(this.parameter.countryCount != 0){
              this.parameter.country_id = this.parameter.countries[0].id;
              this.getStates(this.parameter.country_id, type);
            }
          }
          else{
            console.log('countries2',success)
            this.parameter.countriesAdd = success.data
            this.parameter.countryCountAdd = success.data.length;
            if(this.parameter.countryCountAdd != 0){
              this.model.userModel.countries.push(this.parameter.countriesAdd[0].id);
              console.log(this.model.userModel.countries)
              this.parameter.country_idAdd = this.parameter.countriesAdd[0].id;
              this.getStates(this.parameter.country_idAdd, type);
            }
          }
        },
        error => {
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          })
        });
  }

  getStates(country_id, type){
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    let input = new FormData();
    input.append("country_id", country_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;

          if(type == 'view'){
            console.log('states1',success)
            this.parameter.states = success.data
            this.parameter.stateCount = success.data.length;
            if(this.parameter.stateCount != 0){
              this.parameter.state_id = this.parameter.states[0].id;
              this.getCities(this.parameter.state_id, type);
            }
          }
          else{
            console.log('states2',success)
            this.parameter.statesAdd = success.data
            this.parameter.stateCountAdd = success.data.length;
            if(this.parameter.stateCountAdd != 0){
              this.parameter.state_idAdd = this.parameter.statesAdd[0].id;
              this.getCities(this.parameter.state_idAdd, type);
            }
          }          
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

  getCities(state_id, type){
    
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    let input = new FormData();
    input.append("state_id", state_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          
          if(type == 'view'){
            console.log('cities1',success)
            this.parameter.cities = success.data
            this.parameter.cityCount = success.data.length;
            if(this.parameter.cityCount != 0){
              this.parameter.city_id = this.parameter.cities[0].id;
              this.getLocalities(this.parameter.city_id, 'view');
            }
          }
          else{
            console.log('cities2',success)
            this.parameter.citiesAdd = success.data
            this.parameter.cityCountAdd = success.data.length;
            if(this.parameter.cityCountAdd != 0){
              this.parameter.city_idAdd = this.parameter.citiesAdd[0].id;
              this.getLocalities(this.parameter.city_idAdd, type);
            }
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


  getLocalities(city_id, type){

    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    let input = new FormData();
    input.append("city_id", city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;

          if(type == 'view'){
            console.log('Localities1',success);
            this.parameter.localities = success.data;
            this.parameter.localityCount = success.data.length;
            if(success.data.length!=0)
              this.parameter.locality_id = success.data[0].id;
          }
          else{
            console.log('Localities2',success);
            this.parameter.localitiesAdd = success.data;
            this.parameter.localityCountAdd = success.data.length;
            if(this.parameter.localityCountAdd != 0)
              this.parameter.locality_idAdd = success.data[0].id;
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


  getInhouseUsers(){
    this.parameter.loading = true;

    switch (this.parameter.userType) {
      case 'data-collectors':
      this.parameter.url = 'getDataCollectors';    
        break;
      case 'csr-sellers':
      this.parameter.url = 'getCsrSellers';    
        break;
      
      case 'csr-buyers':
      this.parameter.url = 'getCsrBuyers';    
        break;
    
      case 'inhouse-broker':
      this.parameter.url = 'getInhouseBroker';    
        break;

      case 'csr-closers':
      this.parameter.url = 'getCsrClosers';    
        break;

      default:
      this.parameter.url = 'getDataCollectors';
        break;
    }

    this.parameter.url = 'getInhouseBroker';
    let input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getInhouseBroker',success)
          this.parameter.loading = false;
          this.parameter.items = success.data
          this.parameter.total = success.data.length;
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






  addRow(){
    let obj = {
      countries: '',
      states : '',
      cities: '',
      localities: ''
    }

    this.model.address.push(obj);

    // this.model.userModel.countries.push(this.parameter.country_id);
    // this.model.userModel.states.push(this.parameter.state_id)
    // this.model.userModel.cities.push(this.parameter.city_id)
    // this.model.userModel.localities.push(this.parameter.locality_id)
  }


  getCountriesNew(index){

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    let input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;

          console.log('countries2',success)
          this.parameter.countriesAdd = success.data
          this.parameter.countryCountAdd = success.data.length;
          
          // let obj = {
          //   countries: this.parameter.countriesAdd[index].id,
          //   states: '',
          //   cities: '',
          //   localities: ''
          // }
          // this.address.push(obj);

          // this.model.userModel.countries.push(this.parameter.countriesAdd[index].id);

          // if(this.parameter.countryCountAdd != 0){
          //   this.model.userModel.countries.push(this.parameter.countriesAdd[index].id);
          //   console.log(this.model.userModel.countries)
          //   this.parameter.country_idAdd = this.parameter.countriesAdd[index].id;
          //   this.getStates(this.parameter.country_idAdd, index);
          // }
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

          // this.model.userModel.countries[index] = country_id;
          this.model.address[index].countries = country_id;

          console.log('states2',success)
          this.parameter.statesAdd = success.data
          this.parameter.stateCountAdd = success.data.length;
          // if(this.parameter.stateCountAdd != 0){
          //   this.parameter.state_idAdd = this.parameter.statesAdd[index].id;
          //   this.getCities(this.parameter.state_idAdd, index);
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

          // this.model.userModel.states[index] = state_id;
          this.model.address[index].states = state_id;
          
          console.log('cities2',success)
          this.parameter.citiesAdd = success.data
          this.parameter.cityCountAdd = success.data.length;
          // if(this.parameter.cityCountAdd != 0){
          //   this.parameter.city_idAdd = this.parameter.citiesAdd[index].id;
          //   this.getLocalities(this.parameter.city_idAdd, index);
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

          // this.model.userModel.cities[index] = city_id;
          this.model.address[index].cities = city_id;

          console.log('Localities2',success);
          this.parameter.localitiesAdd = success.data;
          this.parameter.localityCountAdd = success.data.length;

          // if(this.parameter.localityCountAdd != 0)
          //   this.parameter.locality_idAdd = success.data[0].id;
            
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
    this.model.address[index].localities = locality_id;
  }
}
