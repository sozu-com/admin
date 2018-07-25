import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { Users } from './../../models/users.model';
import { NgForm } from '@angular/forms';
import { Constant } from './../../common/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [Users, Constant]
})

export class UsersComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;

  constructor(private constant: Constant, private model: Users, private element: ElementRef, private route: ActivatedRoute, private admin: AdminService, private router: Router, private swal: SweetAlertService) { }

  ngOnInit() {
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.p = this.constant.p;
    this.parameter.type = 1;
    this.model.id = '';
    this.initialCountry = {initialCountry: 'mx'};
    this.getBuyers(this.parameter.type, this.parameter.p, '', '', '');
  }

  getBuyers(type, page, name, phone, email){
    
    this.parameter.p = page;
    this.parameter.type = type;
    this.parameter.name = name;
    this.parameter.phone = phone;
    this.parameter.email = email;
    this.parameter.loading = true;

    this.parameter.url = this.parameter.type == 1 ? 'getBuyers' : 'getSellers';

    const input = new FormData();
    input.append('page', this.parameter.p.toString());

    if(this.parameter.name)
      input.append('name', this.parameter.name);

    if(this.parameter.phone)
      input.append('phone', this.parameter.phone);

    if(this.parameter.email)
      input.append('email', this.parameter.email);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('getBuyers', success);
          this.parameter.loading = false;
          this.parameter.items = success.data;
          this.parameter.total = success.data.length;
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          if (error.statusCode == 401) this.router.navigate(['']);
          else
            this.swal.warning({
              // title: 'Internet Connection',
              text: error.messages,
            });
        });
  }


  changeListner(event) {

    const reader = new FileReader();

    const image = this.element.nativeElement.querySelector('.image');

    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;

    reader.onload = function(e) {
      const src = e.target['result'];
        image.src = src;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  onCountryChange(e) {
    console.log('eeee',e)
    this.model.country_code = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  addNewUser(formdata: NgForm) {
    this.parameter.loading = true;
    this.parameter.url = this.model.id != '' ? 'updateNewUser' : 'addSeller';
console.log(formdata)
    const input = new FormData();

    if(this.model.id != '')
      input.append('id', this.model.id);

    input.append('name', formdata.value.name);
    input.append('country_code', '+' + this.model.country_code);
    input.append('phone', formdata.value.phone);
    input.append('image', this.parameter.image);
    input.append('email', formdata.value.email);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.loading = false;
          if (success.success == 0) {
            this.swal.error({
              title: 'Error',
              text: success.message
            });
          }
          else{
            this.modalClose.nativeElement.click();
            formdata.reset();
            this.swal.success({
              title: 'Success',
              text: this.model.id == '' ? 'Added successfully.' : 'Updated successfully.'
            });
          }
          // console.log('user add',success)
        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
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

    const self = this;
    this.swal.confirm({
        title: this.parameter.title,
        text: this.parameter.text,
    }).then(function() {
      self.blockAdmin(index, id, flag, user_type);
    })
    .catch(function() {
      // console.log('Logout cancelled by user');
    });
  }

  
  blockAdmin(index, id, flag, user_type) {
    this.parameter.url = 'blockBuyerSeller';
    const input = new FormData();
    input.append('id', id);
    input.append('flag', flag);
    input.append('user_type', user_type);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('success',success)
          this.parameter.loading = false;
          
          this.swal.success({
            title: 'Success',
            text: this.parameter.successText
          });

          this.parameter.items[this.parameter.index] = success.data;

        },
        error => {
          console.log(error);
          this.parameter.loading = false;
          this.swal.error({
            title: 'Error',
            text: error.message,
          });
        });
  }
}
