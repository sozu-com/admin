import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonService } from '../../../services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Constant } from '../../../common/constants';
import { FileUpload } from './../../../common/fileUpload';
import { AddPropertyModel, Building, PropertyDetails } from '../../../models/addProperty.model';
import { HttpInterceptor } from '../../../services/http-interceptor';
import { AddProjectModel, Towers } from 'src/app/models/addProject.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor]
})
export class AddPropertyComponent implements OnInit {

  file2: any;

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
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
  selectedGuest: any;
  image1: any;
  image2: any;
  image3: any;
  showBuilding = false;
  amenityList = [];
  amen = '';
  bankList = [];
  bank = '';
  testMarital = [
    {
      id: 1,
      name: 'Married',
      checked: false
    },
    {
      id: 2,
      name: 'Unmarried',
      checked: false
    },
    {
      id: 3,
      name: 'Divorced',
      checked: false
    }
  ];
  imageEvent = [];
  showText = false;
  showSearch = false;
  buildingName = '';
  initialCountry: any;
  propertyDetails = false;
  details: any;
  editMode = false;
  newcarpet_area = { area: '', price: '' };
  newcustom_attribute = { name: '', value: '' };
  buildingLoading = false;
  buildingData: AddProjectModel;
  searchedBuildings: Array<AddProjectModel>;
  selectedBuilding: AddProjectModel;
  selectedTower: Towers;

  constructor(public model: AddPropertyModel, private us: AdminService, private cs: CommonService,
    private router: Router, private sanitization: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute,
    private http: HttpInterceptor) { }

  ngOnInit() {
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.parameter.amenities = [];
    this.parameter.banks = [];
    this.http.loader.next({ value: true });
    this.details = new PropertyDetails;

    this.file2 = new FileUpload(false, this.us);

    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['seller_id'] !== '0') {
        this.parameter.seller_id = params['seller_id'];
      }
      if (params['edit'] === 'edit') {
        this.editMode = true;
      }
      this.parameter.property_id = params['property_id'];
      if (this.parameter.property_id === '0') {
        this.parameter.property_id = '';
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
        this.showSearch = true;
        this.parameter.propertyDetails = new AddPropertyModel();
      } else {
        this.getPropertyById(this.parameter.property_id);
      }
      console.log(params);
    });

    this.parameter.buildingCount = 0;
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    this.building.dev_countrycode = this.constant.dial_code;

    this.tab = 0;
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

  getPropertyById(property_id) {
    this.parameter.loading = true;
    this.parameter.url = 'getPropertyById';
    const input = new FormData();
    input.append('property_id', property_id);
    this.parameter.loading = true;
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          console.log(success);
          this.parameter.loading = false;
          this.parameter.propertyDetails = success['data'];
          this.setModelData(success['data']);
          if (this.parameter.propertyDetails.step < 5) {
            this.tab = this.parameter.propertyDetails.step;
          }
          this.url2 = this.parameter.propertyDetails.images.map(op => op.image);
          if (this.url2.length > 0) {
            this.image2 = this.url2[0];
          }
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  setModelData(data) {
    console.log(data);
    this.model.id = data.id;
    this.model.name = data.name;
    this.model.property_price = data.property_price;


    this.model.building_id = data.building_id;
    this.model.building_towers_id = data.building_towers_id;
    this.model.floor_num = data.floor_num;

    this.model.pets = data.pets;
    this.model.kids_friendly = data.kids_friendly;
    this.model.students_friendly = data.students_friendly;
    this.model.lgtb_friendly = data.lgtb_friendly;
    this.model.mature_people_friendly = data.mature_people_friendly;

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
    this.model.images = data.images;

    this.model.for_hold = data.for_hold === 1 ? true : false;
    this.model.half_bathroom = data.half_bathroom;


    this.building.id = data.building ? data.building.id : '';
    this.building.name = data.building ? data.building.name : '';
    if (this.building.id === '') {
      this.showSearch = true;
    }
    for (let index = 0; index < data.amenities.length; index++) {
      console.log(data.amenities[index]);
      this.addAmenity(data.amenities[index]);
    }

    for (let index = 0; index < data.banks.length; index++) {
      console.log(data.banks[index]);
      this.addBank(data.banks[index]);
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
      this.model.carpet_areas[index] = { area: element.area, price: element.price };
    }

    for (let index = 0; index < data.custom_values.length; index++) {
      const element = data.custom_values[index];
      this.model.custom_attributes[index] = { name: element.name, value: element.value };
    }
    console.log(this.showSearch, this.building.id);
  }

  setTab(tab) {
    swal({
      title: 'Are you sure?',
      text: 'Moving back can reset information entered on current tab.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
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
    this.initialCountry = { initialCountry: e.iso2 };
  }

  getCountries(keyword) {
    this.parameter.url = 'getCountries';
    this.us.postDataApi(this.parameter.url, {})
      .subscribe(
        success => { this.parameter.countries = success['data']; }
      );
  }

  getStates(country_id, keyword) {
    // this.parameter.loading = true;
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
      // this.parameter.loading = false;
    },
      error => {
        // this.parameter.loading = false;
      });
  }

  getCities(state_id, keyword) {
    // this.parameter.loading = true;
    this.parameter.url = 'getCities';
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.localities = [];
    const input = new FormData();
    input.append('state_id', state_id);

    this.us.postDataApi(this.parameter.url, input).subscribe(success => {
      this.parameter.cities = success['data'];
      // this.parameter.loading = false;
    },
      error => {
        // this.parameter.loading = false;
      });
  }


  getLocalities(city_id, keyword = '') {
    this.parameter.url = 'getLocalities';
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) { input.append('keyword', keyword); }

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

  addAmenity(amen) {
    if (!amen) {
      return false;
    }
    const index = this.amenityList.findIndex(x => x.id == amen.id);
    if (index < 0) {
      this.model.amenities.push(amen.id);
      this.amenityList.push(amen);

      const removeIndex = this.parameter.amenities.findIndex(x => x.id == amen.id);
      this.parameter.amenities.splice(removeIndex, 1);
    }
  }

  getSelectedAmenityByName(selectedName: string) {
    const r = this.amenityList.find(amenity => amenity.name_en === selectedName);
    if (r) {
      return '';
    } else {
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
  addBank(bank) {
    if (!bank) {
      return false;
    }
    const index = this.bankList.findIndex(x => x.id == bank.id);
    if (index < 0) {
      this.model.banks.push(bank.id);
      this.bankList.push(bank);
      const removeIndex = this.parameter.banks.findIndex(x => x.id == bank.id);
      this.parameter.banks.splice(removeIndex, 1);
    }
  }

  removeBank(bank, index) {
    this.parameter.banks.push(bank);
    this.model.banks.splice(index, 1);
    this.bankList.splice(index, 1);
  }

  addCarpetArea() {
    if (!this.newcarpet_area.area || !this.newcarpet_area.price) {
      swal('Error', 'Please fill carpet area fields', 'error');
    } else {
      this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));
      this.newcarpet_area = { area: '', price: '' };
    }
  }

  addCustomAttribute() {
    if (!this.newcustom_attribute.name || !this.newcustom_attribute.value) {
      swal('Error', 'Please fill custom attribute fields', 'error');
    } else {
      this.model.custom_attributes.push(this.newcustom_attribute);
      this.newcustom_attribute = { name: '', value: '' };
    }
  }

  getSelectedBankByName(selectedName: string) {
    const r = this.bankList.find(bank => bank.name === selectedName);
    if (r) {
      return '';
    } else {
      return this.parameter.banks.find(bank => bank.name === selectedName);
    }
  }


  searchBuilding(keyword: string) {
    if (!keyword) { swal('Error', 'Please enter some text.', 'error'); return false; }

    this.showBuilding = false;
    this.buildingLoading = true;
    this.parameter.url = 'searchBuilding';

    const input = new FormData();
    input.append('keyword', keyword);

    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.searchedBuildings = success['data'];
          this.parameter.buildingCount = success['data'].length;
          if (this.parameter.buildingCount === 0) { this.showText = true; }
          this.buildingLoading = false;
        },
        error => {
          this.buildingLoading = true;
        }
      );
  }

  getPage(page: number) {
    this.parameter.page = page;
  }

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
    this.buildingName = '';
    this.loadPlaces();
  }

  onSelectFile2(event) {
    if (event.target.files && event.target.files[0]) {
      if ((this.url2.length + event.target.files.length) > 6 || event.target.files.length > 6) {
        swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      } else {
        for (let index = 0; index < event.target.files.length; index++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageEvent.push(event.target.files[index]);
            this.url2.push(e.target.result);
            const tempurl = e.target.result;
            this.image2 = tempurl;
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
        success => {
          this.model[param] = success['data'].image;
          // console.log(this.model);
        });

    }
  }

  modelOpenFun() {
    this.modalOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
  }

  modelCloseFun() {
    this.modalClose.nativeElement.click();
  }

  saveImages() {
    this.http.loader.next({ value: true });
    console.log('sss');
    if (this.file2.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error'); return false;
    }
    this.modalClose.nativeElement.click();
    this.file2.upload().then(r => {
      console.log('resolved');
      this.model.images = this.file2.files;
      this.http.loader.next({ value: false });
    });
  }

  file2Select($event) {
    if ((this.file2.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.file2.onSelectFile($event);
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
    console.log('tab', tab);
    this.model.floor = 0; // now static
    this.model.marital_status = [];
    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === true) {
        this.model.marital_status.push(this.testMarital[index].id);
      }
    }

    this.parameter.url = this.model.id !== '' ? 'addProperty' : 'addProperty';
    this.model.step = tab - 1;

    if (this.model.carpet_areas.length < 1 && this.tab == 1) {
      swal('Error', 'Please add carpet area.', 'error');
    } else if ((this.model.cover_image === null || this.model.cover_image === undefined) && (this.model.step == 2)) {
      swal('Error', 'Please choose cover image.', 'error');
    } else if ((this.model.floor_plan === null || this.model.floor_plan === undefined) && (this.model.step == 2)) {
      swal('Error', 'Please choose floor plan.', 'error');
    } else if ((this.model.amenities.length === 0) && (this.model.step == 2)) {
      swal('Error', 'Please choose amenity.', 'error');
    } else if ((this.model.marital_status.length === 0) && (this.model.step == 3)) {
      swal('Error', 'Please choose marital status.', 'error');
    } else {
      const input = new FormData();
      if (this.parameter.property_id) {
        input.append('property_id', this.parameter.property_id);
      }
      if (this.parameter.seller_id && this.parameter.seller_id !== '0') {
        input.append('seller_id', this.parameter.seller_id);
      }
      input.append('step', this.model.step.toString());
      if (this.model.step === 1) {
        input.append('name', this.model.name);
        input.append('for_sale', this.model.for_sale === true ? '1' : '0');
        input.append('for_rent', this.model.for_sale === true ? '0' : '1');
        // input.append('for_hold', this.model.for_sale === true ? '0' : '0');
        input.append('for_hold', '0');
        input.append('country_id', this.model.country_id);
        input.append('state_id', this.model.state_id);
        input.append('city_id', this.model.city_id);
        input.append('locality_id', this.model.locality_id);
        input.append('configuration_id', this.model.configuration_id);
        input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
        input.append('property_type_id', this.model.property_type_id);
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('building_towers_id', this.model.building_towers_id);
        input.append('floor_num', this.model.floor_num);
      }

      if (this.model.step === 2) {
        const imagesString = this.model.images.map(r => r.image);
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('images', JSON.stringify(imagesString));
        input.append('cover_image', this.model.cover_image);
        input.append('floor_plan', this.model.floor_plan);
        input.append('bedroom', this.model.bedroom.toString());
        input.append('bathroom', this.model.bathroom.toString());
        input.append('half_bathroom', this.model.half_bathroom.toString());
        input.append('floor', this.model.floor.toString());
        input.append('property_price', this.model.property_price.toString());
        input.append('parking', this.model.parking.toString());
        input.append('furnished', this.model.furnished.toString());
        input.append('description', this.model.description);
        input.append('quantity', this.model.quantity.toString());
        input.append('amenities', JSON.stringify(this.model.amenities));
        input.append('banks', JSON.stringify(this.model.banks));
        input.append('property_quantity_details', JSON.stringify(this.model.property_quantity_details));
      }
      if (this.model.step === 3) {
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('pets', this.model.pets.toString());
        input.append('kids_friendly', this.model.kids_friendly.toString());
        input.append('students_friendly', this.model.students_friendly.toString());
        input.append('lgtb_friendly', this.model.lgtb_friendly.toString());
        input.append('mature_people_friendly', this.model.mature_people_friendly.toString());
        input.append('marital_status', JSON.stringify(this.model.marital_status));
      }
      if (this.model.step === 4) {
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('custom_attributes', JSON.stringify(this.model.custom_attributes));
      }
      console.log('INPUT=>', input);
      this.parameter.loading = true;
      this.us.postDataApi(this.parameter.url, input)
        .subscribe(
          success => {
            this.parameter.loading = false;
            console.log(success);
            this.parameter.loading = false;
            if (this.model.step.toString() === '4') {
              swal('Submitted successfully.',
              'You will be notified once your property will be reviewed by them, you can view status in your properties.',
              'success');
              if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
                this.router.navigate(['/dashboard/properties/view-properties']);
              }
            }
            this.parameter.property_id = success['data'].id;
            this.tab = tab;
          }, error => {
            this.parameter.loading = false;
          }
        );
    }
  }

  setBuildingId(building: any) {
    this.selectedBuilding = building;
    this.building.id = building.id;
    this.model.building_id = building.id;
  }

  setTower(tower: Towers) {
    this.selectedTower = tower;
    this.model.building_towers_id = tower.id;
    this.selectedTower.floor_array = [];
    for (let index = 0; index <= this.selectedTower.num_of_floors; index++) {
        this.selectedTower.floor_array.push(index);
    }
  }

  setFloor(floor_num: any) {
    this.model.floor_num = floor_num;
  }

  tagBuilding() {

    this.parameter.url = 'tagBuilding';

    const input = new FormData();
    if (this.parameter.property_id) { input.append('property_id', this.parameter.property_id); }
    input.append('building_id', this.building.id);

    this.parameter.loading = true;
    this.us.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal('Submitted successfully.',
            'You will be notified once your property will be reviewed by them, you can view status in your properties.',
            'success');
          if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
            this.router.navigate(['/dashboard/properties/view-properties']);
          }
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  getProjectById(step: number) {
    this.us.postDataApi('getProjectByIdWithCSC', { building_id: this.building.id })
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.buildingData = success['data'];
          // this.parameter.propertyDetails.building = this.buildingData;
          this.parameter.propertyDetails.images = this.buildingData.images;
          this.parameter.propertyDetails.amenities = this.buildingData.amenities;
          // this.parameter.items = this.buildingData.configurations;
          this.parameter.items = [];
          this.buildingData.configurations.forEach(element => {
            // adding configurations
            this.parameter.items.push(element.config);
            // adding carpet area and price
            const obj = {
              area: element.carpet_area,
              price: element.base_price
            };
            this.model.carpet_areas.push(obj);
            if (success['data'].locality.id) {
              this.getStates(success['data'].locality.city.state.country.id, '');
              this.getCities(success['data'].locality.city.state.id, '');
              this.getLocalities(success['data'].locality.city.id, '');

              this.model.country_id = success['data'].locality.city.state.country.id;
              this.model.state_id = success['data'].locality.city.state.id;
              this.model.city_id = success['data'].locality.city.id;
              this.model.locality_id = success['data'].locality.id;
            }
          });
          this.parameter.propertyDetails.custom_values = this.buildingData.custom_values;
          this.tab = step + 1;
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  loadPlaces() {

    this.latitude = 0;
    this.longitude = 0;
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
      this.parameter.loading = true;
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
        this.parameter.loading = false;
      });
    }
  }


  buildingRequest() {

    if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
      swal('Error', 'Please fill complete devloper information', 'error'); return false;
    }

    if (!this.latitude && !this.longitude) {
      swal('Error', 'Please select location from the dropdown list.', 'error');
      return false;
    }

    this.parameter.url = 'buildingRequest';
    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    if (!this.building.lat || !this.building.lng) {
      swal('Error', 'Please select location', 'error'); return false;
    }
    console.log(this.building);
    this.parameter.loading = true;
    this.us.postDataApi(this.parameter.url, this.building)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal('Submitted successfully.',
            'You will be notified once your property will be reviewed by them, you can view status in your properties.',
            'success');
          if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
            this.router.navigate(['/dashboard/properties/view-properties']);
          }
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  addPropertyDetails() {
    this.model.property_quantity_details.push(JSON.parse(JSON.stringify(this.details)));
    this.details = new PropertyDetails;
  }

  checkEmptyDetails() {
    for (const item of this.details) {
      if (item == '') { return false; }
    }
    return true;
  }

  removeDetails(i) {
    this.model.property_quantity_details.splice(i, 1);
  }

  clickOnSale() {
    console.log(this.model.for_sale);
  }
}
