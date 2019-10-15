import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Bank } from 'src/app/models/bank.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})

export class BanksComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  obj: any;
  initialCountry: any;
  model: Bank;
  items: Array<Bank>;
  constructor(public constant: Constant,
    public admin: AdminService,
    private spinner: NgxSpinnerService,
    public cs: CommonService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.model = new Bank();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.lead_sort = 2;
    this.initialCountry = { initialCountry: this.constant.country_code };
    this.getBanks(this.parameter.page, '', '', '');
  }

  telInputObject(obj) {
    this.obj = obj;
  }

  closeModal() {
    this.model = new Bank();
    this.modalClose.nativeElement.click();
  }

  openModal() {
    this.model = new Bank();
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.modalOpen.nativeElement.click();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getBanks(this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getBanks(page, name, phone, email) {
    this.spinner.show();
    this.parameter.page = page;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.admin.postDataApi('getBanksListing', this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.spinner.hide();
        });
  }

  setLeadSort() {
    this.parameter.lead_sort = this.parameter.lead_sort === 2 ? 1 : 2;
    this.getBanks(this.parameter.page, this.parameter.name,
      this.parameter.phone, this.parameter.email);
  }


  changeListner(event: any, paramLoader: string, param: any) {
    if (event.target.files[0].size > this.constant.fileSizeLimit) {
      swal('Error', this.translate.instant('message.error.fileSizeExceeds'), 'error');
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

  addBank(formData: NgForm) {
    if (this.model.img_loader) {
      swal('Error', this.translate.instant('message.error.uploadingImage'), 'error');
      return false;
    }
    this.spinner.show();
    this.admin.postDataApi('addBank', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          } else {
            this.modalClose.nativeElement.click();
            const text = this.model.id ? this.translate.instant('message.success.updatedSuccessfully') :
                                        this.translate.instant('message.success.addedSuccessfully');
            swal('Success', text, 'success');
            if (this.model.id) {
              this.items[this.parameter.index] = success.data;
            } else {
              if (this.items.length < 10) {
                this.items.push(success.data);
                this.parameter.total++;
              }
            }
            formData.reset();
            this.model = new Bank();
          }
        }, error => {
          this.spinner.hide();
        });
  }


  editUser(userdata: Bank, index: any) {
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
    this.parameter.title = this.translate.instant('message.question.areYouSure');
    switch (flag) {
      case 0:
        this.parameter.text = this.translate.instant('message.question.wantToUnblockBank');
        this.parameter.successText = this.translate.instant('message.success.unblockedSuccessfully');
        break;
      case 1:
        this.parameter.text = this.translate.instant('message.question.wantToBlockBank');
        this.parameter.successText = this.translate.instant('message.success.blockedSuccessfully');
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


  blockNoatary(index, id, flag) {
    this.parameter.index = index;
    this.spinner.show();
    this.admin.postDataApi('blockNoatary', { id: id, flag: flag })
      .subscribe(
        success => {
          this.spinner.hide();
          swal('Success', this.parameter.successText, 'success');
          this.items[this.parameter.index]['is_blocked'] = flag;
        }, error => {
          this.spinner.hide();
        });
  }

  deletePopup(item: any, index: number) {
    this.parameter.title = this.translate.instant('message.question.areYouSure');
    this.parameter.text = this.translate.instant('message.question.wantToDeleteBank');

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.deleteBank(item, index);
      }
    });
  }

  deleteBank(item: any, index: number) {
    this.admin.postDataApi('deleteBank',
      { bank_id: item.id }).subscribe(r => {
        swal('Success', this.translate.instant('message.success.deletedSuccessfully'), 'success');
        this.items.splice(index, 1);
        this.parameter.total--;
      },
        error => {
          swal('Error', error.error.message, 'error');
        });
  }
}
