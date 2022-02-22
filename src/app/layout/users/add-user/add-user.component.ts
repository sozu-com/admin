import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { LegalRepresentative, Banks } from 'src/app/models/legalEntity.model';
import { IDestinationStatus, IMarritalStatus } from 'src/app/common/marrital-status-interface';
import { Beneficiary, Tutor } from 'src/app/models/beneficiary.model';
import * as moment from 'moment';
import { LocalityToCountry } from 'src/app/models/addProject.model';
declare const google;
declare let swal: any;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('mapDiv') mapDiv: ElementRef;
  @ViewChild('search') searchElementRef: ElementRef;
  Relationship_list = Array<IDestinationStatus>();
  public parameter: IProperty = {};
  initialCountry: any;
  show = false;
  beneficiaryIndex: number = -1;
  image: any;
  file4: FileUpload;
  developer_image: any;
  model: Users;
  currencies = Array<any>();
  location: IProperty = {};
  marrital_status_bene = Array<IMarritalStatus>();
  marrital_status_list = [
    { id: 1, name_en: 'Single', name_es: 'Soltero' },
    { id: 2, name_en: 'Married - Community property', name_es: 'Casado - Bienes mancomunados' },
    { id: 3, name_en: 'Married - Separate goods', name_es: 'Casado - Bienes separados' }
  ];
  language_code: string;
  showInput: boolean = false;
  cityDisable: boolean;
  stateDisable: boolean;
  stateInput: string;
  cityInput: string;
  age: any;
  countryInput: string;
  nationalityDetails: any[] = [];
  beneficiary: Beneficiary;
  beneficiary_list: any[] = [];
  public selectedAddr: any;
  toDayDate: any;

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
  ) {
    const dtToday = new Date();
    let month: any = dtToday.getMonth() + 1;
    let day: any = dtToday.getDate();
    const year = dtToday.getFullYear();
    if (month < 10) {
      month = '0' + month.toString();
    }
    if (day < 10) {
      day = '0' + day.toString();
    }
    this.toDayDate = year + '-' + month + '-' + day;
  }

  ngOnInit() {
    this.age;
    this.language_code = localStorage.getItem('language_code');
    this.initModel();
    //this.getCountries();
    this.getMarritalStatusList();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.getCurrencies();
    this.parameter.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.model.id = params['id'];
        this.getUserById(this.model.id);
        this.getBeneficiary();
      } else {
        this.model.id = '';
        this.assignedObject();
      }
    });
    this.getStates();
    this.getNationality();
    this.getRelationship();
  }
  getRelationship() {
    this.admin.postDataApi('getRelationship', {})
      .subscribe(
        success => {
          this.Relationship_list = success.data;
        }, error => {
          this.spinner.hide();
        });
  }
  initModel() {
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.model = new Users();
    this.beneficiary = new Beneficiary();
    this.beneficiary.tutor = new Tutor();
    this.model.legal_rep_banks = new Array();
    this.model.beneficiary = new Array();
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
        });
  }

  getUserById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getUserById', { 'user_id': id })
      .subscribe(
        success => {
          this.spinner.hide();
          this.model = new Users();
          this.model = success.data;
          // this.model.legal_representative = new LegalRepresentative();
          this.model.legal_rep_banks = success.data.legal_rep_banks;
          this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
          this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks; // Array(new Banks());
          this.image = this.model.image;

          this.model.country_id ? this.getStatesNew1(this.model.country_id) : undefined;
          this.model.state_id ? this.getCitiesNew1(this.model.state_id) : undefined;
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

  onCountryChange(e, index: number) {
    // this.model.country_code = e.iso2;
    // this.model.dial_code = '+' + e.dialCode;
    // this.initialCountry = {initialCountry: e.iso2};

    switch (index) {
      case 1:
        this.model.country_code = e.iso2;
        this.model.dial_code = '+' + e.dialCode;
        break;
      case 2:
        this.model.legal_representative.country_code = e.iso2;
        this.model.legal_representative.dial_code = '+' + e.dialCode;
        break;
      case 3:
        this.model.user_country_code = e.iso2;
        this.model.user_dial_code = '+' + e.dialCode;
        break;
      default:
        break;
    }
  }

  addBeneficiary = (): void => {
    const mode = this.selectedAddr ? 'update' : 'add';
    const modelSave = JSON.parse(JSON.stringify(this.beneficiary));
    modelSave.id = this.beneficiary.id;
    modelSave.user_type = 1;
    modelSave.beneficiary_name = this.beneficiary.beneficiary_name;
    modelSave.beneficiary_firstSurname = this.beneficiary.beneficiary_firstSurname;
    modelSave.beneficiary_secondSurname = this.beneficiary.beneficiary_secondSurname;
    modelSave.beneficiary_relationship = this.beneficiary.beneficiary_relationship;
    modelSave.beneficiary_dob = this.beneficiary.beneficiary_dob;
    modelSave.beneficiary_address = this.beneficiary.beneficiary_address;
    modelSave.beneficiary_email = this.beneficiary.beneficiary_email;
    modelSave.beneficiary_phone = this.beneficiary.beneficiary_phone;
    modelSave.curp = this.beneficiary.curp;
    modelSave.fedtax_pay = this.beneficiary.fedtax_pay;
    modelSave.nationality = this.beneficiary.nationality;
    modelSave.marital_status = this.beneficiary.marital_status;
    modelSave.gender = this.beneficiary.gender;
    modelSave.nationality_name = this.beneficiary.nationality_name;
    modelSave.tutor_name = this.beneficiary.tutor.tutor_name,
      modelSave.tutor_firstSurname = this.beneficiary.tutor.tutor_firstSurname,
      modelSave.tutor_secondSurname = this.beneficiary.tutor.tutor_secondSurname,
      modelSave.tutor_relationship = this.beneficiary.tutor.tutor_relationship,
      modelSave.tutor_dob = this.beneficiary.tutor.tutor_dob,
      modelSave.tutor_address = this.beneficiary.tutor.tutor_address,
      modelSave.tutor_phone = this.beneficiary.tutor.tutor_phone,
      modelSave.tutor_email = this.beneficiary.tutor.tutor_email,
      modelSave.tutor_nationality = this.beneficiary.tutor.tutor_nationality,
      modelSave.tutor_nationality_name = this.beneficiary.tutor.tutor_nationality_name
    if (mode === 'add') {
      this.beneficiary_list.push(modelSave);
      this.makeEditBeneficiary();
    } else if (mode === 'update') {
      // Object.assign(this.selectedAddr, modelSave);
      this.beneficiary_list.splice(this.beneficiaryIndex, 1, modelSave);
      this.makeEditBeneficiary();
    }
  }

  makeEditBeneficiary = (): void => {
    // this.beneficiary.id = null;
    this.beneficiary = new Beneficiary();
    this.beneficiary.tutor = new Tutor();
    this.beneficiary.beneficiary_name = '';
    //this.beneficiary.beneficiary_relationship = '';
    this.beneficiary.beneficiary_firstSurname = '';
    this.beneficiary.beneficiary_secondSurname = '';
    this.beneficiary.beneficiary_dob = '';
    this.beneficiary.beneficiary_address = '';
    this.beneficiary.beneficiary_email = '';
    this.beneficiary.beneficiary_phone = '';
    this.beneficiary.tutor.tutor_name = '';
    this.beneficiary.tutor.tutor_firstSurname = '';
    this.beneficiary.tutor.tutor_secondSurname = '';
    //this.beneficiary.tutor.tutor_relationship = '';
    this.beneficiary.tutor.tutor_dob = '';
    this.beneficiary.tutor.tutor_address = '';
    this.beneficiary.tutor.tutor_phone = '';
    this.beneficiary.tutor.tutor_email = '';
    this.selectedAddr = undefined;
    this.age = undefined;
  }

  ageFromDateOfBirthday(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const ynew = today.getFullYear();
    const mnew = today.getMonth();
    const dnew = today.getDate();
    const yold = birthDate.getFullYear();
    const mold = birthDate.getMonth();
    const dold = birthDate.getDate();
    let age = ynew - yold;
    if (mold > mnew) {
      age--;
    }
    else {
      if (mold == mnew) {
        if (dold > dnew) {
          age--;
        }
      }
    }
    this.age = age;
    return age;
  }

  ageFromDateOfBirthday2(dateOfBirth: any): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const ynew = today.getFullYear();
    const mnew = today.getMonth();
    const dnew = today.getDate();
    const yold = birthDate.getFullYear();
    const mold = birthDate.getMonth();
    const dold = birthDate.getDate();
    let age = ynew - yold;
    if (mold > mnew) {
      age--;
    }
    else {
      if (mold == mnew) {
        if (dold > dnew) {
          age--;
        }
      }
    }
    return age;
  }

  // public ageFromDateOfBirthday(dateOfBirth: any): number {
  //   return moment().diff(dateOfBirth, 'years');
  // }


  getBeneficiary = (): void => {
    this.spinner.show();
    this.beneficiary_list;
    // console.log(this.beneficiary_list, "list")
  }

  getAccountTypeText = (bankId: any): any => {
    const data = this.Relationship_list.find((item) => item.id == bankId);
    return (this.language_code == 'en' ? data.name_en : data.name_es);
  }

  editBeneficiary = (beneficiaryDetails: any, index: number): void => {
    this.selectedAddr = beneficiaryDetails;
    this.beneficiary.beneficiary_name = beneficiaryDetails.beneficiary_name;
    this.beneficiary.beneficiary_relationship = beneficiaryDetails.beneficiary_relationship;
    this.beneficiary.beneficiary_firstSurname = beneficiaryDetails.beneficiary_firstSurname;
    this.beneficiary.beneficiary_secondSurname = beneficiaryDetails.beneficiary_secondSurname;
    this.beneficiary.beneficiary_dob = beneficiaryDetails.beneficiary_dob;
    this.beneficiary.beneficiary_address = beneficiaryDetails.beneficiary_address;
    this.beneficiary.beneficiary_email = beneficiaryDetails.beneficiary_email;
    this.beneficiary.beneficiary_phone = beneficiaryDetails.beneficiary_phone;
    this.beneficiary.curp = beneficiaryDetails.curp;
    this.beneficiary.fedtax_pay = beneficiaryDetails.fedtax_pay;
    this.beneficiary.nationality = beneficiaryDetails.nationality;
    this.beneficiary.marital_status = beneficiaryDetails.marital_status;
    this.beneficiary.gender = beneficiaryDetails.gender;
    this.beneficiary.nationality_name = beneficiaryDetails.nationality_name;
    this.beneficiary.tutor.tutor_name = beneficiaryDetails.tutor.tutor_name;
    this.beneficiary.tutor.tutor_firstSurname = beneficiaryDetails.tutor.tutor_firstSurname;
    this.beneficiary.tutor.tutor_secondSurname = beneficiaryDetails.tutor.tutor_secondSurname;
    this.beneficiary.tutor.tutor_relationship = beneficiaryDetails.tutor.tutor_relationship;
    this.beneficiary.tutor.tutor_dob = beneficiaryDetails.tutor.tutor_dob;
    this.beneficiary.tutor.tutor_address = beneficiaryDetails.tutor.tutor_address;
    this.beneficiary.tutor.tutor_phone = beneficiaryDetails.tutor.tutor_phone;
    this.beneficiary.tutor.tutor_email = beneficiaryDetails.tutor.tutor_email;
    this.beneficiary.tutor.tutor_nationality = beneficiaryDetails.tutor.tutor_nationality;
    this.beneficiary.tutor.tutor_nationality_name = beneficiaryDetails.tutor.tutor_nationality_name;
    this.beneficiaryIndex = index;
    beneficiaryDetails.beneficiary_dob ? this.ageFromDateOfBirthday(beneficiaryDetails.beneficiary_dob) : this.age = undefined;
  }

  deleteBeneficiary = (index: number): void => {
    this.beneficiary_list.splice(index, 1);
  }

  add(formData: NgForm) {
    const modelSave: Users = JSON.parse(JSON.stringify(this.model));
    modelSave.gender = this.model.gender ? this.model.gender : 'male';
    modelSave.user_gender = this.model.user_gender ? this.model.user_gender : 'male';
    if (modelSave.legal_representative.phone) {
      modelSave.legal_representative.country_code = modelSave.legal_representative.country_code || this.constant.country_code;
      modelSave.legal_representative.dial_code = modelSave.legal_representative.dial_code || this.constant.dial_code;
    }
    if (modelSave.developer_address && (!modelSave.lat || !modelSave.lng)) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseChooseAddressFromDropdown'), 'error');
      return;
    }
    // if (!modelSave.country_name && !modelSave.state_name && !modelSave.city_name && this.showInput) {
    //   swal(this.translate.instant('swal.error'), this.translate.instant('message.error.pleaseEnterAllCountryStateAndCity'), 'error');
    //   return;
    // }
    if (modelSave.images) {
      modelSave.images = modelSave.images.map(r => r.image);
    }
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

    if (modelSave['legal_representative'] &&
      modelSave['legal_representative']['legal_rep_banks'] && modelSave['legal_representative']['legal_rep_banks'].length > 0) {
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

    modelSave.country_id = this.countryInput == 'other' ? 0 : modelSave.country_id;
    modelSave.state_id = this.stateInput == 'other' ? 0 : modelSave.state_id;
    modelSave.city_id = this.cityInput == 'other' ? 0 : modelSave.city_id;
    //this.model.beneficiary.push(this.beneficiary_list);
    modelSave.beneficiary = this.beneficiary_list
    // modelSave.nationality_id = (modelSave.nationality_id > 0 ) ? modelSave.nationality_id : 0;
    this.spinner.show();
    this.admin.postDataApi('addSeller', modelSave)
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
              this.router.navigate(['/dashboard/users/view-users']);
            } else {
              this.model = success.data;
              this.model.legal_rep_banks = success.data.legal_rep_banks || [];
              this.model.legal_representative = success.data.legal_representative || new LegalRepresentative();
              this.model.legal_representative.legal_rep_banks = success.data.legal_representative.legal_rep_banks || [];
              // this.getCountries();
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

  selectGender(gender) {
    this.model.gender = gender;
  }

  selectGenderUser(user_gender) {
    this.model.user_gender = user_gender;
  }
  isChecked(gender) {
    return gender == this.model.gender ? true : false;

  }
  isCheckedd(user_gender) {
    return user_gender == this.model.user_gender ? true : false;

  }
  isCheckedBeneficiaryGender(gender) {
    return gender == this.beneficiary.gender ? true : false;
  }

  getCountry() {
    let self = this;
    this.parameter.statesAdd = []; this.parameter.citiesAdd = []; this.parameter.localitiesAdd = [];
    this.parameter.buildingsAdd = [];
    this.admin.postDataApi('getCountryLocality-v2', {})
      .subscribe(success => {
        this.parameter.countriesAdd = success.data;
        this.location.countries = '0';
        this.location.states = '0';
        this.location.cities = '0';
        this.showInput = false;
        this.stateInput = undefined;
        this.cityInput = undefined;
        this.model.country_id ? this.getStatesNew1(this.model.country_id) : undefined;
        this.model.state_id ? this.getCitiesNew1(this.model.state_id) : undefined;
      });
  }

  getMarritalStatusList() {
    this.admin.postDataApi('getmaritalStatus', {}).subscribe(r => {
      this.marrital_status_bene = r['data'];
    });
  }

  getMaritalStatus(maritalStatusId) {
    this.model.marital_statuses_id = maritalStatusId;
  }
  getMaritalStatusUser(maritalStatusId) {
    this.model.user_marital_statuses_id = maritalStatusId;
  }
  selectIdType(value) {
    this.model.id_type = value;
  }
  selectIdTypes(value) {
    this.model.user_id_type = value;
  }
  getStatesNew1(countryId) {
    this.parameter.citiesAdd = []; this.parameter.localitiesAdd = []; this.parameter.buildingsAdd = [];
    this.parameter.country_id = countryId;

    if (countryId !== '' && countryId !== '0' && countryId != 'other') {
      this.parameter.countriesAdd.filter(country => {
        if (country.id == countryId) {
          this.parameter.statesAdd = country.states;
          this.showInput = false;
          this.location.countries = countryId;
          this.model.country_id = countryId;
          this.location.states = '0';
          this.location.cities = '0';
          this.location.localities = '0';
          this.stateInput = undefined;
          this.cityInput = undefined;
        }
      });
    } else {
      if (countryId == 'other') {
        this.countryInput = countryId;
        this.showInput = true;
        this.model.country_name = undefined;
        this.model.state_name = undefined;
        this.model.city_name = undefined;
        this.stateInput = null;
        this.cityInput = null;
        this.stateDisable = true;
        this.cityDisable = true;
      }
      else {
        this.countryInput = countryId;
        this.showInput = false;
        this.parameter.statesAdd = [];
        this.location.countries = countryId;
        this.model.country_id = countryId;
        this.location.states = '0';
        this.location.cities = '0';
      }
    }
  }

  getCitiesNew1(state_id) {

    this.parameter.localitiesAdd = [];
    this.parameter.state_id = state_id;

    if (state_id !== '' && state_id !== '0' && state_id != 'other') {
      this.parameter.statesAdd.filter(state => {
        if (state.id == state_id) {
          this.parameter.citiesAdd = state.cities;
          this.location.states = state_id;
          this.model.state_id = state_id;
          this.location.cities = this.model.city_id;
          this.model.city_name = undefined;
        }
      });
    } else {
      if (state_id == 'other') {
        this.stateInput = state_id;
        this.model.state_name = undefined;
        this.model.city_name = undefined;
        this.stateDisable = false;
      }
      else {
        this.stateInput = state_id;
        this.parameter.citiesAdd = [];
        this.location.states = state_id;
        this.model.state_id = state_id;
        this.location.cities = '0';
      }
    }
  }

  getLocalitiesNew(city_id) {
    this.parameter.city_id = city_id;
    this.model.city_id = city_id;
    this.location.cities = city_id;

    if (city_id === '' || city_id === '0' && city_id != 'other') {
      return false;
    }
    else {
      this.cityDisable = city_id == 'other' ? false : true;;
      this.cityInput = city_id;
    }
  }

  modelChanged() {
    if ((!this.model.country_name || this.model.country_name == "") && this.countryInput != 'other') {
      this.stateDisable = this.stateInput != 'other' ? true : false;
      this.cityDisable = this.cityInput != 'other' ? true : false;
      //this.model.state_name = undefined;
      //this.model.city_name = undefined;
    }
    else if (this.model.country_name && !this.model.state_name) {
      this.stateDisable = false;
    }
    else if (this.model.country_name && this.model.state_name) {
      this.cityDisable = false;
    }
  }

  getCounrtyByZipcode = (isTaxAddress: boolean): void => {
    if (isTaxAddress ? ((this.model.tax_zipcode || '0').toString()).length >= 5 : ((this.model.zipcode || '0').toString()).length >= 5) {
      this.spinner.show();
      this.admin.postDataApi('getZipcodeinfo', { zip_code: isTaxAddress ? this.model.tax_zipcode : this.model.zipcode }).
        subscribe((success) => {
          this.spinner.hide();
          let data = success.data.trim();
          success.data = JSON.parse(data);
          if (isTaxAddress) {
            this.model.municipality = ((success.data || [])[0] || {}).Municipio || ''; // Municipality
            this.model.state = ((success.data || [])[0] || {}).Entidad || ''; // State
            this.model.city = ((success.data || [])[0] || {}).Ciudad || ''; // city
            this.model.country = this.model.state || this.model.city || this.model.country ? 'Mexico' : ''; // Country
            const tempNeighbourhoods = [];
            if (!(success.data || {}).error) {
              (success.data || []).forEach((data) => { tempNeighbourhoods.push(data.Colonia); });
            }
            this.model.tax_neighbourhoods = tempNeighbourhoods; //((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
            this.model.tax_neighbourhood = (this.model.tax_neighbourhoods || [])[0] || '';
          } else {
            this.model.municipality = ((success.data || [])[0] || {}).Municipio || ''; // Municipality
            this.model.state = ((success.data || [])[0] || {}).Entidad || ''; // State
            this.model.city = ((success.data || [])[0] || {}).Ciudad || ''; // city
            this.model.country = this.model.state || this.model.city || this.model.country ? 'Mexico' : ''; // Country
            const tempNeighbourhoods = [];
            if (!(success.data || {}).error) {
              (success.data || []).forEach((data) => { tempNeighbourhoods.push(data.Colonia); });
            }
            this.model.neighbourhoods = tempNeighbourhoods; //((success.data || {}).response || {}).asentamiento || []; // settlement or neighbourhoods
            this.model.neighborhood = (this.model.neighbourhoods || [])[0] || '';
            this.onClickUseUserSameAddress();
          }
        }, (error) => {
          this.spinner.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
    } else {
      if (isTaxAddress) {
        this.model.tax_municipality = '';
        this.model.tax_state = '';
        this.model.tax_city = '';
        this.model.tax_country = '';
        this.model.tax_neighbourhoods = [];
        this.model.tax_neighbourhood = '';
      } else {
        this.model.municipality = '';
        this.model.state = '';
        this.model.city = '';
        this.model.country = '';
        this.model.neighbourhoods = [];
        this.model.neighborhood = '';
        this.onClickUseUserSameAddress();
      }
    }
  }

  onClickUseUserSameAddress = (): void => {
    if (this.model.use_user_same_address) {
      this.model.tax_street_address = this.model.street_address;
      this.model.tax_external_number = this.model.external_number;
      this.model.tax_internal_number = (this.model.internal_number || '').toString();
      this.model.tax_zipcode = this.model.zipcode;
      this.model.tax_municipality = this.model.municipality;
      this.model.tax_country = this.model.country;
      this.model.tax_state = this.model.state;
      this.model.tax_city = this.model.city;
      this.model.tax_neighbourhood = this.model.neighborhood;
      this.model.tax_neighbourhoods = this.model.neighbourhoods;
    }
  }

  getNationality = (): void => {
    this.spinner.show();
    this.admin.postDataApi('getNationality', {}).subscribe((success) => {
      this.spinner.hide();
      this.nationalityDetails = success.data || [];
      this.nationalityDetails.push({ id: 0, name: 'Other' });
    }, (error) => {
      this.spinner.hide();
    });
  }

  updateNationalityName = (value: string): void => {
    if (parseInt(value) > 0) {
      this.model.nationality_name = '';
    }
  }

  updateBeneficiaryNationalityName = (value: string): void => {
    if (parseInt(value) > 0) {
      this.beneficiary.nationality_name = '';
    }
  }

  updateTutorNationalityName = (value: string): void => {
    if (parseInt(value) > 0) {
      this.beneficiary.tutor.tutor_nationality_name = '';
    }
  }

  assignedObject = (): void => {
    if (!this.beneficiary.tutor) {
      this.beneficiary.tutor = new Tutor();
    }
  }

  hasErrorBeneficiary = (): boolean => {
    if (!this.beneficiary.beneficiary_name) {
      return true;
    } else if (this.age < 18) {
      if (!this.beneficiary.tutor.tutor_name) {
        return true;
      }
    }
    return false;
  }

  getBeneficiaryText = (beneficiaryDetails: any): any => {
    if (
      beneficiaryDetails.beneficiary_name &&
      beneficiaryDetails.beneficiary_firstSurname &&
      beneficiaryDetails.beneficiary_secondSurname
    ) {
      return (beneficiaryDetails.beneficiary_name + ' ' + beneficiaryDetails.beneficiary_firstSurname + ' ' + beneficiaryDetails.beneficiary_secondSurname);
    } else if (
      beneficiaryDetails.beneficiary_name &&
      beneficiaryDetails.beneficiary_firstSurname
    ) {
      return (beneficiaryDetails.beneficiary_name + ' ' + beneficiaryDetails.beneficiary_firstSurname);
    } else if (
      beneficiaryDetails.beneficiary_name &&
      beneficiaryDetails.beneficiary_secondSurname
    ) {
      return (beneficiaryDetails.beneficiary_name + ' ' + beneficiaryDetails.beneficiary_secondSurname);
    } else {
      return beneficiaryDetails.beneficiary_name;
    }
  }

  getTutorText = (tutorDetails: any): any => {
    if (
      tutorDetails.tutor.tutor_name &&
      tutorDetails.tutor.tutor_firstSurname &&
      tutorDetails.tutor.tutor_secondSurname
    ) {
      return (tutorDetails.tutor.tutor_name + ' ' + tutorDetails.tutor.tutor_firstSurname + ' ' + tutorDetails.tutor.tutor_secondSurname);
    } else if (
      tutorDetails.tutor.tutor_name &&
      tutorDetails.tutor.tutor_firstSurname
    ) {
      return (tutorDetails.tutor.tutor_name + ' ' + tutorDetails.tutor.tutor_firstSurname);
    } else if (
      tutorDetails.tutor.tutor_name &&
      tutorDetails.tutor.tutor_secondSurname
    ) {
      return (tutorDetails.tutor.tutor_name + ' ' + tutorDetails.tutor.tutor_secondSurname);
    } else {
      return tutorDetails.tutor.tutor_name;
    }
  }


  getStates() {
    this.admin.postDataApi('country/getStates', {country_id: 9}).subscribe(success => {
      this.parameter.states = success['data'];
    });
  }
  
  selectState(value){
   this.model.state_code_id = value;
  }

  selecTaxtState(value){
    this.model.state_tax_code_id = value;
  }
}

