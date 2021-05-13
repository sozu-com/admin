import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { ACL, Permission } from 'src/app/models/acl.model';
import { TranslateService } from '@ngx-translate/core';
import { Agency } from 'src/app/models/agency.model';
import { MapsAPILoader } from '@agm/core';
import { User, Address, UserModel } from 'src/app/models/inhouse-users.model';

declare let swal: any;
declare const google;

@Component({
  selector: 'app-create-acl',
  templateUrl: './create-acl.component.html',
  styleUrls: ['./create-acl.component.css']
})
export class CreateAclComponent implements OnInit {

  @ViewChild('search1') searchElementRef: ElementRef;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  model: ACL;
  allAcl = [];
  addressIndex = 0;
  tempAdd: Object;
  disabledBuildings = [];
  seenDuplicate = false;
  testObject = [];
  agencies: Array<Agency>;
  predefinedUsers: Array<any>;
  constructor(public constant: Constant, private cs: CommonService,
    private admin: AdminService, private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private translate: TranslateService
  ) {
    this.admin.countryData$.subscribe(success => {
      this.parameter.allCountry = success;
    });
    this.admin.loginData$.subscribe(res => {
      this.parameter.admin_id = res['id'];
    });
  }

  ngOnInit() {
    this.model = new ACL();
    this.model.img_loader = false;
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.agency = new Agency();
    this.model.is_company = 'true';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.parameter.routeName = this.router.url;
    this.tempAdd = this.model.address;
    this.setCurrentPosition();
    this.getCountries();


    // checking => after that place in add/edit
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


    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getAclUserById(this.model.id);
      } else {
        this.model.id = '';
        this.getAclList();
      }
      if (this.parameter.userType === 'inhouse-broker' || this.parameter.userType === 'outside-broker') {
        this.getAllAgencies();
      }
    });
  }

  getAclUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getAclUserById', {'id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
        this.image = this.model.image;
        this.model.admin_acl = success.data.admin_acl;
      }, error => {
        this.spinner.hide();
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
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

  getAclList() {
    this.spinner.show();
    this.admin.postDataApi('getAclList', {})
      .subscribe(
        success => {
          this.allAcl = success.data;
          this.spinner.hide();
          success.data.forEach(element => {
            const e = new Permission();
            const acl = {name: element.name};
            e.acl_id = element.id; e.acl = acl; e.show = false;
            e.can_create = 1; e.can_update = 1; e.can_read = 1; e.can_delete = 1; e.can_purge = 1; e.can_crud = 1;
            this.model.admin_acl.push(e);
          });
        }, error => {
          this.spinner.hide();
        });
  }

  expandBox(index: any) {
    this.model.admin_acl[index].show = this.model.admin_acl[index].show === true ? false : true;
  }

  setPermission(param: any, index: any) {
    if (param === 'can_crud') {
      this.model.admin_acl[index]['can_create'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_read'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_update'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_delete'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_purge'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_crud'] === 1 ? 0 : 1;
    } else {
      this.model.admin_acl[index][param] = this.model.admin_acl[index][param] &&
      this.model.admin_acl[index][param] === 1 ? 0 : 1;
      this.model.admin_acl[index]['can_crud'] = this.model.admin_acl[index]['can_create'] === 1 &&
      this.model.admin_acl[index]['can_read'] === 1 && this.model.admin_acl[index]['can_update'] === 1 &&
      this.model.admin_acl[index]['can_delete'] === 1 && this.model.admin_acl[index]['can_purge'] === 1 ? 1 : 0;
    }
  }


  add(formData: NgForm) {
    if (this.model.img_loader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
      return;
    }
    console.log(this.model);
    this.spinner.show();
    this.admin.postDataApi('addAclUser', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
          } else {
            const text = this.model.id === '' ?
                    this.translate.instant('message.success.addedSuccessfully') :
                    this.translate.instant('message.success.updatedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            if (this.model.id === '') {
              // this.model.image = '';
              // formData.reset();
              // this.getAclList();
              this.router.navigate(['/dashboard/access-control-mgt']);
            } else {
              if (this.parameter.admin_id === this.model.id) {
                this.admin.login.next(success.data);
                this.admin.permissions = success.data.permissions ? success.data.permissions : {};
                const dd = success.data.m.map((obj, index) => {
                  const key =  Object.keys(obj)[0];
                  this.admin.admin_acl[key] =  obj[key];
                });
              }
            }
          }
        }, error => {
          this.spinner.hide();
        });
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
    input.append('localities', locality_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.buildings = success.data;
        });
  }

  setBuilding(building_id: string) {
    this.parameter.building_id = building_id;
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


  loadPlaces(paramAdd: string, paramLat: string, paramLng: string, searchRef: any) {
    // load Places Autocomplete
    this.model[paramLat] = null;
    this.model[paramLng] = null;
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this[searchRef].nativeElement, {
        types: []
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          // const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          const place = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.model[paramLat] = place.geometry.location.lat();
          this.model[paramLng] = place.geometry.location.lng();
          if (place.formatted_address) {
            this.model[paramAdd] = place.formatted_address;
          }
        });
      });
    });
  }


  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setting address lat lng
        // this.model.lat = position.coords.latitude;
        // this.model.lng = position.coords.longitude;

        // setting branch office lat lng
        // this.model.branch_lat = position.coords.latitude;
        // this.model.branch_lng = position.coords.longitude;
      });
    }
  }

  placeMarker($event: any, paramLat: string, paramLng: string, param: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(this.model[paramLat], this.model[paramLng], param);
  }


  getGeoLocation(lat: number, lng: number, param: string) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            this.model[param] = result.formatted_address;
          } else {
            this.model[param] = lat + ',' + lng;
          }
        }
      });
    }
  }

  setUserType(user_type: number) {
    this.model.user_type = user_type;
    if (user_type) {
      this.predefinedUsers = [
        {
          title: this.translate.instant('addForm.CSRSeller'),
          key: 'is_broker_seller_dev',
          value: 0
        },{
          title: this.translate.instant('addForm.CSRBuyer'),
          key: 'is_buyer_renter',
          value: 0
        },{
          title: this.translate.instant('addForm.inhouseAgent'),
          key: 'is_broker',
          value: 0
        },{
          title: this.translate.instant('addForm.dataCollector'),
          key: 'is_data_collector',
          value: 0
        },{
          title: this.translate.instant('addForm.CSRClosure'),
          key: 'is_csr_closer',
          value: 0
        },{
          title: this.translate.instant('addForm.CSRRenter'),
          key: 'is_csr_renter',
          value: 0
        },{
          title: this.translate.instant('addForm.collectionAgent'),
          key: 'is_collection_agent',
          value: 0
        },{
          title: this.translate.instant('addForm.creditAgent'),
          key: 'is_credit_agent',
          value: 0
        },
        // {
          // title: this.translate.instant('addForm.outSideAgent'),
        //   key: 'is_external_agent',
        //   value: 0
        // }
      ];
    } else {  
      this.predefinedUsers = [
        {
          title: this.translate.instant('addForm.developer'),
          key: 'is_credit_agent',
          value: 0
        },
        {
          title: this.translate.instant('addForm.outSideAgent'),
          key: 'is_external_agent',
          value: 0
        }
      ];
    }
    console.log(this.model.user_type)
  }

  setPredefinedUsers(item, value) {
    this.model[item.key] = value;
  }
}
