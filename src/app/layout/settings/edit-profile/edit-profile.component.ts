import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
// import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { NgForm } from '@angular/forms';
declare let swal: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  model = {
    name: '',
    phone: '',
    image: ''
  };

  constructor(private element: ElementRef, private router: Router, private admin: AdminService,
    // private swal: SweetAlertService
  ) { }

  ngOnInit() {
  }

  onCountryChange(e) {
    this.parameter.countryCode = e.iso2;
    this.parameter.dialCode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
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

  updateProfile(formData: NgForm) {
    // this.parameter.loading = true;
    this.parameter.url = 'updateProfile';

    const input = new FormData();
    input.append('name', formData.value.name);
    input.append('phone', formData.value.phone);
    // input.append("country_code", this.parameter.countryCode);
    input.append('image', this.parameter.image);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('succccc', success);
          // this.parameter.loading = false;
          this.admin.login.next(success.data);
          swal('Error', success.message, 'error');

          // this.swal.success({
          //   title: 'Success',
          //   text: 'Details updated successfully!'
          // });
        }
        // error => {
        //   this.parameter.loading = false;
        //   if (error.statusCode === 401) {
        //     this.router.navigate(['']);
        //   }else {
        //     swal('Error', error.message, 'error');
        //     // this.swal.warning({ text: error.message });
        //   }
        // }
      );
  }
}
