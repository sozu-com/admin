import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { NgForm } from '@angular/forms';
import { IProperty } from './../common/property';
declare let swal: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  public parameter: IProperty = {};
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  model = {
    email: ''
  };

  constructor(private admin: AdminService, private router: Router) { }

  ngOnInit() { }

  forgotPassword(formData: NgForm) {
    this.parameter.loading = true;
    const input = new FormData();
    input.append('email', formData.value.email);
    this.admin.postDataApi('forgotPassword', input)
      .subscribe(
        success => {
          this.parameter.loading = false;
          swal('Success', success.message, 'success');
          formData.reset();
          this.router.navigate(['']);
        },
        error => {
          this.parameter.loading = false;
          swal('Error', error.message, 'error');
        });
  }
}
