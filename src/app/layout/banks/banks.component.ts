import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { AdminService } from '../../services/admin.service';
// import { IProperty } from '../../common/property';
// import { Bank } from './../../models/bank.model';
// import { Constant } from './../../common/constants';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Bank } from 'src/app/models/bank.model';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import { AdminService } from 'src/app/services/admin.service';
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
  initialCountry: any;
  model: Bank;
  items: Array<Bank>;
  constructor(public constant: Constant,
    public admin: AdminService,
    public cs: CommonService) { }

  ngOnInit() {
    this.model = new Bank();
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.getBanks(this.parameter.page, '', '', '');
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
    this.parameter.loading = true;
    this.parameter.page = page;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.admin.postDataApi('getBanksListing', this.parameter)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.items = success.data;
          this.parameter.total = success.total_count;
        }, error => {
          this.parameter.loading = false;
        });
  }


  changeListner(event: any, paramLoader: string, param: any) {
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
    this.initialCountry = {initialCountry: e.iso2};
  }

  addBank(formData: NgForm) {
    if (this.model.img_loader) {
      swal('Error', 'Uploading image.', 'error');
      return false;
    }
    this.parameter.loading = true;
    this.admin.postDataApi('addBank', this.model)
      .subscribe(
        success => {
          this.parameter.loading = false;
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          } else {
            this.modalClose.nativeElement.click();
            const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
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
          this.parameter.loading = false;
        });
  }


  editUser(userdata: Bank, index: any) {
    this.model = JSON.parse(JSON.stringify(userdata));
    this.model.img_loader = false;
    this.parameter.index = index;
    this.modalOpen.nativeElement.click();
  }


  blockUnblockPopup(index, id, flag) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    switch (flag) {
      case 0:
        this.parameter.text = this.constant.title.UNBLOCK_USER;
        this.parameter.successText = this.constant.successMsg.UNBLOCKED_SUCCESSFULLY;
        break;
      case 1:
        this.parameter.text = this.constant.title.BLOCK_USER;
        this.parameter.successText = this.constant.successMsg.BLOCKED_SUCCESSFULLY;
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
    this.parameter.loading = true;
    this.admin.postDataApi('blockNoatary', {id: id, flag: flag})
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal('Success', this.parameter.successText, 'success');
          this.items[this.parameter.index] = success.data;
        }, error => {
          this.parameter.loading = false;
        });
  }
}
