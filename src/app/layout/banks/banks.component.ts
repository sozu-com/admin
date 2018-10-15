import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Bank } from './../../models/bank.model';
import { Constant } from './../../common/constants';
declare let swal: any;

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css'],
  providers: [Bank]
})

export class BanksComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;

  constructor(public constant: Constant, public model: Bank, public admin: AdminService) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.model.id = '';
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
    console.log(this.model);
    this.modalOpen.nativeElement.click();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getBanks(this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getBanks(page, name, phone, email) {

    this.parameter.page = page;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.admin.postDataApi('getBanksListing', this.parameter)
      .subscribe(
        success => {
          this.parameter.items = success.data;
          this.parameter.total = success.total_count;
        });
  }


  changeListner(event) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
        // this.model.image = e.target.result;
    };
    const input = new FormData();
    input.append('image', event.target.files[0]);
    this.admin.postDataApi('saveImage', input).subscribe(res => {this.model.image = res['data'].image; });
    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  addBank() {
    this.admin.postDataApi('addBank', this.model)
      .subscribe(
        success => {
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          }else {
            this.modalClose.nativeElement.click();
            const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
            swal('Success', text, 'success');
            if (this.parameter.items.length < 10) {
              if (this.model.id) {
                this.parameter.items[this.parameter.index] = success.data;
                this.model = new Bank();
              } else {
                this.parameter.items.push(success.data);
                this.parameter.total++;
                this.model = new Bank();
              }
            }
          }
        });
  }


  editUser(userdata, index) {
    this.model = JSON.parse(JSON.stringify(userdata));
    console.log(this.model);
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
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.blockNoatary(index, id, flag);
      }
    });
  }


  blockNoatary(index, id, flag) {
    this.parameter.index = index;
    this.admin.postDataApi('blockNoatary', {id: id, flag: flag})
      .subscribe(
        success => {
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }
}
