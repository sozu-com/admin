import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { NgForm } from '@angular/forms';
import { IProperty } from './../common/property';
import { Constant } from './../common/constants';
declare let swal: any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {

  public parameter: IProperty = {};
  model = {
    email: ''
  };

  constructor(private admin: AdminService, private router: Router, public constant: Constant) { }

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
        });
  }
}
