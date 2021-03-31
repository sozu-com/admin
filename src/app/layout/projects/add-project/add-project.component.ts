import { Component, OnInit, ViewChild, ElementRef, NgZone, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray,AbstractControl } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/common/property';
import { AddProjectModel, Configuration, Towers, LocalityToCountry, Parking } from 'src/app/models/addProject.model';
import { MapsAPILoader } from '@agm/core';
import { Constant } from 'src/app/common/constants';
import { FileUpload } from 'src/app/common/fileUpload';
import { VideoUpload } from 'src/app/common/videoUpload';
import { CommonService } from 'src/app/services/common.service';
import { ApiConstants } from 'src/app/common/api-constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Manager, Company } from 'src/app/models/company.model';
import { Developer } from 'src/app/models/global.model';
import { TranslateService } from '@ngx-translate/core';
import { Agency } from 'src/app/models/agency.model';
import { LegalEntity } from 'src/app/models/legalEntity.model';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChild('modalAddMoreVideos') modalAddMoreVideos: ElementRef;
  @ViewChild('modalVideosClose') modalVideosClose: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  @ViewChild('openConfigPopup') openConfigPopup: ElementRef;
  @ViewChild('closeConfigPopup') closeConfigPopup: ElementRef;
  @ViewChild('addConfig') addConfig: ElementRef;

  @ViewChild('openDeveloperListModel') openDeveloperListModel: ElementRef;
  @ViewChild('closeDeveloperListModel') closeDeveloperListModel: ElementRef;

  @ViewChild('openManagedByModel') openManagedByModel: ElementRef;
  @ViewChild('closeManagedByModel') closeManagedByModel: ElementRef;

  @ViewChild('towerEditAmenitiesModal') towerEditAmenitiesModal: ElementRef;

  @ViewChild('openAgencyModel') openAgencyModel: ElementRef;
  @ViewChild('closeAgencyListModel') closeAgencyListModel: ElementRef;

  @ViewChild('openLegalEnityModel') openLegalEnityModel: ElementRef;
  @ViewChild('closeLegalEnityListModel') closeLegalEnityListModel: ElementRef;
  @ViewChild('linkUserModal') linkUserModal: ElementRef;
  @ViewChild('closeLinkUserModal') closeLinkUserModal: ElementRef;
  myform: FormGroup;
  myform2: FormGroup;

  public zoom: number;

  canEditdeveloperInfo: boolean;
  canEditContributionInfo: boolean;
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
  all_developers: Array<Developer>;
  agencies: Array<Agency>;
  legalEntities: Array<LegalEntity>;
  all_managers: Array<Manager>;
  all_companies: Array<Company>;
  amenity_index: number;
  amenity_obj: any;
  selected_amenities: any = [];
  new_config: any = new Configuration;
  new_custom: any = { name: '', value: '' };
  new_config_edit: any;
  FU: any = {};
  initialCountry = { initialCountry: 'mx' };

  file1: FileUpload;
  file2: FileUpload;
  file3: FileUpload;
  file4: FileUpload;
  file5: FileUpload;
  file6: FileUpload;
  file7: FileUpload;
  file8: FileUpload;
  amen360Img: FileUpload;
  amenVideo: VideoUpload;
  config360Img: FileUpload;
  configVideo: FileUpload;
  projectLogo: FileUpload;

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
  allAmenvideos = [];
  videoSrc: any;
  keyword: string;
  testMarital = [
    {
      id: 1,
      name: this.translate.instant('addForm.maritalStatus.married'),
      checked: false
    },
    {
      id: 2,
      name: this.translate.instant('addForm.maritalStatus.unmarried'),
      checked: false
    },
    {
      id: 3,
      name: this.translate.instant('addForm.maritalStatus.divorced'),
      checked: false
    }
  ];
  showPolicy = false;
  showMaintenance = false;
  showPreferableBuyer = false;
  private single = false;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  users = [];
  seller_type: any;
  user_type: any;
  parkinLot_sum: any = 0 ;
  parkingRent_sum: any = 0 ;
  both_sum: any = 0;
  tempSetLegalEntity: any[] = [];
  userForm: FormGroup;
  obtainedMarks: null
  toggleSelectedDetails: {
    isCreditCardChecked: boolean 
  } =
    {
      isCreditCardChecked: false
    };
  constructor(
    public model: AddProjectModel,
    private admin: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public constant: Constant,
    private apiConstants: ApiConstants,
    private cs: CommonService,
    private element: ElementRef,
    private spinner: NgxSpinnerService,
    private translate: TranslateService, private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
  }
  // getTotal(marks) {
  //   return marks.reduce((acc, {obtainedMarks}) => acc += +(obtainedMarks || 0), 0);
  // }
  ngOnInit() {
    this.getParkingLotSpaces();
    // this.parkinLot_sum;
    // this.parkingRent_sum;
    this.model.building_contributors_param = [];
    this.model.building_contributors = [];
    this.name = '';
    this.file1 = new FileUpload(true, this.admin);
    this.file2 = new FileUpload(false, this.admin);
    this.file3 = new FileUpload(true, this.admin);
    this.file4 = new FileUpload(false, this.admin);
    this.file5 = new FileUpload(true, this.admin);
    this.file6 = new FileUpload(true, this.admin);
    this.file7 = new FileUpload(false, this.admin);
    this.file8 = new FileUpload(false, this.admin);
    this.projectLogo = new FileUpload(true, this.admin);
    this.amen360Img = new FileUpload(false, this.admin);
    this.amenVideo = new VideoUpload(false, this.admin);
    this.config360Img = new FileUpload(false, this.admin);
    this.configVideo = new FileUpload(false, this.admin);

    this.route.params.subscribe(params => {
      this.id = params.id;
      this.newTower = new Towers();
    
      if (this.id) {
        /* if id exists edit mode */
        let self = this;
        this.canEditdeveloperInfo = false;
        this.spinner.show()
        this.admin.postDataApi('getProjectById', { building_id: this.id }).subscribe(r => {
          this.spinner.hide();
          this.model = JSON.parse(JSON.stringify(r.data));
          this.model.parking_space_lots = r.data.parking_space_lots;
          //sum parking
          let sum: any = 0;
          this.model.parking_space_lots.forEach(a => sum += parseInt(a.no_parking));
           console.log(sum);
          this.parkinLot_sum = sum
          let sum1: any = 0;
          this.model.parking_space_rent.forEach(a => sum1 += parseInt(a.no_parking));
           console.log(sum1,"rent");
          this.parkingRent_sum = sum1

          // console.log(this.parkinLot_sum,"viewtime");
          // let sum2: any = this.model.parking_space_rent.map(a => a.no_parking).reduce(function(a, b)
          // {
          //   return a + b;
          // });
          // this.parkingRent_sum = sum2
          // console.log(this.parkinLot_sum,"view resnt");
          this.both_sum = parseInt(this.parkinLot_sum) + parseInt(this.parkingRent_sum);
          console.log(this.both_sum,"view 0");
          //end parking sum
          this.model.parking_space_rent = r.data.parking_space_rent;
          self.model.building_contributors_param = self.model.building_contributors_param ? self.model.building_contributors_param : [];
          self.model.building_contributors = []
          r.data.building_contributors.forEach(element => {
            self.model.building_contributors_param.push({
              id: element.user_type == 1 ? element.users.id : element.legal_entity.id,
              name: element.user_type == 1 ? (element.users.name + " " + (element.users.first_name ? element.users.first_name + ' ' : '') + (element.users.second_name ? element.users.second_name : ''))
                : (element.legal_entity.comm_name),
              phone: element.user_type == 1 ? element.users.phone : element.legal_entity.phone,
              email: element.user_type == 1 ? element.users.email : element.legal_entity.email
            });
            this.model.building_contributors.push({ user_type: element.user_type, users_id: element.user_type == 1 ? element.users.id : element.legal_entity.id, building_id: r.data.id });
          });
          this.model.manager = r.data.manager ? r.data.manager : new Manager();
          this.model.company = r.data.company ? r.data.company : new Company();
          this.model.agency = r.data.agency ? r.data.agency : new Agency();
          //this.model.legal_entity = r.data.legal_entity ? r.data.legal_entity : new LegalEntity();
          this.assignedLegalEntity();
          // this.model.videos = this.model.videos && this.model.videos.length > 0 ? JSON.parse(this.model.videos) : [];
          if (r.data['locality']) {
            this.setCountryToLocality(r.data['locality']);
          }
          this.setMaintenanceAndPolicy(r.data);
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
          this.projectLogo.image = this.model.project_logo;
          this.model.configurations.map((item) => {
            item.building_configuration_id = item.id;
          });

          this.model.custom_attributes = this.model.custom_values;
          this.file5.image = this.model.developer.image;
          this.file6.image = this.model.developer.developer_image;
          this.admin.postDataApi('getAmenities', { hide_blocked: 1 }).subscribe(res => {
            this.all_amenities = res.data.map(item => {
              item.selected = false;
              item.images = [];
              item.images360 = [];
              item.images_360 = [];
              item.videos = [];
              return item;
            });
            this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
            this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

            for (let index = 0; index < this.all_amenities.length; index++) {
              for (let i = 0; i < this.model.amenities.length; i++) {
                if (this.model.amenities[i].id === this.all_amenities[index].id) {
                  this.all_amenities[index].selected = true;
                  const pivot = this.model.amenities[i]['pivot'];
                  this.all_amenities[index].images = pivot.images ? pivot.images : [];
                  this.all_amenities[index].images_360 = pivot.images_360 ? pivot.images_360 : [];
                  this.all_amenities[index].videos = pivot.videos ? pivot.videos : [];
                }
              }
            }

            if (this.model.building_towers && this.model.building_towers.length > 0) {
              // setting true to tower selected amenities
              this.model.building_towers.map(item => {
                item.amenitiesCount = item.amenities.length;
                item.amenities.map(i => {
                  i.selected = true;
                  return i;
                });
              });

              // tower amenitites id array only
              this.model.building_towers.forEach(element => {
                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                element.amenitiesId = element.amenities.map(op => {
                  const pivot = op['pivot'];
                  op.images = pivot.images ? pivot.images : [];
                  op.images_360 = pivot.images_360 ? pivot.images_360 : [];
                  op.videos = pivot.videos ? pivot.videos : [];
                  return op.id;
                });
              });
            } else {
              this.model.building_towers = [];
            }
          });
          this.zoom = 18;
        }, error => {
          this.spinner.hide();
        });
      } else if (params.request_id) {
        /* if request_id exists, building request edit mode */
        this.canEditdeveloperInfo = false;
        this.canEditContributionInfo = false
        this.spinner.show();
        this.admin.postDataApi('getBuildingRequest', { building_request_id: params.request_id }).subscribe(r => {
          this.spinner.hide();
          this.model = JSON.parse(JSON.stringify(r.data));
          this.model.manager = r.data.manager ? r.data.manager : new Manager();
          this.model.company = r.data.company ? r.data.company : new Company();
          this.model.agency = r.data.agency ? r.data.agency : new Agency();
          this.model.legal_entity = r.data.legal_entity ? r.data.legal_entity : new LegalEntity();
          if (r.data['locality']) {
            this.setCountryToLocality(r.data['locality']);
          }
          this.setMaintenanceAndPolicy(r.data);
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
          this.projectLogo.image = this.model.project_logo;
          if (this.model.configurations) {
            this.model.configurations.map((item) => {
              item.building_configuration_id = item.id;
            });
          }
          this.model.custom_attributes = this.model.custom_values;
          this.file5.image = this.model.developer.image;
          this.file6.image = this.model.developer.developer_image;
          this.admin.postDataApi('getAmenities', { hide_blocked: 1 }).subscribe(res => {
            this.all_amenities = res.data.map(item => {
              item.selected = false;
              item.images = [];
              item.images360 = [];
              item.images_360 = [];
              item.videos = [];
              return item;
            });
            this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
            this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

            for (let index = 0; index < this.all_amenities.length; index++) {
              if (this.model.amenities && this.model.amenities.length > 0) {
                for (let i = 0; i < this.model.amenities.length; i++) {
                  if (this.model.amenities[i].id === this.all_amenities[index].id) {
                    this.all_amenities[index].selected = true;
                    const pivot = this.model.amenities[i]['pivot'];
                    this.all_amenities[index].images = pivot.images ? pivot.images : [];
                    this.all_amenities[index].images_360 = pivot.images_360 ? pivot.images_360 : [];
                    this.all_amenities[index].videos = pivot.videos ? pivot.videos : [];
                  }
                }
              }
            }


            if (this.model.building_towers && this.model.building_towers.length > 0) {
              // setting true to tower selected amenities
              this.model.building_towers.map(item => {
                item.amenitiesCount = item.amenities.length;
                item.amenities.map(i => {
                  i.selected = true;
                  return i;
                });
              });

              // tower amenitites id array only
              this.model.building_towers.forEach(element => {
                // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
                element.amenitiesId = element.amenities.map(op => {
                  const pivot = op['pivot'];
                  op.images = pivot.images ? pivot.images : [];
                  op.images_360 = pivot.images_360 ? pivot.images_360 : [];
                  op.videos = pivot.videos ? pivot.videos : [];
                  return op.id;
                });
              });
            } else {
              this.model.building_towers = [];
            }
          });
          this.zoom = 18;
        }, error => {
          this.spinner.hide();
        });
      } else {
        this.model = new AddProjectModel();
        this.testMarital[0].checked = true;
        this.model.marital_status = [1];
        this.model.floors = 0;
        this.model.building_towers = [];
        this.model.building_tower_edit_index = '-1';
        this.canEditdeveloperInfo = true;
        this.canEditContributionInfo = true;
        this.admin.postDataApi('getAmenities', { hide_blocked: 1 }).subscribe(res => {
          this.all_amenities = res.data.map(item => {
            item.selected = false;
            item.images = [];
            item.images360 = [];
            item.images_360 = [];
            item.videos = [];
            return item;
          });
          this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
          this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

        });
        this.model.dev_countrycode = 'mx';
        this.model.dev_dialcode = '+52';
        this.model.parking_space_rent = new Array<Parking>();
        this.assignedLegalEntity();
        this.initModel();
      }
      this.zoom = 6;
    });

    this.setCurrentPosition();
    this.getCountries('');
    this.initForm();
    this.admin.postDataApi('getPossessionStatuses', { hide_blocked: 1 }).subscribe(r => {
      this.all_possession_statuses = r.data;
    });
    this.admin.postDataApi('getBuildingTypes', { hide_blocked: 1 }).subscribe(r => {
      this.all_building_types = r.data;
    });

    this.admin.postDataApi('getConfigurations', { hide_blocked: 1 }).subscribe(r => {
      this.all_configurations = r.data;
    });
  }

  setCountryToLocality(locality: LocalityToCountry) {
    this.getStates(locality.city.state.country.id, '');
    this.getCities(locality.city.state.id, '');
    this.getLocalities(locality.city.id, '');
    this.setValue('locality_id', locality.id);
  }

  setMaintenanceAndPolicy(data) {
    this.model.policies = data.policies;
    this.model.maintenance = data.maintenance;
    this.model.maintenance_cost = data.maintenance_cost;
    this.model.maintenance_cost_type = data.maintenance_cost_type;
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
        success => {
          this.parameter.countries = success['data'];
        }
      );
  }

  getStates(country_id: any, keyword: string) {
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
    });
  }

  getCities(state_id: any, keyword: string) {
    this.model.state_id = state_id;
    this.model.city_id = '';
    this.model.locality_id = '';
    this.parameter.localities = [];
    const input = new FormData();
    input.append('state_id', state_id);

    this.admin.postDataApi('getCities', input).subscribe(success => {
      this.parameter.cities = success['data'];
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

    this.admin.postDataApi('getLocalities', input)
      .subscribe(
        success => {
          this.parameter.localities = success['data'];
        }
      );
  }

  setValue(key: any, value: any) {
    this.model[key] = value;
  }

  searchAmenity(keyword: string) {
    const input = { keyword: '', hide_blocked: 1 };
    input.keyword = keyword;
    this.admin.postDataApi('getAmenities', input).subscribe(res => {
      // this.all_amenities = res.data.map(item => { item.selected = false; item.images = []; return item; });
      this.all_amenities = res.data.map(item => {
        item.selected = false;
        item.images = [];
        item.images360 = [];
        item.images_360 = [];
        item.videos = [];
        return item;
      });
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
    let count = 0;
    // if (this.file2.files.length < 1) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
    //   return false;
    // }
    this.file2.upload().then(r => {
      this.model.images = this.file2.files;
    });
    this.file2.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    if (count === this.file2.files.length) {
      this.modalClose.nativeElement.click();
    }
  }

  modelOpen360ImgFun() {
    this.modal360ImageOpen.nativeElement.click();
    this.file7.backup(JSON.parse(JSON.stringify(this.model.images360)));
  }

  modelOpenVideos() {
    this.modalAddMoreVideos.nativeElement.click();
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.model.videos)));
  }

  modelClose360ImgFun() {
    this.modal360ImageClose.nativeElement.click();
  }

  save360Images() {
    let count = 0;
    // if (this.file7.files.length < 1) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
    //   return false;
    // }
    this.file7.upload().then(r => {
      this.model.images360 = this.file7.files;
    });
    this.file7.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    if (count === this.file7.files.length) {
      this.modal360ImageClose.nativeElement.click();
    }
  }

  saveVideos() {
    let count = 0;
    // if (this.amenVideo.files.length < 1) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
    //   return false;
    // }
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


  modelAmenityOpenFun(amenityObj: any, index: number) {
    this.amenity_index = index;
    this.amenity_obj = amenityObj;
    this.modalAmenOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.all_amenities[index].images ? this.all_amenities[index].images : [])));
    this.amen360Img.backup(JSON.parse(JSON.stringify(this.all_amenities[index].images_360 ?
      this.all_amenities[index].images_360 : [])));
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.all_amenities[index].videos ? this.all_amenities[index].videos : [])));
  }

  modelAmenityCloseFun() {
    this.modalAmenClose.nativeElement.click();
  }

  async saveAmenityImages() {
    let count = 0;
    const totalFilesCount = this.file2.files.length + this.amen360Img.files.length + this.amenVideo.files.length;
    // if (totalFilesCount < 1) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
    //   return false;
    // }
    this.file2.upload().then(r => {
      this.all_amenities[this.amenity_index].images = this.file2.files;
    });
    this.amen360Img.upload().then(r => {
      this.all_amenities[this.amenity_index].images_360 = this.amen360Img.files;
    });
    this.amenVideo.upload().then(r => {
      this.all_amenities[this.amenity_index].videos = this.amenVideo.files;
    });

    this.file2.files.forEach(element => {
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

  modelTowerAmenityOpenFun(amenityObj: any, index: number) {
    this.amenity_index = index;
    this.amenity_obj = amenityObj;
    this.allTowerAmenities[index] = amenityObj;
    // this.allTowerAmenityForEdit[index] = amenityObj;
    this.modalTowerAmenOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.allTowerAmenities[index].images ? this.allTowerAmenities[index].images : [])));
    this.amen360Img.backup(JSON.parse(JSON.stringify(this.allTowerAmenities[index].images_360 ?
      this.allTowerAmenities[index].images_360 : [])));
    this.amenVideo.backup(JSON.parse(JSON.stringify(this.allTowerAmenities[index].videos ? this.allTowerAmenities[index].videos : [])));
  }

  modelTowerAmenityCloseFun() {
    this.modalTowerAmenClose.nativeElement.click();
  }

  saveTowerAmenityImages() {
    let count = 0;
    const totalFilesCount = this.file2.files.length + this.amen360Img.files.length + this.amenVideo.files.length;
    if (this.file2.files.length > 6) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.chooseMax6Images'), 'error');
      return false;
    }
    if (this.amen360Img.files.length > 6) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.chooseMax6360Images'), 'error');
      return false;
    }
    if (this.amenVideo.files.length > 6) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.chooseMax6Videos'), 'error');
      return false;
    }

    this.file2.upload().then(r => {
      this.allTowerAmenities[this.amenity_index].images = this.file2.files;
    });
    this.amen360Img.upload().then(r => {
      this.allTowerAmenities[this.amenity_index].images_360 = this.amen360Img.files;
    });
    this.amenVideo.upload().then(r => {
      this.allTowerAmenities[this.amenity_index].videos = this.amenVideo.files;
    });

    this.file2.files.forEach(element => {
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
      this.modalTowerAmenClose.nativeElement.click();
    }
  }

  loadPlaces() {
    // load Places Autocomplete
    this.model.lat = null;
    this.model.lng = null;
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
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setting address lat lng
        this.model.lat = this.model.lat ? this.model.lat : position.coords.latitude;
        this.model.lng = this.model.lng ? this.model.lng : position.coords.longitude;
      });
    }
  }

  placeMarker($event: any) {
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
      country: new FormControl('', [
        Validators.required
      ]),
      state: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
        Validators.required
      ]),
      locality: new FormControl('', [
        Validators.required
      ]),
      address: new FormControl('', [
        Validators.required
      ])
      // building_age: new FormControl('', [
      //   Validators.required
      // ]),
      // building_type: new FormControl('', [
      //   Validators.required
      // ]),
      // floors: new FormControl('', [
      //   Validators.required
      // ]),
      // avg_price: new FormControl('', [
      //   Validators.required
      // ]),
      // description: new FormControl('', [
      //   Validators.required
      // ]),
      // possession_status_id: new FormControl('', [
      //   Validators.required
      // ])
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
    this.config360Img.files = [];
    this.configVideo.files = [];
  }

  selectConfiguration(id: string, parentModel: any) {
    const childModel = this.all_configurations.filter(r => r.id === id);
    parentModel.config = childModel[0];
  }

  editConfiguration(config, index) {
    this.new_config_edit = index;
    this.new_config = JSON.parse(JSON.stringify(config));
    this.new_config.building_configuration_id = this.new_config.id;
    this.file3.image = config.floor_map_image;
    this.file4.files = [];
    this.config360Img.files = [];
    this.configVideo.files = [];

    config.images.forEach((item, i: number) => {
      this.file4.files.push(item);
    });
    config.images360.forEach((item, i: number) => {
      this.config360Img.files.push(item);
    });
    config.videos.forEach((item, i: number) => {
      this.configVideo.files.push(item);
    });
    this.openConfigPopup.nativeElement.click();
  }

  deleteConfiguration(index) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDeleteConf'),
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

  // addNewConfig() {
  //   if (this.file4.files.length < 1) {
  //     swal(this.translate.instant('swal.error'), 'Please choose atleast one image for other images', 'error'); return false;
  //   }
  //   this.closeConfigPopup.nativeElement.click();
  //   this.spinner.show();
  //   this.file3.upload().then(r => {
  //     this.file4.upload().then(r1 => {
  //       this.spinner.hide();
  //       this.new_config.floor_map_image = this.file3.image;
  //       this.new_config.images = this.file4.files;
  //       this.new_config.images360 = this.config360Img.files;
  //       this.new_config.videos = this.configVideo.files;
  //       if (this.new_config_edit >= 0) {
  //         this.model.configurations[this.new_config_edit] = this.new_config;
  //       } else {
  //         this.model.configurations.push(this.new_config);
  //       }
  //       this.new_config = new Configuration();
  //     }, error => {
  //       this.spinner.hide();
  //     });
  //   },
  //     error => {
  //       this.spinner.hide();
  //     });
  // }

  addNewConfig() {
    let count = 0;
    const totalFilesCount = this.file4.files.length + this.config360Img.files.length + this.configVideo.files.length;
    if (this.file4.files.length < 1) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error');
      return false;
    }
    // this.spinner.show();
    // this.file3.upload().then(r => {
    this.new_config.floor_map_image = this.file3.image;
    // });

    this.file4.upload().then(r1 => {
      this.new_config.images = this.file4.files;
    });

    this.config360Img.upload().then(r1 => {
      this.new_config.images360 = this.config360Img.files;
    });

    this.configVideo.upload().then(r1 => {
      this.new_config.videos = this.configVideo.files;
    });

    this.file4.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    this.config360Img.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });
    this.configVideo.files.forEach(element => {
      if (element.loading !== true) {
        count++;
      }
    });

    if (count === totalFilesCount) {
      this.spinner.hide();
      if (this.new_config_edit >= 0) {
        this.model.configurations[this.new_config_edit] = this.new_config;
      } else {
        this.model.configurations.push(this.new_config);
      }

      this.new_config = new Configuration();
      this.closeConfigPopup.nativeElement.click();
    }
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
    const legal_entity_ids = [];
    this.model.legal_entity.forEach((data) => {
      legal_entity_ids.push({ legal_entity_id: data.id });
    });
    this.model.legal_entity_info = legal_entity_ids;
    const modelSave = JSON.parse(JSON.stringify(this.model));

    modelSave.marital_status = JSON.stringify(this.model.marital_status);
    modelSave.is_completed = 0;
    modelSave.cover_image = this.file1.image;
    modelSave.project_logo = this.projectLogo.image;
    modelSave.document = this.model.document;
    if (this.model.doc_loader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingDocument'), 'error');
      return;
    }
    if (this.model.videoLoader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingVideo'), 'error');
      return;
    }
    if (!modelSave.country_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectCountry'), 'error');
      return false;
    }
    if (!modelSave.state_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectState'), 'error');
      return false;
    }
    if (!modelSave.city_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectCity'), 'error');
      return false;
    }
    if (!modelSave.locality_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocality'), 'error');
      return false;
    }
    // if (!modelSave.possession_status_id) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectPossesionStatus'), 'error');
    //   return false;
    // }

    // if (!modelSave.building_towers || modelSave.building_towers.length == 0) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddAtleastOneTower'), 'error');
    //   return false;
    // }

    // launch date to be mandatory possession_status == presale
    // if (modelSave.possession_status_id &&
    //   (modelSave.possession_status_id.toString() === this.apiConstants.possession_status_id) &&
    //   !modelSave.launch_date) {
    //     swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLaunchDate'), 'error');
    //   return false;
    // }
    if (modelSave.images) {
      modelSave.building_images = modelSave.images.map(r => r.image);
    }
    if (modelSave.images360) {
      modelSave.images360 = modelSave.images360.map(r => r.image);
    }

    // modelSave.videos = modelSave.videos ? JSON.stringify(modelSave.videos) : JSON.stringify([]);
    modelSave.videos = modelSave.videos ? modelSave.videos : JSON.stringify([]);
    modelSave.dev_name = modelSave.developer.name;
    modelSave.dev_email = modelSave.developer.email;
    modelSave.dev_phone = modelSave.developer.phone;
    modelSave.dev_countrycode = modelSave.developer.country_code ? modelSave.developer.country_code : this.constant.country_code;
    modelSave.dev_dialcode = modelSave.developer.dial_code ? modelSave.developer.dial_code : this.constant.dial_code;
    modelSave.dev_logo = this.file5.image;
    modelSave.developer_image = this.file6.image;
    modelSave.amenities = this.all_amenities.filter(op => {
      if (op.selected === true) {
        return op;
      }
    });

    if (modelSave.amenities && modelSave.amenities.length > 0) {
      modelSave.amenities.forEach(element => {
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
    }

    if (modelSave.configurations && modelSave.configurations.length > 0) {
      modelSave.configurations.forEach(item => {
        item.images = item.images.map(x => x.image);
        item.images360 = item.images360.map(x => x.image);
        // item.videos = item.videos.map(x => x.video);
        const vid = [];
        item.videos.forEach(e => {
          let s = {};
          s = { 'video': e.video, 'thumb': e.thumb };
          vid.push(s);
        });
        item.videos = vid;
      });
    }

    modelSave.building_towers = this.model.building_towers;
    if (modelSave.building_towers && modelSave.building_towers.length > 0) {
      modelSave.building_towers.forEach(element1 => {
        element1.amenities.forEach(element => {
          const img = [];
          const img_360 = [];
          const vid = [];
          if (element.images && element.images.length > 0) {
            element.images.forEach(e => {
              img.push(e.image);
            });
          }
          element.images = img;

          if (element.images_360 && element.images_360.length > 0) {
            element.images_360.forEach(e => {
              img_360.push(e.image);
            });
          }
          element.images360 = img_360;

          if (element.videos && element.videos.length > 0) {
            element.videos.forEach(e => {
              let s = {};
              s = { 'video': e.video, 'thumb': e.thumb };
              vid.push(s);
            });
          }
          element.videos = vid;
        });
      });
    }

    /* remove fields for edit */
    // if (!modelSave.name) {swal(this.translate.instant('swal.error'), 'Please add building name', 'error'); return false; }
    // if (!modelSave.address) {swal(this.translate.instant('swal.error'), 'Please add address', 'error'); return false; }
    // if (!modelSave.cover_image) {swal(this.translate.instant('swal.error'), 'Please add cover image', 'error'); return false; }
    // if (!modelSave.cover_image) {swal(this.translate.instant('swal.error'), 'Please add cover image', 'error'); return false; }
    // if (modelSave.building_images.length < 1) {swal(this.translate.instant('swal.error'), 'Please add atleast one more building image', 'error'); return false; }
    // if (!modelSave.building_age) {swal(this.translate.instant('swal.error'), 'Please add building age', 'error'); return false; }
    // if (!modelSave.building_type_id) {swal(this.translate.instant('swal.error'), 'Please add building type', 'error'); return false; }
    // if (!modelSave.description) {swal(this.translate.instant('swal.error'), 'Please add building description', 'error'); return false; }
    // if (!modelSave.possession_status_id) {swal(this.translate.instant('swal.error'), 'Please add possession status', 'error'); return false; }
    // if (!modelSave.floors) {swal(this.translate.instant('swal.error'), 'Please add floors', 'error'); return false; }
    // if (!modelSave.launch_date) {swal(this.translate.instant('swal.error'), 'Please add building launch date', 'error'); return false; }
    // if (!modelSave.avg_price) {swal(this.translate.instant('swal.error'), 'Please add building average price', 'error'); return false; }
    // if (modelSave.amenities.length < 1) {swal(this.translate.instant('swal.error'), 'Please add amenities', 'error'); return false; }
    // if (modelSave.configurations.length < 1) {swal(this.translate.instant('swal.error'), 'Please add building configuration', 'error'); return false; }
    // if (!this.id) {
    //   if (!modelSave.dev_name) {swal(this.translate.instant('swal.error'), 'Please add developer name', 'error'); return false; }
    //   if (!modelSave.dev_countrycode) {swal(this.translate.instant('swal.error'), 'Please add developer country code', 'error'); return false; }
    //   if (!modelSave.dev_email) {swal(this.translate.instant('swal.error'), 'Please add developer email', 'error'); return false; }
    //   if (!modelSave.dev_phone) {swal(this.translate.instant('swal.error'), 'Please add developer phone', 'error'); return false; }
    //   if (!modelSave.dev_logo) {swal(this.translate.instant('swal.error'), 'Please add developer image', 'error'); return false; }
    // }

    if (modelSave.dev_email) {
      if (!modelSave.dev_name) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddDeveloperName'), 'error');
        return false;
      }
      if (!modelSave.dev_countrycode) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddDeveloperCountryCode'), 'error');
        return false;
      }
      if (!modelSave.dev_email) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddDeveloperEmail'), 'error');
        return false;
      }
      if (!modelSave.dev_phone) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddDeveloperPhone'), 'error');
        return false;
      }
      if (!modelSave.dev_logo) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddDeveloperImage'), 'error');
        return false;
      }
    }
    // without information 0, basic information 2, semicompleted 3, completed 1

    const isAnyAmenitiesCheck = this.anyAmenitiesChecked();
    const isBuildingTowerDetailsAvailable = this.buildingTowerDetailsAvailable(modelSave.building_towers)
    // to without information
    if (
      modelSave.name && modelSave.country_id && modelSave.state_id &&
      modelSave.city_id && modelSave.locality_id && modelSave.address && modelSave.address != null &&
      modelSave.lat && modelSave.lng && modelSave.possession_status_id
    ) {
      modelSave.is_completed = 0;
    }

    // to basic information
    if (
      // modelSave.cover_image && (modelSave.images || []).length > 0 && 
      modelSave.name && modelSave.country_id && modelSave.state_id &&
      modelSave.city_id && modelSave.locality_id && modelSave.address && modelSave.address != null &&
      modelSave.lat && modelSave.lng && modelSave.building_type_id && modelSave.num_of_properties
      //&& modelSave.description && modelSave.description != null 
      && modelSave.possession_status_id &&
      //isAnyAmenitiesCheck && (modelSave.amenities || []).length > 0 &&
      (modelSave.building_towers || []).length > 0 && isBuildingTowerDetailsAvailable
    ) {
      modelSave.is_completed = 2;
    }

    // to semicompleted
    if (
      modelSave.cover_image && (modelSave.images || []).length > 0 &&
      modelSave.name && modelSave.country_id && modelSave.state_id &&
      modelSave.city_id && modelSave.locality_id && modelSave.address && modelSave.address != null &&
      modelSave.lat && modelSave.lng &&
      //modelSave.document && 
      modelSave.building_type_id && modelSave.num_of_properties
      && modelSave.description && modelSave.description != null
      && modelSave.possession_status_id &&
      //modelSave.launch_date && 
      isAnyAmenitiesCheck &&
      (modelSave.amenities || []).length > 0 && (modelSave.configurations || []).length > 0 && (modelSave.building_towers || []).length > 0 &&
      isBuildingTowerDetailsAvailable && (((modelSave || {}).developer || {}).id || modelSave.developer_by) &&
      (((modelSave || {}).agency || {}).id || modelSave.agency_by)
    ) {
      modelSave.is_completed = 3;
    }

    // to completed
    if (
      modelSave.cover_image && (modelSave.images || []).length > 0 && (modelSave.images360 || []).length > 0 &&
      (modelSave.videos || []).length > 0 && modelSave.name && modelSave.country_id && modelSave.state_id &&
      modelSave.city_id && modelSave.locality_id && modelSave.address && modelSave.address != null &&
      modelSave.lat && modelSave.lng
      //&& modelSave.document 
      && modelSave.building_type_id && modelSave.num_of_properties
      && modelSave.description && modelSave.description != null && modelSave.possession_status_id
      //&& modelSave.launch_date 
      && isAnyAmenitiesCheck &&
      (modelSave.amenities || []).length > 0 && (modelSave.configurations || []).length > 0 && (modelSave.building_towers || []).length > 0 &&
      isBuildingTowerDetailsAvailable && (((modelSave || {}).developer || {}).id || modelSave.developer_by) &&
      (((modelSave || {}).manager || {}).id || ((modelSave || {}).company || {}).id || modelSave.managed_by) && (((modelSave || {}).agency || {}).id || modelSave.agency_by)
    ) {
      modelSave.is_completed = 1;
    }

    if (this.model.building_request_id) {
      modelSave.building_request_id = this.model.building_request_id;
    }

    if (this.id) {
      modelSave.building_id = this.id;
      modelSave.developer_id = modelSave.developer.id;
      modelSave.manager_id = modelSave.manager && modelSave.manager.id ? modelSave.manager.id : null;
      modelSave.company_id = modelSave.company && modelSave.company.id ? modelSave.company.id : null;
      modelSave.agency_id = modelSave.agency && modelSave.agency.id ? modelSave.agency.id : null;
      modelSave.legal_entity_id = modelSave.legal_entity && modelSave.legal_entity.id ? modelSave.legal_entity.id : null;
      this.spinner.show();
      this.admin.postDataApi('updateProject', modelSave).subscribe(success => {
        this.spinner.hide();
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
         //sum parking
         let sum: any = 0;
         this.model.parking_space_lots.forEach(a => sum += parseInt(a.no_parking));
          console.log(sum);
         this.parkinLot_sum = sum

         let sum1: any = 0;
         this.model.parking_space_rent.forEach(a => sum1 += parseInt(a.no_parking));
          console.log(sum1,"rent");
         this.parkingRent_sum = sum1
         
         this.both_sum = this.parkinLot_sum + this.parkingRent_sum;
         console.log(this.both_sum,"view 0");
         //end parking sum
        // set model to avoid duplication creation of project
        this.setProjectModel(success['data']);

        // this.router.navigate(['/dashboard/projects/view-projects']);
      }, error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
      });
    } else {
      delete modelSave.id;
      delete modelSave.building_id;
      this.spinner.show();
      this.admin.postDataApi('addProject', modelSave).subscribe(success => {
        this.spinner.hide();
        swal(this.translate.instant('swal.success'), this.translate.instant('message.success.addedSuccessfully'), 'success');
        // set model to avoid duplication creation of project
        this.id = success['data'].id;
        this.setProjectModel(success['data']);
        // this.router.navigate(['/dashboard/projects/view-projects']);
      }, error => {
        this.spinner.hide();
        swal(this.translate.instant('swal.error'), error.message, 'error');
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

  config360ImgSelect($event) {
    // if ((this.file4.files.length + $event.target.files.length) > 6) {
    //   swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
    //   return false;
    // }
    this.config360Img.onSelectFile($event);
  }

  configVideosSelect($event) {
    // if ((this.file4.files.length + $event.target.files.length) > 6) {
    //   swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
    //   return false;
    // }
    this.configVideo.onSelectFile($event);
  }

  file7Select($event) {
    this.file7.onSelectFile($event);
  }

  file8Select($event) {
    const uu = this.file8.onSelectFile($event);
  }

  addNewCustom() {
    if (!this.new_custom.name || !this.new_custom.value) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseAddParameterNameandValue'), 'error');
      return false;
    }
    this.model.custom_attributes.unshift(this.new_custom);
    this.new_custom = { name: '', value: '' };
  }

  setProjectModel(data) {
    this.model = JSON.parse(JSON.stringify(data));
    this.assignedLegalEntity();
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
    let self = this;
    self.model.building_contributors_param = self.model.building_contributors_param ? self.model.building_contributors_param : [];
    self.model.building_contributors = []
    if (data.building_contributors && data.building_contributors.length > 0) {
      data.building_contributors.forEach(element => {
        self.model.building_contributors_param.push({
          id: element.user_type == 1 ? element.users.id : element.legal_entity.id,
          name: element.user_type == 1 ? (element.users.name + " " + (element.users.first_name ? element.users.first_name + ' ' : '') + (element.users.second_name ? element.users.second_name : ''))
            : (element.legal_entity.comm_name),
          phone: element.user_type == 1 ? element.users.phone : element.legal_entity.phone,
          email: element.user_type == 1 ? element.users.email : element.legal_entity.email
        });
        this.model.building_contributors.push({ user_type: element.user_type, users_id: element.user_type == 1 ? element.users.id : element.legal_entity.id, building_id: data.id });
      });
    }
    this.file1.image = this.model.main_image;
    this.projectLogo.image = this.model.project_logo;
    this.model.configurations.map((item) => {
      item.building_configuration_id = item.id;
    });
    this.model.custom_attributes = this.model.custom_values;
    this.file5.image = this.model.developer.image;
    this.file6.image = this.model.developer.developer_image;

    if (data['locality']) {
      this.setCountryToLocality(data['locality']);
    }

    this.admin.postDataApi('getAmenities', { hide_blocked: 1 }).subscribe(res => {
      this.all_amenities = res.data.map(item => {
        item.selected = false;
        item.images = [];
        return item;
      });
      this.allTowerAmenities = JSON.parse(JSON.stringify(this.all_amenities));
      this.allTowerAmenityForEdit = JSON.parse(JSON.stringify(this.all_amenities));

      for (let index = 0; index < this.all_amenities.length; index++) {
        for (let i = 0; i < this.model.amenities.length; i++) {
          if (this.model.amenities[i].id === this.all_amenities[index].id) {
            this.all_amenities[index].selected = true;
            const pivot = this.model.amenities[i]['pivot'];
            this.all_amenities[index].images = pivot.images ? pivot.images : [];
            this.all_amenities[index].images_360 = pivot.images_360 ? pivot.images_360 : [];
            this.all_amenities[index].videos = pivot.videos ? pivot.videos : [];
          }
        }
      }
    });


    if (this.model.building_towers && this.model.building_towers.length > 0) {
      // setting true to tower selected amenities
      this.model.building_towers.map(item => {
        item.amenitiesCount = item.amenities.length;
        item.amenities.map(i => {
          i.selected = true;
          return i;
        });
      });

      // tower amenitites id array only
      this.model.building_towers.forEach(element => {
        // const ele_ame = JSON.parse(JSON.stringify(element.amenities));
        element.amenitiesId = element.amenities.map(op => {
          const pivot = op['pivot'];
          op.images = pivot.images ? pivot.images : [];
          op.images_360 = pivot.images_360 ? pivot.images_360 : [];
          op.videos = pivot.videos ? pivot.videos : [];
          return op.id;
        });
      });
    } else {
      this.model.building_towers = [];
    }
    //this.assignedLegalEntity();
  }

  selectDeveloper(name: string, type: number) {
    this.spinner.show();
    this.admin.postDataApi('getUnblockedDevelopers', { name: name }).subscribe(r => {
      this.spinner.hide();
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

  removeDeveloper(name: string, type: number) {
    this.canEditdeveloperInfo = false;
    this.model.developer = {
      id: '', name: '', email: '',
      country_code: this.constant.country_code,
      dial_code: this.constant.dial_code,
      phone: '', logo: '', image: '', developer_image: '',
      developer_company: '', developer_desc: ''
    };
  }


  addNewTower() {
    // if (this.model.building_tower_edit_index) {
    //   swal('First save the previous editted tower.');
    // }
    if (!this.newTower.tower_name) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterTowerName'), 'error');
      return false;
    }
    if (!this.newTower.num_of_floors && this.newTower.num_of_floors !== 0) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterNumberoffloors'), 'error');
      return false;
    }
    if (!this.newTower.num_of_properties && this.newTower.num_of_properties !== 0) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterNumberofProperties'), 'error');
      return false;
    }

    // if (!this.newTower.possession_status_id) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChoosePossessionStatus'), 'error');
    //   return false;
    // }

    // launch date to be mandatory possession_status == presale
    // if (this.newTower.possession_status_id &&
    //   (this.newTower.possession_status_id.toString() === this.apiConstants.possession_status_id) &&
    //   !this.newTower.launch_date) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLaunchDate'), 'error');
    //   return false;
    // }
    const tempAmen = JSON.parse(JSON.stringify(this.allTowerAmenities));
    this.selectedTowerAmenitiesId = tempAmen.filter(op => {
      if (op.selected === true) {
        return op;
      }
    });
    // this.selectedTowerAmenitiesId = tempAmen.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
    this.selectedTowerAmenityObj = tempAmen.filter(op => {
      if (op.selected === true) {
        return op;
      }
    });
    this.newTower.amenities = this.selectedTowerAmenityObj;
    this.newTower.amenitiesId = this.selectedTowerAmenitiesId;
    this.newTower.amenitiesCount = this.newTower.amenities.length;
    if (this.newTower.amenities.length < 1) {
      // swal(this.translate.instant('swal.error'), 'Please choose tower amenities.', 'error'); return false;
      this.newTower.amenities = [];
    }
    this.model.building_towers.push(this.newTower);
    this.showAddBtn = true;

    // setting tower to empty
    this.newTower = new Towers();
    this.allTowerAmenities.map(op => {
      op.selected = false;
    });
  }


  editTower(btower: any, index: number) {
    if (this.model.building_tower_edit_index !== '-1') {
      swal('Warning', this.translate.instant('message.error.firstSaveThePreviousEdittedtower'), 'warning');
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
          this.allTowerAmenityForEdit[index1].images_360 = pivot.images_360 ? pivot.images_360 : [];
          this.allTowerAmenityForEdit[index1].videos = pivot.videos ? pivot.videos : [];
        }
      }
    }
  }

  deleteTower(index: number) {
    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.translate.instant('message.error.wantToDelete'),
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
          this.admin.postDataApi('deleteTower', { building_towers_id: btid }).subscribe(res => {
            // console.log('sss', res);
          });
        }
      }
    });
  }

  saveTower(btower: Towers, index: any) {

    this.model.building_towers[index].launch_date = btower.launch_date;

    // this.allTowerAmenityForEdit = btower.amenities;
    if (!this.model.building_towers[index].tower_name) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterTowerName'), 'error');
      return false;
    }
    if (!this.model.building_towers[index].num_of_floors) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterNumberoffloors'), 'error');
      return false;
    }
    if (!this.model.building_towers[index].possession_status_id) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChoosePossessionStatus'), 'error');
      return false;
    }
    // if (!this.model.building_towers[index].launch_date) { swal(this.translate.instant('swal.error'), 'Please enter launch date.', 'error'); return false; }

    // launch date to be mandatory possession_status == presale
    if (this.model.building_towers[index].possession_status_id &&
      (this.model.building_towers[index].possession_status_id.toString() === this.apiConstants.possession_status_id) &&
      !this.model.building_towers[index].launch_date) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLaunchDate'), 'error');
      return false;
    }

    // this.selectedTowerAmenitiesId = btower.amenities.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
    this.selectedTowerAmenitiesId = btower.amenities.filter(op => {
      if (op.selected === true) {
        return op;
      }
    });
    this.selectedTowerAmenityObj = btower.amenities.filter(op => {
      if (op.selected === true) {
        return op;
      }
    });
    this.model.building_towers[index].amenitiesId = this.selectedTowerAmenitiesId;
    this.model.building_towers[index].amenities = this.selectedTowerAmenityObj;
    if (this.model.building_towers[index].amenities.length < 1) {
      // swal(this.translate.instant('swal.error'), 'Please choose tower amenities.', 'error'); return false;
      this.model.building_towers[index].amenities = [];
      this.allTowerAmenityForEdit.map(i => {
        i.selected = false;
        return i;
      });
    }
    // btower.amenities.map(item => { item.images = []; return item; });
    this.model.building_towers[index].amenitiesCount = this.model.building_towers[index].amenities.length;
    this.model.building_tower_edit_index = '-1';
  }

  editTowerAmenity(btoweramenity, index: any) {
    this.towerAmenityIndex = index;
    this.towerEditAmenitiesModal.nativeElement.click();
    // this.allTowerAmenityForEdit.map(item => { item.selected = false; return item; });
    btoweramenity = btoweramenity.filter(op => {
      if (op.selected === true) {
        return op;
      }
    });
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
      this.allTowerAmenityForEdit.filter(op => {
        if (op.selected === true) {
          return op;
        }
      });
    // this.model.building_towers[this.towerAmenityIndex].amenitiesId =
    // this.allTowerAmenityForEdit.filter(op => { if (op.selected === true) { return op; } }).map(op => op.id);
    this.model.building_towers[this.towerAmenityIndex].amenitiesId =
      this.allTowerAmenityForEdit.filter(op => {
        if (op.selected === true) {
          return op;
        }
      });
    this.model.building_towers[this.towerAmenityIndex].amenitiesCount = this.model.building_towers[this.towerAmenityIndex].amenities.length;
  }


  showCanvas(event) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
    } else {

      setTimeout(() => {
        this.model.videoLoader = true;
        // this.video = document.getElementById('video1');
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
    return new File([u8arr], filename, { type: mime });
  }

  addMaritalStatus(checked: boolean, i: number) {
    this.testMarital[i].checked = this.testMarital[i].checked === true ? false : true;
  }

  amen360ImagesSelect($event) {
    if ((this.amen360Img.files.length + $event.target.files.length) > 6) {
      swal(this.translate.instant('message.error.limitExceeded'),
        this.translate.instant('message.error.youCanUploadMaximumof6Images'), 'error');
      return false;
    }
    this.amen360Img.onSelectFile($event);
  }

  amenVideosSelect($event, type) {
    if ((this.amenVideo.files.length + $event.target.files.length) > 6) {
      swal(this.translate.instant('message.error.limitExceeded'),
        this.translate.instant('message.error.youCanUploadMaximumof6Videos'), 'error');
      return false;
    }
    this.showamenVideo($event, type);
  }

  async showamenVideo(event, type) {

    for (let index = 0; index < event.target.files.length; index++) {
      if (event.target.files[index].size < this.constant.fileSizeLimit) {
        this.amenVideo.files.push(event.target.files[index]);
      } else {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      }
    }

    setTimeout(async () => {
      this.amenVideo.files.forEach(async (item, index) => {
        if (!item.id) {
          if (!this.amenVideo.files[index]['fileToUpload'] &&
            !this.amenVideo.files[index]['thumb']) {          // check file if not then loader will show
            this.amenVideo.files[index].loading = true;
          }

          const reader = new FileReader();
          reader.onload = function (e) {
            const timer = setTimeout(async () => {
              const data = await this.setVideoStaticThumb(index);
            }, 1000);
          }.bind(this);
          reader.readAsDataURL(this.amenVideo.files[index]);
        }
      });
    }, 1000);
  }

  setVideoStaticThumb(myIndex) {
    const fileToUpload = 'assets/img/video-file.svg';
    this.amenVideo.files[myIndex].loading = false;
    this.amenVideo.files[myIndex]['thumb'] = fileToUpload;
    this.amenVideo.files[myIndex]['fileToUpload'] = fileToUpload;
  }

  async showamenVideoOld(event, type) {

    for (let index = 0; index < event.target.files.length; index++) {
      if (event.target.files[index].size < this.constant.fileSizeLimit) {
        this.amenVideo.files.push(event.target.files[index]);
      } else {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      }
    }

    setTimeout(async () => {
      this.amenVideo.files.forEach(async (item, index) => {
        if (!item.id) {
          if (!this.amenVideo.files[index]['fileToUpload'] &&
            !this.amenVideo.files[index]['thumb']) {          // check file if not then loader will show
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
                const data = await this.newcanvasamenVideo('videoTest', this.amenVideo.files[index], index, type);
              }
            }, 1000);
          }.bind(this);
          reader.readAsDataURL(this.amenVideo.files[index]);
        }
      });
    }, 1000);
  }

  newcanvasamenVideo(video: any, videoFile: File, myIndex, type) {
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
      }
  }


  remove(index: any) {
    this.amenVideo.files.splice(index, 1);
  }

  // @ts-ignore
  upload(): Promise<any> {
    this.allAmenvideos.forEach((ele, index) => {
      return new Promise((resolve, reject) => {
        this.cs.saveVideo(ele.videoFile, ele.fileToUpload).subscribe(
          success => {
            // this.amenVideo.files[length-1].loading = false;
            this.model.videoLoader = false;
            this.model.amenvideos = [];
            const videoObj = {
              video: '', thumb: ''
            };
            videoObj.video = success['data'].video;
            videoObj.thumb = success['data'].thumb;
            this.model.amenvideos.push(videoObj);
            resolve();
          }, error => {
            reject();
          });
      });
    });
  }

  removeManagerCompany() {
    this.model.manager = new Manager();
    this.model.company = new Company();
  }

  selectManagedBy(name: string, type: number, managedBy: number) {
    this.parameter.managedBy = managedBy;
    if (managedBy === 1) {
      if (this.model.company && this.model.company.id) {
        swal(this.translate.instant('message.error.companyIsLinkedtothisproject'),
          this.translate.instant('message.error.pleaseRemoveCompanytoLinkManager'), 'error');
      }
    }
    if (managedBy === 2) {
      if (this.model.manager && this.model.manager.id) {
        swal(this.translate.instant('message.error.managerIsLinkedToThisProject'),
          this.translate.instant('message.error.pleaseRemoveManagertoLinkCompany'), 'error');
      }
    }
    this.spinner.show();
    this.admin.postDataApi(managedBy === 1 ? 'getUnBlockedTowerManager' : 'getUnBlockedTowerManagerCompany',
      { name: name }).subscribe(r => {
        this.spinner.hide();
        this.all_managers = r.data;
        this.name = '';
        if (type !== 2) {
          this.openManagedByModel.nativeElement.click();
        }
      });
  }

  setManagedBy(item: any) {
    this.canEditdeveloperInfo = false;
    // this.model.developer = {
    //   id: '', name: '', email: '',
    //   country_code: this.constant.country_code,
    //   dial_code: this.constant.dial_code,
    //   phone: '', logo: '', image: '', developer_image: '',
    //   developer_company: '', developer_desc: ''
    // };
    // this.model.developer.id = item.id;
    if (this.parameter.managedBy === 1) {
      this.model.manager = item;
      this.model.manager_id = item.id;
    } else {
      this.model.company = item;
      this.model.company_id = item.id;
    }
    // this.model.developer.name = item.name;
    // this.model.developer.email = item.email;
    // this.model.developer.phone = item.phone;
    // this.model.developer.dial_code = item.dial_code;
    // this.model.developer.country_code = item.country_code;
    // this.model.developer.logo = item.image;
    // this.model.developer.developer_company = item.developer_company;
    // this.model.developer.developer_desc = item.developer_desc;
    // this.file5.image = item.image;
    // this.file6.image = item.developer_image;
    this.closeManagedByModel.nativeElement.click();
  }

  selectAgency(name: string, type: number) {
    this.spinner.show();
    this.admin.postDataApi('getAllAgencies', { name: name }).subscribe(r => {
      this.spinner.hide();
      this.agencies = r.data;
      if (type !== 2) {
        this.openAgencyModel.nativeElement.click();
      }
    });
  }

  unlinkAgency(name: string, type: number) {
    this.canEditdeveloperInfo = true;
    this.model.agency = undefined;
    this.model.agency_id = undefined;
  }

  setAgency(item: any) {
    this.canEditdeveloperInfo = false;
    this.model.agency = item;
    this.model.agency_id = item.id;
    this.closeAgencyListModel.nativeElement.click();
  }

  // selectLegalEntity(name: string, type: number) {
  //   this.spinner.show();
  //   this.admin.postDataApi('getAllLegalEntities', { name: name }).subscribe(r => {
  //     this.spinner.hide();
  //     this.legalEntities = r.data;
  //     if (type !== 2) {
  //       this.openLegalEnityModel.nativeElement.click();
  //     }
  //   });
  // }

  selectLegalEntity(name: string, type: number) {
    this.tempSetLegalEntity = [];
    this.spinner.show();
    this.admin.postDataApi('getAllLegalEntities', { name: name }).subscribe(r => {
      this.spinner.hide();
      this.legalEntities = r.data;
      this.legalEntities.forEach((innerData, innerIndex) => {
        this.legalEntities[innerIndex]['alreadyChecked'] = false;
      });
      this.model.legal_entity.forEach((data, index) => {
        this.legalEntities.forEach((innerData, innerIndex) => {
          if (data.id == innerData.id) {
            this.legalEntities[innerIndex]['alreadyChecked'] = true;
            this.tempSetLegalEntity.push(data);
          }
        });
      });
      if (type !== 2) {
        this.openLegalEnityModel.nativeElement.click();
      }
    });
  }

  // removeLegalEntity() {
  //   this.model.legal_entity = new LegalEntity();
  // }

  // setLegalEntity(item: any) {
  //   this.canEditdeveloperInfo = false;
  //   this.model.legal_entity = item;
  //   this.model.legal_entity_id = item.id;
  //   this.closeLegalEnityListModel.nativeElement.click();
  // }

  removeLegalEntity = (item: any): void => {
    let tempIndex;
    this.model.legal_entity.forEach((data, index) => {
      if (data.id == item.id) {
        tempIndex = index;
      }
    });
    this.model.legal_entity.splice(tempIndex, 1);
  }

  setLegalEntity = (isChecked: boolean, item: any): void => {
    this.canEditdeveloperInfo = false;
    if (isChecked) {
      this.tempSetLegalEntity.push(item);
    } else {
      let tempIndex;
      this.tempSetLegalEntity.forEach((data, index) => {
        if (data.id == item.id) {
          tempIndex = index;
        }
      });
      this.tempSetLegalEntity.splice(tempIndex, 1);
    }
  }

  addLegalEnityModel = (): void => {
    this.model.legal_entity = new Array<LegalEntity>();
    this.tempSetLegalEntity.forEach((data) => {
      this.model.legal_entity.push(data);
    });
    this.tempSetLegalEntity = [];
    this.closeLegalEnityListModel.nativeElement.click();
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.pdfSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pdfSizeExceeds'), 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.cs.saveAttachment(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].name;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  removeDocument(e: Event) {
    e.stopPropagation();
    this.model.document = '';
  }

  viewDocument(document: string) {
    window.open(document, '_blank');
  }

  goBack = (isForBack: boolean): void => {
    if (isForBack) {
      this.router.navigate(['dashboard/projects/view-projects', { for: 'back' }]);
    } else {
      this.router.navigate(['dashboard/projects/view-projects']);
    }
  }

  anyAmenitiesChecked = (): boolean => {
    let result = false;
    for (const iterator of this.all_amenities) {
      if (iterator.selected) {
        result = iterator.selected;
        break;
      }
    }
    return result;
  }

  buildingTowerDetailsAvailable = (details: any[] = []): boolean => {
    let result = true;
    for (const iterator of details) {
      if (iterator.possession_status_id == null || iterator.possession_status_id == '') {
        result = false;
        break;
      }
      // if (iterator.amenitiesCount == 0 || iterator.launch_date == null ||
      //   iterator.launch_date == '' || iterator.possession_status_id == null ||
      //   iterator.possession_status_id == '') {
      //   result = false;
      //   break;
      // }    
    }
    return result;
  }

  selectContributor(keyword: string, type: number, dailogOpen: boolean) {
    let self = this;
    this.spinner.show();
    this.seller_type = type;
    const input = { name: '', user_type: 0 };
    input.name = keyword !== '1' ? keyword : '';
    input.user_type = type;
    this.admin.postDataApi('getAllBuyers', input).subscribe(r => {
      self.spinner.hide();
      self.users = r.data;
      self.model.building_contributors_param = self.model.building_contributors_param ? self.model.building_contributors_param : [];
      self.users.forEach(element => {
        self.model.building_contributors_param.forEach(element1 => {
          element.value = element.id == element1.id ? true : false;
        })
      })
      if (!dailogOpen) {
        self.linkUserModal.nativeElement.click();
      }
    });
  }

  changeStatusPopUp(property_id: any, user_id: number, name: string, status: number, user: any, event: any) {
    this.canEditContributionInfo = false;
    if (event.target.checked) {
      this.users.filter(element => {
        if (element.id == element) {
          element.value = true;
        }
      });
      this.model.building_contributors = this.model.building_contributors ? this.model.building_contributors : [];
      this.model.building_contributors_param = this.model.building_contributors_param ? this.model.building_contributors_param : [];
      if (this.model.building_contributors && this.model.building_contributors.length > 0) {
        let data = this.model.building_contributors.find(element => element.users_id == user_id);
        if (!data) {
          this.model.building_contributors.push({ user_type: status, users_id: user_id, building_id: property_id });
        }
      }
      else {
        this.model.building_contributors.push({ user_type: status, users_id: user_id, building_id: property_id });
      }
      if (this.model.building_contributors_param && this.model.building_contributors_param.length > 0) {
        let data = this.model.building_contributors_param.find(element => element.id == user_id)
        if (!data) {
          this.model.building_contributors_param.push({
            id: user.id,
            name: name,
            phone: user.phone,
            email: user.email,
          });
        }
      }
      else {
        this.model.building_contributors_param.push({
          id: user.id,
          name: name,
          phone: user.phone,
          email: user.email,
        });
      }
    }
    else {
      this.users.filter(element => {
        if (element.id == user_id) {
          element.value = false;
        }
      })
      let selectedUser = this.model.building_contributors.findIndex(user => user.users_id == user_id);
      this.model.building_contributors.splice(selectedUser, 1);
      let UserIndex = this.model.building_contributors_param.findIndex(user => user.id == user_id);
      this.model.building_contributors_param.splice(UserIndex, 1);
    }
  }

  removeContributor(userId, index) {
    this.canEditContributionInfo = false;
    this.users.filter(element => {
      if (element.id == userId) {
        element.value = false;
      }
    })
    let selectedUser = this.model.building_contributors.findIndex(user => user.users_id == userId);
    if (selectedUser >= 0) {
      this.model.building_contributors.splice(selectedUser, 1);
    }
    let UserIndex = this.model.building_contributors_param.findIndex(user => user.id == userId);
    if (UserIndex >= 0) {
      this.model.building_contributors_param.splice(UserIndex, 1);
    }
  }
  assignedLegalEntity = (): void => {
    this.model.legal_entity = new Array<LegalEntity>();
    if ((this.model.legal_entity_info || []).length > 0) {
      (this.model.legal_entity_info || []).forEach((element) => {
        this.model.legal_entity.push(element.legal_entity);
      });
    }
  }
  getParkingLotSpaces() {
    this.spinner.show();
    this.parameter.url = 'getParkingspace';
    const input = new FormData();
    this.admin.postDataApi(this.parameter.url, {hide_blocked: 0})
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.parkingLotSpaces = success.data;
          this.parameter.parkingLotSpacesTotal = success.data.length;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  addDeveloperBank(e) {
    //console.log(e,"send")
    if(this.parameter.parkingLotSpacesTotal == this.model.parking_space_lots.length){
      this.toastrService.clear()
      this.toastrService.error(this.translate.instant('message.error.parkingSpaceTypeAllAreInUse'),this.translate.instant('swal.error'));
    } else {
      const bank = new Parking();
      this.model.parking_space_lots.push(bank);
    }
    // this.model.parking_space_lots.forEach((r.) => {
    // }
   
  }
  addDeveloperBank1(e) {
    if(this.parameter.parkingLotSpacesTotal == this.model.parking_space_rent.length){
      this.toastrService.clear()
      this.toastrService.error(this.translate.instant('message.error.parkingSpaceTypeAllAreInUse'),this.translate.instant('swal.error'));
    } else {
      const bank = new Parking();
      this.model.parking_space_rent.push(bank);
    }    
  }
  
  initModel() {
    this.model.parking_space_lots = new Array<Parking>();
    }
   
    toggleShow(){
      this.toggleSelectedDetails.isCreditCardChecked = !this.toggleSelectedDetails.isCreditCardChecked;
    }
  // removeDeveloperBank($event: Event, item: any, i: number) {
  //   $event.stopPropagation();
  //   this.model.parking_space_lots.splice(i, 1);
  //   if (item.id) {
  //     this.admin.postDataApi('deleteBankAccount', { id: item.id }).subscribe(success => {
  //       this.spinner.hide();
  //     }, error => {
  //       this.spinner.hide();
  //     });
  //   }
  // }

}
