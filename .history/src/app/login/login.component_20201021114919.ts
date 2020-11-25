import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { IProperty } from 'src/app/common/property';
import { Constant } from 'src/app/common/constants';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: NgForm;
  model = {
    email: '',
    password: ''
  };
  projectName: string;
  public parameter: IProperty = {};

  constructor(private router: Router, public admin: AdminService, public constant: Constant,
    private spinner: NgxSpinnerService,
    public translate: TranslateService) {
    // this.loginForm.reset();
    this.spinner.hide();

    // const token =  localStorage.getItem('token');
    // if (token) {
    //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
    // }
  }

  @ViewChild('input1') input1: ElementRef;

  ngOnInit() {}

  ngAfterViewInit() {
    // this.input1.nativeElement.focus();
  }

  loginUser(formData: NgForm) {
    this.spinner.show();
    const email = formData.value.email;
    const password = formData.value.password;

//     this.admin.adminLogin1(email.toLowerCase(), password)
//     .subscribe(success => {
//         this.spinner.hide();
//         const responseData1 = success[0];
//         const responseData2 = success[1];
//         const loginReponse = responseData1.json();
//         const countryResponse = responseData2.json();
//         this.admin.login.next(loginReponse.data);
//         this.admin.country.next(countryResponse.data);
//         this.admin.setUserLoggedIn();
//         this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
//       },
//       error => {
//         this.spinner.hide();
//       }
//     );

    this.admin.adminLogin(email.toLowerCase(), password)
      .subscribe(
        success => {
          this.spinner.hide();
          if (success.data.is_blocked === 1) {
            swal(this.translate.instant('swal.error'), this.translate.instant('login.blockedByAdmin'), 'error');
            return false;
          }
          // if (success.data.permissions) {
          //   if (success.data.permissions.can_csr_buyer === 1) {
          //     this.router.navigate(['dashboard/leads/csr-buyers']);
          //   } else if (success.data.permissions.can_data_collector === 1) {
          //     this.router.navigate(['dashboard/leads/data-collectors']);
          //   } else if (success.data.permissions.can_in_house_broker === 1) {
          //     this.router.navigate(['dashboard/leads/inhouse-broker']);
          //   } else if (success.data.permissions.can_csr_seller === 1) {
          //     this.router.navigate(['dashboard/leads/csr-sellers']);
          //   } else if (success.data.permissions.can_csr_closer === 1) {
          //     this.router.navigate(['dashboard/leads/csr-closers']);
          //   } else if (success.data.permissions.can_bank === 1) {
          //     this.router.navigate(['dashboard/banks/bank-leads']);
          //   } else if (success.data.permissions.can_noatary === 1) {
          //     this.router.navigate(['dashboard/notary/notary-leads']);
          //   } else {
          //     swal(this.translate.instant('swal.error'), this.translate.instant('login.apiMessages.noAccess'), 'error');
          //   }
          // } else 
          if (success.data.admin_acl) {
            let check = true;
            const dd = this.admin.admin_acl_array.map((obj, index) => {
              const key =  Object.keys(obj)[0];
              if (check && obj[key]['can_read'] === 1) {
                check = false;
                this.router.navigate([obj[key]['acl'].path]);
              }
            });
          } else {
            this.router.navigate(['dashboard']);
          }
        },
        error => {
          this.spinner.hide();
        }
      );
    // this.admin.adminLogin(email.toLowerCase(), password)
    // .then((data: any) => {
    //   this.admin.setUserLoggedIn();
    //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
    //   this.spinner.hide();
    // })
    // .catch((error: any) => {
    //   this.spinner.hide();
    // });
  }
}
