import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ACL, Permission } from './../../../models/acl.model';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { LegalEntity, Banks } from 'src/app/models/legalEntity.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-developer',
  templateUrl: './add-developer.component.html',
  styleUrls: ['./add-developer.component.css']
})
export class AddDeveloperComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('search1') search1ElementRef: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  image: any;
  file4: FileUpload;
  developer_image: any;
  model: Users;
  currencies: Array<any>;
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
    this.file4 = new FileUpload(false, this.admin);
    this.model = new Users();
    this.model.legal_rep_banks = Array(new Banks());
    this.model.legal_entity = new LegalEntity();
    this.model.legal_entity.legal_entity_banks = Array(new Banks());
    this.model.legal_entity.country_code = this.constant.country_code;
    this.model.legal_entity.dial_code = this.constant.dial_code;
    this.setCurrentPosition();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.getCurrencies();
    this.initialCountry = {initialCountry: this.constant.country_code};
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          this.model.id = params['id'];
          this.getUserById(this.model.id);
        } else {
          this.model.id = '';
          this.model.images = [];
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

  getUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getUserById', {'user_id': id})
    .subscribe(
      success => {
        this.spinner.hide();
        this.model = success.data;
        this.model.legal_rep_banks = success.data.legal_rep_banks ? success.data.legal_rep_banks : Array(new Banks());
        this.model.legal_entity = success.data.legal_entity ? success.data.legal_entity : new LegalEntity();
        this.model.legal_entity.legal_entity_banks = success.data.legal_entity.legal_entity_banks ?
        success.data.legal_entity.legal_entity_banks : []; // Array(new Banks());
        // if (!success.data.legal_entity) {
          console.log('11')
          this.model.legal_entity.dial_code = this.constant.dial_code;
          this.model.legal_entity.country_code = this.constant.country_code;
        // }
        console.log(this.model);
        this.image = this.model.image;
        this.developer_image = this.model.developer_image;
      }, error => {
        this.spinner.hide();
      });
  }

  set() {
    this.show = true;
  }

  changeListner(event: any, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this[param] = e.target.result;
      this.spinner.show();
      this.cs.saveImage(event.target.files[0]).subscribe(
        success => {
          this.spinner.hide();
          this.model[param] = success['data'].image;
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  add(formData: NgForm) {
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    if (!modelSave.lat || !modelSave.lng) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAddressFromDropdown'), 'error');
      return;
    }
    if (modelSave.images) {
      modelSave.images = modelSave.images.map(r => r.image);
    }
    this.spinner.show();
    this.admin.postDataApi('addDeveloper', modelSave)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal(this.translate.instant('swal.error'), success.message, 'error');
            return;
          } else {
            const text = this.model.id === '' ?
                    this.translate.instant('message.success.addedSuccessfully') :
                    this.translate.instant('message.success.updatedSuccessfully');
            swal(this.translate.instant('swal.success'), text, 'success');
            if (this.model.id === '') {
              formData.reset();
              this.image = ''; this.developer_image = '';
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


  file4Select($event) {
    this.file4.onSelectFile($event);
  }

  modelOpenFun() {
    this.modalOpen.nativeElement.click();
    this.file4.backup(JSON.parse(JSON.stringify(this.model.images)));
  }

  modelCloseFun() {
    this.modalClose.nativeElement.click();
  }

  saveImages() {
    if (this.file4.files.length < 1) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAtleastOneImage'), 'error'); return false;
    }
    this.modalClose.nativeElement.click();
    this.file4.upload().then(r => {
      this.model.images = this.file4.files;
    });
  }

  addLegalEntityBank(e) {
    const bank = new Banks();
    this.model.legal_entity.legal_entity_banks.push(bank);
  }

  removeLegalEntityBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.model.legal_entity.legal_entity_banks.splice(i, 1);
    if (item.id) {
      this.admin.postDataApi('deleteSellerBank', {id: item.id}).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  addDeveloperBank(e) {
    const bank = new Banks();
    this.model.legal_rep_banks.push(bank);
  }

  removeDeveloperBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.model.legal_rep_banks.splice(i, 1);
    if (item.id) {
      this.admin.postDataApi('deleteSellerBank', {id: item.id}).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }
}



// if($request->legal_representative){
//   if(isset($request->legal_representative->id)){
//        //update the legal entiry
//        $legal_representative = Uer::find($request->legal_representative->id);
//        $legal_representative->name = $request->legal_representative['name'];
//        $legal_representative->email= $request->legal_representative['email'];
//        $legal_representative->dial_code = $request->legal_representative['dial_code'];
//        $legal_representative->country_code=$request->legal_representative['country_code'];
//        $legal_representative->phone     = $request->legal_representative['phone'];
//        $legal_representative->fed_tax_pay = $request->legal_entity['fed_tax_pay'];
//        $legal_representative->save();
//   }else{
//        // create lega entity
//        $legal_representative = new User();
//        $legal_representative->name = $request->legal_representative['name'];
//        $legal_representative->email= $request->legal_representative['email'];
//        $legal_representative->dial_code = $request->legal_representative['dial_code'];
//        $legal_representative->country_code=$request->legal_representative['country_code'];
//        $legal_representative->phone     = $request->legal_representative['phone'];
//        $legal_representative->fed_tax_pay = $request->legal_representative['fed_tax_pay'];
//        $legal_representative->save();
//   } 

//   foreach ($request->legal_representative['legal_rep_banks'] as $k => $bank) {
//       if(isset($bank['id'])){
//            LegalRepresentativeBank::where('id',$bank['id'])->where('user_id',$legal_representative->id)->update([
//                'bank_name'     =>  $bank['bank_name'],
//                'swift'         =>  $bank['swift'],
//                'account_number'=>  $bank['account_number'],
//                'currency_id'   =>  $bank['currency_id']
//            ]);
//       }else{
//            LegalRepresentativeBank::create([
//                'user_id'   =>  $legal_representative->id,
//                'bank_name'         =>  $bank['bank_name'],
//                'swift'             =>  $bank['swift'],
//                'account_number'    =>  $bank['account_number'],
//                'currency_id'       =>  $bank['currency_id']
//            ]);
//       }
//   }
// }