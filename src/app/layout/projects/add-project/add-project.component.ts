import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { AddProjectModel, Configuration, Towers, LocalityToCountry } from './../../../models/addProject.model';
import { MapsAPILoader } from '@agm/core';
import { Constant } from './../../../common/constants';
import { FileUpload } from './../../../common/fileUpload';
import { CommonService } from 'src/app/services/common.service';
import { ApiConstants } from 'src/app/common/api-constants';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [AddProjectModel, Constant, Towers]
})
export class AddProjectComponent implements OnInit {

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalAmenClose') modalAmenClose: ElementRef;
  @ViewChild('modalAmenOpen') modalAmenOpen: ElementRef;
  @ViewChild('modalTowerAmenClose') modalTowerAmenClose: ElementRef;
  @ViewChild('modalTowerAmenOpen') modalTowerAmenOpen: ElementRef;
  @ViewChild('modal360ImageClose') modal360ImageClose: ElementRef;
  @ViewChild('modal360ImageOpen') modal360ImageOpen: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  @ViewChild('openConfigPopup') openConfigPopup: ElementRef;
  @ViewChild('closeConfigPopup') closeConfigPopup: ElementRef;
  @ViewChild('addConfig') addConfig: ElementRef;

  @ViewChild('openDeveloperListModel') openDeveloperListModel: ElementRef;
  @ViewChild('closeDeveloperListModel') closeDeveloperListModel: ElementRef;
  @ViewChild('towerEditAmenitiesModal') towerEditAmenitiesModal: ElementRef;
  myform: FormGroup;
  myform2: FormGroup;

  public zoom: number;

  canEditdeveloperInfo: boolean;
  id: any;
  url: any[];
  url2 = [];
  tab: number;
  selectedGuest;
  image1;
  image2;
  amenityList = [];
  amen = '';
  bankList = [];
  bank = '';
  // testMarital = [];
  imageEvent = [];
  showText = false;
  all_possession_statuses: any = [];
  all_building_types: any = [];
  all_amenities: any = [];
  all_configurations: any = [];
  all_developers: any = [];
  amenity_index: number;
  amenity_obj: any;
  selected_amenities: any = [];
  new_config: any = new Configuration;
  new_custom: any = { name: '', value: '' };
  new_config_edit: any;
  FU: any = {};
  initialCountry = { initialCountry: 'mx' };

  file1: FileUpload; file2: FileUpload; file3: FileUpload; file4: FileUpload; file5: FileUpload; file6: FileUpload; file7: FileUpload;
  file8: FileUpload;

  newTower: Towers;
  allTowerAmenities: any = [];
  allTowerAmenityForEdit: any = [];
  selectedTowerAmenitiesId: any = [];
  selectedTowerAmenityObj: any = [];
  selected_amenity_for_tower: any = [];
  showAddBtn = true;
  towerAmenityIndex = 0;
  name: string;
  video: any;
  image: any;
  videoObj: Object = {
    thumbnail: '',
    original: ''
  };
  videoSrc: any;
  keyword: string;
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
  showPreferableBuyer = false;
  constructor(
    public model: AddProjectModel,
    private admin: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private constant: Constant,
    private apiConstants: ApiConstants,
    private cs: CommonService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.name = '';
    this.file1 = new FileUpload(true, this.admin);
    this.file2 = new FileUpload(false, this.admin);
    this.file3 = new FileUpload(true, this.admin);
    this.file4 = new FileUpload(false, this.admin);
    this.file5 = new FileUpload(true, this.admin);
    this.file6 = new FileUpload(true, this.admin);
    this.file7 = new FileUpload(false, this.admin);
    this.file8 = new FileUpload(false, this.admin);
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.newTower = new Towers();
      if (this.id) {
        /* if id exists edit mode */
        this.canEditdeveloperInfo = false;
        this.parameter.loading = true;
        this.admin.postDataApi('getProjectById', { building_id: this.id }).subscribe(r => {
          this.parameter.loading = false;
          this.model = JSON.parse(JSON.stringify(r.data));
          if (r.data['locality']) {
            this.setCountryToLocality(r.data['locality']);
          }
          this.setMaritalStatus(r.data);
          this.model.building_tower_edit_index = '-1';
          this.model.floors = 0;
          if (r.data.developer == null) {
            this.model.developer = {
              id: '',
              name: '',
              email: '',
              country_code: this.constant.country_code,
              dial_code: this.constant.dial_code,
              phone: '',
              logo: '',
              image: '',
              developer_image: '',
              developer_desc: '',
              developer_company: ''
            };
            this.model.developer.name = r.data.developer != null && r.data.developer.name ? r.data.developer.name : '';
            this.model.developer.email = r.data.developer != null && r.data.developer.email ? r.data.developer.email : '';
            this.model.developer.phone = r.data.developer != null && r.data.developer.phone ? r.data.developer.phone : '';
          }
          this.file1.image = this.model.main_image;
          // this.model.configurations.map((item) => {
          //   item.images = item.images.map(r1 => r1.image);
          // });
          this.model.custom_attributes = this.model.custom_values;
          this.file5.image = this.model.developer.image;
          this.file6.image = this.model.developer.developer_image;
          this.admin.postDataApi('getAmenities', {}).subscribe(res => {
            this.all_amenities = res.data.map(item => { item.selected = false; item.images = []; return item; });
            this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
            this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

            for (let index = 0; index < this.all_amenities.length; index++) {
              for (let i = 0; i < this.model.amenities.length; i++) {
                if (this.model.amenities[i].id === this.all_amenities[index].id) {
                  this.all_amenities[index].selected = true;
                  const pivot = this.model.amenities[i]['pivot'];
                  this.all_amenities[index].images = pivot.images ? pivot.images : [];
                }
              }
            }

            if (this.model.building_towers && this.model.building_towers.length > 0) {
              // setting true to tower selected amenities
              this.model.building_towers.map(item => {
                item.amenitiesCount = item.amenities.length;
                item.amenities.map(i => { i.selected = true; return i; });
              });

              // tower amenitites id array only
              this.model.building_towers.forEach(element => {
                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                element.amenitiesId = element.amenities.map(op => {
                  const pivot = op['pivot'];
                  op.images = pivot.images ? pivot.images : [];
                  return op.id;
                });
              });
            } else {
              this.model.building_towers = [];
            }
          });
        }, error => {
          this.parameter.loading = false;
        });
      } else if (params.request_id) {
        /* if request_id exists, building request edit mode */
        this.canEditdeveloperInfo = false;
        this.parameter.loading = true;
        this.admin.postDataApi('getBuildingRequest', { building_request_id: params.request_id }).subscribe(r => {
          this.parameter.loading = false;
          this.model = JSON.parse(JSON.stringify(r.data));
          if (r.data['locality']) {
            this.setCountryToLocality(r.data['locality']);
          }
          this.setMaritalStatus(r.data);
          this.model.building_tower_edit_index = '-1';
          this.model.floors = 0;
          if (r.data.developer == null) {
            this.model.developer = {
              id: '', name: '', email: '',
              country_code: this.constant.country_code,
              dial_code: this.constant.dial_code,
              phone: '', logo: '', image: '', developer_image: '', developer_desc: '',
              developer_company: ''
            };
            this.model.building_request_id = params.request_id;
            this.model.developer.name = r.data.dev_name ? r.data.dev_name : '';
            this.model.developer.email = r.data.dev_email ? r.data.dev_email : '';
            this.model.developer.country_code = r.data.dev_countrycode ? r.data.dev_countrycode : '';
            this.model.developer.phone = r.data.dev_phone ? r.data.dev_phone : '';
          }
          this.file1.image = this.model.main_image;
          // this.model.configurations.map((item) => {
          //   item.images = item.images.map(r1 => r1.image);
          // });
          this.model.custom_attributes = this.model.custom_values;
          this.file5.image = this.model.developer.image;
          this.file6.image = this.model.developer.developer_image;
          this.admin.postDataApi('getAmenities', {}).subscribe(res => {
            this.all_amenities = res.data.map(item => { item.selected = false; return item; });
            this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
            this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

            for (let index = 0; index < this.all_amenities.length; index++) {
              if (this.model.amenities && this.model.amenities.length > 0) {
                for (let i = 0; i < this.model.amenities.length; i++) {
                  if (this.model.amenities[i].id === this.all_amenities[index].id) {
                    this.all_amenities[index].selected = true;
                    const pivot = this.model.amenities[i]['pivot'];
                    this.all_amenities[index].images = pivot.images ? pivot.images : [];
                  }
                }
              }
            }


            if (this.model.building_towers && this.model.building_towers.length > 0) {
              // setting true to tower selected amenities
              this.model.building_towers.map(item => {
                item.amenitiesCount = item.amenities.length;
                item.amenities.map(i => { i.selected = true; return i; });
              });

              // tower amenitites id array only
              this.model.building_towers.forEach(element => {
                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                element.amenitiesId = element.amenities.map(op => {
                  const pivot = op['pivot'];
                  op.images = pivot.images ? pivot.images : [];
                  return op.id;
                });
              });
            } else {
              this.model.building_towers = [];
            }
          });
        }, error => {
          this.parameter.loading = false;
        });
      } else {
        this.model = new AddProjectModel();
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
        this.model.floors = 0;
        this.model.building_towers = [];
        this.model.building_tower_edit_index = '-1';
        this.canEditdeveloperInfo = true;
        this.admin.postDataApi('getAmenities', {}).subscribe(res => {
          this.all_amenities = res.data.map(item => { item.selected = false; item.images = []; return item; });
          this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
          this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

        });
        this.model.dev_countrycode = 'mx';
        this.model.dev_dialcode = '+52';
      }
    });

    this.zoom = 4;
    this.setCurrentPosition();
    this.getCountries('');
    this.initForm();
    this.admin.postDataApi('getPossessionStatuses', {}).subscribe(r => {
      this.all_possession_statuses = r.data;
    });
    this.admin.postDataApi('getBuildingTypes', {}).subscribe(r => {
      this.all_building_types = r.data;
    });

    this.admin.postDataApi('getConfigurations', {}).subscribe(r => {
      this.all_configurations = r.data;
    });
  }

  setCountryToLocality(locality: LocalityToCountry) {
    this.getStates(locality.city.state.country.id, '');
    this.getCities(locality.city.state.id, '');
    this.getLocalities(locality.city.id, '');
    this.setValue('locality_id', locality.id);
  }

  setMaritalStatus(data) {
    for (let index = 0; index < this.testMarital.length; index++) {
      if (data.marital_statuses && data.marital_statuses.length > 0) {
        for (let i = 0; i < data.marital_statuses.length; i++) {
          if (this.testMarital[index].name === data.marital_statuses[i].name_en) {
            this.testMarital[index].checked = true;
          }
        }
      } else {
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
      }
    }
  }

  getCountries(keyword: string) {
    this.admin.postDataApi('getCountries', {})
      .subscribe(
        success => { this.parameter.countries = success['data']; }
      );
  }

  getStates(country_id: any, keyword: string) {
    // this.parameter.loading = true;
    this.model.country_id = country_id;
    this.model.state_id = '';
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.cities = [];
    this.parameter.localities = [];
    const input = new FormData();
    input.append('country_id', country_id);

    this.admin.postDataApi('country/getStates', input).subscribe(success => {
      this.parameter.states = success['data'];
      // this.parameter.loading = false;
    },
      error => {
        // this.parameter.loading = false;
      });
  }

  getCities(state_id: any, keyword: string) {
    // this.parameter.loading = true;
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.localities = [];
    const input = new FormData();
    input.append('state_id', state_id);

    this.admin.postDataApi('getCities', input).subscribe(success => {
      this.parameter.cities = success['data'];
      // this.parameter.loading = false;
    },
      error => {
        // this.parameter.loading = false;
      });
  }


  getLocalities(city_id: any, keyword = '') {
    this.model.city_id = city_id;
    this.model.locality_id = '';

    const input = new FormData();
    input.append('city_id', city_id);

    if (keyword) { input.append('keyword', keyword); }

    this.admin.postDataApi('getLocalities', input)
      .subscribe(
        success => { this.parameter.localities = success['data']; }
      );
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  searchAmenity(keyword: string) {
    const input = {keyword: ''};
    input.keyword = keyword;
    this.admin.postDataApi('getAmenities', input).subscribe(res => {
      this.all_amenities = res.data.map(item => { item.selected = false; item.images = []; return item; });
      this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
      this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

    });
  }

  modelOpenFun() {
    this.modalOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
  }

  modelCloseFun() {
    this.modalClose.nativeElement.click();
  }

  saveImages() {
    if (this.file2.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error'); return false;
    }
    this.modalClose.nativeElement.click();
    this.file2.upload().then(r => {
      this.model.images = this.file2.files;
    });
  }

  modelOpen360ImgFun() {
    this.modal360ImageOpen.nativeElement.click();
    this.file7.backup(JSON.parse(JSON.stringify(this.model.images360)));
  }

  modelClose360ImgFun() {
    this.modal360ImageClose.nativeElement.click();
  }

  save360Images() {
    if (this.file7.files.length < 1) {
      swal('Error', 'Please select atleast one image', 'error'); return false;
    }
    this.modal360ImageClose.nativeElement.click();
    this.file7.upload().then(r => {
      this.model.images360 = this.file7.files;
    });
  }

  modelAmenityOpenFun(amenityObj: any, index: number) {
    this.amenity_index = index;
    this.amenity_obj = amenityObj;
    this.modalAmenOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.all_amenities[index].images)));
  }

  modelAmenityCloseFun() {
    this.modalAmenClose.nativeElement.click();
  }

  saveAmenityImages() {
    if (this.file2.files.length > 6) {
      swal('Error', 'You can choose maximum of 6 images.', 'error'); return false;
    }
    if (this.file2.files.length < 1) {
      // swal('Error', 'Please select atleast one image', 'error'); return false;
      this.all_amenities[this.amenity_index].images = [];
      this.modalAmenClose.nativeElement.click();
      return false;
    }

    this.file2.upload().then(r => {
      this.all_amenities[this.amenity_index].images = this.file2.files;
    });
    this.modalAmenClose.nativeElement.click();
  }

  modelTowerAmenityOpenFun(amenityObj: any, index: number) {
    this.amenity_index = index;
    this.amenity_obj = amenityObj;
    this.allTowerAmenities[index] = amenityObj;
    // this.allTowerAmenityForEdit[index] = amenityObj;
    this.modalTowerAmenOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.allTowerAmenities[index].images)));
  }

  modelTowerAmenityCloseFun() {
    this.modalTowerAmenClose.nativeElement.click();
  }

  saveTowerAmenityImages() {
    if (this.file2.files.length > 6) {
      swal('Error', 'You can choose maximum of 6 images.', 'error'); return false;
    }
    if (this.file2.files.length < 1) {
      // swal('Error', 'Please select atleast one image', 'error'); return false;
      this.allTowerAmenities[this.amenity_index].images = [];
      // this.allTowerAmenityForEdit[this.amenity_index].images = [];
      this.modalTowerAmenClose.nativeElement.click();
      return false;
    }

    this.file2.upload().then(r => {
      this.allTowerAmenities[this.amenity_index].images = this.file2.files;
      // this.allTowerAmenityForEdit[this.amenity_index].images = this.file2.files;
    });
    this.modalTowerAmenClose.nativeElement.click();
  }


  loadPlaces() {
    // load Places Autocomplete
    this.model.lat = '30.34';
    this.model.lng = '76.23';
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
          this.model.lat = place.geometry.location.lat();
          this.model.lng = place.geometry.location.lng();
          if (place.formatted_address) {
            this.model.address = place.formatted_address;
          }
          this.zoom = 16;
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.model.lat = position.coords.latitude;
        this.model.lng = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

  placeMarker($event) {
    this.model.lat = $event.coords.lat;
    this.model.lng = $event.coords.lng;
    this.getGeoLocation(this.model.lat, this.model.lng);
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
            this.model.address = result.formatted_address;
          } else {
            this.model.address = lat + ',' + lng;
          }
        }
      });
    }
  }

  formValidate() {
    return true;
  }

  initForm() {
    this.myform = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ]),
      building_age: new FormControl('', [
        Validators.required
      ]),
      building_type: new FormControl('', [
        Validators.required
      ]),
      // floors: new FormControl('', [
      //   Validators.required
      // ]),
      // avg_price: new FormControl('', [
      //   Validators.required
      // ]),
      description: new FormControl('', [
        Validators.required
      ]),
      possession_status_id: new FormControl('', [
        Validators.required
      ])
    });

    this.myform2 = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ])
    });
  }

  closeConfigPopUpFun() {
    this.closeConfigPopup.nativeElement.click();
    this.file4.reset();
  }
  openConfigPopupFun() {
    this.openConfigPopup.nativeElement.click();
    this.addConfig.nativeElement.reset();
    this.new_config = new Configuration;
    this.new_config_edit = -1;
    this.file3.image = '';
    this.file4.files = [];
  }

  selectConfiguration(id: string, parentModel: any) {
    const childModel = this.all_configurations.filter(r => r.id === id);
    parentModel.config = childModel[0];
  }

  editConfiguration(config, index) {
    this.new_config_edit = index;
    this.new_config = JSON.parse(JSON.stringify(config));
    this.file3.image = config.floor_map_image;
    this.file4.files = [];
    config.images.forEach((item, i: number) => {
      this.file4.files.push(item);
    });
    this.openConfigPopup.nativeElement.click();
  }

  deleteConfiguration(index) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to Delete?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.value) {
        this.model.configurations.splice(index, 1);
      }
    });

  }

  addNewConfig() {
    if (this.file4.files.length < 1) {
      swal('Error', 'Please choose atleast one image for other images', 'error'); return false;
    }
    this.closeConfigPopup.nativeElement.click();
    this.parameter.loading = true;
    console.log('===', this.new_config);
    this.file3.upload().then(r => {
      this.file4.upload().then(r1 => {
        this.parameter.loading = false;
        this.new_config.floor_map_image = this.file3.image;
        this.new_config.images = this.file4.files;
        if (this.new_config_edit >= 0) {
          this.model.configurations[this.new_config_edit] = this.new_config;
        } else {
          this.model.configurations.push(this.new_config);
        }
        this.new_config = new Configuration();
        console.log('conssss', this.model.configurations);
      }, error => {
        this.parameter.loading = false;
      });
    },
      error => {
        this.parameter.loading = false;
      });
  }

  onCountryChange(obj) {
    this.model.dev_countrycode = obj.iso2;
    this.model.dev_dialcode = '+' + obj.dialCode;
    this.model.developer.dial_code = this.model.dev_dialcode;
    this.model.developer.country_code = this.model.dev_countrycode;
  }

  addProject() {
    this.model.marital_status = [];
    for (let index = 0; index < this.testMarital.length; index++) {
      if (this.testMarital[index].checked === true) {
        this.model.marital_status.push(this.testMarital[index].id);
      }
    }
    const modelSave = JSON.parse(JSON.stringify(this.model));

    modelSave.marital_status = JSON.stringify(this.model.marital_status);
    modelSave.is_completed = 0;
    modelSave.cover_image = this.file1.image;
    if (this.model.videoLoader) {
      swal('Error', 'Uploading video.', 'error');
      return;
    }
    if (!modelSave.country_id) {swal('Error', 'Please select country.', 'error'); return false; }
    if (!modelSave.state_id) {swal('Error', 'Please select state.', 'error'); return false; }
    if (!modelSave.city_id) {swal('Error', 'Please select city.', 'error'); return false; }
    if (!modelSave.locality_id) {swal('Error', 'Please select locality.', 'error'); return false; }

    // launch date to be mandatory possession_status == presale
    if (modelSave.possession_status_id &&
      (modelSave.possession_status_id.toString() === this.apiConstants.possession_status_id) &&
      !modelSave.launch_date) {
        swal('Error', 'Please select launch date.', 'error');
      return false;
    }
    if (modelSave.images) {
      modelSave.building_images = modelSave.images.map(r => r.image);
    }
    if (modelSave.images360) {
      modelSave.images360 = modelSave.images360.map(r => r.image);
    }

    modelSave.videos = modelSave.videos ? JSON.stringify(modelSave.videos) : JSON.stringify([]);
    modelSave.dev_name = modelSave.developer.name;
    modelSave.dev_email = modelSave.developer.email;
    modelSave.dev_phone = modelSave.developer.phone;
    modelSave.dev_countrycode = modelSave.developer.country_code ? modelSave.developer.country_code : this.constant.country_code;
    modelSave.dev_dialcode = modelSave.developer.dial_code ? modelSave.developer.dial_code : this.constant.dial_code;
    modelSave.dev_logo = this.file5.image;
    modelSave.developer_image = this.file6.image;
    modelSave.amenities = this.all_amenities.filter(op => { if (op.selected === true) { return op; } });
    if (modelSave.amenities && modelSave.amenities.length > 0) {
      modelSave.amenities.forEach(element => {
        const img = [];
        element.images.forEach(e => {
          img.push(e.image);
        });
        element.images = img;
      });
    }

    if (modelSave.configurations && modelSave.configurations.length > 0) {
      modelSave.configurations.forEach(item => {
        item.images = item.images.map(x => x.image);
      });
    }

    modelSave.building_towers = this.model.building_towers;
    if (modelSave.building_towers && modelSave.building_towers.length > 0) {
      modelSave.building_towers.forEach(element1 => {
        element1.amenities.forEach(element => {
          const img = [];
          element.images.forEach(e => {
            img.push(e.image);
          });
          element.images = img;
        });
      });
    }
    /* remove fields for edit */
    // if (!modelSave.name) {swal('Error', 'Please add building name', 'error'); return false; }
    // if (!modelSave.address) {swal('Error', 'Please add address', 'error'); return false; }
    // if (!modelSave.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
    // if (!modelSave.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
    // if (modelSave.building_images.length < 1) {swal('Error', 'Please add atleast one more building image', 'error'); return false; }
    // if (!modelSave.building_age) {swal('Error', 'Please add building age', 'error'); return false; }
    // if (!modelSave.building_type_id) {swal('Error', 'Please add building type', 'error'); return false; }
    // if (!modelSave.description) {swal('Error', 'Please add building description', 'error'); return false; }
    // if (!modelSave.possession_status_id) {swal('Error', 'Please add possession status', 'error'); return false; }
    // if (!modelSave.floors) {swal('Error', 'Please add floors', 'error'); return false; }
    // if (!modelSave.launch_date) {swal('Error', 'Please add building launch date', 'error'); return false; }
    // if (!modelSave.avg_price) {swal('Error', 'Please add building average price', 'error'); return false; }
    // if (modelSave.amenities.length < 1) {swal('Error', 'Please add amenities', 'error'); return false; }
    // if (modelSave.configurations.length < 1) {swal('Error', 'Please add building configuration', 'error'); return false; }
    // if (!this.id) {
    //   if (!modelSave.dev_name) {swal('Error', 'Please add developer name', 'error'); return false; }
    //   if (!modelSave.dev_countrycode) {swal('Error', 'Please add developer country code', 'error'); return false; }
    //   if (!modelSave.dev_email) {swal('Error', 'Please add developer email', 'error'); return false; }
    //   if (!modelSave.dev_phone) {swal('Error', 'Please add developer phone', 'error'); return false; }
    //   if (!modelSave.dev_logo) {swal('Error', 'Please add developer image', 'error'); return false; }
    // }

    if (modelSave.dev_email) {
      if (!modelSave.dev_name) { swal('Error', 'Please add developer name', 'error'); return false; }
      if (!modelSave.dev_countrycode) { swal('Error', 'Please add developer country code', 'error'); return false; }
      if (!modelSave.dev_email) { swal('Error', 'Please add developer email', 'error'); return false; }
      if (!modelSave.dev_phone) { swal('Error', 'Please add developer phone', 'error'); return false; }
      if (!modelSave.dev_logo) { swal('Error', 'Please add developer image', 'error'); return false; }
    }
    if (modelSave.name && modelSave.address && modelSave.address != null && modelSave.cover_image &&
      modelSave.building_images.length > 0 && modelSave.building_age && modelSave.building_age != null && modelSave.building_type_id &&
      modelSave.description && modelSave.description != null && modelSave.possession_status_id &&
      // modelSave.floors && modelSave.floors != null &&
      modelSave.launch_date && modelSave.launch_date != null &&
      // modelSave.avg_price && modelSave.avg_price != null &&
      modelSave.amenities.length > 0 &&
      modelSave.configurations.length > 0 && modelSave.dev_email && modelSave.dev_email != null
      && modelSave.dev_name && modelSave.dev_name != null
      && modelSave.dev_phone && modelSave.dev_phone != null && modelSave.dev_logo) {

      modelSave.is_completed = 1;
      // swal('Error', 'Please add building name', 'error');
      // return false;
    }

    // if (this.id) {
    //   if (modelSave.dev_name && modelSave.dev_countrycode && modelSave.dev_email && modelSave.dev_phone &&
    //     modelSave.dev_logo) {
    //       modelSave.is_completed = 1;
    //     // swal('Error', 'Please add developer name', 'error');
    //     // return false;
    //   }
    // }

    if (this.model.building_request_id) {
      modelSave.building_request_id = this.model.building_request_id;
    }

    if (this.id) {
      modelSave.building_id = this.id;
      modelSave.developer_id = modelSave.developer.id;
      this.parameter.loading = true;
      this.admin.postDataApi('updateProject', modelSave).subscribe(success => {
        this.parameter.loading = false;
        swal('Success', 'Updated successfully.', 'success');
        // set model to avoid duplication creation of project
        this.setProjectModel(success['data']);

        // this.router.navigate(['/dashboard/projects/view-projects']);
      }, error => {
        this.parameter.loading = false;
        swal('Error', error.message, 'error');
      });
    } else {
      delete modelSave.id;
      delete modelSave.building_id;
      this.parameter.loading = true;
      this.admin.postDataApi('addProject', modelSave).subscribe(success => {
        this.parameter.loading = false;
        swal('Success', 'Added successfully.', 'success');
        // set model to avoid duplication creation of project
        this.id = success['data'].id;
        this.setProjectModel(success['data']);
        // this.router.navigate(['/dashboard/projects/view-projects']);
      }, error => {
        this.parameter.loading = false;
        swal('Error', error.message, 'error');
      });
    }
  }

  file2Select($event) {
    // if ((this.file2.files.length + $event.target.files.length) > 6) {
    //   swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
    //   return false;
    // }
    this.file2.onSelectFile($event);
  }

  file4Select($event) {
    // if ((this.file4.files.length + $event.target.files.length) > 6) {
    //   swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
    //   return false;
    // }
    this.file4.onSelectFile($event);
  }

  file7Select($event) {
    this.file7.onSelectFile($event);
  }

  file8Select($event) {
    const uu = this.file8.onSelectFile($event);
  }

  addNewCustom() {
    if (!this.new_custom.name || !this.new_custom.value) {
      swal('Error', 'Please add parameter name and value', 'error');
      return false;
    }
    this.model.custom_attributes.unshift(this.new_custom);
    this.new_custom = { name: '', value: '' };
  }

  setProjectModel(data) {
    this.model = JSON.parse(JSON.stringify(data));
    this.model.building_tower_edit_index = '-1';
    if (data.developer == null) {
      this.model.developer = {
        id: '', name: '', email: '',
        country_code: this.constant.country_code,
        dial_code: this.constant.dial_code,
        phone: '', logo: '', image: '',
        developer_image: '', developer_desc: '', developer_company: ''
      };
      this.model.developer.name = data.developer != null && data.developer.name ? data.developer.name : '';
      this.model.developer.email = data.developer != null && data.developer.email ? data.developer.email : '';
      this.model.developer.phone = data.developer != null && data.developer.phone ? data.developer.phone : '';
      this.model.developer.developer_company = data.developer != null &&
      data.developer.developer_company ? data.developer.developer_company : '';
      this.model.developer.developer_desc = data.developer != null && data.developer.developer_desc ? data.developer.developer_desc : '';
    }
    this.file1.image = this.model.main_image;
    // this.model.configurations.map((item) => {
    //   item.images = item.images.map(r1 => r1.image);
    // });
    this.model.custom_attributes = this.model.custom_values;
    this.file5.image = this.model.developer.image;
    this.file6.image = this.model.developer.developer_image;

    if (data['locality']) {
      this.setCountryToLocality(data['locality']);
    }

    this.admin.postDataApi('getAmenities', {}).subscribe(res => {
      this.all_amenities = res.data.map(item => { item.selected = false; item.images = []; return item; });
      this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
      this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

      for (let index = 0; index < this.all_amenities.length; index++) {
        for (let i = 0; i < this.model.amenities.length; i++) {
          if (this.model.amenities[i].id === this.all_amenities[index].id) {
            this.all_amenities[index].selected = true;
            const pivot = this.model.amenities[i]['pivot'];
            this.all_amenities[index].images = pivot.images ? pivot.images : [];
          }
        }
      }
    });


    if (this.model.building_towers && this.model.building_towers.length > 0) {
      // setting true to tower selected amenities
      this.model.building_towers.map(item => {
        item.amenitiesCount = item.amenities.length;
        item.amenities.map(i => { i.selected = true; return i; });
      });

      // tower amenitites id array only
      this.model.building_towers.forEach(element => {
        // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
        element.amenitiesId = element.amenities.map(op => {
          const pivot = op['pivot'];
          op.images = pivot.images ? pivot.images : [];
          return op.id;
        });
      });
    } else {
      this.model.building_towers = [];
    }
  }

  selectDeveloper(name: string, type: number) {
    this.parameter.loading = true;
    this.admin.postDataApi('getDevelopersFrAdmin', {name: name}).subscribe(r => {
      this.parameter.loading = false;
      this.all_developers = r.data;
      if (type !== 2) {
        this.openDeveloperListModel.nativeElement.click();
      }
    });
  }

  addDeveloper() {
    this.router.navigate(['/dashboard/developers/add-developer/0']);
    // this.canEditdeveloperInfo = true;
    // this.model.developer = {
    //   id: '',
    //   name: '',
    //   email: '',
    //   country_code: this.constant.country_code,
    //   dial_code: this.constant.dial_code,
    //   phone: '',
    //   logo: '',
    //   image: '',
    //   developer_image: ''
    // };
    // this.file5.image = '';
    // this.file6.image = '';
    // this.closeDeveloperListModel.nativeElement.click();
  }

  setDeveloper(item) {
    this.canEditdeveloperInfo = false;
    this.model.developer = {
      id: '', name: '', email: '',
      country_code: this.constant.country_code,
      dial_code: this.constant.dial_code,
      phone: '', logo: '', image: '', developer_image: '',
      developer_company: '', developer_desc: ''
    };
    this.model.developer.id = item.id;
    this.model.developer_id = item.id;
    this.model.developer.name = item.name;
    this.model.developer.email = item.email;
    this.model.developer.phone = item.phone;
    this.model.developer.dial_code = item.dial_code;
    this.model.developer.country_code = item.country_code;
    this.model.developer.logo = item.image;
    this.model.developer.developer_company = item.developer_company;
    this.model.developer.developer_desc = item.developer_desc;
    this.file5.image = item.image;
    this.file6.image = item.developer_image;
    this.closeDeveloperListModel.nativeElement.click();
  }


  addNewTower() {
    // if (this.model.building_tower_edit_index) {
    //   swal('First save the previous editted tower.');
    // }
    if (!this.newTower.tower_name) { swal('Error', 'Please enter tower name.', 'error'); return false; }
    if (!this.newTower.num_of_floors && this.newTower.num_of_floors !== 0) {
      swal('Error', 'Please enter no. of floors.', 'error'); return false; }
    if (!this.newTower.possession_status_id) { swal('Error', 'Please choose possession status.', 'error'); return false; }
    // if (!this.newTower.launch_date) { swal('Error', 'Please enter launch date.', 'error'); return false; }

    // launch date to be mandatory possession_status == presale
    if (this.newTower.possession_status_id &&
      (this.newTower.possession_status_id.toString() === this.apiConstants.possession_status_id) &&
      !this.newTower.launch_date) {
        swal('Error', 'Please select launch date.', 'error');
      return false;
    }

    const tempAmen = JSON.parse(JSON.stringify(this.allTowerAmenities));
    this.selectedTowerAmenitiesId = tempAmen.filter(op => { if (op.selected === true) { return op; } });
    // this.selectedTowerAmenitiesId = tempAmen.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
    this.selectedTowerAmenityObj = tempAmen.filter(op => { if (op.selected === true) { return op; } });
    this.newTower.amenities = this.selectedTowerAmenityObj;
    this.newTower.amenitiesId = this.selectedTowerAmenitiesId;
    this.newTower.amenitiesCount = this.newTower.amenities.length;
    if (this.newTower.amenities.length < 1) {
      // swal('Error', 'Please choose tower amenities.', 'error'); return false;
      this.newTower.amenities = [];
    }
    this.model.building_towers.push(this.newTower);
    this.showAddBtn = true;

    // setting tower to empty
    this.newTower = new Towers();
    this.allTowerAmenities.map(op => { op.selected = false; });
  }


  editTower(btower: any, index: number) {
    if (this.model.building_tower_edit_index !== '-1') {
      swal('Warning', 'First save the previous editted tower.', 'warning');
      return;
    }
    this.model.building_tower_edit_index = index;
    // setting allTowerAmenityForEdit images
    for (let index1 = 0; index1 < this.allTowerAmenityForEdit.length; index1++) {
      for (let i = 0; i < btower.amenities.length; i++) {
        if (btower.amenities[i].id === this.allTowerAmenityForEdit[index1].id) {
          this.allTowerAmenityForEdit[index1].selected = btower.amenities[i].selected;
          const pivot = btower.amenities[i]['pivot'];
          this.allTowerAmenityForEdit[index1].images = pivot.images ? pivot.images : [];
        }
      }
    }
  }

  deleteTower(index: number) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to delete?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.value) {
        const btid = this.model.building_towers[index].id;
        this.model.building_towers.splice(index, 1);

        if (btid) {
          this.admin.postDataApi('deleteTower', {building_towers_id: btid}).subscribe(res => {
            // console.log('sss', res);
          });
        }
      }
    });
  }

  saveTower(btower: Towers, index: any) {
    console.log('btower', btower);
    this.model.building_towers[index].launch_date = btower.launch_date;
    // this.allTowerAmenityForEdit = btower.amenities;
    if (!this.model.building_towers[index].tower_name) { swal('Error', 'Please enter tower name.', 'error'); return false; }
    if (!this.model.building_towers[index].num_of_floors) { swal('Error', 'Please enter no. of floors.', 'error'); return false; }
    if (!this.model.building_towers[index].possession_status_id) {
      swal('Error', 'Please choose possession status.', 'error'); return false; }
    // if (!this.model.building_towers[index].launch_date) { swal('Error', 'Please enter launch date.', 'error'); return false; }
console.log('aaaa', this.model.building_towers[index]);
    // launch date to be mandatory possession_status == presale
    if (this.model.building_towers[index].possession_status_id &&
      (this.model.building_towers[index].possession_status_id.toString() === this.apiConstants.possession_status_id) &&
      !this.model.building_towers[index].launch_date) {
        swal('Error', 'Please select launch date.', 'error');
      return false;
    }

    // this.selectedTowerAmenitiesId = btower.amenities.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
    this.selectedTowerAmenitiesId = btower.amenities.filter(op => { if (op.selected === true) { return op; } });
    this.selectedTowerAmenityObj = btower.amenities.filter(op => { if (op.selected === true) { return op; } });
    this.model.building_towers[index].amenitiesId = this.selectedTowerAmenitiesId;
    this.model.building_towers[index].amenities = this.selectedTowerAmenityObj;
    if (this.model.building_towers[index].amenities.length < 1) {
      // swal('Error', 'Please choose tower amenities.', 'error'); return false;
      this.model.building_towers[index].amenities = [];
      this.allTowerAmenityForEdit.map(i => { i.selected = false; return i; });
    }
    // btower.amenities.map(item => { item.images = []; return item; });
    this.model.building_towers[index].amenitiesCount = this.model.building_towers[index].amenities.length;
    this.model.building_tower_edit_index = '-1';
  }

  editTowerAmenity(btoweramenity, index: any) {
    this.towerAmenityIndex = index;
    this.towerEditAmenitiesModal.nativeElement.click();
    // this.allTowerAmenityForEdit.map(item => { item.selected = false; return item; });
    btoweramenity = btoweramenity.filter(op => { if (op.selected === true) { return op; } });
      this.allTowerAmenityForEdit.map(item => {
        if (btoweramenity.find(am => am.id === item.id)) {
          item.selected = true;
        }
        return item;
      });
  }


  setTowerAmenity(a: any, m: any) {
    this.allTowerAmenityForEdit[m].selected = !this.allTowerAmenityForEdit[m].selected;
    this.model.building_towers[this.towerAmenityIndex].amenities =
    this.allTowerAmenityForEdit.filter(op => { if (op.selected === true) { return op; } });
    // this.model.building_towers[this.towerAmenityIndex].amenitiesId =
    // this.allTowerAmenityForEdit.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
    this.model.building_towers[this.towerAmenityIndex].amenitiesId =
    this.allTowerAmenityForEdit.filter(op => { if (op.selected === true) { return op; } });
    this.model.building_towers[this.towerAmenityIndex].amenitiesCount = this.model.building_towers[this.towerAmenityIndex].amenities.length;
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
        reader.onload = function(e) {
          const src = e.target['result'];
          videoTest.src = src;
          const timer = setInterval( () => {
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

  dataURLtoFile(dataurl: any, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
  }

  addMaritalStatus(checked: boolean, i: number) {
    this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
    console.log('aaa', this.testMarital);
  }

}
