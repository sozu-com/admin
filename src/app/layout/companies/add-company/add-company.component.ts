import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { MapsAPILoader } from '@agm/core';
import { Company } from 'src/app/models/company.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare const google: any;
declare let swal: any;

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('search1') search1ElementRef: ElementRef;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  logo: any;
  model: Company;
  constructor(
    public constant: Constant,
    private cs: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.model = new Company();
    this.setCurrentPosition();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.initialCountry = {initialCountry: this.constant.country_code};
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          this.model.id = params['id'];
          this.getTowerManagerCompanyById(this.model.id);
        }
      });
  }

  getTowerManagerCompanyById(id: number) {
    this.spinner.show();
    this.admin.postDataApi('getTowerManagerCompanyById', {'id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
        this.image = this.model.image;
        this.logo = this.model.logo;
      }, error => {
        this.spinner.hide();
      });
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    this.model[paramLoader] = true;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this[param] = e.target.result;
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
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    if (!modelSave.lat || !modelSave.lng) {
      swal('Error', this.translate.instant('message.info.pleaseChooseAddressFromDropdown'), 'error');
      return;
    }
    if (!modelSave.branch_lat || !modelSave.branch_lng) {
      swal('Error', this.translate.instant('message.info.pleaseChooseBranchAddressFromDropdown'), 'error');
      swal('Error', '', 'error');
      return;
    }
    if (this.model.img_loader || this.model.logo_loader) {
      swal('Error', this.translate.instant('message.error.uploadingImage'), 'error');
      return;
    }
    delete this.model.logo_loader;
    delete this.model.img_loader;
    this.spinner.show();
    this.admin.postDataApi('addTowerManagerCompany', modelSave)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal('Error', success.message, 'error');
            return;
          } else {
            const text = this.model.id ?
                    this.translate.instant('message.success.updatedSuccessfully') :
                    this.translate.instant('message.success.addedSuccessfully');
            swal('Success', text, 'success');
            if (!this.model.id) {
              formData.reset();
              this.image = ''; this.logo = '';
            }
          }
        }, error => {
          this.spinner.hide();
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
        this.model.lat = this.model.lat ? this.model.lat : position.coords.latitude;
        this.model.lng = this.model.lng ? this.model.lng : position.coords.longitude;

        // setting branch office lat lng
        this.model.branch_lat = this.model.branch_lat ? this.model.branch_lat : position.coords.latitude;
        this.model.branch_lng = this.model.branch_lng ? this.model.branch_lng : position.coords.longitude;
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
