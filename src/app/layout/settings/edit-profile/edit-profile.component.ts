import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { NgForm } from '@angular/forms';


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
  }

  constructor(private element: ElementRef, private router: Router, private admin: AdminService, private swal: SweetAlertService) { }

  ngOnInit() {
    // this.admin.loginData$
    // this.model.countryCode = localStorage.getItem('countryCode')
    // this.model.dialCode = localStorage.getItem('dialCode')
    // this.model.helpAndSupportPhone = localStorage.getItem('helpAndSupportPhone')
    // this.model.helpAndSupportEmail = localStorage.getItem('helpAndSupportEmail')
    // this.initialCountry = {initialCountry: this.model.countryCode}
  }

  onCountryChange(e){
    this.parameter.countryCode = e.iso2;
    this.parameter.dialCode = e.dialCode;
    this.initialCountry = {initialCountry: e.iso2}
  }

  changeListner(event) {
    var reader = new FileReader();
    
    var image = this.element.nativeElement.querySelector('.image');

    this.parameter.image = event.target.files[0];
    this.parameter.icon = this.parameter.image;

    reader.onload = function(e) {
      console.log(image)
      var src = e.target['result'];
        image.src = src;
        console.log(image.src)
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  updateProfile(formData: NgForm){
    console.log(formData);
    this.parameter.loading = true;
    this.parameter.url = 'updateProfile';

    let input = new FormData();
    input.append("name", formData.value.name);
    input.append("phone", formData.value.phone);
    // input.append("country_code", this.parameter.countryCode);
    input.append("image", this.parameter.image);

    this.admin.postDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          console.log('succccc', success)
          this.parameter.loading = false

          let input = new FormData();
          let hh = {
            name: 'johnnnn'
          }
          // this.admin.loginData$.next(hh)
          // this.admin.loginData$.subscribe(success=>{
          //   console.log('edit profile', success['data'].name)
            
          // })

          this.swal.success({ 
            title: 'Success',
            text: 'Details updated successfully!'
          })
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else this.swal.warning({ text: error.message })
        });
  }
}
