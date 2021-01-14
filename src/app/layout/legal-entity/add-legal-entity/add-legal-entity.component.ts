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

  public system_dashboard_formGroup: FormGroup;

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
    this.system_dashboard_formGroup = this.fb.group({
      system_dashboard_formArray: this.fb.array([])
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
  initForm() {
    this.addDataForm = this.fb.group({
      id: [''],
      comm_name: ['', [Validators.required]],
      legal_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      country_code: ['', [Validators.required]],
      dial_code: ['', [Validators.required]],
      address: [''],
      description: [''],
      lat: [''],
      lng: [''],
      // mapvalue: [''],
      fed_tax_pay: [''],
      legal_entity_banks: this.fb.array([]),
      developer_id: [''],
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
        sales_commission: ['']
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
              const projectIndex = self.selctedProjects.find(item => item.id == d[0].id)
              if (!projectIndex) {
                self.selctedProjects.push({ id: d[0].id, name: d[0].name });
              }
            }
          }
          this.patchForm(success.data);
          self.data_fetch = true;
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
  }

  setSaleComm(sales_commission: number) {
    this.model.legal_rep.sales_commission = sales_commission;
  }

  set() {
    this.show = true;
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
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

  addSystemDashboardFormArray = ($event: any): void => {
    $event.stopPropagation();
    this.systemDashboardFormArray.push(this.newFormGroup());
  }

  get systemDashboardFormArray(): FormArray {
    return this.system_dashboard_formGroup.get('system_dashboard_formArray') as FormArray;
  }

  removeSystemDashboardFormArray($event: Event, i: number, item) {
   // console.log(item);
    $event.stopPropagation();
    this.systemDashboardFormArray.removeAt(i);
    // if (item && item.value.id) {
    //   this.admin.postDataApi('deleteLegalEntityBank', { id: item.value.id }).subscribe(success => {
    //     this.spinner.hide();
    //   }, error => {
    //     this.spinner.hide();
    //   });
    // }
  }

  newFormGroup = (): FormGroup => {
    return this.fb.group({
      name: ['', [Validators.required]],
      first_surname: ['', [Validators.required]],
      second_surname: [''],
      email_id: ['', [Validators.required]],
      contact_number: ['', [Validators.required]]
    });
  }

  addSystemDashboard = (): void => {

  }
  
}
