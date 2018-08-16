import { Component, OnInit, OnChanges, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators,FormArray } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../../common/property';
import { DomSanitizer } from '@angular/platform-browser';
import { AddProjectModel, Configuration } from './../../../models/addProject.model';
import { MapsAPILoader } from '@agm/core';
import { Constant } from './../../../common/constants';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
  providers:[AddProjectModel, Constant]
})
export class AddProjectComponent implements OnInit {

  public parameter: IProperty = {};
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  @ViewChild('openConfigPopup') openConfigPopup: ElementRef;
  @ViewChild('closeConfigPopup') closeConfigPopup: ElementRef;

  myform: FormGroup;
  myform2: FormGroup;

  public latitude: number;
  public longitude: number;
  public zoom: number;

  id:number;
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
  all_possession_statuses:any=[];
  all_building_types:any=[];
  all_amenities:any=[];
  all_configurations:any=[];

  selected_amenities:any=[]
  new_config:any = new Configuration;
  FU:any={};
  initialCountry = {initialCountry: 'mx'};


  constructor(
    private model: AddProjectModel,
    private admin: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private sanitization: DomSanitizer,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private constant: Constant
  ){ }

  ngOnInit() {
    this.route.params.subscribe( params =>{
        this.id = params.id;
        if(this.id){/* if id exists edit mode */
          this.admin.postDataApi('getProjectById',{building_id:this.id}).subscribe(r=>{
            this.model = JSON.parse(JSON.stringify(r.data));
            console.log(this.model);
            this.admin.postDataApi('getAmenities',{}).subscribe(res=>{
              this.all_amenities = res.data.map(item=>{item.selected = false;return item;});
              this.selected_amenities = this.all_amenities.map(item=>{
                if(this.model.amenities.find(am=>am.id===item.id)){
                  item.selected = true;
                }
                return item;
              });
            });
          });
        }else{
          this.admin.postDataApi('getAmenities',{}).subscribe(res=>{
            this.all_amenities = res.data.map(item=>{item.selected = false;return item;});
          });
          this.model.dev_countrycode = 'mx';
          this.model.dev_dialcode = '+52';
        }
    });

    this.zoom = 4;
    this.setCurrentPosition();
    this.initForm();
    this.admin.postDataApi('getPossessionStatuses',{}).subscribe(r=>{
      this.all_possession_statuses = r.data;
    });
    this.admin.postDataApi('getBuildingTypes',{}).subscribe(r=>{
      this.all_building_types = r.data;
    });

    this.admin.postDataApi('getConfigurations',{}).subscribe(r=>{
      this.all_configurations = r.data;
      //console.log(this.all_amenities);
    });

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

  removeImageMulti(index){
    this.new_config.images_path.splice(index, 1);
    this.new_config.images.splice(index, 1);
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
          this.model.building_images.push(success.data.image);
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
    }
  }

  fileUploader(event,key=0,model) { // called each time file input changes
    this.parameter.loading = true;
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.url = e.target.result;
      };
      const input = new FormData();
      input.append('image', event.target.files[0]);
      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log('successimage', success);
          this.parameter.loading = false;
          this.FU[key] = success.data.image;
          model[key] = success.data.image;
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


  fileUploaderMulti(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {

      if (this.new_config.images_path === 6 || event.target.files.length > 6) {
        swal('Limit exceeded', 'You can upload maximum of 6 images', 'error');
      }else {
        for (let index = 0; index < event.target.files.length; index++) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.new_config.images_files.push(event.target.files[index]);
            this.new_config.images_path.push(e.target.result);

          };
          reader.readAsDataURL(event.target.files[index]);
        }
      }
    }
  }


  saveImagesConfig() {
    this.new_config.images = [];
    const input = new FormData();
    for (let index = 0; index < this.new_config.images_files.length; index++) {
      input.append('image', this.new_config.images_files[index]);
      this.parameter.loading = true;
      this.admin.postDataApi('saveImage', input)
      .subscribe(
        success => {
          console.log(success.data.image);
          this.new_config.images.push(success.data.image);
          this.parameter.loading = false;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
    }

    delete this.new_config.images_files;
    delete this.new_config.images_path;
    this.model.configurations.push(this.new_config);

  }

  loadPlaces() {
    //console.log('--', this.searchElementRef.nativeElement);
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
          console.log(place);
          this.model.lat = this.latitude;
          this.model.lng = this.longitude;
          if(place.formatted_address){
            this.model.address = place.formatted_address;
          }
          this.zoom = 16;

          //console.log('----------', this.latitude, this.longitude, this.zoom);
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
              this.model.address = result.formatted_address;
            } else {
              this.model.address = lat + ',' + lng;
            }
          }
        });
    }
  }

  formValidate(){
    return true;
  }

  initForm(){
    this.myform = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      address: new FormControl('',[
        Validators.required
      ]),
      building_age: new FormControl('',[
        Validators.required
      ]),
      building_type: new FormControl('',[
        Validators.required
      ]),
      floors: new FormControl('',[
        Validators.required
      ]),
      avg_price: new FormControl('',[
        Validators.required
      ]),
      description: new FormControl('',[
        Validators.required
      ]),
      possession_status_id: new FormControl('',[
        Validators.required
      ])
    });

    this.myform2 = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      address: new FormControl('',[
        Validators.required
      ])
    });
  }

  openConfigPopupFun(){
    this.openConfigPopup.nativeElement.click();
    this.new_config = new Configuration;
  }

  selectConfiguration(id,parentModel){
    let childModel = this.all_configurations.filter(r=>r.id == id);
    parentModel.config = childModel[0];
    console.log(parentModel);
  }

  editConfiguration(config){
    console.log(this.new_config);
    console.log(config);
    this.new_config = config;
    this.new_config.images = [];
    this.new_config.images_files = [];
    this.new_config.images_path = [];
    // for(let key in config){
    //   this.new_config[key] = config[key];
    // }
    this.openConfigPopup.nativeElement.click();
  }

  deleteConfiguration(index){
    this.model.configurations.splice(index,1);
  }

  addNewConfig(){
    this.closeConfigPopup.nativeElement.click();
    this.saveImagesConfig();
    console.log(this.new_config);
    //this.model.configurations.push(this.new_config);
    //this.new_config = new Configuration;

  }

  onCountryChange(obj){
    this.model.dev_countrycode = obj.iso2;
    this.model.dev_dialcode = "+"+obj.dialCode;
  }

  addProject(){

    this.model.dev_name = this.model.developer.name;
    this.model.dev_email = this.model.developer.email;
    this.model.dev_phone = this.model.developer.phone;
    //this.model.dev_logo = this.model.developer.logo;
    //this.model.dev_countrycode = this.model.developer.name;

    this.model.amenities = this.all_amenities.filter(op=>{ if(op.selected == true){ return op; }}).map(op=>{ return op.id;});
    console.log(this.model);

    if(!this.id){
      delete this.model.id;
    }
    //console.log(this.model);

    this.admin.postDataApi('addProject', this.model).subscribe(
      success=>{
        console.log(success);
        swal('Success', success.message, 'success');
      },
      error=>{
        console.log(error);
        swal('Error', error.message, 'error');
      }
    );
  }

}
