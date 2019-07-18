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
import { Agency } from 'src/app/models/agency.model';
declare const google: any;
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
  initialCountry: any;
  show = false;
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
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          console.log('aaa', this.model);
          this.model.id = params['id'];
          this.getAgencyById(this.model.id);
        } else {
          console.log('aaa', this.model);
          this.model.id = '';
        }
      });
  }

  getAgencyById(id: string) {
    this.parameter.loading = true;
    this.admin.postDataApi('getAgencyById', {'id': id})
    .subscribe(
      success => {
        this.parameter.loading = false;
        this.model = success.data;
        console.log('==', this.model);
      }, error => {
        this.parameter.loading = false;
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, paramLoader: string, param: any) {
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.model[param] = e.target.result;
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.model[paramLoader] = false;
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryCodeChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  add(formData: NgForm) {
    const modelSave: Agency = JSON.parse(JSON.stringify(this.model));
    if (!modelSave.lat || !modelSave.lng) {
      swal('Error', 'Please choose address from dropdown.', 'error');
      return;
    }
    if (modelSave.img_loader || modelSave.logo_loader) {
      swal('Error', 'Uploading image.', 'error');
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

  placeMarker($event: any, param: string, paramLat: string, paramLng: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(param, this.model[paramLat], this.model[paramLng]);
  }


  getGeoLocation(param: string, lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          console.log('para,', param);
          if (result != null) {
            this.model[param] = result.formatted_address;
          } else {
            this.model[param] = lat + ',' + lng;
          }
        }
      });
    }
  }
}
