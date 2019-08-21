import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/models/users.model';
import { Constant } from 'src/app/common/constants';
import { IProperty } from 'src/app/common/property';
import { AdminService } from 'src/app/services/admin.service';
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

  developer_image: any;
  image: any;
  public parameter: IProperty = {};
  initialCountry: any;

  constructor(public constant: Constant, public model: Users, public admin: AdminService,
    private spinner: NgxSpinnerService) { }

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
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, this.parameter)
      .subscribe(
        success => {
          this.spinner.hide();
          this.parameter.items = success.data;
          this.parameter.total = success.total;
        }, error => {
          this.spinner.hide();
        });
  }


  changeListner(event, type: number) {
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
    if (this.model.developer_image) { input.append('developer_image', this.model.developer_image); }
    this.spinner.show();
    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.spinner.hide();
          this.modalClose.nativeElement.click();
          const text = this.model.id ? 'Updated successfully.' : 'Added successfully.';
          swal('Success', text, 'success');
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
    this.parameter.index = index;
    this.model = userdata;
    this.image = userdata.image;
    this.developer_image = userdata.developer_image;
    this.model.image = userdata.image != null ? userdata.image : '';
    this.model.developer_image = userdata.developer_image != null ? userdata.developer_image : '';
    this.modalOpen.nativeElement.click();
  }


  blockUnblockPopup(index: number, id: string, flag: any, user_type: string) {
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
          swal('Success', this.parameter.successText, 'success');
          this.parameter.items[this.parameter.index]['is_blocked'] = flag;
        });
  }


  deletePopup(index: number, id: string, user_type: string) {
    this.parameter.index = index;
    this.parameter.title = this.constant.title.ARE_YOU_SURE;
    this.parameter.text = 'You want to delete user?';

    swal({
      html: this.parameter.title + '<br>' + this.parameter.text,
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
          swal('Success', 'Deleted successfully.', 'success');
          this.parameter.items.splice(index, 1);
        });
  }
}
