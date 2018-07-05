import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../common/property';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  public parameter: IProperty = {};

  model = {
    oldPassword: '',
    newPassword: ''
  }
  
  constructor(private router: Router, private admin: AdminService, private swal: SweetAlertService) { }

  ngOnInit() {}

  changePassword(formData: NgForm){
    
    this.parameter.loading = true;
    this.parameter.url = 'changePassword';

    let input = new FormData();
    input.append("oldPassword", formData.value.oldPassword);
    input.append("newPassword", formData.value.newPassword);

    this.admin.putDataApi(this.parameter.url, input)
      .subscribe(
        success => {
          this.parameter.loading = false
          this.swal.success({ 
            title: 'Success',
            text: 'Password is changed successfully!'
          })

          localStorage.removeItem('accessToken');
          localStorage.removeItem('countryCode');
          localStorage.removeItem('dialCode');
          localStorage.removeItem('helpAndSupportEmail');
          localStorage.removeItem('helpAndSupportPhone');
          this.admin.unsetUserLoggedIn();
          this.router.navigate(['']);
        },
        error => {
          this.parameter.loading = false;
          if(error.statusCode==401) this.router.navigate(['']);
          else this.swal.warning({ text: error.message })
        });
  }
}
