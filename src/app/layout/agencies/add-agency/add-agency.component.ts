import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from './../../../services/admin.service';
import { CommonService } from './../../../services/common.service';
import { IProperty } from './../../../common/property';
import { ACL, Permission } from './../../../models/acl.model';
import { ActivatedRoute } from '@angular/router';
import { Constant } from './../../../common/constants';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { Developer } from 'src/app/models/global.model';
import { Agency } from 'src/app/models/agency.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.css']
})
export class AddAgencyComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('search1') search1ElementRef: ElementRef;
  public parameter: IProperty = {};
  public location: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  developer_image: any;
  model: Agency;
  constructor(
    public constant: Constant,
    private cs: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private admin: AdminService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.model = new Agency();
    this.setCurrentPosition();
    this.getCountries();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          console.log('aaa', this.model);
          this.model.id = params['id'];
          this.getUserById(this.model.id);
        } else {
          console.log('aaa', this.model);
          this.model.id = '';
        }
      });
  }

  getCountries() {
    this.admin.postDataApi('getCountryLocality', {}).subscribe(r => {
      this.location.countries = r['data'];
    });
  }

  onCountryChange(id) {
    this.model.country_id = id;
    this.location.states = []; this.model.state_id = '0';
    this.location.cities = []; this.model.city_id = '0';
    this.location.localities = []; this.model.locality_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.model.country_id = id;
    const selectedCountry = this.location.countries.filter(x => x.id.toString() === id);
    this.location.states = selectedCountry[0].states;
  }

  onStateChange(id) {
    this.location.cities = []; this.model.city_id = '0';
    this.location.localities = []; this.model.locality_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.model.state_id = id;
    const selectedState = this.location.states.filter(x => x.id.toString() === id);
    this.location.cities = selectedState[0].cities;
  }

  onCityChange(id) {
    this.location.localities = []; this.model.locality_id = '0';
    if (!id || id.toString() === '0') {
      return false;
    }

    this.model.city_id = id;
    const selectedCountry = this.location.cities.filter(x => x.id.toString() === id);
    this.location.localities = selectedCountry[0].localities;
  }

  onLocalityChange(id) {
    if (!id || id.toString() === '0') {
      return false;
    }
    this.model.locality_id = id;
  }

  getUserById(id: string) {
    this.parameter.loading = true;
    this.admin.postDataApi('getUserById', {'user_id': id})
    .subscribe(
      success => {
        this.parameter.loading = false;
        this.model = success.data;
        this.image = this.model.image;
        console.log('==', this.model);
      }, error => {
        this.parameter.loading = false;
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, param: any) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this[param] = e.target.result;
      this.parameter.loading = true;
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.parameter.loading = false;
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.model);
  }

  onCountryCodeChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  add(formData: NgForm) {
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    if (!modelSave.lat || !modelSave.lng) {
      swal('Error', 'Please choose address from dropdown.', 'error');
      return;
    }
    this.parameter.loading = true;
    this.admin.postDataApi('addAgency', modelSave)
      .subscribe(
        success => {
          this.parameter.loading = false;
          if (success.success === '0') {
            swal('Error', success.message, 'error');
            return;
          } else {
            const text = this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
            swal('Success', text, 'success');
            if (this.model.id === '') {
              formData.reset();
              this.image = ''; this.developer_image = '';
            }
          }
        }, error => {
          this.parameter.loading = false;
        });
  }


  loadPlaces(paramAdd: string, paramLat: string, paramLng: string, searchRef: any) {
    // load Places Autocomplete
    this.model[paramLat] = null;
    this.model[paramLng] = null;
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this[searchRef].nativeElement, {
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
          this.model[paramLat] = place.geometry.location.lat();
          this.model[paramLng] = place.geometry.location.lng();
          if (place.formatted_address) {
            this.model[paramAdd] = place.formatted_address;
          }
        });
      });
    });
  }

  setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // setting address lat lng
        this.model.lat = position.coords.latitude;
        this.model.lng = position.coords.longitude;

        // setting branch office lat lng
        this.model.branch_lat = position.coords.latitude;
        this.model.branch_lng = position.coords.longitude;
      });
    }
  }

  placeMarker($event: any, paramLat: string, paramLng: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(this.model[paramLat], this.model[paramLng]);
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
}
