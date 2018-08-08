import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../common/property';
import { InhouseUsers, User, Address } from './../../models/inhouse-users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';
declare let swal: any;

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
  title: string;
  phonePattern = '^[0-9]{5,15}$';
  newPage: number;

  constructor(private constant: Constant, private address: Address, private user: User,
    public model: InhouseUsers, private element: ElementRef, private route: ActivatedRoute,
    private admin: AdminService, private router: Router,
    private sanitization: DomSanitizer) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.routeName = this.router.url;
    this.model.userModel.country_code = this.constant.country_code;
    this.tempAdd = this.model.address;

    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.userType = params['userType'];
      console.log('usertype', this.parameter.userType);
      this.getInhouseUsers();
      this.getCountries();
      this.initialCountry = {initialCountry: this.constant.initialCountry};
    });
  }

  getPage(page) {
    console.log('page1111', page);
    this.parameter.p = page;
    this.getInhouseUsers();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.model.userModel.country_code = this.constant.country_code;
    this.model.address = [{
        countries: '',
        states : '',
        cities: '',
        localities: ''
    }];
    this.image1 = '';
    this.model.userModel.id = '';
    this.model.userModel.name = '';
    this.model.userModel.email = '';
    this.model.userModel.phone = '';
    this.initialCountry = {initialCountry: this.constant.initialCountry};
    this.model.userModel.is_broker_seller_dev = false;
    this.model.userModel.is_buyer_renter = false;
    this.model.userModel.is_broker = false;
    this.model.userModel.is_data_collector = false;
    this.model.userModel.is_csr_closer = false;
  }

  removeAddressObj(index) {
    console.log('zz', index);
    this.addressIndex--;
    this.model.address.splice(index, 1);
  }

  addEmptyObj() {
    console.log('====', this.addressIndex, this.model.address);
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
      swal('Missing fields', 'Complete current row before adding new.', 'error');
    }
  }


  onCountryChange(e) {
    console.log('eeee', e);
    this.model.userModel.country_code = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  openAddModal() {
    console.log('--', this.initialCountry);
    this.initialCountry = this.constant.initialCountry;
    console.log('--', this.initialCountry);
    this.modalOpen.nativeElement.click();
  }


  onSelectFile1(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.parameter.image = event.target.files[0];
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
          swal('Error', error.message, 'error');
        });

      // this.model.cover_image = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
    }
  }



  addNewUser(formdata: NgForm) {
    this.parameter.loading = true;
    this.parameter.url = this.model.userModel.id !== '' ? 'updateNewUser' : 'addNewUser';

    const input = new FormData();

    if (this.model.userModel.id !== '') {input.append('id', this.model.userModel.id); }
console.log('aa', this.model.userModel.country_code);
    input.append('name', formdata.value.name);
    input.append('country_code', '+' + this.model.userModel.country_code);
    input.append('phone', formdata.value.phone);
    input.append('email', formdata.value.email);
    input.append('address', JSON.stringify(this.model.address));
    input.append('is_broker_seller_dev', formdata.value.is_broker_seller_dev === true ? '1' : '0');
    input.append('is_buyer_renter', formdata.value.is_buyer_renter === true ? '1' : '0');
    input.append('is_broker', formdata.value.is_broker === true ? '1' : '0');
    input.append('is_data_collector', formdata.value.is_data_collector === true ? '1' : '0');
    input.append('is_csr_closer', formdata.value.is_csr_closer === true ? '1' : '0');

    if (this.parameter.image) {input.append('image', this.parameter.image); }

    if (formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
      formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
      formdata.value.is_csr_closer === false) {
        swal('Error', 'Please choose a role for inhouse user.', 'error');
        this.parameter.loading = false;
    }

    console.log('addnewuser');
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          this.parameter.loading = false;
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          }else {
            this.modalClose.nativeElement.click();
            formdata.reset();
            this.model.userModel.country_code = this.constant.country_code;
            this.initialCountry = {initialCountry: this.constant.initialCountry};
            this.model.address = [{
                countries: '',
                states : '',
                cities: '',
                localities: ''
            }];
            this.image1 = '';
            const text = this.model.userModel.id === '' ? 'Added successfully.' : 'Updated successfully.';
            swal('Success', text, 'success');

            if ((formdata.value.is_broker_seller_dev === true && this.parameter.userType === 'csr-sellers') ||
                (formdata.value.is_buyer_renter === true && this.parameter.userType === 'csr-buyers') ||
                (formdata.value.is_broker === true && this.parameter.userType === 'inhouse-broker') ||
                (formdata.value.is_data_collector === true && this.parameter.userType === 'data-collectors') ||
                (formdata.value.is_csr_closer === true && this.parameter.userType === 'csr-closers')) {

              if (this.model.userModel.id !== '') {
                // edit -- replace
                this.parameter.items[this.parameter.index] = success.data;
              } else {
                // add - push
                this.parameter.items.push(success.data);
              }
            }
            // this.getInhouseUsers();
          }
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }

  editUser(userdata, index) {
    console.log('edit user', userdata);
    this.parameter.index = index;
    this.model.address = [];
    this.model.userModel.id = userdata.id;
    this.modalOpen.nativeElement.click();
    this.model.userModel.name = userdata.name;
    this.model.userModel.email = userdata.email;
    this.model.userModel.phone = userdata.phone;
    this.model.userModel.country_code = userdata.country_code;

    this.model.userModel.image = userdata.image != null ? userdata.image : '';
    if (this.model.userModel.image) {
      this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.model.userModel.image})`);
    }

    this.model.userModel.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
    this.model.userModel.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : true;
    this.model.userModel.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : true;
    this.model.userModel.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
    this.model.userModel.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : true;

    // userdata.countries = ['19', '19'];
    // userdata.states = ['4', '4'];
    // userdata.cities = ['4', '4'];
    // userdata.localities = ['3', '4'];
    console.log('usermodel', this.model.userModel, this.image1);
    for (let ind = 0; ind < userdata.countries.length; ind++) {

      const tempAdd = {
        countries: userdata.countries[ind].id,
        states: userdata.states[ind].id,
        cities: userdata.cities[ind].id,
        localities: userdata.localities[ind].id
      };

      this.model.address[ind] = tempAdd;
    }

    console.log('usermodel', this.model.userModel, this.image1);
    // updateNewUser
  }


  getCountries() {

    this.parameter.url = 'getCountries';
    const input = new FormData();

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.countries = success.data;
        },
        error => {
          swal('Error', error.message, 'error');
        });
  }


  getStates(country_id) {

    this.parameter.url = 'country/getStates';
    this.parameter.country_id = country_id;

    this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    // if (country_id === '-1') {
    //   console.log('ssssss');
    //   this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id =
    // '-1'; this.parameter.building_id = '-1';
    // }else {
      const input = new FormData();
      input.append('country_id', country_id);

      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.states = success.data;
          },
          error => {
            swal('Error', error.message, 'error');
          });
    // }
  }

  getCities(state_id) {

    this.parameter.url = 'getCities';
    this.parameter.state_id = state_id;

    this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    // if (state_id === -1) {
    //   this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
    // }else {
      const input = new FormData();
      input.append('state_id', state_id);

      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.cities = success.data;
          },
          error => {
            if (error.statusCode === 401) {
              this.router.navigate(['']);
            }else {
              swal('Error', error.message, 'error');
            }
          });
    // }
  }


  getLocalities(city_id) {

    this.parameter.url = 'getLocalities';
    this.parameter.city_id = city_id;

    this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    // if (city_id === -1) {
    //   this.parameter.localities = []; this.parameter.buildings = [];
    //   this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
    // }else {

    const input = new FormData();
    input.append('city_id', city_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.localities = success.data;
        },
        error => {
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
    // }
  }


  getLocalityBuildings(locality_id) {
console.log(locality_id);
    this.parameter.url = 'getLocalityBuildings';
    this.parameter.locality_id = locality_id;

    this.parameter.buildings = [];
    this.parameter.building_id = '-1';

    // if (locality_id === -1) {
    //   this.parameter.buildings = [];
    //   this.parameter.building_id = '-1';
    // }else {

    const input = new FormData();
    input.append('locality_id', locality_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('succ', success);
          this.parameter.buildings = success.data;
        },
        error => {
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
    // }
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
      this.title = 'Data Collectors';
      this.parameter.type = 1;
        break;

      case 'csr-sellers':
      this.parameter.url = 'getCsrSellers';
      this.title = 'CSR Sellers';
      this.parameter.type = 2;
        break;

      case 'csr-buyers':
      this.parameter.url = 'getCsrBuyers';
      this.title = 'CSR Buyers';
      this.parameter.type = 3;
        break;

      case 'inhouse-broker':
      this.parameter.url = 'getInhouseBroker';
      this.title = 'Inhouse Broker';
      this.parameter.type = 4;
        break;

      case 'csr-closers':
      this.parameter.url = 'getCsrClosers';
      this.title = 'CSR Closers';
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
      input.append('localities', JSON.stringify([this.parameter.locality_id]));
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('succc', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.total;
          // this.parameter.items.reverse();
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

    swal({
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
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
          swal('Success', this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index] = success.data;

        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }
}
