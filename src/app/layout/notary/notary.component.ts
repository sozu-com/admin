import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { IProperty } from '../../common/property';
import { Users } from './../../models/users.model';
import { Constant } from './../../common/constants';
import { NgForm } from '@angular/forms';
declare let swal: any;

@Component({
  selector: 'app-notary',
  templateUrl: './notary.component.html',
  styleUrls: ['./notary.component.css'],
  providers: [Users]
})
export class NotaryComponent implements OnInit {

  @ViewChild('modalOpen') modalOpen: ElementRef;
  @ViewChild('modalClose') modalClose: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  public parameter: IProperty = {};
  initialCountry: any;
  downloadLink: string;
  label: string;

  constructor(public constant: Constant, public model: Users, public admin: AdminService) { }

  ngOnInit() {
    this.label = 'Choose Notaries File';
    this.parameter.itemsPerPage = this.constant.itemsPerPage;
    this.parameter.page = this.constant.p;
    this.parameter.type = 1;
    this.initialCountry = {initialCountry: this.constant.country_code};
    this.getNoatariesListing(this.parameter.page, '', '', '', '');
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
    this.parameter.loading = true;
    this.parameter.page = page;
    this.parameter.name = name;
    this.parameter.company_name = company_name;
    this.parameter.phone = phone;
    this.parameter.email = email;

    this.admin.postDataApi('getNoatariesListing', this.parameter)
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

  importNoatary() {
    const file = this.fileInput.nativeElement;
    let attachment: File;
    if (file.files && file.files[0]) {
      attachment = file.files[0];
      if (attachment.size > this.constant.fileSizeLimit) {
        swal('Error', 'File size is more than 25MB.', 'error');
        return false;
      }
    this.parameter.loading = true;
    const input = new FormData();
    input.append('attachment', attachment);
    this.admin.postDataApi('importNoatary', input)
      .subscribe(
        success => {
          console.log('aa', success);
          this.parameter.loading = false;
          this.fileInput.nativeElement.value = '';
          this.label = 'Choose Notaries File';
          swal('Success', 'Imported successfully.', 'success');
        }, error => {
          this.parameter.loading = false;
        });
    } else {
      swal('Error', 'Please choose file', 'error');
      return false;
    }
  }

  addNewUser(formData: NgForm) {
    this.parameter.loading = true;
    this.admin.postDataApi('addNoatary', this.model)
      .subscribe(
        success => {
          this.parameter.loading = false;
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
            this.model = new Users();
            formData.reset();
          }
        }, error => {
          this.parameter.loading = false;
        });
  }

  editUser(userdata, index) {
    this.model = JSON.parse(JSON.stringify(userdata));
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

  blockNoatary(index: any, id: string, flag: any) {
    this.parameter.index = index;
    this.admin.postDataApi('blockNoatary', {id: id, flag: flag})
      .subscribe(
        success => {
          swal('Success', success.message, 'success');
          this.parameter.items[this.parameter.index] = success.data;
        });
  }

  getFileName() {
    const fi = this.fileInput.nativeElement;
    const uploadedFile = fi.files[0];
    this.label = uploadedFile.name;
  }
}
