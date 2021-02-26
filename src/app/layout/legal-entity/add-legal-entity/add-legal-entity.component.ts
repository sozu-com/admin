import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { LegalEntity, LegalRepresentative } from '../../../models/legalEntity.model';
import { Developer } from 'src/app/models/global.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-legal-entity',
  templateUrl: './add-legal-entity.component.html',
  styleUrls: ['./add-legal-entity.component.css']
})
export class AddLegalEntityComponent implements OnInit {
  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  @ViewChild('openDeveloperModel') openDeveloperModel: ElementRef;
  @ViewChild('closeDeveloperModel') closeDeveloperModel: ElementRef;
  public scrollbarOptions = { axis: 'y', theme: 'dark' };
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  name: string;
  model: LegalEntity;
  currencies: Array<any>;
  addDataForm: FormGroup;
  all_developers: Array<Developer>;
  projects = Array<any>();
  selctedProjects = Array<any>();
  multiDropdownSettings: any;
  data_fetch: boolean = false;

  public developer_access_formGroup: FormGroup;

  constructor(
    public constant: Constant,
    private router: Router,
    private admin: AdminService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) {
    this.developer_access_formGroup = this.fb.group({
      developer_access: this.fb.array([])
    });
  }

  ngOnInit() {
    this.iniDropDownSetting();
    this.model = new LegalEntity();
    this.model.legal_rep = new LegalRepresentative();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.model.legal_rep.country_code = this.constant.country_code;
    this.model.legal_rep.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.initForm();
    this.getDevelopers('');
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id'] !== '0') {
        this.model.id = params['id'];
        this.getLegalEntityAllProjects(this.model.id);
      } else {
        this.model.id = '';
      }
    });
    this.getCurrencies();
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

  uploadDoc(legalentity) {
    //console.log(legalentity, "legal-entity id")
    this.router.navigate(['/dashboard/legal-entities/document-upload', legalentity.id]);
  }

  initForm() {
    this.addDataForm = this.fb.group({
      id: [''],
      comm_name: ['', [Validators.required]],
      legal_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country_code: ['', [Validators.required]],
      dial_code: ['', [Validators.required]],
      description: [''],

      address: [''],
      lat: [''],
      lng: [''],
      // mapvalue: [''],
      fed_tax_pay: [''],
      legal_entity_banks: this.fb.array([]),
      developer_id: [''],
      // for tax addresses
      street_address: [''],
      external_number: [''],
      internal_number: [''],
      zipcode: [''],
      municipality: [''],
      country: [''],
      state: [''],
      city: [''],
      neighbourhood: [''],
      // for tax addresses
      tax_street_address: [''],
      tax_external_number: [''],
      tax_internal_number: [''],
      tax_zipcode: [''],
      tax_municipality: [''],
      tax_country: [''],
      tax_state: [''],
      tax_city: [''],
      tax_neighbourhood: [''],
      // tax_neighbourhoods?: any[];
      use_user_same_address: [false],
      // nationality_name?: string;
      // nationality_id?: number = 1;

      legal_rep: this.fb.group({
        id: [''],
        name: [''],
        first_surname: [''],
        second_surname: [''],
        phone: [''],
        country_code: [''],
        dial_code: [''],
        email: [''],
        have_dev_panel_access: [''],
        // fed_tax_pay: ['', [Validators.required]],
        fed_tax_pay: [''],
        legal_rep_banks: this.fb.array([]),
        building_ids: [''],
        sales_commission: [''],
        //developer_id: ['']
      })

    });

    const countryDialCode = {
      country_code: this.model.country_code,
      dial_code: this.model.dial_code
    };
    this.addDataForm.controls.country_code.patchValue(this.model.country_code);
    this.addDataForm.controls.dial_code.patchValue(this.model.dial_code);
    this.addDataForm.patchValue({ legal_rep: countryDialCode });

    this.setCurrentPosition();
  }

  getDevelopers(name: string) {
    this.spinner.show();
    this.admin.postDataApi('getUnblockedDevelopers', { name: name }).subscribe(r => {
      this.spinner.hide();
      this.all_developers = r.data;
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

  addLegalEntityBank($event) {
    $event.stopPropagation();
    this.legalEntityBanks.push(this.newBanks());
  }

  get legalEntityBanks(): FormArray {
    return this.addDataForm.get('legal_entity_banks') as FormArray;
  }

  removeLegalEntityBank($event: Event, i: number, item) {
    // console.log(item);
    $event.stopPropagation();
    this.legalEntityBanks.removeAt(i);
    if (item && item.value.id) {
      this.admin.postDataApi('deleteLegalEntityBank', { id: item.value.id }).subscribe(success => {
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
    }
  }

  addLegalRepBank($event) {
    $event.stopPropagation();
    this.legalRepBanks.push(this.newBanks());
  }

  get legalRepBanks(): FormArray {
    const legalRep = this.addDataForm.get('legal_rep') as FormGroup;
    return legalRep.get('legal_rep_banks') as FormArray;
  }

  removeLegalRepBank($event: Event, i: number) {
    $event.stopPropagation();
    this.legalRepBanks.removeAt(i);
  }

  newBanks(): FormGroup {
    return this.fb.group({
      bank_name: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      swift: ['', [Validators.required]],
      currency_id: ['', [Validators.required]]
    });
  }

  getLegalEntityAllProjects(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getLegalEntityAllProjects', { 'legal_entity_id': id })
      .subscribe(
        success => {
          this.projects = success['data'];
          this.getLegalEntityById(this.model.id);
        }, error => {
          this.spinner.hide();
        });
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

  getLegalEntityById(id: string) {
    let self = this;
    this.data_fetch = false;
    this.spinner.show();
    this.admin.postDataApi('getLegalEntityById', { id: id })
      .subscribe(
        success => {
          this.spinner.hide();
          // this.model = success.data;
          if (success.data.legal_reps && success.data.legal_reps.legal_rep_buildings) {
            for (let index = 0; index < success.data.legal_reps.legal_rep_buildings.length; index++) {
              const element = success.data.legal_reps.legal_rep_buildings[index];
              const d = this.projects.filter(r => r.id == element.building_id);
              // const projectIndex = self.selctedProjects.find(item => item.id == d[0].id)
              // if (!projectIndex) {
              //   self.selctedProjects.push({ id: d[0].id, name: d[0].name });
              // }
            }
          }
          this.patchForm(success.data);
          self.data_fetch = true;
          this.loadDeveloperAccessData((success.data || {}).developer_access);
        }, error => {
          this.spinner.hide();
        });
  }


  patchForm(data) {
    this.addDataForm.patchValue(data);
    if (data.lat && data.lng) {
      this.model.lat = data.lat;
      this.model.lng = data.lng;
    }
    const control = this.addDataForm.get('legal_entity_banks') as FormArray;
    if (data.legal_entity_banks) {
      data.legal_entity_banks.forEach(x => {
        control.push(this.fb.group(x));
      });
    }
    this.addDataForm.patchValue({ legal_rep: data.legal_reps });
    if (data.legal_reps) {
      this.model.legal_rep.sales_commission = data.legal_reps.sales_commission;
    }
    const repBanks = this.addDataForm.get('legal_rep').get('legal_rep_banks') as FormArray;
    if (data.legal_reps && data.legal_reps.legal_rep_banks) {
      data.legal_reps.legal_rep_banks.forEach(x => {
        repBanks.push(this.fb.group(x));
      });
    }
    this.model['neighbourhoods'] = [];
    this.model.neighbourhoods.push(this.addDataForm.get('neighbourhood').value);
    this.model['tax_neighbourhoods'] = [];
    this.model.tax_neighbourhoods.push(this.addDataForm.get('tax_neighbourhood').value);
   // (this.addDataForm.get('legal_rep') as FormGroup).get('developer_id').setValue(data.developer_id);
  }

  setSaleComm(sales_commission: number) {
    this.model.legal_rep.sales_commission = sales_commission;
  }

  set() {
    this.show = true;
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
    formData['country_code'] = this.model.country_code;
    formData['dial_code'] = this.model.dial_code;
    formData['legal_rep']['country_code'] = this.model.country_code;
    formData['legal_rep']['dial_code'] = this.model.dial_code;
    formData['legal_rep']['have_dev_panel_access'] = formData['legal_rep']['have_dev_panel_access'] ? 1 : 0;
    formData['send_mail'] = this.model.send_mail ? this.model.send_mail : 0;
    if (this.model.id) {
      formData['id'] = this.model.id;
    }
    if (this.model.lat && this.model.lng) {
      formData['lat'] = this.model.lat;
      formData['lng'] = this.model.lng;
      formData['address'] = this.model.address;
    }
    if (formData['legal_rep'].name || formData['legal_rep'].first_surname || formData['legal_rep'].phone
      || formData['legal_rep'].email) {
      // if any of key present, then all must be entered
      if (!formData['legal_rep'].name) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeName'), 'error');
        return;
      }
      if (!formData['legal_rep'].first_surname) {
        swal(this.translate.instant('swal.error'),
          this.translate.instant('message.error.pleaseEnterLegalRepresentativeFirstName'), 'error');
        return;
      }
      if (!formData['legal_rep'].phone) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativePhone'), 'error');
        return;
      }
      if (!formData['legal_rep'].email) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeEmail'), 'error');
        return;
      }
      // if (!formData['legal_rep'].fed_tax_pay) {
      //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterLegalRepresentativeFTPR'), 'error');
      //   return;
      // }
    }
    if (!formData['legal_rep'].name || !formData['legal_rep'].first_surname || !formData['legal_rep'].phone
      || !formData['legal_rep'].email) {
      delete formData['legal_rep'];
    }

    if (formData['legal_entity_banks'] && formData['legal_entity_banks'].length > 0) {
      let i = 0;
      for (let index = 0; index < formData['legal_entity_banks'].length; index++) {
        const element = formData['legal_entity_banks'][index];
        if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
          i = i + 1;
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
          return;
        }
      }
    }

    if (formData['legal_rep'] && formData['legal_rep']['legal_rep_banks'] && formData['legal_rep']['legal_rep_banks'].length > 0) {
      let i = 0;
      for (let index = 0; index < formData['legal_rep']['legal_rep_banks'].length; index++) {
        const element = formData['legal_rep']['legal_rep_banks'][index];
        if (!element.bank_name || !element.account_number || !element.swift || !element.currency_id) {
          i = i + 1;
          swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterBankDetails'), 'error');
          return;
        }
      }
    }
    if (formData['legal_rep'] && this.selctedProjects && this.selctedProjects.length > 0) {
      const d = this.selctedProjects.map(o => o.id);
      formData['legal_rep']['building_ids'] = d;
    }
    if (this.getDeveloperAccessFormArrayLength > 0) {
      if (this.checkDeveloperAccessFormArrayInvalid()) {
        return;
      } else {
        formData['developer_access'] = this.getDeveloperAccessFormArray.getRawValue();
      }
    }
    //formData['developer_id'] = (this.addDataForm.get('legal_rep') as FormGroup).get('developer_id').value;
    this.spinner.show();
    this.admin.postDataApi('addLegalEntity', formData)
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
            this.router.navigate(['/dashboard/legal-entities/view-all']);
            // if (this.model.id === '') {
            //   formData.reset();
            // }
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
      });
    }
  }

  placeMarker($event: any, addParam: string, paramLat: string, paramLng: string) {
    this.model[paramLat] = $event.coords.lat;
    this.model[paramLng] = $event.coords.lng;
    this.getGeoLocation(addParam, this.model[paramLat], this.model[paramLng]);
  }
  goBack() {
    this.router.navigate(['/dashboard/legal-entities/view-all', { for: 'back' }])
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

  setValue(send_mail: number) {
    this.model.send_mail = send_mail;
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
      user_email: [(developerAccess || {}).email ? { value: (developerAccess || {}).email, disabled: true } : { value: '', disabled: false }, [Validators.required]],
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

  /*
  * if form-array is invalid then return true otherwise false 
  */
  checkDeveloperAccessFormArrayInvalid = (): boolean => {
    let invalid = false;
    for (const formGroup of this.getDeveloperAccessFormArray.controls) {
      if (formGroup.get('user_name').invalid) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterName'), 'error');
        invalid = true;
        break;
      } else if (formGroup.get('user_first_surname').invalid) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterFirstSurname'), 'error');
        invalid = true;
        break;
      } else if (formGroup.get('user_email').invalid) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterEmailId'), 'error');
        invalid = true;
        break;
      } else if (formGroup.get('user_contact_number').invalid) {
        swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterContactNumber'), 'error');
        invalid = true;
        break;
      }
    }
    return invalid; // if form-array is invalid then return true otherwise false
  }

  getCounrtyByZipcode = (isTaxAddress: boolean): void => {
    if (isTaxAddress ? ((this.addDataForm.get('tax_zipcode').value || '0').toString()).length >= 5 :
      ((this.addDataForm.get('zipcode').value || '0').toString()).length >= 5) {
      this.spinner.show();
      this.admin.postDataApi('getCounrtyByZipcode', { zip_code: isTaxAddress ? this.addDataForm.get('tax_zipcode').value : this.addDataForm.get('zipcode').value }).
        subscribe((success) => {
          this.spinner.hide();
          if (isTaxAddress) {
            this.model.tax_neighbourhoods = ((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
            this.addDataForm.patchValue({
              tax_municipality: ((success.data || {}).response || {}).municipio || '', // Municipality
              tax_state: ((success.data || {}).response || {}).estado || '', // State
              tax_city: ((success.data || {}).response || {}).ciudad || '', // city
              tax_country: ((success.data || {}).response || {}).pais || '', // Country
              tax_neighbourhood: (this.model.tax_neighbourhoods || [])[0] || ''
            });
          } else {
            this.model.neighbourhoods = ((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
            this.addDataForm.patchValue({
              municipality: ((success.data || {}).response || {}).municipio || '', // Municipality
              state: ((success.data || {}).response || {}).estado || '', // State
              city: ((success.data || {}).response || {}).ciudad || '', // city
              country: ((success.data || {}).response || {}).pais || '', // Country
              neighbourhood: (this.model.neighbourhoods || [])[0] || ''
            });
            this.onClickUseUserSameAddress();
          }
        }, (error) => {
          this.spinner.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
    } else {
      if (isTaxAddress) {
        this.addDataForm.patchValue({
          tax_municipality: '',
          tax_state: '',
          tax_city: '',
          tax_country: '',
          tax_neighbourhood: ''
        });
        this.model.tax_neighbourhoods = [];
      } else {
        this.addDataForm.patchValue({
          municipality: '',
          state: '',
          city: '',
          country: '',
          neighbourhood: ''
        });
        this.model.neighbourhoods = [];
        this.onClickUseUserSameAddress();
      }
    }
  }

  onClickUseUserSameAddress = (): void => {
    if (this.addDataForm.get('use_user_same_address').value) {
      this.addDataForm.patchValue({
        tax_street_address: this.addDataForm.get('street_address').value,
        tax_external_number: this.addDataForm.get('external_number').value,
        tax_internal_number: this.addDataForm.get('internal_number').value,
        tax_zipcode: this.addDataForm.get('zipcode').value,
        tax_municipality: this.addDataForm.get('municipality').value,
        tax_country: this.addDataForm.get('country').value,
        tax_state: this.addDataForm.get('state').value,
        tax_city: this.addDataForm.get('city').value,
        tax_neighbourhood: this.addDataForm.get('neighbourhood').value
      });
      this.model.tax_neighbourhoods = this.model.neighbourhoods;
    }
  }

}
