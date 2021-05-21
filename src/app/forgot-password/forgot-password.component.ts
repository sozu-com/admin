import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProperty } from '../common/property';
import { AdminService } from '../services/admin.service';
import { Constant } from '../common/constants';
import { TranslateService } from '@ngx-translate/core';
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
  projectName: string;
  constructor(public admin: AdminService, private router: Router, public constant: Constant,
    private spinner: NgxSpinnerService,
    private translate: TranslateService) {
    // const token =  localStorage.getItem('token');
    // if (token) {
    //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
    // }
  }

  ngOnInit() {}

  forgotPassword(formData: NgForm) {
    this.spinner.show();
    const input = new FormData();
    input.append('email', formData.value.email);
    this.admin.postDataApi('forgotPassword', input)
      .subscribe(
        success => {
          this.spinner.hide();
          swal(this.translate.instant('swal.success'), success.message, 'success');
          formData.reset();
          this.router.navigate(['']);
        }, error => {
        });
  }
}
