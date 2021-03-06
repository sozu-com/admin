
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../common/property';
import { User, Address, UserModel, NewAddress } from './../../models/inhouse-users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
declare let swal: any;

@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css'],
  providers: [Constant, User, Address, UserModel]
})

export class InhouseUsersComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('viewModalOpen') viewModalOpen: ElementRef;
  @ViewChild('viewModalClose') viewModalClose: ElementRef;

  public parameter: IProperty = {};
  lead_sort = 1;
  initialCountry: any;
  addressIndex = 0;
  tempAdd: Object;
  url: any[];
  image1: any;
  title: string;
  // disabledLocalities = [];
  disabledBuildings = [];
  seenDuplicate = false;
  testObject = [];

  constructor(public constant: Constant, private cs: CommonService,
    public model: UserModel, private route: ActivatedRoute,
    public admin: AdminService, private router: Router,
    private sanitization: DomSanitizer) {
      this.admin.countryData$.subscribe(success => {
        this.parameter.allCountry = success;
        // console.log('allCountry', success);
      });
    }

  ngOnInit() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.routeName = this.router.url;
    this.tempAdd = this.model.address;

    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.p = this.constant.p;
      this.parameter.userType = params['userType'];
      this.parameter.name = ''; this.parameter.phone = ''; this.parameter.email = '';
      this.parameter.items = []; this.parameter.total = 0;
      this.getCountries();
      this.getInhouseUsers();
      this.initialCountry = {initialCountry: this.constant.initialCountry};
    });
  }

  getPage(page) {
    this.parameter.p = page;
    this.getInhouseUsers();
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.emptyModel();
  }

  emptyModel() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model = new UserModel();
    this.image1 = '';
    this.initialCountry = {initialCountry: this.constant.initialCountry};
    this.disabledBuildings = [];

  }

  closeViewModal() {
    this.viewModalClose.nativeElement.click();
    this.emptyModel();
  }

  removeAddressObj(index) {
    this.model.address.splice(index, 1);
    this.disabledBuildings.splice(index, 1);
  }

  addEmptyObj() {
    console.log('aaaa', this.model.address, this.model.address.length);
    this.addressIndex = this.model.address.length;
    this.addressIndex--;
    console.log('==', this.addressIndex);
    console.log(this.model.address, this.addressIndex);
    if (this.model.address[this.addressIndex].countries !== '' && this.model.address[this.addressIndex].states !== ''  &&
      this.model.address[this.addressIndex].cities !== ''  && this.model.address[this.addressIndex].localities !== '' &&
      this.model.address[this.addressIndex].buildings !== '') {
      const obj = {
        countries: '',
        states : '',
        cities: '',
        localities: '',
        buildings: ''
      };
      this.addressIndex++;
      this.model.address.push(obj);
    }else {
      swal('Missing fields', 'Complete current row before adding new.', 'error');
    }
  }

  disabledBuildingId(i) {
    this.disabledBuildings[i] = this.model.address[i].localities;
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  openAddModal() {
    console.log(this.parameter.countries);
    this.model.address = [];
    // this.parameter.countries ? this.parameter.countries[0].id : 0;
    const obj = {
      countries: this.parameter.countries ? this.parameter.countries[0].id : 0,
      states : '0',
      cities: '0',
      localities: '0',
      buildings: '0'
    };
    this.model.address[0] = obj;

    switch (this.parameter.userType) {
      case 'data-collectors':
      this.parameter.url = 'getDataCollectors';
      this.model.is_data_collector = true;
        break;

      case 'csr-sellers':
      this.parameter.url = 'getCsrSellers';
      this.model.is_broker_seller_dev = true;
        break;

      case 'csr-buyers':
      this.parameter.url = 'getCsrBuyers';
      this.model.is_buyer_renter = true;
        break;

      case 'inhouse-broker':
      this.parameter.url = 'getInhouseBroker';
      this.model.is_broker = true;
        break;

      case 'csr-closers':
      this.parameter.url = 'getCsrClosers';
      this.model.is_csr_closer = true;
        break;

      default:
      this.parameter.url = 'getDataCollectors';
      this.model.is_data_collector = true;
        break;
    }

    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    console.log('==', this.model);
    this.initialCountry = {initialCountry: this.constant.initialCountry};

    this.modalOpen.nativeElement.click();
  }

  telInputObject(obj) {
    obj.intlTelInput('setCountry', 'in');
  }

  initialcountryfunc( ) {
    return {initialCountry: this.constant.initialCountry};
  }

  onSelectFile1(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // this.parameter.image = event.target.files[0];
      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
          this.cs.saveImage(event.target.files[0]).subscribe(
            success => {
              this.parameter.image = success['data'].image;
              console.log('----', this.parameter.image);
            }
          );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addNewUser(formdata: NgForm) {
    this.parameter.url = this.model.id ? 'updateNewUser' : 'addNewUser';
    this.seenDuplicate = false;
    const input = new FormData();
console.log('===', formdata);
    if (this.model.id !== '') {input.append('id', this.model.id); }

    input.append('name', this.model.name);
    input.append('country_code', this.model.country_code ? this.model.country_code : this.constant.dial_code);
    input.append('dial_code', this.model.dial_code ? this.model.dial_code : this.constant.dial_code);
    input.append('phone', this.model.phone);
    input.append('email', this.model.email);
    input.append('address', JSON.stringify(this.model.address));
    input.append('is_broker_seller_dev', formdata.value.is_broker_seller_dev === true ? '1' : '0');
    input.append('is_buyer_renter', formdata.value.is_buyer_renter === true ? '1' : '0');
    input.append('is_broker', formdata.value.is_broker === true ? '1' : '0');
    input.append('is_data_collector', formdata.value.is_data_collector === true ? '1' : '0');
    input.append('is_csr_closer', formdata.value.is_csr_closer === true ? '1' : '0');

    if (this.parameter.image) {input.append('image', this.parameter.image); }

    // checking if locality is same or not
    this.model.address.map((item) => {
      let value = item['buildings'];
      value = value.toString();
      console.log('value', value);
      if (value === '0') {
        console.log('zz');
        this.testObject.push(value);
      } else {
        if (this.testObject.indexOf(value) === -1) {
          console.log('ssssss', this.testObject.indexOf(value));
          this.testObject.push(value);
        } else {
          this.seenDuplicate = true;
        }
      }
    });
    if (this.model.address[0].countries === '' || this.model.address[0].states === ''  ||
      this.model.address[0].cities === '' || this.model.address[0].localities === ''  || this.model.address[0].buildings === '' ) {
        swal('Error', 'Please choose location.', 'error');
    } else if (this.seenDuplicate) {
      this.testObject = [];
      this.seenDuplicate = false;
      swal('Error', 'Please choose different localities.', 'error');
    } else if ((formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
      formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
      formdata.value.is_csr_closer === false) ||
      (formdata.value.is_broker_seller_dev === null && formdata.value.is_buyer_renter === null &&
        formdata.value.is_broker === null && formdata.value.is_data_collector === null &&
        formdata.value.is_csr_closer === null)) {
        swal('Error', 'Please choose a role for inhouse user.', 'error');
    } else {
      this.parameter.loading = true;
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            if (success.success === '0') {
              swal('Error', success.message, 'error');
            }else {
              this.modalClose.nativeElement.click();
              const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
              swal('Success', text, 'success');
              if (this.model.id) {
                // edit -- replace
                this.parameter.items[this.parameter.index] = success.data;
                formdata.reset();
              } else {
                // add - push
                if ((formdata.value.is_broker_seller_dev === true && this.parameter.userType === 'csr-sellers') ||
                (formdata.value.is_buyer_renter === true && this.parameter.userType === 'csr-buyers') ||
                (formdata.value.is_broker === true && this.parameter.userType === 'inhouse-broker') ||
                (formdata.value.is_data_collector === true && this.parameter.userType === 'data-collectors') ||
                (formdata.value.is_csr_closer === true && this.parameter.userType === 'csr-closers')) {
                  this.parameter.items.push(success.data);
                }
                formdata.reset();
              }
              this.emptyModel();
            }
          }, error => {
            this.parameter.loading = false;
          });
    }
  }

  editUser(userdata, index) {
    this.parameter.loading = true;
    this.admin.postDataApi('getNewUserById', {id: userdata.id}).subscribe(r => {
      this.parameter.loading = false;
      userdata = r['data'];
      this.parameter.index = index;
      this.model.address = [];
      this.model.id = userdata.id;
      this.model.name = userdata.name;
      this.model.email = userdata.email;
      this.model.phone = userdata.phone;
      this.model.country_code = userdata.country_code;

      this.model.image = userdata.image != null ? userdata.image : '';
      if (this.model.image) {
        this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.model.image})`);
      }

      this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
      this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
      this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
      this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
      this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;

      for (let ind = 0; ind < userdata.countries.length; ind++) {
        const tempAdd = {
          countries: userdata.countries[ind].id.toString(),
          states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].id.toString() : '0',
          cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].id.toString() : '0',
          localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].id.toString() : '0',
          buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].id.toString() : '0'
        };
        this.model.address[ind] = tempAdd;
      }

      this.modalOpen.nativeElement.click();
    }, erorr => {
      this.parameter.loading = false;
    });
  }


  viewDetails(userdata, index) {
    this.model.address = [];
    this.viewModalOpen.nativeElement.click();

    this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
    this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
    this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
    this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
    this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;

    // for (let ind = 0; ind < userdata.countries.length; ind++) {
    //   const tempAdd = {
    //     countries: userdata.countries[ind].id.toString(),
    //     states: userdata.states !== null && userdata.states[ind] ? userdata.states[ind].id.toString() : '0',
    //     cities: userdata.cities !== null && userdata.cities[ind] ? userdata.cities[ind].id.toString() : '0',
    //     localities: userdata.localities !== null && userdata.localities[ind] ? userdata.localities[ind].id.toString() : '0',
    //     buildings: userdata.buildings !== null && userdata.buildings[ind] ? userdata.buildings[ind].id.toString() : '0'
    //   };
    //   this.model.address[ind] = tempAdd;
    // }
    // updateNewUser
  }


  // getCountries() {
  //   this.parameter.url = 'getCountries';
  //   const input = new FormData();
  //   this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
  //   this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';
  //   this.admin.postDataApi(this.parameter.url, input)
  //     .subscribe(
  //       success => {
  //         this.parameter.countries = success.data;
  //       });
  // }


  // getStates(country_id) {

  //   this.parameter.url = 'country/getStates';
  //   this.parameter.country_id = country_id;

  //   this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
  //   this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

  //   const input = new FormData();
  //   input.append('country_id', country_id);

  //   this.admin.postDataApi(this.parameter.url, input)
  //     .subscribe(
  //       success => {
  //         this.parameter.states = success.data;
  //       });
  // }

  // getCities(state_id) {

  //   this.parameter.url = 'getCities';
  //   this.parameter.state_id = state_id;

  //   this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
  //   this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

  //   const input = new FormData();
  //   input.append('state_id', state_id);

  //   this.admin.postDataApi(this.parameter.url, input)
  //     .subscribe(
  //       success => {
  //         this.parameter.cities = success.data;
  //       });
  // }


  // getLocalities(city_id) {

  //   this.parameter.url = 'getLocalities';
  //   this.parameter.city_id = city_id;

  //   this.parameter.localities = []; this.parameter.buildings = [];
  //   this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

  //   const input = new FormData();
  //   input.append('city_id', city_id);

  //   this.admin.postDataApi(this.parameter.url, input)
  //     .subscribe(
  //       success => {
  //         this.parameter.localities = success.data;
  //       });
  // }


  // getLocalityBuildings(locality_id) {
  //   this.parameter.url = 'getLocalityBuildings';
  //   this.parameter.locality_id = locality_id;

  //   this.parameter.buildings = [];
  //   this.parameter.building_id = '-1';

  //   const input = new FormData();
  //   input.append('locality_id', locality_id);

  //   this.admin.postDataApi(this.parameter.url, input)
  //     .subscribe(
  //       success => {
  //         this.parameter.buildings = success.data;
  //       });
  // }

  resetFilters() {
    this.parameter.countries = JSON.parse(JSON.stringify(this.parameter.countries));
    this.getStates('-1');
    this.parameter.p = this.constant.p;
    this.parameter.total = 0;
    this.getInhouseUsers();
  }

  getCountries() {
    this.parameter.countries = [];
    this.parameter.country_id = '-1';
    this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      console.log('Country', r);
      this.parameter.countries = r['data'];
    });
  }

  getStates(country_id) {
    this.parameter.country_id = country_id;
    this.parameter.states = []; this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.state_id = '-1'; this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    if (!country_id || country_id === '-1') {
      return false;
    }
    const selectedCountry = this.parameter.countries.filter(x => x.id.toString() === country_id);
    this.parameter.states = selectedCountry[0].states;

  }

  getCities(state_id) {
    this.parameter.cities = []; this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.city_id = '-1'; this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    if (!state_id || state_id === '-1') {
      return false;
    }
    this.parameter.state_id = state_id;
    const selectedState = this.parameter.states.filter(x => x.id.toString() === state_id);
    this.parameter.cities = selectedState[0].cities;
  }

  getLocalities(city_id) {
    this.parameter.localities = []; this.parameter.buildings = [];
    this.parameter.locality_id = '-1'; this.parameter.building_id = '-1';

    if (!city_id || city_id === '-1') {
      return false;
    }
    this.parameter.city_id = city_id;
    const selectedCountry = this.parameter.cities.filter(x => x.id.toString() === city_id);
    this.parameter.localities = selectedCountry[0].localities;
  }


  getLocalityBuildings(locality_id) {
    this.parameter.url = 'getLocalityBuildings';
    this.parameter.locality_id = locality_id;

    this.parameter.buildings = [];
    this.parameter.building_id = '-1';

    const input = new FormData();
    input.append('locality_id', locality_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.buildings = success.data;
        });
  }

  // getLocalityBuildings(locality_id) {
  //   console.log(locality_id);

  //   this.parameter.buildings = [];
  //   this.parameter.building_id = '-1';

  //   if (!locality_id || locality_id === '-1') {
  //     return false;
  //   }
  //   this.parameter.locality_id = locality_id;
  //   const selectedCountry = this.parameter.cities.filter(x => x.id.toString() === locality_id);
  //   this.parameter.buildings = selectedCountry[0].localities;
  // }


  setBuilding(building_id) {
    console.log(building_id);
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

  setLeadSort () {
    this.lead_sort = this.lead_sort === 1 ? 2 : 1;
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
      this.title = 'Inhouse Brokers';
      this.parameter.type = 4;
        break;

      case 'csr-closers':
      this.parameter.url = 'getCsrClosers';
      this.title = 'CSR Closures';
      this.parameter.type = 5;
        break;

      default:
      this.parameter.url = 'getDataCollectors';
      this.parameter.type = 1;
        break;
    }

    const input = new FormData();
    input.append('page', this.parameter.p.toString());
    if (this.lead_sort) { input.append('lead_sort', this.lead_sort.toString()); }
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
    if (this.parameter.building_id && this.parameter.building_id !== '-1') {
      input.append('buildings', JSON.stringify([this.parameter.building_id]));
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          // console.log('data', success);
          this.parameter.items = success.data;
          this.parameter.total = success.total;
          // this.parameter.items.reverse();
        }, error => {
          this.parameter.loading = false;
        });
  }


  addRow() {
    const obj = {
      countries: '',
      states : '',
      cities: '',
      localities: '',
      buildings: ''
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
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index, id, flag, user_type) {
    // this.parameter.loading = true;
    this.parameter.url = 'blockAdmin';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          swal('Success', this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index] = success.data;

        });
  }


  getCountryLocality() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      console.log('Country', r);
      this.parameter.countries = r['data'];
    });
  }


  onCountryChange1(id) {
    console.log(id);
    this.parameter.cities = []; this.parameter.city_id = '0';
    this.parameter.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.state_id = '0';
      return false;
    }

    this.parameter.country_id = id;
    const selectedCountry = this.parameter.countries.filter(x => x.id === id);
    this.parameter.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    console.log(id);
    this.parameter.localities = []; this.parameter.locality_id = '0';
    if (!id || id === 0) {
      this.parameter.city_id = '0';
      return false;
    }

    this.parameter.state_id = id;
    const selectedState = this.parameter.states.filter(x => x.id === id);
    this.parameter.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    console.log(id);
    if (!id || id === 0) {
      this.parameter.locality_id = '0';
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.parameter.cities.filter(x => x.id === id);
    this.parameter.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    console.log(id);
    if (!id || id === 0) {
      return false;
    }

    this.parameter.locality_id = id;
    // let selectedLocation = this.location.localities.filter(x=>x.id == id);
    // this.location.locality = selectedLocation[0];
  }
}
