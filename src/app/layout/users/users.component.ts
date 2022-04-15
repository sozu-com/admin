import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users.model';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ExcelDownload } from 'src/app/common/excelDownload';
declare let swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [Users, Constant]
})

export class UsersComponent implements OnInit {
  @ViewChild('openCreditModel') openCreditModel: ElementRef;
  @ViewChild('closeCreditModel') closeCreditModel: ElementRef;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('entityModalOpen') entityModalOpen: ElementRef;
  @ViewChild('entityModalClose') entityModalClose: ElementRef;

  obj: any;
  developer_image: any;
  image: any;
  public parameter: IProperty = {};
  initialCountry: any;
  local_storage_parameter: any; is_back: boolean;
  private language_code: string;
  private exportfinalData: any[] = [];
  quotes = [
    { id: 1, name_en: 'INFONAVIT', name_es: 'INFONAVIT' },
    { id: 2, name_en: 'FOVISSSTE', name_es: 'FOVISSSTE' },
    { id: 3, name_en: 'NONE', name_es: 'NINGUNO' }
  ];
  quote: any;
  fullName: any;
  email: any;
  phone: any;
  country_code: any;
  dial_code: string;
  first_surname: any;
  second_surname: any;
  full_name: any;
  user_id: any;
  constructor(public constant: Constant, public model: Users, public admin: AdminService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.language_code = localStorage.getItem('language_code');
    this.parameter.property_sort = 2;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.type = 1;
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.local_storage_parameter = JSON.parse(localStorage.getItem('parametersForUSer'));
    this.parameter = this.local_storage_parameter && this.is_back ? this.local_storage_parameter : this.parameter;
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.parameter.name = params['name'];
      }
    });
    this.getBuyers(this.parameter.type, this.parameter.page, '', '', '', '', '');
  }

  telInputObject(obj) {
    this.obj = obj;
  }

  openModal() {
    this.model = new Users();
    this.image = '';
    this.developer_image = '';
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.model = new Users();
    this.image = '';
    this.developer_image = '';
    this.modalClose.nativeElement.click();
  }

  closeEntityModal() {
    this.model = new Users();
    this.image = '';
    this.developer_image = '';
    this.entityModalClose.nativeElement.click();
  }

  sendMail = (data: any, active_role): void => {
    swal({
      html:
        this.translate.instant('message.error.areYouSure') +
        '<br>' +
        this.translate.instant(
          'message.error.youWantToSendEmail',
        ),
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.admin.postDataApi('verifedEmail', {
          id: (data || {}).id, is_language: this.language_code == 'en' ? 1 : 2, email_date: moment.utc(new Date()).toDate(), active_role: active_role
        }).subscribe((success) => {
          this.spinner.hide();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.emailSent'), 'success');
        }, (error) => {
          this.spinner.hide();
          swal(this.translate.instant('swal.error'), error.error.message, 'error');
        });
      }
    });
  }
  getPage(page) {
    this.parameter.page = page;
    this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email,
      this.parameter.first_surname, this.parameter.second_surname);
  }

  sortData(value: number, param: string) {
    this.parameter.property_sort = value;
    this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email,
      this.parameter.first_surname, this.parameter.second_surname);
  }

  setUserType(is_credit: any) {
    if (is_credit == 2) {
      this.parameter.is_credit = 1
    } else {
      this.parameter.is_credit = '';
    }
    this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email,
      this.parameter.first_surname, this.parameter.second_surname);
  }

  getBuyers(type: any, page: any, name: string, phone: string, email: string, first_surname: string, second_surname: string) {
    this.parameter.page = page;
    this.parameter.type = type;
    if (this.parameter['name']) {
      this.parameter.name = this.parameter['name'];
    } else {
      this.parameter.name = name;
    }

    this.parameter.phone = phone;
    this.parameter.email = email;
    this.parameter.first_surname = first_surname;
    this.parameter.second_surname = second_surname;
    this.parameter.url = this.parameter.type === 1 ? 'getBuyers' : 'getSellers';
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, this.parameter)
      .subscribe(
        success => {
          localStorage.setItem('parametersForUSer', JSON.stringify(this.parameter));
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }


  changeListner(event, type: number) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal(this.translate.instant('swal.error'), this.translate.instant('message.error.fileSizeExceeds'), 'error');
      return false;
    }
    if (type === 1) {
      this.model.image = event.target.files[0];
    } else {
      this.model.developer_image = event.target.files[0];
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (type === 1) {
        this.image = e.target.result;
      } else {
        this.developer_image = e.target.result;
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  addNewUser(formdata: NgForm) {
    this.parameter.url = 'addSeller';

    const input = new FormData();
    // dont send model, cuz need to send file
    if (this.model.id) { input.append('id', this.model.id); }
    input.append('name', this.model.name);
    input.append('country_code', this.model.country_code);
    input.append('dial_code', this.model.dial_code);
    input.append('phone', this.model.phone);
    input.append('email', this.model.email);
    input.append('first_surname', this.model.first_surname);
    input.append('second_surname', this.model.second_surname);
    if (this.model.image) { input.append('image', this.model.image); }
    if (this.model.developer_image) { input.append('developer_image', this.model.developer_image); }
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.modalClose.nativeElement.click();
          const text = this.model.id ?
            this.translate.instant('message.success.updatedSuccessfully') :
            this.translate.instant('message.success.addedSuccessfully');
          swal(this.translate.instant('swal.success'), text, 'success');
          if (this.model.id) {
            this.parameter.items[this.parameter.index] = success.data;
          } else if (this.parameter.items.length < 10 && !this.model.id) {
            this.parameter.items.push(success.data);
            this.parameter.total++;
          }
          formdata.reset();
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(userdata, index) {
    this.router.navigate(['/dashboard/users/edit-user', userdata.id]);
    // this.parameter.index = index;
    // this.model = userdata;
    // this.image = userdata.image;
    // this.developer_image = userdata.developer_image;
    // this.model.image = userdata.image != null ? userdata.image : '';
    // this.model.developer_image = userdata.developer_image != null ? userdata.developer_image : '';
    // if (this.obj) {
    //   this.obj.intlTelInput('setCountry', this.model.country_code);
    // }
    // this.modalOpen.nativeElement.click();
  }

  addLegalEntity(userdata: any, index: number) {
    this.parameter.index = index;
    this.model = userdata;
    this.image = userdata.image;
    this.developer_image = userdata.developer_image;
    this.model.image = userdata.image != null ? userdata.image : '';
    this.model.developer_image = userdata.developer_image != null ? userdata.developer_image : '';
    this.entityModalOpen.nativeElement.click();
  }


  blockUnblockPopup(index: number, id: string, flag: any, user_type: string) {
    this.parameter.index = index;
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.error.wantToUnblockUser');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.error.wantToBlockUser');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
        break;
    }

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index: number, id: string, flag: string, user_type: string) {
    this.parameter.index = index;
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi('blockBuyerSeller', input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index]['is_blocked'] = flag;
        });
  }


  deletePopup(index: number, id: string, user_type: string) {
    this.parameter.index = index;
    this.parameter.text = this.translate.instant('message.error.wantToDeleteUser');

    swal({
      html: this.translate.instant('message.error.areYouSure') + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteBuyerSeller(index, id, user_type);
      }
    });
  }

  deleteBuyerSeller(index: number, id: string, user_type: string) {
    this.parameter.index = index;
    const input = new FormData();
    input.append('id', id);
    input.append('user_type', user_type);

    this.admin.postDataApi('deleteBuyerSeller', input)
      .subscribe(
        success => {
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.deletedSuccessfully'), 'success');
          this.parameter.items.splice(index, 1);
        });
  }

  getExportlisting = (): void => {
    this.spinner.show();
    const input: any = JSON.parse(JSON.stringify(this.parameter));
    input.page = 0;
    this.admin.postDataApi('getBuyers', input).subscribe((success) => {
      this.exportfinalData = success['data'] || [];
      this.exportData();
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
    });
  }

  exportData = (): void => {
    if (this.exportfinalData.length > 0) {
      const exportfinalData = [];
      for (let index = 0; index < this.exportfinalData.length; index++) {
        const p = this.exportfinalData[index];

        exportfinalData.push({
          'Complete Name': p.name ? p.name + ' ' + p.first_surname + ' ' + p.second_surname : '',
          'Contact Number': p.phone ? p.dial_code + ' ' + p.phone : '',
          'Email Address': p.email || '',
          'Registered In Sozu (Yes/No)': p.is_email_verified && p.is_phone_verified ? 'Yes' : 'No'
        });
      }
      new ExcelDownload().exportAsExcelFile(exportfinalData, 'users');
    }
  }

  sort_by() {
    this.parameter.sort_by = this.parameter.sort_by_order ? 0 : 1;
    this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email,
      this.parameter.first_surname, this.parameter.second_surname);
  }
  addCredit(p) {
    this.user_id = p.id;
    this.openCreditModel.nativeElement.click();
  }
  onClickAddCredit() {
    let input = {
      user_id: this.user_id,
      name: this.full_name,
      first_surname: this.first_surname,
      second_surname: this.second_surname,
      email: this.email,
      phone: this.phone,
      country_code: this.constant.country_code,
      dial_code: this.constant.dial_code
    }
    this.spinner.show();
    this.admin.postDataApi('generateleadFromUser', input).subscribe(
      success => {
        this.closeCreditModel.nativeElement.click();
        this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email,
          this.parameter.first_surname, this.parameter.second_surname);
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
      });
  }
}
