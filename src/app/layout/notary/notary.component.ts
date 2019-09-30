import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { CommonService } from 'src/app/services/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.css']
})
export class NotaryComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  public parameter: IProperty = {};
  obj: any;
  initialCountry: any;
  downloadLink: string;
  label: string;
  model: Users;
  items: Array<Users>;
  constructor(public constant: Constant,
    private spinner: NgxSpinnerService,
    public admin: AdminService,
    public cs: CommonService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.model = new Users();
    this.label = this.translate.instant('table.title.chooseNotariesFile');
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.type = 1;
    this.parameter.lead_sort = 2;
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.getNoatariesListing(this.parameter.page, '', '', '', '');
  }

  telInputObject(obj) {
    this.obj = obj;
  }

  closeModal() {
    this.model = new Users();
    this.modalClose.nativeElement.click();
  }

  openModal() {
    this.model = new Users();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.modalOpen.nativeElement.click();
  }

  getPage(page: any) {
    this.parameter.page = page;
    this.getNoatariesListing(this.parameter.page, this.parameter.company_name,
      this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getNoatariesListing(page: any, company_name: string, name: string, phone: string, email: string) {
    this.spinner.show();
    this.parameter.page = page;
    this.parameter.name = name;
    this.parameter.company_name = company_name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.admin.postDataApi('getNoatariesListing', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }

  setLeadSort() {
    this.parameter.lead_sort = this.parameter.lead_sort === 2 ? 1 : 2;
    this.getNoatariesListing(this.parameter.page, this.parameter.company_name, this.parameter.name,
      this.parameter.phone, this.parameter.email);
  }

  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.translate.instant('message.fileSizeLimit'), 'error');
      return false;
    }
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

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = { initialCountry: e.iso2 };
  }

  importNoatary() {
    const file = this.fileInput.nativeElement;
    let attachment: File;
    if (file.files && file.files[0]) {
      attachment = file.files[0];
      if (attachment.size > this.constant.fileSizeLimit) {
        swal('Error', this.translate.instant('message.fileSizeLimit'), 'error');
        return false;
      }
      this.spinner.show();
      const input = new FormData();
      input.append('attachment', attachment);
      this.admin.postDataApi('importNoatary', input)
        .subscribe(
          success => {
            this.spinner.hide();
            this.fileInput.nativeElement.value = '';
            this.label = this.translate.instant('table.title.chooseNotariesFile');
            swal('Success', this.translate.instant('message.importedSuccessfully'), 'success');
            this.getNoatariesListing(this.parameter.page, '', '', '', '');
          }, error => {
            this.spinner.hide();
          });
    } else {
      swal('Error', this.translate.instant('message.pleaseChooseFile'), 'error');
      return false;
    }
  }

  addNewUser(formData: NgForm) {
    if (this.model.img_loader) {
      swal('Error', this.translate.instant('message.uploadingImage'), 'error');
      return false;
    }
    this.model.img_loader = false;
    this.spinner.show();
    this.admin.postDataApi('addNoatary', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          this.modalClose.nativeElement.click();
          const text = this.model.id ? this.translate.instant('message.updatedSuccessfully') :
                                        this.translate.instant('message.addedSuccessfully');
          swal('Success', text, 'success');
          if (this.model.id) {
            this.items[this.parameter.index] = success.data;
          } else {
            if (this.items.length < 10) {
              this.items.push(success.data);
            }
            this.parameter.total++;
          }
          this.model = new Users();
          formData.reset();
        }, error => {
          this.spinner.hide();
        });
  }

  editUser(userdata: Users, index: any) {
    this.model = JSON.parse(JSON.stringify(userdata));
    this.model.img_loader = false;
    this.parameter.index = index;
    if (this.obj) {
      this.obj.intlTelInput('setCountry', this.model.country_code ? this.model.country_code : this.constant.country_code);
    }
    this.modalOpen.nativeElement.click();
  }

  blockUnblockPopup(index, id, flag) {
    this.parameter.index = index;
    this.parameter.title = this.translate.instant('message.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.wantToUnblockNotary');
        this.parameter.successText = this.translate.instant('message.unblockedSuccessfully');
        break;
      case 1:
      this.parameter.text = this.translate.instant('message.wantToBlockNotary');
        this.parameter.successText = this.translate.instant('message.blockedSuccessfully');
        break;
    }

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockNoatary(index, id, flag);
      }
    });
  }

  blockNoatary(index: any, id: string, flag: any) {
    this.parameter.index = index;
    this.admin.postDataApi('blockNoatary', { id: id, flag: flag })
      .subscribe(
        success => {
          swal('Success', this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
          // this.items[this.parameter.index] = success.data;
        });
  }

  getFileName() {
    const fi = this.fileInput.nativeElement;
    const uploadedFile = fi.files[0];
    this.label = uploadedFile.name;
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.areYouSure');
    this.parameter.text = this.translate.instant('message.wantToDeleteNotary');

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteNoatary(item, index);
      }
    });
  }

  deleteNoatary(item: any, index: number) {
    this.admin.postDataApi('deleteNoatary',
      { id: item.id }).subscribe(r => {
        swal('Success', this.translate.instant('message.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
        this.parameter.total--;
      },
        error => {
          swal('Error', error.error.message, 'error');
        });
  }
}
