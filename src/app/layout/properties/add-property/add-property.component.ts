import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
// import {AdminService} from '../../../services/admin.service';
// import {CommonService} from '../../../services/common.service';
// import {Router, ActivatedRoute} from '@angular/router';
// import {IProperty} from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
// import {Constant} from '../../../common/constants';
// import {FileUpload} from './../../../common/fileUpload';
// import {AddPropertyModel, Building, PropertyDetails} from '../../../models/addProperty.model';
// import {HttpInterceptor} from '../../../services/http-interceptor';
import { AddProjectModel, Towers, Configuration } from 'src/app/models/addProject.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddPropertyModel, PropertyDetails, Building } from 'src/app/models/addProperty.model';
// import { Building } from 'src/app/models/global.model';
import { Constant } from 'src/app/common/constants';
import { FileUpload } from 'src/app/common/fileUpload';
import { VideoUpload } from 'src/app/common/videoUpload';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpInterceptor } from 'src/app/services/http-interceptor';
import { from } from 'rxjs';

declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor]
})
export class AddPropertyComponent implements OnInit {

  file2: FileUpload;
  file360: FileUpload;
  amenMoreImg: FileUpload;
  amen360Img: FileUpload;
  amenVideo: VideoUpload;

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalOpen360Img') modalOpen360Img: ElementRef;
  @ViewChild('modalClose360Img') modalClose360Img: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('modalAmenClose') modalAmenClose: ElementRef;
  @ViewChild('modalAmenOpen') modalAmenOpen: ElementRef;
  @ViewChild('modalAddMoreVideos') modalAddMoreVideos: ElementRef;
  @ViewChild('modalVideosClose') modalVideosClose: ElementRef;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  name: string;

  url: File;
  url2 = [];
  urlImg360 = [];
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
  availabilityStatus = [
    { id: '1', name: 'Buy', checked: false },
    { id: '2', name: 'Rent', checked: false },
    { id: '3', name: 'Inventory', checked: false }];
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

  video: any;
  image: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  videoSrc: any;
  num_of_property: any;
  property_names: Array<any>;
  amenity_index: number;
  amenity_obj: any;

  constructor(public model: AddPropertyModel, private us: AdminService, private cs: CommonService,
    private router: Router, private sanitization: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute,
    private http: HttpInterceptor,
    private spinner: NgxSpinnerService,
    private element: ElementRef) {
  }

  ngOnInit() {
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.parameter.amenities = [];
    this.parameter.banks = [];
    this.http.loader.next({ value: true });
    this.details = new PropertyDetails;

    this.file2 = new FileUpload(false, this.us);
    this.file360 = new FileUpload(false, this.us);
    this.amenMoreImg = new FileUpload(false, this.us);
    this.amen360Img = new FileUpload(false, this.us);
    this.amenVideo = new VideoUpload(false, this.us);

    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['seller_id'] !== '0') {
        this.parameter.seller_id = params['seller_id'];
      }
      if (params['edit'] === 'edit') {
        this.editMode = true;
      }
      this.parameter.property_id = params['property_id'];
      if (this.parameter.property_id === '0') {

        this.us.postDataApi('getPropertyAmenities', {}).subscribe(res => {
          this.parameter.amenities = res.data.map(item => {
            item.selected = false;
            item.images = [];
            item.images_360 = [];
            item.images_360 = [];
            item.videos = [];
            return item;
          });
        });

        this.parameter.property_id = '';
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
        this.model.availabilityStatusId = this.availabilityStatus[2].id;
        this.availabilityStatus[2].checked = true;
        // set 0 bcz optional
        this.model.quantity = 0;
        this.model.half_bathroom = 0;
        this.model.property_price = 0;
        this.showSearch = true;
        this.parameter.propertyDetails = new AddPropertyModel();
      } else {
        this.getPropertyById(this.parameter.property_id);
      }
    });

    this.parameter.buildingCount = 0;
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    this.building.dev_countrycode = this.constant.dial_code;

    this.tab = 0;
    this.getCountries('');
    // this.getConfigurations();
    this.getPropertyTypes();
    this.getPropertyAmenities();
    // this.getBanks();
    // this.getBuildingSpecificTypes();
    // this.getPaymentStatuses();

    // set google maps defaults
    this.zoom = 4;
    // create search FormControl
    this.searchControl = new FormControl();
    // set current position
    this.setCurrentPosition();
  }

  setAvailableStatus(aindex: number) {
    // this.availabilityStatus[aindex].checked = !this.availabilityStatus[aindex].checked;
    // handling this way because data already added in db
    if (aindex === 0) {
      this.availabilityStatus[0].checked = true;
      this.availabilityStatus[1].checked = false;
      this.availabilityStatus[2].checked = false;
      this.model.availabilityStatusId = this.availabilityStatus[0].id;
    } else if (aindex === 1) {
      this.availabilityStatus[0].checked = false;
      this.availabilityStatus[1].checked = true;
      this.availabilityStatus[2].checked = false;
      this.model.availabilityStatusId = this.availabilityStatus[1].id;
    } else {
      this.availabilityStatus[0].checked = false;
      this.availabilityStatus[1].checked = false;
      this.availabilityStatus[2].checked = true;
      this.model.availabilityStatusId = this.availabilityStatus[2].id;
    }
  }

  getPropertyById(property_id) {
    this.spinner.show();
    const input = new FormData();
    input.append('property_id', property_id);
    this.spinner.show();
    this.us.postDataApi('getPropertyById', input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.spinner.hide();
          this.parameter.propertyDetails = success['data'];
          this.setModelData(success['data']);
          if (this.parameter.propertyDetails.step < 5) {
            this.tab = this.parameter.propertyDetails.step;
          }
          this.url2 = this.parameter.propertyDetails.images.map(op => op.image);
          if (this.url2.length > 0) {
            this.image2 = this.url2[0];
          }
          // set 360 images
          this.urlImg360 = this.parameter.propertyDetails.images360.map(op => op.image);
          if (this.urlImg360.length > 0) {
            this.image2 = this.urlImg360[0];
          }
          // set configuarations
          this.parameter.items = [];
          success['data'].building.configurations.forEach(element => {
            // adding configurations
            this.parameter.items.push(element);
          });
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getProjectById(step: number) {
    if (!this.building.id) {
      swal('Error', 'Please select building.', 'error');
      return false;
    }
    if (!this.model.floor_num) {
      swal('Error', 'Please select floor.', 'error');
      return false;
    }
    this.us.postDataApi('getProjectByIdWithCSC', { building_id: this.building.id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.buildingData = success['data'];
          this.parameter.propertyDetails.images = this.buildingData.images;
          this.parameter.propertyDetails.amenities = this.buildingData.amenities;
          this.parameter.items = [];
          this.buildingData.configurations.forEach(element => {
            // adding configurations
            this.parameter.items.push(element);
            // adding carpet area and price
            const obj = {
              area: element.carpet_area,
              price: element.base_price
            };
            this.model.carpet_areas.push(obj);
          });
          // this.model.cover_image = this.buildingData.main_image;
          if (success['data'].locality.id) {
            // this.getStates(success['data'].locality.city.state.country.id, '');
            // this.getCities(success['data'].locality.city.state.id, '');
            // this.getLocalities(success['data'].locality.city.id, '');

            this.model.country_id = success['data'].locality.city.state.country.id;
            this.model.state_id = success['data'].locality.city.state.id;
            this.model.city_id = success['data'].locality.city.id;
            this.model.locality_id = success['data'].locality.id;
          }
          this.model.pets = success['data'].pets !== null ? success['data'].pets : '1';
          this.model.kids_friendly = success['data'].kids_friendly !== null ? success['data'].kids_friendly : '1';
          this.model.students_friendly = success['data'].students_friendly !== null ? success['data'].students_friendly : '1';
          this.model.lgtb_friendly = success['data'].lgtb_friendly !== null ? success['data'].lgtb_friendly : '1';
          this.model.mature_people_friendly = success['data'].mature_people_friendly !== null ?
            success['data'].mature_people_friendly : '1';

          for (let index = 0; index < this.testMarital.length; index++) {
            if (success['data'].marital_statuses.length !== 0) {
              for (let i = 0; i < success['data'].marital_statuses.length; i++) {
                if (this.testMarital[index].name === success['data'].marital_statuses[i].name_en) {
                  this.testMarital[index].checked = true;
                }
              }
            } else {
              this.testMarital[0].checked = true;
            }
            // this.model.marital_status[index] = data.marital_status[index].id;
          }

          this.parameter.propertyDetails.custom_values = this.buildingData.custom_values;
          this.tab = step + 1;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  setModelData(data) {
    this.model.id = data.id;
    this.model.name = data.name;
    this.model.property_price = data.property_price;
    this.model.is_property_sold = data.is_property_sold;
    if (data.is_property_sold) {
      this.setAvailableStatus(2);
      // this.model.availabilityStatusId = this.availabilityStatus[2].id;
    } else if (data.for_rent) {
      this.setAvailableStatus(1);
      // this.model.availabilityStatusId = this.availabilityStatus[1].id;
    } else {
      this.setAvailableStatus(0);
      // this.model.availabilityStatusId = this.availabilityStatus[0].id;
    }
    this.model.amenities = data.amenities;
    this.model.building_id = data.building_id;
    this.model.building_towers_id = data.building_towers_id;
    this.model.floor_num = data.floor_num;
    this.model.pets = data.pets !== null ? data.pets : '1';
    this.model.kids_friendly = data.kids_friendly !== null ? data.kids_friendly : '1';
    this.model.students_friendly = data.students_friendly !== null ? data.students_friendly : '1';
    this.model.lgtb_friendly = data.lgtb_friendly !== null ? data.lgtb_friendly : '1';
    this.model.mature_people_friendly = data.mature_people_friendly !== null ? data.mature_people_friendly : '1';

    // this.model.for_rent = data.for_rent === 1 ? true : false;
    // this.model.for_sale = data.for_sale === 1 ? true : false;
    // this.getStates(data.locality.city.state.country.id, '');
    // this.getCities(data.locality.city.state.id, '');
    // this.getLocalities(data.locality.city.id, '');

    this.model.locality_id = data.locality.id;
    this.model.city_id = data.locality.city.id;
    this.model.state_id = data.locality.city.state.id;
    this.model.country_id = data.locality.city.state.country.id;

    this.model.configuration_id = data.configuration ? data.configuration.id : '';
    this.model.building_configuration_id = data.building_configuration_id ? data.building_configuration_id : '';
    this.model.property_type_id = data.property_type ? data.property_type.id : '';

    // images
    this.model.floor_plan = data.floor_plan;
    this.model.cover_image = data.image;
    this.model.images = data.images;
    this.model.images360 = data.images360;
    this.model.videos = data.videos;

    this.model.description = data.description;
    this.model.quantity = data.quantity;
    this.model.floor = data.floor;
    this.model.bedroom = data.configuration && data.configuration.bedroom ? data.configuration.bedroom : data.bedroom;
    this.model.bathroom = data.configuration && data.configuration.bathroom ? data.configuration.bathroom : data.bathroom;
    this.model.half_bathroom = data.configuration && data.configuration.bathroom ? data.configuration.half_bathroom : data.half_bathroom;
    this.model.parking = data.parking;

    this.model.parking_count = data.parking_count;
    this.model.parking_for_sale = data.parking_for_sale;
    this.model.furnished = data.furnished;
    this.model.property_quantity_details = data.details;

    this.model.for_hold = data.for_hold === 1 ? true : false;

    this.building.id = data.building ? data.building.id : '';
    this.building.name = data.building ? data.building.name : '';
    this.model.building_towers = data.building_towers ? data.building_towers : {};
    if (this.building.id === '') {
      this.showSearch = true;
    }


    this.us.postDataApi('getPropertyAmenities', {}).subscribe(res => {
      this.parameter.amenities = res.data.map(item => {
        item.selected = false;
        item.images = [];
        item.images_360 = [];
        item.images_360 = [];
        item.videos = [];
        return item;
      });

      for (let index = 0; index < this.parameter.amenities.length; index++) {
        if (this.model.amenities && this.model.amenities.length > 0) {
          for (let i = 0; i < this.model.amenities.length; i++) {
            if (this.model.amenities[i].id === this.parameter.amenities[index].id) {
              this.parameter.amenities[index].selected = true;
              const pivot = this.model.amenities[i]['pivot'];
              this.parameter.amenities[index].images = pivot.images ? pivot.images : [];
              this.parameter.amenities[index].images_360 = pivot.images_360 ? pivot.images_360 : [];
              this.parameter.amenities[index].videos = pivot.videos ? pivot.videos : [];
            }
          }
        }
      }
    });
    // for (let index = 0; index < data.amenities.length; index++) {
    //   this.addAmenity(data.amenities[index]);
    // }

    for (let index = 0; index < data.banks.length; index++) {
      this.addBank(data.banks[index]);
    }


    for (let index = 0; index < this.testMarital.length; index++) {
      if (data.marital_statuses.length !== 0) {
        for (let i = 0; i < data.marital_statuses.length; i++) {
          if (this.testMarital[index].name === data.marital_statuses[i].name_en) {
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
      this.newcarpet_area = { area: element.area, price: element.price };
    }

    for (let index = 0; index < data.custom_values.length; index++) {
      const element = data.custom_values[index];
      this.model.custom_attributes[index] = { name: element.name, value: element.value };
    }
  }

  setTab(tab: any) {
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

  getCountries(keyword: string) {
    this.us.postDataApi('getCountries', {})
      .subscribe(
        success => {
          this.parameter.countries = success['data'];
        }
      );
  }

  getStates(country_id: any, keyword: string) {
    // this.spinner.show();
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.cities = [];
    this.parameter.localities = [];
    const input = new FormData();
    input.append('country_id', country_id);

    this.us.postDataApi('country/getStates', input).subscribe(success => {
      this.parameter.states = success['data'];
      // this.spinner.hide();
    },
      error => {
        // this.spinner.hide();
      });
  }

  getCities(state_id: any, keyword: string) {
    // this.spinner.show();
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.localities = [];
    const input = new FormData();
    input.append('state_id', state_id);

    this.us.postDataApi('getCities', input).subscribe(success => {
      this.parameter.cities = success['data'];
      // this.spinner.hide();
    },
      error => {
        // this.spinner.hide();
      });
  }


  getLocalities(city_id: any, keyword = '') {
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) {
      input.append('keyword', keyword);
    }

    this.us.postDataApi('getLocalities', input)
      .subscribe(
        success => {
          this.parameter.localities = success['data'];
        }
      );
  }

  setAmenity(id: any) {
    this.model.amenities = [id];
  }

  setConfiguration(con: Configuration) {
    this.model.building_configuration_id = con.id;
    this.model.configuration_id = con.configuration_id;
    this.model.floor_plan = con.floor_map_image;
    this.model.images = con.images;
    this.model.images360 = con.images360;
    this.model.videos = con.videos;
    this.model.bedroom = con.config.bedroom;
    this.model.bathroom = con.config.bathroom;
    this.model.half_bathroom = con.config.half_bathroom;
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  getConfigurations() {
    const input = new FormData();
    this.us.postDataApi('getConfigurations', input)
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
    const input = new FormData();
    this.us.postDataApi('getPropertyTypes', input)
      .subscribe(
        success => {
          this.parameter.propertyTypes = success['data'];
          if (this.parameter.propertyTypes.length !== 0 && this.parameter.property_id === '') {
            this.model.property_type_id = this.parameter.propertyTypes[0].id;
          }
        }
      );
  }

  getPropertyAmenities() {
    const input = new FormData();
    this.us.postDataApi('getPropertyAmenities', input)
      .subscribe(
        success => {
          this.parameter.amenities = success['data'].map(item => {
            item.selected = false;
            item.images = [];
            item.images_360 = [];
            item.videos = [];
            return item;
          });
        }
      );
  }

  modelAmenityOpenFun(amenityObj: any, index: number) {
    this.amenity_index = index;
    this.amenity_obj = amenityObj;
    this.modalAmenOpen.nativeElement.click();
    this.amenMoreImg.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].images ?
      this.parameter.amenities[index].images : [])));
    this.amen360Img.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].images_360 ?
      this.parameter.amenities[index].images_360 : [])));
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.parameter.amenities[index].videos ? this.parameter.amenities[index].videos : [])));
  }

  modelAmenityCloseFun() {
    this.modalAmenClose.nativeElement.click();
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
    // this.all_amenities = res.data.map(item => {
    //   item.selected = false; item.images = []; item.images360 = []; item.images_360 = []; item.videos = []; return item;
    // });
    // this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
    // this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

    // for (let index = 0; index < this.all_amenities.length; index++) {
    //   for (let i = 0; i < this.model.amenities.length; i++) {
    //     if (this.model.amenities[i].id === this.all_amenities[index].id) {
    //       this.all_amenities[index].selected = true;
    //       const pivot = this.model.amenities[i]['pivot'];
    //       this.all_amenities[index].images = pivot.images ? pivot.images : [];
    //       this.all_amenities[index].images_360 = pivot.images_360 ? pivot.images_360 : [];
    //       this.all_amenities[index].videos = pivot.videos ? pivot.videos : [];
    //     }
    //   }
    // }

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
    const input = new FormData();
    this.us.postDataApi('getBanks', input)
      .subscribe(
        success => {
          this.parameter.banks = success['data'];
        }
      );
  }

  getBuildingSpecificTypes() {
    const input = new FormData();
    this.us.postDataApi('getBuildingSpecificTypes', input)
      .subscribe(
        success => {
          this.parameter.buildingSpecificTypes = success['data'];
        }
      );
  }

  getPaymentStatuses() {
    const input = new FormData();
    this.us.postDataApi('getPaymentStatuses', input)
      .subscribe(
        success => {
          this.parameter.paymentStatuses = success['data'];
        }
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
    if (!keyword) {
      swal('Error', 'Please enter some text.', 'error');
      return false;
    }

    this.showBuilding = false;
    this.buildingLoading = true;

    const input = new FormData();
    input.append('keyword', keyword);

    this.us.postDataApi('searchBuilding', input)
      .subscribe(
        success => {
          this.searchedBuildings = success['data'];
          this.parameter.buildingCount = success['data'].length;
          if (this.parameter.buildingCount === 0) {
            this.showText = true;
          }
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

  onSelect360File(event) {
    if (event.target.files && event.target.files[0]) {
      if ((this.urlImg360.length + event.target.files.length) > 6 || event.target.files.length > 6) {
        swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      } else {
        for (let index = 0; index < event.target.files.length; index++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageEvent.push(event.target.files[index]);
            this.urlImg360.push(e.target.result);
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
        });

    }
  }

  modelOpenFun() {
    this.modalOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
  }

  modelOpen360ImgFun() {
    this.modalOpen360Img.nativeElement.click();
    this.file360.backup(JSON.parse(JSON.stringify(this.model.images360)));
  }

  modelCloseFun() {
    this.modalClose.nativeElement.click();
  }

  saveImages() {
    this.http.loader.next({ value: true });
    if (this.file2.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error');
      return false;
    }
    this.modalClose.nativeElement.click();
    this.file2.upload().then(r => {
      this.model.images = this.file2.files;
      this.http.loader.next({ value: false });
    });
  }

  save360Images() {
    // this.http.loader.next({value: true});
    // if (this.file360.files.length < 1) {
    //   swal('Error', 'Please select atleast one image', 'error');
    //   return false;
    // }
    // this.modalClose360Img.nativeElement.click();
    // this.file360.upload().then(r => {
    //   this.model.images360 = this.file360.files;
    //   this.http.loader.next({value: false});
    // });
    let count = 0;
    if (this.file360.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error');
      return false;
    }
    this.file360.upload().then(r => {
      this.model.images360 = this.file360.files;
    });
    this.file360.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });

    if (count === this.file360.files.length) {
      this.modalClose360Img.nativeElement.click();
    }
  }

  file2Select($event) {
    if ((this.file2.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.file2.onSelectFile($event);
  }

  file360Select($event) {
    if ((this.file360.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.file360.onSelectFile($event);
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
          success => {
            this.model.floor_plan = success['data'].image;
          }
        );

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  addMaritalStatus(checked, i) {
    this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
  }

  addProperty(formdata: NgForm, tab) {
    // return;
    if (this.model.parking_for_sale && this.model.parking_count) {
      if (this.model.parking_for_sale > this.model.parking_count) {
        swal('Error', 'Parking for sale cannot be greater than total parkings available.', 'error');
        return;
      }
    }
    this.model.floor = 0; // now static
    this.model.marital_status = [];
    if (this.model.videoLoader) {
      swal('Error', 'Uploading video.', 'error');
      return;
    }
    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === true) {
        this.model.marital_status.push(this.testMarital[index].id);
      }
    }

    this.model.step = tab - 1;

    // setting newcarpert area to carpert_areas bcz ealier it was array => now single carpertarea
    this.model.carpet_areas = [];
    this.model.carpet_areas.push(JSON.parse(JSON.stringify(this.newcarpet_area)));

    if (this.model.carpet_areas.length < 1 && this.tab == 1) {
      swal('Error', 'Please add carpet area.', 'error');
    } else if ((this.model.cover_image === null || this.model.cover_image === undefined) && (this.model.step == 2)) {
      swal('Error', 'Please choose cover image.', 'error');
    } else if ((this.model.floor_plan === null || this.model.floor_plan === undefined) && (this.model.step == 2)) {
      swal('Error', 'Please choose floor plan.', 'error');
    }
    // else if ((this.model.amenities.length === 0) && (this.model.step == 2)) {
    //   swal('Error', 'Please choose amenity.', 'error');
    // }
    else if ((this.model.marital_status.length === 0) && (this.model.step == 3)) {
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
        // input.append('for_sale', this.model.for_sale === true ? '1' : '0');
        // input.append('for_rent', this.model.for_sale === true ? '0' : '1');
        input.append('for_sale', this.availabilityStatus[0].checked === true ? '1' : '0');
        input.append('for_rent', this.availabilityStatus[1].checked === true ? '1' : '0');
        input.append('is_property_sold', this.availabilityStatus[2].checked === true ? '1' : '0');
        input.append('for_hold', '0');
        input.append('country_id', this.model.country_id);
        input.append('state_id', this.model.state_id);
        input.append('city_id', this.model.city_id);
        input.append('locality_id', this.model.locality_id);
        input.append('configuration_id', this.model.configuration_id);
        if (this.model.building_configuration_id) {
          input.append('building_configuration_id', this.model.building_configuration_id);
        }
        input.append('carpet_areas', JSON.stringify(this.model.carpet_areas));
        input.append('property_type_id', this.model.property_type_id);
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('building_towers_id', this.model.building_towers_id);
        input.append('floor_num', this.model.floor_num);
      }

      if (this.model.step === 2) {
        const imagesString = this.model.images ? this.model.images.map(r => r.image) : [];
        const imagesString360 = this.model.images360 ? this.model.images360.map(r => r.image) : [];
        // const videoString = this.model.videos.map(r => r.image);
        if (this.model.parking === 0) {
          this.model.parking_count = 0;
          this.model.parking_for_sale = 0;
        }

        // amemnities images
        if (this.parameter.amenities && this.parameter.amenities.length > 0) {
          this.parameter.amenities.forEach(element => {
            const img = [];
            const img_360 = [];
            const vid = [];
            // amenities images
            if (element.images && element.images.length > 0) {
              element.images.forEach(e => {
                img.push(e.image);
              });
            }
            element.images = img;

            // amenities 360 images
            if (element.images_360 && element.images_360.length > 0) {
              element.images_360.forEach(e => {
                img_360.push(e.image);
              });
            }
            element.images360 = img_360;

            // amenities videos
            if (element.videos && element.videos.length > 0) {
              element.videos.forEach(e => {
                let s = {};
                s = { 'video': e.video, 'thumb': e.thumb };
                vid.push(s);
              });
            }
            element.videos = vid;
          });

          this.model.amenities = this.parameter.amenities.filter(op => {
            if (op.selected === true) {
              return op;
            }
          });
        }
        // added building_id and step cuz need to update sttaus and step
        input.append('building_id', this.model.building_id);
        input.append('step', this.model.step.toString());
        input.append('images', JSON.stringify(imagesString));
        input.append('images360', JSON.stringify(imagesString360));
        input.append('videos', JSON.stringify(this.model.videos));
        input.append('cover_image', this.model.cover_image);
        input.append('floor_plan', this.model.floor_plan);
        input.append('bedroom', this.model.bedroom.toString());
        input.append('bathroom', this.model.bathroom.toString());
        input.append('half_bathroom', this.model.half_bathroom ? this.model.half_bathroom.toString() : '0');
        input.append('floor', this.model.floor.toString());
        input.append('property_price', this.model.property_price ? this.model.property_price.toString() : '0');
        input.append('parking', this.model.parking.toString());
        input.append('parking_count', this.model.parking_count ? this.model.parking_count.toString() : '0');
        input.append('parking_for_sale', this.model.parking_for_sale ? this.model.parking_for_sale.toString() : '0');
        input.append('furnished', this.model.furnished.toString());
        input.append('description', this.model.description);
        input.append('quantity', this.model.quantity ? this.model.quantity.toString() : '0');
        input.append('amenities', JSON.stringify(this.model.amenities ? this.model.amenities : []));
        input.append('banks', JSON.stringify(this.model.banks ? this.model.banks : []));
        input.append('property_quantity_details',
          JSON.stringify(this.model.property_quantity_details ? this.model.property_quantity_details : []));
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
      this.spinner.show();
      this.us.postDataApi('addProperty', input)
        .subscribe(
          success => {
            this.spinner.hide();

            this.spinner.hide();
            if (this.model.step.toString() === '4') {
              swal({
                html: 'Submitted successfully.' + '<br>' +
                  'You will be notified once your property will be reviewed by Admin, you can view status in your properties.',
                type: 'success'
              });
              // swal('Submitted successfully.',
              //   'You will be notified once your property will be reviewed by them, you can view status in your properties.',
              //   'success');
              if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
                this.router.navigate(['/dashboard/properties/view-properties']);
              }
            }
            this.parameter.property_id = success['data'].id;
            this.tab = tab;
          }, error => {
            this.spinner.hide();
          }
        );
    }
  }

  setBuildingId(building: any) {
    this.selectedBuilding = building;
    this.building.id = building.id;
    this.model.building_id = building.id;

    this.model.pets = building.pets !== null ? building.pets : '1';
    this.model.kids_friendly = building.kids_friendly !== null ? building.kids_friendly : '1';
    this.model.students_friendly = building.students_friendly !== null ? building.students_friendly : '1';
    this.model.lgtb_friendly = building.lgtb_friendly !== null ? building.lgtb_friendly : '1';
    this.model.mature_people_friendly = building.mature_people_friendly !== null ? building.mature_people_friendly : '1';


    for (let index = 0; index < this.testMarital.length; index++) {
      if (building.marital_statuses && building.marital_statuses.length !== 0) {
        for (let i = 0; i < building.marital_statuses.length; i++) {
          if (this.testMarital[index].name === building.marital_statuses[i].name_en) {
            this.testMarital[index].checked = true;
          }
        }
      } else {
        this.testMarital[0].checked = true;
      }
    }
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

    const input = new FormData();
    if (this.parameter.property_id) {
      input.append('property_id', this.parameter.property_id);
    }
    input.append('building_id', this.building.id);

    this.spinner.show();
    this.us.postDataApi('tagBuilding', input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal({
            html: 'Submitted successfully.' + '<br>' +
              'You will be notified once your property will be reviewed by Admin, you can view status in your properties.',
            type: 'success'
          });
          if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
            this.router.navigate(['/dashboard/properties/view-properties']);
          }
        }, error => {
          this.spinner.hide();
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

          if (place.formatted_address) {
            this.building.address = place.formatted_address;
          }
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = this.latitude ? this.latitude : position.coords.latitude;
        this.longitude = this.longitude ? this.longitude : position.coords.longitude;
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
      this.spinner.show();
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
        this.spinner.hide();
      });
    }
  }


  buildingRequest() {

    if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
      swal('Error', 'Please fill complete devloper information', 'error');
      return false;
    }

    if (!this.latitude && !this.longitude) {
      swal('Error', 'Please select location from the dropdown list.', 'error');
      return false;
    }

    this.building.lat = this.latitude;
    this.building.lng = this.longitude;

    if (!this.building.lat || !this.building.lng) {
      swal('Error', 'Please select location', 'error');
      return false;
    }
    this.spinner.show();
    this.us.postDataApi('buildingRequest', this.building)
      .subscribe(
        success => {
          this.spinner.hide();
          // swal('Submitted successfully.',
          //   'You will be notified once your property will be reviewed by them, you can view status in your properties.',
          //   'success');
          // if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
          //   this.router.navigate(['/dashboard/properties/view-properties']);
          // }
          // update tab=1 because we need to save property details, after adding property details
          // data collector will create project template and then edit property and tag that
          // particular project
          swal({
            html: 'Success' + '<br>' +
              'You can add property details and data-collector will link this property to the building.',
            type: 'success'
          });
          // this.tab = 1;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addPropertyDetails() {
    this.model.property_quantity_details.push(JSON.parse(JSON.stringify(this.details)));
    this.details = new PropertyDetails;
  }

  checkEmptyDetails() {
    for (const item of this.details) {
      if (item == '') {
        return false;
      }
    }
    return true;
  }

  removeDetails(i: any) {
    this.model.property_quantity_details.splice(i, 1);
  }

  clickOnSale() {
    // console.log(this.model.for_sale);
  }

  onSelectVideo(event) {

  }


  showCanvas(event) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
    } else {

      setTimeout(() => {
        this.model.videoLoader = true;
        this.video = document.getElementById('video1');
        const reader = new FileReader();
        const videoTest = this.element.nativeElement.querySelector('.video55');
        reader.onload = function (e) {
          const src = e.target['result'];
          videoTest.src = src;
          const timer = setInterval(() => {
            // find duration of video only of video is in ready state
            if (videoTest.readyState === 4) {
              setTimeout(() => {
                // create canvas at middle of video
                this.newcanvas(videoTest, event.target.files[0]);
              }, 3000);
              clearInterval(timer);
            }
          }, 100);
        }.bind(this);
        reader.readAsDataURL(event.target.files[0]);
      }, 100);
    }
  }

  newcanvas(video: any, videoFile: File) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
      0, 0, canvas.width, canvas.height);
    const ImageURL = canvas.toDataURL('image/jpeg');
    // model.image = ImageURL;
    const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
    this.cs.saveVideo(videoFile, fileToUpload).subscribe(
      success => {
        this.model.videoLoader = false;
        this.model.videos = [];
        const videoObj = {
          video: '', thumb: ''
        };
        videoObj.video = success['data'].video;
        videoObj.thumb = success['data'].thumb;
        this.model.videos = [videoObj];
      }, error => {
        // console.log(error);
      }
    );
  }

  dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  onEnteringNumOfProperty(e: any) {
    // this.property_names = Array(e).fill(1);
    this.property_names = [];
    for (let index = 0; index < e; index++) {
      const pn = { name: 0 };
      pn.name = index;
      this.property_names.push(pn);
    }
  }

  setPropertyName(value: string, index: number) {
    this.property_names[index] = value;
  }


  amenMoreImgSelect($event) {
    if ((this.amenMoreImg.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.amenMoreImg.onSelectFile($event);
  }

  amen360ImagesSelect($event) {
    if ((this.amen360Img.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.amen360Img.onSelectFile($event);
  }

  // amenVideosSelect($event) {
  //   if ((this.amenVideo.files.length + $event.target.files.length) > 6) {
  //     swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
  //     return false;
  //   }
  //   this.amenVideo.onSelectFile($event);
  // }


  // saveAmenitiesMedia

  // async saveAmenitiesMedia() {
  //   let count = 0;
  //   const totalFilesCount = this.amenMoreImg.files.length + this.amen360Img.files.length + this.amenVideo.files.length;
  //   if (totalFilesCount < 1) {
  //     swal('Error', 'Please select atleast one image', 'error');
  //     return false;
  //   }
  //   this.amenMoreImg.upload().then(r => {
  //     console.log('amen imag');
  //     this.parameter.amenities[this.amenity_index].images = this.amenMoreImg.files;
  //   });
  //   this.amen360Img.upload().then(r => {
  //     console.log('amen 360 imag');
  //     this.parameter.amenities[this.amenity_index].images_360 = this.amen360Img.files;
  //   });
  //   this.amenVideo.upload().then(r => {
  //     console.log('amen video');
  //     this.parameter.amenities[this.amenity_index].videos = this.amenVideo.files;
  //   });
  //
  //   // this.modalAmenClose.nativeElement.click();
  //   console.log('===', this.amenMoreImg, this.amen360Img, this.amenVideo);
  //
  //   this.amenMoreImg.files.forEach(element => {
  //     if (element.loading === false) {
  //       console.log('==1111==');
  //       count++;
  //     }
  //   });
  //   this.amen360Img.files.forEach(element => {
  //     if (element.loading === false) {
  //       console.log('==2222==');
  //       count++;
  //     }
  //   });
  //
  //
  //   this.amenVideo.files.forEach(element => {
  //     if (element.loading !== true) {
  //       console.log('==3333==');
  //       count++;
  //     }
  //   });
  //
  //   console.log('===totalFilesCount===', totalFilesCount, count);
  //   if (count === totalFilesCount) {
  //     this.modalAmenClose.nativeElement.click();
  //   }
  // }

  modelOpenVideos() {
    this.modalAddMoreVideos.nativeElement.click();
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.model.videos)));
  }

  saveVideos() {
    let count = 0;
    if (this.amenVideo.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error');
      return false;
    }
    this.amenVideo.upload().then(r => {
      this.model.videos = this.amenVideo.files;
    });
    this.amenVideo.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    if (count === this.amenVideo.files.length) {
      this.modalAddMoreVideos.nativeElement.click();
    }
  }


  async saveAmenitiesMedia() {
    // if (this.file2.files.length > 6) {
    //   swal('Error', 'You can choose maximum of 6 images.', 'error'); return false;
    // }
    // if (this.file2.files.length < 1) {
    //   // swal('Error', 'Please select atleast one image', 'error'); return false;
    //   this.all_amenities[this.amenity_index].images = [];
    //   this.modalAmenClose.nativeElement.click();
    //   return false;
    // }

    // this.file2.upload().then(r => {
    //   this.all_amenities[this.amenity_index].images = this.file2.files;
    // });
    // this.modalAmenClose.nativeElement.click();

    let count = 0;
    const totalFilesCount = this.amenMoreImg.files.length + this.amen360Img.files.length + this.amenVideo.files.length;
    if (totalFilesCount < 1) {
      swal('Error', 'Please select atleast one image', 'error');
      return false;
    }
    // if (this.file2.files.length < 1) {
    //   // swal('Error', 'Please select atleast one image', 'error'); return false;
    //   this.all_amenities[this.amenity_index].images = [];
    //   this.modalAmenClose.nativeElement.click();
    //   return false;
    // }
    this.amenMoreImg.upload().then(r => {
      this.parameter.amenities[this.amenity_index].images = this.amenMoreImg.files;
    });
    this.amen360Img.upload().then(r => {
      this.parameter.amenities[this.amenity_index].images_360 = this.amen360Img.files;
    });
    this.amenVideo.upload().then(r => {
      this.parameter.amenities[this.amenity_index].videos = this.amenVideo.files;
    });


    // if (this.amenVideo.files.length) {
    //   const data = await this.upload();
    // }


    // this.amenVideo.upload().then(r => {
    //   this.all_amenities[this.amenity_index].videos = this.amenVideo.files;
    // });

    // this.modalAmenClose.nativeElement.click();

    this.amenMoreImg.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    this.amen360Img.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    this.amenVideo.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    if (count === totalFilesCount) {
      this.modalAmenClose.nativeElement.click();
    }
  }

  amenVideosSelect($event, type) {
    if ((this.amenVideo.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 videos', 'error');
      return false;
    }

    this.showamenVideo($event, type);
  }

  async showamenVideo(event, type) {

    const arr = [];

    for (let index = 0; index < event.target.files.length; index++) {
      if (event.target.files[index].size < this.constant.fileSizeLimit) {
        this.amenVideo.files.push(event.target.files[index]);
      } else {
        swal('Error', this.constant.errorMsg.FILE_SIZE_EXCEEDS, 'error');
      }
    }

    setTimeout(async () => {
      this.amenVideo.files.forEach(async (item, index) => {
        if (!item.id) {
          if (!this.amenVideo.files[index]['fileToUpload'] &&
            !this.amenVideo.files[index]['thumb']) {           // check file if not then loader will show
            this.amenVideo.files[index].loading = true;
          }

          const reader = new FileReader();
          const videoTest = this.element.nativeElement.querySelector('.video' + index);

          reader.onload = function (e) {
            const src = e.target['result'];
            videoTest.src = src;
            const timer = setTimeout(async () => {
              // find duration of video only of video is in ready state
              if (videoTest.readyState === 4) {
                const data = await this.newcanvasamenVideo(videoTest, this.amenVideo.files[index], index, type);
              }
            }, 1000);
          }.bind(this);
          reader.readAsDataURL(this.amenVideo.files[index]);
          // await func(item);
        }
      });
    }, 1000);

    // }

  }


  // @ts-ignore
  newcanvasamenVideo(video: any, videoFile: File, myIndex, type): Promise<any> {
    let canvasID: any;
    if (type === 'amenity' ? canvasID = 'canvas' : (type === 'tower' ? canvasID = 'canvas2' : canvasID = 'canvas3'))
      if (myIndex !== undefined) {
        const canvas = document.getElementById(canvasID + (myIndex)) as HTMLCanvasElement;
        const ss = canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight,
          0, 0, canvas.width, canvas.height);
        const ImageURL = canvas.toDataURL('image/jpeg');
        this.amenVideo.files[myIndex].canvasImage = ImageURL;
        const fileToUpload = this.dataURLtoFile(ImageURL, 'tempFile.png');
        const model: any = {};
        model.fileToUpload = fileToUpload;
        model.videoFile = videoFile;
        this.amenVideo.files[myIndex].loading = false;
        this.amenVideo.files[myIndex]['fileToUpload'] = fileToUpload;
        // console.log(videoFile, 'videoFile');
        // this.amenVideo.files[myIndex]['videoFile'].push(videoFile);
        // console.log(this.amenVideo.files, 'amenVideo.files');
      }
  }

  remove(index: any) {
    this.amenVideo.files.splice(index, 1);
    // this.allAmenvideos.splice(index, 1);
  }
}
