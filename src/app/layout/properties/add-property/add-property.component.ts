import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Constant } from '../../../common/constants';
import { AddPropertyModel, Building, PropertyDetails } from '../../../models/addProperty.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [AddPropertyModel, Building, Constant]
})
export class AddPropertyComponent implements OnInit {

  file1: any;

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
  details: any;
  editMode = false;
  newcarpet_area = {area: '', price: ''};
  newcustom_attribute = {name: '', value: ''};

  constructor(public model: AddPropertyModel, private us: AdminService,
    private router: Router, private sanitization: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.details = new PropertyDetails;

    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['edit'] === 'edit') {
        this.editMode = true;
      }
      this.parameter.property_id = params['property_id'];
      if (this.parameter.property_id === '0') {
        this.parameter.property_id = '';
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
        this.showSearch = true;
      } else {
        this.getPropertyById(this.parameter.property_id);
      }
    });

    this.parameter.buildingCount = 0;
    this.initialCountry = {initialCountry: this.constant.initialCountry};

    this.tab = 1;
    this.getCountries('');
    this.getConfigurations();
    this.getPropertyTypes();
    this.getAmenities();
    this.getBanks();
    this.getBuildingSpecificTypes();
    this.getPaymentStatuses();

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
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log(success);
          this.parameter.loading = false;
          this.parameter.propertyDetails = success['data'];
          this.setModelData(success['data']);
          if (this.parameter.propertyDetails.step < 5) {
            this.tab = this.parameter.propertyDetails.step;
          }
          this.url2 = this.parameter.propertyDetails.images.map(op => op.image);
          if (this.url2.length > 0) {
            this.image2  = this.sanitization.bypassSecurityTrustStyle(`url(${this.url2[0]})`);
          }
        }
      );
  }

  setModelData(data) {
    console.log(data);
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
    this.model.property_quantity_details = data.details;

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
    swal({
      html: 'Moving back can reset informations entered on current tab' + '<br>' + 'Are you sure you want to go back?',
      // title: 'Are you sure?',
      // text: 'Moving back can reset informations entered on current tab. Are you sure you want to go back?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.tab = tab;
      }
    });
  }

  showSearchBox() {
    this.showSearch = true;
  }

  onCountryChange(e) {
    this.building.dev_countrycode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  getCountries(keyword) {
    this.parameter.url = 'getCountries';
    this.us.postDataApi(this.parameter.url, {})
      .subscribe(
        success => { this.parameter.countries = success['data']; }
      );
  }

  getStates(country_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'country/getStates';
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.cities = [];
    this.parameter.localities = [];
    const input = new FormData();
    input.append('country_id', country_id);

    this.us.postDataApi(this.parameter.url, input).subscribe(success => {
      this.parameter.states = success['data'];
      this.parameter.loading = false;
    },
    error => {
      this.parameter.loading = false;
    });
  }

  getCities(state_id, keyword) {
    this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.localities = [];
    const input = new FormData();
    input.append('state_id', state_id);

    this.us.postDataApi(this.parameter.url, input).subscribe(success => {
      this.parameter.cities = success['data'];
      this.parameter.loading = false; },
    error => {
        this.parameter.loading = false;
    });
  }


  getLocalities(city_id, keyword= '') {
    this.parameter.url = 'getLocalities';
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {input.append('keyword', keyword); }

    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => { this.parameter.localities = success['data']; }
      );
  }

  setAmenity(id) {
    this.model.amenities = [id];
  }

  setValue(key, value) {
    this.model[key] = value;
  }

  getConfigurations() {
    this.parameter.url = 'getConfigurations';
    const input = new FormData();
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.items = success['data'];
          if (this.parameter.items.length !== 0 && this.parameter.property_id === '') {
            this.model.configuration_id = this.parameter.items[0].id;
          }
        }
      );
  }


  getPropertyTypes() {
    this.parameter.url = 'getPropertyTypes';
    const input = new FormData();
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.propertyTypes = success['data'];
          if (this.parameter.propertyTypes.length !== 0 && this.parameter.property_id === '') {
            this.model.property_type_id = this.parameter.propertyTypes[0].id;
          }
        }
      );
  }

  getAmenities() {
    this.parameter.url = 'getPropertyAmenities';
    const input = new FormData();
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => { this.parameter.amenities = success['data']; }
      );
  }

  addAmenity(a, i) {
    const tt = this.getSelectedAmenityByName(a);
    this.parameter.amenities.splice(i, 1);
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

  removeAmenity(amenity, index) {
    this.parameter.amenities.push(amenity);
    this.model.amenities.splice(index, 1);
    this.amenityList.splice(index, 1);
  }


  getBanks() {
    this.parameter.url = 'getBanks';
    const input = new FormData();
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => { this.parameter.banks = success['data']; }
      );
  }

  getBuildingSpecificTypes() {
    this.parameter.url = 'getBuildingSpecificTypes';
    const input = new FormData();
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => { this.parameter.buildingSpecificTypes = success['data']; }
      );
  }

  getPaymentStatuses() {
    this.parameter.url = 'getPaymentStatuses';
    const input = new FormData();
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => { this.parameter.paymentStatuses = success['data']; }
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

 addCarpetArea() {
    if (this.newcarpet_area.area === '' || this.newcarpet_area.price === '') {
      swal('Error', 'Please fill carpet area fields', 'error');
    } else {
      this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));
      this.newcarpet_area = {area: '', price: ''};
    }
  }

  addCustomAttribute() {
    if (this.newcustom_attribute.name === '' || this.newcustom_attribute.value === '') {
      swal('Error', 'Please fill custom attribute fields', 'error');
    } else {
      this.model.custom_attributes.push(this.newcustom_attribute);
      this.newcustom_attribute = {name: '', value: ''};
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
    this.showBuilding = false;
    this.parameter.url = 'searchBuilding';
    if (keyword === '') {
      swal('Error', 'Please enter some text.', 'error');
    } else {
      const input = new FormData();
      input.append('keyword', keyword);

      this.us.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.buildings = success['data'];
            this.parameter.buildingCount = success['data'].length;
            if (this.parameter.buildingCount === 0) { this.showText = true; }
          }
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

console.log('url2', this.url2);

      if (this.url2.length > 6 || event.target.files.length > 6) {
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

      const input = new FormData();
      input.append('image', event.target.files[0]);
      this.us.postDataApi('saveImage', input).subscribe(
        success => {this.model[param] = success['data'].image;
        // console.log(this.model);
      });

    }
  }


  closeModal() {
    this.modalClose.nativeElement.click();
    // this.image2 = '';
    // this.url2 = [];
    // this.imageEvent = [];
    // this.model.images = [];
  }

  removeImage(index) {
    this.url2.splice(index, 1);
    this.imageEvent.splice(index, 1);
    this.model.images.splice(index, 1);
  }

  saveImages() {
    const input = new FormData();
    for (let index = 0; index < this.imageEvent.length; index++) {
      input.append('image', this.imageEvent[index]);

      this.us.postDataApi('saveImage', input)
      .subscribe(
        success => { this.model.images.push(success['data'].image); }
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

      this.us.postDataApi('saveImage', input)
      .subscribe(
        success => { this.model.floor_plan = success['data'].image; }
      );

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addMaritalStatus(checked, i) {
    this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
  }

  addProperty(formdata: NgForm, tab) {

    this.model.marital_status = [];
    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === true) {
        this.model.marital_status.push(this.testMarital[index].id);
      }
    }

    this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
    this.model.step = tab - 1;

    if (this.model.carpet_areas.length < 1 && this.tab === 1) {
      swal('Error', 'Please add carpet area.', 'error');
    }else if ((this.model.cover_image === null || this.model.cover_image === undefined) && (this.model.step === 2)) {
      swal('Error', 'Please choose cover image.', 'error');
    }else if ((this.model.floor_plan === null || this.model.floor_plan === undefined) && (this.model.step === 2)) {
      swal('Error', 'Please choose floor plan.', 'error');
    }else if ((this.model.amenities.length === 0) && (this.model.step === 2)) {
      swal('Error', 'Please choose amenity.', 'error');
    }else {
      const input = new FormData();
      if (this.parameter.property_id) {
        input.append('property_id', this.parameter.property_id);
      }

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
        input.append('bedroom', this.model.bedroom.toString());
        input.append('bathroom', this.model.bathroom.toString());
        input.append('floor', this.model.floor.toString());
        input.append('parking', this.model.parking.toString());
        input.append('furnished', this.model.furnished.toString());
        input.append('description', this.model.description);
        input.append('quantity', this.model.quantity.toString());
        input.append('amenities', JSON.stringify(this.model.amenities));
        input.append('banks', JSON.stringify(this.model.banks));
        input.append('property_quantity_details', JSON.stringify(this.model.property_quantity_details));
       }
       if (this.model.step === 3) {
        input.append('pets', this.model.pets.toString());
        input.append('marital_status', JSON.stringify(this.model.marital_status));
       }
       if (this.model.step === 4) {
        input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
       }
      console.log('INPUT=>', input);
      this.us.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            console.log(success);
            this.parameter.property_id = success['data'].id;
            this.tab = tab;
          }
        );
    }
  }

  setBuildingId(building_id) {
    this.building.id = building_id;
  }

  tagBuilding() {

    this.parameter.url = 'tagBuilding';

    const input = new FormData();
    if (this.parameter.property_id) {input.append('property_id', this.parameter.property_id); }
    input.append('building_id', this.building.id);

    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          swal('Submitted successfully.',
          'You will be notified once your property will be reviewed by them, you can view status in your properties.',
          'success');
          this.router.navigate(['/dashboard/properties/view-properties']);
        }
      );
  }

  loadPlaces() {

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

    this.parameter.url = 'buildingRequest';
    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    this.us.postDataApi(this.parameter.url, this.building)
      .subscribe(
        success => {
          swal('Submitted successfully.',
          'You will be notified once your property will be reviewed by them, you can view status in your properties.',
          'success');
          this.router.navigate(['/dashboard/properties/view-properties']);
        }
      );
  }

  addPropertyDetails() {
    this.model.property_quantity_details.push(JSON.parse(JSON.stringify(this.details)));
    this.details = new PropertyDetails;
  }

  checkEmptyDetails() {
    for (const item of this.details){
      if (item === '') {return false; }
    }
    return true;
  }

  removeDetails(i) {
    this.model.property_quantity_details.splice(i, 1);
  }

}
