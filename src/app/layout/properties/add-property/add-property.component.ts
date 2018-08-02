import { Component, OnInit, OnChanges, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { AddPropertyModel, Building } from './../../../models/addProperty.model';
import { NgForm, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Constant } from './../../../common/constants';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [AddPropertyModel, Building, Constant]
})

export class AddPropertyComponent implements OnInit {

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  url: any[];
  url2 = [];
  tab: number;
  selectedGuest;
  image1;
  image2;
  image3;
  showBuilding = false;
  amenityList = [];
  amen = '';
  bankList = [];
  bank = '';
  testMarital = [];
  imageEvent = [];
  showText = false;
  buildingName = '';
  initialCountry: any;

  constructor(private model: AddPropertyModel, private admin: AdminService,
    private router: Router, private sanitization: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private building: Building, private constant: Constant) { }

  ngOnInit() {
    this.parameter.buildingCount = 0;
    this.testMarital = [
      {id: 1,
      name: 'Married',
      checked: ''},
      {id: 2,
      name: 'Unmarried',
      checked: ''},
      {id: 3,
      name: 'Divorced',
      checked: ''}
    ];
    this.model.marital_status = [1];
    this.initialCountry = {initialCountry: this.constant.initialCountry};

    this.tab = 1;
    this.getCountries('');
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities();
    this.getBanks();

    // set google maps defaults
    this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();
  }

  setTab(tab) {
    this.tab = tab;
  }

  onCountryChange(e) {
    console.log('eeee', e);
    this.building.dev_countrycode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  getCountries(keyword) {

    this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    const input = new FormData();

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('countries', success);
          this.parameter.loading = false;
          this.parameter.countries = success.data;
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            swal('Error', error.message, 'error');
            // this.swal.warning({
            //   title: 'Error',
            //   text: error.message,
            // });
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }

  getStates(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('country_id', country_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('states', success);
          this.parameter.loading = false;
          this.parameter.states = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
        });
  }

  getCities(state_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('state_id', state_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('cities', success);
          this.parameter.loading = false;
          this.parameter.cities = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }


  getLocalities(city_id, keyword= '') {
    this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('Localities', success);
          this.parameter.loading = false;
          this.parameter.localities = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }

  setLocality(locality_id) {
    this.model.locality_id = locality_id;
  }

  setConfiguration(id) {
    this.model.configuration_id = id;
  }

  setPropertyType(id) {
    this.model.property_type_id = id;
  }

  setAmenity(id) {
    this.model.amenities = [id];
  }

  getConfigurations() {
    this.parameter.loading = true;
    this.parameter.url = 'getConfigurations';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getConfigurations', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }


  getPropertyTypes() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyTypes', success);
          this.parameter.loading = false;
          this.parameter.propertyTypes = success.data;
          this.parameter.propertyTypesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }

  getAmenities() {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getPropertyAmenities', success);
          this.parameter.loading = false;
          this.parameter.amenities = success.data;
          this.parameter.amenitiesCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }

  addAmenity(a) {
    const tt = this.getSelectedAmenityByName(a);
    if (tt) {
      this.amenityList.push(tt);
      this.model.amenities.push(tt.id);
    }
    this.amen = '';
  }

  getSelectedAmenityByName(selectedName: string) {
    const r = this.amenityList.find(amenity => amenity.name_en === selectedName);
    if (r) {
      return '';
    }else {
      return this.parameter.amenities.find(amenity => amenity.name_en === selectedName);
    }
  }

  removeAmenity(index) {
    this.model.amenities.splice(index, 1);
    this.amenityList.splice(index, 1);
  }


  getBanks() {
    this.parameter.loading = true;
    this.parameter.url = 'getBanks';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBanks', success);
          this.parameter.loading = false;
          this.parameter.banks = success.data;
          this.parameter.bankCount = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }

  addBank(a) {
    const tt = this.getSelectedBankByName(a);
    if (tt) {
      this.bankList.push(tt);
      this.model.banks.push(tt.id);
    }
    this.bank = '';
  }

  getSelectedBankByName(selectedName: string) {
    const r = this.bankList.find(bank => bank.name === selectedName);
    if (r) {
      return '';
    }else {
      return this.parameter.banks.find(bank => bank.name === selectedName);
    }
  }

  removeBank(index) {
    this.model.banks.splice(index, 1);
    this.bankList.splice(index, 1);
  }

  searchBuilding(keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'searchBuilding';
    const input = new FormData();
    input.append('keyword', keyword);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('searchBuilding', success);
          this.parameter.loading = false;
          this.parameter.buildings = success.data;
          this.parameter.buildingCount = success.data.length;
          if (this.parameter.buildingCount === 0) { this.showText = true; }
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          } else {
            swal('Error', error.message, 'error');
          }
        });
  }

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
    this.buildingName = '';
    this.loadPlaces();
  }

  onSelectFile1(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
          console.log('this.url, this.image1', this.url, this.image1);
      };
      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage', success);
          this.model.cover_image = success.data.image;
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


  onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {

console.log('url2', this.url2);

      if (this.url2.length === 6 || event.target.files.length > 6) {
        swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      }else {
        for (let index = 0; index < event.target.files.length; index++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageEvent.push(event.target.files[index]);
            this.url2.push(e.target.result);
            const tempurl = e.target.result;
            this.image2 = this.sanitization.bypassSecurityTrustStyle(`url(${tempurl})`);
          };
          reader.readAsDataURL(event.target.files[index]);
        }
      }
    }
  }

  closeModal() {
    this.modalClose.nativeElement.click();
    this.image2 = '';
    this.url2 = [];
    this.imageEvent = [];
    this.model.images = [];
  }

  removeImage(index) {
    this.url2.splice(index, 1);
    this.imageEvent.splice(index, 1);
    this.model.images.splice(index, 1);
    console.log('----------', this.url2, this.imageEvent);
  }

  saveImages() {
    console.log('----------', this.url2, this.imageEvent);
    const input = new FormData();
    for (let index = 0; index < this.imageEvent.length; index++) {
      input.append('image', this.imageEvent[index]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage' + index, success);
          this.model.images.push(success.data.image);
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
    }
  }

  onSelectFile3(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.image3 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
      };

      const input = new FormData();
      input.append('image', event.target.files[0]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage', success);
          this.model.floor_plan = success.data.image;
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });

      // this.model.images = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addMaritalStatus(id, i) {
    this.testMarital[i].checked = this.testMarital[i].checked === '' ? 'checked' : '';
  }

  addProperty(formdata: NgForm, tab) {
    console.log('formdata', formdata);
    console.log('api', this.model);
    this.tab = tab;

    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === 'checked') {
        const r = this.model.marital_status.indexOf(this.testMarital[index]);
        if (r === -1) { this.model.marital_status.push(this.testMarital[index].id); }
      }
    }
    this.parameter.loading = true;
    this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
    this.model.step = tab - 1;
    const input = new FormData();
    this.parameter.property_id = '44';
    if (this.parameter.property_id) {input.append('property_id', this.parameter.property_id); }

    input.append('step', this.model.step.toString());
    if (this.model.step === 1) {
      input.append('for_rent', this.model.for_rent === true ? '1' : '0');
      input.append('for_sale', this.model.for_sale === true ? '1' : '0');
      input.append('country_id', this.model.country_id);
      input.append('state_id', this.model.state_id);
      input.append('city_id', this.model.city_id);
      input.append('locality_id', this.model.locality_id);
      input.append('configuration_id', this.model.configuration_id);
      input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
      input.append('property_type_id', this.model.property_type_id);
    }

    if (this.model.step === 2) {
      input.append('cover_image', this.model.cover_image);
      input.append('images', JSON.stringify(this.model.images));
      input.append('floor_plan', this.model.floor_plan);
      input.append('bedroom', this.model.bedroom);
      input.append('bathroom', this.model.bathroom);
      input.append('floor', this.model.floor);
      input.append('parking', this.model.parking);
      input.append('furnished', this.model.furnished);
      input.append('description', this.model.description);
      input.append('quantity', this.model.quantity);
      input.append('amenities', JSON.stringify(this.model.amenities));
      input.append('banks', JSON.stringify(this.model.banks));
    }

    if (this.model.step === 3) {
      input.append('pets', this.model.pets);
      input.append('marital_status', JSON.stringify(this.model.marital_status));
    }

    if (this.model.step === 4) {
      input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
    }

    this.parameter.loading = false;
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          this.parameter.property_id = success.data.id;
          this.parameter.loading = false;
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }

  setBuildingId(building_id) {
    this.parameter.building_id = building_id;
  }

  tagBuilding() {

    this.parameter.loading = true;
    this.parameter.url = 'tagBuilding';

    const input = new FormData();
    if (this.parameter.property_id) {input.append('property_id', this.parameter.property_id); }
    input.append('building_id', this.parameter.building_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('tagBuilding', success);
          this.parameter.loading = false;
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }

  loadPlaces() {
    console.log('--', this.searchElementRef.nativeElement);
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

          console.log('----------', this.latitude, this.longitude, this.zoom);
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  placeMarker($event) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getGeoLocation(this.latitude, this.longitude);
    console.log($event.coords.lat);
    console.log($event);
  }


  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
        const geocoder = new google.maps.Geocoder();
        const latlng = new google.maps.LatLng(lat, lng);
        const request = { latLng: latlng };

        geocoder.geocode(request, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const result = results[0];
            if (result != null) {
              this.building.address = result.formatted_address;
            } else {
              this.building.address = lat + ',' + lng;
            }
          }
        });
    }
  }


  buildingRequest() {

    this.parameter.loading = true;
    this.parameter.url = 'buildingRequest';

    const input = new FormData();
    input.append('name', this.building.name);
    input.append('address', this.building.address);
    input.append('lat', this.building.lat.toString());
    input.append('lng', this.building.lng.toString());

    if (this.building.dev_name) {input.append('dev_name', this.building.dev_name); }
    if (this.building.dev_phone) {input.append('dev_name', this.building.dev_phone); }
    if (this.building.dev_countrycode) {input.append('dev_name', this.building.dev_countrycode); }
    if (this.building.dev_email) {input.append('dev_name', this.building.dev_email); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          this.parameter.loading = false;
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }
}
