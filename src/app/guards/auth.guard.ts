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
    this.interceptor.loader.next({value: true});
    const token =  localStorage.getItem('token');
    if (token) {

      this.admin.login.subscribe(success => {
        this.interceptor.loader.next({value: true});
        if (success['name'] === undefined) {
          this.interceptor.loader.next({value: true});
          this.admin.postDataApi('get-details', {})
          .subscribe(
            success1 => {
              localStorage.setItem('user-id', JSON.stringify(((success1 || {}).data || {}).id));
              this.interceptor.loader.next({value: true});
              this.admin.login.next(success1.data);
              this.admin.globalSettings.next(success1.data.global_settings);
              this.admin.permissions = success1.data.permissions ? success1.data.permissions : {};
              const aclData: any = {};
              const dd = success1.data.m.map((obj, index) => {
                const key =  Object.keys(obj)[0];
                this.admin.admin_acl[key] =  obj[key];
              });
              this.interceptor.loader.next({value: false});
            });
        }
      });

      // this.admin.country.subscribe(success => {
      //   if (!success[0]) {
      //     this.admin.postDataApi('getCountryLocality', {})
      //     .subscribe(
      //       success1 => {
      //         this.admin.country.next(success1.data);
      //       });
      //   }
      // });
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
