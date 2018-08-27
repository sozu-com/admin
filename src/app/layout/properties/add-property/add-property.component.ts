import { Component, OnInit, OnChanges, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { AddPropertyModel, Building } from './../../../models/addProperty.model';
import { NgForm, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Constant } from './../../../common/constants';
import { FileUpload } from './../../../common/fileUpload';
declare const google;
declare let swal: any;
import { EN } from './../../../locale/en';
import { ES } from './../../../locale/es';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [AddPropertyModel, Building, Constant]
})

export class AddPropertyComponent implements OnInit {

  uploader: FileUpload;

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  name: string;

  url: File;
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
  testMarital = [
    {id: 1,
    name: 'Married',
    checked: false},
    {id: 2,
    name: 'Unmarried',
    checked: false},
    {id: 3,
    name: 'Divorced',
    checked: false}
  ];
  imageEvent = [];
  showText = false;
  showSearch = false;
  buildingName = '';
  initialCountry: any;
  propertyDetails = false;

  constructor(public model: AddPropertyModel, private admin: AdminService, private cs: CommonService,
    private router: Router, private sanitization: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.uploader = new FileUpload();
    this.parameter.sub = this.route.params.subscribe(params => {
      this.parameter.property_id = params['property_id'];
      if (this.parameter.property_id === '0') {
        this.parameter.property_id = '';
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
        this.showSearch = true;
        console.log('yes');
      } else {
        console.log('yes');
        this.getPropertyById(this.parameter.property_id);
      }

    });

    this.parameter.buildingCount = 0;
    // this.testMarital = [
    //   {id: 1,
    //   name: 'Married',
    //   checked: 'true'},
    //   {id: 2,
    //   name: 'Unmarried',
    //   checked: 'false'},
    //   {id: 3,
    //   name: 'Divorced',
    //   checked: 'false'}
    // ];
    // this.model.marital_status = [1];
    this.initialCountry = {initialCountry: this.constant.initialCountry};

    this.tab = 1;
    this.getCountries('');
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities();
    this.getBanks();

    // set google maps defaults
    this.zoom = 4;
    // create search FormControl
    this.searchControl = new FormControl();
    // set current position
    this.setCurrentPosition();
    // console.log('propertyid', this.parameter.property_id);
  }

  getPropertyById (property_id) {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyById';
    const input = new FormData();
    input.append('property_id', property_id);
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('propertyDetails', success);
          this.parameter.loading = false;
          this.parameter.propertyDetails = success.data;
          this.setModelData(success.data);
          // console.log('model', this.model);
        }
        // error => {
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     swal('Error', error.message, 'error');
        //     this.router.navigate(['']);
        //   }else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  setModelData(data) {
    this.model.id = data.id;
    this.model.for_rent = data.for_rent === 1 ? true : false;
    this.model.for_sale = data.for_sale === 1 ? true : false;
    this.getStates(data.locality.city.state.country.id, '');
    this.getCities(data.locality.city.state.id, '');
    this.getLocalities(data.locality.city.id, '');

    this.model.locality_id = data.locality.id;
    this.model.city_id = data.locality.city.id;
    this.model.state_id = data.locality.city.state.id;
    this.model.country_id = data.locality.city.state.country.id;

    this.model.configuration_id = data.configuration.id;
    this.model.property_type_id = data.property_type.id;

    this.model.floor_plan = data.floor_plan;
    this.model.cover_image = data.image;
    this.model.description = data.description;
    this.model.quantity = data.quantity;
    this.model.floor = data.floor;
    this.model.bedroom = data.bedroom;
    this.model.bathroom = data.bathroom;
    this.model.parking = data.parking;
    this.model.furnished = data.furnished;

    this.building.id = data.building ? data.building.id : '';
    this.building.name = data.building ? data.building.name : '';
    if (this.building.id === '') {
      this.showSearch = true;
    }
    this.amenityList = data.amenities;
    for (let index = 0; index < data.amenities.length; index++) {
      const element = data.amenities[index];
      this.model.amenities[index] = data.amenities[index].id;
    }

    for (let index = 0; index < this.testMarital.length; index++) {
      // console.log('data.marital_status', this.testMarital, data.marital_statuses);
      if (data.marital_statuses.length !== 0) {
        for (let i = 0; i < data.marital_statuses.length; i++) {
          if (this.testMarital[index].name === data.marital_statuses[i].name_en) {
            // console.log('check', this.testMarital, data.marital_statuses);
            this.testMarital[index].checked = true;
          }
        }
      } else {
        this.testMarital[0].checked = true;
      }
      // this.model.marital_status[index] = data.marital_status[index].id;
    }

    this.bankList = data.banks;
    for (let index = 0; index < data.banks.length; index++) {
      const element = data.banks[index];
      this.model.banks[index] = data.banks[index].id;
    }
    // this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.model.floor_plan})`);

    for (let index = 0; index < data.carpet_areas.length; index++) {
      const element = data.carpet_areas[index];
      this.model.carpet_areas[index] = {area: element.area, price: element.price};
    }

    for (let index = 0; index < data.custom_values.length; index++) {
      const element = data.custom_values[index];
      this.model.custom_attributes[index] = {name: element.name, value: element.value};
    }
        console.log(this.showSearch, this.building.id);
  }

  setTab(tab) {
    this.tab = tab;
  }

  showSearchBox() {
    this.showSearch = true;
  }

  onCountryChange(e) {
    // console.log('eeee', e);
    this.building.dev_countrycode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  getCountries(keyword) {

    // this.parameter.loading = true;
    this.parameter.url = 'getCountries';
    this.admin.postDataApi(this.parameter.url, {})
      .subscribe(
        success => {
          // console.log('countries', success);
          // this.parameter.loading = false;
          this.parameter.countries = success.data;
        }
        // error => {
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     swal('Error', error.message, 'error');
        //     this.router.navigate(['']);
        //   }else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  getStates(country_id, keyword) {
    // this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('country_id', country_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('states', success);
          // this.parameter.loading = false;
          this.parameter.states = success.data;
        }
        // error => {
        //   // console.log(error);
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   }else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  getCities(state_id, keyword) {
    // this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';

    const input = new FormData();
    input.append('state_id', state_id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('cities', success);
          // this.parameter.loading = false;
          this.parameter.cities = success.data;
        }
        // error => {
        //   // console.log(error);
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   } else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }


  getLocalities(city_id, keyword= '') {
    // this.parameter.loading = true;
    this.parameter.url = 'getLocalities';
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {input.append('keyword', keyword); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('Localities', success);
          // this.parameter.loading = false;
          this.parameter.localities = success.data;
        }
        // error => {
        //   // console.log(error);
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   } else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  // setLocality(locality_id) {
  //   this.model.locality_id = locality_id;
  // }

  // setConfiguration(id) {
  //   this.model.configuration_id = id;
  // }

  // setPropertyType(id) {
  //   this.model.property_type_id = id;
  // }

  setAmenity(id) {
    this.model.amenities = [id];
  }

  setValue(key, value) {
    this.model[key] = value;
  }

  getConfigurations() {
    // this.parameter.loading = true;
    this.parameter.url = 'getConfigurations';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.items = success.data;
          if (this.parameter.items.length !== 0 && this.parameter.property_id === '') {
            this.model.configuration_id = this.parameter.items[0].id;
          }
        }
        // error => {
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   } else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }


  getPropertyTypes() {
    // this.parameter.loading = true;
    this.parameter.url = 'getPropertyTypes';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.propertyTypes = success.data;
          if (this.parameter.propertyTypes.length !== 0 && this.parameter.property_id === '') {
            this.model.property_type_id = this.parameter.propertyTypes[0].id;
          }
        }
        // error => {
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   } else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  getAmenities() {
    // this.parameter.loading = true;
    this.parameter.url = 'getPropertyAmenities';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // this.parameter.loading = false;
          this.parameter.amenities = success.data;
        }
        // error => {
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   } else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  addAmenity(a) {
    // console.log('a', a);
    const tt = this.getSelectedAmenityByName(a);
    if (tt) {
      // console.log('fsdfs');
      this.amenityList.push(tt);
      this.model.amenities.push(tt.id);
    }
    // console.log('afffdsfsdfsdf', this.amenityList);
    this.amen = '';
  }

  getSelectedAmenityByName(selectedName: string) {
    const r = this.amenityList.find(amenity => amenity.name_en === selectedName);
    if (r) {
      // console.log('empty');
      return '';
    }else {
      // console.log('ss');
      return this.parameter.amenities.find(amenity => amenity.name_en === selectedName);
    }
  }

  removeAmenity(index) {
    this.model.amenities.splice(index, 1);
    this.amenityList.splice(index, 1);
  }


  getBanks() {
    // this.parameter.loading = true;
    this.parameter.url = 'getBanks';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('getBanks', success);
          // this.parameter.loading = false;
          this.parameter.banks = success.data;
        }
        // error => {
        //   // console.log(error);
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   } else {
        //     swal('Error', error.message, 'error');
        //   }
        // }
      );
  }

  addBank(a) {
    const tt = this.getSelectedBankByName(a);
    if (tt) {
      this.bankList.push(tt);
      this.model.banks.push(tt.id);
    }
    this.bank = '';
  }

  addCustomAttribute() {
    const index = this.model.custom_attributes.length - 1;
    if (this.model.custom_attributes[index].name !== '' && this.model.custom_attributes[index].value !== '') {
      this.model.custom_attributes.push({name: '', value: ''});
    } else {
      swal('Error', 'Please fill custom attribute fields', 'error');
    }
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
    this.parameter.url = 'searchBuilding';
    if (keyword === '') {
      swal('Error', 'Please enter some text.', 'error');
    } else {
      // this.parameter.loading = true;
      const input = new FormData();
      input.append('keyword', keyword);

      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            // console.log('searchBuilding', success);
            // this.parameter.loading = false;
            this.parameter.buildings = success.data;
            this.parameter.buildingCount = success.data.length;
            if (this.parameter.buildingCount === 0) { this.showText = true; }
          }
          // error => {
          //   // console.log(error);
          //   this.parameter.loading = false;
          //   if (error.statusCode === 401) {
          //     this.router.navigate(['']);
          //   } else {
          //     swal('Error', error.message, 'error');
          //   }
          // }
        );
    }
  }

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
    this.buildingName = '';
    this.loadPlaces();
  }

  onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {

// console.log('url2', this.url2);

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

  onSelectFile(param, event) {
    //  const dd = this.uploader.onSelectFile(event);
     if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.model[param] = this.url;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {this.model[param] = success.data.image;
        // console.log(this.model);
      }
      );
    }
  }

  onSelectFile1(event) { // called each time file input changes
    // this.uploader.onSelectFile1(event);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
          this.url = e.target.result;
          this.model.cover_image = this.url;
          // this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
          // console.log('this.url, this.image1', this.url, this.image1);
      };
      const input = new FormData();
      input.append('image', event.target.files[0]);

      // this.admin.postDataApi('saveImage', input)
      // .subscribe(
      //   success => {
      //     console.log('successimage', success);
      //     this.model.cover_image = success.data.image;
      //     this.parameter.loading = false;
      //   },
      //   error => {
      //     console.log(error);
      //     this.parameter.loading = false;
      //     swal('Error', error.message, 'error');
      //   });

      reader.readAsDataURL(event.target.files[0]);
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
    // console.log('----------', this.url2, this.imageEvent);
  }

  saveImages() {
    // console.log('----------', this.url2, this.imageEvent);
    const input = new FormData();
    for (let index = 0; index < this.imageEvent.length; index++) {
      input.append('image', this.imageEvent[index]);

      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          // console.log('successimage' + index, success);
          this.model.images.push(success.data.image);
          // this.parameter.loading = false;
        }
        // error => {
        //   // console.log(error);
        //   this.parameter.loading = false;
        //   swal('Error', error.message, 'error');
        // }
      );
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
          // console.log('successimage', success);
          this.model.floor_plan = success.data.image;
          // this.parameter.loading = false;
        }
        // error => {
        //   // console.log(error);
        //   this.parameter.loading = false;
        //   swal('Error', error.message, 'error');
        // }
      );

      // this.model.images = event.target.files;
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addMaritalStatus(checked, i) {
    // console.log('mm', i, checked, this.testMarital[i]);
    this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
    // console.log('atermm', this.testMarital);
  }

  addProperty(formdata: NgForm, tab) {
    // console.log('formdata', formdata);
    // console.log('api', this.model);

    this.model.marital_status = [];
    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === true) {
        this.model.marital_status.push(this.testMarital[index].id);
      }
    }
// console.log(this.model.cover_image, this.model);
    // this.parameter.loading = true;
    this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
    this.model.step = tab - 1;

    if (this.model.cover_image === null || this.model.cover_image === undefined) {
      swal('Error', 'Please choose cover image.', 'error');
    }else if (this.model.floor_plan === null || this.model.floor_plan === undefined) {
      swal('Error', 'Please choose floor plan.', 'error');
    }else if (this.model.amenities.length === 0) {
      swal('Error', 'Please choose amenity.', 'error');
    }else if (this.model.banks.length === 0) {
      swal('Error', 'Please choose bank.', 'error');
    }else {

      const input = new FormData();
      if (this.parameter.property_id) {
        input.append('property_id', this.parameter.property_id);
      }

      // this.model.for_rent = this.model.for_rent == 'true' || this.model.for_rent === '1' ? '1' : '0';
      // this.model.for_sale = this.model.for_sale == 'true' || this.model.for_sale === '1' ? '1' : '0';
      // this.model.carpet_areas = JSON.stringify(this.model.carpet_areas);
      // this.model.images = JSON.stringify(this.model.images);
      // this.model.amenities = JSON.stringify(this.model.amenities);
      // this.model.banks = JSON.stringify(this.model.banks);
      // this.model.marital_status = JSON.stringify(this.model.marital_status);
      // this.model.custom_attributes = JSON.stringify(this.model.custom_attributes);

      input.append('step', this.model.step.toString());
      // if (this.model.step === 1) {
        input.append('for_rent', this.model.for_rent === true ? '1' : '0');
        input.append('for_sale', this.model.for_sale === true ? '1' : '0');
        input.append('country_id', this.model.country_id);
        input.append('state_id', this.model.state_id);
        input.append('city_id', this.model.city_id);
        input.append('locality_id', this.model.locality_id);
        input.append('configuration_id', this.model.configuration_id);
        input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
        input.append('property_type_id', this.model.property_type_id);
      // }

      // if (this.model.step === 2) {
        input.append('cover_image', this.model.cover_image);
        input.append('images', JSON.stringify(this.model.images));
        input.append('floor_plan', this.model.floor_plan);
        input.append('bedroom', this.model.bedroom.toString());
        input.append('bathroom', this.model.bathroom.toString());
        input.append('floor', this.model.floor.toString());
        input.append('parking', this.model.parking.toString());
        input.append('furnished', this.model.furnished.toString());
        input.append('description', this.model.description);
        input.append('quantity', this.model.quantity.toString());
        input.append('amenities', JSON.stringify(this.model.amenities));
        input.append('banks', JSON.stringify(this.model.banks));
      // }
      // if (this.model.step === 3) {
        input.append('pets', this.model.pets.toString());
        input.append('marital_status', JSON.stringify(this.model.marital_status));
      // }
      // if (this.model.step === 4) {
        input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
      // }
// console.log(input);
// console.log('===', this.parameter.property_id);
      // this.parameter.loading = false;
      this.admin.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            // console.log('success', success);
            this.parameter.property_id = success.data.id;
            // this.parameter.loading = false;
            this.tab = tab;
            // this.setModelData(success.data);
            // console.log('this.model.postdataapi', this.model);
          }
          // error => {
          //   this.parameter.loading = false;
          //   swal('Error', error.message, 'error');
          // }
        );
    }
  }

  setBuildingId(building_id) {
    console.log(this.showSearch, this.parameter.buildingCount, this.showText);
    this.building.id = building_id;
  }

  tagBuilding() {

    // this.parameter.loading = true;
    this.parameter.url = 'tagBuilding';

    const input = new FormData();
    if (this.parameter.property_id) {input.append('property_id', this.parameter.property_id); }
    input.append('building_id', this.building.id);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          // console.log('tagBuilding', success);
          // this.parameter.loading = false;
          swal('Property submitted successfully.',
          'You will be notified once your property will be reviewed by them, you can view status in your properties.',
          'success');
          this.router.navigate(['/dashboard/properties/view-properties']);
        }
        // error => {
        //   this.parameter.loading = false;
        //   swal('Error', error.message, 'error');
        // }
      );
  }

  loadPlaces() {
    // console.log('--', this.searchElementRef.nativeElement);
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

          if (place.formatted_address) { this.building.address = place.formatted_address; }
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
    // console.log($event.coords.lat);
    // console.log($event);
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

    // this.parameter.loading = true;
    this.parameter.url = 'buildingRequest';

    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    // const input = new FormData();
    // input.append('name', this.building.name);
    // input.append('address', this.building.address);
    // input.append('lat', this.building.lat.toString());
    // input.append('lng', this.building.lng.toString());

    // if (this.building.dev_name) {input.append('dev_name', this.building.dev_name); }
    // if (this.building.dev_phone) {input.append('dev_name', this.building.dev_phone); }
    // if (this.building.dev_countrycode) {input.append('dev_name', this.building.dev_countrycode); }
    // if (this.building.dev_email) {input.append('dev_name', this.building.dev_email); }

    this.admin.postDataApi(this.parameter.url, this.building)
      .subscribe(
        success => {
          // console.log('buildingRequest', success);
          // this.parameter.loading = false;
          // Your Property is submitted to our Team.
          swal('Property submitted successfully.',
          'You will be notified once your property will be reviewed by them, you can view status in your properties.',
          'success');
          this.router.navigate(['/dashboard/properties/view-properties']);
        }
        // error => {
        //   this.parameter.loading = false;
        //   swal('Error', error.message, 'error');
        // }
      );
  }
}
