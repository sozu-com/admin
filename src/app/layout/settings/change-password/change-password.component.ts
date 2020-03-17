import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IProperty } from 'src/app/common/property';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
declare let swal: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  public parameter: IProperty = {};

  model = {
    password: '',
    c_password: ''
  };

  constructor(private router: Router, private admin: AdminService, private spinner: NgxSpinnerService,
    private translate: TranslateService) { }

  ngOnInit() {}

  changePassword(formData: NgForm) {
    this.spinner.show();
    this.admin.postDataApi('changePassword', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          swal(this.translate.instant('swal.success'), this.translate.instant('message.success.updatedSuccessfully'), 'success');
          localStorage.removeItem('token');
          this.router.navigate(['']);
        },
        error => {
          this.spinner.hide();
        });
  }
}
