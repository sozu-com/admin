import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/common/property';
import { NgForm, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { Constant } from 'src/app/common/constants';
import { AddPropertyModel, Building } from 'src/app/models/addProperty.model';
import { AddProjectModel, Towers } from 'src/app/models/addProject.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare const google;
declare let swal: any;


@Component({
  selector: 'app-bulk-add',
  templateUrl: './bulk-add.component.html',
  styleUrls: ['./bulk-add.component.css'],
  providers: [AddPropertyModel, Building, Constant]
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
  constructor(public model: AddPropertyModel, private us: AdminService,
    private router: Router, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, public building: Building, public constant: Constant,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.showSearch = true;
    this.property_names = [];
    this.parameter.page = 1;
    this.parameter.itemsPerPage = this.constant.limit4;
    this.buildingData = new AddProjectModel();
    this.building.dev_countrycode = this.constant.dial_code;
    this.parameter.buildingCount = 0;
    this.initialCountry = { initialCountry: this.constant.initialCountry };
    // map
    this.zoom = 4;
    this.searchControl = new FormControl();
    this.setCurrentPosition();
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

  searchBuilding(keyword: string) {
    if (!keyword) { swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterSomeText'), 'error'); return false; }

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

    this.spinner.show();

    this.us.postDataApi('addPropertyMultiple', input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal({
            html: this.translate.instant('message.success.submittedSccessfully') + '<br>' +
            this.translate.instant('message.error.notifiedWhenAdminReview'),
            type: 'success'
          });
          this.property_names = [];
          // this.num_of_property = '';
        }, error => {
          this.spinner.hide();
        }
      );
  }

  getPage(page: number) {
    this.parameter.page = page;
  }


  getBuildingIndex(i: number) {
    this.searchedBuildings.forEach(e => {
      e.selected = false;
    });
    const searchindex = (this.parameter.page - 1) * 4 + i;
    this.searchedBuildings[searchindex].selected = true;
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

    this.spinner.show();
    this.us.postDataApi('tagBuilding', input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal({
            html: this.translate.instant('message.success.submittedSccessfully') + '<br>' +
            this.translate.instant('message.error.notifiedWhenAdminReview'),
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


  buildingRequest() {

    if (this.building.dev_name && (!this.building.dev_phone || !this.building.dev_email || !this.building.dev_countrycode)) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseFillCompleteDevloperInformation'), 'error');
      return false;
    }

    if (!this.building.lat && !this.building.lng) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocationFromTheDropdownList'), 'error');
      return false;
    }

    if (!this.building.lat || !this.building.lng) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseSelectLocation'), 'error');
    }
    this.spinner.show();
    this.us.postDataApi('buildingRequest', this.building)
      .subscribe(
        success => {
          this.spinner.hide();
          swal({
            html: 'Success' + '<br>' +
            this.translate.instant('message.success.dataCollectorWillLinkPropertyToBuilding'),
            type: 'success'
          });
        }, error => {
          this.spinner.hide();
        }
      );
  }

  onEnteringNumOfProperty (e: any) {
    // this.property_names = Array(e).fill(1);
    this.property_names = [];
    for (let index = 0; index < e; index++) {
      const pn = {name: ''};
      this.property_names.push(pn);
    }
  }
}
