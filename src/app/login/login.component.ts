import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';
import { IProperty } from '../common/property';
import { Constant } from './../common/constants';
declare let swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

  model = {
    email: '',
    password: ''
  };

  public parameter: IProperty = {};

  constructor(private router: Router, private admin: AdminService, public constant: Constant) {
    this.parameter.loading = false;
  }

  @ViewChild('input1') input1: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {
    this.input1.nativeElement.focus();
  }

  loginUser(formData: NgForm) {
    this.parameter.loading = true;
    const email = formData.value.email;
    const password = formData.value.password;

    this.admin.adminLogin(email.toLowerCase(), password)
      .subscribe(
        success => {
          this.admin.setUserLoggedIn();
          this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
          this.parameter.loading = false;
        },
        error => {
          this.parameter.loading = false;
        }
      );
  }
}
