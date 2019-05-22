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
import { AddProjectModel, Towers, Configuration } from 'src/app/models/addProject.model';
declare const google;
declare let swal: any;


@Component({
  selector: 'app-bulk-add',
  templateUrl: './bulk-add.component.html',
  styleUrls: ['./bulk-add.component.css'],
  providers: [AddPropertyModel, Building, Constant, HttpInterceptor]
})
export class BulkAddComponent implements OnInit {

  public parameter: IProperty = {};
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;

  public searchControl: FormControl;
  public zoom: number;

  showBuilding: boolean;
  showText = false;
  showSearch = false;
  buildingName = '';
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
  initialCountry: any;
  constructor(public model: AddPropertyModel, private us: AdminService, private cs: CommonService,
    private router: Router, private sanitization: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private building: Building, public constant: Constant,
    private route: ActivatedRoute,
    private http: HttpInterceptor,
    private element: ElementRef) { }

  ngOnInit() {
    this.showSearch = true;
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.http.loader.next({ value: true });
    this.building.dev_countrycode = this.constant.dial_code;

    this.parameter.buildingCount = 0;
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    // set google maps defaults
    this.zoom = 4;
    // create search FormControl
    this.searchControl = new FormControl();
    // set current position
    this.setCurrentPosition();
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
          this.parameter.loading = false;
          this.buildingData = success['data'];
        }, error => {
          this.parameter.loading = false;
        }
      );
  }


  loadPlaces() {
    this.building.lat = 0;
    this.building.lng = 0;
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
          this.building.lat = place.geometry.location.lat();
          this.building.lng = place.geometry.location.lng();
          this.zoom = 12;

          if (place.formatted_address) { this.building.address = place.formatted_address; }
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.building.lat = position.coords.latitude;
        this.building.lng = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  placeMarker($event) {
    this.building.lat = $event.coords.lat;
    this.building.lng = $event.coords.lng;
    this.getGeoLocation(this.building.lat, this.building.lng);
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

  searchBuilding(keyword: string) {
    if (!keyword) { swal('Error', 'Please enter some text.', 'error'); return false; }

    this.showBuilding = false;
    this.buildingLoading = true;

    const input = new FormData();
    input.append('keyword', keyword);

    this.us.postDataApi('searchBuilding', input)
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

  showBuildingDetails(showBuilding) {
    this.showBuilding = showBuilding;
    this.buildingName = '';
  }

  addPropertyMultiple(formdata: NgForm) {

    const input = new FormData();
    input.append('building_id', this.model.building_id);
    input.append('property_names', JSON.stringify(this.property_names));
    input.append('tower_id', this.model.building_towers_id);
    input.append('floor_num', this.model.floor_num);

    this.parameter.loading = true;

    this.us.postDataApi('addPropertyMultiple', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal({
            html: 'Submitted successfully.' + '<br>' +
            'You will be notified once your property will be reviewed by Admin, you can view status in your properties.',
            type: 'success'
          });
          this.property_names = [];
        }, error => {
          this.parameter.loading = false;
        }
      );
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
    if (this.parameter.property_id) { input.append('property_id', this.parameter.property_id); }
    input.append('building_id', this.building.id);

    this.parameter.loading = true;
    this.us.postDataApi('tagBuilding', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal({
            html: 'Submitted successfully.' + '<br>' +
            'You will be notified once your property will be reviewed by Admin, you can view status in your properties.',
            type: 'success'
          });
          if (this.router.url.indexOf('/dashboard/properties/edit-property') === -1) {
            this.router.navigate(['/dashboard/properties/view-properties']);
          }
        }, error => {
          this.parameter.loading = false;
        }
      );
  }


  buildingRequest() {

    if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
      swal('Error', 'Please fill complete devloper information', 'error'); return false;
    }

    if (!this.building.lat && !this.building.lng) {
      swal('Error', 'Please select location from the dropdown list.', 'error');
      return false;
    }

    if (!this.building.lat || !this.building.lng) {
      swal('Error', 'Please select location', 'error'); return false;
    }
    this.parameter.loading = true;
    this.us.postDataApi('buildingRequest', this.building)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal({
            html: 'Success' + '<br>' +
            'You can add property details and data-collector will link this property to the building.',
            type: 'success'
          });
        }, error => {
          this.parameter.loading = false;
        }
      );
  }

  onEnteringNumOfProperty (e: any) {
    // this.property_names = Array(e).fill(1);
    this.property_names = [];
    for (let index = 0; index < e; index++) {
      const pn = {name: 0};
      pn.name = index;
      this.property_names.push(pn);
    }
  }

  setPropertyName(value: string, index: number) {
    console.log(this.property_names, 'e');
    console.log(value, index, 'valueidnex');
    this.property_names[index] = value;
  }
}
