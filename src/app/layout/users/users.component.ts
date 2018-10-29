import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Users } from './../../models/users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
declare let swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [Users, Constant]
})

export class UsersComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  image: any;
  public parameter: IProperty = {};
  initialCountry: any;

  constructor(public constant: Constant, public model: Users, public admin: AdminService) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.type = 1;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.getBuyers(this.parameter.type, this.parameter.page, '', '', '');
  }

  openModal() {
    this.model = new Users();
    this.image = '';
    this.model.country_code = this.constant.country_code;
    this.model.dial_code = this.constant.dial_code;
    this.modalOpen.nativeElement.click();
  }

  closeModal() {
    this.model = new Users();
    this.image = '';
    this.modalClose.nativeElement.click();
  }

  getPage(page) {
    this.parameter.page = page;
    this.getBuyers(this.parameter.type, this.parameter.page, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getBuyers(type, page, name, phone, email) {

    this.parameter.page = page;
    this.parameter.type = type;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;
    this.parameter.url = this.parameter.type === 1 ? 'getBuyers' : 'getSellers';
    this.parameter.loading = true;
    this.admin.postDataApi(this.parameter.url, this.parameter)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.parameter.loading = false;
        });
  }


  changeListner(event) {
    this.model.image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
    console.log(this.model);
  }

  onCountryChange(e) {
    this.model.country_code = e.iso2;
    this.model.dial_code = '+' + e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
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
    if (this.model.image) { input.append('image', this.model.image); }
    this.parameter.loading = true;
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          console.log('success', success);
          // this.parameter.loading = false;
          this.modalClose.nativeElement.click();
          const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
          swal('Success', text, 'success');
          if (this.parameter.items.length < 10) {
            if (this.model.id) {
              this.parameter.items[this.parameter.index] = success.data;
            } else {
              this.parameter.items.push(success.data);
              this.parameter.total++;
            }
            formdata.reset();
          }
        }, error => {
          this.parameter.loading = false;
        });
  }


  editUser(userdata, index) {
    this.parameter.index = index;
    this.model = userdata;
    this.image = userdata.image;
    this.model.image = userdata.image != null ? userdata.image : '';
    this.modalOpen.nativeElement.click();
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
      confirmButtonColor: this.constant.confirmButtonColor,
      cancelButtonColor: this.constant.cancelButtonColor,
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
          console.log('success', success);
          // this.parameter.loading = false;
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }
}
