import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { AddProjectModel, Configuration } from './../../../models/addProject.model';
import { MapsAPILoader } from '@agm/core';
import { Constant } from './../../../common/constants';
import { FileUpload } from './../../../common/fileUpload';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers: [AddProjectModel, Constant]
})
export class AddProjectComponent implements OnInit {

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  @ViewChild('openConfigPopup') openConfigPopup: ElementRef;
  @ViewChild('closeConfigPopup') closeConfigPopup: ElementRef;

  myform: FormGroup;
  myform2: FormGroup;
  
  public latitude: number;
  public longitude: number;
  public zoom: number;

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
  testMarital = [];
  imageEvent = [];
  showText = false;
  all_possession_statuses: any= [];
  all_building_types: any= [];
  all_amenities: any= [];
  all_configurations: any= [];

  selected_amenities: any= [];
  new_config: any = new Configuration;
  new_custom:any = {name:'',value:''};
  new_config_edit: any;
  FU: any= {};
  initialCountry = {initialCountry: 'mx'};

  file1: any; file2: any; file3: any; file4: any; file5: any;


  constructor(
    public model: AddProjectModel,
    private admin: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sanitization: DomSanitizer,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private constant: Constant
  ) { }

  ngOnInit() {
    this.file1 = new FileUpload(true, this.admin);
    this.file2 = new FileUpload(false, this.admin);
    this.file3 = new FileUpload(true, this.admin);
    this.file4 = new FileUpload(false, this.admin);
    this.file5 = new FileUpload(true, this.admin);

    this.route.params.subscribe( params => {
        this.id = params.id;
        if (this.id) {/* if id exists edit mode */
          this.admin.postDataApi('getProjectById', {building_id: this.id}).subscribe(r => {
            this.model = JSON.parse(JSON.stringify(r.data));
            console.log(this.model);
            this.file1.image = this.model.main_image;
            this.model.configurations.map((item) => {
              item.images = item.images.map(r1 => r1.image);
            });
            this.model.custom_attributes = this.model.custom_values;
            this.file5.image = this.model.developer.developer_image;
            this.admin.postDataApi('getAmenities', {}).subscribe(res => {
              this.all_amenities = res.data.map(item => {item.selected = false; return item; });
              this.selected_amenities = this.all_amenities.map(item => {
                if (this.model.amenities.find(am => am.id === item.id)) {
                  item.selected = true;
                }
                return item;
              });
            });
          });
        }else {
          this.admin.postDataApi('getAmenities', {}).subscribe(res => {
            this.all_amenities = res.data.map(item => {item.selected = false; return item; });
          });
          this.model.dev_countrycode = 'mx';
          this.model.dev_dialcode = '+52';
        }
    });

    this.zoom = 4;
    this.setCurrentPosition();
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

  modelOpenFun(){
    this.modalOpen.nativeElement.click();
    this.file2.backup(JSON.parse(JSON.stringify(this.model.images)));
  }

  modelCloseFun() {
    this.modalClose.nativeElement.click();
    //this.file2.reset();
  }

  saveImages() {
    if(this.file2.files.length < 1){
      swal('Error','Please select atleast one image','error');return false;
    }
    this.modalClose.nativeElement.click();
    this.file2.upload().then(r => {
      console.log('resolved');
      this.model.images = this.file2.files;
    });
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
          // console.log(place);
          this.model.lat = this.latitude;
          this.model.lng = this.longitude;
          if (place.formatted_address) {
            this.model.address = place.formatted_address;
          }
          this.zoom = 16;

          // console.log('----------', this.latitude, this.longitude, this.zoom);
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 16;
      });
    }
  }

  placeMarker($event) {
    this.model.lat = this.latitude = $event.coords.lat;
    this.model.lng = this.longitude = $event.coords.lng;
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
      floors: new FormControl('', [
        Validators.required
      ]),
      avg_price: new FormControl('', [
        Validators.required
      ]),
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

  closeConfigPopUpFun(){
    this.closeConfigPopup.nativeElement.click();
    this.file4.reset();
  }
  openConfigPopupFun() {
    this.openConfigPopup.nativeElement.click();
    this.new_config = new Configuration;
    this.new_config_edit = -1;
    this.file3.image = '';
    this.file4.files = [];
  }

  selectConfiguration(id, parentModel) {
    const childModel = this.all_configurations.filter(r => r.id === id);
    parentModel.config = childModel[0];
    // console.log(parentModel);
  }

  editConfiguration(config, index) {
    // console.log(this.new_config);
    // console.log(config);
    this.new_config_edit = index;
    this.new_config = JSON.parse(JSON.stringify(config));
    this.file3.image = config.floor_map_image;
    this.file4.files = [];
    config.images.forEach((value, index) => {
      this.file4.files.push(value);
    });
    this.openConfigPopup.nativeElement.click();
  }

  deleteConfiguration(index) {
    swal({
      title: 'Are you sure?',
      text: "Do you want to Delete?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.value) {
        this.model.configurations.splice(index, 1);
      }
    })

  }

  addNewConfig() {
    if(this.file4.files.length < 1){
      swal('Error','Please select atleast one more image','error');return false;
    }
    this.closeConfigPopup.nativeElement.click();
    this.parameter.loading = true;
    //console.log('new config');
    this.file3.upload().then(r => {
      //console.log(this.file3.image);
      this.file4.upload().then(r1 => {
        this.parameter.loading = false;
        this.new_config.floor_map_image = this.file3.image;
        console.log('===', this.file4.files);
        this.new_config.images = this.file4.files;
        console.log(this.new_config_edit,this.new_config);
        if(this.new_config_edit >= 0 ){
          this.model.configurations[this.new_config_edit] = JSON.parse(JSON.stringify(this.new_config));
        }else{
          this.model.configurations.push(this.new_config);
        }
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
  }

  addProject() {

    this.model.cover_image = this.file1.image;
    this.model.building_images = this.model.images.map(r => r.image);
    this.model.dev_name = this.model.developer.name;
    this.model.dev_email = this.model.developer.email;
    this.model.dev_phone = this.model.developer.phone;
    this.model.dev_logo = this.file5.image;
    this.model.amenities = this.all_amenities.filter(op => { if (op.selected === true) { return op; }}).map(op => op.id);

    this.model.configurations.forEach(item => {
      item.images = item.images.map(x => x.image);
    });
    /* remove fields for edit */
    if (!this.model.name) {swal('Error', 'Please add building name', 'error'); return false; }
    if (!this.model.address) {swal('Error', 'Please add address', 'error'); return false; }
    if (!this.model.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
    if (!this.model.cover_image) {swal('Error', 'Please add cover image', 'error'); return false; }
    if (this.model.building_images.length < 1) {swal('Error', 'Please add atleast one more building image', 'error'); return false; }
    if (!this.model.building_age) {swal('Error', 'Please add building age', 'error'); return false; }
    if (!this.model.building_type_id) {swal('Error', 'Please add building type', 'error'); return false; }
    if (!this.model.description) {swal('Error', 'Please add building description', 'error'); return false; }
    if (!this.model.possession_status_id) {swal('Error', 'Please add possession status', 'error'); return false; }
    if (!this.model.floors) {swal('Error', 'Please add floors', 'error'); return false; }
    // if(!this.model.launch_date){swal('Error','Please add building launch date','error'); return false;}
    if (!this.model.avg_price) {swal('Error', 'Please add building average price', 'error'); return false; }
    if (this.model.amenities.length < 1) {swal('Error', 'Please add amenities', 'error'); return false; }
    if (this.model.configurations.length < 1) {swal('Error', 'Please add building configuration', 'error'); return false; }
    if (!this.id) {
      if (!this.model.dev_name) {swal('Error', 'Please add developer name', 'error'); return false; }
      if (!this.model.dev_countrycode) {swal('Error', 'Please add developer country code', 'error'); return false; }
      if (!this.model.dev_email) {swal('Error', 'Please add developer email', 'error'); return false; }
      if (!this.model.dev_phone) {swal('Error', 'Please add developer phone', 'error'); return false; }
      if (!this.model.dev_logo) {swal('Error', 'Please add developer image', 'error'); return false; }
    }


    if (this.id) {
      this.model.building_id = this.id;
      this.model.developer_id =  this.model.developer.id;
      this.admin.postDataApi('updateProject', this.model).subscribe(success => {
        // console.log(success);
        swal('Success', success.message, 'success');
      }, error => {
        console.log(error);
        swal('Error', error.message, 'error');
      });
    }else {
      delete this.model.id;
      delete this.model.building_id;

      this.admin.postDataApi('addProject', this.model).subscribe(success => {
        // console.log(success);
        swal('Success', success.message, 'success');
      }, error => {
        console.log(error);
        swal('Error', error.message, 'error');
      });
    }

  }

  file2Select($event){
    if ((this.file2.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.file2.onSelectFile($event);
  }

  file4Select($event){
    if ((this.file4.files.length + $event.target.files.length) > 6) {
      swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      return false;
    }
    this.file4.onSelectFile($event);
  }

  addNewCustom(){
    if(!this.new_custom.name || !this.new_custom.value){
      swal('Error', 'Please add parameter name and value', 'error');
      return false;
    }
    this.model.custom_attributes.unshift(this.new_custom);
    this.new_custom = {name:'',value:''};
  }
}
