import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { InhouseUsers } from './../../models/inhouse-users.model';
import { NgForm } from '@angular/forms';

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
      console.log('zz',this.parameter.userType)
      this.getCountries('view');
      // this.getInhouseUsers();
      this.initialCountry = {initialCountry: 'mx'}
    });

  }

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
    console.log(e)
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

    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;

    reader.onload = function(e) {
      console.log(image)
      var src = e.target['result'];
        image.src = src;
        console.log(image.src)
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  addNewUser(formdata: NgForm){
    console.log('zzzz', formdata, this.model.address, this.parameter.image)
    console.log('countrycode','+'+this.model.userModel.country_code)
    this.parameter.loading = true;
    this.parameter.url = 'addNewUser';

    let input = new FormData();
    input.append("name", formdata.value.name);
    input.append("country_code", '+'+this.model.userModel.country_code);
    input.append("phone", formdata.value.phone);
    input.append("image", this.parameter.image);
    input.append("email", formdata.value.email);
    input.append("address", JSON.stringify(this.model.address));
    input.append("is_broker_seller_dev", formdata.value.is_broker_seller_dev == true ? '1' : '0');
    input.append("is_buyer_renter", formdata.value.is_buyer_renter == true ? '1' : '0');
    input.append("is_broker", formdata.value.is_broker == true ? '1' : '0');
    input.append("is_data_collector", formdata.value.is_data_collector == true ? '1' : '0');
    input.append("is_csr_closer", formdata.value.is_csr_closer == true ? '1' : '0');

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          if(success.success==0){
            this.swal.error({
              title: 'Error',
              text: success.message
            })
          }
          else{
            this.modalClose.nativeElement.click();
            formdata.reset();
          }
          console.log('success',success)    
        },
        error => {
          console.log('error',error)
          this.parameter.loading = false;
          this.swal.warning({
            title: 'Error',
            text: error.message,
          })
        });
  }

  editUser(userdata){
    console.log('userdata', userdata)
    this.modalOpen.nativeElement.click();
  }

  getCountries(type){

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    let input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.countries = success.data
          this.parameter.countryCount = success.data.length;
          if(this.parameter.countryCount != 0){
            this.parameter.country_id = this.parameter.countries[0].id;
            this.getStates(this.parameter.country_id, type);
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
          console.log('states1',success)
          this.parameter.states = success.data
          this.parameter.stateCount = success.data.length;
          if(this.parameter.stateCount != 0){
            this.parameter.state_id = this.parameter.states[0].id;
            this.getCities(this.parameter.state_id, type);
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
          console.log('cities1',success)
          this.parameter.cities = success.data
          this.parameter.cityCount = success.data.length;
          if(this.parameter.cityCount != 0){
            this.parameter.city_id = this.parameter.cities[0].id;
            this.getLocalities(this.parameter.city_id, 'view');
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
          console.log('Localities1',success);
          this.parameter.localities = success.data;
          this.parameter.localityCount = success.data.length;
          this.getInhouseUsers()
          if(success.data.length!=0)
            this.parameter.locality_id = success.data[0].id;
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
console.log('this.parameter.userType',this.parameter.userType)
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
  }
}
