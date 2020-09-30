import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { CommonService } from 'src/app/services/common.service';
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

  constructor(
    public constant: Constant,
    private cs: CommonService,
    private admin: AdminService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
    this.initialCountry = {initialCountry: this.constant.country_code};
      this.parameter.sub = this.route.params.subscribe(params => {
        if (params['id'] !== '0') {
          this.model.id = params['id'];
          this.getLegalEntityById(this.model.id);
        } else {
          this.model.id = '';
        }
      });
      this.getCurrencies();
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
      address: ['', [Validators.required]],
      // fed_tax_pay: ['', [Validators.required]],
      fed_tax_pay: [''],
      legal_entity_banks: this.fb.array([]),
      developer_id: [''],
      legal_rep: this.fb.group({
        id: [''],
        name: ['', [Validators.required]],
        first_surname: ['', [Validators.required]],
        second_surname: [''],
        phone: ['', [Validators.required]],
        country_code: ['', [Validators.required]],
        dial_code: ['', [Validators.required]],
        email: ['', [Validators.required]],
        // fed_tax_pay: ['', [Validators.required]],
        fed_tax_pay: [''],
        legal_rep_banks: this.fb.array([])
      })
    });

    const countryDialCode = {
      country_code: this.model.country_code,
      dial_code: this.model.dial_code
    };
    this.addDataForm.controls.country_code.patchValue(this.model.country_code);
    this.addDataForm.controls.dial_code.patchValue(this.model.dial_code);
    this.addDataForm.patchValue({legal_rep: countryDialCode});
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

  removeLegalEntityBank($event: Event, i: number) {
    $event.stopPropagation();
    this.legalEntityBanks.removeAt(i);
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

  getLegalEntityById(id: string) {
    this.spinner.show();
    this.admin.postDataApi('getLegalEntityById', {id: id})
    .subscribe(
      success => {
        this.spinner.hide();
        // this.model = success.data;
        this.patchForm(success.data);
      }, error => {
        this.spinner.hide();
      });
  }


  patchForm(data) {
    this.addDataForm.patchValue(data);
    const control = this.addDataForm.get('legal_entity_banks') as FormArray;
    if (data.legal_entity_banks) {
      data.legal_entity_banks.forEach(x => {
        control.push(this.fb.group(x));
      });
    }
    this.addDataForm.patchValue({legal_rep: data.legal_reps});
    const repBanks = this.addDataForm.get('legal_rep').get('legal_rep_banks') as FormArray;
    if (data.legal_reps && data.legal_reps.legal_rep_banks) {
      data.legal_reps.legal_rep_banks.forEach(x => {
        repBanks.push(this.fb.group(x));
      });
    }
  }


  set() {
    this.show = true;
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  add(formData: NgForm) {
    // const modelSave: LegalEntity = JSON.parse(JSON.stringify(this.model));
    formData['country_code'] = this.model.country_code;
    formData['dial_code'] = this.model.dial_code;
    formData['legal_rep']['country_code'] = this.model.country_code;
    formData['legal_rep']['dial_code'] = this.model.dial_code;
    if (this.model.id) {
      formData['id'] = this.model.id;
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
            if (this.model.id === '') {
              formData.reset();
            }
          }
        }, error => {
          this.spinner.hide();
        });
  }

}
