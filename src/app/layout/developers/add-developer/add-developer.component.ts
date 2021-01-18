import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { MapsAPILoader } from '@agm/core';
import { FileUpload } from 'src/app/common/fileUpload';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { LegalRepresentative, Banks } from 'src/app/models/legalEntity.model';
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
  projects = Array<any>();
  selctedProjects: Array<any>;
  multiDropdownSettings: any;
  data_fetch: boolean = false;

  public developer_access_formGroup: FormGroup;

  constructor(
    public constant: Constant,
    private cs: CommonService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.developer_access_formGroup = this.fb.group({
      developer_access: this.fb.array([])
    });
  }

  ngOnInit() {
    this.selctedProjects = [];
    this.file4 = new FileUpload(false, this.admin);
    this.initModel();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.getCurrencies();
    this.iniDropDownSetting();
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getDeveloperAllProjects(this.model.id);
      } else {
        this.model.id = '';
        this.model.images = [];
      }
    });
  }

  iniDropDownSetting() {
    this.multiDropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: this.translate.instant('commonBlock.selectAll'),
      unSelectAllText: this.translate.instant('commonBlock.unselectAll'),
      searchPlaceholderText: this.translate.instant('commonBlock.search'),
      allowSearchFilter: true,
      itemsShowLimit: 2
    };
  }

  setProject(item: any) {
    this.selctedProjects.push(item);
  }

  unsetProject(item: any) {
    let i = 0;
    this.selctedProjects.map(r => {
      if (r.id == item.id) {
        this.selctedProjects.splice(i, 1);
      }
      i = i + 1;
    });
  }

  onSelectAll(obj: any) {
  }

  initModel() {
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.model = new Users();
    this.model.legal_rep_banks = new Array();
    this.model.legal_representative = new LegalRepresentative();
    this.setCurrentPosition();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
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

  getDeveloperAllProjects(id: string) {
    this.spinner.show();
    //console.log('getDeveloperAllProjects');
    this.admin.postDataApi('getDeveloperAllProjects', { 'developer_id': id })
      .subscribe(
        success => {
          this.projects = success['data'];
          this.getUserById(this.model.id);
        }, error => {
          this.spinner.hide();
        });
  }

  getUserById(id: string) {
    let self = this;
    this.data_fetch = false;
    this.spinner.show();
    this.admin.postDataApi('getUserById', { 'user_id': id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = new Users();
          this.model = success.data;
          //console.log('getUserById ', success.data);
          // this.model.legal_representative = new LegalRepresentative();
          this.model.legal_rep_banks = success.data.legal_rep_banks;
          this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
          this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
          this.image = this.model.image;
          this.developer_image = this.model.developer_image;
          if (success.data.legal_representative && success.data.legal_representative.legal_rep_buildings) {
            for (let index = 0; index < success.data.legal_representative.legal_rep_buildings.length; index++) {
              const element = success.data.legal_representative.legal_rep_buildings[index];
              const d = this.projects.filter(r => r.id == element.building_id);
              if (d.length != 0) {
                const projectIndex = self.selctedProjects.find(item => item.id == d[0].id)
                if (!projectIndex) {
                  this.selctedProjects.push({ id: d[0].id, name: d[0].name });
                }
              }
            }
          }
          self.data_fetch = true;
          this.loadDeveloperAccessData((success.data || {}).developer_access);
        }, error => {
          this.spinner.hide();
        });
  }

  setSaleComm(sales_commission: number) {
    this.model.legal_representative.sales_commission = sales_commission;
  }

  setValue(send_mail: number) {
    this.model.send_mail = send_mail;
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

  onCountryChange(e, index?: number) {
    if (index >= 0) {
      (this.getDeveloperAccessFormArray.controls[index] as FormGroup).patchValue({
        user_country_code: e.iso2,
        user_dial_code: '+' + e.dialCode
      });
    } else {
      this.model.country_code = e.iso2;
      this.model.dial_code = '+' + e.dialCode;
      this.initialCountry = { initialCountry: e.iso2 };
    }
  }

  add(formData: NgForm) {
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    if (modelSave.legal_representative.phone) {
      modelSave.legal_representative.country_code = modelSave.legal_representative.country_code || this.constant.country_code;
      modelSave.legal_representative.dial_code = modelSave.legal_representative.dial_code || this.constant.dial_code;
    }
    if (modelSave.developer_address && (!modelSave.lat || !modelSave.lng)) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAddressFromDropdown'), 'error');
      return;
    }
    if (modelSave.images) {
      modelSave.images = modelSave.images.map(r => r.image);
    }

    // modelSave.legal_representative.have_dev_panel_access = modelSave.legal_representative.have_dev_panel_access ? 1 : 0;
    if (modelSave.legal_representative.name || modelSave.legal_representative.first_surname || modelSave.legal_representative.phone
      || modelSave.legal_representative.email) {
      // if any of key present, then all must be entered
      if (!modelSave.legal_representative.name) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeName'), 'error');
        return;
      }
      if (!modelSave.legal_representative.first_surname) {
        swal(this.translate.instant('swal.error'),
          this.translate.instant('message.error.pleaseEnterLegalRepresentativeFirstName'), 'error');
        return;
      }
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
    if (!modelSave.legal_representative.name || !modelSave.legal_representative.first_surname || !modelSave.legal_representative.phone
      || !modelSave.legal_representative.email) {
      delete modelSave.legal_representative;
    }

    if (modelSave['legal_rep_banks'] && modelSave['legal_rep_banks'].length > 0) {
      let i = 0;
      for (let index = 0; index < modelSave['legal_rep_banks'].length; index++) {
        const element = modelSave['legal_rep_banks'][index];
        if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
          i = i + 1;
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
          return;
        }
      }
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
    modelSave.have_dev_panel_access = modelSave.have_dev_panel_access ? 1 : 0;
    // console.log('model value in dev component ', this.model, modelSave);
    if (modelSave['legal_representative'] && this.selctedProjects && this.selctedProjects.length > 0) {
      const d = this.selctedProjects.map(o => o.id);
      modelSave['legal_representative']['building_ids'] = d;
    }
    modelSave['developer_access'] = this.getDeveloperAccessFormArray.getRawValue();
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
              this.router.navigate(['/dashboard/developers/view-all']);
            } else {
              this.model = success.data;
              this.model.legal_rep_banks = success.data.legal_rep_banks || [];
              this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
              this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks || [];
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

  placeMarker($event: any, addParam: string, paramLat: string, paramLng: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(addParam, this.model[paramLat], this.model[paramLng]);
  }


  getGeoLocation(addParam: string, lat: number, lng: number) {
    if (navigator.geolocation) {
      const geocoder = new google.maps.Geocoder();
      const latlng = new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      geocoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          if (result != null) {
            this.model[addParam] = result.formatted_address;
          } else {
            this.model[addParam] = lat + ',' + lng;
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

  addDeveloperBank(e) {
    const bank = new Banks();
    this.model.legal_rep_banks.push(bank);
  }

  removeDeveloperBank($event: Event, item: any, i: number) {
    $event.stopPropagation();
    this.model.legal_rep_banks.splice(i, 1);
    if (item.id) {
      this.admin.postDataApi('deleteLegalRepBank', { id: item.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  addDeveloperAccessFormGroup = ($event: any): void => {
    $event.stopPropagation();
    this.getDeveloperAccessFormArray.push(this.createFormGroup());
  }

  get getDeveloperAccessFormArray(): FormArray {
    return this.developer_access_formGroup.get('developer_access') as FormArray;
  }

  get getDeveloperAccessFormArrayLength(): number {
    return this.getDeveloperAccessFormArray.length;
  }

  removeDeveloperAccessFormGroup = ($event: Event, index: number, formGroup: FormGroup): void => {
    $event.stopPropagation();
    swal({
      type: 'success',
      html: this.translate.instant('message.error.areYouSureYouWantToRemoveTheUser'),
      confirmButtonColor: this.constant.confirmButtonColor,
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: this.constant.cancelButtonColor
    }).then((result) => {
      if (result.value) {
        this.getDeveloperAccessFormArray.removeAt(index);
        if (formGroup.get('id').value > 0) {
          this.spinner.show();
          this.admin.postDataApi('deleteDeveloperUser', { id: formGroup.get('id').value }).subscribe((success) => {
            this.spinner.hide();
          }, (error) => {
            this.spinner.hide();
          });
        }
      }
    });
  }

  loadDeveloperAccessData = (developerAccessArray: any[] = []): void => {
    developerAccessArray.forEach((developerAccess) => {
      this.getDeveloperAccessFormArray.push(this.createFormGroup(developerAccess));
    });
  }

  createFormGroup = (developerAccess?: any): FormGroup => {
    return this.fb.group({
      id: [(developerAccess || {}).id ? (developerAccess || {}).id : 0],
      is_send_email: [false], // ((developerAccess || {}).approved == 1) ? true : false
      user_name: [(developerAccess || {}).name ? (developerAccess || {}).name : '', [Validators.required]],
      user_country_code: [(developerAccess || {}).country_code ? (developerAccess || {}).country_code : this.constant.country_code, [Validators.required]],
      user_dial_code: [(developerAccess || {}).dial_code ? (developerAccess || {}).dial_code : this.constant.dial_code, [Validators.required]],
      user_first_surname: [(developerAccess || {}).first_surname ? (developerAccess || {}).first_surname : '', [Validators.required]],
      user_second_surname: [(developerAccess || {}).second_surname ? (developerAccess || {}).second_surname : ''],
      user_email: [(developerAccess || {}).email ? (developerAccess || {}).email : '', [Validators.required]],
      user_contact_number: [(developerAccess || {}).contact_number ? (developerAccess || {}).contact_number : '', [Validators.required]],
      building_ids: [(((developerAccess || {}).building_ids || []).length > 0) ? this.makeBuildingDetails(developerAccess.building_ids) : []],
      is_access: [developerAccess ? (developerAccess || {}).approved || 0 : -1] // No Access = 0,  Has Access = 1 , default = -1 
    });
  }

  makeBuildingDetails = (building_ids: any[] = []): any => {
    const details = [];
    building_ids.forEach((buildingData) => {
      for (const iterator of this.projects) {
        if (iterator.id == buildingData.id) {
          details.push({ id: iterator.id, name: iterator.name });
          break;
        }
      }
    });
    return details;
  }

  goBack(){ 
    this.router.navigate(['dashboard/developers/view-all', {for: 'back'}])
  }
}

