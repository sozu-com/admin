import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';
import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../layout/common/property';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  public parameter: IProperty = {};
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  model = {
    email: ''
  }

  constructor(private admin: AdminService, private swal: SweetAlertService) { }

  ngOnInit() { }

  forgotPassword(formData: NgForm) {
    this.parameter.loading = true;
    let input = new FormData();
    input.append("email", formData.value.email);
    this.admin.postDataApi('forgotPassword', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          this.swal.success({ 
            title: 'Success',
            text: success.message,
          })
        },
        error => {
          this.parameter.loading = false;
          this.swal.error({ 
            title: 'Error',
            text: error.message,
          })
        });
  }
}
