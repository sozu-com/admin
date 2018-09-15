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
  projectName: string;
  public parameter: IProperty = {};

  constructor(private router: Router, private admin: AdminService, public constant: Constant) {
    this.parameter.loading = false;
    this.projectName = this.constant.projectName;
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

//     this.admin.adminLogin1(email.toLowerCase(), password)
//     .subscribe(success => {
//         this.parameter.loading = false;
//         const responseData1 = success[0];
//         const responseData2 = success[1];
//         const loginReponse = responseData1.json();
//         const countryResponse = responseData2.json();
//         this.admin.login.next(loginReponse.data);
//         this.admin.country.next(countryResponse.data);
// console.log('login success', success);
//         this.admin.setUserLoggedIn();
//         this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
//       },
//       error => {
//         this.parameter.loading = false;
//       }
//     );

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
    // this.admin.adminLogin(email.toLowerCase(), password)
    // .then((data: any) => {
    //   this.admin.setUserLoggedIn();
    //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
    //   this.parameter.loading = false;
    // })
    // .catch((error: any) => {
    //   this.parameter.loading = false;
    // });
  }
}
