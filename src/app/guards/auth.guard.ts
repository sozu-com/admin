import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './../services/admin.service';
import { Login, AdminACL } from './../models/login.model';
import { HttpInterceptor } from './../services/http-interceptor';
@Injectable()

export class AuthGuard implements CanActivate {

  constructor (private router: Router, private interceptor: HttpInterceptor,
    private admin: AdminService, public loginModel: Login, public aclModel: AdminACL) {}

  canActivate () {
    // console.log('auth guard');
    const token =  localStorage.getItem('token');
    if (token) {
      this.admin.login.subscribe(success => {
        console.log('outside', success);
        if (success['name'] === undefined) {
          console.log('inside');
          this.admin.postDataApi('get-details', {})
          .subscribe(
            success1 => {
              this.interceptor.loader.next({value: true});
              console.log('ssss1', success1);
              this.admin.login.next(success1.data);
              this.admin.permissions = success1.data.permissions ? success1.data.permissions : {};
              const aclData: any = {};
              const dd = success1.data.m.map((obj, index) => {
                const key =  Object.keys(obj)[0];
                this.admin.admin_acl[key] =  obj[key];
              });
              this.interceptor.loader.next({value: false});
              console.log('111111');
            });
        }
      });

      // this.admin.country.subscribe(success => {
      //   console.log('22222');
      //   if (!success[0]) {
      //     this.admin.postDataApi('getCountryLocality', {})
      //     .subscribe(
      //       success1 => {
      //         console.log('3333');
      //         this.admin.country.next(success1.data);
      //       });
      //   }
      // });
      console.log('inside guard');
      return true;
    }
    console.log('====');
    this.router.navigate(['']);
    return false;
  }
}
