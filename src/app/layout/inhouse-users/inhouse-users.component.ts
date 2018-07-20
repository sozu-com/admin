import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { InhouseUsers, user, address } from './../../models/inhouse-users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';

@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css'],
  providers: [InhouseUsers, Constant, user, address]
})

export class InhouseUsersComponent implements OnInit {
  
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;
  addressIndex: number = 0;
  tempAdd: Object;

  constructor(private constant: Constant, private address:address, private user:user, private model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute, private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.routeName = this.router.url;

    this.tempAdd = this.model.address;

    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.userType = params['userType'];
      this.getInhouseUsers();
      this.getCountries('view');
      this.initialCountry = {initialCountry: 'mx'}
    });
  }

  getPage(page){
    this.parameter.p = page;
    this.getInhouseUsers();
  }

  removeAddressObj(index){
    this.model.address.splice(index, 1)
  }

  addEmptyObj(){
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


  onCountryChange(e){
    this.model.userModel.country_code = e.iso2;
    this.initialCountry = {initialCountry: e.iso2}
  }
  
  openAddModal(){
    // console.log('zzzzzzzzzzzzzzzzzzzzzz')
    // this.model.userModel = new user();
    // console.log('---------------', this.model.userModel)
    // this.model.address = new address();
    this.modalOpen.nativeElement.click();
  }


  changeListner(event) {

    var reader = new FileReader();
    
    var image = this.element.nativeElement.querySelector('.image');

    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;

    reader.onload = function(e) {
      var src = e.target['result'];
        image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  addNewUser(formdata: NgForm){
    this.parameter.loading = true;
    this.parameter.url = 'addNewUser';
// console.log('add newuser params', formdata, JSON.stringify(this.model.address), '+'+this.model.userModel.country_code)
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
          // console.log('user add',success)    
        },
        error => {
          // console.log('error',error)
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          })
        });
  }

  editUser(userdata){
    // console.log('edit user', userdata)
    this.modalOpen.nativeElement.click();
    this.model.userModel.name = userdata.name;
    this.model.userModel.email = userdata.email;
    this.model.userModel.phone = userdata.phone;
    this.model.userModel.country_code = userdata.country_code;
    this.model.userModel.image = userdata.image;
    this.model.userModel.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller == 1 ? true : false;
    this.model.userModel.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer == 1 ? true : true;
    this.model.userModel.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker == 1 ? true : true;
    this.model.userModel.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector == 1 ? true : false;
    this.model.userModel.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer == 1 ? true : true;
    
    userdata.countries = ['19','19']
    userdata.states = ['4','4']
    userdata.cities = ['4','4']
    userdata.localities = ['3','4']

    for (let ind = 0; ind < 2; ind++) {
      
      var tempAdd = {
        countries: userdata.countries[ind],
        states: userdata.states[ind],
        cities: userdata.cities[ind],
        localities: userdata.localities[ind]
      }

      this.model.address[ind] = tempAdd;
    }

    // console.log('usermodel', this.model.userModel)
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
            // this.getStates(this.parameter.country_id, type);
          }
        },
        error => {
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          })
        });
  }


  getStates(country_id, type){
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    if(country_id == -1){
      this.parameter.states = [];
      this.parameter.stateCount = 0;
      this.parameter.state_id = '-1';
      this.parameter.loading = false;
    }
    else{
      let input = new FormData();
      input.append("country_id", country_id);
  
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            this.parameter.states = success.data
            this.parameter.stateCount = success.data.length;
            if(this.parameter.stateCount != 0){
              this.parameter.state_id = this.parameter.states[0].id;
              // this.getCities(this.parameter.state_id, type);
            }          
          },
          error => {
            this.parameter.loading = false;
            this.swal.error({
              title: 'Error',
              text: error.message,
            })
          });
    }
  }

  getCities(state_id, type){
    
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    if(state_id == -1){
      this.parameter.cities = [];
      this.parameter.cityCount = 0;
      this.parameter.city_id = '-1';
      this.parameter.loading = false;
    }
    else{
      let input = new FormData();
      input.append("state_id", state_id);
  
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            // console.log('cities1',success)
            this.parameter.cities = success.data
            this.parameter.cityCount = success.data.length;
            if(this.parameter.cityCount != 0){
              this.parameter.city_id = this.parameter.cities[0].id;
              // this.getLocalities(this.parameter.city_id, 'view');
            }
          },
          error => {
            // console.log(error)
            this.parameter.loading = false;
            if(error.statusCode==401) this.router.navigate(['']);
            else
              this.swal.error({
                // title: 'Internet Connection',
                text: error.messages,
              })
          });
    }
  }


  getLocalities(city_id, type){

    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    if(city_id == -1){
      this.parameter.localities = [];
      this.parameter.localityCount = 0;
      this.parameter.locality_id = '-1';
      this.parameter.loading = false;
    }
    else{

    let input = new FormData();
    input.append("city_id", city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          // console.log('Localities1',success);
          this.parameter.localities = success.data;
          this.parameter.localityCount = success.data.length;
          if(success.data.length!=0)
            this.parameter.locality_id = success.data[0].id;
          this.getInhouseUsers()
        },
        error => {
          // console.log(error)
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.error({
              // title: 'Internet Connection',
              text: error.messages,
            })
        });
    }
  }

  searchUserByName(name){
    this.parameter.name = name;
    this.getInhouseUsers();
  }
  searchUserByEmail(email){
    this.parameter.email = email;
    this.getInhouseUsers();
  }
  searchUserByPhone(phone){
    this.parameter.phone = phone;
    this.getInhouseUsers();
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

    let input = new FormData();
      input.append("page", this.parameter.p.toString());

    if(this.parameter.name)
      input.append("name", this.parameter.name);

    if(this.parameter.email)
      input.append("email", this.parameter.email);
    
    if(this.parameter.phone)
      input.append("phone", this.parameter.phone);

    if(this.parameter.country_id)
      input.append("countries", JSON.stringify([this.parameter.country_id]));

    if(this.parameter.state_id)
      input.append("states", JSON.stringify([this.parameter.state_id]));
    
    if(this.parameter.city_id)
      input.append("cities", JSON.stringify([this.parameter.city_id]));
    
    if(this.parameter.locality_id)
      input.append("localities", JSON.stringify[this.parameter.locality_id]);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else
            this.swal.error({ 
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
