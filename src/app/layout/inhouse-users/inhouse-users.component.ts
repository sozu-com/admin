
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { DomSanitizer } from '@angular/platform-browser';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { Agency } from 'src/app/models/agency.model';
import { Constant } from 'src/app/common/constants';
import { User, Address, UserModel } from 'src/app/models/inhouse-users.model';
import { IProperty } from 'src/app/common/property';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare let swal: any;
declare const google;
@Component({
  selector: 'app-inhouse-users',
  templateUrl: './inhouse-users.component.html',
  styleUrls: ['./inhouse-users.component.css'],
  providers: [Constant, User, Address, UserModel]
})

export class InhouseUsersComponent implements OnInit {

  @ViewChild('inhouseUserModalOpen') inhouseUserModalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('viewModalOpen') viewModalOpen: ElementRef;
  @ViewChild('viewModalClose') viewModalClose: ElementRef;
  @ViewChild('moreImgModalOpen') moreImgModalOpen: ElementRef;
  @ViewChild('moreImgModalClose') moreImgModalClose: ElementRef;

  public parameter: IProperty = {};
  lead_sort = 2;
  property_sort = 2;
  initialCountry: any;
  addressIndex = 0;
  tempAdd: Object;
  url: any[];
  image: any;
  company_logo: any;
  title: string;
  // disabledLocalities = [];
  disabledBuildings = [];
  seenDuplicate = false;
  testObject = [];
  file1: FileUpload;
  agencies: Array<Agency>;
  constructor(public constant: Constant, private cs: CommonService,
    public model: UserModel, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public admin: AdminService, private router: Router,
    private ngZone: NgZone) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
  }

  ngOnInit() {
    this.file1 = new FileUpload(false, this.admin);
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.agency = new Agency();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.routeName = this.router.url;
    this.tempAdd = this.model.address;
    // this.setCurrentPosition();
    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.p = this.constant.p;
      this.parameter.userType = params['userType'];
      this.parameter.name = ''; this.parameter.phone = ''; this.parameter.email = '';
      this.parameter.items = []; this.parameter.total = 0;
      this.getCountries();
      this.getInhouseUsers();
      if (this.parameter.userType === 'inhouse-broker' || this.parameter.userType === 'outside-broker') {
        this.property_sort = null;
        this.getAllAgencies();
      }
      this.initialCountry = { initialCountry: this.constant.initialCountry };
    });
  }

  getPage(page: any) {
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
    this.initialCountry = { initialCountry: this.constant.initialCountry };
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
    this.addressIndex = this.model.address.length;
    this.addressIndex--;
    if (this.model.address[this.addressIndex].countries !== '' && this.model.address[this.addressIndex].states !== '' &&
      this.model.address[this.addressIndex].cities !== '' && this.model.address[this.addressIndex].localities !== '' &&
      this.model.address[this.addressIndex].buildings !== '') {
      const obj = {
        countries: '',
        states: '',
        cities: '',
        localities: '',
        buildings: ''
      };
      this.addressIndex++;
      this.model.address.push(obj);
    } else {
      swal('Missing fields', 'Complete current row before adding new.', 'error');
    }
  }

  disabledBuildingId(i) {
    this.disabledBuildings[i] = this.model.address[i].localities;
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  openAddModal() {
    this.model.address = [];
    this.model.img_loader = false;
    // this.parameter.countries ? this.parameter.countries[0].id : 0;
    const obj = {
      countries: this.parameter.countries && this.parameter.countries[0] ? this.parameter.countries[0].id : 0,
      states: '0',
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
        // this.model.is_external_agent = false;
        break;

      case 'outside-broker':
        this.parameter.url = 'getInhouseBroker';
        // this.model.is_broker = false;
        this.model.is_external_agent = true;
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
    this.initialCountry = { initialCountry: this.constant.initialCountry };

    this.inhouseUserModalOpen.nativeElement.click();
  }

  telInputObject(obj) {
    obj.intlTelInput('setCountry', 'in');
  }

  initialcountryfunc() {
    return { initialCountry: this.constant.initialCountry };
  }

  setAgency(id: string) {
    this.model.agency.id = id;
  }

  // onSelectFile1(event: any, paramUrl: string, paramFile: string) {
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();
  //     // this.parameter.image = event.target.files[0];
  //     reader.onload = (e: any) => {
  //       this[paramUrl] = e.target.result;
  //       this[paramFile] = this.sanitization.bypassSecurityTrustStyle(`url(${this[paramUrl]})`);
  //       this.cs.saveImage(event.target.files[0]).subscribe(
  //         success => {
  //           this.model[paramFile] = success['data'].image;
  //         }
  //       );
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.model[param] = e.target.result;
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  addNewUser(formdata: NgForm) {
    // if (this.model.adr && this.model.adr.trim() && !this.model.lat && !this.model.lng) {
    //   swal('Error', 'Please choose address from dropdown.', 'error');
    //   return;
    // }
    // if (this.model.branch_office && this.model.branch_office.trim() && !this.model.branch_lat && !this.model.branch_lng) {
    //   swal('Error', 'Please choose branch address from dropdown.', 'error');
    //   return;
    // }
    if (this.model.img_loader) {
      swal('Error', 'Uploading image.', 'error');
      return false;
    }
    this.parameter.url = this.model.id ? 'updateNewUser' : 'addNewUser';
    this.seenDuplicate = false;
    const input = new FormData();
    if (this.model.id !== '') { input.append('id', this.model.id); }

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
    input.append('is_external_agent', this.model.is_external_agent === true ? '1' : '0');
    if (this.model.is_external_agent) {
      input.append('agency_id', this.model.agency.id);
      // input.append('company_name', this.model.company_name);
      // input.append('company_logo', this.model.company_logo);
      // input.append('description', this.model.description);
      // input.append('adr', this.model.adr);
      // input.append('lat', this.model.lat);
      // input.append('lat', this.model.lat);
      // // if branch address
      // if (this.model.branch_office && this.model.branch_office.trim()) {
      //   this.model.branches = [];
      //   this.model.branches = [
      //     {'address': this.model.branch_office,
      //     'lat': this.model.branch_lat,
      //     'lng': this.model.branch_lng}
      //     ];
      //     input.append('branches', JSON.stringify(this.model.branches));
      // }

      // // images videos
      // input.append('company_images', JSON.stringify([]));
      // input.append('company_videos', JSON.stringify([]));
    } else {
      // input.append('is_broker', '1');
      input.append('company_name', '');
      input.append('company_logo', '');
      input.append('description', '');
      input.append('adr', '');
      input.append('lat', '');
      input.append('lat', '');
      input.append('branches', JSON.stringify([]));
    }
    if (this.model.image) { input.append('image', this.model.image); }

    // checking if locality is same or not
    this.model.address.map((item) => {
      let value = item['buildings'];
      value = value.toString();
      if (value === '0') {
        this.testObject.push(value);
      } else {
        if (this.testObject.indexOf(value) === -1) {
          this.testObject.push(value);
        } else {
          this.seenDuplicate = true;
        }
      }
    });
    if (this.model.address[0].countries === '' || this.model.address[0].states === '' ||
      this.model.address[0].cities === '' || this.model.address[0].localities === '' || this.model.address[0].buildings === '') {
      swal('Error', 'Please choose location.', 'error');
    } else if (this.seenDuplicate) {
      this.testObject = [];
      this.seenDuplicate = false;
      swal('Error', 'Please choose different localities.', 'error');
    } else if ((formdata.value.is_broker_seller_dev === false && formdata.value.is_buyer_renter === false &&
      formdata.value.is_broker === false && formdata.value.is_data_collector === false &&
      formdata.value.is_csr_closer === false && formdata.value.is_external_agent === false) ||
      (formdata.value.is_broker_seller_dev === null && formdata.value.is_buyer_renter === null &&
        formdata.value.is_broker === null && formdata.value.is_data_collector === null &&
        formdata.value.is_csr_closer === null && formdata.value.is_external_agent === null)) {
      swal('Error', 'Please choose a role for inhouse user.', 'error');
    } else {
      this.spinner.show();
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.spinner.hide();
            if (success.success === '0') {
              swal('Error', success.message, 'error');
            } else {
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
                  (formdata.value.is_external_agent === true && this.parameter.userType === 'outside-broker') ||
                  (formdata.value.is_data_collector === true && this.parameter.userType === 'data-collectors') ||
                  (formdata.value.is_csr_closer === true && this.parameter.userType === 'csr-closers')) {
                  this.parameter.items.push(success.data);
                  this.parameter.total++;
                }
                formdata.reset();
              }
              this.emptyModel();
            }
          }, error => {
            this.spinner.hide();
          });
    }
  }

  editUser(userdata, index) {
    this.spinner.show();
    this.model.img_loader = false;
    this.admin.postDataApi('getNewUserById', { id: userdata.id }).subscribe(r => {
      this.spinner.hide();
      userdata = r['data'];
      this.parameter.index = index;
      this.model.address = [];
      this.model.id = userdata.id;
      this.model.name = userdata.name;
      this.model.email = userdata.email;
      this.model.phone = userdata.phone;
      this.model.country_code = userdata.country_code;

      // this.model.company_name = userdata.company_name;
      // this.model.description = userdata.description;
      this.model.is_external_agent = userdata.is_external_agent;
      this.model.agency = userdata.agency ? userdata.agency : new Agency();
      // this.model.adr = userdata.address;
      // this.model.lat = userdata.lat;
      // this.model.lng = userdata.lng;

      // branch
      // if (userdata.branches && userdata.branches.length > 0) {
      //   this.model.branch_office = userdata.branches[0].address;
      //   this.model.branch_lat = userdata.branches[0].lat;
      //   this.model.branch_lng = userdata.branches[0].lng;
      // }

      this.model.image = userdata.image != null ? userdata.image : '';
      this.model.is_broker_seller_dev = userdata.permissions && userdata.permissions.can_csr_seller === 1 ? true : false;
      this.model.is_buyer_renter = userdata.permissions && userdata.permissions.can_csr_buyer === 1 ? true : false;
      this.model.is_broker = userdata.permissions && userdata.permissions.can_in_house_broker === 1 ? true : false;
      this.model.is_data_collector = userdata.permissions && userdata.permissions.can_data_collector === 1 ? true : false;
      this.model.is_csr_closer = userdata.permissions && userdata.permissions.can_csr_closer === 1 ? true : false;
      this.model.is_external_agent = userdata.is_external_agent && userdata.is_external_agent.toString() === '1' ? true : false;

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

      this.inhouseUserModalOpen.nativeElement.click();
    }, erorr => {
      this.spinner.hide();
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

  setBuilding(building_id: string) {
    this.parameter.building_id = building_id;
  }

  searchUserByName(name: string) {
    this.parameter.name = name;
    this.getInhouseUsers();
  }
  searchUserByCompanyName(company_name: string) {
    this.parameter.company_name = company_name;
    this.getInhouseUsers();
  }
  searchUserByEmail(email: string) {
    this.parameter.email = email;
    this.getInhouseUsers();
  }
  searchUserByPhone(phone: string) {
    this.parameter.phone = phone;
    this.getInhouseUsers();
  }

  setLeadSort() {
    this.lead_sort = this.lead_sort === 2 ? 1 : 2;
    this.property_sort = null;
    this.getInhouseUsers();
  }
  setPropertiesSort() {
    this.property_sort = this.property_sort === 2 ? 1 : 2;
    this.lead_sort = null;
    this.getInhouseUsers();
  }
  setBrokerType(is_external_agent: string) {
    this.model.is_external_agent = is_external_agent === '1' ? true : false;
    this.getInhouseUsers();
  }
  setBrokerForModel(is_external_agent: string) {
    this.model.is_external_agent = is_external_agent === '1' ? true : false;
  }

  getInhouseUsers() {
    this.spinner.show();
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
        this.title = 'Inhouse Agents';
        this.parameter.type = 4;
        this.model.is_external_agent = false;
        // this.model.is_external_agent = false;
        // this.is_external_agent = '0';
        break;

      case 'outside-broker':
        this.parameter.url = 'getInhouseBroker';
        this.title = 'Outside Agents';
        this.parameter.type = 4;
        this.model.is_external_agent = true;
        // this.is_external_agent = '1';
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
    if (this.property_sort) { input.append('property_sort', this.property_sort.toString()); }
    if (this.parameter.name) { input.append('name', this.parameter.name); }
    if (this.parameter.email) { input.append('email', this.parameter.email); }
    if (this.parameter.phone) { input.append('phone', this.parameter.phone); }
    if (this.parameter.company_name) { input.append('company_name', this.parameter.company_name); }
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
    input.append('is_external_agent', this.model.is_external_agent === true ? '1' : '0');

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  getAllAgencies() {
    this.admin.postDataApi('getAllAgencies', {})
      .subscribe(
        success => {
          this.agencies = success.data;
        });
  }


  addRow() {
    const obj = {
      countries: '',
      states: '',
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
    // this.spinner.show();
    this.parameter.url = 'blockAdmin';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal('Success', this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index]['is_blocked'] = flag;
          // this.parameter.items[this.parameter.index] = success.data;
        });
  }


  getCountryLocality() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.parameter.countries = r['data'];
    });
  }


  onCountryChange1(id) {
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
    if (!id || id === 0) {
      this.parameter.locality_id = '0';
      return false;
    }

    this.parameter.city_id = id;
    const selectedCountry = this.parameter.cities.filter(x => x.id === id);
    this.parameter.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id === 0) {
      return false;
    }

    this.parameter.locality_id = id;
    // let selectedLocation = this.location.localities.filter(x=>x.id == id);
    // this.location.locality = selectedLocation[0];
  }


  // loadPlaces(paramAdd: string, paramLat: string, paramLng: string, searchRef: any) {
  //   // load Places Autocomplete
  //   console.log('aaa', searchRef, this[searchRef].nativeElement);
  //   this.model[paramLat] = null;
  //   this.model[paramLng] = null;
  //   this.mapsAPILoader.load().then(() => {
  //     const autocomplete = new google.maps.places.Autocomplete(this[searchRef].nativeElement, {
  //       types: []
  //     });
  //     autocomplete.addListener('place_changed', () => {
  //       this.ngZone.run(() => {
  //         // get the place result
  //         // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         const place = autocomplete.getPlace();

  //         // verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         // set latitude, longitude and zoom
  //         this.model[paramLat] = place.geometry.location.lat();
  //         this.model[paramLng] = place.geometry.location.lng();
  //         if (place.formatted_address) {
  //           this.model[paramAdd] = place.formatted_address;
  //         }
  //       });
  //     });
  //   });
  // }


  // setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       // setting address lat lng
  //       // this.model.lat = position.coords.latitude;
  //       // this.model.lng = position.coords.longitude;

  //       // setting branch office lat lng
  //       // this.model.branch_lat = position.coords.latitude;
  //       // this.model.branch_lng = position.coords.longitude;
  //     });
  //   }
  // }

  // placeMarker($event: any, paramLat: string, paramLng: string, param: string) {
  //   this.model[paramLat] = $event.coords.lat;
  //   this.model[paramLng] = $event.coords.lng;
  //   this.getGeoLocation(this.model[paramLat], this.model[paramLng], param);
  // }


  // getGeoLocation(lat: number, lng: number, param: string) {
  //   if (navigator.geolocation) {
  //     const geocoder = new google.maps.Geocoder();
  //     const latlng = new google.maps.LatLng(lat, lng);
  //     const request = { latLng: latlng };

  //     geocoder.geocode(request, (results, status) => {
  //       if (status === google.maps.GeocoderStatus.OK) {
  //         const result = results[0];
  //         if (result != null) {
  //           this.model[param] = result.formatted_address;
  //         } else {
  //           this.model[param] = lat + ',' + lng;
  //         }
  //         console.log('1', this.model[param]);
  //       }
  //     });
  //   }
  // }


  file1Select($event) {
    this.file1.onSelectFile($event);
  }

  modelOpenFun() {
    this.moreImgModalOpen.nativeElement.click();
    // this.file1.backup(JSON.parse(JSON.stringify(this.model.company_images)));
  }

  modelCloseFun() {
    this.moreImgModalClose.nativeElement.click();
  }

  saveImages() {
    if (this.file1.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error'); return false;
    }
    this.moreImgModalClose.nativeElement.click();
    this.file1.upload().then(r => {
      // this.model.company_images = this.file1.files;
    });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete this inhouse user?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteNewUser(item, index);
      }
    });
  }

  deleteNewUser(item: any, index: number) {
    this.admin.postDataApi('deleteNewUser',
      { id: item.id }).subscribe(r => {
        swal('Success', 'Deleted successfully.', 'success');
        this.parameter.items.splice(index, 1);
        this.parameter.total--;
      },
        error => {
          swal('Error', error.error.message, 'error');
        });
  }
}
