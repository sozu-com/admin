import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { InhouseUsers, User, Address } from './../../models/inhouse-users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css'],
  providers: [InhouseUsers, Constant, User, Address]
})

export class InhouseUsersComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;
  addressIndex = 0;
  tempAdd: Object;
  url: any[];
  image1: any;

  constructor(private constant: Constant, private address: Address, private user: User,
    private model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute,
    private admin: AdminService, private router: Router, private swal: SweetAlertService,
    private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.routeName = this.router.url;

    this.tempAdd = this.model.address;

    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.userType = params['userType'];
      this.getInhouseUsers();
      this.getCountries();
      this.initialCountry = {initialCountry: 'mx'};
    });
  }

  getPage(page) {
    this.parameter.p = page;
    this.getInhouseUsers();
  }

  removeAddressObj(index) {
    this.model.address.splice(index, 1);
  }

  addEmptyObj() {
    if (this.model.address[this.addressIndex].countries && this.model.address[this.addressIndex].states &&
      this.model.address[this.addressIndex].cities && this.model.address[this.addressIndex].localities) {
      const obj = {
        countries: '',
        states : '',
        cities: '',
        localities: ''
      };
      this.addressIndex++;
      this.model.address.push(obj);
    }else {
      this.swal.error({
        title: 'Missing fields',
        text: 'Complete current row before adding new.',
      });
    }
  }


  onCountryChange(e) {
    console.log('eeee', e);
    this.model.userModel.country_code = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  openAddModal() {
    this.modalOpen.nativeElement.click();
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
          // this.model.cover_image = success.data.image;
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



  addNewUser(formdata: NgForm) {
    this.parameter.loading = true;
    this.parameter.url = this.model.userModel.id !== '' ? 'updateNewUser' : 'addNewUser';
console.log('add newuser params', formdata, JSON.stringify(this.model.address), '+' + this.model.userModel.country_code);
    const input = new FormData();

    if (this.model.userModel.id !== '') {input.append('id', this.model.userModel.id); }

    input.append('name', formdata.value.name);
    input.append('country_code', '+' + this.model.userModel.country_code);
    input.append('phone', formdata.value.phone);
    input.append('image', this.parameter.image);
    input.append('email', formdata.value.email);
    input.append('address', JSON.stringify(this.model.address));
    input.append('is_broker_seller_dev', formdata.value.is_broker_seller_dev === true ? '1' : '0');
    input.append('is_buyer_renter', formdata.value.is_buyer_renter === true ? '1' : '0');
    input.append('is_broker', formdata.value.is_broker === true ? '1' : '0');
    input.append('is_data_collector', formdata.value.is_data_collector === true ? '1' : '0');
    input.append('is_csr_closer', formdata.value.is_csr_closer === true ? '1' : '0');

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          this.parameter.loading = false;
          if (success.success === 0) {
            this.swal.error({
              title: 'Error',
              text: success.message
            });
          }else {
            this.modalClose.nativeElement.click();
            formdata.reset();
            this.swal.success({
              title: 'Success',
              text: this.model.userModel.id === '' ? 'Added successfully.' : 'Updated successfully.'
            });
          }
          // console.log('user add',success)
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

  editUser(userdata) {
    console.log('edit user', userdata);
    this.model.address = [];
    this.model.userModel.id = userdata.id;
    this.modalOpen.nativeElement.click();
    this.model.userModel.name = userdata.name;
    this.model.userModel.email = userdata.email;
    this.model.userModel.phone = userdata.phone;
    this.model.userModel.country_code = userdata.country_code;
    this.model.userModel.image = userdata.image;
    this.model.userModel.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
    this.model.userModel.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : true;
    this.model.userModel.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : true;
    this.model.userModel.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
    this.model.userModel.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : true;

    // userdata.countries = ['19', '19'];
    // userdata.states = ['4', '4'];
    // userdata.cities = ['4', '4'];
    // userdata.localities = ['3', '4'];

    for (let ind = 0; ind < userdata.countries.length; ind++) {

      const tempAdd = {
        countries: userdata.countries[ind].id,
        states: userdata.states[ind].id,
        cities: userdata.cities[ind].id,
        localities: userdata.localities[ind].id
      };

      this.model.address[ind] = tempAdd;
    }

    console.log('usermodel', this.model.userModel);
    // updateNewUser
  }


  getCountries() {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.countries = success.data;
          this.parameter.countryCount = success.data.length;
          if (this.parameter.countryCount !== 0) {
            // this.parameter.country_id = this.parameter.countries[0].id;
            // this.getStates(this.parameter.countries[0].id, type);
          }
        },
        error => {
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
        });
  }


  getStates(country_id) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;
console.log('countryid', country_id);
    if (country_id === '-1') {
      console.log('ssssss');
      this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
      this.parameter.stateCount = 0; this.parameter.cityCount = 0; this.parameter.localityCount = 0; this.parameter.buildingCount = 0;
      this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
      this.parameter.loading = false;
    }else {
      const input = new FormData();
      input.append('country_id', country_id);

      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            this.parameter.states = success.data;
            this.parameter.stateCount = success.data.length;
            if (this.parameter.stateCount !== 0) {
              // this.parameter.state_id = this.parameter.states[0].id;
              // this.getCities(this.parameter.states[0].id, type);
            }
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

  getCities(state_id) {

    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    if (state_id === -1) {
      this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
      this.parameter.cityCount = 0; this.parameter.localityCount = 0; this.parameter.buildingCount = 0;
      this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
      this.parameter.loading = false;
    }else {
      const input = new FormData();
      input.append('state_id', state_id);

      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            // console.log('cities1',success)
            this.parameter.cities = success.data;
            this.parameter.cityCount = success.data.length;
            if (this.parameter.cityCount !== 0) {
              // this.parameter.city_id = this.parameter.cities[0].id;
              // this.getLocalities(this.parameter.cities[0].id, 'view');
            }
          },
          error => {
            // console.log(error)
            this.parameter.loading = false;
            if (error.statusCode === 401) {
              this.router.navigate(['']);
            }else {
              this.swal.error({
                // title: 'Internet Connection',
                text: error.messages,
              });
            }
          });
    }
  }


  getLocalities(city_id) {

    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    if (city_id === -1) {
      this.parameter.localities = []; this.parameter.buildings = [];
      this.parameter.localityCount = 0; this.parameter.buildingCount = 0;
      this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
      this.parameter.loading = false;
    }else {

    const input = new FormData();
    input.append('city_id', city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          // console.log('Localities1',success);
          this.parameter.localities = success.data;
          this.parameter.localityCount = success.data.length;
          // if (success.data.length != 0)
          //   this.parameter.locality_id = success.data[0].id;
          // this.getInhouseUsers();
        },
        error => {
          // console.log(error)
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.error({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
    }
  }


  getLocalityBuildings(locality_id) {

    this.parameter.loading = true;
    this.parameter.url = 'getLocalityBuildings';
    this.parameter.locality_id = locality_id;

    if (locality_id === -1) {
      this.parameter.buildings = [];
      this.parameter.buildingCount = 0;
      this.parameter.building_id = '-1';
      this.parameter.loading = false;
    }else {

    const input = new FormData();
    input.append('locality_id', locality_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          // console.log('Localities1',success);
          this.parameter.buildings = success.data;
          this.parameter.buildingCount = success.data.length;
          // if (success.data.length != 0)
          //   this.parameter.locality_id = success.data[0].id;
          // this.getInhouseUsers();
        },
        error => {
          // console.log(error)
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.error({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
    }
  }


  setBuilding(building_id) {
    this.parameter.building_id = building_id;
  }

  searchUserByName(name) {
    this.parameter.name = name;
    this.getInhouseUsers();
  }
  searchUserByEmail(email) {
    this.parameter.email = email;
    this.getInhouseUsers();
  }
  searchUserByPhone(phone) {
    this.parameter.phone = phone;
    this.getInhouseUsers();
  }


  getInhouseUsers() {
    this.parameter.loading = true;
    switch (this.parameter.userType) {
      case 'data-collectors':
      this.parameter.url = 'getDataCollectors';
      this.parameter.type = 1;
        break;

      case 'csr-sellers':
      this.parameter.url = 'getCsrSellers';
      this.parameter.type = 2;
        break;

      case 'csr-buyers':
      this.parameter.url = 'getCsrBuyers';
      this.parameter.type = 3;
        break;

      case 'inhouse-broker':
      this.parameter.url = 'getInhouseBroker';
      this.parameter.type = 4;
        break;

      case 'csr-closers':
      this.parameter.url = 'getCsrClosers';
      this.parameter.type = 5;
        break;

      default:
      this.parameter.url = 'getDataCollectors';
      this.parameter.type = 1;
        break;
    }

    const input = new FormData();
    input.append('page', this.parameter.p.toString());

    if (this.parameter.name) {input.append('name', this.parameter.name); }

    if (this.parameter.email) {input.append('email', this.parameter.email); }

    if (this.parameter.phone) {input.append('phone', this.parameter.phone); }

    if (this.parameter.country_id && this.parameter.country_id !== '-1') {
      input.append('countries', JSON.stringify([this.parameter.country_id]));
    }

    if (this.parameter.state_id && this.parameter.state_id !== '-1') {
      input.append('states', JSON.stringify([this.parameter.state_id]));
    }

    if (this.parameter.city_id && this.parameter.city_id !== '-1') {
      input.append('cities', JSON.stringify([this.parameter.city_id]));
    }

    if (this.parameter.locality_id && this.parameter.locality_id !== '-1') {
      input.append('localities', JSON.stringify[this.parameter.locality_id]);
    }

    // if (this.parameter.locality_id && this.parameter.locality_id != '-1')
    //   input.append('localities', JSON.stringify[this.parameter.locality_id]);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('succc', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            this.swal.error({
              // title: 'Internet Connection',
              text: error.messages,
            });
          }
        });
  }


  addRow() {
    const obj = {
      countries: '',
      states : '',
      cities: '',
      localities: ''
    };

    this.model.address.push(obj);
  }


  blockUnblockPopup(index, id, flag, user_type) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_USER;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_USER;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
        break;
    }

    const self = this;
    this.swal.confirm({
        title: this.parameter.title,
        text: this.parameter.text,
    }).then(function() {
      self.blockAdmin(index, id, flag, user_type);
    })
    .catch(function() {
      // console.log('Logout cancelled by user');
    });
  }


  blockAdmin(index, id, flag, user_type) {
    this.parameter.url = 'blockAdmin';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          this.parameter.loading = false;

          this.swal.success({
            title: 'Success',
            text: this.parameter.successText
          });

          this.parameter.items[this.parameter.index] = success.data;

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
