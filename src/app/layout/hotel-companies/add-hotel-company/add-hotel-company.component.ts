import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { LegalRepresentative, Banks } from 'src/app/models/legalEntity.model';
declare const google: any;
declare let swal: any;

@Component({
  selector: 'app-add-hotel-company',
  templateUrl: './add-hotel-company.component.html',
  styleUrls: ['./add-hotel-company.component.css']
})
export class AddHotelCompanyComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('search1') search1ElementRef: ElementRef;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  logo: any;
  model: Company;
  currencies: Array<any>;
  constructor(
    public constant: Constant,
    private cs: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.model = new Company();
    this.model.legal_representative = new LegalRepresentative();
    this.setCurrentPosition();
    this.getCurrencies();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getHotelTowerManagerCompanyById(this.model.id);
      }
    });
  }

  getCurrencies() {
    this.admin.postDataApi('getCurrencies', {})
      .subscribe(
        success => {
          this.currencies = success.data;
        }, error => {
          this.spinner.hide();
        }
      );
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }
  getHotelTowerManagerCompanyById(id: number) {
    this.spinner.show();
    this.admin.postDataApi('getHotelTowerManagerCompanyById', { 'id': id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = success.data;
          this.image = this.model.image;
          this.logo = this.model.logo;
          this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
          this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
        }, error => {
          this.spinner.hide();
        });
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
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
    this.initialCountry = { initialCountry: e.iso2 };
  }

  add(formData: NgForm) {
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    if (modelSave.legal_representative.phone) {
      modelSave.legal_representative.country_code = modelSave.legal_representative.country_code || this.constant.country_code;
      modelSave.legal_representative.dial_code = modelSave.legal_representative.dial_code || this.constant.dial_code;
    }

    if (this.model.img_loader || this.model.logo_loader) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.uploadingImage'), 'error');
      return;
    }
    delete this.model.logo_loader;
    delete this.model.img_loader;

    if (modelSave.legal_representative.phone || modelSave.legal_representative.email) {
      // if any of key present, then all must be entered
      // if (!modelSave.legal_representative.name) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeName'), 'error');
      //   return;
      // }
      // if (!modelSave.legal_representative.first_surname) {
      //   swal(this.translate.instant('swal.error'),
      //     this.translate.instant('message.error.pleaseEnterLegalRepresentativeFirstName'), 'error');
      //   return;
      // }
      if (!modelSave.legal_representative.phone) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativePhone'), 'error');
        return;
      }
      if (!modelSave.legal_representative.email) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeEmail'), 'error');
        return;
      }
      // if (!modelSave.legal_representative.fed_tax_pay) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFTPR'), 'error');
      //   return;
      // }
    }
    if (!modelSave.legal_representative.phone
      || !modelSave.legal_representative.email) {
      delete modelSave.legal_representative;
    }

    if (modelSave['legal_representative'] && modelSave['legal_representative']['legal_rep_banks'] &&
      modelSave['legal_representative']['legal_rep_banks'].length > 0) {
      let i = 0;
      for (let index = 0; index < modelSave['legal_representative']['legal_rep_banks'].length; index++) {
        const element = modelSave['legal_representative']['legal_rep_banks'][index];
        if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
          i = i + 1;
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
          return;
        }
      }
    }
    this.spinner.show();
    this.admin.postDataApi('addHotelTowerManagerCompany', modelSave)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
            return;
          } else {
            const text = this.model.id ?
              this.translate.instant('message.success.updatedSuccessfully') :
              this.translate.instant('message.success.addedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            // if (!this.model.id) {
            //   formData.reset();
            //   this.image = ''; this.logo = '';
            //   this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
            //   this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks || [];
            // } else {
            //   this.router.navigate(['/dashboard/companies/view-all']);
            // }
            this.router.navigate(['/dashboard/hotel-companies/view-all']);
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

  addLegalEntityBank(e) {
    const bank = new Banks();
    this.model.legal_representative.legal_rep_banks = this.model.legal_representative.legal_rep_banks || [];
    this.model.legal_representative.legal_rep_banks.push(bank);
  }

  removeLegalEntityBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.model.legal_representative.legal_rep_banks.splice(i, 1);
    if (item.id) {
      this.admin.postDataApi('deleteLegalRepBank', { id: item.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

}
