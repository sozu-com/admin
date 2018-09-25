import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AdminService } from './../services/admin.service';
import { Location } from '@angular/common';

@Injectable()
export class CsrBrokerGuard implements CanActivate {
  constructor(private admin: AdminService, private location: Location) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('broker', this.admin.permissions);

      this.admin.loginData$.subscribe(success => {
        console.log('========', success);
        // console.log('admin_acl', success['admin_acl']);
      });

      return true;
      // if (this.admin.permissions.can_in_house_broker === 1) {
      //   return true;
      // } else {
      //   this.location.back();
      //   return false;
      // }
  }
}
