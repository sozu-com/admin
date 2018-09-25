import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { Login, AdminACL } from './../models/login.model';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor (private router: Router, private admin: AdminService, public loginModel: Login, public aclModel: AdminACL) {}

  canActivate () {
    // console.log('auth guard');
    const token =  localStorage.getItem('token');
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
            this.admin.permissions = success1.data.permissions ? success1.data.permissions : {};
            const aclData: any = {};
            const dd = success1.data.m.map((obj, index) => {
              const key =  Object.keys(obj)[0];
              this.admin.admin_acl[key] =  obj[key];
            });
            this.admin.login.next(success1.data);
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
