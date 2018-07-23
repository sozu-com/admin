import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})

export class ContactUsComponent implements OnInit {

  public parameter: IProperty = {};
  initialCountry: any;
  model = {
    countryCode: '',
    dialCode: '',
    helpAndSupportPhone: '',
    helpAndSupportEmail: ''
  };

  constructor(private router: Router, private admin: AdminService, private swal: SweetAlertService) { }

  ngOnInit() {
    this.model.countryCode = localStorage.getItem('countryCode');
    this.model.dialCode = localStorage.getItem('dialCode');
    this.model.helpAndSupportPhone = localStorage.getItem('helpAndSupportPhone');
    this.model.helpAndSupportEmail = localStorage.getItem('helpAndSupportEmail');
    this.initialCountry = {initialCountry: this.model.countryCode};
  }

  setCountryCode(){
    // for (let index = 0; index < 4; index++) {
    //   console.log('index1',index);
    //   setTimeout(() => {
    //     console.log('index',index);
    //   }, 0);
    // }
  }

  // telInputObject(obj) {
  //   console.log(',,,,',obj)
  //   obj.intlTelInput('setCountry', this.parameter.countryCode);
  // }

  onCountryChange(e){
    this.parameter.countryCode = e.iso2;
    this.parameter.dialCode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2};
  }

  updateDefaultSettings(formData: NgForm){

    this.parameter.loading = true;
    this.parameter.url = 'updateDefaultSettings';

    const input = new FormData();
    input.append('helpAndSupportEmail', formData.value.helpAndSupportEmail);
    input.append('helpAndSupportPhone', formData.value.helpAndSupportPhone);
    input.append('countryCode', this.parameter.countryCode);
    input.append('dialCode', this.parameter.dialCode);

    this.admin.putDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false;

          localStorage.setItem('helpAndSupportEmail', formData.value.helpAndSupportEmail);
          localStorage.setItem('helpAndSupportPhone', formData.value.helpAndSupportPhone);
          localStorage.setItem('countryCode', this.parameter.countryCode);
          localStorage.setItem('dialCode', this.parameter.dialCode);

          this.swal.success({
            title: 'Success',
            text: 'Details updated successfully!'
          });
        },
        error => {
          this.parameter.loading = false;
          if (error.statusCode == 401) this.router.navigate(['']);
          else this.swal.warning({ text: error.message });
        });
  }
}
