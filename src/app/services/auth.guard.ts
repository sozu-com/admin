import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor (private router: Router, private admin: AdminService) {}

  canActivate () {
    const token =  localStorage.getItem('token');
console.log('this.admin.admin_acl', this.admin.admin_acl);
    if (token) {
      // this.admin.login.subscribe(success => {
      //   console.log('outside', success);
      //   if (success['name'] === undefined) {
      //     console.log('inside');
      //     this.admin.postDataApi('get-details', {})
      //     .subscribe(
      //       success1 => {
      //         console.log('ssss', success1);
      //         this.admin.login.next(success1.data);
      //         this.admin.admin_acl = success1.data.admin_acl;
      //       });
      //   }
      // });

      this.admin.postDataApi('get-details', {})
        .subscribe(
          success1 => {
            console.log('ssss', success1);
            this.admin.login.next(success1.data);
            this.admin.admin_acl = success1.data.m ? success1.data.m[0] : [];
          });

      this.admin.country.subscribe(success => {
        if (!success[0]) {
          this.admin.postDataApi('getCountryLocality', {})
          .subscribe(
            success1 => {
              this.admin.country.next(success1.data);
            });
        }
      });
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
