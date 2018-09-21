import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';
import { Login, AdminACL } from './../models/login.model';

@Injectable()

export class AuthGuard implements CanActivate {

  constructor (private router: Router, private admin: AdminService, public loginModel: Login, public aclModel: AdminACL) {}

  canActivate () {
    const token =  localStorage.getItem('token');
// console.log('this.admin.admin_acl', this.admin.admin_acl);
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

            // this.admin.aclModel = success1.data.m ? success1.data.m[0] : {};
            // console.log('success1.data.m', success1.data.m[0]['Dashboard']);
            // let data = {};
            // for (let index = 0; index < success1.data.m.length; index++) {
            //   const element = success1.data.m[index];
            //   data = success1.data.m[index];
            //   console.log('=========', index, element);
            // }
            // console.log('dataaaaaaaaaaaa', data);
            // const dd = success1.data.m.forEach(element => {
            //   this.admin.aclModel['Dashboard'] = element['Dashboard'];
            //   console.log('element', element);
            //   console.log(this.admin.aclModel);
            // });
            // console.log('dd', dd);

            // var dd = success1.data.m.map((obj, index) => {
            //   let key =  Object.keys(obj)[0];
            //   return obj[key];
            // });

            const aclData: any = {};
            const dd = success1.data.m.map((obj, index) => {
              const key =  Object.keys(obj)[0];
              this.admin.admin_acl[key] =  obj[key];
            });
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
