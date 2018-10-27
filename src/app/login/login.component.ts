import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';
import { IProperty } from '../common/property';
import { Constant } from './../common/constants';

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

    // const token =  localStorage.getItem('token');
    // if (token) {
    //   this.router.navigate(['dashboard/view-inhouse-users/data-collectors']);
    // }
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
          this.parameter.loading = false;
          if (success.data.permissions) {
            if (success.data.permissions.can_csr_buyer === 1) {
              this.router.navigate(['dashboard/leads/csr-buyers']);
            } else if (success.data.permissions.can_data_collector === 1) {
              this.router.navigate(['dashboard/leads/data-collectors']);
            } else if (success.data.permissions.can_in_house_broker === 1) {
              this.router.navigate(['dashboard/leads/inhouse-broker']);
            } else if (success.data.permissions.can_csr_seller === 1) {
              this.router.navigate(['dashboard/leads/csr-sellers']);
            } else if (success.data.permissions.can_csr_closer === 1) {
              this.router.navigate(['dashboard/leads/csr-closers']);
            } else if (success.data.permissions.can_bank === 1) {
              this.router.navigate(['dashboard/banks/bank-leads']);
            } else if (success.data.permissions.can_noatary === 1) {
              this.router.navigate(['dashboard/notary/notary-leads']);
            }
          } else if (success.data.admin_acl) {
            let check = true;
            // let path = '';
            const dd = this.admin.admin_acl_array.map((obj, index) => {
              const key =  Object.keys(obj)[0];
              // console.log('1', key);
              if (check && obj[key]['can_read'] === 1) {
                console.log('========', key, obj[key], obj[key]['can_read']);
                check = false;
                console.log('path', obj[key]['acl'].path);
                // this.router.navigate(['dashboard']);
                this.router.navigate([obj[key]['acl'].path]);
                // this.router.navigate(['dashboard/view-inhouse-users/inhouse-broker']);
                // switch (key) {
                //   case 'Dashboard': path = 'dashboard'; this.router.navigate(['dashboard']); break;
                //   case 'Broker Management': path = 'dashboard/view-inhouse-users/inhouse-broker'; this.router.navigate([path]); break;
                //   case 'Seller Management': path = 'dashboard/view-inhouse-users/csr-sellers'; this.router.navigate([path]); break;
                //   case 'Bank Management': path = 'dashboard/banks/view-banks'; this.router.navigate([path]); break;
                //   case 'Noataries Management': path = 'dashboard/notary/view-notary'; this.router.navigate([path]); break;
                //   case 'User Management': path = 'dashboard/users'; this.router.navigate([path]); break;
                //   case 'Data Collector Management':
                //     path = 'dashboard/view-inhouse-users/data-collectors';
                //     this.router.navigate([path]); break;
                //   case 'Property Management': path = 'dashboard/properties/view-properties'; this.router.navigate([path]); break;
                //   case 'Building Management': path = 'dashboard/projects/view-projects'; this.router.navigate([path]); break;
                //   case 'Enquiries': path = 'dashboard'; this.router.navigate([path]); break;
                //   case 'Manage Localities': path = 'dashboard'; this.router.navigate([path]); break;
                //   case 'Admin Defaults': path = 'dashboard'; this.router.navigate([path]); break;
                //   case 'Access Controls': path = 'dashboard/access-control-mgt'; this.router.navigate([path]); break;
                //   case 'Buyer Management': path = 'dashboard/view-inhouse-users/csr-buyers'; this.router.navigate([path]); break;
                //   case 'Closer Management': path = 'dashboard/view-inhouse-users/csr-closers'; this.router.navigate([path]); break;
                //   case 'Notary Lead Management': path = 'dashboard'; this.router.navigate([path]); break;
                //   case 'Data Collector Lead Management': path = 'dashboard/leads/data-collectors'; this.router.navigate([path]); break;
                //   case 'Seller Lead Management': path = 'dashboard/leads/csr-sellers'; this.router.navigate([path]); break;
                //   case 'Buyer Lead Management': path = 'dashboard/leads/csr-buyers'; this.router.navigate([path]); break;
                //   case 'Broker Lead Management': path = 'dashboard/leads/inhouse-broker'; this.router.navigate([path]); break;
                //   case 'Closer Lead Management': path = 'dashboard/leads/csr-closers'; this.router.navigate([path]); break;
                //   case 'Reports': path = 'dashboard/reports'; this.router.navigate([path]); break;
                //   case 'Manual Leads': path = 'dashboard/manual-leads'; this.router.navigate([path]); break;
                //   case 'Templates': path = 'dashboard/edit-template'; this.router.navigate([path]); break;
                //   case 'Settings': path = 'dashboard/settings/setting-location'; this.router.navigate([path]); break;
                //   default: path = 'dashboard'; this.router.navigate([path]); break;
                // }
              }
            });
          } else {
            this.router.navigate(['dashboard']);
          }
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
