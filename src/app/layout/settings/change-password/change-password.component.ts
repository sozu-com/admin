import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
// import { SweetAlertService } from 'ngx-sweetalert2';
import { IProperty } from '../../../common/property';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private router: Router, private admin: AdminService, private spinner: NgxSpinnerService) { }

  ngOnInit() {}

  changePassword(formData: NgForm) {
    this.spinner.show();
    this.admin.postDataApi('changePassword', this.model)
      .subscribe(
        success => {
          this.spinner.hide();
          swal('Success', 'Password is changed successfully!', 'success');
          localStorage.removeItem('token');
          this.router.navigate(['']);
        },
        error => {
          this.spinner.hide();
        });
  }
}
