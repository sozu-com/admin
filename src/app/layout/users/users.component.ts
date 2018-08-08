import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IProperty } from '../../common/property';
import { Users } from './../../models/users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';
import { DomSanitizer } from '@angular/platform-browser';
declare let swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [Users, Constant]
})

export class UsersComponent implements OnInit {

  url: any[];
  image1;
  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;
  phonePattern = '^[0-9]{5,15}$';

  constructor(private constant: Constant, public model: Users, private element: ElementRef,
    private route: ActivatedRoute, private admin: AdminService, private router: Router,
    public sanitization: DomSanitizer
  ) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.type = 1;
    this.model.id = '';
    this.initialCountry = {initialCountry: 'mx'};
    this.getBuyers(this.parameter.type, this.parameter.p, '', '', '');
  }

  closeModal() {
    this.image1 = '';
    this.model.name = ''; this.model.email = ''; this.model.phone = '';
    this.modalClose.nativeElement.click();
  }

  getPage(page) {
    this.parameter.p = page;
    this.getBuyers(this.parameter.type, this.parameter.p, this.parameter.name, this.parameter.phone, this.parameter.email);
  }

  getBuyers(type, page, name, phone, email) {

    this.parameter.p = page;
    this.parameter.type = type;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;
    this.parameter.loading = true;

    this.parameter.url = this.parameter.type === 1 ? 'getBuyers' : 'getSellers';

    const input = new FormData();
    input.append('page', this.parameter.p.toString());

    if (this.parameter.name) {input.append('name', this.parameter.name); }

    if (this.parameter.phone) {input.append('phone', this.parameter.phone); }

    if (this.parameter.email) {input.append('email', this.parameter.email); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBuyers', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode === 401) {
            this.router.navigate(['']);
          }else {
            swal('Error', error.message, 'error');
          }
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
    this.model.country_code = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  addNewUser(formdata: NgForm) {
    this.parameter.loading = true;
    this.parameter.url = this.model.id !== '' ? 'updateNewUser' : 'addSeller';

    const input = new FormData();

    if (this.model.id !== '') { input.append('id', this.model.id); }
    input.append('name', formdata.value.name);
    input.append('country_code', '+' + this.model.country_code);
    input.append('phone', formdata.value.phone);
    input.append('email', formdata.value.email);

    if (this.parameter.image) { input.append('image', this.parameter.image); }

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success', success);
          this.parameter.loading = false;
          if (success.success === '0') {
            swal('Error', success.message, 'error');
          }else {
            this.modalClose.nativeElement.click();
            this.getBuyers(this.parameter.type, this.parameter.p, this.parameter.name, this.parameter.phone, this.parameter.email);
            formdata.reset();
            const text = this.model.id === '' ? 'Added successfully.' : 'Updated successfully.';
            swal('Success', text, 'success');
          }
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
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
    this.parameter.loading = true;
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
          this.parameter.loading = false;
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }
}
