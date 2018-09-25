import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Bank } from './../../models/bank.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';
declare let swal: any;

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css'],
  providers: [Bank]
})

export class BanksComponent implements OnInit {

  url: any[];
  image1;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;

  constructor(public constant: Constant, public model: Bank,
    public admin: AdminService,
    public sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.model.id = '';
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.getBanks(this.parameter.p, '', '', '');
  }

  closeModal() {
    this.model = new Bank;
    this.modalClose.nativeElement.click();
  }

  getPage(page) {
    this.parameter.p = page;
    this.getBanks(this.parameter.p, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getBanks(page, name, phone, email) {

    this.parameter.p = page;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.parameter.url = 'getBanks';

    const input = new FormData();
    input.append('page', this.parameter.p.toString());

    if (this.parameter.name) {input.append('name', this.parameter.name); }

    if (this.parameter.phone) {input.append('phone', this.parameter.phone); }

    if (this.parameter.email) {input.append('email', this.parameter.email); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        });
  }


  changeListner(event) {

    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;
    const reader = new FileReader();
    reader.onload = (e: any) => {
        this.url = e.target.result;
        this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.url})`);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  addBank(formdata: NgForm) {
    this.parameter.url = this.model.id !== '' ? 'updateNewUser' : 'addBank';
    this.model.dial_code = '+' + this.model.dial_code;
    this.model.interests = JSON.stringify(this.model.interestsArray);
    this.admin.postDataApi(this.parameter.url, this.model)
      .subscribe(
        success => {
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          }else {
            this.modalClose.nativeElement.click();
            formdata.reset();
            const text = this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
            swal('Success', text, 'success');
            if (this.parameter.items.length < 10) {
              if (this.model.id !== '') {
                this.parameter.items[this.parameter.index] = success.data;
              } else {
                this.parameter.items.push(success.data);
              }
            }
          }
        });
  }


  editUser(userdata, index) {
    this.parameter.index = index;
    this.modalOpen.nativeElement.click();
    this.model.id = userdata.id;
    this.model.name = userdata.name;
    this.model.email = userdata.email;
    this.model.phone = userdata.phone;
    this.model.country_code = userdata.country_code ? userdata.country_code : this.constant.country_code;
    this.model.dial_code = userdata.dial_code ? userdata.dial_code : this.constant.dial_code;

    const d = {
      areaCodes: null,
      dialCode: '91',
      iso2: userdata.country_code,
      priority: 0
    };

    this.onCountryChange(d);

    this.initialCountry = {initialCountry: userdata.country_code};

    this.model.image = userdata.image != null ? userdata.image : '';
    if (this.model.image) {
      this.image1 = this.sanitization.bypassSecurityTrustStyle(`url(${this.model.image})`);
    }
  }


  blockUnblockPopup(index, id, flag, user_type) {
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
      // title: this.parameter.title,
      // text: this.parameter.text,
      html: this.parameter.title + '<br>' + this.parameter.text,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockAdmin(index, id, flag, user_type);
      }
    });
  }


  blockAdmin(index, id, flag, user_type) {
    // this.parameter.loading = true;
    this.parameter.index = index;
    this.parameter.url = 'blockBuyerSeller';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }
}
