import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';

@Injectable()
export class InhouseUserGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log(state.url);
      return true;
      // const roles = next.data['roles'] as Array<string>;
      // console.log('roles', roles);
      // const key = roles ? roles[0] : '';
      // const subkey = roles ? roles[1] : '';
      // const inhouseUserRole = roles ? roles[2] : '';
      // // return true;
      // const obj = this.admin.admin_acl[key];
      // if ((obj && obj[subkey] === 1) || (this.admin.permissions[inhouseUserRole] === 1)) {
      //   console.log('yes');
      //   return true;
      // } else {
      //   console.log('no');
      //   const token =  localStorage.getItem('token');
      //   if (token) {
      //     console.log('got token');
      //     console.log('state url', state.url);
      //     // this.location.back();
      //     return false;
      //   } else {
      //     console.log('no token');
      //     return false;
      //   }
      // }
  }
}
